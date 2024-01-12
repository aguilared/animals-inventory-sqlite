import { useInfiniteQuery } from "@tanstack/react-query";
import fetchClient from "../services/fetchClient1";

type ResultData = {
  count: number;
  next: number;
  previous: number;
  results: Animal[];
};
export type Animal = {
  name: string;
  url: string;
};

const DATABASEURL = process.env.NEXT_PUBLIC_API_URL;

async function fetchAnimals({
  pageParam = 0,
}: {
  pageParam?: number;
}): Promise<ResultData> {
  const url = `${DATABASEURL}animals/animals_paginated?offset=${pageParam}&limit=3`;
  console.log("URL", url);

  const request = await fetchClient.get<ResultData>(url);

  return request.data;
}

export default function useAnimals(page: number) {
  return useInfiniteQuery(
    ["animalspage"],
    async ({ pageParam }) => {
      const animalspage = await fetchAnimals({ pageParam });
      console.log("AnimalsPage", animalspage);

      return animalspage;
    },
    {
      getNextPageParam: (lastPage) => lastPage?.next,
      getPreviousPageParam: (firstPage) => firstPage?.previous,
    }
  );
}
