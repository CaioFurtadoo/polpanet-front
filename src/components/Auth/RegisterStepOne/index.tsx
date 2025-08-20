'use client';

import { GeneralInput } from "@/components/Inputs/GeneralInput";
import { PasswordInput } from "@/components/Inputs/PasswordInput";
import { GeneralButton } from "@/components/Buttons/GeneralButton";
import { LinkAuth } from "@/components/Auth/LinkAuth";
import { RegisterFormData } from "@/types/RegisterFormData";
import { useState, useEffect } from "react";
import { PasswordRequirements } from "../PasswordRequirements";

type Props = {
  data: RegisterFormData;
  onChange: (key: keyof RegisterFormData, value: string) => void;
  onNext: () => void;
  errors?: Partial<Record<keyof RegisterFormData, string>>;
};

export default function RegisterStepOne({ data, onChange, onNext, errors: externalErrors }: Props) {
  const [errors, setErrors] = useState<Partial<Record<keyof RegisterFormData, string>>>({});

  useEffect(() => {
    if (externalErrors) {
      setErrors(externalErrors);
    }
  }, [externalErrors]);

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!data.nomeEmpresa.trim()) newErrors.nomeEmpresa = "Nome da empresa é obrigatório";
    if (!data.email.trim()) newErrors.email = "Email é obrigatório";
    else if (!data.email.includes('@')) newErrors.email = "Deve ser um email válido";
    if (!data.cpfOrCnpj.trim()) newErrors.cpfOrCnpj = "CPF ou CNPJ é obrigatório";
    if (!data.endereco.trim()) newErrors.endereco = "Endereço é obrigatório";
    if (!data.telefone.trim()) newErrors.telefone = "Telefone é obrigatório";
    if (!data.senha.trim()) newErrors.senha = "Senha é obrigatória";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleClickNext = () => {
    if (validate()) {
      onNext();
    }
  };

  return (
    <form className="flex justify-center items-center flex-col relative gap-10 max-sm:scale-[90%] px-4 sm:px-6">
      <div className="flex flex-col gap-5 min-sm:w-[550px] max-w-[550px]">
        <div className="flex flex-col gap-2 text-center sm:text-left">
          <h1 className="font-bold text-preto text-3xl sm:text-[38px]">Registre a sua Empresa</h1>
          <p className="text-lg sm:text-[20px] text-[#7C7979]">Vamos dar o primeiro passo no seu cadastro</p>
        </div>
        <div className="flex gap-5">
          <GeneralInput
            labelText="Nome da Empresa"
            forLabel="nomeEmpresa"
            inputType="text"
            placeholder="Digite o nome"
            value={data.nomeEmpresa}
            onChange={(v) => onChange("nomeEmpresa", v)}
            error={errors.nomeEmpresa}
          />
          <GeneralInput
          labelText="Localidade"
          forLabel="endereco"
          inputType="text"
          placeholder="Digite a sua localidade"
          value={data.endereco}
          onChange={(v) => onChange("endereco", v)}
          error={errors.endereco}
          />
        </div>
        <div className="flex gap-5">
          <GeneralInput
            labelText="CPF ou CNPJ"
            forLabel="cpfOrCnpj"
            inputType="text"
            placeholder="Digite CPF ou CNPJ"
            value={data.cpfOrCnpj}
            onChange={(v) => onChange("cpfOrCnpj", v)}
            error={errors.cpfOrCnpj}
          />
          <GeneralInput
            labelText="Telefone"
            forLabel="telefone"
            inputType="text"
            placeholder="Digite o telefone"
            value={data.telefone}
            onChange={(v) => onChange("telefone", v)}
            error={errors.telefone}
          />
        </div>
        <GeneralInput
          labelText="Email"
          forLabel="email"
          inputType="email"
          placeholder="Digite seu email"
          value={data.email}
          onChange={(v) => onChange("email", v)}
          error={errors.email}
        />

        <PasswordInput
          labelText="Senha"
          forLabel="senha"
          placeholder="Digite a senha"
          value={data.senha}
          onChange={(v) => onChange("senha", v)}
          error={errors.senha}
        />
        <PasswordRequirements/>
        <GeneralButton text="Próximo" onClick={handleClickNext} />
      </div>
      <LinkAuth firstText="Já possui uma conta?" secondText="Entrar" linkTo="/login" />
    </form>
  );
}
