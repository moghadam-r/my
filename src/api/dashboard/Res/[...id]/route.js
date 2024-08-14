import connectToDB from "@/configs/db";

import sabtModel from "@/models/SabtDarkhast";



export async function GET(req,{params}) {
  connectToDB();
  
  const meliCode=params.id[0];
  const rahgiry=params.id[1];
  let responseItem = null;
  responseItem = await sabtModel.findOne(
      {meliCode:meliCode,rahgiry:rahgiry})
        console.log("responseItem ====>",responseItem)
   return Response.json(responseItem.pasokh);
   
}