import Image from "next/image";

interface InputProps {
  forLabel: string;
  labelText: string;
  placeholder: string;
  type: string;
  urlImage: string;
  value: string;
  altImage: string;
  onChange: (value: string) => void,
  error?: string;
}

export const IconInput: React.FC<InputProps> = ({
  forLabel,
  labelText,
  placeholder,
  value,
  type,
  urlImage,
  altImage,
  onChange,
  error
}) => {

  return (
    <label
      className="text-[13px] text-preto font-bold flex flex-col gap-1.5"
      htmlFor={forLabel}
    >
      {labelText}
      <div className="flex gap-3">
        <div
          className="h-[44px] w-[50px] bg-azul-lighter-forelight flex items-center justify-center rounded-lg"
        >
          <Image
            src={urlImage}
            alt={altImage}
            width={24}
            height={24}
          />
        </div>
        <input
          id={forLabel}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="outline-0 focus:outline-2 focus:outline-azul-forelight text-[15px] h-[44px] font-medium text-preto-forelight bg-azul-lighter-forelight px-4 pr-12 rounded-lg w-full"
          type={type}
        />
        
      </div>
      {error && <span className="text-erro text-xs">{error}</span>}
    </label>
  );
};
