import prisma from "../../../../lib/prisma";

export default async function handle(req, res) {
  const result = await prisma.animal.findMany({
    where: {
      live: true,
    },
    orderBy: {
      id: "asc",
    },
   
  });
  res.json(result);
}
