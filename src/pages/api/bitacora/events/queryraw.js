import prisma from "../../../../lib/prisma";

export default async function handle(req, res) {
  console.log("REQU", req.query);

  const query = req.query;
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 15;
  const last_page = req.query.last_page;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const word1 = query.word;
  const word = "%" + word1 + "%";
  const result =
    await prisma.$queryRaw`SELECT event_date, be.id, bitacora_id, te.id, te.description , e.id, e.description event, be.description 
    FROM bita_events be 
    inner join tipo_events te on te.id = be.tipo_event_id 
    inner join events e on e.id = be.events_id 
    WHERE (be.description LIKE ${word}) or (e.description LIKE ${word}) 
    order by event_date desc Limit ${limit}`;
  res.status(200).json(result);

}
