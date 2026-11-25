import prisma from "../../../lib/prisma";

export default async function handle1(req, res) {
  const ID = 35;
  const result = await prisma.animal.findUnique({
    where: {
      id: Number(ID),
    },
    include: {
      owner: {
        select: { id: true, name: true },
      },
      clase: {
        select: { id: true, description: true },
      },
    },
  });

  res.json(result);
}
