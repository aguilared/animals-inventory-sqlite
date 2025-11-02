import prisma from "../../../../lib/prisma";

export default async function handle(req, res) {
  const result = await prisma.user.findMany({
    orderBy: {
      id: "asc",
    },
    include: {
      animal: {
        where: { live: true,  },
        select: { id: true, name: true, live: true },
      },
      _count: {
        select: {
          animal: { where: { live: true,  } },
        },
      },
    },
  });
  res.json(result);
}
