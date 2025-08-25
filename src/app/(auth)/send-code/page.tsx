'use client';

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { GeneralButton } from "@/components/Buttons/GeneralButton";
import Link from "next/link";
import Image from "next/image";
import refresh from "@/assets/icons/arrow-refresh-01.svg"
import arrowLeft from "@/assets/icons/arrow-left.svg";

export default function SendCode() {
  const [digits, setDigits] = useState<string[]>(Array(6).fill(""));
  const [error, setError] = useState<string | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;
    const newDigits = [...digits];
    newDigits[index] = value.slice(-1);
    setDigits(newDigits);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = () => {
    const code = digits.join("");
    if (code.length < 6) {
      setError("Digite todos os 6 dígitos do código.");
      return;
    }
    localStorage.setItem("resetCode", code);
    router.push("/reset-password");
  };

  const handleResend = async () => {
    const email = localStorage.getItem("email");
    if (!email) {
      setError("Email não encontrado. Volte e insira novamente.");
      return;
    }
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL === undefined ? "https://api.polpanet.com" : process.env.NEXT_PUBLIC_API_URL}/api/password/forgot`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      alert("Código reenviado para o seu email.");
    } catch {
      setError("Erro ao reenviar código.");
    }
  };

  return (
    <div className="flex justify-center mt-[20px] min-md:mt-[120px] items-center flex-col relative gap-[100px] max-sm:scale-[80%]">
      <div className="flex flex-col gap-[32px] px-6 w-full max-w-[550px]">
        <div className="flex flex-col gap-2">
          <Link href="/send-email" className="flex font-bold hover:translate-y-[-3px] transition-all gap-3 items-center text-[14px] text-preto">
            <Image src={arrowLeft} alt="arrow left icon" width={18} height={18} />
            Voltar
          </Link>
          <h1 className="font-bold text-preto text-[38px]">Insira o Código</h1>
          <p className="text-[16px] text-[#7C7979]">
            Enviamos um email com o código de verificação para a troca de senha. Se, em alguns minutos, você não o receber, verifique a caixa de spam. Digite o código abaixo.
          </p>
        </div>

        <div className="flex justify-center items-center gap-2">
          {digits.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}              
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-[60px] h-[78px] border border-cinza-forelight rounded-lg bg-azul-lighter-forelight font-medium text-[32px] text-center text-lg focus:border-blue-500 outline-none"
            />
          ))}
        </div>
        <button
          type="button"
          onClick={handleResend}
          className="text-blue-500 flex gap-1 items-center text-end justify-end cursor-pointer text-sm hover:underline mt-2"
        >
            <Image src={refresh} alt="refresh icon"></Image>
          Reenviar
        </button>

        {error && <span className="text-red-500 text-sm">{error}</span>}

        <GeneralButton text="Continuar" onClick={handleSubmit} />
      </div>
    </div>
  );
}
