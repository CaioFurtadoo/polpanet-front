'use client';

import Image from "next/image";
import info from "@/assets/icons/annotation-information.svg";
import send from "@/assets/icons/send-01.svg";
import calendar from "@/assets/icons/calendar-01.svg";
import { GeneralInput } from "@/components/Inputs/GeneralInput";
import { useEffect, useState } from "react";
import arrowLeft from "@/assets/icons/arrow-left.svg";
import Link from "next/link";
import CustomCheckbox from "@/components/Inputs/CustomCheckbox";
import { GeneralSelect } from "@/components/Inputs/GeneralSelect";
import { IconInput } from "@/components/Inputs/IconInput";
import { TextAreaInput } from "@/components/Inputs/TextAreaInput";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

export default function Editar() {
  const router = useRouter();
  const { id } = useParams();

  const [titulo, setTitulo] = useState('');
  const [fruta, setFruta] = useState('');
  const [tipoOferta, setTipoOferta] = useState('');
  const [tipoProduto, setTipoProduto] = useState('');
  const [possuiCorante, setPossuiCorante] = useState(false);
  const [corante, setCorante] = useState('');
  const [embalagem, setEmbalagem] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [semente, setSemente] = useState(false);
  const [acidoCitrico, setAcidoCitrico] = useState(false);
  const [benzoatoDeSodio, setBenzoatoDeSodio] = useState(false);
  const [sorbatoDePotassio, setSorbatoDePotassio] = useState(false);
  const [metabissulfitoDeSodio, setMetabissulfitoDeSodio] = useState(false);
  const [preco, setPreco] = useState('');
  const [descricao, setDescricao] = useState('');
  const [quantity, setQuantity] = useState('');

  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formErrors, setFormErrors] = useState({
  titulo: '',
  tipoOferta: '',
  tipoProduto: '',
  fruta: '',
  descricao: '',
  dataInicio: '',
  dataFim: '',
  preco: '',
});


  const frutaMap: Record<string, number> = {
  "Abacaxi": 1,
  "Goiaba": 2,
  "Umbu": 3,
  "Tangerina": 4,
  "Açaí": 5,
  "Graviola": 6,
  "Uva": 7,
  "Bacuri": 8,
  "Acerola": 9,
  "Maracujá": 10,
  "Tamarindo": 11,
  "UmbuCajá": 12,
  "Manga": 13,
  "Morango": 14,
  "Laranja": 15,
  "Cajá": 16,
  "Cupuaçu": 17,
  "Mangaba": 18,
  "Limão": 19,
  "Caju": 20,
  "Jaca": 21,
  "Outro": 22
  };

  const embalagemMap: Record<string, number> = {
    "Tambor": 1,
    "Balde": 2,
    "Caixa": 3,
    "Bag": 4,
    "Outro": 5
  };

