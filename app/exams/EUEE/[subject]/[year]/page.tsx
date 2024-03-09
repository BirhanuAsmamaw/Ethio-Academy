import Navbar from "@/components/navbar/Navbar";
import EUEEYearExamsClientPage from "./yearClient";


const EUEEYearExamsPage = ({params}:{
  params:{
    subject:string,
    year:string
  }
}) => {
  

  return (<>
  <Navbar/>
  <EUEEYearExamsClientPage subject={params.subject} year={params.year}/>
  </>)
 
};

export default EUEEYearExamsPage;