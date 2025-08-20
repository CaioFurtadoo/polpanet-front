import Image from 'next/image'
import logoBranca from '@/assets/icons/logoBranca.svg'

export const BannerAuth = () => {
    return(
        <div className='relative max-[1400px]:hidden min-w-[572px] bg-gradient-to-r from-azul to-azul-forelight overflow-hidden shadow-[inset_0_0_25px_rgba(0,0,0,0.50)]'>
            <Image
                src={logoBranca}
                alt='Logo 1'
                width={474}
                height={632}
                className=' absolute top-[13px] left-[5px]'
            />
            <Image
                src={logoBranca}
                alt='Logo 1'
                width={280}
                height={373}
                className=' absolute top-[334px] right-[-161px]'
            />
            <Image
                src={logoBranca}
                alt='Logo 1'
                width={474}
                height={632}
                className=' absolute top-[-480px] left-[-107px] rotate-180'
            />
            <Image
                src={logoBranca}
                alt='Logo 1'
                width={385}
                height={513}
                className=' absolute top-[660px] left-[5px] rotate-180'
            />
            <Image
                src={logoBranca}
                alt='Logo 1'
                width={318}
                height={424}
                className=' absolute top-[692px] right-[-190px] rotate-[-90deg]'
            />
            <Image
                src={logoBranca}
                alt='Logo 1'
                width={474}
                height={632}
                className=' absolute top-[-327px] right-[-281px] rotate-y-180'
            />
                     <Image
                src={logoBranca}
                alt='Logo 1'
                width={474}
                height={632}
                className=' absolute top-[1100px] left-[5px]'
            />
        </div>
    );
}