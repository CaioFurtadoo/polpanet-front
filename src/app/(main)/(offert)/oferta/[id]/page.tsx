'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Tags } from '@/components/Oferts/Tags';
import Link from 'next/link';
import Image from 'next/image';
import arrowLeft from '@/assets/icons/arrow-left.svg';
import { Price } from '@/components/Oferts/Price';
import dolar from '@/assets/icons/currency-dollar.svg';
import { BannerOfert } from '@/components/Oferts/BannerOfert';
import { frutasMap } from '@/utils/frutas'; 
import send from '@/assets/icons/send-01.svg'
import globe from "@/assets/icons/globe.svg";
import instagram from "@/assets/icons/instagram-line.svg";
import facebook from "@/assets/icons/facebook-line.svg";
import linkedin from "@/assets/icons/Linkedin.svg";
import local from "@/assets/icons/marker-02.svg"
import phone from "@/assets/icons/phone.svg"
import company from "@/assets/icons/hotel-lineWhite.svg"
import { LoadingSpinner } from '@/components/LoadingSpinner';

interface Oferta {
  id: number;
  title: string;
  description: string;
  fruta: number;
  productType: number;
  semente: boolean;
  acidoCitrico: boolean;
  benzoatoDeSodio: boolean;
  sorbatoDePotassio: boolean;
  metabissulfitoDeSodio: boolean;
  corante: string;
  embalagem: number;
  initDate: string;
  finalDate: string;
  price: number;
  ofertaType: number;
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
  quantity: number;
}

interface OfertaSimilar {
  id: number;
  title: string;
  description: string;
  fruta: number;
  productType: number;
  semente: boolean;
  acidoCitrico: boolean;
  benzoatoDeSodio: boolean;
  sorbatoDePotassio: boolean;
  metabissulfitoDeSodio: boolean;
  corante: string;
  embalagem: number;
  initDate: string;
  finalDate: string;
  price: number;
  ofertaType: number;
  userId: number;
  companyName: string;
}

