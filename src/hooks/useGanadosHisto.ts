import { useEffect, useState } from "react";
import getGanadosHisto from "@/services/getGanadosHisto";

export interface IGanado {
  label: string;
  value: number;
}

export function useGanadosHisto() {
  const [ganados, setGanados] = useState<IGanado[] | []>([]);
  console.log("OwneruseGanadosHisto", ganados);
  useEffect(
    function () {
      let options = [{ value: 0, label: "Seleccione.." }];
      getGanadosHisto().then((ganado) => {
        console.log("Ownerganadoss", ganado);
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
