"use client";
import React, { useEffect, useState } from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import Container from "../../components/Container";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import useUser from "../../hooks/useUser";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import axios from "axios";
import dayjs from "dayjs";
import Image from "next/image";
import { useOwners } from "../../hooks/useOwners";
import { useClases } from "../../hooks/useClases";
import { useVacas } from "../../hooks/useVacas";
import AnimalEdit from "../../components/Animals/AnimalEdit";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

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
      router.push("/");
    }
  }, [isUser, router]);

  const { data, isLoading, refetch } = useQuery(["Animalss"], async () => {
    const res = await axios.get(`${DATABASEURL}animals`);
    return res.data;
  });

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
    setAnimalE({ ...animalE, [animalKey]: value });
  };

  const onSubmitE = async () => {
    const parsedata = {
      alive: animalE.alive,
      birthdate: animalE.birthdate,
      clase_id: Number(animalE.clase_id),
      hierro: animalE.hierro,
      id: Number(animalE.id),
      info: animalE.info,
      mother: animalE.mother,
      mother_id: animalE.mother_id,
      name: animalE.name,
      owner_id: Number(animalE.owner_id),
      tipopart: animalE.tipopart,
    };
    try {
      const result = await fetch("/api/animals/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsedata),
      });
      //notify();
      toast.success("Animal updated successfully");

      refetch();
      setModalEdit(false);
    } catch (error) {
      console.log(error);
    }
  };

  const seleccionarAnimalD = (elemento: any, caso: any) => {
    setAnimalSeleccionada(elemento);
    caso === "Delete" ? modalDeleteOpen() : setModalDelete(false);
  };

  const eliminar = async () => {
    try {
      const result = await fetch(
        "/api/animals/delete/" + animalSeleccionada.id
      );
      //notify();
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

  return (
    <Container>
      <QueryClientProvider client={queryClient}>
        <div className="flex rounded items-center justify-between flex-wrap bg-gray-500">
          <div className="flex-grow text-left text-gray-100 px-3 py-1 m-2 ">
            {" Admin Bitacoras"}
          </div>
          <div className="flex-grow text-right px-3 py-1 m-2 text-gray-100">
            <Button
              color="success"
              variant="contained"
              onClick={modalCreateOpen}
            >
              Add
            </Button>
          </div>
        </div>
        {isLoading ? (
          <div className="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900" />
          </div>
        ) : null}
        {data && data.length > 0
          ? data.map((animal: any) => (
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
                  {convertDate(animal.birthdate)}. &nbsp; <br />
                  Info= {animal.info} &nbsp;
                </div>
                <div className="inline-block text-gray-700 text-right px-1 py-1 m-0">
                  <button
                    onClick={() => seleccionarAnimalE(animal, "Edit")}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-1 px-0 mr-1 rounded-full inline-flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-edit"
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </button>
                </div>
                <div className="inline-block text-gray-700 text-right px-1 py-1 m-0">
                  <button
                    onClick={() => seleccionarAnimalD(animal, "Delete")}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-1 px-0 mr-1 rounded-full inline-flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-trash-2"
                    >
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      <line x1="10" y1="11" x2="10" y2="17" />
                      <line x1="14" y1="11" x2="14" y2="17" />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          : null}

        <Modal
          sx={{ overflowY: "scroll" }}
          disableScrollLock={false}
          open={modalCreate}
          onClose={modalCreateClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{ ...style, width: 400 }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add Animal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <form
                name="create"
                className="w-full max-w-lg  bg-gray-400 shadow-md rounded"
              >
                <div className="md:w-11/12 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                    htmlFor="Name"
                  >
                    Nombre
                  </label>
                  <input
                    className="appearance-none block w-full border border-grey-lighter rounded py-3 px-2"
                    type="text"
                    placeholder="Name"
                    defaultValue={animalAdd.name}
                    {...register("name", {
                      required: "Required",
                      minLength: 3,
                      maxLength: 41,
                    })}
                    onChange={(e) => handleOnChange("name", e.target.value)}
                  />
                  {errors.name && (
                    <span className="text-xs text-red-700">
                      {errors.name.message}
                    </span>
                  )}
                </div>
                <div className="md:w-11/12 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-xs font-bold mb-2"
                    htmlFor="birthdate"
                  >
                    Nacimiento
                  </label>
                  <input
                    className="appearance-none block w-full border border-grey-lighter rounded py-3 px-2"
                    type="text"
                    placeholder="Date Event"
                    defaultValue={animalAdd.birthdate}
                    {...register("birthdate", {
                      required: "Required",
                      minLength: 3,
                      maxLength: 41,
                    })}
                    onChange={(e) =>
                      handleOnChange("birthdate", e.target.value)
                    }
                  />
                  {errors.birthdate && (
                    <span className="text-xs text-red-700">
                      {errors.birthdate.message}
                    </span>
                  )}
                </div>

                <div className="md:w-11/12 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-xs font-bold mb-2"
                    htmlFor="owner_id"
                  >
                    Dueno
                  </label>
                  <Controller
                    name="owner_id"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, value, name, ref } }) => {
                      return (
                        <Select
                          defaultValue={{ label: "Seleccione..", value: 0 }}
                          options={owners}
                          value={owners.find((c) => c.value === value)}
                          name={name}
                          onChange={(val) => {
                            onChange(val!.value);
                            handleOnChange("owner_id", val!.value);
                          }}
                        />
                      );
                    }}
                  />
                  {errors.owner_id && (
                    <span className="text-xs text-red-700">
                      {errors.owner_id.message}
                    </span>
                  )}
                </div>

                <div className="md:w-11/12 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-xs font-bold mb-2"
                    htmlFor="clase_id"
                  >
                    Clase Animal
                  </label>
                  <Controller
                    name="clase_id"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, value, name, ref } }) => {
                      return (
                        <Select
                          defaultValue={{ label: "Seleccione..", value: 0 }}
                          options={clases}
                          value={clases.find((c) => c.value === value)}
                          name={name}
                          onChange={(val) => {
                            onChange(val!.value);
                            handleOnChange("clase_id", val!.value);
                          }}
                        />
                      );
                    }}
                  />
                  {errors.clase_id && (
                    <span className="text-xs text-red-700">
                      {errors.clase_id.message}
                    </span>
                  )}
                </div>

                <div className="md:w-11/12 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-xs font-bold mb-2"
                    htmlFor="mother_id"
                  >
                    Madre
                  </label>
                  <Controller
                    name="mother_id"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, value, name, ref } }) => {
                      return (
                        <Select
                          defaultValue={{ label: "Seleccione..", value: 0 }}
                          options={vacas}
                          value={vacas.find((c) => c.value === value)}
                          name={name}
                          onChange={(val) => {
                            onChange(val!.value);
                            handleOnChange("mother_id", val!.value);
                          }}
                        />
                      );
                    }}
                  />
                  {errors.mother_id && (
                    <span className="text-xs text-red-700">
                      {errors.mother_id.message}
                    </span>
                  )}
                </div>

                <div className="md:w-11/12 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-xs font-bold mb-2"
                    htmlFor="mother"
                  >
                    Nombre Madre
                  </label>
                  <input
                    className="appearance-none block w-full border border-grey-lighter rounded py-3 px-2"
                    type="text"
                    placeholder="Madre"
                    defaultValue={animalAdd.mother}
                    {...register("mother", {
                      required: "Required",
                      minLength: 3,
                      maxLength: 41,
                    })}
                    onChange={(e) => handleOnChange("mother", e.target.value)}
                  />
                  {errors.mother && (
                    <span className="text-xs text-red-700">
                      {errors.mother.message}
                    </span>
                  )}
                </div>
                <div className="md:w-11/12 px-3 py-3mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-xs font-bold mb-2 py-1"
                    htmlFor="hierro"
                  >
                    Hierro
                  </label>
                  <input
                    className="appearance-none block w-full bg-grey-lighter border border-grey-lighter rounded py-2 px-2 p-1 h-4"
                    placeholder="hierro"
                    defaultValue={animalAdd.hierro}
                    {...register("hierro", {
                      required: true,
                    })}
                    onChange={(e) => handleOnChange("hierro", e.target.value)}
                  />
                  {errors.hierro && (
                    <span className="text-xs text-red-700">
                      {errors.hierro.message}
                    </span>
                  )}
                </div>

                <div className="md:w-11/12 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                    htmlFor="tipopart"
                  >
                    Tipo parto
                  </label>
                  <input
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                    placeholder="tipopart"
                    defaultValue={animalAdd.tipopart}
                    {...register("tipopart", {
                      required: true,
                    })}
                    onChange={(e) => handleOnChange("tipopart", e.target.value)}
                  />
                  {errors.tipopart && (
                    <span className="text-xs text-red-700">
                      {errors.tipopart.message}
                    </span>
                  )}
                </div>
                <div className="md:w-11/12 px-3 mb-6 md:mb-0">
                  <label
                    className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                    htmlFor="info"
                  >
                    Infos
                  </label>
                  <textarea
                    cols={100}
                    rows={6}
                    className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                    placeholder="info"
                    defaultValue={animalAdd.info}
                    {...register("info", {
                      required: true,
                    })}
                    onChange={(e) => handleOnChange("info", e.target.value)}
                  />
                  {errors.info && (
                    <span className="text-xs text-red-700">
                      {errors.info.message}
                    </span>
                  )}
                </div>

                <br></br>
              </form>{" "}
              <br></br>
              <div className="md:w-11/12 px-3 mb-6 md:mb-0">
                <Button onClick={handleSubmit(onSubmit)} variant={"outlined"}>
                  Submit
                </Button>
              </div>
            </Typography>
          </Box>
        </Modal>
        <Modal
          sx={{ overflowY: "scroll" }}
          disableScrollLock={false}
          open={modalEdit}
          onClose={modalEditClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{ ...style, width: 400 }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Edit Animall {animalSeleccionada.id} {animalSeleccionada.name}
            </Typography>
            <AnimalEdit
              animalSeleccionada2={animalSeleccionada}
              onSubmitE={onSubmitE}
              handleOnChangeE={handleOnChangeE}
              owners={owners}
              clases={clases}
              onClose={modalEditClose}
            />
          </Box>
        </Modal>
        <Modal
          sx={{ overflowY: "scroll" }}
          disableScrollLock={false}
          open={modalDelete}
          onClose={modalDeleteClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{ ...style, width: 400 }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Estás Seguro que deseas eliminar el Animal ID:{" "}
              {animalSeleccionada.id}
            </Typography>
            <Typography>
              <button className="btn btn-danger" onClick={() => eliminar()}>
                Sí
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => modalDeleteClose()}
              >
                No
              </button>
              <button className="btn btn-secondary" onClick={() => notify()}>
                Notyft
              </button>
            </Typography>
          </Box>
        </Modal>
      </QueryClientProvider>
    </Container>
  );
};

export default Animals;
