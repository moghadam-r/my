import connectToDB from "@/configs/db";
import { verifyAccessToken } from "@/utils/auth";
import { cookies } from "next/headers";
import sabtModel from "@/models/SabtDarkhast";
export async function POST(req) {
    connectToDB();
    const body = await req.json();
    const { pKey,name, family, edare, darkhast, rahgiry,pasokh,phone,meliCode } = body;
    console.log(name);
    // Validation (You)
  
    const isDarkhastExist = await sabtModel.findOne({
      $or: [{ pKey }],
   });
  
   if (isDarkhastExist) {
     return Response.json(
        {
         message: "This Request is exist!!",
       },
        {
          status: 422,
        }
      );
   }
    
   console.log(edare)
   if (edare === 'ناحیه یک مشهد'){
    let edare="01";
   }
    await sabtModel.create({
      pKey,
      phone,
      meliCode,
      name,
      family,
      
      edare,
      darkhast,
      pasokh,
      rahgiry
      
    });
  
    return Response.json(
      { message: "User signed up successfully :))" },
      //{
      //  status: 201,
       // headers: { "Set-Cookie": `token=${accessToken};path=/;httpOnly=true` },
     // }
    );
  }