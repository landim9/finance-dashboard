import { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function getUserFromToken(req: NextRequest) {

    // Pegar token do cookie
    const token = req.cookies.get("sessao")?.value;

    if (!token) return null;

    try {
        const { payload} = await jwtVerify(token, secret);
        return payload as { usuarioId: string};
    } catch {
        return null;
    }
    
}