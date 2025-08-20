import Image from "next/image";
import boxLine from "@/assets/icons/login-box-line.svg"
import Link from "next/link";

interface LinkProps {
    firstText: string;
    secondText: string;
    linkTo: string;
}

export const LinkAuth: React.FC<LinkProps> = ({firstText, secondText, linkTo}) => {
    return(
        <div className="flex items-center gap-4 text-preto text-[14px] font-medium">
            {firstText}
            <Link href={linkTo} className="flex gap-2 items-center font-bold">
                <Image alt="link to icon" src={boxLine} width={24} height={24}></Image>
                <p>{secondText}</p>
            </Link>
        </div>
    );
}