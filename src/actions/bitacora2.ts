"use server";

export async function getBitacoraEvents(
  offsetParam: number = 0,
  search: string = "",
) {
  const limit = 9;
  const offset = offsetParam;

  try {
    // Añadimos el parámetro search a la URL
    const url = `${process.env.NEXT_PUBLIC_API_URL}bitacora/events/bita_events_paginated?offset=${offset}&limit=${limit}&ordering=-bitacora_date&search=${encodeURIComponent(search)}`;

    const response = await fetch(url, { cache: "no-store" });

    if (!response.ok) throw new Error("Error en la petición");

    return await response.json();
  } catch (error) {
    console.error("Error en Server Action:", error);
    return null;
  }
}
