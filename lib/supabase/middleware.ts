import { createServerClient } from '@supabase/ssr'
import { User } from '@supabase/supabase-js'
import { NextResponse, type NextRequest } from 'next/server'

type UserInfo = {
    id: string
    email: string
    first_name: string
    last_name: string
    phone_number: string
    image: string
    role: string

}

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
                    supabaseResponse = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    // refreshing the auth token
    const { data: user } = await supabase.auth.getUser()
    const currentUser = user.user as User

    console.log("currentUser: ", currentUser);


    if (currentUser && request.nextUrl.pathname.includes('sign-in') || currentUser && request.nextUrl.pathname.includes('sign-up')) {
        return NextResponse.redirect(new URL('/', request.url))
    }
    // if (currentUser === null && request.nextUrl.pathname === '/') {
    //     return NextResponse.redirect(new URL('/auth/sign-in', request.url))
    // }




    if (currentUser !== null) {
        const { data: userInfo } = await supabase.from("user").select("*").eq("id", currentUser?.id)
        const userInfoData = userInfo as UserInfo[]
        const isNotAdmin = userInfoData[0].role !== "admin"
        if (isNotAdmin && request.nextUrl.pathname === '/') {
            return NextResponse.redirect(new URL('/Unauthorized', request.url))
        }
    }



    return supabaseResponse
}

