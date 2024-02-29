
interface LessonClientProps{
  lesson:any;
}
const LessonClient:React.FC<LessonClientProps> = ({lesson}) => {
  return ( <div className="flex flex-col   gap-20">
   <h1 className="text-lg md:xl lg:2xl font-medium md:font-semibold lg:font-bold">{lesson.title}</h1>

   <div>
    <video
        className="w-full h-auto max-w-full"
        controls
        poster={lesson.videoThumbnail || ''}
      >
        <source src={lesson.videoUrl || ''} type="video/mp4"  />
        Your browser does not support the video tag.
      </video></div>

<div className="">
      <div className="" dangerouslySetInnerHTML={{ __html: lesson.content}}></div>
      </div>

  </div> );
}
 
export default LessonClient;