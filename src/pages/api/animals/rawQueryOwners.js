import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const [animals, totalAnimals, owners] = await prisma.$transaction([
    prisma.$executeRaw`SELECT count(a.owner_id), u.name 
FROM public.animals a
inner join users u on u.id = a.owner_id
where live = true
group by owner_id, u.name
order by u.name asc ;`,
  ]);

  res.json({ totalAnimals, animals, owners });
}
