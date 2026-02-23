"use client";
import React, { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";

import dayjs from "dayjs";
import { Interweave } from "interweave";
import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useSearchParams } from "next/navigation";

import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import axios from "axios";
import ImagenSegura from "@/components/ImagenSegura";

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

const convertDate1 = (date: string | Date) => {
  const d = dayjs(date).format("D-M-YY h:mm");
  return d;
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BitaEventCard />
    </QueryClientProvider>
  );
}

type BitacoraEventData = {
  bitacora_id: string;
  event_date: string;
  bitacora: {
    author: {
      name: string;
    };
  };
  tipoEvent: {
    description: string;
  };
  event: {
    description: string;
  };
  description: string;
};

const BitaEventCard = (): React.JSX.Element => {
  const params = useSearchParams();
  const componentRef = useRef(null);

  const [bitacora_id, setBitacora_id] = useState("");
  const [bitacoraDate, setBitacoraDate] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [tipoevent, setTipoEvent] = useState("");
  const [event, setEvent] = useState("");
  const [intervalMs, setIntervalMs] = useState(1000);

  const ENDPOINT =
    process.env.NEXT_PUBLIC_API_URL + "bitacora/event_id/" + params?.get("id");
  console.log("ENDPOINT ", ENDPOINT);

  const eventId = params?.get("id");
  const { data, isLoading, status, isError } = useQuery<BitacoraEventData>({
    queryKey: ["EventId", eventId],
    queryFn: async () => {
      const response = await axios.get(`${ENDPOINT}`);
      return response.data as BitacoraEventData;
    },
    refetchInterval: intervalMs,
    enabled: !!eventId,
  });

  useEffect(() => {
    if (status === "success") {
      console.log("====================================");
      console.log("renders");
      console.log("====================================");
      setBitacora_id(data.bitacora_id);
      setBitacoraDate(data.event_date);
      setAuthor(data.bitacora.author.name);
      setTipoEvent(data.tipoEvent.description);
      setEvent(data.event.description);
      setDescription(data.description);
    }
  }, [data, status]);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "Evento de Bitacora", // Optional
    onBeforePrint: async () => {
      console.log("Antes de obtener el contenido para imprimir...");
      // Aquí podrías poner lógica para esperar a que Animals cargue todo
      // O un simple (pero arriesgado) retardo:
      await new Promise((resolve) => setTimeout(resolve, 20000)); // Espera 20 segundos
    },
    onAfterPrint: () => {
      console.log("Impresión terminada.");
    },
  });

  if (isLoading) {
    return (
      <div className="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900" />
        Error
      </div>
    );
  }
  if (!data) {
    return (
      <div className="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900" />
        Loading...
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      {" "}
      <div>
        <button
          className=" bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          onClick={handlePrint}
        >
          Print Section using Hooks
        </button>
        <div
          ref={componentRef}
          style={{ padding: "20px", border: "1px dashed blue" }}
        >
          <Card sx={{ maxWidth: 745, bgcolor: "neutral.900" }} color="neutral">
            <CardContent sx={{ flex: "1 0 auto" }}>
              <div>
                <h3 className="text-2xl tahoma font-extrabold tracking-widest text-gray-500">
                  Evento de una Bitacora.
                </h3>
              </div>
              <Typography variant="h6" component="div">
                Bitacora: {data.bitacora_id}, BitaEvent: {params?.get("id")},
                Fecha: {convertDate1(data.event_date)}
              </Typography>{" "}
              <Typography variant="h6" component="div">
                Author: {data.bitacora.author.name}
              </Typography>
              <Typography gutterBottom variant="h6" component="h2">
                Tipo Event: {data.tipoEvent.description}, Event:{" "}
                {data.event.description}
              </Typography>
              <Typography variant="h6" color="textSecondary" component="h2">
                <div className="description-content">
                  <Interweave content={data.description} />
                </div>
              </Typography>
            </CardContent>
            <div className="container max-w-4xl m-auto px-4 mt-0">
              <a
                href={"/static/images/" + `${params?.get("id")}` + ".jpg"}
                target={"_blank"}
                rel="noreferrer"
              >
                <ImagenSegura
                  src={"/static/images/" + `${params?.get("id")}` + ".jpg"}
                  alt={`${params?.get("id")}` + ".jpg"}
                />
              </a>
            </div>
            <div className="container max-w-4xl m-auto px-4 mt-20">
              <a
                href={"/static/images/" + `${params?.get("id")}` + "_1.jpg"}
                target={"_blank"}
                rel="noreferrer"
              >
                <ImagenSegura
                  src={"/static/images/" + `${params?.get("id")}` + "_1.jpg"}
                  alt="Image1"
                />
              </a>
            </div>
            <div className="container max-w-4xl m-auto px-4 mt-20">
              <ImagenSegura
                src={"/static/images/" + `${params?.get("id")}` + "_2.jpg"}
                alt="Image2"
              />
            </div>
          </Card>{" "}
        </div>
      </div>
    </div>
  );
};
