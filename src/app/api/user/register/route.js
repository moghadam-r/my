import connectToDB from "@/configs/db";
import UserModel from "@/models/User";
import { generateAccessToken, hashPassword } from "@/utils/auth";
import { roles } from "@/utils/constants";
import { authAdmin } from "@/utils/serverHelpers";

export async function POST(req) {
    try {
        const isAdmin = await authAdmin();

        if (!isAdmin) {
            throw new Error("This api protected and you can't access it !!");
        }
        connectToDB();
        const body = await req.json();
        const { name, family, personeli, userName, password, phone, role } = body;

        // Validation (You)

        const isUserExist = await UserModel.findOne({
            $or: [{ userName }, { personeli }],
        });

        if (isUserExist) {
            return Response.json(
                {
                    message: "The username or personeli  exist already !!",
                },
                {
                    status: 422,
                }
            );
        }

        const hashedPassword = await hashPassword(password);
        const accessToken = generateAccessToken({ userName });

        const users = await UserModel.find({});

        await UserModel.create({
            name,
            family,
            personeli,
            userName,
            phone,
            role,
            password: hashedPassword,
            role: users.length > 0 ? roles.USER : roles.ADMIN,
        });

        return Response.json(
            { message: "User signed up successfully :))" },
            {
                status: 201,
                headers: { "Set-Cookie": `token=${accessToken};path=/;httpOnly=true` },
            }
        );
    } catch (err) {
        return Response.json({ message: err.message }, { status: 500 });
    }
}
