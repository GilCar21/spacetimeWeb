'use client'

import { ChangeEvent, useState } from "react"

export default function MediaPickar(props: any){

  

  function onFileSelected(event:ChangeEvent<HTMLInputElement>){
    const { files } = event.target

    if(!files){
      return;
    }

    const previewURL = URL.createObjectURL(files[0])

    props.setPreview(previewURL)
  }

    return(
        <>
          <input type="file" id="media" className="invisible h-0 w-0"
          name="coverUrl"
          accept="image/*"
          onChange={onFileSelected}
        />

        {
          // eslint-disable-next-line @next/next/no-img-element
          props.preview && <img src={props.preview} alt="" className="w-full aspect-video object-cover" />
        }
        </>
    )
}