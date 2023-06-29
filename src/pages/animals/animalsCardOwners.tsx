import { useState, BaseSyntheticEvent, useEffect } from "react";
import type { NextPage } from "next";
import Container from "../../components/Container";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import Interweave from "interweave";
import axios from "axios";
import Select from "react-select";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useOwners } from "../../hooks/useOwners";
import Image from "next/image";

type Inputs = {
  alive: string;
  birthdate: string;
  clase_id: number;
  hierro: string;
  id: number;
  info: string;
  mother: string;
  name: string;
  owner_id: number;
  tipopart: string;
  updated_at: string;
};

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
const convertDate = (date: any) => {
  return dayjs(date).format("DD/MM/YYYY");
};
const convertDate1 = (date: any) => {
  return dayjs(date).format("YYYY/MM/DD hh:mm");
};

const AnimalsCardQuery: NextPage = () => {
  const { owners } = useOwners();
  const [ownerId, setOwnerId] = useState();
  const [bitacoraSearch, setBitacoraSearch] = useState();
  const [datafilter, setDatafilter] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<Inputs>();

  const { status, data, error, isLoading, refetch } = useQuery(
    ["animals"],
    async (filter: any = ownerId) => {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}animals/`);
      console.log("DATA1", res);
      return res.data;
    }
  );

  useEffect(() => {
    if (status === "success") {
      console.log("====================================");
      console.log("renders");
      console.log("====================================");
      setDatafilter(data);
    }
  }, [data, status]);

  const handleOnChange = (ownerKey: any, value: any) => {
    console.log("valueOnChangeAdd", value);
    setBitacoraSearch(value);

    const newData = data.filter(
      (bitacora: any) => bitacora.owner_id === Number(value)
    );
    return setDatafilter(newData);
  };

  const handleSearchOnChange = (ownerKey: any, value: any) => {
    console.log("Value", value);
    console.log("OwnerKey", ownerKey);
    console.log("BitacoraSearch", bitacoraSearch);
    setBitacoraSearch(value);
    console.log("BitacoraSearchLuego", bitacoraSearch);
  };

  const searchs = () => {
    console.log("BitacoraSearchhhhhh", bitacoraSearch);

    const value = bitacoraSearch;
    console.log("ValueSearchvvvvv", value);
    if (!value || value === "") {
      return setDatafilter(data); //retorna a la data original
    }
    //filtrando la data al hacer un search
    const newData = data.filter(
      (bitacora: any) => bitacora.owner_id === Number(value)
    );
    return setDatafilter(newData);
  };

  return (
    <Container>
      <QueryClientProvider client={queryClient}>
        <div className="container mx-auto px-20">
          <h1 className="text-gray-600 text-5xl font-bold">
            Query List Animals{" "}
          </h1>
        </div>

        <div className="flex mb-4">
          <div className="w-1/2 p-2 text-center bg-green-400">
            {" "}
            <Controller
              name="owner_id"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value, name, ref } }) => {
                //console.log("CurrentSelection", currentSelection);

                return (
                  <Select
                    inputRef={ref}
                    defaultValue={{ label: "Seleccione..", value: 0 }}
                    options={owners}
                    name={name}
                    onChange={(val) => void {
                      onChange(val?.value);
                      setOwnerId(val?.value);
                      handleSearchOnChange("owner_id", val.value);
                    }}
                    onBlur={() => searchs()}   
                  />
                );
              }}
            />
          </div>
          <div className="w-1/2 p-2 text-left bg-green-500">
            <button
              type="submit"
              onClick={() => searchs()}
              className="absolute w-10 h-10 rounded-full inline p-2 shadow"
            >
              {" "}
              <svg
                className="text-gray-100 w-6 h-6 fill-current"
                viewBox="0 0 56.966 56.966"
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                id="Capa_1"
                x="0px"
                y="0px"
                width="512px"
                height="512px"
              >
                <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {datafilter ? (
            datafilter.map((animal: any, key: any) => (
              <>
                <Card
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <CardMedia>
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <Image
                        src={"/static/images/" + `${animal.id}` + ".jpg"}
                        width={520}
                        height={400}
                        alt=""
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  </CardMedia>
                  <CardContent>
                    <Typography variant="h6" align="left" component="div">
                      Animal ID: {animal.id},{" "}
                      <a
                        href={`/animals/animalId/${encodeURIComponent(
                          animal.id
                        )}`}
                        target={"_blank"}
                        rel="noreferrer"
                      >
                        {" "}
                        Animal ID: {animal.id},{" "}
                      </a>
                    </Typography>

                    <Typography
                      gutterBottom
                      variant="h6"
                      align="left"
                      component="h2"
                    >
                      Nombre: {animal.name}, Dueno: {animal.owner.name}
                    </Typography>

                    <Typography
                      gutterBottom
                      variant="h6"
                      align="left"
                      component="h2"
                    >
                      Nacimiento: {convertDate(animal.birthdate)}, Tipo animal:{" "}
                      {animal.clase.description}
                    </Typography>

                    <Typography
                      gutterBottom
                      variant="h6"
                      align="left"
                      component="h2"
                    >
                      Madre: {animal.mother}, Hierro: {animal.hierro}
                    </Typography>

                    <Typography
                      gutterBottom
                      variant="h6"
                      align="left"
                      component="h2"
                    >
                      Date update: {convertDate(animal.updated_at)}
                    </Typography>
                    <Typography paragraph>Info: {animal.info}</Typography>
                  </CardContent>
                </Card>
              </>
            ))
          ) : (
            <div className="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900" />
            </div>
          )}
        </div>
      </QueryClientProvider>
    </Container>
  );
};

export default AnimalsCardQuery;
