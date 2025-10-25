import { es } from '../translations/es';

export const localeOptions = ['en', 'es'] as const;
export type LocaleOption = (typeof localeOptions)[number];

export type LocaleMessages = keyof typeof es;

export const DEFAULT_LOCALE: LocaleOption = 'es';
