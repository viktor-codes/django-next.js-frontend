"use client"

// import { cookies } from "next/headers"


const LOGIN_URL = "/api/login/"


export default function Page(){
    async function handleSubmit (event) {
        event.preventDefault()
        console.log(event, event.target)
        const formData = new FormData(event.target)
        const objectFromForm = Object.fromEntries(formData)
        const jsonData = JSON.stringify(objectFromForm)
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: jsonData
        }
        const response = await fetch(LOGIN_URL, requestOptions)
        let data = {}
        try {
          data = await response.json()
        } catch (error) {
          
        }
        // const data = await response.json()
        if (response.ok) {
            console.log("logged in")
        } else {
          console.log(await response.json())
        }
    }

    

    return (
        <div className="h-[95vh]">
            <div className="max-w-md mx-auto py-5">
                <h1>Login Here</h1>
                <form onSubmit={handleSubmit}>
                    <input className="text-black" type="text" name="username" 
                    placeholder="Your Username" required/>
                    <input className="text-black" type="password" name="password" 
                    placeholder="Your Password" required/>
                    <button type="submit">login</button>
                </form>
            </div>
        </div>
    )
}