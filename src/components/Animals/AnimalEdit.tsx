import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";

type Inputs = {
  alive: string;
  birthdate: string;
  clase_id: number;
  hierro: string;
  id: number;
  info: string;
  live: boolean;
  mother_id: number;
  mother: string;
  name: string;
  owner_id: number;
  tipopart: string;
  updated_at: string;
};

const AnimalEdit = (props: any): React.JSX.Element => {
  const {
    animalSeleccionada2,
    onSubmitE,
    handleOnChangeE,
    vacas,
    clases,
    owners,
    onClose,
  } = props;

  const [isLive, setIsLive] = useState(animalSeleccionada2.live);

  const {
    register: registerEditField,
    control,
    formState: { errors },
  } = useForm<Inputs>();

  const handleOnChange1 = () => {
    setIsLive(!isLive);
    handleOnChangeE("live", !isLive);
  };

  return (
    <form
      name="edit"
      onSubmit={onSubmitE}
      className="w-full max-w-lg  bg-gray-400 shadow-md rounded"
    >
      <div className="md:w-11/12 px-3 mb-6 md:mb-0">
        <label
          className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
          htmlFor="name"
        >
          Nombre
        </label>
        <input
          className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
          placeholder="Name"
          defaultValue={animalSeleccionada2.name}
          {...registerEditField("name", {
            required: "Required",
          })}
          onChange={(e) => handleOnChangeE("name", e.target.value)}
        />
      </div>

      <div className="md:w-11/12 px-3 mb-6 md:mb-0">
        <label
          className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
          htmlFor="birthdate"
        >
          Nacimiento
        </label>
        <input
          className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
          placeholder="birthdate"
          defaultValue={animalSeleccionada2.birthdate}
          {...registerEditField("birthdate", {
            required: "Required",
          })}
          onChange={(e) => handleOnChangeE("birthdate", e.target.value)}
        />
      </div>

      <div className="md:w-11/12 px-3 mb-6 md:mb-0">
        <label
          className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
          htmlFor="clase_id"
        >
          Clase Animal
        </label>
        <Controller
          name="clase_id"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value, name, ref } }) => {
            const currentSelection = clases.find(
              (c: any) => c.value === animalSeleccionada2.clase_id
            );
            //console.log("CurrentSelection", currentSelection);

            return (
              <Select
                options={clases}
                defaultValue={currentSelection}
                name={name}
                onChange={(val: any) => {
                  onChange(val.value);
                  handleOnChangeE("clase_id", val.value);
                }}
              />
            );
          }}
        />
        {errors.clase_id && (
          <span className="text-xs text-red-700">
            {errors.clase_id.message}
          </span>
        )}
      </div>

      <div className="md:w-11/12 px-3 mb-6 md:mb-0">
        <label
          className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
          htmlFor="owner_id"
        >
          Dueno
        </label>
        <Controller
          name="owner_id"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value, name, ref } }) => {
            const currentSelection = owners.find(
              (c: any) => c.value === animalSeleccionada2.owner_id
            );
            //console.log("CurrentSelection", currentSelection);

            return (
              <Select
                options={owners}
                defaultValue={currentSelection}
                name={name}
                onChange={(val: { value: number }) => {
                  onChange(val.value);
                  handleOnChangeE("owner_id", val.value);
                }}
              />
            );
          }}
        />
        {errors.owner_id && (
          <span className="text-xs text-red-700">
            {errors.owner_id.message}
          </span>
        )}
      </div>

      <div className="md:w-11/12 px-3 mb-6 md:mb-0">
        <label
          className="block uppercase tracking-wide text-xs font-bold mb-2"
          htmlFor="mother_id"
        >
          Madre.{animalSeleccionada2.mother_id}
        </label>
        <Controller
          name="mother_id"
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, value, name, ref } }) => {
            const currentSelection = vacas.find(
              (c: any) => c.value === animalSeleccionada2.mother_id
            );
            return (
              <Select
                defaultValue={currentSelection}
                options={vacas}
                value={vacas.find((c: { value: number }) => c.value === value)}
                name={name}
                onChange={(val: { value: number } | null) => {
                  onChange(val!.value);
                  handleOnChangeE("mother_id", val!.value);
                }}
              />
            );
          }}
        />
        {errors.mother_id && (
          <span className="text-xs text-red-700">
            {errors.mother_id.message}
          </span>
        )}
      </div>

      <div className="md:w-11/12 px-3 mb-6 md:mb-0">
        <label
          className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
          htmlFor="mother"
        >
          Madre
        </label>
        <input
          className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
          placeholder="mother"
          defaultValue={animalSeleccionada2.mother}
          {...registerEditField("mother", {
            required: "Required",
          })}
          onChange={(e) => handleOnChangeE("mother", e.target.value)}
        />

        {errors.mother && (
          <span className="text-xs text-red-700">{errors.mother.message}</span>
        )}
      </div>

      <div className="md:w-11/12 px-3 mb-6 md:mb-0">
        <label
          className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
          htmlFor="hierro"
        >
          Hierro
        </label>
        <input
          className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
          placeholder="hierro"
          defaultValue={animalSeleccionada2.hierro}
          {...registerEditField("hierro", {
            required: "Required",
          })}
          onChange={(e) => handleOnChangeE("hierro", e.target.value)}
        />

        {errors.hierro && (
          <span className="text-xs text-red-700">{errors.hierro.message}</span>
        )}
      </div>

      <div className="md:w-11/12 px-3 mb-6 md:mb-0">
        <label
          className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
          htmlFor="tipopart"
        >
          Tipo parto
        </label>
        <input
          className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
          placeholder="tipopart"
          defaultValue={animalSeleccionada2.tipopart}
          {...registerEditField("tipopart", {
            required: "Required",
          })}
          onChange={(e) => handleOnChangeE("tipopart", e.target.value)}
        />
        {errors.tipopart && (
          <span className="text-xs text-red-700">
            {errors.tipopart.message}
          </span>
        )}
      </div>

      <div className="md:w-11/12 px-3 mb-6 md:mb-0">
        <input
          type="checkbox"
          id="live"
          name="live"
          defaultValue={isLive}
          checked={isLive}
          {...registerEditField("live", {
            required: "Required",
          })}
          onChange={(val) => {
            handleOnChange1();
          }}
        />
        Live
      </div>

      <div className="md:w-11/12 px-3 mb-6 md:mb-0">
        <label
          className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
          htmlFor="info"
        >
          Infos
        </label>
        <textarea
          cols={100}
          rows={6}
          className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
          placeholder="info"
          defaultValue={animalSeleccionada2.info}
          {...registerEditField("info", {
            required: "Required",
          })}
          onChange={(e) => handleOnChangeE("info", e.target.value)}
        />
        <input
          type="hidden"
          defaultValue={animalSeleccionada2.animal_id}
          {...registerEditField("id", {
            required: "Required",
            minLength: 3,
            maxLength: 41,
          })}
        ></input>
      </div>

      <br></br>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <button
          className="bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-gray-500 rounded"
          onClick={() => onClose()}
        >
          Cancel
        </button>
        <button className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded">
          Guardar
        </button>
      </div>
    </form>
  );
};

export default AnimalEdit;
