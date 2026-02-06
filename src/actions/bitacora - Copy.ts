"use server";

export async function getBitacoraEvents(offsetParam: number = 0) {
  const limit = 9;

  // ELIMINAMOS: const offset = (pageParam - 1) * limit;
  // USAMOS directamente el valor que viene del cliente:
  const offset = offsetParam;

  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}bitacora/events/bita_events_paginated?offset=${offset}&limit=${limit}&ordering=-bitacora_date`;

    console.log("Fetching URL:", url); // Aquí verás ahora offset=0, offset=9, etc.

    const response = await fetch(url, {
      cache: "no-store",
    });

    if (!response.ok) throw new Error("Error en la petición");

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en Server Action:", error);
    return null;
  }
}
