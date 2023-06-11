import { useEffect, useState } from "react";
import getVacas from "../services/getVacas";

export interface IVaca {
  label: string;
  value: number;
}

export function useVacas() {
  const [vacas, setVacas] = useState<IVaca[] | []>([]);
  //console.log("useVacas", getVacas());
  useEffect(
    function () {
      let options = [{ value: 0, label: "Seleccione.." }];
      getVacas().then((vaca) => {
        //console.log("VACA", vaca);
        vaca.forEach((option: any) => {
          let row = <IVaca>{};
          row.value = option.id;
          row.label = " " + option.id + " " + option.name;
          options.push(row);
        });
        //console.log("Options", options);
        setVacas(options);
      });
    },
    [setVacas]
  );
  return { vacas };
}
