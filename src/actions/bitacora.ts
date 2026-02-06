export async function getBitacoraEvents(
  offsetParam: number = 0,
  search: string = "",
  tipo: string = "",
) {
  const limit = 9;
  // Construimos la URL con el nuevo parámetro de tipo
  const url = `${process.env.NEXT_PUBLIC_API_URL}bitacora/events/bita_events_paginated?offset=${offsetParam}&limit=${limit}&ordering=-bitacora_date&search=${encodeURIComponent(search)}&tipo=${encodeURIComponent(tipo)}`;
  console.log("Fetching URL:", url);
  try {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) throw new Error("Error en la petición");
    return await response.json();
  } catch (error) {
    console.error("Error en Server Action:", error);
    return null;
  }
}
