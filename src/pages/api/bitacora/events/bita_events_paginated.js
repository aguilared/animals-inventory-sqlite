import prisma from "@/lib/prisma";

export default async function handle1(req, res) {
  const { query } = req;
  const { search, tipo } = req.query;
  // IMPORTANTE: Si el cliente envía 'offset' (ej: 0, 9, 18), 
  // NO lo calcules de nuevo. Úsalo directamente en 'skip'.
  const offset = parseInt(query.offset) || 0; 
  const limit = parseInt(query.limit) || 15;

  try {
    if (offset < 0) {
      return res.status(400).json("Offset value should not be negative");
    }

    const count = await prisma.bitaEvents.count();

    // Consultamos los datos una sola vez
    const results = await prisma.bitaEvents.findMany({
      take: limit,
      skip: offset,
      where: {
        AND: [
          search
            ? {
                OR: [
                  { description: { contains: search, mode: "insensitive" } },
                  {
                    event: {
                      description: { contains: search, mode: "insensitive" },
                    },
                  },
                ],
              }
            : {},
          tipo
            ? {
                tipoEvent: { description: { equals: tipo } }, // Filtro por nombre de tipo
              }
            : {},
        ],
      },
      orderBy: {
        event_date: "desc", // Mantenemos el orden más nuevo primero
      },
      include: {
        event: { select: { id: true, description: true } },
        tipoEvent: { select: { id: true, description: true } },
        bitacora: { select: { id: true, author: true, bitacora_date: true } },
      },
    });

    // Calculamos si hay una siguiente página
    const nextOffset = offset + limit;
    const hasNext = nextOffset < count;

    return res.status(200).json({
      count,
      results,
      // Devolvemos el número exacto que debe enviar el cliente en la próxima llamada
      next: hasNext ? nextOffset : null, 
      previous: offset > 0 ? Math.max(0, offset - limit) : null,
      currentCountPerPage: results.length,
    });

  } catch (err) {
    console.error("Error en API:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}