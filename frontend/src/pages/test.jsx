/*import { useState } from "react"
import {createClient} from "@supabase/supabase-js"
import UploadMedia from "../utils/mediaUpload"

let url = "https://yepbgwccckbxgdmsgxlf.supabase.co"
let key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InllcGJnd2NjY2tieGdkbXNneGxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0MTA4NDYsImV4cCI6MjA4ODk4Njg0Nn0.eqz0Gv8vzRpkIS3oCK-BggrBtcvdriO45ewUrAUF9ow"

const supabase = createClient(url, key)

export default function TestPage(){
    //const [emotion , setEmotion] = useState("😄")
    const [file, setFile] = useState(null)

    async function handleUploadFile(){
        try{
            const url = await UploadMedia(file)
            console.log(url)
        }catch(error){
            console.log(error)
        }
        
    }
    return(
        /*<div className='w-full h-screen  flex flex-col justify-center items-center'>
            <div className="w-[300px] h-[300px] border-[6px]  flex flex-col justify-center items-center">
                {emotion}
            </div>
            <div className="w-[300px] flex flex-row justify-center">
                <button onClick={
                    ()=>{
                        setEmotion("😄")
                    }
                }
                className="bg-accent w-[70px] h-[30px] text-white border-[3px] border-primary">Happy</button>
                <button onClick={
                    ()=>{
                        setEmotion("😢")
                    }
                }
                className="bg-accent w-[70px] h-[30px] text-white border-[3px] border-primary">Sad</button>
                <button onClick={
                    ()=>{
                        setEmotion("😡")
                    }
                }
                className="bg-accent w-[70px] h-[30px] text-white border-[3px] border-primary">Angry</button>
            </div>
            
           
        </div>*/
        /*<div className="w-full h-screen flex justify-center items-center text-secondary flex-col">
            <input 
            onChange={(e)=>{
                setFile(e.target.files[0])
            }}
            type="file"/>
            <button onClick={handleUploadFile} className="bg-secondary text-primary px-4 py-1 rounded-[6px] mt-10">Upload</button>

        </div>
    )
}
*/

import { useState } from "react"
import { useRef } from "react"

export default function TestPage(){
    /* const videoRef = useRef(null)
    const [buttonText, setButtonText] = useState("play")
    return(
        <div className="flex items-center justify-center">
            <div className="w-[400px] h-[400px] bg-red-900 rounded-full rounded-tr-none border-12 overflow-hidden relative justify-center items-center flex">
                <video ref = {videoRef} autoPlay src="/demo.mp4" className="w-full h-full object-cover"/>
                <button 
                onClick={
                    ()=>{
                        if(videoRef.current.paused){
                            videoRef.current.play()
                            setButtonText("pause")
                        }else{
                            videoRef.current.pause()
                            setButtonText("play")
                        }
                    }
                }
                className="bg-sky-50 p-5 rounded-lg absolute">
                    {buttonText}
                </button>
            </div>
            

        </div>
    ) */
   return(
    <div className="bg-green-500 lg:bg-red-500 w-[300px] h-[300px]">

    </div>
   )
}