"use client";

import { locales } from "@/i18n";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent } from "react";

export default function SwitchI18n({ lang }: { lang: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    const newPath = pathname.replace(`/${lang}`, `/${newLang}`);
    router.replace(newPath);
  };
  return (
    <select value={lang} onChange={handleChange}>
      {locales.map((locale) => (
        <option key={locale} value={locale}>
          {locale}
        </option>
      ))}
    </select>
  );
}
