'use client'

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

import arrow from "@/assets/icons/arrow-left.svg";
import alertIcon from "@/assets/icons/alert-triangle.svg";
import shield from "@/assets/icons/shield-02.svg";
import company from "@/assets/icons/hotel-line.svg";
import globeIcon from "@/assets/icons/globe.svg";
import instagramIcon from "@/assets/icons/instagram-line.svg";
import facebookIcon from "@/assets/icons/facebook-line.svg";
import linkedinIcon from "@/assets/icons/Linkedin.svg";
import redAlertIcon from "@/assets/icons/alert-triangleRed.svg"
import blueShield from "@/assets/icons/shield-02Blue.svg"
import blueAlertIcon from "@/assets/icons/alert-triangleBlue.svg" 
import companyBlue from "@/assets/icons/hotel-lineBlue.svg"

import { GeneralInput } from "@/components/Inputs/GeneralInput";
import { IconInput } from "@/components/Inputs/IconInput";
import { TextAreaInput } from "@/components/Inputs/TextAreaInput";
import { GeneralButton } from "@/components/Buttons/GeneralButton";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { clearAuth, isTokenValid } from "@/utils/auth";
import { PasswordRequirements } from "@/components/Auth/PasswordRequirements";


export default function Config() {


const perfilRef = useRef<HTMLDivElement>(null);
const senhaRef = useRef<HTMLDivElement>(null);
const contaRef = useRef<HTMLDivElement>(null);

const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
  ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};


  const [activeSection, setActiveSection] = useState<'perfil' | 'senha' | 'conta' | null>('perfil');

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [emailComercial, setEmailComercial] = useState(""); 
  const [nomeEmpresa, setNomeEmpresa] = useState("");
  const [cpfOrCnpj, setCpfOrCnpj] = useState("");
  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState("");
  const [website, setWebsite] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [descricao, setDescricao] = useState("");
  const [registroMapa, setRegistroMapa] = useState("");

  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [isModalOpen, setIsModalOpen] = useState(false);
const [deleteMessage, setDeleteMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token") || "";

    fetch(`${process.env.NEXT_PUBLIC_API_URL === undefined ? "https://api.polpanet.com" : process.env.NEXT_PUBLIC_API_URL}/api/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        setEmail(data.email || "");
        setEmailComercial(data.emailComercial || "");
        setNomeEmpresa(data.companyName || "");
        setCpfOrCnpj(data.cpfOrCnpj || "");
        setEndereco(data.address || "");
        setTelefone(data.phone?.toString() || "");
        setWebsite(data.websiteUrl || "");
        setInstagram(data.instagram || "");
        setFacebook(data.facebook || "");
        setLinkedin(data.linkedin || "");
        setDescricao(data.description || "");
        setRegistroMapa(data.registroMapa || "");
      })
      .catch(err => {
        console.error("Erro ao buscar perfil:", err);
      });
  }, []);

  const mapErrorToField = (error: string) => {
    error = error.toLowerCase();
    if (error.includes("empresa")) return "nomeEmpresa";
    if (error.includes("cpf") || error.includes("cnpj")) return "cpfOrCnpj";
    if (error.includes("telefone") || error.includes("número")) return "telefone";
    if (error.includes("email comercial")) return "emailComercial";
    if (error.includes("email")) return "email";
    if (error.includes("mapa")) return "registroMapa";
    if (error.includes("localidade") || error.includes("endereço")) return "endereco";
    if (error.includes("website") || error.includes("site")) return "website";
    if (error.includes("instagram")) return "instagram";
    if (error.includes("facebook")) return "facebook";
    if (error.includes("linkedin")) return "linkedin";
    if (error.includes("descrição") || error.includes("description")) return "descricao";
    return "general";
  };
  
    const router = useRouter();
    function handleLogout() {
      clearAuth();
      router.push("/login");
    }

const handleSubmit = async () => {
  setSuccessMessage("");
  setErrors({});

  const payload = {
    companyName: nomeEmpresa,
    description: descricao,
    cpfOrCnpj: cpfOrCnpj,
    phone: telefone,
    address: endereco,
    registroMapa: registroMapa,
    websiteUrl: website,
    instagram,
    facebook,
    linkedin,
    emailComercial,
    email
  };

  try {
    const token = localStorage.getItem("token") || "";
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL === undefined ? "https://api.polpanet.com" : process.env.NEXT_PUBLIC_API_URL}/api/user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    let data: any = null;
    const contentType = res.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      data = await res.json();
    }

    if (!res.ok) {
      const newErrors: { [key: string]: string } = {};
      (data?.errorMessage || []).forEach((msg: string) => {
        const field = mapErrorToField(msg);
        newErrors[field] = msg;
      });
      setErrors(newErrors);
      return;
    }

    setSuccessMessage("Perfil atualizado com sucesso!");
  } catch (error) {
    console.error("Erro:", error);
    setErrors({ general: "Erro ao atualizar perfil." });
  }
};

const handleSubmitSenha = async () => {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            setMessage({ type: 'error', text: 'Token não encontrado. Faça login novamente.' });
            return;
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL === undefined ? "https://api.polpanet.com" : process.env.NEXT_PUBLIC_API_URL}/api/user/change-password`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ password, newPassword })
        });

        if (!response.ok) {
            const data = await response.json();
            const error = Array.isArray(data.errorMessage) ? data.errorMessage[0] : 'Erro ao mudar senha.';
            setMessage({ type: 'error', text: error });
        } else {
            setMessage({ type: 'success', text: 'Senha alterada com sucesso!' });
            setPassword('');
            setNewPassword('');
            setTimeout(() => {
              handleLogout()
            }, 2000);
        }

    } catch (error) {
        setMessage({ type: 'error', text: 'Erro de conexão com o servidor.' });
    }
};

