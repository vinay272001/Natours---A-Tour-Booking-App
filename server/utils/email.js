const nodemailer = require("nodemailer")

const sendmail = (options)=>{
    const transporter = nodemailer.createTransport({
        host : process.env.EMAIL_HOST,
        port : process.env.EMAIL_PORT,
        auth : {
            user : process.env.EMAIL_USERNAME,
            pass : process.env.EMAIL_PASSWORD
        }
    });
    const mailOptions = {
        from : "Vinay Agarwal <vinay19100@gmail.com>",
        to : options.email,
        subject : options.subject,
        text : options.message,
    }
    console.log("here")
    transporter.sendMail(mailOptions).then(()=>{
        console.log("Mail sent!")
    })
}

module.exports = sendmail