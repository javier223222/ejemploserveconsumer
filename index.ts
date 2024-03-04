import express from "express"
import { Express,Request,Response  } from "express"
import dotenv from "dotenv"
import axios from "axios"
import * as crypto from "crypto"

dotenv.config()
const WEBHOOK_SECRET: string = process.env.WEBHOOK_SECRET;
const app:Express=express()
const PORT=process.env.PORT || 3000
app.use(express.json())
app.get("/",(req:Request,res:Response)=>{
res.send("<h1  style=`color:blue`>hello world</h1>")
})


const verify_signature = (req: Request) => {
     try{
       const signature = crypto
         .createHmac("sha256", WEBHOOK_SECRET)
         .update(JSON.stringify(req.body))
         .digest("hex");
       let trusted = Buffer.from(`sha256=${signature}`, 'ascii');
       
       let untrusted =  Buffer.from(req.header("x-hub-signature-256"), 'ascii');
       return crypto.timingSafeEqual(trusted, untrusted);
     }catch(e){
          return false
     }
      
     };


app.post("/nuevo",async(req:Request,res:Response)=>{

       

       const {body}=req
       console.log(body)
       return res.status(200).json({message:"success"})

       
   

})


const petition=async(url:string,message:any)=>{
      await axios.
       post(url,message)

}


app.listen(PORT,()=>{
    
       return console.log(`server is running on port  ${PORT}`)
})


