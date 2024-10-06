import connectToDB from "@/configs/db";

import sabtModel from "@/models/SabtDarkhast";



export async function PUT(req){//}, { params }) {
    connectToDB();

    //const meliCode = params.id[0];
    //const rahgiry = params.id[1];
    //const pasokh = params.id[2];
    //console.log("meliCode---->",meliCode)
    const reqBody = await req.json();
    //console.log("reqBody---->",reqBody)
    const { pasokh,meliCode,rahgiry } =reqBody;
    //console.log("pasokh---->",pasokh)
    //console.log("meliCode1---->",meliCode1)
    let responseItem = null;
    await sabtModel.findOneAndUpdate(
        { meliCode,rahgiry },
        {
          $set: {
            pasokh
          },
        }
      );

   
      return Response.json(
        { message: "Answer saved successfully :))" },
        { status: 201 }

    );

}