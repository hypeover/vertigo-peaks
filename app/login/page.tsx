import React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import GoogleIcon from '@/components/icons/google-icon'

const Page = () => {
  return (
    <div className="h-screen w-screen justify-center items-center flex flex-col ">
      <Button variant="outline" className="flex justify-center items-center" ><GoogleIcon /> Sign up with Google</Button>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Welcome to Vertigo</CardTitle>
          <CardDescription>
            Upload your GPX routes and discover the peaks you conquered along the way
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="font-sans" >
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="flex flex-row gap-4" >
                <div className="grid gap-1 ">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" required />
              </div>
              <div className="grid gap-1">
                <div className="flex items-center">
                  <Label htmlFor="password">Confirm Password</Label>
                </div>
                <Input id="password" type="password" required />
              </div>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Login
          </Button>
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Page
