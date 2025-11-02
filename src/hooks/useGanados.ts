import { useEffect, useState } from "react";
import getGanados from "../services/getGanados";

export interface IGanado {
  label: string;
  value: number;
}

export function useGanados() {
  const [ganados, setGanados] = useState<IGanado[] | []>([]);
  console.log("useGanados", ganados);
  useEffect(
    function () {
      let options = [{ value: 0, label: "Seleccione.." }];
      getGanados().then((ganado) => {
        console.log("ganadoss", ganado);
        ganado.forEach((option: any) => {
          let row = <IGanado>{};
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
        //console.log("Options", options);
        setGanados(options);
      });
    },
    [setGanados]
  );
  return { ganados };
}
