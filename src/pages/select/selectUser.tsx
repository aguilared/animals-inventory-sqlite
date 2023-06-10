import React from "react";
import { useClases } from "../../hooks/useClases";

type Allowed = string | number;

type BaseProps<Value> = {
  value: Value;
  onChange: (newValue: Value) => void;
  options: readonly Value[];
  mapOptionToLabel?: (option: Value) => Allowed;
  mapOptionToValue?: (option: Value) => Allowed;
};

// mappers required only in certain cirumstances
// we could get fancier here and also not require if `Value` has `value`/`label` properties
type Props<Value> = Value extends Allowed
  ? BaseProps<Value>
  : Required<BaseProps<Value>>;

const isAllowed = (v: any): v is Allowed =>
  typeof v === "string" || typeof v === "number";

function CustomSelect<Value>({
  value,
  onChange,
  options,
  mapOptionToLabel,
  mapOptionToValue,
}: Props<Value>) {
  const toLabel = (option: Value): Allowed => {
    if (mapOptionToLabel) {
      return mapOptionToLabel(option);
    }
    // if our props are provided correctly, this should never be false
    return isAllowed(option) ? option : String(option);
  };

  const toValue = (option: Value): Allowed => {
    if (mapOptionToValue) {
      return mapOptionToValue(option);
    }
    return isAllowed(option) ? option : String(option);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(options[e.target.selectedIndex]);
  };

  return (
    <select value={toValue(value)} onChange={handleChange}>
      {options.map((value) => (
        <option value={toValue(value)} key={toValue(value)}>
          {toLabel(value)}
        </option>
      ))}
    </select>
  );
}

interface User {
  name: string;
  id: number;
}

const SelectUser = () => {
  const users: User[] = [
    {
      id: 1,
      name: "John",
    },
    {
      id: 322,
      name: "Susan",
    },
    {
      id: 57,
      name: "Bill",
    },
  ];

  const [user, setUser] = React.useState(users[0]);

  return (
    <div>
      <div>Value: {JSON.stringify(user)}</div>

      <CustomSelect
        value={user}
        onChange={setUser}
        options={users}
        // has an error if no mapOptionToLabel is provided!
        // I don't know why the type for user isn't automatic
        mapOptionToLabel={(user: User) => user.name}
        mapOptionToValue={(user: User) => user.id}
      />
    </div>
  );
};

export interface Clase {
  label: string;
  value: number;
}

export interface Typeclase {
  clases: Clase[];
}

const SelectClase = () => {
  //const { clases } = useClases(); //data from hook
  //let clasess: Typeclase[] = clases;

  //const { clases }: Typeclase[] = useClases();   //?????
  //const clasesd: Clase[] = [clases];

  // este funciona OK
  const clases: Clase[] = [
    {
      value: 0,
      label: "Seleccione..",
    },
    {
      value: 1,
      label: "Vaca",
    },
    {
      value: 2,
      label: "Toros",
    },
  ];

  const [clase, setClase] = React.useState(clases[0]);

  return (
    <div>
      <div>Value: {JSON.stringify(clase)}</div>

      <CustomSelect
        value={clase}
        onChange={setClase}
        options={clases}
        // has an error if no mapOptionToLabel is provided!
        // I don't know why the type for clase isn't automatic
        mapOptionToLabel={(clase: Clase) => clase.label}
        mapOptionToValue={(clase: Clase) => clase.value}
      />
    </div>
  );
};

export default () => (
  <>
    <SelectUser />
    <SelectClase />
  </>
);
