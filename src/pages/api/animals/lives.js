import prisma from "../../../lib/prisma";
export default async function handle(req, res) {
  const result = await prisma.animal.findMany({
    where: { live: true },
    orderBy: { name: "asc" },
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
