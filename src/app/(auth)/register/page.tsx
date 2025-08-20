'use client';

import { useState } from "react";
import RegisterStepOne from "@/components/Auth/RegisterStepOne";
import RegisterStepTwo from "@/components/Auth/RegisterStepTwo";
import { RegisterFormData } from "@/types/RegisterFormData";
import { useRouter } from "next/navigation";
import { setAuthToken } from "@/utils/auth";

export default function Register() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<RegisterFormData>({
    email: "",
    senha: "",
    nomeEmpresa: "",
    cpfOrCnpj: "",
    endereco: "",
    telefone: "",
    website: "",
    instagram: "",
    facebook: "",
    linkedin: "",
    descricao: "",
    registroMapa: ""
  });
  const [errors, setErrors] = useState<Partial<Record<keyof RegisterFormData, string>>>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (key: keyof RegisterFormData, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    setErrors(prev => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setErrors({});

    const payload = {
      companyName: formData.nomeEmpresa,
      description: formData.descricao,
      cpfOrCnpj: formData.cpfOrCnpj,
      phone: formData.telefone,
      address: formData.endereco,
      registroMapa: formData.registroMapa,
      websiteUrl: formData.website,
      instagram: formData.instagram,
      facebook: formData.facebook,
      linkedin: formData.linkedin,
      emailComercial: formData.email,
      email: formData.email,
      password: formData.senha
    };

    try {
      const response = await fetch("http://72.60.49.135/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        if (Array.isArray(data?.errorMessage)) {
          const newErrors: Partial<Record<keyof RegisterFormData, string>> = {};

          data.errorMessage.forEach((msg: string) => {
            if (msg.includes("empresa")) newErrors.nomeEmpresa = msg;
            else if (msg.includes("CPF") || msg.includes("CNPJ")) newErrors.cpfOrCnpj = msg;
            else if (msg.includes("telefone")) newErrors.telefone = msg;
            else if (msg.toLowerCase().includes("email")) newErrors.email = msg;
            else if (msg.toLowerCase().includes("senha")) newErrors.senha = msg;
          });

          setErrors(newErrors);
          setStep(1);
        } else {
          alert("Erro desconhecido no cadastro.");
        }
        return;
      }

      setAuthToken(data.token);
      localStorage.setItem('companyName', data.companyName);
      router.push('/');
      
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro de conexão com o servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  return step === 1 ? (
    <RegisterStepOne
      data={formData}
      onChange={handleChange}
      onNext={() => setStep(2)}
      errors={errors}
    />
  ) : (
    <RegisterStepTwo
      data={formData}
      onChange={handleChange}
      onBack={() => setStep(1)}
      onSubmit={handleSubmit}
    />
  );
}
