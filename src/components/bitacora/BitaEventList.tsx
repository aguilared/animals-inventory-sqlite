import { SortBy, type User } from "@/app/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { Interweave } from "interweave";
import dayjs from "dayjs";

interface Bitaevent {
  id: string | number;
  image?: string | null;
  bitacora_id: string | number;
  bitacora: {
    bitacora_date: string | Date;
  };
  tipoEvent: {
    description: string;
  };
  event: {
    description: string;
  };
  description: string;
}

interface Props {
  changeSorting: (sort: SortBy) => void;
  deleteUser: (email: string) => void;
  showColors: boolean;
  bitaevents: Bitaevent;
}

const convertDate = (date: any) => {
  return dayjs(date).format("DD/MM/YYYY hh:mm");
};

const BitaEventList: React.FC<Props> = ({ bitaevents }) => {
  return (
    <Card
      sx={{ maxWidth: 545, bgcolor: "neutral.900" }}
      color="neutral"
      invertedColors
    >
      {bitaevents.image! ? (
        <a
          href={"/static/images/" + `${bitaevents.id}` + ".jpg"}
          target={"_blank"}
          rel="noreferrer"
        >
          <CardMedia
            component="img"
            height="194"
            image={"/static/images/" + `${bitaevents.id}` + ".jpg"}
            alt="No Image"
          />
        </a>
      ) : (
        <></>
      )}
      <Typography variant="body1">
        <a
          href={`bita_events/4?id=${encodeURIComponent(
            bitaevents.bitacora_id
          )}`}
          target={"_blank"}
          rel="noreferrer"
        >
          BitacoraID: {bitaevents.bitacora_id}
          {",  "}
        </a>
        {convertDate(bitaevents.bitacora.bitacora_date)}
      </Typography>
      <Typography variant="body1">
        <a
          href={`bita_event/4?id=${encodeURIComponent(bitaevents.id)}`}
          target={"_blank"}
          rel="noreferrer"
        >
          {"IdEvent: " +
            `${bitaevents.id}` +
            " " +
            convertDate(bitaevents.bitacora.bitacora_date)}
        </a>
      </Typography>
      <Typography variant="body1" component="div">
        {"Tipo/Event: " +
          `${bitaevents.tipoEvent.description}` +
          ", " +
          `${bitaevents.event.description}`}
      </Typography>
      <Typography variant="h6" color="text.secondary" component="div">
        <Interweave content={bitaevents.description} />
      </Typography>
      <Typography
        variant="h6"
        color="text.secondary"
        component="div"
      ></Typography>
    </Card>
  );
};

export default BitaEventList;
