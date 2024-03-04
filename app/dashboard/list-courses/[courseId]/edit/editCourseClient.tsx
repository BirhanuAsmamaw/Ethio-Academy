

"use client"
import Heading from "@/components/Heading/Heading";
import Button from "@/components/button/button";
import Container from "@/components/container/container";
import TextEditor from "@/components/editor/editor";
import FileInput from "@/components/input/fileInput";
import Input from "@/components/input/input";
import Select from "@/components/input/select";
import axios from "axios";
import {deleteObject, getDownloadURL,getStorage,ref,uploadBytesResumable} from 'firebase/storage'
import firebaseApp from "@/lib/firebasedb";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, useForm ,SubmitHandler} from "react-hook-form";
import toast from "react-hot-toast";



interface  EditCourseClientProps{
  course:any;
}

const EditCourseClient:React.FC<EditCourseClientProps>= ({course}) => {
const [requirement, setRequirement]=useState<string|null>(null)
const [description, setDescription]=useState<string|null>(null)
const [courseUsers, setCourseUsers]=useState<string|null>(null)
const [isnext, setIsNext]=useState(false)
const [image,setImage]=useState<File|null>(null)
const [video,setVideo]=useState<File|null>(null)
const [isLoading, setIsLoading]=useState(false)
const [selectedImage, setSelectedImage] = useState<any>('image');
const [selectedVideo, setSelectedVideo] = useState<any>('video');
const [imageProgress, setImageProgress] = useState(0)
const [videoProgress, setVideoProgress] = useState(0)
const [progress, setProgress] = useState(0)


  const {register,setValue,handleSubmit,getValues,formState:{errors}}=useForm<FieldValues>({
    defaultValues: {
     
      subject:course.subject,
      price:course.price,
      category:course.category,}})



 const courseData=getValues();


  useEffect(() =>{
    setValue('descriptions',description)
    setValue('requirements',requirement)
    setValue('whoShouldTake',courseUsers)
    setValue("cover",image);
    setValue("videoUrl",video);
  },[description,requirement,courseUsers,image,video]);





  const onNextButton=()=>{setIsNext((prev)=>!prev)}

  

  const handleImageChange = useCallback((acceptedFiles:any)=> {
    setImage(acceptedFiles[0])
    setSelectedImage(URL.createObjectURL(acceptedFiles[0]));
  }, []) 



  const handleVideoChange = useCallback((acceptedFiles:any)=> {
    // Do something with the files
    setVideo(acceptedFiles[0])
    setSelectedVideo(URL.createObjectURL(acceptedFiles[0]));
    // setValue('cover','cover')
  }, []) 




  let imageCoverUrl:string="";
  let videoUrl:string="";



  const onSubmit:SubmitHandler<FieldValues>=async(data)=>{
    setIsLoading(true)
    const storage=getStorage(firebaseApp);
    const handleImageUpload = async() =>{
      try{
       
        if(video){
          const existingVideoName = course.videoUrl.split('/').pop().split('?')[0];
         

          const videoName=new Date().getTime()+"-"+video.name;
          const videoStorageRef=ref(storage,`course/videos/${videoName}`);
          const uploadTask=uploadBytesResumable(videoStorageRef,video);

          await new Promise<void>((resolve,reject)=>{
            uploadTask.on('state_changed',
            (snapshot)=>{
              const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100
              setVideoProgress(progress)
            
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
              
              //succesful upload video
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


        const existingCoverName = course.cover.split('/').pop().split('?')[0];
        
         



        const fileName=new Date().getTime()+"-"+image.name;

        const imageStorageRef=ref(storage,`course/cover/${fileName}`);
        
        const uploadTask=uploadBytesResumable(imageStorageRef,image);


        await new Promise<void>((resolve,reject)=>{
          uploadTask.on('state_changed',
          (snapshot)=>{
            const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100
            setImageProgress(progress)
           
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
  const previousVideoRef = ref(storage, course.videoUrl);
  await deleteObject(previousVideoRef);
  const previousImageRef = ref(storage, course.cover);

  await deleteObject(previousImageRef);
  
  if(!imageCoverUrl || !videoUrl){
throw new Error("course cover and video not empty!!")
  }

  const courseData={...data,cover:imageCoverUrl,videoUrl:videoUrl}
    axios.put(`/api/course/${course.id}/update/content`,courseData).then(()=>{
      toast.success("Course updated successfully")
    })
    .catch((error)=>{
      console.log(error)
      toast.error(error.message)
    
    }).finally(()=>{
      setIsLoading(false)
    });

  }


//on cancel file
const onCancelVideo = () => {
  setSelectedVideo(null);
};
const onCancelImage = () => {
  setSelectedImage(null);
};



// set total progress
useEffect(()=>{
  setProgress(Math.floor((imageProgress+videoProgress)/2))
},[imageProgress,videoProgress]);

  
  return ( <div className="flex flex-col w-full  ">
   
    <div className="flex flex-col gap-10 w-full pb-6 mb-10">
      
      {!isnext&&<Container
      childern={
        <div className="flex flex-col gap-10 w-full  lg:mt-20   justify-center items-center p-2">
       <div className="py-5">
       <Heading title="Update Course"/>
       </div>
          <div className="w-full  lg:w-8/12">
            <Select
          defaultValue={ courseData.category? courseData.category:course.category}
          id="category"
          register={register}
          errors={errors}

          /></div>
          <div className="w-full  lg:w-8/12">
            <Input id="subject"  defaultValue={courseData.subject? courseData.subject:course.subject} register={register} errors={errors}  label="Subject" type="text" required/></div>



          <div className="w-full  lg:w-8/12 flex flex-col gap-1">
          <Heading small title="Upload Course Cover"/>
            <FileInput

            required
            onCancel={onCancelImage}
            file={selectedImage==='image'? course.cover:selectedImage}
            fileType="image"
          onDrop={handleImageChange}
              register={register}
              id="cover" 
              errors={errors}          
          />
        </div>


        <div className="w-full  lg:w-8/12 flex flex-col gap-1">
          <Heading small title="Upload Course Video"/>
            <FileInput
            required
            onCancel={onCancelVideo}
            file={selectedVideo==='video'? course.videoUrl:selectedVideo}
            fileType="video"
          onDrop={handleVideoChange}
              register={register}
              id="videoUrl" 
              errors={errors}          
          />
        </div>



        
        <div className="lg:w-8/12">
          <Input 
          defaultValue={`${courseData.price? courseData.price:course.price}`}
          register={register} errors={errors} label="Price" type="number" id="price" required/>
          </div>
          
         

       
        
          
          <div className="flex flex-col px-4 w-full gap-1 my-4">
            <Heading small title="Update Course Description"/>
       
          <TextEditor  value={description? description:course.descriptions} setValue={setDescription}/>
          </div>

          <div className="flex flex-col px-4 w-full gap-1 my-4">
            <Heading small title="Update Course Requiremnts"/>
          <TextEditor value={requirement? requirement:course.requirements} setValue={setRequirement}/>
          </div>
        

          <div className="flex flex-col px-4 w-full  gap-1  pt-2 my-4">
            <Heading small title="Update who use This Course"/>
          <TextEditor value={courseUsers? courseUsers:course.whoShouldTake} setValue={setCourseUsers}/>
          </div>

          <div className="p2 flex justify-end  mx-20 lg:p-20">
            <Button className="bg-teal-400 text-sm  hover:bg-teal-500"  onClick={onNextButton} title="Next"/>
          </div>
        </div>
      }
    />}

    {
      isnext&&<Container
      childern={
        <div className="flex flex-col gap-10 p-2">
 <Heading title={courseData?.subject}/>

 <div className="flex flex-col gap-2 p-2">
 <Heading title="About Course"/>
 <div className="pl-2" dangerouslySetInnerHTML={{ __html: courseData.descriptions }}></div>

 </div>

 
 <div className="flex flex-col gap-2 p-2">
 <Heading title="Course Requirement"/>
 <div className="pl-2" dangerouslySetInnerHTML={{ __html: courseData.requirements }}></div>

 </div>


 <div className="flex flex-col gap-2 p-2">
 <Heading title="Who Use This Course?"/>
 <div className="pl-2" dangerouslySetInnerHTML={{ __html: courseData.whoShouldTake}}></div>

 </div>

 <div className="p-4 flex justify-end  mx-20 lg:p-20">
<div className="flex gap-2">

<Button className="bg-teal-400 text-sm  hover:bg-teal-500"  onClick={onNextButton} title="Back"/>
<Button className="bg-teal-400 text-sm  hover:bg-teal-500"  onClick={handleSubmit(onSubmit)} title={isLoading? "Loading...":"Submit"}/>
</div> </div>


{isLoading&&<div className="p-4 w-full"><div className="flex justify-between mb-1">
  <span className="text-base font-medium text-blue-700 dark:text-white">Updating...</span>
  <span className="text-sm font-medium text-blue-700 dark:text-white">{progress}%</span>
</div>
<div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
</div></div>}


        </div>
      }
      />
    }



    </div>
  </div> );
}
 
export default EditCourseClient;