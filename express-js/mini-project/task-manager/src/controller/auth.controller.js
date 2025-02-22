export const login = (req, res) => {
    const { username } = req.body;

    if (!username) {
        return res.status(400).json({ error: "Username is required" });
    }

    // Store user data in session
    req.session.user = { username };

    // Set a cookie
    res.cookie("username", username, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 });

    res.json({ message: "Login Successful", username });
};


export const logout = (req , res)=>{
    res.clearCookie("username");
    res.session.destroy((err)=>{
        if(err){
            return res.status(500).json({error:"Error logging out"})
        }
        res.json({message:"Logout Successful"})
    })
}