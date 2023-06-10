import React from "react";

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

const FRUITS = ["apple", "banana", "melon"] as const;

type Fruit = (typeof FRUITS)[number];

const SelectFruit = () => {
  const [selected, setSelected] = React.useState<Fruit>(FRUITS[0]);

  return (
    <div>
      <div>Value: {selected}</div>

      <CustomSelect value={selected} onChange={setSelected} options={FRUITS} />
    </div>
  );
};

const SelectNumber = () => {
  const [n, setN] = React.useState(0);
  return (
    <div>
      <div>Value: {n}</div>

      <CustomSelect value={n} onChange={setN} options={[0, 1, 2, 3, 5]} />
    </div>
  );
};

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

export default () => (
  <>
    <SelectFruit />
    <SelectNumber />
    <SelectUser />
  </>
);
