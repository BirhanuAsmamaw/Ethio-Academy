import {Resend} from "resend";
const resend=new Resend(process.env.RESEND_API_KEY)
export const sendVerificationEmail=async(email:string,confirmLink:string,name:string)=>{
  await resend.emails.send({
    from:"onboarding@resend.dev",
    
    to:email,
    subject:`Confirm Verification Email`,
    html:`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        .header {
            background-color: #007BFF;
            color: #ffffff;
            padding: 20px;
            text-align: center;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
        }
        .header h1 {
            margin: 0;
        }
        .content {
            padding: 20px;
        }

        .name{
         font-weight: bold;
         }
        .content p {
            font-size: 16px;
            color: #333333;
            line-height: 1.5;
        }
        .content a {
            color: #007BFF;
            text-decoration: none;
            font-weight: bold;
        }
        .footer {
            background-color: #f4f4f4;
            color: #666666;
            text-align: center;
            padding: 10px;
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Welcome to EthioAcademy</h1>
        </div>
        <div class="content">
            <p>Dear <span class="name">${name}</span>,</p>
            <p>Thank you for registering with EthioAcademy Online Learning Platform. To complete your registration, please confirm your email address by clicking the link below:</p>
            <p>Click <a href="${confirmLink}">here</a> to confirm email</p>
            <p>If you did not create an account with us, please disregard this email.</p>
            <p>Thank you,<br>The EthioAcademy Team</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 EthioAcademy. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`
  })

}
