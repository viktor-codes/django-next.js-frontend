import { deleteTokens } from "@/app/lib/auth";
import { NextResponse } from "next/server";

export async function POST(request) {
    const myTokenResponse = deleteTokens()
    console.log(myTokenResponse)
    return NextResponse({}, {status: 200})
}