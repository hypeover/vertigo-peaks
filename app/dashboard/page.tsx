"use client"
import React, { useEffect } from "react"
import { authClient } from "@/lib/auth-client" // import the auth client
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

const Page = () => {
  const router = useRouter()



  return (
    <div>
      <Button
        onClick={async () => {
          await authClient.signOut({
            fetchOptions: {
              onSuccess: () => {
                router.push("/login")
              },
            },
          })
        }}
      >
        Logout
      </Button>
    </div>
  )
}

export default Page
