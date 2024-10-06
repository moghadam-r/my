import connectToDB from "@/configs/db";

import sabtModel from "@/models/SabtDarkhast";

export async function PUT(req,{params}) {
  try {
    connectToDB();
    const body = await req.json();
    const { rahgiry,pasokh } = body;

    const req = await sabtModel.findOne({ rahgiry: rahgiry }).lean();
    await sabtModel.findOneAndUpdate(
      { rahgiry: rahgiry },
      {
        $set: {
          pasokh: req.pasokh === "USER" ? "ADMIN" : "USER",
        },
      }
    );

    return Response.json({ message: "User role updated successfully" });
  } catch (err) {
    return Response.json(
      { message: err },
      {
        status: 500,
      }
    );
  }
}