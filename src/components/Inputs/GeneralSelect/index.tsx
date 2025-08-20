'use client';

import { FC } from "react";
import Image from "next/image";
import arrowDown from "@/assets/icons/chevron-down.svg";

interface SelectOption {
  value: string;
  label: string;
}

interface GeneralSelectProps {
  forLabel: string;
  labelText: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  error?: string;
}

export const GeneralSelect: FC<GeneralSelectProps> = ({
  forLabel,
  labelText,
  value,
  onChange,
  options,
  placeholder,
  error,
}) => {
  return (
    <label className="text-[13px] text-preto font-bold flex flex-col gap-1.5 relative w-full" htmlFor={forLabel}>
      {labelText}
      <div className="relative w-full">
        <select
          id={forLabel}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none outline-0 focus:outline-2 focus:outline-azul-forelight text-[15px] h-[44px] font-medium text-preto-forelight bg-azul-lighter-forelight px-4 rounded-lg w-full"
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <Image
          src={arrowDown}
          alt="Arrow Down"
          width={16}
          height={16}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
        />
      </div>
      {error && <span className="text-erro text-xs">{error}</span>}
    </label>
  );
};
