import prisma from "../../../lib/prisma";
export default async function handle(req, res) {
  const result = await prisma.animal.findMany({
    where: { clase_id: { in: [1, 2, 3, 8, 10] } ,
    },
    orderBy: {
      name: "asc",
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
