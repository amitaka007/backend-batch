import { redis } from "../config/redis.config.js"
import cloudinary from "../config/cloudinary.config.js"
import Product from "../model/product.model.js"


export const getAllProducts = async (req , res)=>{
    try {
        const products = await Product.find({}); // find all products
        res.status(200).json({products})
    } catch (error) {
        console.log("Error in get all products controller", error.message);
        res.status(500).json({ message: error.message });
    }
}

export const getFeaturedProducts = async (req , res)=>{
    try {
        let featuredProducts = await redis.get("featured_products"); // get featured products from redis
        if(featuredProducts){
            return res.status(200).json(JSON.parse(featuredProducts));
        }

        // if not in redis , featch from mongodb
        // .lean() is gonna return a plain js obj instead of mongodb document
        featuredProducts = await Product.find({isFeatured:true}).lean();

        if(!featuredProducts){
            return res.status(404).json({message:"No featured products found"});
        }

        // store in redis for future quick access
        await redis.set("featured_products" , JSON.stringify(featuredProducts));

        res.status(200).json({featuredProducts});
    } catch (error) {
        console.log("Error in get featured products controller", error.message);
        res.status(500).json({ message: error.message });
    }
}

export const getRecommendedProducts = async (req , res)=>{
    try {
        const products = await Product.aggregate([
            {
                $sample:{size:4}
            },
            {
                $project:{
                    _id:1,
                    name:1,
                    image:1,
                    price:1,
                    description:1
                }
            }
        ]);

        res.status(200).json({products});
    } catch (error) {
        console.log("Error in get recommended products controller", error.message);
        res.status(500).json({ message: error.message });
    }
}


export const getProductsByCategory = async (req , res)=>{
    try {
        const {category} = req.params;
        const products = await Product.find({category});
        res.json({products});
        
    } catch (error) {
        console.log("Error in get products by category controller", error.message);
        res.status(500).json({ message: error.message });
    }
}


export const createProduct = async (req , res)=>{
    try {
        const {name , description , price , image , category} = req.body;

        let cloudinaryResponse = null;

        if(image){
            cloudinaryResponse = await cloudinary.uploader.upload(image , {folder:"products"});
        }

        const product = await Product.create({
            name ,
            description ,
            price,
            image:cloudinaryResponse?.secure_url ? cloudinaryResponse?.secure_url : "",
            category
        })

        res.status(201).json(product);
    } catch (error) {
        console.log("Error in create product controller", error.message);
        res.status(500).json({ message: error.message });
    }
}


export const toggleFeaturedProduct = async (req , res)=>{
    try {
        const product = await Product.findById(req.params.id);
        if(product){
            product.isFeatured = !product.isFeatured;
            const updatedProduct = await product.save();
            await updateFeaturedProductsCache();
            res.json(updatedProduct);
        }
        
    } catch (error) {
        
    }
}


export const deleteProduct = async (req , res)=>{
    try {
        const product = await Product.findById(req.params.id);

        if(!product){
            return res.status(404).json({message:"Product not found"});
        }

        if(product.image){
            const publicId = product.image.split("/").pop().split(".")[0];
            try {
                await cloudinary.uploader.destroy(`/products/${publicId}`);
                console.log("Image deleted from cloudinary");
            } catch (error) {
                console.log("Error in deleting image from cloudinary", error.message);
            }
        }

        await Product.findByIdAndDelete(req.params.id);

        res.status(200).json({message:"Product deleted successfully"});
    } catch (error) {
        console.log("Error in delete product controller", error.message);
        res.status(500).json({ message: error.message });
    }
}


const updateFeaturedProductsCache = async ()=>{
    try {
        const featuredProducts = await Product.find({isFeatured:true}).lean();
        await redis.set("featured_products" , JSON.stringify(featuredProducts));
    } catch (error) {
          console.log("Error in update featured products cache", error.message);  
    }
}