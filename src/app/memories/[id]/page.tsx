
'use client'
import { api } from '@/lib/api'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { UpdateMemoryForm } from '@/components/UpdateMemoryForm'
import { useEffect, useState } from 'react'
import Cookie from 'js-cookie'

dayjs.locale(ptBR)

interface Memory {
  id: string
  coverUrl: string
  content: string
  createdAt: string
}

export default function Home({ params }: { params: { id: string } }) {

  const { id } = params;
  const token = Cookie.get('token')

  const [isUpdate, setIsUpdate] = useState(false)
  const [memory, setMemory] = useState<Memory | null>(null)


  useEffect(()=>{
     api.get(`/memories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(response => setMemory(response.data))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  async function  deleteMemory(){
    await api.delete(`/memories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(()=> window.location.replace("/"))
  }

  function updateMemory(){
    setIsUpdate(true)
  }

  return (
    <div className="flex flex-col gap-10 p-8">
      <div className='w-full flex items-center justify-between '>
        <Link
          href="/"
          className="flex items-center gap-1 text-sm text-gray-200 hover:text-gray-100"
        >
          <ChevronLeft className="h-4 w-4" />
          voltar à timeline
        </Link>
        <div className='space-x-1'>
          <button onClick={updateMemory} className="inline-block rounded-full bg-red-300 px-3 py-2 font-alt text-[14px]  leading-none text-black hover:bg-red-400">
            editar memoria
          </button>
          <button onClick={deleteMemory} className="inline-block rounded-full bg-red-300 px-3 py-2 font-alt text-[14px]  leading-none text-black hover:bg-red-400">
            delete
          </button>
        </div>
      </div>
      
        {
          memory === null ?
          'Carregando...'
          :
          <>
            { isUpdate ?
              <UpdateMemoryForm idMemory={id} content={memory.content} image={memory.coverUrl}/>
              :
              <div className="space-y-4">
                <time className="-ml-8 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
                  {dayjs(memory.createdAt).format('D[ de ]MMMM[, ]YYYY')}
                </time>
                
                <Image
                  src={memory.coverUrl}
                  alt=""
                  width={592}
                  height={280}
                  className="aspect-video w-full rounded-lg object-cover"
                />
                <p className="text-lg leading-relaxed text-gray-100">
                  {memory.content}
                </p>
                
              </div>
          }
          </>
        }
    </div>
  )
}