'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import fechar from "@/assets/icons/x-02.svg"
import editarAzul from "@/assets/icons/edit-contained-azul.svg"
import editar from "@/assets/icons/edit-contained.svg"
import globe from "@/assets/icons/globe.svg";
import instagram from "@/assets/icons/instagram-line.svg";
import facebook from "@/assets/icons/facebook-line.svg";
import linkedin from "@/assets/icons/Linkedin.svg";
import local from "@/assets/icons/marker-02.svg";
import phone from "@/assets/icons/phone.svg";
import { frutasMap } from '@/utils/frutas';
import { BannerOfert } from '@/components/Oferts/BannerOfert';
import squareAz from '@/assets/icons/bar-chart-square-azul.svg';
import squareLa from '@/assets/icons/bar-chart-square-laranja.svg';
import squareCi from '@/assets/icons/bar-chart-square-cinza.svg';
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

interface User {
  id: number;
  companyName: string;
  description: string;
  cpfOrCnpj: string;
  phone: number;
  address: string;
  registroMapa: string;
  websiteUrl: string;
  instagram: string;
  facebook: string;
  linkedin: string;
  emailComercial: string;
  email: string;
}

export default function PerfilLogado() {
  const [user, setUser] = useState<User | null>(null);
  const [ofertas, setOfertas] = useState<Oferta[]>([]);
  const [ativas, setAtivas] = useState<Oferta[]>([]);
  const [inativas, setInativas] = useState<Oferta[]>([]);
  const [display, setDisplay] = useState<'ativa' | 'inativa'>('ativa');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [ofertaSelecionada, setOfertaSelecionada] = useState<Oferta | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const userRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!userRes.ok) throw new Error('Erro ao buscar usuário');
        const userData: User = await userRes.json();
        setUser(userData);

        const ofertasRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/oferta`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!ofertasRes.ok) throw new Error('Erro ao buscar ofertas');
        const { ofertas }: { ofertas: Oferta[] } = await ofertasRes.json();

        const minhasOfertas = ofertas.filter(o => o.userId === userData.id);
        setOfertas(minhasOfertas);

        const hoje = new Date();
        setAtivas(minhasOfertas.filter(o => new Date(o.initDate) <= hoje && new Date(o.finalDate) >= hoje));
        setInativas(minhasOfertas.filter(o => new Date(o.initDate) > hoje || new Date(o.finalDate) < hoje));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (!user) return <p className="p-6 text-red-600">Erro ao carregar dados.</p>;

  const ofertasExibidas = display === 'ativa' ? ativas : inativas;

  const deletarOferta = async () => {
    if (!ofertaSelecionada) return;
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/oferta/${ofertaSelecionada.id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error('Erro ao deletar oferta');

      setOfertas(prev => prev.filter(o => o.id !== ofertaSelecionada.id));
      setAtivas(prev => prev.filter(o => o.id !== ofertaSelecionada.id));
      setInativas(prev => prev.filter(o => o.id !== ofertaSelecionada.id));

      setShowModal(false);
      setOfertaSelecionada(null);
    } catch (err) {
      console.error('Erro ao deletar:', err);
      alert('Erro ao deletar oferta. Tente novamente.');
    }
  };

  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6">
      <section className="bg-white border border-cinza-forelight rounded-lg overflow-hidden">
        <BannerOfert ofertType={0} />
        <div className='p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 relative'>
          <div className="text-[22px] flex justify-center items-center font-bold text-white bg-azul-forelight rounded-full min-w-[72px] min-h-[72px] w-[72px] h-[72px] sm:mx-0">
            {user.companyName[0]}
          </div>
          <div className='flex flex-col gap-3 text-preto-forelight w-full sm:w-[85%]'>
            <h1 className='text-preto text-2xl sm:text-[36px] font-bold break-words'>{user.companyName}</h1>
            <p className='text-cinza text-sm sm:text-base'>CPF: {user.cpfOrCnpj}</p>
            <p className="text-sm sm:text-base">{user.description}</p>

            <ul className="flex flex-wrap gap-2 sm:gap-4 font-medium text-preto-forelight text-sm sm:text-base">
              <li className={`flex gap-2 items-center`}><Image src={local} width={20} height={20} alt='Endereço' />{user.address}</li>
              <li className={`flex gap-2 items-center`}><Image src={phone} width={20} height={20} alt='Telefone' />{user.phone}</li>
              <li className={`flex gap-2 items-center ${user.websiteUrl === "" ? "hidden" : ""}`}><Image src={globe} width={20} height={20} alt='Website' />{user.websiteUrl}</li>
              <li className={`flex gap-2 items-center ${user.instagram === "" ? "hidden" : ""}`}><Image src={instagram} width={20} height={20} alt='Instagram' />{user.instagram}</li>
              <li className={`flex gap-2 items-center ${user.facebook === "" ? "hidden" : ""}`}><Image src={facebook} width={20} height={20} alt='Facebook' />{user.facebook}</li>
              <li className={`flex gap-2 items-center ${user.linkedin === "" ? "hidden" : ""}`}><Image src={linkedin} width={20} height={20} alt='LinkedIn' />{user.linkedin}</li>
            </ul>

            <ul className='flex flex-wrap gap-2 text-preto-forelight text-xs sm:text-sm'>
              <li className={`flex gap-2 items-center ${user.emailComercial === "" ? "hidden" : ""}`}><strong>Email Comercial:</strong> {user.emailComercial}</li>
              <li className={`flex gap-2 items-center ${user.registroMapa === "" ? "hidden" : ""}`}><strong>Registro MAPA:</strong> {user.registroMapa}</li>
            </ul>
            <p className='text-cinza text-xs sm:text-sm'>Membro desde 2025</p>
          </div>

          <Link className="rounded-lg hover:bg-[#5095ca] hover:scale-[102%] transition-all   bg-azul px-4 py-3 h-[40px] w-[160px] font-bold text-white flex text-[15px] justify-between items-center absolute right-4 top-4"
            href={`/config`}>
            Editar perfil
            <Image src={editarAzul} alt='send icon' />
          </Link>
        </div>
      </section>

      {/* Resumo Cards */}
      <div className='flex flex-col sm:flex-row gap-4 sm:gap-6'>
        <ResumoCard label="Total de Ofertas" value={ofertas.length} icon={squareAz} />
        <ResumoCard label="Ofertas Inativas" value={inativas.length} icon={squareCi} />
        <ResumoCard label="Ofertas Ativas" value={ativas.length} icon={squareLa} />
      </div>

      {/* Lista de Ofertas */}
      <section className="bg-white pt-6 px-4 pb-4 border border-cinza-forelight rounded-lg">
        <h2 className="text-lg sm:text-[20px] font-bold text-preto mb-4">Minhas Ofertas</h2>
        <div className='bg-[#F3F5F5] flex rounded-sm mb-4'>
          <button
            className={`flex py-1.5 justify-center flex-1 items-center cursor-pointer text-sm sm:text-base ${display === "ativa" ? "bg-white border border-cinza-forelight rounded-sm" : ""}`}
            onClick={() => setDisplay("ativa")}
          >
            Ativas ({ativas.length})
          </button>
          <button
            className={`flex py-1.5 justify-center items-center flex-1 cursor-pointer text-sm sm:text-base ${display === "inativa" ? "bg-white border border-cinza-forelight rounded-sm" : ""}`}
            onClick={() => setDisplay("inativa")}
          >
            Inativas ({inativas.length})
          </button>
        </div>

        {ofertasExibidas.length === 0 && (
          <p className="text-cinza">Nenhuma oferta {display} disponível.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ofertasExibidas.map(oferta => (
            <div key={oferta.id} className="p-4 sm:p-6 relative rounded-lg border border-cinza-forelight flex flex-col gap-3 hover:scale-[101%] transition-all">
              <p className="text-preto font-bold text-base sm:text-[18px]">{oferta.title}</p>
              <Tags ofertType={oferta.ofertaType} productType={oferta.productType} fruta={frutasMap[oferta.fruta]} bg />
              <div className="flex mt-1 flex-col gap-1">
                <div className="text-lg sm:text-[20px] font-bold text-preto-forelight">
                  {oferta.price !== 0 ? oferta.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : "Negociar"}
                  <p className="text-[16px] font-medium">
                      Quantidade: <strong>{oferta.quantity}kg</strong>
                  </p>
                </div>
                <p className="text-xs sm:text-[14px] text-cinza">
                  Expira em {Math.ceil((new Date(oferta.finalDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))} dias
                </p>
              </div>
              <p className='text-xs sm:text-[14px] text-preto-forelight line-clamp-2 mb-[44px]'>{oferta.description}</p>
              <Link className='text-preto absolute bottom-6 left-6 font-bold text-sm' href={`/oferta/${oferta.id}`}>Ver detalhes</Link>
              <div className='flex gap-2 sm:gap-3 absolute bottom-5 right-5'>
                <Link className="hover:scale-105 transition-all rounded-lg border border-cinza-forelight w-[90px] sm:w-[90px] px-2.5 h-[30px] sm:h-[33px] text-xs sm:text-[15px] font-bold text-preto-forelight flex justify-between items-center" href={`/oferta/editar/${oferta.id}`}>
                  Editar<Image src={editar} alt='send icon' />
                </Link>
                <button
                  onClick={() => { setOfertaSelecionada(oferta); setShowModal(true); }}
                  className='cursor-pointer hover:scale-105 transition-all rounded-lg border-erro border w-[35px] sm:w-[40px] h-[30px] sm:h-[33px] flex justify-center items-center'
                >
                  <Image src={fechar} alt='x icon' />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      {showModal && ofertaSelecionada && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 px-4">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md w-full max-w-md text-center">
            <h2 className="text-lg sm:text-[20px] font-bold text-preto mb-4">Confirmar exclusão</h2>
            <p className='mb-6'>Tem certeza que deseja excluir a oferta <strong>{ofertaSelecionada.title}</strong>?</p>
            <div className='flex flex-col sm:flex-row justify-end gap-4'>
              <button onClick={() => setShowModal(false)} className='px-4 py-2 border cursor-pointer border-cinza-forelight rounded hover:bg-cinza-forelight transition'>
                Cancelar
              </button>
              <button onClick={deletarOferta} className='px-4 py-2 bg-erro cursor-pointer text-white rounded hover:brightness-110 transition'>
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ResumoCard({ label, value, icon }: { label: string, value: number, icon: any }) {
  return (
    <section className='flex justify-center items-center flex-col flex-1 bg-white rounded-lg border border-cinza-forelight py-4 gap-1 text-center'>
      <Image src={icon} alt={`Icone ${label}`} />
      <p className='font-bold text-preto text-lg sm:text-[18px]'>{value}</p>
      <p className='text-cinza text-sm sm:text-base'>{label}</p>
    </section>
  );
}
