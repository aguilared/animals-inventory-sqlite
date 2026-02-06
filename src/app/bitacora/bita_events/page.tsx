"use client";
import { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import {
  Card,
  Typography,
  CardContent,
  Skeleton,
  Fab,
  Zoom,
  Box,
  TextField,
  InputAdornment,
  Stack,
  Chip,
} from "@mui/material";
import { MdKeyboardArrowUp, MdSearch } from "react-icons/md";
import dayjs from "dayjs";
import { Interweave } from "interweave";
import { useInView } from "react-intersection-observer";
import PullToRefresh from "react-simple-pull-to-refresh";
import {
  useInfiniteQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { getBitacoraEvents } from "@/actions/bitacora";

interface EventItem {
  id: number;
  image?: string;
  bitacora_id: number;
  bitacora: {
    bitacora_date: string;
  };
  tipoEvent: {
    description: string;
  };
  event: {
    description: string;
  };
  description: string;
}

interface ResultData {
  next: number | null;
  results: EventItem[];
}

const queryClient = new QueryClient();

const BitaEventsList = () => {
  const { ref, inView } = useInView();
  const [tipoSeleccionado, setTipoSeleccionado] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState(""); // El valor del input
  const [debouncedSearch, setDebouncedSearch] = useState(""); // El valor que dispara la query
  const TIPOS_EVENTO = [
    "Todos",
    "Autos",
    "Hogar",
    "Salud",
    "GonzaleraRanch",
    "Clima Tiempo",
    "Compras",
    "Gonzalera Ranch 2",
    "Familiar",
    "Mascotas",
  ]; // Ajusta según tus datos reales

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
    isRefetching,
  } = useInfiniteQuery<ResultData | null>({
    // IMPORTANTE: Añadimos debouncedSearch a la queryKey
    // para que React Query refresque cuando cambie la búsqueda
    queryKey: ["listbitacoras", debouncedSearch, tipoSeleccionado],
    queryFn: ({ pageParam = 0 }) =>
      getBitacoraEvents(
        pageParam as number,
        debouncedSearch,
        tipoSeleccionado === "Todos" ? "" : tipoSeleccionado
      ),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage?.next,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);
  // --- Lógica de Debounce ---
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500); // Espera 500ms

    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Función para el gesto de refrescar
  const handleRefresh = async () => {
    await refetch();
  };

  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Aparece al bajar 400px
      setShowTopBtn(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // --- COMPONENTE SKELETON (Para carga inicial o refresh) ---
  const EventSkeleton = () => (
    <Card sx={{ height: "100%" }}>
      <Skeleton variant="rectangular" height={200} />
      <CardContent>
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" height={30} sx={{ mt: 1 }} />
        <Skeleton variant="text" height={80} sx={{ mt: 2 }} />
      </CardContent>
    </Card>
  );

  // Debug log for data
  console.log("Data", data);

  return (
    <div className="py-3">
      {/* Encabezado fijo o sticky si lo deseas */}
      <div className="mx-auto px-4 py-2 bg-slate-700 rounded-lg mb-6">
        <h1 className="text-gray-100 text-2xl font-bold">
          Bitacora Events Explorer
        </h1>
      </div>
      {/* --- INPUT DE BÚSQUEDA --- */}
      <div className="mx-auto px-4 mb-6">
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Buscar en bitácora (palabras claves, eventos...)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <MdSearch size={24} />
                </InputAdornment>
              ),
            },
          }}
          sx={{ bgcolor: "white", borderRadius: 1 }}
        />
        {/* --- CHIPS DE FILTRADO --- */}
        <Stack direction="row" spacing={1} sx={{ overflowX: "auto", pb: 1 }}>
          {TIPOS_EVENTO.map((tipo) => (
            <Chip
              key={tipo}
              label={tipo}
              clickable
              // Si está seleccionado es azul (primary), si no, lo personalizamos
              color={tipoSeleccionado === tipo ? "primary" : "default"}
              onClick={() => setTipoSeleccionado(tipo)}
              sx={{
                fontWeight: tipoSeleccionado === tipo ? "bold" : "normal",
                // --- AQUÍ EL ARREGLO PARA FONDO OSCURO ---
                color: tipoSeleccionado === tipo ? "white" : "#cbd5e1", // Texto gris claro si no está seleccionado
                border:
                  tipoSeleccionado === tipo ? "none" : "1px solid #475569", // Borde sutil para que se vea la forma
                "&:hover": {
                  backgroundColor: "#334155", // Color al pasar el mouse
                },
              }}
            />
          ))}
        </Stack>
      </div>
      {/* --- MENSAJE SI NO HAY RESULTADOS --- */}
      {!isLoading && data?.pages[0]?.results.length === 0 && (
        <div className="text-center py-10">
          <Typography variant="h6" color="textSecondary">
            No se encontraron eventos que coincidan con &quot;{debouncedSearch}
            &quot;
          </Typography>
        </div>
      )}

      <PullToRefresh
        onRefresh={handleRefresh}
        pullingContent="Desliza para actualizar..."
        refreshingContent="Suelta para cargar"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 min-h-screen">
          {/* Si está cargando por primera vez o refrescando, mostramos 6 esqueletos */}
          {(isLoading || isRefetching) && !isFetchingNextPage
            ? Array.from(new Array(6)).map((_, index) => (
                <EventSkeleton key={index} />
              ))
            : data?.pages.map((group, i) => (
                <Fragment key={i}>
                  {group?.results.map((event) => (
                    <Card
                      key={event.id}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                      }}
                      elevation={3}
                    >
                      {/* --- OPTIMIZACIÓN DE IMAGEN AQUÍ --- */}
                      {event.image && (
                        <a
                          href={`/static/images/${event.id}.jpg`}
                          target="_blank"
                          rel="noreferrer"
                          className="relative h-96 w-full overflow-hidden"
                        >
                          <Image
                            src={`/static/images/${event.id}.jpg`}
                            alt={event.event.description}
                            fill // Hace que la imagen llene el contenedor
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover transition-transform duration-300 hover:scale-105"
                            placeholder="blur" // Efecto de carga suave
                            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
                          />
                        </a>
                      )}
                      <CardContent>
                        <Typography
                          variant="caption"
                          className="block text-blue-600 font-bold"
                        >
                          IDevent: {event.id} •{" "}
                          {dayjs(event.bitacora.bitacora_date).format(
                            "DD/MM/YYYY"
                          )}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          fontWeight="bold"
                          sx={{ mt: 1 }}
                        >
                          {event.tipoEvent.description} /{" "}
                          {event.event.description}
                        </Typography>
                        <Box className="text-sm text-gray-600 mt-2">
                          <Interweave content={event.description} />
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
                </Fragment>
              ))}
        </div>
      </PullToRefresh>

      {/* Indicador de carga inferior (Infinite Scroll) */}
      <div ref={ref} className="flex justify-center py-10">
        {isFetchingNextPage ? (
          <Box sx={{ width: "100%", textAlign: "center" }}>
            <div className="animate-pulse text-blue-600 font-medium">
              Buscando más registros...
            </div>
          </Box>
        ) : !hasNextPage && data ? (
          <Typography color="text.secondary">Has llegado al final</Typography>
        ) : null}
      </div>

      {/* --- BOTÓN VOLVER ARRIBA --- */}
      <Zoom in={showTopBtn}>
        <Box
          onClick={goToTop}
          sx={{ position: "fixed", bottom: 32, right: 32, zIndex: 1000 }}
        >
          <Fab
            color="primary"
            size="medium"
            sx={{
              bgcolor: "#2563eb", // Azul 600 de Tailwind
              "&:hover": { bgcolor: "#1d4ed8" },
              fontSize: "1.5rem", // Ajusta el tamaño del icono
            }}
          >
            <MdKeyboardArrowUp />
          </Fab>
        </Box>
      </Zoom>
    </div>
  );
};

export default function BitaEventsPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <BitaEventsList />
    </QueryClientProvider>
  );
}
