
interface BannerProps {
  banner:any
}
const Banner:React.FC<BannerProps>  = ({banner}) => {
  return ( <div className="">
    <div className="flex flex-col gap-2">
      <p>{banner.title}</p>
      <p>{banner?.subtitle? banner?.subtitle:""}</p>
    </div>
  </div> );
}
 
export default Banner ;