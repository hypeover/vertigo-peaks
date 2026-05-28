"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import React, { useState } from "react"
import { authClient } from "@/lib/auth-client"
import { redirect } from "next/navigation"

const Page = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const register = async () => {
    const { data, error } = await authClient.signUp.email(
      {
        email: email,
        password: password,
        name: name,
        callbackURL: "/dashboard",
      },
      {
        onRequest: (ctx) => {
          //show loading
        },
        onSuccess: (ctx) => {
          redirect('/dashboard')
        },
        onError: (ctx) => {
          // display the error message
          alert(ctx.error.message)
          
        },
      }
    )
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex h-100 w-100 flex-col gap-2">
        <Input
          placeholder="name"
          type="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeholder="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={() => register()} >Go</Button>
      </div>
    </div>
  )
}

export default Page
