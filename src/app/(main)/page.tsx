'use client';

import { useEffect, useState } from "react";
import { OfertCard } from "@/components/OfertCard";
import { frutasMap } from "@/utils/frutas";
import plus from "@/assets/icons/plus-03.svg";
import Image from "next/image";
import { OrdenacaoSelect } from "@/components/Inputs/OrdenacaoSelect";
import Link from "next/link";
import check from "@/assets/icons/check.png"
import CustomCheckbox from "@/components/Inputs/CustomCheckbox";
import filterIcon from "@/assets/icons/filter.svg"


const frutasEnum = {
  1: "Abacaxi",
  2: "Goiaba",
  3: "Umbu",
  4: "Tangerina",
  5: "Açaí",
  6: "Graviola",
  7: "Uva",
  8: "Bacuri",
  9: "Acerola",
  10: "Maracujá",
  11: "Tamarindo",
  12: "UmbuCajá",
  13: "Manga",
  14: "Morango",
  15: "Laranja",
  16: "Cajá",
  17: "Cupuaçu",
  18: "Mangaba",
  19: "Limão",
  20: "Caju",
  21: "Jaca",
  22: "Outro"
};

type ApiOferta = {
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
  userId: number;
  localidade: string;
  quantity: number;
};

export default function Home() {
  const [ofertas, setOfertas] = useState<ApiOferta[]>([]);
  const [ordenacao, setOrdenacao] = useState("recentes");
  const [fruta, setFruta] = useState("");
  const [tipoOferta, setTipoOferta] = useState("");
  const [tipoProduto, setTipoProduto] = useState("");
  const [loading, setLoading] = useState(true);
  const [showFilter, setShowFilter] = useState(false);

const fetchOfertas = async () => {
  const token = localStorage.getItem("token");
  if (!token) return;

  setLoading(true);
  const queryParams = new URLSearchParams({
    ordenacao,
    Fruta: fruta,
    TipoOferta: tipoOferta,
    TipoProduto: tipoProduto,
  });

  try {
    const response = await fetch(
      `http://72.60.49.135/api/oferta/activedate?${queryParams.toString()}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    const data = await response.json();
    setOfertas(data.ofertas || []);
  } catch (error) {
    console.error("Erro ao buscar ofertas:", error);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchOfertas();
  }, [ordenacao, fruta, tipoOferta, tipoProduto]);

  const calcularDiasPassados = (dataInicial: string) => {
    const init = new Date(dataInicial);
    const agora = new Date();
    return Math.floor((+agora - +init) / (1000 * 60 * 60 * 24));
  };

  const toggleCheckbox = (value: string, setter: (v: string) => void, current: string) => {
    if (value === current) setter("");
    else setter(value);
  };

  const limparFiltros = () => {
    setFruta("");
    setTipoOferta("");
    setTipoProduto("");
  };



  return (
    <div className="flex gap-6 w-full relative">
{showFilter && (
  <div
    className="fixed inset-0 bg-black/40 z-30 lg:hidden"
    onClick={() => setShowFilter(false)}
  />
)}

<section
  className={`${showFilter ? "block" : "max-lg:hidden"} fixed min-lg:static max-lg:top-0 max-lg:left-0 max-lg:h-full h-10 max-lg:bg-white max-lg:z-40 w-[200px] p-3 max-lg:pt-12`}
>
  <div className="flex-col flex gap-3 max-lg:relative">

  <button onClick={() => setShowFilter(false)} className="text-[20px] min-lg:hidden absolute top-[-35px] right-1 cursor-pointer">x</button>
  <Link
    className="hover:bg-[#5095ca] hover:scale-[102%] transition-all p-3 max-lg:hidden rounded-lg flex justify-between items-center bg-azul font-bold text-white w-full"
    href="oferta/create"
  >
    Nova oferta <Image src={plus} alt="plus icon" />
  </Link>

  <div className="flex flex-col gap-4 border-cinza-forelight border p-3 bg-white rounded-lg flex-1">
    <div className="flex justify-between font-bold py-1 border-b border-cinza-forelight text-preto">
      Filtros
      <button
        className=" text-azul text-[15px] cursor-pointer"
        onClick={limparFiltros}
      >
        Limpar
      </button>
    </div>

    <label className="text-preto-forelight text-[14px] font-bold flex flex-col gap-2">
      Fruta
      <select
        className="appearance-none border-cinza-forelight border font-medium rounded-lg text-preto-forelight pl-3 py-2"
        value={fruta}
        onChange={(e) => setFruta(e.target.value)}
      >
        <option value="">Todas</option>
        {Object.entries(frutasEnum).map(([key, name]) => (
          <option key={key} value={name}>
            {name}
          </option>
        ))}
      </select>
    </label>

    <div className="flex flex-col gap-3 text-preto text-[16px]">
      <strong className="text-preto-forelight text-[14px]">Tipo da oferta</strong>
      {["Venda", "Compra"].map((tipo) => (
        <CustomCheckbox
          key={tipo}
          label={tipo}
          checked={tipoOferta === tipo}
          onChange={() => toggleCheckbox(tipo, setTipoOferta, tipoOferta)}
        />
      ))}
    </div>

    <div className="flex flex-col gap-3 text-preto text-[16px] mt-4">
      <strong className="text-preto-forelight text-[14px]">Produto</strong>
      {["Fruta", "Polpa"].map((tipo) => (
        <CustomCheckbox
          key={tipo}
          label={tipo}
          checked={tipoProduto === tipo}
          onChange={() => toggleCheckbox(tipo, setTipoProduto, tipoProduto)}
        />
      ))}
    </div>

    <div className="border-t border-cinza-forelight w-full py-2">
      <button
        className="hover:bg-[#5095ca] hover:scale-[102%] transition-all bg-azul-forelight text-white w-full font-bold rounded-lg text-[14px] flex justify-center py-2"
        onClick={() => {
          fetchOfertas();
          setShowFilter(false);
        }}
      >
        Filtrar
      </button>
    </div>
  </div>

    <div className="max-lg:hidden flex flex-col gap-1 border-cinza-forelight border p-3 bg-white rounded-lg text-[12px] text-preto font-bold">
      <Link className="underline" href="user">Ver perfil</Link>
      <Link className="underline" href="config">Configurações</Link>
    </div>
    <p className="max-lg:hidden text-preto-forelight text-[12px] flex justify-center items-center">Elpídio Lunardelli © 2025</p>
  </div>
  </section>


<section className="flex flex-1 flex-col gap-4 min-w-0">
  <div className="flex lg:hidden justify-between items-center">
    <h1 className="font-bold text-[36px] text-preto-forelight">Ofertas</h1>
    <button className="flex items-center gap-2 px-2 py-1 bg-white border border-cinza-forelight rounded-lg" onClick={() => setShowFilter(!showFilter)}><Image src={filterIcon} alt="filter icon"></Image>Filtros</button>
  </div>
  <div className="flex gap-3 items-center">
    <h1 className="max-lg:hidden font-bold text-[36px] text-preto-forelight">Ofertas</h1>
    <div className="border-b border-cinza-forelight flex-1"></div>
    <OrdenacaoSelect value={ordenacao} onChange={setOrdenacao} />
  </div>

  <div
    className="overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-azul scrollbar-track-cinza-forelight"
    style={{ maxHeight: "calc(100vh - 250px)", minWidth: 0 }}
  >
    <div className="flex flex-col gap-4">
      {loading ? (
        <div className="flex justify-center items-center py-64">
          <div className="w-8 h-8 border-4 border-azul border-t-transparent rounded-full animate-spin" />
        </div>
      ) : ofertas.length > 0 ? (
        ofertas.map((oferta) => (
          <OfertCard
            key={oferta.id}
            id={oferta.id}
            userId={oferta.userId}
            price={oferta.price}
            finalDate={new Date(oferta.finalDate).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
            })}
            ofertType={oferta.ofertaType}
            productType={oferta.productType}
            fruta={frutasMap[oferta.fruta] ?? "Desconhecida"}
            title={oferta.title}
            companyName={oferta.companyName}
            startDay={calcularDiasPassados(oferta.initDate)}
            description={oferta.description}
            localidade={oferta.localidade}
            quantity={oferta.quantity}
          />
        ))
      ) : (
        <p className="text-center text-cinza-forelight text-sm">Nenhuma oferta encontrada.</p>
      )}
    </div>

  </div>
</section>

    </div>
  );
}
