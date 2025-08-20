import Image from "next/image";
import eyeClosed from "@/assets/icons/eye-closed.svg";
import { useState } from "react";

interface InputProps {
  forLabel: string;
  labelText: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export const PasswordInput: React.FC<InputProps> = ({
  forLabel,
  labelText,
  placeholder,
  value,
  onChange,
  error
}) => {
  const [isShow, setIsShow] = useState(false);

  return (
    <label className="text-[13px] text-preto font-bold flex flex-col gap-1.5" htmlFor={forLabel}>
      {labelText}
      <div className="flex gap-3 relative">
        <input
          id={forLabel}
          type={isShow ? "text" : "password"}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`outline-0 focus:outline-2 focus:outline-azul-forelight text-[15px] h-[44px] font-medium text-preto-forelight bg-azul-lighter-forelight px-4 pr-12 rounded-lg w-full`}
        />
        <button
          type="button"
          onClick={() => setIsShow(!isShow)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
        >
          <Image src={eyeClosed} alt="toggle password" width={24} height={24} />
        </button>
      </div>
      {error && <span className="text-erro text-xs">{error}</span>}
    </label>
  );
};