export default function OfertaDetalhe() {
  const { id } = useParams();
  const [oferta, setOferta] = useState<Oferta | null>(null);
  const [loading, setLoading] = useState(true);
  const [similarOfertas, setSimilarOfertas] = useState<OfertaSimilar[]>([]);


  useEffect(() => {
    const fetchOferta = async () => {
      const token = localStorage.getItem('token');

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL === undefined ? "https://api.polpanet.com" : ""}/api/oferta/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          },
        });

        if (!res.ok) {
          console.error('Erro ao buscar oferta');
          return;
        }

        const data = await res.json();
        setOferta(data);
  fetchOfertasSemelhantes(data);
    } catch (error) {
      console.error('Erro:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOfertasSemelhantes = async (ofertaData: Oferta) => {
    const token = localStorage.getItem('token');

    try {
      const params = new URLSearchParams({
        Fruta: frutasMap[ofertaData.fruta],
        TipoOferta: ofertaData.ofertaType === 0 ? 'Venda' : 'Compra',
        TipoProduto: ofertaData.productType === 0 ? 'Fruta' : 'Polpa',
        Ordenacao: 'Recente',
      });

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL === undefined ? "https://api.polpanet.com" : ""}/api/oferta/activedate?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });

      if (!res.ok) {
        console.error('Erro ao buscar ofertas semelhantes');
        return;
      }

      const data = await res.json();
      setSimilarOfertas(data.ofertas.filter((o: Oferta) => o.id !== ofertaData.id));
    } catch (error) {
      console.error('Erro ao buscar similares:', error);
    }
  };

  if (id) fetchOferta();
}, [id]);

  if (loading) return <LoadingSpinner/>
  if (!oferta) return <p className="p-6 text-red-600">Oferta não encontrada.</p>;

    const initDateFormatted = new Date(oferta.initDate).toLocaleDateString('pt-BR');
    const finalDateFormatted = new Date(oferta.finalDate).toLocaleDateString('pt-BR');

  return (
    <div className='flex gap-6 max-[1000px]:flex-col'>
      <div className='flex-1 flex flex-col gap-6'>
        <section className='rounded-lg overflow-hidden border border-cinza-forelight'>
          <BannerOfert ofertType={oferta.ofertaType} />
          <div className='p-6 flex flex-col bg-white gap-3'>
            <div className='flex justify-between flex-wrap gap-4'>
              <div className='flex items-center gap-4'>
                <Link href="/"><Image src={arrowLeft} alt='arrow left icon' height={18} width={18} /></Link>
                <Tags fruta={frutasMap[oferta.fruta]} productType={oferta.productType} ofertType={oferta.ofertaType} />
              </div>
              <Price price={oferta.price} ofertType={oferta.ofertaType} quantity={oferta.quantity} />
            </div>
            <h1 className='text-[36px] font-bold text-preto'>{oferta.title}</h1>
            <p className='p-3 font-medium text-preto-forelight text-[14px] border-t-2 border-cinza-forelight'>{oferta.description}</p>

            <h1 className='font-bold'>Especificações Técnicas</h1>
            <ul className='flex flex-col'>
              <li className={`${oferta.semente ? "text-azul-forelight" : "text-cinza"} bg-azul-lighter-forelight p-1 font-medium flex justify-between`}><p className='text-preto-forelight'>Semente:</p>{oferta.semente ? 'Sim' : 'Não'}</li>
              <li className={`${oferta.metabissulfitoDeSodio ? "text-azul-forelight" : "text-cinza"} p-1 font-medium flex justify-between`}><p className='text-preto-forelight'>Metabissulfito de Sódio:</p>{oferta.metabissulfitoDeSodio ? 'Sim' : 'Não'}</li>
              <li className={`${oferta.acidoCitrico ? "text-azul-forelight" : "text-cinza"} bg-azul-lighter-forelight p-1 font-medium flex justify-between`}><p className='text-preto-forelight'>Ácido Cítrico:</p>{oferta.acidoCitrico ? 'Sim' : 'Não'}</li>
              <li className={`${oferta.benzoatoDeSodio ? "text-azul-forelight" : "text-cinza"} p-1 font-medium flex justify-between`}><p className='text-preto-forelight'>Benzoato de Sódio:</p>{oferta.benzoatoDeSodio ? 'Sim' : 'Não'}</li>
              <li className={`${oferta.sorbatoDePotassio ? "text-azul-forelight" : "text-cinza"} bg-azul-lighter-forelight p-1 font-medium flex justify-between`}><p className='text-preto-forelight'>Sorbato de Potássio:</p>{oferta.sorbatoDePotassio ? 'Sim' : 'Não'}</li>
              <li className={`${oferta.corante === "Sim" ? "text-azul-forelight" : "text-cinza"} bg-azul-lighter-forelight p-1 font-medium flex justify-between`}><p className='text-preto-forelight'>Corante:</p>{oferta.corante}</li>
              <li className={`text-azul bg-azul-lighter-forelight p-1 font-medium flex justify-between`}><p className='text-preto-forelight'>Embalagem:</p>{oferta.embalagem === 1 ? 'Tambor' : oferta.embalagem === 2 ? 'Balde' : oferta.embalagem === 3 ? 'Caixa' : oferta.embalagem === 4 ? 'Bag' : 'Outro' }</li>
            </ul>
          </div>
        </section>

        <section className='p-6 bg-white rounded-lg border border-cinza-forelight flex flex-col gap-2'>
        <h1 className='text-[20px] font-bold text-preto'>Ofertas Similares</h1>

        {similarOfertas.length === 0 && (
            <p className='text-cinza'>Nenhuma oferta similar encontrada.</p>
        )}

        {similarOfertas.map(similar => (
            <Link href={`${similar.id}`} key={similar.id} className='hover:bg-gray-100 hover:translate-x-2 transition-all p-3 border border-cinza-forelight items-center flex  max-[1000px]:flex-col rounded-lg justify-between max-[1000px]:items-start'>
            <ul className='flex max-[1000px]:items-start max-[1000px]:flex-col max-[1000px]:justify-start gap-3 items-center'>
                <li className={`flex w-[92px]  gap-1 items-center py-1 px-3 ${similar.ofertaType === 0 ? "bg-azul-forelight w-[92px]" : "bg-laranja w-[106px]"} rounded-full font-bold text-white`}>
                <Image src={dolar} alt='dolar icon' />{similar.ofertaType === 0 ? 'Venda' : 'Compra'}
                </li>
                <li className='flex flex-col'>
                <p className='text-preto text-[18px]'>{similar.title}</p>
                <p className='text-cinza text-[12px]'>{similar.companyName}</p>
                </li>
            </ul>
            <div className='flex flex-col text-right max-[1000px]:text-left'>
                <strong className='text-preto'>{similar.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong>
                <p className='text-cinza text-[12px]'>Expira em {Math.ceil((new Date(similar.finalDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))} dias</p>
            </div>
            </Link>
        ))}
        </section>

      </div>
      <div className='max-[1000px]:w-full flex flex-col w-[280px] gap-6'>
        <section className='p-4 bg-white border border-cinza-forelight rounded-lg'>
            <Link className="hover:bg-[#5095ca] hover:scale-[102%] transition-all rounded-lg bg-azul px-4 py-3 font-bold text-white flex text-[15px] justify-between items-center" href={`/perfil/${oferta.userId}`}>Entrar em contato<Image src={send} alt='send icon'></Image></Link>
        </section>
        <ul className='p-4 bg-white border text-[14px] font-medium border-cinza-forelight rounded-lg text-cinza flex flex-col gap-3'>
            <li className='text-[20px] py-2 font-bold text-preto border-b border-cinza-forelight'>Informações da Oferta</li>
            <li className='flex items-center justify-between'>Publicada em:<p className='text-preto'>{initDateFormatted}</p></li>
            <li className='flex items-center justify-between'>Expira em:<p className='text-preto'>{finalDateFormatted}</p></li>
            <li className='flex items-center justify-between'>Localização:<p className='text-preto'>{oferta.userAddress}</p></li>
        </ul>
        <section className='p-4 bg-white border border-cinza-forelight rounded-lg flex flex-col gap-3'>
            <h1 className='text-[20px] py-2 font-bold text-preto border-b border-cinza-forelight'>Informações da Empresa</h1>
            <div className='text-[12px]  font-medium text-preto-forelight'><p className='text-[16px] text-preto font-bold'>{oferta.userCompanyName}</p>{oferta.userDescription}</div>
            <ul className='text-[14px] py-3 font-medium text-preto-forelight flex flex-col gap-2 border-y border-cinza-forelight'>
                <li className={`flex gap-2 items-center`}><Image src={local} width={24} height={24} alt='address icon'></Image>{oferta.userAddress}</li>
                <li className={`flex gap-2 items-center ${oferta.userWebsiteUrl === "" ? "hidden" : ""}`}><Image src={globe} width={24} height={24} alt='website icon'></Image>{oferta.userWebsiteUrl}</li>
                <li className={`flex gap-2 items-center ${oferta.userInstagram === "" ? "hidden" : ""}`}><Image src={instagram} width={24} height={24} alt='instagram icon'></Image>{oferta.userInstagram}</li>
                <li className={`flex gap-2 items-center`}><Image src={phone} width={24} height={24} alt='phone icon'></Image>{oferta.userPhone}</li>
            </ul>
            <Link className="hover:bg-[#5095ca] hover:scale-[102%] transition-all rounded-lg bg-azul px-4 py-3 font-bold text-white flex text-[15px] justify-between items-center" href={`/perfil/${oferta.userId}`}>Ver Perfil Completo<Image src={company} width={24} height={24} alt='send icon'></Image></Link>
        </section>
      </div>
    </div>
  );
}
