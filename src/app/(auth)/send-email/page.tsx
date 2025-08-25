'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GeneralInput } from "@/components/Inputs/GeneralInput";
import { GeneralButton } from "@/components/Buttons/GeneralButton";
import Link from "next/link";
import Image from "next/image";
import arrowLeft from "@/assets/icons/arrow-left.svg";

async function safeJsonParse(response: Response) {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

export default function SendEmail() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const validateEmail = (e: string) => /\S+@\S+\.\S+/.test(e);

  const HandleSubmit = async () => {
    setIsLoading(true);
    setError(null);

    const trimmed = email.trim();
    if (!trimmed) {
      setError("Digite um email.");
      setIsLoading(false);
      return;
    }
    if (!validateEmail(trimmed)) {
      setError("Digite um email válido.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL === undefined ? "https://api.polpanet.com" : process.env.NEXT_PUBLIC_API_URL}/api/password/forgot`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: trimmed }),
      });

      const data = await safeJsonParse(response);

      if (!response.ok) {
        const msg =
          data?.errorMessage?.[0] ||
          data?.message ||
          (typeof data === 'string' ? data : `Erro: ${response.status}`);
        setError(msg);
        return; 
      }

      localStorage.setItem("resetEmail", trimmed);
      router.push('/send-code');
    } catch (err) {
      console.error("Erro na requisição:", err);
      setError("Erro de conexão com o servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="flex mt-[60px] min-md:mt-[120px] justify-center items-center flex-col relative gap-[100px]"
      onSubmit={(e) => {
        e.preventDefault();
        HandleSubmit();
      }}
    >
      <div className="flex flex-col gap-[18px] w-full max-w-[550px]  px-6">
        <div className="flex flex-col gap-2">
          <Link href="/login" className="flex font-bold hover:translate-y-[-3px] transition-all gap-3 items-center text-[14px] text-preto">
            <Image src={arrowLeft} alt="arrow left icon" width={18} height={18} />
            Voltar
          </Link>
          <h1 className="font-bold text-preto text-[38px] max-sm:text-[30px]">Informe o seu Email</h1>
          <p className="text-[18px] text-[#7C7979] max-sm:text-[15px]">Insira o email registrado da sua conta e nós lhe enviaremos um código para trocar a sua senha.</p>
        </div>

        <GeneralInput
          placeholder="Digite o seu email"
          labelText="Email"
          forLabel="email"
          inputType="email"
          value={email}
          onChange={setEmail}
          error={error ?? undefined}
        />

        <GeneralButton text="Enviar" onClick={HandleSubmit} isLoading={isLoading} />
      </div>
    </form>
  );
}
