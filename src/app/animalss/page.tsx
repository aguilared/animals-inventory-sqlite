"use client";
import React, { useEffect, useState } from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import Container from "@/components/Container";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import useUser from "@/hooks/useUser";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
  useMutation,
} from "@tanstack/react-query";
import axios from "axios";
import dayjs from "dayjs";
import Image from "next/image";
import { useOwners } from "@/hooks/useOwners";
import { useClases } from "@/hooks/useClases";
import { useVacas } from "@/hooks/useVacas";
import AnimalEdit from "@/components/Animals/AnimalEdit";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { IoMdClose } from "react-icons/io";
import Link from "next/link";

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

type Inputs = {
  alive: string;
  birthdate: string;
  clase_id: number;
  hierro: string;
  id: number;
  info: string;
  mother: string;
  mother_id: number;
  name: string;
  owner_id: number;
  tipopart: string;
  updated_at: string;
};

const dateAnimal = new Date();

const convertDate = (dateTo: any) => {
  const d = dayjs(dateTo).format("DD-MM-YYYY");
  return d;
};
const convertDate1 = (date: any) => {
  return dayjs(date).format("YYYY/MM/DD hh:mm");
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: 3,
  zIndex: 100,
  p: 4,
  pt: 2,
  px: 4,
  pb: 3,
  py: 4,
  "@media(max-height: 890px)": {
    top: "0",
    transform: "translate(-50%, 0%)",
  },
};

