import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  let hoteles = jsonObject.req.body;
  hoteles.map((hotel) => {
    console.log(hotel);
  });

  try {
    //const conatactData = req.body //JSON.parse(req.body);
    const saveClase = await prisma.clase.create({
      data: req.body,
      select: {
        id: true,
      },
    });
    //const saveClase = "Contacts "+ conatactData
    res.status(200).json(saveClase);
  } catch (err) {
    console.log("from API error", err);
    res.status(400).json({ message: "Something went wrong" });
  }
}
