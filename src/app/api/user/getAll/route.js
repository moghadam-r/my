import connectToDB from "@/configs/db";
import { verifyAccessToken } from "@/utils/auth";
import { cookies } from "next/headers";
import OtpModel from "@/models/Otp";

export async function GET(req) {
  connectToDB();
  const token = cookies().get("token");
  console.log("token==>",token);
  let user = null;

  if (token) {
    const tokenPayload = verifyAccessToken(token.value);
    console.log("tokenPayload==>",tokenPayload);
    if (tokenPayload) {
      user = await OtpModel.findOne(
        { pKey: tokenPayload.pKey } ,
      //  "-password -refreshToken -__v"
      );
     // console.log("pKey====>",user.pKey);
      console.log("user====>",user);
    }

    return Response.json(user);
  } else {
    return Response.json(
      {
        data: null,
        message: "Not access !!",
      },
      { status: 401 }
    );
  }
}