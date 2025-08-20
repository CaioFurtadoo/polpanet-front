import Image from "next/image";
import dolar from "@/assets/icons/currency-dollar.svg"
import packageBox from "@/assets/icons/package-01.svg"
import plant from "@/assets/icons/seedling-line.svg"

interface propsTags{
    ofertType: number,
    fruta: string,
    productType: number,
    bg?: boolean
}

export const Tags: React.FC<propsTags> = ({ofertType,fruta,productType,bg}) => {
    return (
        <ul className="flex gap-2 items-center">
            <li className={`hover:translate-y-[-3px] transition-all flex gap-1 px-3 h-6 text-[14px] rounded-full items-center font-bold text-white ${ofertType == 0 ? "bg-azul-forelight" : "bg-laranja"}`}><Image alt="dolar icon" src={dolar}></Image>{ofertType == 0 ? "Venda" : "Compra"}</li>
            <li className={`hover:translate-y-[-3px] transition-all rounded-full flex text-[14px] gap-1 px-3 h-6 items-center font-bold ${bg ? "bg-white text-preto-forelight border border-cinza-forelight" : "text-white bg-[#4C4850]"}  `}>{!bg && <Image alt="product icon" src={packageBox}></Image>}{productType == 0 ? "Fruta" : "Polpa"}</li>
            <li className={`hover:translate-y-[-3px] transition-all rounded-full flex text-[14px] gap-1 px-3 h-6 items-center font-bold ${bg ? "bg-white text-preto-forelight border border-cinza-forelight" : "text-white bg-[#67636B]"} `}>{!bg && <Image alt="plant icon" src={plant}></Image>}{fruta}</li>
        </ul>
    );
}