export const authMiddleware = (req , res,next)=>{
    console.log("Auth Middleware" , req.session.user);
    if(req.session && req.session.user){
       return next();
    }
    res.status(401).json({message:"Unauthorized: Please Login In"})
}