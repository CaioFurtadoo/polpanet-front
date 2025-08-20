'use client';

import Image from "next/image";
import arrowDown from "@/assets/icons/chevron-down.svg";

interface OrdenacaoSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export const OrdenacaoSelect: React.FC<OrdenacaoSelectProps> = ({ value, onChange }) => {
  return (
    <label className="flex gap-1 items-center text-preto text-sm">
      Ordenar por:
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none font-bold rounded text-sm pr-8"
        >
          <option value="recentes">Recentes</option>
          <option value="menor_preco">Menor Preço</option>
          <option value="maior_preco">Maior Preço</option>
        </select>
        <Image
          src={arrowDown}
          alt="arrow down icon"
          className="pointer-events-none absolute right-2 top-1/2 transform -translate-y-1/2"
        />
      </div>
    </label>
  );
};