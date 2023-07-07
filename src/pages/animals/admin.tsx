import React, { BaseSyntheticEvent, useState } from "react";
import Link from "next/link";
import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import StreetviewRoundedIcon from "@mui/icons-material/ThreeDRotation";
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
import { useRouter } from "next/router";

const notify = () =>
  toast.custom((t) => (
    <div
      className={`bg-white px-6 py-4 shadow-md rounded-full ${
        t.visible ? "animate-enter" : "animate-leave"
      }`}
    >
      Animal updated successfully 👋
    </div>
  ));

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

const style1 = {
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
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // other styles...
  width: "52%",
  maxWidth: "600px",
  minWidth: "270px",
  boxShadow: 24,
  py: 4,
  borderRadius: 3,
  zIndex: 100,
  // media query @ the max height you want (my case is the
  // height of the viewport before the cutoff phenomenon) -
  // set the top to '0' and translate the previous 'y'
  // positioning coordinate so the top of the modal is @ the
  // top of the viewport
  "@media(max-height: 890px)": {
    top: "0",
    transform: "translate(-50%, 0%)",
  },
};

const Animals = (): React.JSX.Element => {
  const router = useRouter();

  const { isUser } = useUser();
  if (!isUser) {
    toast.error("Please Sign In, You Are Being Redirected");
    setTimeout(function () {
      router.push("/login/");
    }, 5000);
  }

  const { data, isLoading, refetch } = useQuery(["Animalss"], async () => {
    const res = await axios.get(`${DATABASEURL}animals`);
    return res.data;
  });

  const { owners } = useOwners();
  const { clases } = useClases();
  const { vacas } = useVacas();

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

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openDelete, setOpenDelete] = React.useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = async () => {
    console.log("FormData", animalAdd);
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
      toast.success("Animal created successfully");

      setOpen(false);
    } catch (error) {
      toast.success("Animal not created successfully");
      console.log(error);
    }
  };

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

  const seleccionarAnimal = (elemento: any, caso: any) => {
    setAnimalSeleccionada(elemento);
    console.log("ELEMENTO Eliminar o Editar", elemento);
    console.log("CASO Eliminar o Editar", caso);
    caso === "Editar" ? setOpenDelete(false) : setOpenDelete(true);
  };

  const eliminar = async () => {
    try {
      console.log("Entra a Borrar");
      const result = await fetch(
        "/api/animals/delete/" + animalSeleccionada.id
      );
      // await removeAnimal(animalSeleccionada.id);
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
      setOpenDelete(false);
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

  const handleOnChange = (animalKey: any, value: any) => {
    console.log("valueOnChangeAdd", value);
    setAnimalAdd({ ...animalAdd, [animalKey]: value });
    console.log("SETanimalAdd", animalAdd);
  };

  return (
    <Container>
      <QueryClientProvider client={queryClient}>
        <div className="flex rounded items-center justify-between flex-wrap bg-gray-500">
          <div className="flex-grow text-left text-gray-100 px-3 py-1 m-2 ">
            {" Admin Bitacoras"}
          </div>
          <Button onClick={handleOpen}>Open modal</Button>
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
                      onClick={() => seleccionarAnimal(animal, "Mostrar")}
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
                    onClick={() => seleccionarAnimal(animal, "Eliminar")}
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
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{ ...style1, width: 400 }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add Animal
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <form className="w-full max-w-lg  bg-gray-400 shadow-md rounded">
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
                  {errors.owner_id && <p>This field is required</p>}{" "}
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
                  {errors.clase_id && <p>This field is required</p>}{" "}
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
                  {errors.mother_id && <p>This field is required</p>}{" "}
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
          open={openDelete}
          onClose={handleCloseDelete}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{ ...style1, width: 400 }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Estás Seguro que deseas eliminar el Animal ID:{" "}
              {animalSeleccionada && animalSeleccionada.id}
            </Typography>
            <Typography>
              <button className="btn btn-danger" onClick={() => eliminar()}>
                Sí
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setOpenDelete(false)}
              >
                No
              </button>
            </Typography>
          </Box>
        </Modal>
      </QueryClientProvider>
    </Container>
  );
};

export default Animals;
