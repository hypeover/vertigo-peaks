import { authClient } from "@/lib/auth-client" // import the auth client
import { useRouter } from "next/router"
import { useEffect } from "react"

export const LogoutHandle = () => {
  const router = useRouter()

  useEffect(() => {
    const logout = async () => {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/login")
          },
        },
      })
    }

    logout() 
  }, [router]) 

  return null 
}
