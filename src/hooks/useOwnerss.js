import { useEffect, useState } from "react";
import getOwners from "../services/getOwners";
export interface Clase {
  label: string;
  value: number;
}

export function useOwners() {
  const [owners, setOwners] = <Clase[] | []>([]);;
  console.log("useOwners", getOwners());
  useEffect(
    function () {
      let options = [{ value: 0, label: "Seleccione.." }];
      getOwners().then((typeEvent) => {
        console.log("typeEventss", typeEvent);
        typeEvent.forEach((option) => {
          let row = {};
          row.value = option.id;
          row.label =
            " " +
            option.id +
            " " +
            option.name +
            "(" +
            option._count.animal +
            ")";
          options.push(row);
        });
        console.log("Options", options);
        setOwners(options);
      });
    },
    [setOwners]
  );
  return { owners };
}
