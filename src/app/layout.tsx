import Profile from '@/components/Profile'
import './globals.css'
import { Roboto_Flex, Bai_Jamjuree } from 'next/font/google'
import SignIn from '@/components/SignIn'
import Hero from '@/components/Hero'
import { cookies } from 'next/headers'
import Copy from '@/components/Copy'

const roboto = Roboto_Flex({ subsets: ['latin'], variable: "--font-roboto" })
const bai = Bai_Jamjuree({ subsets: ['latin'], weight: "700", variable: "--font-bai" })

export const metadata = {
  title: 'Spacetime',
  description: 'Cápsula do tempo',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isCookies = cookies().has('token')
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${bai.variable} font-sans bg-gray-900 text-gray-100`}>
        <main className="grid grid-cols-2 min-h-screen">
      <div className="flex flex-col items-start justify-between px-28 py-16 relative overflow-hidden border-r border-white/10 bg-[url(../assets/estrelas.svg)] bg-cover">
        <div className="bg-backgroundImage-stripes absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 bg-purple-700 opacity-50 rounded-full blur-full" />
        <div className="absolute right-2 top-0 bottom-0 bg-stripes w-2  " />

        {/* conteudo */}
        {isCookies ? <Profile /> : <SignIn />}
        <Hero />
        <Copy />
      </div>
      <div className="flex flex-col overflow-y-scroll max-h-screen bg-[url(../assets/estrelas.svg)] bg-cover">
        {children}
      </div>
    </main>
      </body>
    </html>
  )
}
