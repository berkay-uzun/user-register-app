import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();

    console.log("API'ye gelen veri:", body);

    return NextResponse.json({ mesaj: "Kayıt başarılı", veri: body });
}