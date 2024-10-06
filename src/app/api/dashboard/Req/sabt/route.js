import connectToDB from "@/configs/db";
import { verifyAccessToken } from "@/utils/auth";
import { cookies } from "next/headers";
import sabtModel from "@/models/SabtDarkhast";
import { authUser } from "@/utils/serverHelpers";

export async function POST(req) {
  try {
    const user = await authUser();
    if (!user) {
      throw new Error("This api protected and you can't access it !!");
    }
    connectToDB();
    const body = await req.json();
    const { pKey, name, family, darkhast, rahgiry, pasokh, phone, meliCode } = body;
    var datetime = new Date();
    var jalaliDate = new Intl.DateTimeFormat("fa").format(datetime);
    let dateSabt = ""
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



    await sabtModel.create({
      pKey,
      phone,
      meliCode,
      name,
      family,
      darkhast,
      pasokh,
      rahgiry,
      date: jalaliDate,
      dateSabt

    });

    return Response.json(
      { message: "Request saved  successfully :))" },
      //{
      //  status: 201,
      // headers: { "Set-Cookie": `token=${accessToken};path=/;httpOnly=true` },
      // }
    );
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}