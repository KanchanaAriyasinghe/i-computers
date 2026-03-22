import {createClient} from "@supabase/supabase-js"

let url = "https://yepbgwccckbxgdmsgxlf.supabase.co"
let key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InllcGJnd2NjY2tieGdkbXNneGxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0MTA4NDYsImV4cCI6MjA4ODk4Njg0Nn0.eqz0Gv8vzRpkIS3oCK-BggrBtcvdriO45ewUrAUF9ow"

const supabase = createClient(url, key)

export default function UploadMedia(file){
    return new Promise ((resolve, reject)=>{
            if(file==null){
                reject("No file rejected.")
            }else{
                const timeStamp = new Date().getTime()
                const fileName = timeStamp + "_" + file.fileName

                supabase.storage.from("images").upload(fileName, file, {
                    upsert: false,
                    cacheControl: "3600",
                }).then(()=>{
                    
                    const publicUrl = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl
                    resolve(publicUrl)
                    
                }).catch((error)=>{
                    reject(error)
                })

            }
            
        })
    
}