import Image from "next/image";
import logoLaranja from '@/assets/icons/logoLaranja.svg'
import logoAzul from '@/assets/icons/logoAzulLight.svg'

interface bannerProps{
    ofertType: number;
}

export const BannerOfert: React.FC<bannerProps> = ({ofertType}) => {
    return(
        <div className={`relative h-16 ${ofertType == 1 ? "bg-laranja" : "bg-azul-forelight"} overflow-hidden`}>
            <Image className='absolute rotate-[-90deg] left-[-50px] top-[-42px]' src={ofertType == 1 ? logoLaranja : logoAzul} alt='logo icon'></Image>
            <Image className='absolute left-[90px] top-[-42px]' src={ofertType == 1 ? logoLaranja : logoAzul} alt='logo icon'></Image>
            <Image className='absolute left-[210px] top-[-76px] rotate-180' width={164} height={216} src={ofertType == 1 ? logoLaranja : logoAzul} alt='logo icon'></Image>
            <Image className='absolute left-[389px] top-[-42px]' src={ofertType == 1 ? logoLaranja : logoAzul} alt='logo icon'></Image>
            <Image className='absolute left-[528px] top-[-76px] rotate-180' width={164} height={216} src={ofertType == 1 ? logoLaranja : logoAzul} alt='logo icon'></Image>
            <Image className='absolute left-[701px] top-[-52px]' width={129} height={174} src={ofertType == 1 ? logoLaranja : logoAzul} alt='logo icon'></Image>
            <Image className='absolute left-[845px] top-[-52px]' width={129} height={174} src={ofertType == 1 ? logoLaranja : logoAzul} alt='logo icon'></Image>
            <Image className='absolute rotate-[-90deg] left-[1010px] top-[-42px]' src={ofertType == 1 ? logoLaranja : logoAzul} alt='logo icon'></Image>
            <Image className='absolute left-[1160px] top-[-42px]' src={ofertType == 1 ? logoLaranja : logoAzul} alt='logo icon'></Image>
            <Image className='absolute left-[1280px] top-[-76px] rotate-180' width={164} height={216} src={ofertType == 1 ? logoLaranja : logoAzul} alt='logo icon'></Image>
            <Image className='absolute left-[1455px] top-[-42px]' src={ofertType == 1 ? logoLaranja : logoAzul} alt='logo icon'></Image>
            <Image className='absolute left-[1580px] top-[-76px] rotate-180' width={164} height={216} src={ofertType == 1 ? logoLaranja : logoAzul} alt='logo icon'></Image>
            <Image className='absolute left-[1720px] top-[-52px]' width={129} height={174} src={ofertType == 1 ? logoLaranja : logoAzul} alt='logo icon'></Image>
            <Image className='absolute left-[1900px] top-[-52px]' width={129} height={174} src={ofertType == 1 ? logoLaranja : logoAzul} alt='logo icon'></Image>
        </div>
    );
}