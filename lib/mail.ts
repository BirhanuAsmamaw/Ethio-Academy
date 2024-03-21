import {Resend} from "resend";
const resend=new Resend(process.env.RESEND_API_KEY)
export const sendVerificationEmail=async(email:string,confirmLink:string)=>{
  await resend.emails.send({
    from:"onboarding@resend.dev",
    
    to:email,
    subject:`Confirm Verification Email`,
    html:`<p> Click <a href="${confirmLink}">here</a>to confirm email</p>`
  })

}
