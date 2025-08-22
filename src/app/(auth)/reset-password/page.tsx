'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GeneralInput } from "@/components/Inputs/GeneralInput";
import { GeneralButton } from "@/components/Buttons/GeneralButton";
import Link from "next/link";
import Image from "next/image";
import arrowLeft from "@/assets/icons/arrow-left.svg";
import { PasswordRequirements } from "@/components/Auth/PasswordRequirements";

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const HandleSubmit = async () => {
    setIsLoading(true);
    setError(null);

    const code = localStorage.getItem("resetCode");
    if (!code) {
      setError("Código não encontrado. Volte e insira novamente.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL === undefined ? "https://api.polpanet.com" : ""}/api/password/reset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code, newPassword }),
      });

      const text = await response.text();
      let data: any = null;
      try {
        data = text ? JSON.parse(text) : null;
      } catch {
        data = null;
      }

      if (!response.ok) {
        const msg = data?.errorMessage?.[0] || data?.message || "Erro ao redefinir senha.";
        setError(msg);
        return;
      }

      localStorage.removeItem("resetCode");
      localStorage.removeItem("email");
      router.push("/login");
    } catch (err) {
      console.error("Erro na requisição:", err);
      setError("Erro de conexão com o servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="flex justify-center min-md:mt-[120px] max-sm:scale-90 items-center flex-col relative gap-[100px]"
      onSubmit={HandleSubmit}
    >
      <div className="flex flex-col gap-[18px] w-full px-6 max-w-[550px]">
        <div className="flex flex-col gap-2">
          <Link
            href="/send-code"
            className="flex font-bold hover:translate-y-[-3px] transition-all gap-3 items-center text-[14px] text-preto"
          >
            <Image src={arrowLeft} alt="arrow left icon" width={18} height={18} />
            Voltar
          </Link>
          <h1 className="font-bold text-preto text-[38px]">Nova Senha</h1>
          <p className="text-[18px] text-[#7C7979]">
            Digite o seu email e a nova senha que deseja utilizar.
          </p>
        </div>

        <GeneralInput
          placeholder="Digite o seu email"
          labelText="Email"
          forLabel="email"
          inputType="email"
          value={email}
          onChange={setEmail}
        />

        <GeneralInput
          placeholder="Digite a nova senha"
          labelText="Nova Senha"
          forLabel="password"
          inputType="password"
          value={newPassword}
          onChange={setNewPassword}
          error={error ?? undefined}
        />
        <PasswordRequirements/>
        <GeneralButton
          text="Alterar Senha"
          onClick={HandleSubmit}
          isLoading={isLoading}
        />
      </div>
    </form>
  );
}
