import connectToDB from "@/configs/db";
import sabtModel from "@/models/SabtDarkhast";
import { authUser } from "@/utils/serverHelpers";



export async function GET(req, { params }) {
    try {
        const user = await authUser();
        if (!user) {
            throw new Error("This api protected and you can't access it !!");
        }
        connectToDB();

        const status = params.id[0];
        console.log("status", status)
        if (status == "T") {
            let responseItem = null;
            responseItem = await sabtModel.find(
                { answerd: true })
            
            return Response.json({ responseItem }

            );
        }
        if (status == "F") {
            let responseItem = null;
            responseItem = await sabtModel.find(
                { answerd: false })
            
            return Response.json({ responseItem }

            );
        }
        if (status == "TF") {
            let responseItem = null;
            responseItem = await sabtModel.find()
            
            return Response.json({ responseItem }

            );
        }
    } catch (err) {
        return Response.json({ message: err }, { status: 500 });
    }

}