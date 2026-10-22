import jwt from 'jsonwebtoken'

const adminAuth = async (req,res,next) => {
    try {
        const {token} = req.headers
        if (!token) {
            return res.json({success:false,message:"Not Authorized. Login to Proceed"})
        }
        const token_decode = jwt.verify(token,process.env.JWT_SECRET);
        console.log(token_decode);        
        if (token_decode.role !== 'admin' || token_decode.email !== process.env.ADMIN_EMAIL) {
            return res.json({ success: false, message: "Not Authorized Login Again" });
        }
        next()
    } catch (error) {
       console.log(error);
       res.json({success:false,message: "Something went wrong"})
        
    }
}

export default adminAuth;