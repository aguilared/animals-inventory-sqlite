import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const result = await prisma.user.findMany({
    orderBy: {
      id: "asc",
    },
    select: {
      id: true,
      name: true,
      animal: {
        select: {
          name: true,
        },
      },
      _count: {
        select: {
          animal: { where: { live: true, clase_id: { in: [1] } } },
        },
      },
    },
  });
  res.json(result);
}
