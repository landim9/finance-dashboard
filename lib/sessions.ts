import * as jose from 'jose'
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { redirect } from "next/navigation";

const secret = new TextEncoder().encode(process.env.SESSION_SECRET!)

export async function criarSessao(usuarioId:string) : Promise<string> {
    const token = await new jose.SignJWT({ usuarioId})
    .setProtectedHeader({ alg: 'HS256'})
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret)

    return token
    
}

export async function getUsuarioId(): Promise<string> {
    const cookieStore = await cookies();
    const token = cookieStore.get("sessao")?.value;
    if (!token) redirect("/login");

    const { payload } = await jwtVerify(token, secret);
    return (payload as { usuarioId: string }).usuarioId;
}

export async function verificarSessao(token: string): Promise<string |   null> {
    try{ 
        const { payload } = await jose.jwtVerify(token, secret)
        return payload.usuarioId as string
    } catch  {
        return null
    }    
}
    
