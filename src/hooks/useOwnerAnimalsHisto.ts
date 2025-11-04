import { useEffect, useState } from "react";
import getDuenos from "../services/getOwnerAnimalsHisto";

export interface IDueno {
  label: string;
  value: number;
}

export function useOwnerAnimalsHisto() {
  const [duenos, setDuenos] = useState<IDueno[] | []>([]);
  console.log("useOwnerAnimals", duenos);
  useEffect(
    function () {
      let options = [{ value: 0, label: "Dueno.." }];
      getDuenos().then((dueno) => {
        console.log("duenoss", dueno);
        dueno.forEach((option: any) => {
          const row: IDueno = {
            label:
              " " +
              option.id +
              " " +
              option.name +
              "(" +
              option._count.animal +
              ")",
            value: option.id,
          };
          options.push(row);
        });
        //console.log("Options", options);
        setDuenos(options);
      });
    },
    [setDuenos]
  );
  return { duenos };
}
