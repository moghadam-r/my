import { cookies } from "next/headers";
import UserModel from "@/models/User";
import connectToDB from "@/configs/db";
import { verifyAccessToken } from "./auth";

const authUser = async () => {
  try {
    connectToDB();
    const token = cookies().get("token");
    let user = null;

    if (token) {
      const tokenPayload = verifyAccessToken(token.value);
      if (tokenPayload) {
        user = await UserModel.findOne({ pKey: tokenPayload.pKey });
        return user;
      }
      else {
        const res = await fetch("/api/refresh", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.status === 200) {

          return user;
        }
        if (res.status === 401) {
          return Response.json(
            { message: "Access denied !!" },
            { status: 401 }
          );
        }

      }
    }
  } catch (err) {
    return Response.json({ message: err.message }, { status: 500 });
  }

};

const authAdmin = async () => {
  try {
    connectToDB();
    const token = cookies().get("token");
    let user = null;

    if (token) {
      const tokenPayload = verifyAccessToken(token.value);
      if (tokenPayload) {
        user = await UserModel.findOne({ pKey: tokenPayload.pKey });
        if (user.role === "admin") {
          return user;
        } else {
          return null;
        }
      } else {
        const res = await fetch("/api/refresh", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.status === 200) {

          return user;
        }
        if (res.status === 401) {
          return Response.json(
            { message: "Access denied !!" },
            { status: 401 }
          );
        }

      }
    } else {
      return null;
    }
  } catch (err) {
    return Response.json({ message: err.message }, { status: 500 });
  }


};

export { authUser, authAdmin };
