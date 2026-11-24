import prisma from "../../../lib/prisma";

export default async function handle1(req, res) {
  const ID = 1;

  const result = await prisma.animal.findMany({
    where: {
      live: true,
      OR: [
        {
          clase_id: Number(ID),
        },
      ],
    },
    include: {
      owner: {
        select: { id: true, name: true },
      },
      clase: {
        select: { id: true, description: true },
      },
    },
    orderBy: { name: "asc" },
  });

  res.json(result);
}
