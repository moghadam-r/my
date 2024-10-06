import connectToDB from "@/configs/db";

import sabtModel from "@/models/SabtDarkhast";
import { authUser } from "@/utils/serverHelpers";


export async function GET() {
  try {
    const user = await authUser();
    if (!user) {
      throw new Error("This api protected and you can't access it !!");
    }
    connectToDB();


    let responseItem = null;
    responseItem = await sabtModel.find(
    )
    console.log("responseItem ====>", responseItem)
    return Response.json(responseItem);
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }

}