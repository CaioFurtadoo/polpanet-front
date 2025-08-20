'use client';

import { useEffect, useState } from "react";
import company from "@/assets/icons/hotel-line.svg";
import Image from "next/image";
import Link from "next/link";

export const CompanyNameTag = () => {
  const [companyName, setCompanyName] = useState<string>("");

  useEffect(() => {
    const storedCompany = localStorage.getItem("companyName");
    if (storedCompany) {
      setCompanyName(storedCompany);
    }
  }, []);

  return (
    <Link href="/user" className="flex items-center gap-2.5 font-bold text-preto-forelight text-[16px]">
      <Image width={16} height={16} src={company} alt="company icon" />
      {companyName || "Empresa"}
    </Link>
  );
};
