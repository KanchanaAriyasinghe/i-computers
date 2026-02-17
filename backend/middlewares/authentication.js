import jwt, { decode } from "jsonwebtoken";

export default function authenticateUser (req,res,next){
        const header = req.header ("Authorization")

        if (header != null){
            const token = header.replace("Bearer ","")
            console.log(token)

            //decryption
            jwt.verify(token, "I-CoMputersBatch10",
                (error, decode)=>{
                    if(decode == null){
                        res.json({
                            message : "Invalid Token. Please login again."
                        })
                    }else{
                        req.user = decode
                        next()
                    }
                }
            )

        }else{
            next()
        }
}