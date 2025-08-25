'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

import dolar from '@/assets/icons/currency-dollar.svg';
import globe from "@/assets/icons/globe.svg";
import instagram from "@/assets/icons/instagram-line.svg";
import facebook from "@/assets/icons/facebook-line.svg";
import linkedin from "@/assets/icons/Linkedin.svg";
import local from "@/assets/icons/marker-02.svg";
import phone from "@/assets/icons/phone.svg";
import { frutasMap } from '@/utils/frutas';
import { BannerOfert } from '@/components/Oferts/BannerOfert';
import squareAz from '@/assets/icons/bar-chart-square-azul.svg'
import squareLa from '@/assets/icons/bar-chart-square-laranja.svg'
import squareCi from '@/assets/icons/bar-chart-square-cinza.svg'
import { Tags } from '@/components/Oferts/Tags';
import { LoadingSpinner } from '@/components/LoadingSpinner';

interface Oferta {
  id: number;
  title: string;
  description: string;
  price: number;
  fruta: number;
  productType: number;
  ofertaType: number;
  initDate: string;
  finalDate: string;
  companyName: string;
  localidade: string;
  userId: number;
  quantity: number;
}

interface UserData {
  userId: number;
  userCompanyName: string;
  userDescription: string;
  userPhone: number;
  userAddress: string;
  userRegistroMapa: string;
  userWebsiteUrl: string;
  userInstagram: string;
  userFacebook: string;
  userLinkedin: string;
  userEmailComercial: string;
  userCpfOrCnpj: string;
  ofertas: Oferta[];
}

