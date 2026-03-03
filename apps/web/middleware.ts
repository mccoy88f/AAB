import createMiddleware from 'next-intl/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { i18nConfig } from '@aab/i18n'

const intlMiddleware = createMiddleware({
  locales: i18nConfig.locales,
  defaultLocale: i18nConfig.defaultLocale,
})

const PUBLIC_PATHS = ['/login', '/register']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isPublic = PUBLIC_PATHS.some((p) => pathname.includes(p))
  const response = intlMiddleware(request)
  if (!isPublic && !request.cookies.get('aab_token')) {
    const locale = request.cookies.get('NEXT_LOCALE')?.value ?? i18nConfig.defaultLocale
    return NextResponse.redirect(new URL(`/${locale}/login`, request.url))
  }
  return response
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
