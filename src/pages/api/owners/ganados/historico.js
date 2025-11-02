import prisma from "@/lib/prisma";

export default async function handle(req, res) {
  const result = await prisma.user.findMany({
    orderBy: {
      id: "asc",
    },
    include: {
      animal: {
        where: { clase_id: { in: [1, 2, 3, 8, 9, 10] } },
        select: {
          id: true,
          name: true,
          live: true,
        },
      },
      _count: {
        select: {
          animal: { where: { clase_id: { in: [1, 2, 3, 8, 9,10] } } },
        },
      },
    },
  });
  res.json(result);
}
