
import { getBankById } from "@/actions/bank/getBankById";
import DeleteBankClient from "./deleteBankClient";


const DeleteBank =async ({params}:{params:{bankId:string}}) => {
 const bank=await getBankById(params.bankId);
 
  return (<DeleteBankClient bank={bank}/>
  )
}

export default DeleteBank