"use client";
import { useCallback, useEffect, useState, JSX } from "react";

import dayjs from "dayjs";
import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";

import Image from "next/image";

import getAnimalId from "../../services/getAnimalId";

export default function App() {
  return <BitaEventCard />;
}

const BitaEventCard = (props: any): JSX.Element => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [owner, setOwner] = useState("");
  const [mother, setMother] = useState("");
  const [motherid, setMotherid] = useState("");
  const [clase, setClase] = useState("");
  const [hierro, setHierro] = useState("");
  const [live, setLive] = useState("");
  const [info, setInfo] = useState("");
  const [image, setImage] = useState("");
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const { query } = useRouter();
  const router = useRouter();
  const [imageError, setImageError] = useState(false);
  const [image1Error, setImage1Error] = useState(false);
  const [image2Error, setImage2Error] = useState(false);
  const getBitacoraNew = useCallback(async () => {
    await getAnimalId(router.query.id).then((resp) => {
      //console.log("AnimalID", resp);
      setId(resp.id);
      setName(resp.name);
      setBirthdate(resp.birthdate);
      setOwner(resp.owner.name);
      setMother(resp.mother);
      setMotherid(resp.mother_id);
      setClase(resp.clase.description);
      setHierro(resp.hierro);
      setLive(resp.live);
      setInfo(resp.info);
      setImage(`/static/images/${resp.id}.jpg`);
      setImage1(`/static/images/${resp.id}_1.jpg`);
      setImage2(`/static/images/${resp.id}_2.jpg`);
    });
  }, [router]);

  useEffect(() => {
    if (router.isReady) {
      getBitacoraNew();
    }
  }, [router, getBitacoraNew]);

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
            Id: {query.id}, Nombre: {name}
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
          <a href={image} target={"_blank"} rel="noreferrer">
            <Image
              src={image}
              alt={`${query.id}` + ".jpg"}
              width={1920 / 2}
              height={1280 / 2}
              placeholder="empty"
              onError={() => {
                console.log("errorImage1");
                setImage2Error(true);
              }}
              style={{
                objectFit: "cover", // cover, contain, none
              }}
            />
          </a>
        </div>
        <div className="container max-w-4xl m-auto px-4 mt-20">
          <a
            href={image1Error ? "/static/images/noimage.jpg" : image1}
            target={"_blank"}
            rel="noreferrer"
          >
            <Image
              src={image1Error ? "/static/images/noimage.jpg" : image1}
              alt="Image"
              width={1920 / 2}
              height={1280 / 2}
              placeholder="empty"
              onError={() => {
                console.log("errorImage1");
                setImage1Error(true);
              }}
              style={{
                objectFit: "cover", // cover, contain, none
              }}
            />
          </a>
        </div>
        <div className="container max-w-4xl m-auto px-4 mt-20">
          <a
            href={image2Error ? "/static/images/noimage.jpg" : image2}
            target={"_blank"}
            rel="noreferrer"
          >
            <Image
              src={image2Error ? "/static/images/noimage.jpg" : image2}
              alt="Image"
              width={1920 / 2}
              height={1280 / 2}
              placeholder="empty"
              priority
              onError={() => {
                console.log("errorImage2");
                setImage2Error(true);
              }}
              style={{
                objectFit: "cover", // cover, contain, none
              }}
            />
          </a>
        </div>
      </Card>
    </div>
  );
};
