/**
 * @file(user.service.js) All service realted to refral  
 * @author Shakshi Pandey <shakshipandey11@gmail.com>
 * @version 1.0.0
 * @lastModifed 24-April-2018
 * @lastModifedBy Shakshi
 */

import Refral from '../models/refral.model'
import User from '../models/user.model'
import logger from '../core/logger/app.logger'
import successMsg from '../core/message/success.msg'
import msg from '../core/message/error.msg.js'
import utility from '../core/utility.js' 
import Trade from '../models/trade.model'
import userTypeConfig from '../models/usertype.model'


/**
 * [service is a object ]
 * @type {Object}
 */

const service = {};

/**
 * @description [calculation before add IdProofType to db and after adding IdProofType ]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */

service.addRefral = async (req,res)=>{

	if(!req.body.refralContact){
		return res.send({success:false, code:500, msg:"refralContact is missing"});
	}
	if(!req.body.refralBy){
		return res.send({success:false, code:500, msg:"refralBy is missing"});
	}

	try{
		var refralUserData = await User.getOne({phone:req.body.refralContact.toString()});
		var insertData = Refral({
			refralContact:req.body.refralContact,
			refralBy:req.body.refralBy
		});
		
		var savedBrand = await Refral.addRefral(insertData);
		
		if(refralUserData!= null){
			
			var objToMail = {
	          to: refralUserData.email,
	          subject:"Refral Code",
	          text:"Welcome in tooltribe and refral code is "+req.body.refralBy,
	          errMsg:"Error in sending mail",
	          successMsg:"successfully send mail"
	        }
	        const mailToUser = await utility.sendMail(objToMail);
	    }
        
		if(savedBrand){
			return res.send({success:true, code:200, msg:"Refral added succesfully."});
		}else{
			return res.send({success:false, code:500, msg:"Error in adding Refral."});
		}
	}catch(error){
		console.log(error)
		return res.send({success:false, code:500, msg:"Error in adding Refral", err:error});
	}
}



export default service;
