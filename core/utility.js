 import nm from 'nodemailer';
 import fs from 'fs';

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
utility.getImage = (filename,req,res)=>{

  var fs = require('fs');
  try {  
      var data = fs.readFileSync('./images/'+filename, 'base64');
      return res.send({success:true, code:200, msg:"successfully in getting file",data:data})
      console.log("111111111111++++++++++");    
  } catch(e) {
    return res.send({success:false, code:500, msg:"Error in getting file", error:e.stack})
      //console.log('Error:', e.stack);
  }
}

export default utility;