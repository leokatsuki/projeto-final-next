import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(req) {
    const body = await req.json();
    const {name, email, password} = body.data;
    
    if(!name || !email || !password) {
        return new NextResponse("Esta faltando nome, email, ou senha", {status: 400})
    }

    const exist = await prisma.user.findUnique({
        where: {
            email: email,
        }
    })

    if (exist) {
        return new NextResponse("Usuario ja existe", {status: 400})
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            name,
            email,
            hashedPassword
        }
    })

    return NextResponse.json(user)
}