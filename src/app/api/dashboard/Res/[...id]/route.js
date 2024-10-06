import connectToDB from "@/configs/db";
import { authAdmin } from "@/utils/serverHelpers";
import sabtModel from "@/models/SabtDarkhast";



export async function PUT(req, { params }) {
  try {
    const isAdmin = await authAdmin();

    if (!isAdmin) {
      throw new Error("This api protected and you can't access it !!");
    }
    connectToDB();
    var datetime = new Date();
    var jalaliDate = new Intl.DateTimeFormat("fa").format(datetime);

    const meliCode = params.id[0];
    const rahgiry = params.id[1];
    const pasokh = params.id[2];

    const reqBody = await req.json();

    await sabtModel.findOneAndUpdate(
      { meliCode, rahgiry },
      {
        $set: {
          pasokh,
          answerd: "T",
          status: "پاسخ داده شده",
          dateSabt: jalaliDate,

        },
      }
    );


    return Response.json(
      { message: "Answer saved successfully :))" },
      { status: 201 }

    );
  } catch (err) {
    return Response.json({ message: err.message }, { status: 500 });
  }

}