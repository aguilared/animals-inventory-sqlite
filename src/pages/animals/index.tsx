import React, { useState } from "react";
import Container from "../../components/Container";

import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import axios from "axios";
import dayjs from "dayjs";
import Image from "next/image";

const DATABASEURL = process.env.NEXT_PUBLIC_API_URL;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: true,
      staleTime: 10000,
    },
  },
});

const dateAnimal = new Date();

const convertDate = (dateTo: any) => {
  const d = dayjs(dateTo).format("DD/MM/YYYY");
  return d;
};
const convertDate1 = (date: any) => {
  return dayjs(date).format("YYYY/MM/DD hh:mm");
};

interface Clasei {
  description: string;
  id: number;
  updated_at: string;
}
export type Clase = {
  id: number;
  description: string;
};
interface Owner {
  name: string;
  id: number;
  updated_at: string;
}
interface Animal {
  alive: string;
  birthdate: string;
  clase_id: number;
  clase: [Clase];
  hierro: string;
  id: number;
  info: string;
  live: boolean;
  mother_id: number;
  mother: string;
  name: string;
  owner_id: number;
  owner: [Owner];
  tipopart: string;
  updated_at: string;
}

const Animals = (): React.JSX.Element => {
  const { data, isLoading, refetch } = useQuery(["Animalss"], async () => {
    const res = await axios.get(`${DATABASEURL}animals`);
    return res.data;
  });
  console.log("DATAnimals", data);

  const [modalViewHist, setModalViewHist] = useState(false);

  // to viewAnimal
  const [animalSeleccionada1, setAnimalSeleccionada1] = useState({
    id: "",
    description: "",
    updated_at: "",
  });

  // to viewHist
  const seleccionarAnimal1 = (elemento: any, caso: any) => {
    setAnimalSeleccionada1(elemento);
    console.log("ELEMENTOTO VIEW", elemento);
    console.log("CASO", caso);
    caso === "Mostrar" ? setModalViewHist(true) : setModalViewHist(false);
  };

  return (
    <Container>
      <QueryClientProvider client={queryClient}>
        {isLoading ? (
          <div className="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900" />
          </div>
        ) : null}

        <div className="flex rounded items-center justify-between flex-wrap bg-gray-500">
          <div className="flex-grow text-left text-gray-100 px-3 py-1 m-2 ">
            {" List Animals "}
          </div>
        </div>
        {data && data.length > 0
          ? data.map((animal: Animal) => (
              <div
                className="flex rounded items-left bg-gray-100 mb-1 shadow"
                key={animal.id}
              >
                <div className="inline-block text-gray-700 text-left px-1 py-0 m-0">
                  <a
                    href={"/static/images/" + `${animal.id}` + ".jpg"}
                    target={"_blank"}
                    rel="noreferrer"
                  >
                    <Image
                      onClick={() => seleccionarAnimal1(animal, "Mostrar")}
                      src={"/static/images/" + `${animal.id}` + ".jpg"}
                      alt="my Image"
                      width="212"
                      height="188"
                    />
                  </a>
                </div>
                <div className="w-4/5 inline-block text-gray-700 text-left text-base px-1 py-0 m-0">
                  <a
                    href={`/animals/${encodeURIComponent(animal.id)}`}
                    target={"_blank"}
                    rel="noreferrer"
                  >
                    {" "}
                    Id:&nbsp; {animal.id},{" "}
                  </a>{" "}
                  <br />
                  {animal.clase.description}:<b> {animal.name}</b>
                  <br />
                  Dueno:&nbsp;
                  {animal.owner.name}
                  <br />
                  Nacimiento:&nbsp;
                  {convertDate(animal.birthdate)}, Live:
                  {animal.live! ? (
                    <input
                      type="checkbox"
                      checked
                      placeholder="Live"
                      onChange={() => console.log("change")}
                      className="mx-3"
                    />
                  ) : (
                    <input
                      type="checkbox"
                      placeholder="Live"
                      className="mx-3"
                    />
                  )}{" "}
                  <br />
                  Madre: {animal.mother},{" "}
                  <a
                    href={`/animals/${encodeURIComponent(animal.mother_id)}`}
                    target={"_blank"}
                    rel="noreferrer"
                  >
                    {" "}
                    motherID:&nbsp; {animal.mother_id},{" "}
                  </a>{" "}
                  <br />
                  Info:&nbsp; {animal.info} &nbsp;
                  <br />
                </div>
              </div>
            ))
          : null}
      </QueryClientProvider>
    </Container>
  );
};

export default Animals;
