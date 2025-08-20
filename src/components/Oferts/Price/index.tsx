
interface propsPrice{
    price: number,
    ofertType: number,
    quantity?: number
}

export const Price: React.FC<propsPrice> = ({price, ofertType, quantity}) => {
    return(
    <div className="bg-azul-lighter-forelight rounded-[4px] px-2 py-1.5 text-[24px] font-bold">
        <p>
            {ofertType === 0
            ? `R$ ${price.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            })}`
            : "Negociar"}
            <strong className="text-[20px] font-medium">/kg</strong>
        </p>
        <p className="text-[16px] font-medium">
            Quantidade: <strong>{quantity}kg</strong>
        </p>
    </div>
    );
}