 import nm from 'nodemailer';
 const utility = {};

 utility.removeQuotationMarks = (string) => {
     return (typeof string === 'string') ? parseInt(Number(string.replace(/"|'/g, ''))) : string;
 }

 utility.smtpTransport = nm.createTransport({
 service: 'Gmail',
 auth: {
  user: "haulified@limitlessmobil.com",
  pass: "Limit@465"
 }
});
utility.sendMail = (mailObject)=>{
	console.error("1111111111")
	var mailOptions = {
     from: "Super Admin <toolTribe@gmail.com>",
     to: mailObject.to,
     subject: mailObject.subject,
     text: mailObject.text
    }

    return utility.smtpTransport.sendMail(mailOptions);
}

export default utility;