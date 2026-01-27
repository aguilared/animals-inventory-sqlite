"use client";
import React, { Fragment, useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import fetchClient from "@/services/fetchClient1";
import BitaEventList from "@/components/bitacora/BitaEventList";
import Select, { StylesConfig } from "react-select";
import { useForm, Controller } from "react-hook-form";
import { useTypeEvents1 } from "@/hooks/bitacora/useTypeEvents1";
import axios from "axios";

const queryClient = new QueryClient();
const customStyles: StylesConfig<{ label: string; value: number }, false> = {
  option: (base, state) => ({
    ...base,
    fontSize: 16,
    color: "blue",
    backgroundColor: state.isSelected ? "lightblue" : "white", // Change background color for selected options
    "&:hover": {
      backgroundColor: "lightgray",
    },
  }),
};

type ResultData = {
  count: number;
  next: number;
  previous: number;
  results: {
    id: number;
    name: string;
    // Add other properties of Bitacora here
  }[];
};

export type Inputs = {
  name: string;
  url: string;
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  );
}

const ENDPOINT = process.env.NEXT_PUBLIC_API_URL + "bitacora/tipo_event/";

function Example() {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<Inputs>();
  const { typeEvents1 } = useTypeEvents1();
  const [tipo_event_id, setTipo_event_id] = useState(1);
  const [bitacoraSearch, setBitacoraSearch] = useState(0);

  const handleOnChange = (_ownerKey: string, value: number | undefined) => {
    console.log("valueOnChangeAdd", value);
    setBitacoraSearch(value ?? 0);
    console.log("BitacoraSearch", bitacoraSearch);
    //return setDatafilter(newData);
  };

  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [intervalMs, setIntervalMs] = useState(10000);
  const [currentPage, setCurrentPage] = useState(1);
  const nbPerPage = 9;
  const lastIndex = currentPage * nbPerPage;
  const startIndex = lastIndex - nbPerPage;
  const [datafilter, setDatafilter] = useState<ResultData | undefined>(
    undefined
  );

  //const records = data.slice(startIndex, lastIndex);
  async function fetchBitacoras({
    page,
    tipo_event_id,
  }: {
    page?: number;
    tipo_event_id?: number;
  }): Promise<ResultData> {
    const url = `${process.env.NEXT_PUBLIC_API_URL}bitacora/events/bita_events_paginated_search?page=${page}&limit=9&tipoevent=${tipo_event_id}`;
    console.log("URL", url);

    const request = await fetchClient.get<ResultData>(url);
    //console.log("Requestttt", request);
    //console.log("RequesData", request.data);
    //console.log("RequesDataResultts", request.data.results);
    return request.data;
  }

  const { status, data, error, isLoading, isFetching, isPlaceholderData } =
    useQuery({
      queryKey: ["projects"],
      queryFn: () => fetchBitacoras({ page, tipo_event_id }),
      placeholderData: keepPreviousData,
      staleTime: 5000,
      refetchInterval: intervalMs,
    });

  const numberOfPages = Math.ceil((data?.count ?? 0) / nbPerPage);

  // Prefetch the next page!
  React.useEffect(() => {
    if (status === "success") {
      console.log("====================================");
      console.log("renders");
      console.log("====================================");
      console.log("DATA1", data);
      setDatafilter(data);
    }
    if (!isPlaceholderData && data?.next) {
      console.log("Page", page);
      console.log("PageNext", data);

      queryClient.prefetchQuery({
        queryKey: ["projects", page],
        queryFn: () => fetchBitacoras({ page, tipo_event_id }),
      });
    }
  }, [data, isPlaceholderData, page, queryClient, tipo_event_id]);

  const searchs = () => {
    console.log("BitacoraSearchhhhhh", bitacoraSearch);

    const value = bitacoraSearch;
    console.log("ValueSearchvvvvv", value);
    if (!value) {
      return setDatafilter(data); //retorna a la data original
    }

    const getData = async () => {
      const result = await axios.get(`${ENDPOINT}${value}`);
      const resp = result.data;
      console.log("DATA44", resp);
      setDatafilter(resp);
      //setLoading(false);
    };
    //getData();
  };

  return (
    <div className="py-1">
      <div className="mx-auto px-4">
        <h1 className="text-gray-900 dark:text-white text-2xl font-bold">
          Bita Events.
        </h1>
        <div className="flex mb-4">
          <div className="w-1/2 p-2 text-center bg-gray-400">
            {" "}
            <Controller
              name="tipo_event_id"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value, name, ref } }) => {
                //console.log("CurrentSelection", currentSelection);
                const handleSelectChange = (
                  selectedOption: tipo_event_id | null
                ) => {
                  onChange(selectedOption?.value);
                };
                return (
                  <Select
                    inputRef={ref}
                    defaultValue={{
                      label: "Selecc. Tipo Event. Search",
                      value: 0,
                    }}
                    options={typeEvents1}
                    name={name}
                    styles={customStyles}
                    classNamePrefix="select"
                    onChange={(val) => {
                      onChange(val?.value);
                      setTipo_event_id(val?.value ?? 0);
                      handleOnChange("tipo_event_id", val?.value);
                    }}
                    onBlur={() => searchs()}
                  />
                );
              }}
            />
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className="fixed top-0 right-0 h-screen w-screen z-50 flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900" />
        </div>
      ) : null}
      {status === "pending" ? (
        <div>Loading...</div>
      ) : status === "error" ? (
        <div>Error: {error.message}</div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data &&
            data.results.map((event, i) => (
              <BitaEventList bitaevents={event} key={i} />
            ))}
        </div>
      )}
      <div>
        Current Page: {page}, tipe_event: {tipo_event_id}
      </div>
      <div>
        Records: {data?.count}, Pages: {numberOfPages}
      </div>
      <button
        onClick={() => setPage((old) => Math.max(old - 1, 0))}
        disabled={page === 0}
      >
        Previous Page
      </button>{" "}
      <button
        onClick={() => {
          setPage((old) => (data?.next ? old + 1 : old));
        }}
        disabled={isPlaceholderData || !data?.next}
      >
        Next Page
      </button>
      {
        // Since the last page's data potentially sticks around between page requests,
        // we can use `isFetching` to show a background loading
        // indicator since our `status === 'pending'` state won't be triggered
        isFetching ? <span> Loading...</span> : null
      }{" "}
      <div className="flex flex-1 max-w-lg px-4 py-3 mt-12 bg-white border-t border-gray-200 shadow-md sm:px-6">
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div
            className="relative z-0 flex justify-between w-full -space-x-px rounded-md"
            aria-label="Pagination"
          >
            <button
              type="button"
              className="relative inline-flex items-center px-2 py-2 text-sm 5xl:text-xl   font-medium text-gray-700 bg-white border border-gray-300 rounded-md sm:rounded-none hover:bg-gray-50 sm:rounded-r-md"
              data-id="pagination-prev"
              onClick={() => setPage((old) => Math.max(old - 1, 0))}
              disabled={page === 0}
            >
              Prev Page{" "}
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 20 20"
                className="w-5 h-5"
                aria-hidden="true"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
            <a
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              rel="prev"
              href="/bitaEventPageType"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 576 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z"></path>
              </svg>{" "}
              &nbsp; Home
            </a>
            <button
              type="button"
              className="relative inline-flex items-center px-2 py-2 text-sm 5xl:text-xl   font-medium text-gray-700 bg-white border border-gray-300 rounded-md sm:rounded-none hover:bg-gray-50 sm:rounded-r-md"
              data-id="pagination-next"
              onClick={() => {
                setPage((old) => (data?.next ? old + 1 : old));
              }}
              disabled={isPlaceholderData || !data?.next}
            >
              Next Page{" "}
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 20 20"
                className="w-5 h-5"
                aria-hidden="true"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
            <button
              type="button"
              className="relative inline-flex items-center px-2 py-2 text-sm 5xl:text-xl   font-medium text-gray-700 bg-white border border-gray-300 rounded-md sm:rounded-none hover:bg-gray-50 sm:rounded-r-md"
              data-id="pagination-next"
              onClick={() => {
                setPage(numberOfPages);
              }}
              disabled={isPlaceholderData || !data?.next}
            >
              Last Page{" "}
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 20 20"
                className="w-5 h-5"
                aria-hidden="true"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