export default function PerfilDetalhe() {
  const { userid } = useParams();
  const [data, setData] = useState<UserData | null>(null);
  const [dataAtual, setDataAtual] = useState<UserData | null>(null);
  const [dataAtiva, setDataAtiva] = useState<UserData | null>(null);
  const [dataInativa, setDataInativa] = useState<UserData | null>(null);
  const [display, setDisplay] = useState("ativa");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token || !userid) return;

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL === undefined ? "https://api.polpanet.com" : process.env.NEXT_PUBLIC_API_URL}/api/user/${userid}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        });

        if (!res.ok) {
          console.error('Erro ao buscar perfil');
          return;
        }

        const userData = await res.json();
        setData(userData);

        const hoje = new Date();
        const ofertasAtivas = userData.ofertas.filter((oferta: Oferta) => {
          const inicio = new Date(oferta.initDate);
          const final = new Date(oferta.finalDate);
          return inicio <= hoje && hoje <= final;
        });

        const ofertasInativas = userData.ofertas.filter((oferta: Oferta) => {
          const inicio = new Date(oferta.initDate);
          const final = new Date(oferta.finalDate);
          return hoje < inicio || hoje > final;
        });

        setDataAtiva({ ...userData, ofertas: ofertasAtivas });
        setDataInativa({ ...userData, ofertas: ofertasInativas });

      } catch (err) {
        console.error('Erro:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userid]);

  useEffect(() => {
    if (!data || !dataAtiva || !dataInativa) return;
    const atual = display === "ativa" ? dataAtiva : dataInativa;
    setDataAtual(atual);
  }, [display, dataAtiva, dataInativa]);

  if (loading) return <LoadingSpinner />;
  if (!data) return <p className="p-6 text-red-600">Perfil não encontrado.</p>;

  return (
    <div className="flex flex-col gap-6 p-4">
      {/* Header */}
      <section className="bg-white border border-cinza-forelight rounded-lg overflow-hidden">
        <BannerOfert ofertType={1} />
        <div className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6">
          <div className="text-[22px] flex justify-center items-center font-bold text-white bg-laranja rounded-full w-[72px] h-[72px]">
            {data.userCompanyName[0]}
          </div>
          <div className="flex flex-col gap-3 text-preto-forelight w-full">
            <h1 className="text-preto text-[28px] sm:text-[36px] font-bold">{data.userCompanyName}</h1>
            <p className="text-cinza text-sm sm:text-base">CPF: {data.userCpfOrCnpj}</p>
            <p className="text-sm sm:text-base">{data.userDescription}</p>
            <ul className="flex flex-wrap gap-2 sm:gap-4 font-medium text-preto-forelight text-sm sm:text-base">
              <li className={`flex gap-2 items-center`}><Image src={local} width={20} height={20} alt='Endereço' />{data.userAddress}</li>
              <li className={`flex gap-2 items-center`}><Image src={phone} width={20} height={20} alt='Telefone' />{data.userPhone}</li>
              <li className={`flex gap-2 items-center ${data.userWebsiteUrl === "" ? "hidden" : ""}`}><Image src={globe} width={20} height={20} alt='Website' />{data.userWebsiteUrl}</li>
              <li className={`flex gap-2 items-center ${data.userInstagram === "" ? "hidden" : ""}`}><Image src={instagram} width={20} height={20} alt='Instagram' />{data.userInstagram}</li>
              <li className={`flex gap-2 items-center ${data.userFacebook === "" ? "hidden" : ""}`}><Image src={facebook} width={20} height={20} alt='Facebook' />{data.userFacebook}</li>
              <li className={`flex gap-2 items-center ${data.userLinkedin === "" ? "hidden" : ""}`}><Image src={linkedin} width={20} height={20} alt='LinkedIn' />{data.userLinkedin}</li>
            </ul>

            <ul className='flex flex-wrap gap-2 text-preto-forelight text-xs sm:text-sm'>
              <li className={`flex gap-2 items-center ${data.userEmailComercial === "" ? "hidden" : ""}`}><strong>Email Comercial:</strong> {data.userEmailComercial}</li>
              <li className={`flex gap-2 items-center ${data.userRegistroMapa === "" ? "hidden" : ""}`}><strong>Registro MAPA:</strong> {data.userRegistroMapa}</li>
            </ul>
            <p className="text-cinza text-sm">Membro desde 2025</p>
          </div>
        </div>
      </section>

      {/* Cards de estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <section className="flex flex-col items-center bg-white rounded-lg border border-cinza-forelight py-4 gap-1">
          <Image src={squareAz} alt="square azul icon" />
          <p className="font-bold text-preto text-lg">{data.ofertas.length}</p>
          <p className="text-cinza">Total de Ofertas</p>
        </section>
        <section className="flex flex-col items-center bg-white rounded-lg border border-cinza-forelight py-4 gap-1">
          <Image src={squareCi} alt="square cinza icon" />
          <p className="font-bold text-preto text-lg">{dataInativa?.ofertas.length}</p>
          <p className="text-cinza">Ofertas Inativas</p>
        </section>
        <section className="flex flex-col items-center bg-white rounded-lg border border-cinza-forelight py-4 gap-1">
          <Image src={squareLa} alt="square laranja icon" />
          <p className="font-bold text-preto text-lg">{dataAtiva?.ofertas.length}</p>
          <p className="text-cinza">Ofertas Ativas</p>
        </section>
      </div>

      {/* Lista de ofertas */}
      <section className="bg-white p-4 border border-cinza-forelight rounded-lg">
        <h2 className="text-lg sm:text-xl font-bold text-preto mb-4">Ofertas</h2>
        <div className="bg-[#F3F5F5] flex rounded-sm mb-4">
          <button
            className={`flex-1 py-1.5 ${display === "ativa" ? "bg-white border border-cinza-forelight rounded-sm" : ""}`}
            onClick={() => setDisplay("ativa")}
          >
            {`Ativas(${dataAtiva?.ofertas.length})`}
          </button>
          <button
            className={`flex-1 py-1.5 ${display === "inativa" ? "bg-white border border-cinza-forelight rounded-sm" : ""}`}
            onClick={() => setDisplay("inativa")}
          >
            {`Inativas(${dataInativa?.ofertas.length})`}
          </button>
        </div>

        {dataAtual?.ofertas.length === 0 && (
          <p className="text-cinza">Nenhuma oferta {display} disponível.</p>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {dataAtual?.ofertas.map((oferta) => (
            <div key={oferta.id} className="p-4 rounded-lg border border-cinza-forelight flex flex-col gap-3 hover:scale-[101%] transition-all">
              <p className="text-preto font-bold text-lg">{oferta.title}</p>
              <Tags ofertType={oferta.ofertaType} productType={oferta.productType} fruta={frutasMap[oferta.fruta]} bg={true} />
              <div>
                <div className="text-lg sm:text-[20px] font-bold text-preto-forelight">
                  {oferta.price !== 0 ? oferta.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : "Negociar"}
                  <p className="text-[16px] font-medium">
                      Quantidade: <strong>{oferta.quantity}kg</strong>
                  </p>
                </div>
                <p className="text-xs text-cinza">
                  Expira em {Math.ceil((new Date(oferta.finalDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))} dias
                </p>
              </div>
              <p className="text-sm text-preto-forelight line-clamp-2 mb-4">{oferta.description}</p>
              <Link className="text-preto font-bold text-sm" href={`/oferta/${oferta.id}`}>Ver detalhes</Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
