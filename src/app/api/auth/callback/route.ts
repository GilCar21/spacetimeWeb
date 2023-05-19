import { api } from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
  const { searchParams } = new URL(req.url)

  const redirectTo = req.cookies.get('redirectTo')?.value

  const  code  = searchParams.get('code')
  
  const registerResponse = await api.post('/register',{
    code,
  })

  const { token } = registerResponse.data

  const redirect = redirectTo ?? new URL('/', req.url)

  const cookieExpiresTnSeconds = 60*60*24*7

  return NextResponse.redirect(redirect, {
    headers: {
      'Set-Cookie': `token=${token}; Path=/; max-age=${cookieExpiresTnSeconds}`
    }
  })
}