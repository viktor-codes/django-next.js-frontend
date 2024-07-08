"use server"

import { NextResponse } from "next/server"
import { cookies } from "next/headers";
import { getToken, getRefreshToken, setRefreshToken, setToken } from "@/app/lib/auth";


const DJANGO_API_LOGIN_URL = "http://localhost:8001/api/token/pair"
export async function POST(request) {

    const myAuthToken = getToken()
    const myRefreshToken = getRefreshToken()
    console.log(myAuthToken, myRefreshToken)

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
            console.log("logged in")
            const {access, refresh} = responseData
            setToken(access)
            setRefreshToken(refresh)
    }
    
    return NextResponse.json({message: "Hello"}, {status: 200})
}