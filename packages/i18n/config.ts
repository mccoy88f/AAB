export const i18nConfig = {
  defaultLocale: 'it',
  locales: ['it', 'en'] as const,
  namespaces: ['common', 'auth'] as const,
}

export type Locale = typeof i18nConfig.locales[number]
export type Namespace = typeof i18nConfig.namespaces[number]
