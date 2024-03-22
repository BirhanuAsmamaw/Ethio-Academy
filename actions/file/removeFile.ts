"use server"

import { utapi } from "./uploadthingFile"

export async function RemoveFile(fileKey:string){
try{

  await utapi.deleteFiles(fileKey)

  return {
    success: true,
    message: "File removed successfully"
  }
}
catch(e){
  return {
    success:false,
    message:"Could not remove file"
  }
}
  

}