const handleDeleteAccount = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      setDeleteMessage({ type: 'error', text: 'Token não encontrado. Faça login novamente.' });
      return;
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL === undefined ? "https://api.polpanet.com" : process.env.NEXT_PUBLIC_API_URL}/api/user`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json"
      }
    });

    if (!response.ok) {
      const data = await response.json();
      const error = Array.isArray(data.errorMessage) ? data.errorMessage[0] : "Erro ao excluir conta.";
      setDeleteMessage({ type: 'error', text: error });
      return;
    }

    setDeleteMessage({ type: 'success', text: 'Conta excluída com sucesso.' });

    // Opcional: redirecionar após excluir
    setTimeout(() => {
      handleLogout()
    }, 2000);

  } catch (error) {
    console.error("Erro ao excluir conta:", error);
    setDeleteMessage({ type: 'error', text: 'Erro ao conectar com o servidor.' });
  }
};

  return (
    <div className="flex gap-12 max-xl:flex-col">
      <div className="flex flex-col gap-8">
        <Link className="flex items-center gap-3 font-bold text-[14px]" href="/">
          <Image src={arrow} alt="arrow left icon" width={18} height={18} />
          Voltar
        </Link>
        <section className="p-3 bg-white border border-cinza-forelight rounded-lg font-bold text-preto flex-col gap-3 flex">
          <ul className="flex flex-col gap-4">
            <li
            onClick={() => {
                scrollToSection(perfilRef);
                setActiveSection('perfil');
            }}
            className={`flex gap-3 py-2 px-2 items-center rounded-sm cursor-pointer font-bold ${
                activeSection === 'perfil' ? 'bg-azul-lighter-forelight text-azul' : 'text-preto'
            }`}
            >
            <Image width={24} height={24} src={activeSection === 'perfil' ? companyBlue : company} alt="company icon" />
            Perfil da empresa
            </li>

            <li
            onClick={() => {
                scrollToSection(senhaRef);
                setActiveSection('senha');
            }}
            className={`flex gap-3 py-2 px-2 items-center rounded-sm cursor-pointer font-bold ${
                activeSection === 'senha' ? 'bg-azul-lighter-forelight text-azul' : 'text-preto'
            }`}
            >
            <Image src={activeSection === 'senha' ? blueShield :shield} alt="security icon" />
            Segurança
            </li>

            <li
            onClick={() => {
                scrollToSection(contaRef);
                setActiveSection('conta');
            }}
            className={`flex gap-3 py-2 px-2 items-center rounded-sm cursor-pointer font-bold ${
                activeSection === 'conta' ? 'bg-azul-lighter-forelight text-azul' : 'text-preto'
            }`}
            >
            <Image src={activeSection === 'conta' ? blueAlertIcon : alertIcon} alt="alert icon" />
            Conta
            </li>

          </ul>
        </section>
      </div>

      <div className="flex flex-1 flex-col gap-[12px] min-w-0 overflow-y-scroll min-h-[650px] max-h-[900px]">
        <section ref={perfilRef} className="flex flex-col gap-[18px] p-6 bg-white border border-cinza-forelight rounded-lg">
          <h1 className="flex gap-3 items-center text-[36px] font-bold text-preto-forelight">
            <Image width={42} height={42} src={company} alt="company icon" />
            Perfil da empresa
          </h1>

          {successMessage && <div className="text-green-600 font-semibold">{successMessage}</div>}
          {errors.general && <div className="text-red-600 font-semibold">{errors.general}</div>}

          <GeneralInput labelText="Nome" forLabel="nome" placeholder="Digite o nome da sua empresa" inputType="text" value={nomeEmpresa} onChange={setNomeEmpresa} error={errors.nomeEmpresa} />

          <div className="flex gap-16 max-[720px]:flex-col max-[720px]:gap-[18px]">
            <div className="flex-1">
              <GeneralInput labelText="Email" forLabel="email" placeholder="Digite seu email" inputType="email" value={email} onChange={setEmail} error={errors.email} />
            </div>
            <div className="flex-1">
              <GeneralInput labelText="Email Comercial" forLabel="emailComercial" placeholder="Digite seu email comercial" inputType="email" value={emailComercial} onChange={setEmailComercial} error={errors.emailComercial} />
            </div>
          </div>

          <GeneralInput labelText="Registro no Mapa" forLabel="registroMapa" placeholder="Digite o registro no mapa" inputType="text" value={registroMapa} onChange={setRegistroMapa} error={errors.registroMapa} />

          <div className="flex gap-16 max-[720px]:flex-col max-[720px]:gap-[18px]">
            <div className="flex-1">
              <GeneralInput labelText="CPF/CNPJ" forLabel="cpfOrCnpj" placeholder="Digite seu CPF ou CNPJ" inputType="text" value={cpfOrCnpj} onChange={setCpfOrCnpj} error={errors.cpfOrCnpj} />
            </div>
            <div className="flex-1">
              <GeneralInput labelText="Telefone" forLabel="telefone" placeholder="Digite seu telefone" inputType="text" value={telefone} onChange={setTelefone} error={errors.telefone} />
            </div>
          </div>

          <GeneralInput labelText="Localidade" forLabel="endereco" placeholder="Digite sua localidade" inputType="text" value={endereco} onChange={setEndereco} error={errors.endereco} />

          <div className="flex gap-16 max-[720px]:flex-col max-[720px]:gap-[18px]">
                <div className="flex-1">
                    <IconInput urlImage={globeIcon} altImage="Website" forLabel="website" labelText="Website" placeholder="https://abc.com" value={website} onChange={setWebsite} type="text" />
                </div>
                <div className="flex-1">
                    <IconInput urlImage={instagramIcon} altImage="Instagram" forLabel="instagram" labelText="Instagram" placeholder="instagram.com" value={instagram} onChange={setInstagram} type="text" />
                </div>
          </div>

          <div className="flex gap-16 max-[720px]:flex-col max-[720px]:gap-[18px]">
                <div className="flex-1">
                    <IconInput urlImage={facebookIcon} altImage="Facebook" forLabel="facebook" labelText="Facebook" placeholder="facebook.com" value={facebook} onChange={setFacebook} type="text" />
                </div>
                <div className="flex-1">
                    <IconInput urlImage={linkedinIcon} altImage="Linkedin" forLabel="linkedin" labelText="Linkedin" placeholder="linkedin.com" value={linkedin} onChange={setLinkedin} type="text" />
                </div>
          </div>

          <TextAreaInput forLabel="descricao" labelText="Descrição" placeholder="Descrição da empresa" value={descricao} onChange={setDescricao} />
          <div className="w-full flex justify-end">
            <GeneralButton width="w-[180px]" text="Salvar alterações" onClick={handleSubmit} />
          </div>
        </section>
        <section ref={senhaRef} className="flex flex-col gap-[18px] p-6 bg-white border border-cinza-forelight rounded-lg">
            <h1 className="flex gap-3 items-center text-[36px] font-bold text-preto-forelight">
                <Image width={42} height={42} src={shield} alt="shield icon" />
                Segurança
            </h1>
            <p className="text-preto-forelight font-medium text-[14px]">Alterar a senha também encerrará todas as sessões ativas em outros dispositivos.</p>

            <GeneralInput labelText="Senha Antiga" forLabel="password" placeholder="Digite a senha antiga" inputType="text" value={password} onChange={setPassword} />
            <GeneralInput labelText="Senha Nova" forLabel="newPassword" placeholder="Digite a senha nova" inputType="text" value={newPassword} onChange={setNewPassword} />
            <PasswordRequirements/>

            <div className="w-full flex justify-end">
            <GeneralButton width="w-[180px]" text="Mudar Senha" onClick={handleSubmitSenha} />
            </div>

            {message && (
                <div className={`text-sm font-medium mt-2 ${message.type === 'success' ? 'text-green-600' : 'text-erro'}`}>
                    {message.text}
                </div>
            )}


        </section>
        <section  ref={contaRef} className="flex flex-col gap-3 p-6 bg-white border border-cinza-forelight rounded-lg">
            <h1 className="flex gap-3 items-center text-[36px] font-bold text-erro pb-1.5">
                <Image width={42} height={42} src={redAlertIcon} alt="shield icon" />
                Gerenciar Conta
            </h1>
            <p className="text-preto text-[16px]">Encerrar conta permanentemente</p>
            <p className="text-preto-forelight text-[14px]">Esta ação não pode ser desfeita. Todos os seus dados, ofertas e histórico serão removidos permanentemente do sistema.</p>
            <button
            onClick={() => setIsModalOpen(true)}
            className="hover:scale-105 transition-all py-3 w-[150px] text-[14px] cursor-pointer rounded-lg border-erro border font-bold flex justify-center items-center text-erro"
            >
            Encerrar Conta
            </button>        
        </section>
      </div>
        {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 border-cinza-forelight">
            <div className="bg-white rounded-lg mx-6 p-6 max-w-md w-full text-center">
            <h2 className="text-xl font-bold text-preto mb-4">Tem certeza?</h2>
            <p className="text-preto-forelight mb-6">Essa ação é irreversível. Deseja mesmo excluir sua conta?</p>
            <div className="flex justify-center gap-4 font-bold">
                <button
                onClick={() => setIsModalOpen(false)}
                className="hover:scale-105 transition-all bg-gray-200 cursor-pointer text-preto px-4 py-2 rounded-md"
                >
                Cancelar
                </button>
                <button
                onClick={handleDeleteAccount}
                className="hover:scale-105 transition-all bg-erro cursor-pointer text-white px-4 py-2 rounded-md"
                >
                Confirmar
                </button>
            </div>
            {deleteMessage && (
                <div className={`mt-4  text-sm font-medium ${deleteMessage.type === 'success' ? 'text-green-600' : 'text-erro'}`}>
                {deleteMessage.text}
                </div>
            )}
            </div>
        </div>
        )}
    </div>
  );
}
