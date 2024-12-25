
const nodemailer = require('nodemailer');

const sendMail = async(options)=>{
 try {
    const transpoter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port : '465',
        secure: true,
        auth:{
         user: 'subhanzaheer106@gmail.com',
         pass:   'hjsdbmholsdmjizm'
        }
 
    });
 
    const mailOptions = {
     from: 'subhanzaheer106@gmail.com',
     to: options.to,
     subject: 'Activate your Account',
     text: options.text
 };
 
   const mailInfo =  await transpoter.sendMail(mailOptions);
   if(mailInfo){
     console.log('email send to user sucesfully', mailInfo.response);
   }
   else{
     console.log("email no send to user error");
   }
 } catch (error) {
     console.log(error)
 }
}

module.exports = sendMail;