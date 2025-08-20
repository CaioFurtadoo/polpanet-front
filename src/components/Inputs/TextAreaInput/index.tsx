interface InputProps {
  forLabel: string;
  labelText: string;
  placeholder: string;
  value: string;
  rows?: number,
  error?: string,
  onChange: (value: string) => void;
}

export const TextAreaInput: React.FC<InputProps> = ({
  forLabel,
  labelText,
  placeholder,
  value,
  onChange,
  rows,
  error
}) => {
  return (
    <label
      className="text-[13px] text-preto font-bold flex flex-col gap-1.5"
      htmlFor={forLabel}
    >
      {labelText}
      <textarea
        rows={rows ? rows : 3}
        id={forLabel}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="outline-0 focus:outline-2 focus:outline-azul-forelight text-[15px]  font-medium text-preto-forelight bg-azul-lighter-forelight px-4 py-3 rounded-lg w-full"
      />
      {error && <span className="text-erro text-xs">{error}</span>}
    </label>
  );
};