const frutaOptions = Object.entries(frutaMap).map(([key, value]) => ({
  value: key,
  label: key,
}));

  const toggleCheckbox = (
    value: string,
    setter: (v: string) => void,
    current: string
  ) => {
    if (value === current) setter('');
    else setter(value);
  };

  const embalagemOptions = () => {
    if (tipoProduto === "Polpa") {
      return [
        { value: "Tambor", label: "Tambor" },
        { value: "Balde", label: "Balde" },
        { value: "Outro", label: "Outro" }
      ];
    } else if (tipoProduto === "Fruta") {
      return [
        { value: "Caixa", label: "Caixa" },
        { value: "Bag", label: "Bag" },
        { value: "Outro", label: "Outro" }
      ];
    } else {
      return [];
    }
  };


  useEffect(() => {
    async function fetchOferta() {
      const token = localStorage.getItem("token") || "";
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/oferta/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      setTitulo(data.title || '');
      setFruta(Object.keys(frutaMap).find(key => frutaMap[key] === data.fruta) || '');
      setTipoProduto(data.productType === 0 ? 'Fruta' : 'Polpa');
      setTipoOferta(data.ofertaType === 0 ? 'Venda' : 'Compra');
      setPreco(data.price?.toString() || '');
      setDescricao(data.description || '');
      setCorante(data.corante || '');
      setPossuiCorante(!!data.corante);
      setDataInicio(data.initDate?.split('T')[0] || '');
      setDataFim(data.finalDate?.split('T')[0] || '');
      setSemente(data.semente);
      setAcidoCitrico(data.acidoCitrico);
      setBenzoatoDeSodio(data.benzoatoDeSodio);
      setSorbatoDePotassio(data.sorbatoDePotassio);
      setMetabissulfitoDeSodio(data.metabissulfitoDeSodio);
      setEmbalagem(Object.keys(embalagemMap).find(k => embalagemMap[k] === data.embalagem) || '');
      setQuantity(data.quantity?.toString() || '');
    }
    if (id) fetchOferta();
  }, [id]);

  async function handleSubmit() {
  setIsSubmitting(true);
  setErrors([]);
  const newErrors: typeof formErrors = {
    titulo: '',
    tipoOferta: '',
    tipoProduto: '',
    descricao: '',
    fruta: '',
    dataInicio: '',
    dataFim: '',
    preco: '',
  };

  // Validações locais
  if (!titulo.trim()) newErrors.titulo = 'O título é obrigatório.';
  if (!descricao.trim()) newErrors.descricao = 'A descrição é obrigatório.';
  if (!tipoOferta) newErrors.tipoOferta = 'Selecione o tipo de oferta.';
  if (!tipoProduto) newErrors.tipoProduto = 'Selecione o tipo de produto.';
  if (!fruta) newErrors.fruta = 'Selecione uma fruta.';
  if (!dataInicio) newErrors.dataInicio = 'Data de início é obrigatória.';
  if (!dataFim) newErrors.dataFim = 'Data de fim é obrigatória.';
  if (tipoOferta === "Venda" && (!preco || isNaN(Number(preco)))) {
    newErrors.preco = 'Informe um preço válido.';
  }

  const hasError = Object.values(newErrors).some(e => e);
  if (hasError) {
    setFormErrors(newErrors);
    setIsSubmitting(false);
    return;
  }

  setFormErrors({ titulo: '', tipoOferta: '', tipoProduto: '', fruta: '', dataInicio: '', dataFim: '', preco: '', descricao: '' });

  const payload = {
    title: titulo,
    description: descricao,
    fruta: frutaMap[fruta] || 0,
    productType: tipoProduto === "Fruta" ? 0 : 1,
    semente,
    acidoCitrico,
    benzoatoDeSodio,
    sorbatoDePotassio,
    metabissulfitoDeSodio,
    corante: possuiCorante ? corante : "",
    embalagem: embalagemMap[embalagem] || 0,
    initDate: dataInicio,
    finalDate: dataFim,
    price: tipoOferta === "Venda" ? parseFloat(preco) || 0 : 0,
    ofertaType: tipoOferta === "Venda" ? 0 : 1,
    quantity: parseFloat(quantity)
  };

  try {
    const token = localStorage.getItem("token") || "";
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/oferta/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const data = await response.json();
      if (Array.isArray(data)) setErrors(data);
      else if (Array.isArray(data.errorMessage)) setErrors(data.errorMessage);
      else if (data.message) setErrors([data.message]);
      else setErrors(["Erro desconhecido ao criar oferta."]);
      setIsSubmitting(false);
      return;
    }

    router.push('/user')
  } catch (error) {
    setErrors(["Erro ao conectar com o servidor."]);
    setIsSubmitting(false);
  }
}



  return (
    <div className="max-xl:flex-col max-xl:gap-3 flex gap-[46px] w-full"> 
        <section 
        className="flex flex-1 flex-col gap-[18px] min-h-[650px] p-6 bg-white border border-cinza-forelight rounded-lg ">
        <div className="flex gap-4 font-bold text-[40px] text-preto-forelight shrink-0">
          <Link href="/" className="flex gap-3 items-center text-[14px] text-preto">
            <Image  src={arrowLeft} alt="arrow left icon" width={18} height={18} />
          </Link>
          Editar oferta
        </div>

        {errors.length > 0 && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            <ul className="list-disc list-inside">
              {errors.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        <GeneralInput
          placeholder="Digite o seu título"
          labelText="Título"
          forLabel="titulo"
          inputType="text"
          value={titulo}
          onChange={setTitulo}
          error={formErrors.titulo}
        />

        <div className="flex flex-col gap-2 text-preto text-[16px]">
          <strong className="text-preto-forelight text-[14px]">Tipo da oferta</strong>
          <div className="flex gap-6">
            {["Venda", "Compra"].map((tipo) => (
              <CustomCheckbox
                key={tipo}
                label={tipo}
                checked={tipoOferta === tipo}
                onChange={() => toggleCheckbox(tipo, setTipoOferta, tipoOferta)}
              />
            ))}
          </div>
          {formErrors.tipoOferta && <p className="text-erro  text-xs font-bold">{formErrors.tipoOferta}</p>}
        </div>

        <div className="flex max-[500px]:flex-wrap max-[500px]:gap-[18px] gap-[64px]">
            <div className="flex flex-col gap-2 w-full">
                <GeneralSelect
                    forLabel="tipoProduto"
                    labelText="Tipo de Produto"
                    value={tipoProduto}
                    onChange={setTipoProduto}
                    placeholder="Selecione o tipo"
                    options={[
                    { value: "Fruta", label: "Fruta" },
                    { value: "Polpa", label: "Polpa" },
                    ]}
                />
                {formErrors.tipoProduto && <p className="text-erro  text-xs font-bold">{formErrors.tipoProduto}</p>}
            </div>
            <div className="flex flex-col gap-2 w-full">
                <GeneralSelect
                    forLabel="fruta"
                    labelText="Nome da Fruta"
                    value={fruta}
                    onChange={setFruta}
                    placeholder="Selecione a fruta"
                    options={frutaOptions}
                />
                {formErrors.fruta && <p className="text-erro  text-xs font-bold">{formErrors.fruta}</p>}
            </div>
        </div>

        {tipoProduto === "Polpa" && (
          <div className="flex flex-col gap-3">
            <CustomCheckbox
              label="Possui corante?"
              checked={possuiCorante}
              onChange={() => setPossuiCorante((prev) => !prev)}
            />
            {possuiCorante && (
              <GeneralInput
                placeholder="Digite o corante"
                labelText="Corante"
                forLabel="corante"
                inputType="text"
                value={corante}
                onChange={setCorante}
              />
            )}
          </div>
        )}

        {tipoOferta === "Venda" && (
          <GeneralInput
            placeholder="Digite o preço da oferta"
            labelText="Preço"
            forLabel="preco"
            inputType="number"
            value={preco}
            onChange={setPreco}
            error={formErrors.preco}
          />
        )}

        <GeneralInput
          placeholder="Digite a quantidade total ou disponivel da oferta em quilograma"
          labelText="Quantidade em Kg"
          forLabel="quantity"
          inputType="number"
          value={quantity}
          onChange={setQuantity}
        />

        <div className="flex max-[677px]:gap-[18px] flex-wrap gap-[64px]">
          <div className="flex-1 flex-col gap-3">
            <IconInput
              forLabel="dataInicio"
              labelText="Data de Início"
              placeholder="Selecionar data"
              type="date"
              urlImage={calendar}
              altImage="calendar icon"
              value={dataInicio}
              onChange={setDataInicio}
            />
            {formErrors.dataInicio && <p className="text-erro mt-1.5 text-xs font-bold">{formErrors.dataInicio}</p>}
          </div>
          <div className="flex-1 flex-col gap-3">
            <IconInput
              forLabel="dataFim"
              labelText="Data de Fim"
              placeholder="Selecionar data"
              type="date"
              urlImage={calendar}
              altImage="calendar icon"
              value={dataFim}
              onChange={setDataFim}
            />
            {formErrors.dataFim && <p className="text-erro mt-1.5 text-xs font-bold">{formErrors.dataFim}</p>}
          </div>
        </div>

        {tipoProduto && (
          <GeneralSelect
            forLabel="embalagem"
            labelText="Tipo de Embalagem"
            value={embalagem}
            onChange={setEmbalagem}
            placeholder="Selecione a embalagem"
            options={embalagemOptions()}
          />
        )}

        {tipoProduto === "Polpa" && (
          <div className="flex flex-wrap gap-3">
            <CustomCheckbox
              label="Semente"
              checked={semente}
              onChange={() => setSemente((prev) => !prev)}
            />
            <CustomCheckbox
              label="Ácido Cítrico"
              checked={acidoCitrico}
              onChange={() => setAcidoCitrico((prev) => !prev)}
            />
            <CustomCheckbox
              label="Benzoato de Sódio"
              checked={benzoatoDeSodio}
              onChange={() => setBenzoatoDeSodio((prev) => !prev)}
            />
            <CustomCheckbox
              label="Sorbato de Potássio"
              checked={sorbatoDePotassio}
              onChange={() => setSorbatoDePotassio((prev) => !prev)}
            />
            <CustomCheckbox
              label="Metabissulfito de Sódio"
              checked={metabissulfitoDeSodio}
              onChange={() => setMetabissulfitoDeSodio((prev) => !prev)}
            />
          </div>
        )}
        
        <div className="flex flex-col gap-2">
          <TextAreaInput
            forLabel="descricao"
            labelText="Descrição"
            placeholder="Adicione uma descrição da sua oferta"
            value={descricao}
            onChange={setDescricao}
            rows={6}
          />
          {formErrors.descricao && <p className="text-erro text-xs font-bold">{formErrors.descricao}</p>}
        </div>
      </section>

      <div className="flex flex-col gap-8 w-[260px] min-w-0">
        <section className="p-3 max-xl:hidden bg-white border border-cinza-forelight rounded-lg font-bold text-preto flex-col gap-3 flex">
          <h1 className="py-1 border-b border-cinza-forelight">Pré-Visualização</h1>

          <div
            className={`m-3 p-3 flex flex-col gap-3 rounded-lg border ${
              tipoOferta === "Venda"
                ? "bg-azul-lighter-forelight border-azul-forelight"
                : tipoOferta === "Compra"
                ? "bg-[#f5eae2] border-laranja"
                : "bg-gray-100 border-gray-300"
            }`}
          >
            <ul className="flex gap-2 items-center">
              <li
                className={`flex gap-1 px-3 h-6 text-[14px] rounded-full items-center font-bold text-white ${
                  tipoOferta === "Venda"
                    ? "bg-azul-forelight"
                    : tipoOferta === "Compra"
                    ? "bg-laranja"
                    : "bg-preto-forelight"
                }`}
              >
                {tipoOferta || "Oferta"}
              </li>
            </ul>

            <h1 className="font-bold text-preto text-[14px]">
              {titulo || "Título da oferta"}
            </h1>

            <p className="flex items-center gap-1 text-[12px]">
              <Image alt="date icon" width={18} height={18} src={calendar} />
              Duração:{" "}
              <strong>
                {dataFim
                  ? `até ${dataFim.split("-").reverse().slice(0, 2).join("/")}`
                  : "até xx/xx"}
              </strong>
            </p>

            <p className="text-preto text-[20px] font-bold">
              {tipoOferta === "Venda" && preco
                ? `R$ ${parseFloat(preco).toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`
                : tipoOferta === "Compra"
                ? "Negociar"
                : "Preço"}
            </p>
          </div>
        </section>

        <section className="max-xl:hidden bg-white p-3 rounded-lg flex flex-col gap-3 border border-azul text-azul">
          <div className="flex items-center gap-2.5 text-[16px] font-bold">
            <Image src={info} alt="info icon" />
            Dicas
          </div>
          <ul className="p-3 flex flex-col gap-3 font-medium text-[14px] list-disc">
            <li>Seja específico na descrição para atrair mais interessados</li>
            <li>Defina um prazo realista para a oferta</li>
            <li>Inclua informações sobre qualidade e certificações</li>
            <li>Responda rapidamente às propostas recebidas</li>
          </ul>
        </section>

        <button
          disabled={isSubmitting}
          onClick={handleSubmit}
          className="hover:bg-[#5095ca] hover:scale-[102%] transition-all p-3 cursor-pointer rounded-lg flex justify-between items-center bg-azul font-bold text-white w-full disabled:opacity-50"
        >
          {isSubmitting ? "Enviando..." : "Editar oferta"}
          <Image src={send} width={24} height={24} alt="send icon" />
        </button>
      </div>
    </div>
  );
}
