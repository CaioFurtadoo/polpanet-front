interface InputProps {
  forLabel: string;
  inputType: string;
  labelText: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export const GeneralInput: React.FC<InputProps> = ({
  forLabel,
  inputType,
  labelText,
  placeholder,
  value,
  onChange,
  error
}) => {
  return (
    <label className="flex-1 text-[13px] text-preto font-bold flex flex-col gap-1.5" htmlFor={forLabel}>
      {labelText}
      <input
        id={forLabel}
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`outline-0 focus:outline-2 focus:outline-azul-forelight text-[15px] h-[44px] font-medium text-preto-forelight bg-azul-lighter-forelight px-4 rounded-lg w-full`}
      />
      {error && <span className="text-erro text-xs">{error}</span>}
    </label>
  );
};