const Animals = (): React.JSX.Element => {
  const router = useRouter();

  const { isUser } = useUser();

  useEffect(() => {
    if (!isUser) {
      console.log("no hay Users ?? ", isUser);
      //router.push("/");
    }
  }, [isUser]);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["Animalss"],
    queryFn: async () => {
      const data = await axios.get(`${DATABASEURL}animals`);
      return data.data;
    },
  });
  //console.log("DATA", data);
  const { owners } = useOwners();
  const { clases } = useClases();
  const { vacas } = useVacas();

  const [modalCreate, setModalCreate] = React.useState(false);
  const modalCreateOpen = () => setModalCreate(true);
  const modalCreateClose = () => setModalCreate(false);

  const [modalEdit, setModalEdit] = React.useState(false);
  const modalEditOpen = () => setModalEdit(true);
  const modalEditClose = () => setModalEdit(false);

  const [modalDelete, setModalDelete] = React.useState(false);
  const modalDeleteOpen = () => setModalDelete(true);
  const modalDeleteClose = () => setModalDelete(false);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [animalAdd, setAnimalAdd] = useState({
    alive: "Si",
    birthdate: convertDate1(dateAnimal),
    clase_id: 1,
    hierro: "Si",
    info: "Hierro ... y .. Color ..., Cachos. ...",
    mother: "",
    mother_id: 0,
    name: "",
    owner_id: 1,
    tipopart: "Normal",
  });

  const [animalSeleccionada, setAnimalSeleccionada] = useState({
    id: "",
    alive: "",
    birthdate: "",
    clase_id: "",
    hierro: "",
    info: "",
    mother_id: "",
    name: "",
    owner_id: "",
    tipopart: "",
    updated_at: "",
  });

  const handleOnChange = (animalKey: any, value: any) => {
    setAnimalAdd({ ...animalAdd, [animalKey]: value });
  };

  const onSubmit = async () => {
    console.log("ACREATE", animalAdd);
    const parsedata = {
      alive: animalAdd.alive,
      birthdate: animalAdd.birthdate,
      clase_id: Number(animalAdd.clase_id),
      hierro: animalAdd.hierro,
      info: animalAdd.info,
      mother: animalAdd.mother,
      mother_id: animalAdd.mother_id,
      name: animalAdd.name,
      owner_id: Number(animalAdd.owner_id),
      tipopart: animalAdd.tipopart,
    };

    try {
      await fetch("/api/animals/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsedata),
      });
      refetch();
      //notify();
      toast.success("Animal created successfully");

      setModalCreate(false);
    } catch (error) {
      toast.success("Animal not created successfully");
      console.log(error);
    }
  };

  const [animalE, setAnimalE] = useState({
    alive: "",
    birthdate: convertDate1(dateAnimal),
    clase_id: 1,
    hierro: "",
    id: "",
    info: "",
    live: "false",
    mother: "",
    mother_id: 0,
    name: "",
    owner_id: 1,
    tipopart: "",
    updated_at: "2022-01-03 11:07",
  });

  const seleccionarAnimalE = (elemento: any, caso: any) => {
    setAnimalSeleccionada(elemento);
    setAnimalE({
      ...animalE,
      id: elemento.id,
      birthdate: elemento.birthdate,
      clase_id: elemento.clase_id,
      hierro: elemento.hierro,
      info: elemento.info,
      live: elemento.live,
      mother: elemento.mother,
      mother_id: elemento.mother_id,
      name: elemento.name,
      owner_id: elemento.owner_id,
      tipopart: elemento.tipopart,
      updated_at: elemento.updated_at,
    });
    caso === "Edit" ? modalEditOpen() : setModalEdit(false);
  };

  const handleOnChangeE = (animalKey: any, value: any) => {
    console.log("BitacoraKeyE", animalKey);
    console.log("BitacoraKeyValueE", value);
    setAnimalE({ ...animalE, [animalKey]: value });
  };

  const OnSubmitE = async () => {
    console.log("DataanimalE", animalE);

    const parsedataE = {
      alive: animalE.alive,
      birthdate: animalE.birthdate,
      clase_id: Number(animalE.clase_id),
      hierro: animalE.hierro,
      id: Number(animalE.id),
      info: animalE.info,
      live: animalE.live,
      mother: animalE.mother,
      mother_id: animalE.mother_id,
      name: animalE.name,
      owner_id: Number(animalE.owner_id),
      tipopart: animalE.tipopart,
    };
    console.log("DataEdit a", parsedataE);
    updatePostMutation.mutate(parsedataE);
  };

  const updatePostMutation = useMutation({
    mutationFn: (parsedataE: any) => {
      return axios.put("/api/animals/update", parsedataE);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["animal"] });
      //router.push("/animal/admin");
    },
  });

  const seleccionarAnimalD = (elemento: any, caso: any) => {
    setAnimalSeleccionada(elemento);
    caso === "Delete" ? modalDeleteOpen() : setModalDelete(false);
  };

  const eliminar = async () => {
    try {
      const result = await fetch(
        "/api/animals/delete/" + animalSeleccionada.id
      );
      refetch();
      toast.custom((t) => (
        <div
          className={`bg-white px-6 py-4 shadow-md rounded-full ${
            t.visible ? "animate-enter" : "animate-leave"
          }`}
        >
          Deleted successfully 👋
        </div>
      ));

      setModalDelete(false);
    } catch (error) {
      toast.custom((t) => (
        <div
          className={`bg-white px-6 py-4 shadow-md rounded-full ${
            t.visible ? "animate-enter" : "animate-leave"
          }`}
        >
          Not Deleted successfully 👋
        </div>
      ));
      console.log(error);
    }
  };
  const handleOnChange1 = () => {
    console.log("Key1");
  };
  return (
    <Container>
      <div className="flex rounded items-center justify-between flex-wrap bg-gray-500">
        <div className="flex-grow text-left text-gray-100 px-3 py-1 m-2 ">
          {" Admin Animals"}
        </div>
        <div className="flex-grow text-right px-3 py-1 m-2 text-gray-100">
          <Button color="success" variant="contained" onClick={modalCreateOpen}>
            Add
          </Button>
        </div>
      </div>
      {isLoading ? (
        <div className="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900" />
        </div>
      ) : null}
      {data && data?.length > 0
        ? data?.map((animal: any) => (
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
                    src={"/static/images/" + `${animal.id}` + ".jpg"}
                    alt="my Image"
                    width="212"
                    height="188"
                  />
                </a>
              </div>

              <div className="w-4/5 inline-block text-gray-700 text-left text-base px-1 py-0 m-0">
                ID= {animal.id} &nbsp;
                {animal.clase.id}&nbsp; {animal.clase.description}:&nbsp;
                <b> {animal.name}</b>, &nbsp; Dueno=
                {animal.owner.name}. &nbsp; <br />
                Nacimiento=
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
                  <input type="checkbox" placeholder="Live" className="mx-3" />
                )}{" "}
                <br />
                Tipo animal: <b>{animal.clase.description}</b> <br />
                Madre: {animal.mother},{" "}
                <a
                  className="bg-blue-200 rounded underline hover:underline hover:underline-offset-4"
                  href={`/animals/animal/4?id=${encodeURIComponent(
                    animal.mother_id
                  )}`}
                  target={"_blank"}
                  rel="noreferrer"
                >
                  {" "}
                  motherID:&nbsp; {animal.mother_id},{" "}
                </a>{" "}
                <br />
                Info= {animal.info} &nbsp;
                <br />
              </div>
              <td className="border px-2 py-2  text-gray-500 dark:text-white">
                <Link
                  href={`/animals/1?id=${encodeURIComponent(animal.id)}`}
                  passHref
                >
                  <a target="_blank">
                    <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold mr-1 py-1 px-1 rounded-full inline-flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 0 24 24"
                        width="24px"
                        fill="#000000"
                      >
                        <path d="M0 0h24v24H0z" fill="none" />
                        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                      </svg>
                    </button>
                  </a>
                </Link>
              </td>
            </div>
          ))
        : null}
    </Container>
  );
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Animals />
    </QueryClientProvider>
  );
}
