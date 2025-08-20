'use client';

import Image from "next/image";
import check from "@/assets/icons/check.png";

type CustomCheckboxProps = {
  label: string;
  checked: boolean;
  onChange: () => void;
};

export default function CustomCheckbox({ label, checked, onChange }: CustomCheckboxProps) {
  return (
    <label className="flex gap-2 items-center cursor-pointer select-none">
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="peer hidden"
        />
        <div className="w-4 h-4 border border-cinza rounded-sm peer-checked:bg-azul peer-checked:border-azul transition-colors duration-200 flex items-center justify-center">
          {checked && <Image width={10} height={10} src={check} alt="check icon" />}
        </div>
      </div>
      {label}
    </label>
  );
}
