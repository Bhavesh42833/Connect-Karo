import nodeMailer from "nodemailer";

export const sendEmail=async(options)=>{
    var transporter = nodeMailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "7cdb36cd1afdf9",
          pass: "1e0855482aca92"
        }
      });

     const mailOptions={
        from:"Sociafy@gmail.com",
        to:options.email,
        subject:options.subject,
        text:options.message
     };

     await transporter.sendMail(mailOptions);
}