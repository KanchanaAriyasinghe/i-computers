import { useState } from "react"

export default function TestPage(){
    const [emotion , setEmotion] = useState("😄")
    return(
        <div className='w-full h-screen  flex flex-col justify-center items-center'>
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
            
           
        </div>
    )
}
