import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function proxy(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    console.log("Session:", session);

    const isOnRoot = request.nextUrl.pathname === "/";

    if (session && isOnRoot) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (!session && !isOnRoot) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/dashboard/:path*"],
};