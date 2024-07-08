"use server"

import { NextResponse } from "next/server"
import { cookies } from "next/headers";


const DJANGO_API_LOGIN_URL = "http://localhost:8001/api/token/pair"
export async function POST(request) {

    const myAuthToken = cookies().get("auth-token")
    console.log(myAuthToken)

    const requestData = await request.json()
    const jsonData = JSON.stringify(requestData)
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: jsonData
    }
    const response = await fetch(DJANGO_API_LOGIN_URL, requestOptions);
    const responseData = await response.json();

        if (response.ok) {
            const authToken = responseData.access;
            cookies(request.headers).set({
                name: "auth-token",
                value: authToken,
                httpOnly: true,
                sameSite: "strict",
                secure: process.env.NODE_ENV !== "development",
                maxAge: 3600,
            });
    }
    
    return NextResponse.json({message: "Hello"}, {status: 200})
}