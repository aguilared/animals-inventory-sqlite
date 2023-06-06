import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    //const conatactData = req.body //JSON.parse(req.body);
    const saveUser = await prisma.user.create({
      data: req.body,
      select: {
        id: true,
      },
    });
    //const saveUser = "Contacts "+ conatactData
    res.status(200).json(saveUser);
  } catch (err) {
    console.log("from API error", err);
    res.status(400).json({ message: "Something went wrong" });
  }
}
