import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const [
    vacas,
    totalVacas,
    totalVacasArqui,
    totalVacasJose,
    totalVacasAngel,
    totalVacasYoel,
    totalVacasCruz,
    totalVacasPetra,
    totalVacasMilagro
  ] = await prisma.$transaction([
    prisma.$queryRaw`SELECT id, name, owner_id  FROM animals WHERE clase_id =1 AND live = true  ORDER BY owner_id ASC`,
    prisma.$executeRaw`SELECT * FROM animals WHERE clase_id =1 AND live = true`,
    prisma.$executeRaw`SELECT * FROM animals WHERE clase_id =1 AND owner_id= 1 AND live = true`,
    prisma.$executeRaw`SELECT * FROM animals WHERE clase_id =1 AND owner_id= 2 AND live = true`,
    prisma.$executeRaw`SELECT * FROM animals WHERE clase_id =1 AND owner_id= 3 AND live = true`,
    prisma.$executeRaw`SELECT * FROM animals WHERE clase_id =1 AND owner_id= 4 AND live = true`,
    prisma.$executeRaw`SELECT * FROM animals WHERE clase_id =1 AND owner_id= 5 AND live = true`,  
    prisma.$executeRaw`SELECT * FROM animals WHERE clase_id =1 AND owner_id= 6 AND live = true`,
    prisma.$executeRaw`SELECT * FROM animals WHERE clase_id =1 AND owner_id= 7 AND live = true`,
  ]);

  res.json({
    totalVacas,
    totalVacasArqui,
    totalVacasJose,
    totalVacasAngel,
    totalVacasYoel,
    totalVacasCruz,
    totalVacasPetra,
    totalVacasMilagro,
    vacas,
  });
}
