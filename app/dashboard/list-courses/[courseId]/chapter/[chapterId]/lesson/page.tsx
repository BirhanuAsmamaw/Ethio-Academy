"use client"
import Heading from "@/components/Heading/Heading";
import Button from "@/components/button/button";
import TextEditor from "@/components/editor/editor";
import FileInput from "@/components/input/fileInput";
import Input from "@/components/input/input";
import firebaseApp from "@/lib/firebasedb";
import axios from "axios";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler,  useForm } from "react-hook-form";
import toast from "react-hot-toast";
interface IParams{
  chapterId: string;
}
const Lesson = ({params}:{params:IParams}) => {
  const [image,setImage]=useState<File|null>(null)
  const [video,setVideo]=useState<File|null>(null)
  const [description, setDescription]=useState("")
  const [isLoading,setLoading]=useState(false);
  const [selectedImage, setSelectedImage] = useState<any>(null);
const [selectedVideo, setSelectedVideo] = useState<any>(null);
const [imageProgress, setImageProgress] = useState(0)
const [videoProgress, setVideoProgress] = useState(0)
  const {register,handleSubmit,setValue,formState:{errors}}=useForm<FieldValues>({
    defaultValues:{
      title:"",
      chapterId:params.chapterId
    }
  })

  useEffect(() =>{
    setValue('content',description)
    setValue("videoUrl",video);
  },[description,video]);





  const handleImageChange = useCallback((acceptedFiles:any)=> {
    setImage(acceptedFiles[0])
    setSelectedImage(acceptedFiles[0]);
   
  }, []) 



  const handleVideoChange = useCallback((acceptedFiles:any)=> {
    // Do something with the files
    setVideo(acceptedFiles[0])
    setSelectedVideo(acceptedFiles[0])
    
  }, []) 




  let imageCoverUrl:string="";
  let videoUrl:string="";



  const onSubmit:SubmitHandler<FieldValues>=async(data)=>{
    setLoading(true)
    const handleImageUpload = async() =>{
      try{
        const storage=getStorage(firebaseApp);
        if(video){
          const videoName=new Date().getTime()+"-"+video.name;
          const videoStorageRef=ref(storage,`lesson/videos/${videoName}`);
          const uploadTask=uploadBytesResumable(videoStorageRef,video);

          await new Promise<void>((resolve,reject)=>{
            uploadTask.on('state_changed',
            (snapshot)=>{
              const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100
            
              switch(snapshot.state){
                   case "paused":
                    
                     break;
                   case "running":
                    
                     break;
              }
            },
            (error)=>{
            
              reject(error);
            },
            ()=>{
              //succesful upload image
              getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
                videoUrl=downloadUrl
              
                resolve();
              }).catch((error)=>{
              
                reject(error);
              });
            }
  
            )
  
          })

        }


      if(image){
        const fileName=new Date().getTime()+"-"+image.name;

        const imageStorageRef=ref(storage,`lesson/cover/${fileName}`);
        const uploadTask=uploadBytesResumable(imageStorageRef,image);
        await new Promise<void>((resolve,reject)=>{
          uploadTask.on('state_changed',
          (snapshot)=>{
            const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100
           
            switch(snapshot.state){
                 case "paused":
                 
                   break;
                 case "running":
                  
                   break;
            }
          },
          (error)=>{
           
            reject(error);
          },
          ()=>{
            //succesful upload image
            getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
              imageCoverUrl=downloadUrl
             
              resolve();
            }).catch((error)=>{
              
              reject(error);
            });
          }

          )

        })

      }
    
    } catch(error) {

    }

    
    


  }
  await handleImageUpload();

  const lessonData={...data,videoThumbnail:imageCoverUrl,videoUrl:videoUrl}
  console.log("lessonData: " ,lessonData);
    axios.post('/api/lesson',lessonData).then(()=>{
      toast.success("Course created successfully")
    })
    .catch((error)=>{
      toast.error(error.message)
    
    }).finally(()=>{
      setLoading(false)
    });

  }



//on cancel file
const onCancelVideo = () => {
  setSelectedVideo(null);
};
const onCancelImage = () => {
  setSelectedImage(null);
};

  return ( <div className="min-h-screen flex flex-col items-center gap-6">
         <div className="w-full p-4">
          <Input 
          
          type={"text"} label={"title"} 
          register={register}
           errors={errors}
            id={"title"}/>
         </div>

         
         <div className="w-full  lg:w-8/12 flex flex-col gap-1 p-4">
          <Heading small title="Upload Video  Thumbnail"/>
            <FileInput
            file={selectedImage}
            fileType="image"
          onDrop={handleImageChange}
              register={register}
              id="videoThumbnail" 
              errors={errors}/>
        </div>


        <div className="w-full  lg:w-8/12 flex flex-col gap-1">
          <Heading small title="Upload  Video"/>
            <FileInput
            file={selectedVideo}
            fileType="video"
          onDrop={handleVideoChange}
              register={register}
              id="videoUrl" 
              errors={errors}          
          />
        </div>


         <div className="flex flex-col gap-1 p-4">
            <Heading small title="Write Lesson Content"/>
          <TextEditor value={description} setValue={setDescription}/>
          </div>

          <div className="w-full py-10 px-4 flex justify-end">
            <Button 
            isDisabled={isLoading}
            onClick={handleSubmit(onSubmit)}
            title={isLoading ? "Loading..." : "Submit"}
            />
          </div>

  </div> );
}
 
export default Lesson;