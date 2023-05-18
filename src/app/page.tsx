import Copy from "@/components/Copy";
import EmptyMemories from "@/components/EmptyMemories";
import Hero from "@/components/Hero";
import Profile from "@/components/Profile";
import SignIn from "@/components/SignIn";

import { cookies } from 'next/headers'
 
export default function Home() {

  const isCookies = cookies().has('token')

  return (
    <main className="grid grid-cols-2 min-h-screen">
      <div className="flex flex-col items-start justify-between px-28 py-16 relative overflow-hidden border-r border-white/10 bg-[url(../assets/estrelas.svg)] bg-cover">
        <div className="bg-backgroundImage-stripes absolute right-0 top-1/2 h-[288px] w-[526px] -translate-y-1/2 translate-x-1/2 bg-purple-700 opacity-50 rounded-full blur-full" />
        <div className="absolute right-2 top-0 bottom-0 bg-stripes w-2  " />

        {/* conteudo */}
        {isCookies ? <Profile /> : <SignIn />}
        <Hero />
        <Copy />
      </div>
      <div className="flex flex-col p-16 bg-[url(../assets/estrelas.svg)] bg-cover">
        <EmptyMemories />
      </div>
    </main>
  )
}