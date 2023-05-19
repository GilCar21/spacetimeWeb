import { getUser } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";

export default function Profile(){

  const { name, avatarUrl } = getUser()
return(
  <div
      className="flex itens-center gap-3 text-left"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400">
        <Image src={avatarUrl} alt="avatar" width={40} height={40} className="rounded-full" />
      </div>
      <p className="text-sm leading-snug max-w-[140px]">
        {name}
        <a href="/api/auth/logout" className="block text-red-400 hover:text-red-300">sair</a>
      </p>
    </div>
)
  
}