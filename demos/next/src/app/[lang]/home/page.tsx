import { getResource } from "@/i18n";
import SwitchI18n from "./switch-i18n";
export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const { title, description, keywords } = await getResource(lang);
  return (
    <>
      <SwitchI18n lang={lang} />
      <h1>{title}</h1>
      <p>{description}</p>
      <p>{keywords}</p>
    </>
  );
}
