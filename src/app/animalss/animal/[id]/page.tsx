"use client";
import { useCallback, useEffect, useState, JSX } from "react";

import dayjs from "dayjs";
import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import Image from "next/image";

import getAnimalId from "@/services/getAnimalId";

import { useSearchParams } from "next/navigation";

const convertDate1 = (date: any) => {
  const d = dayjs(date).format("D-M-YY h:mm");
  return d;
};

export default function App() {
  return <BitaEventCard />;
}

const BitaEventCard = (props: any): JSX.Element => {
  const params = useSearchParams();

  const [id, setId] = useState<number | null>(Number(params?.get("id")));
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [owner, setOwner] = useState("");
  const [mother, setMother] = useState("");
  const [motherid, setMotherid] = useState("");
  const [clase, setClase] = useState("");
  const [hierro, setHierro] = useState("");
  const [live, setLive] = useState("");
  const [info, setInfo] = useState("");

  const getBitacoraNew = useCallback(async () => {
    await getAnimalId(id).then((resp) => {
      console.log("AnimalID", resp);
      //setId(resp.id);
      setName(resp.name);
      setBirthdate(resp.birthdate);
      setOwner(resp.owner.name);
      setMother(resp.mother);
      setMotherid(resp.mother_id);
      setClase(resp.clase.description);
      setHierro(resp.hierro);
      setLive(resp.live);
      setInfo(resp.info);
    });
  }, [id]);

  useEffect(() => {
    if (params) {
      getBitacoraNew();
    }
  }, [params, getBitacoraNew]);

  return (
    <div className="flex justify-center">
      <Card sx={{ maxWidth: 745, bgcolor: "neutral.900" }} color="neutral">
        <CardContent sx={{ flex: "1 0 auto" }}>
          <div>
            <h3 className="text-2xl tahoma font-extrabold tracking-widest text-gray-500">
              Animal {clase}: {name}
            </h3>
          </div>
          <Typography variant="h6" component="h2">
            Id: {id}, Nombre: {name}
          </Typography>{" "}
          <Typography variant="h6" component="h2">
            Owner: {owner}
            {}
          </Typography>{" "}
          <Typography variant="h6" component="h2">
            Nacimiento: {birthdate}, Live?:
            {live! ? (
              <input
                type="checkbox"
                checked
                placeholder="Live"
                onChange={() => console.log("live")}
                className="mx-3"
              />
            ) : (
              <input type="checkbox" placeholder="Live" className="mx-3" />
            )}{" "}
          </Typography>
          <Typography variant="h6" component="h2">
            Tipo animal: <b>{clase}</b>
          </Typography>
          <Typography variant="h6" component="h2">
            Madre: {mother},{" "}
            <a
              href={`/animals/${encodeURIComponent(motherid)}`}
              target={"_blank"}
              rel="noreferrer"
            >
              {" "}
              motherID:&nbsp; {motherid},{" "}
            </a>{" "}
          </Typography>
          <Typography gutterBottom variant="h6" component="h2">
            Info: {info}
          </Typography>
        </CardContent>
        <div className="container max-w-4xl m-auto px-4 mt-0">
          <a
            href={"/static/images/" + `${id}` + ".jpg"}
            target={"_blank"}
            rel="noreferrer"
          >
            <Image
              src={"/static/images/" + `${id}` + ".jpg"}
              alt={`${id}` + ".jpg"}
              width={1920 / 2}
              height={1280 / 2}
              style={{
                objectFit: "cover", // cover, contain, none
              }}
            />
          </a>
        </div>
        <div className="container max-w-4xl m-auto px-4 mt-20">
          <a
            href={"/static/images/" + `${id}` + ".jpg"}
            target={"_blank"}
            rel="noreferrer"
          >
            <Image
              src={"/static/images/" + `${id}` + "_1.jpg"}
              alt="Image"
              width={1920 / 2}
              height={1280 / 2}
            />
          </a>
        </div>
        <div className="container max-w-4xl m-auto px-4 mt-20">
          <Image
            src={"/static/images/" + `${id}` + "_2.jpg"}
            alt="Image"
            width={1920 / 2}
            height={1280 / 2}
          />
        </div>
      </Card>
    </div>
  );
};
