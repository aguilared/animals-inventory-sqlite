import prisma from "../../../../lib/prisma";

export default async function handle(req, res) {
  const ID = req.query.id;
  const response = await prisma.animal.update({
    where: { id: Number(ID) },
    data: req.body,
  });
  console.log("RESPONSE", response);
  res.json(response);
}
