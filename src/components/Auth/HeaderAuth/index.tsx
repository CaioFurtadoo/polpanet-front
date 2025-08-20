import Image from 'next/image'
import logo from '@/assets/icons/logoAzul.svg'
import Link from 'next/link'
import polpaNet from "@/assets/icons/Polpa Net(1).svg";

export const HeaderAuth = () => {
    return(
        <header className='sticky bg-white z-20 p-6'>
          <nav className='flex justify-between max-sm:scale-[90%]'>
            <ul className='flex gap-14 items-center'>
              <Link className="flex gap-3.5 items-center" href="/">
                {/* <Image width={36} height={52} src={logo} alt="logo icon" /> */}
                <Image src={polpaNet} alt="logo icon" />
              </Link>
            </ul>
            <ul className='flex gap-6 items-center'>
              <li className='font-medium'><Link href="/login">Entrar</Link></li>
              <li className='py-2 px-3.5 font-bold bg-azul text-white rounded-[50px]'><Link href="/register">Registrar</Link></li>
            </ul>
          </nav>
        </header>
    )
}