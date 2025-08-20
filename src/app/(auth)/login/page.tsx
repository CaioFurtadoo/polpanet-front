// 4. login.tsx (ajustado)
'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GeneralInput } from "@/components/Inputs/GeneralInput";
import { PasswordInput } from "@/components/Inputs/PasswordInput";
import { GeneralButton } from "@/components/Buttons/GeneralButton";
import { LinkAuth } from "@/components/Auth/LinkAuth";
import { setAuthToken } from '@/utils/auth';
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const router = useRouter();

  const HandleSubmit = async () => {
    setIsLoading(true);
    setPasswordError(null);

    try {
      const response = await fetch('http://72.60.49.135/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setPasswordError(data?.errorMessage?.[0] || 'Erro ao fazer login.');
        return;
      }

      setAuthToken(data.token);
      localStorage.setItem('companyName', data.companyName);
      router.push('/');
    } catch (error) {
      console.error("Erro na requisição:", error);
      setPasswordError("Erro de conexão com o servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="flex justify-center items-center w-full flex-col relative mt-[60px] min-md:mt-[120px] max-[1400px]:mx-8 gap-[100px]" onSubmit={(e) => { e.preventDefault(); HandleSubmit(); }}>
      <div className="flex flex-col gap-[18px] w-full max-w-[550px]">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-preto text-[38px] max-[700px]:text-[32px] max-sm:text-[28px]">Bem-Vindo(a) de Volta!</h1>
          <p className="text-[20px] max-[700px]:text-[14px] text-[#7C7979]">Insira seu email e senha para continuar.</p>
        </div>

        <GeneralInput
          placeholder="Digite o seu email"
          labelText="Email"
          forLabel="email"
          inputType="email"
          value={email}
          onChange={setEmail}
        />

        <PasswordInput
          placeholder="Digite sua senha"
          labelText="Senha"
          forLabel="senha"
          value={password}
          onChange={setPassword}
          error={passwordError ?? undefined}
        />

        <GeneralButton text="Entrar" onClick={HandleSubmit} isLoading={isLoading} />
        <Link href="/send-email" className="text-right text-[12px] text-azul">Esqueceu a senha?</Link>
      </div>

      <LinkAuth firstText="Ainda não possui uma conta?" secondText="Registrar" linkTo="/register" />
    </form>
  );
}