import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowedddd Animal" });
  }

  try {
    //const conatactData = req.body //JSON.parse(req.body);
    const saveAnimal = await prisma.animal.create({
      data: req.body,
      select: {
        id: true,
      },
    });
    //const saveAnimal = "Contacts "+ conatactData
    res.status(200).json(saveAnimal);
  } catch (err) {
    console.log("from API error", err);
    res.status(400).json({ message: "Something went wrong" });
  }
}
