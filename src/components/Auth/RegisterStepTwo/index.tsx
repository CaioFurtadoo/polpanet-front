import { IconInput } from "@/components/Inputs/IconInput";
import { TextAreaInput } from "@/components/Inputs/TextAreaInput";
import { GeneralInput } from "@/components/Inputs/GeneralInput";
import { GeneralButton } from "@/components/Buttons/GeneralButton";
import Link from "next/link";
import Image from "next/image";
import arrowLeft from "@/assets/icons/arrow-left.svg";
import globe from "@/assets/icons/globe.svg";
import instagram from "@/assets/icons/instagram-line.svg";
import facebook from "@/assets/icons/facebook-line.svg";
import linkedin from "@/assets/icons/Linkedin.svg";
import { RegisterFormData } from "@/types/RegisterFormData";

interface Props {
  data: RegisterFormData;
  onChange: (key: keyof RegisterFormData, value: string) => void;
  onBack: () => void;
  onSubmit: () => void;
}


export default function RegisterStepTwo({ data, onChange, onBack, onSubmit }: Props) {
  return (
    <form
      className="flex flex-col gap-5 w-full max-w-[550px] px-4 max-sm:scale-[80%] sm:px-6 md:px-8"
      onSubmit={(e) => { e.preventDefault(); onSubmit(); }}
    >
      <div className="flex flex-col gap-2">
        <Link
          href="#"
          onClick={(e) => { e.preventDefault(); onBack(); }}
          className="flex items-center gap-2 text-base sm:text-lg font-bold text-preto"
        >
          <Image src={arrowLeft} alt="Voltar" width={20} height={20} />
          Voltar
        </Link>
        <h1 className="font-bold text-preto text-2xl sm:text-3xl md:text-[38px] leading-tight">
          Informações Adicionais
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-[#7C7979]">
          Vamos dar o segundo passo no seu cadastro,{" "}
          <strong className="font-bold">opcional</strong>
        </p>
      </div>

      <div className="flex gap-5">
      <IconInput
        urlImage={globe}
        altImage="Website"
        forLabel="website"
        labelText="Website da Empresa"
        placeholder="https://abc.com"
        value={data.website}
        onChange={(v) => onChange("website", v)}
        type="text"
      />
      <IconInput
        urlImage={instagram}
        altImage="Instagram"
        forLabel="instagram"
        labelText="Instagram"
        placeholder="instagram.com"
        value={data.instagram}
        onChange={(v) => onChange("instagram", v)}
        type="text"
      />
      </div>
      <div className="flex gap-5">
      <IconInput
        urlImage={facebook}
        altImage="Facebook"
        forLabel="facebook"
        labelText="Facebook"
        placeholder="facebook.com"
        value={data.facebook}
        onChange={(v) => onChange("facebook", v)}
        type="text"
      />
      <IconInput
        urlImage={linkedin}
        altImage="LinkedIn"
        forLabel="linkedin"
        labelText="LinkedIn"
        placeholder="linkedin.com"
        value={data.linkedin}
        onChange={(v) => onChange("linkedin", v)}
        type="text"
      />
      </div>
      <GeneralInput
        forLabel="registroMapa"
        labelText="Registro do mapa"
        placeholder="123"
        inputType="text"
        value={data.registroMapa}
        onChange={(v) => onChange("registroMapa", v)}
      />
      <TextAreaInput
        forLabel="descricao"
        labelText="Descrição"
        placeholder="Descrição da empresa"
        value={data.descricao}
        onChange={(v) => onChange("descricao", v)}
      />

      {/* Botão */}
      <div className="w-full flex justify-end">
        <GeneralButton text="Registrar" onClick={onSubmit} />
      </div>
    </form>
  );
}

