import Image from "next/image";
import company from "@/assets/icons/hotel-line.svg"
import date from "@/assets/icons/calendar-01.svg"
import local from "@/assets/icons/marker-02.svg"
import Link from "next/link";
import { Price } from "../Oferts/Price";
import { Tags } from "../Oferts/Tags";


interface cardProps {
    ofertType: number,
    productType: number,
    fruta: string,
    title: string,
    companyName: string,
    startDay: number,
    description: string,
    id: number,
    userId: number,
    price: number,
    finalDate: string,
    localidade: string,
    quantity: number
}

export const OfertCard: React.FC<cardProps> = ({ofertType, productType, fruta, title, companyName, startDay, description, id, userId, price, finalDate, localidade, quantity}) => {
    return (
        <div className="flex w-full border-cinza-forelight border-[1px] overflow-hidden rounded-lg text-preto-forelight">
            <div className={`bg-azul w-[12px] ${ofertType == 0 ? "bg-azul-forelight" : "bg-laranja"}`}></div>
            <div className="px-3 py-6 flex gap-3 w-full bg-white">
                <div className="flex flex-col gap-2.5 flex-1 min-w-0">
                    <Tags fruta={fruta} productType={productType} ofertType={ofertType}/>
                    <h1 className="font-bold max-[720px]:text-[20px] max-[500px]:text-[19px] text-[24px] text-preto">{title}</h1>
                    <ul className="flex gap-6 items-center font-medium text-[14px] max-xl:flex-col max-xl:gap-1.5 max-xl:items-start">
                        <li className="min-xl:hidden bg-azul-lighter-forelight p-1 px-2 rounded-lg text-[18px] min-[720px]:text-[20px] font-bold">
                            <p>
                                {ofertType === 0
                                ? `R$ ${price.toLocaleString("pt-BR", {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}`
                                : "Negociar"}
                                <strong className="text-[18px] min-[720px]:text-[20px] font-medium">/kg</strong>
                            </p>
                            <p className="text-[15px] min-[720px]:text-[16px] font-medium">
                                Quantidade: <strong>{quantity}kg</strong>
                            </p>
                        </li>
                        <Link href={`/perfil/${userId}`} className="hover:text-black transition-all flex gap-1 items-center"><Image alt="company icon" src={company}></Image>{companyName}</Link>
                        <li className="flex gap-1 items-center"><Image alt="date icon" src={date}></Image>{startDay === 0 || -1 ? "Hoje" : startDay === 1 ? "Há 1 dia" :`Há ${startDay} dias`}, até {finalDate}</li>
                        <li className="flex gap-1 items-center"><Image alt="local icon" src={local}></Image>{localidade}</li>
                    </ul>
                    <div className="border-t-[1px] pb-2 pt-1.5 px-2 font-medium text-[14px] border-cinza-forelight">{description}</div>
                    <Link href={`oferta/${id}`} className="hover:translate-x-2 transition-all font-bold text-azul text-[14px]">Ver detalhes</Link>
                </div>
                <div className="flex max-xl:hidden flex-col justify-between text-preto-forelight shrink-0">
                    <ul className="flex flex-col  gap-2">
                        <li><Price ofertType={ofertType} price={price} quantity={quantity}></Price></li>
                        {/* <li className="flex items-center gap-1 text-[14px] whitespace-nowrap"><Image alt="date icon" width={24} height={24} src={date}></Image>Duração: <strong>até {finalDate}</strong></li> */}
                    </ul>
                    <Link className="rounded-lg hover:bg-[#5095ca] hover:scale-[102%] transition-all bg-azul px-3 py-2 font-bold text-white  flex justify-center items-center" href={`perfil/${userId}`}>Entrar em contato</Link>
                </div>
            </div>
        </div>
    );
}