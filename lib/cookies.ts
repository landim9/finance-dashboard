import { cookies } from 'next/headers'
import { criarSessao, verificarSessao} from './sessions'

export async function salvarSessao(usuarioId:string) {
    const cookieStore = await cookies()
    const token = await criarSessao(usuarioId)
    cookieStore.set('sessao', token, {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60 *24 * 7
    })
}

export async function pegarUsuarioId(): Promise<string | null> {
    const cookieStore = await cookies()
    const token = cookieStore.get('sessao')?.value
    if (!token) return null
    return verificarSessao(token)
}

export async function deletarSessao() {
    const cookieStore = await cookies()
    cookieStore.delete('sessao')
}