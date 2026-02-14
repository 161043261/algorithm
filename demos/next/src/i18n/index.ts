// 支持的语言
export const locales = ["en", "zh", "ja"] as const;
// 默认语言
export const defaultLocale = "en";

export interface IResource {
  title: string;
  description: string;
  keywords: string;
}

export async function getResource(locale: string): Promise<IResource> {
  return import(`./${locale}.json`).then((module) => module.default);
}
