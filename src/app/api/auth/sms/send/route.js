const request = require("request");
import connectToDB from "@/configs/db";
import OtpModel from "@/models/Otp";
import { generateAccessToken, generateRefreshToken } from "@/utils/auth";

export async function POST(req) {
  console.log("Post Api..........")
  try {

    let pKey = false;
    pKey = Date.now();


    connectToDB();

    if (req.method !== "POST") {
      return false;
    }

    const body = await req.json();
    const { phone, meliCode } = body;

    const now = new Date();
    const expTime = now.getTime() + 300_000; // 5 Mins

    const code = Math.floor(Math.random() * 99999);
    let strpKey = pKey.toString() + phone.toString();

    pKey = Number(strpKey);
    const accessToken = generateAccessToken({ pKey });
    const refreshToken = generateRefreshToken({ pKey });


    request.post(
      {
        url: "https://sms.3300.ir/api/wsSend.ashx",
        body: {

          username: "kh-ro",
          //  password: "r@zAv!1398*",
          line: "9830007485",
          mobile: "09155172448",
          message: { "verification-code": code },
          type: 0,
          template: 0,

        },
        json: true,

      },

      async function (error, response, body) {

        if (!error) {
          //YOU‌ CAN‌ CHECK‌ THE‌ RESPONSE‌ AND SEE‌ ERROR‌ OR‌ SUCCESS‌ MESSAGE

          await OtpModel.create({
            pKey,
            phone,
            code,
            expTime,
            meliCode,
            refreshToken,

          });
          
        } else {
          return response.json({ message: "UnKnown Error !!" }, { status: 500 });
        }
      }
    );
    const headers = new Headers();
    headers.append("Set-Cookie", `token=${accessToken};path=/;httpOnly=true;`);
    headers.append(
      "Set-Cookie",
      `refresh-token=${refreshToken};path=/;httpOnly=true;`
    );
    return Response.json(

      { message: "Code sent successfully :))" },
      {
        status: 201,
        headers,
        // headers: {
        //   "Set-Cookie": `token=${accessToken};path=/;httpOnly=true;`,
          
        // },
      }
    );

    // } //end validate IF


  } catch (err) {

    console.log(err)
    return Response.json({ message: err.message }, { status: 500 });
  }

}
