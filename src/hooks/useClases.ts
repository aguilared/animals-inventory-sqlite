import { useEffect, useState } from "react";
import getClases from "../services/getClases";

export interface Clase {
  label: string;
  value: number;
}

export function useClases() {
  const [clases, setClases] = useState<Clase[] | []>([]);
  console.log("getClases", getClases());
  useEffect(
    function () {
      let options = [{ value: 0, label: "Seleccione.." }];
      getClases().then((clase) => {
        //console.log("clasess", clase);
        clase.forEach((option) => {
          let row = {};
          row.value = option.id;
          row.label = " " + option.id + " " + option.description;
          options.push(row);
        });
        //console.log("Options", options);
        setClases(options);
      });
    },
    [setClases]
  );
  return { clases };
}
