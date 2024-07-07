"use server"

import {cookies} from "next/headers"
import { NextResponse } from "next/server"

export async function Page(request) {
    return NextResponse.json({message: "Hello"}, {status: 200})
}