import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {

    const token = request.cookies.get('sessao')?.value

    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*'] // aplica só nas rotas do dashboard
}