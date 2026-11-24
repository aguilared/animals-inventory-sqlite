import { useEffect, useState } from "react";
import getOwners from "../services/getOwnersVacas";

export interface IOwner {
  label: string;
  value: number;
}

export function useOwnersVacas() {
  const [owners, setOwners] = useState<IOwner[] | []>([]);
  console.log("useOwners", getOwners());
  useEffect(
    function () {
      let options = [{ value: 0, label: "Seleccione.." }];
      getOwners().then((owner) => {
        //console.log("ownerss", owner);
        owner.forEach((option: any) => {
          let row = <IOwner>{};
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
        setOwners(options);
      });
    },
    [setOwners],
  );
  return { owners };
}
