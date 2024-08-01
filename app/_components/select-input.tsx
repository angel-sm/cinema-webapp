import { Control, Controller, FieldValues } from "react-hook-form";

interface Props {
  inputLabel: string;
  options: Array<{ label: string; value: string }> | undefined;
  control?: Control<any> | undefined;
  name?: string;
}

function SelectInput({ inputLabel, options, control, name }: Props) {
  return (
    <div className="w-full">
      <label
        htmlFor="HeadlineAct"
        className="block text-md font-medium text-gray-900"
      >
        {inputLabel}
      </label>

      <Controller
        name={name || ""}
        control={control || undefined}
        rules={{ required: true }}
        render={({ field: { onChange } }) => (
          <select
            onChange={onChange}
            name="HeadlineAct"
            id="HeadlineAct"
            className="mt-1.5 w-full rounded-lg border-gray-400 border-2 py-4 text-sm"
          >
            {options?.map((opt) => (
              <option value={opt.value} key={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        )}
      />
    </div>
  );
}

export default SelectInput;
