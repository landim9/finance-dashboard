import { NextRequest, NextResponse } from 'next/server'
import { verificarSessao } from '@/lib/sessions'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('sessao')?.value

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  const usuarioId = await verificarSessao(token)

  if (!usuarioId) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*']
}