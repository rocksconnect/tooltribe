/**
 * @file(user.service.js) All service realted to user  
 * @author Shakshi Pandey <shakshipandey11@gmail.com>
 * @version 1.0.0
 * @lastModifed 26-March-2018
 * @lastModifedBy Shakshi
 */

import Company from '../models/company.model'
import logger from '../core/logger/app.logger'
import successMsg from '../core/message/success.msg'
import msg from '../core/message/error.msg.js'
import utility from '../core/utility.js' 





/**
 * [service is a object ]
 * @type {Object}
 */

const service = {};

/**
 * @description [calculation before add Company to db and after adding Company ]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */

service.addCompany = async (req,res)=>{
	
	
	if(!req.body.company){
		return res.send({success:false, code:500, msg:"Company is missing"});
	}
	if(!req.body.status){
		return res.send({success:false, code:500, msg:"Status is missing"});
	}
	try{
		
		var CompanyToAdd = Company({
			company:req.body.Company,
			status:req.body.status,
			trash:false
		})
		var savedCompany = await Company.addCompany(CompanyToAdd);
		if(savedCompany){
			return res.send({success:true, code:200, msg:"Company added succesfully"});
		}else{
			return res.send({success:false, code:500, msg:"Error in adding Company"});
		}
	}catch(error){
		
		return res.send({success:false, code:500, msg:"Error in adding Company", err:error});
	}
}

/**
 * @description [calculation before find Company to db and after find Company ]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */

service.getCompany = async (req,res)=>{
	console.log(req.body.text,"req.body.text")
	if(!req.body.text){
		return res.send({success:false, code:500, msg:"Text is missing"})
	}
	try{
		
		var CompanyToFind = {

			query:{companyName:{ $regex: new RegExp('^'+req.body.text), $options:'i'  }},
			projection:{trash:0}
		}
		console.log(CompanyToFind.query,"queryqueryquery")
		var AllCompany = await Company.findCompany(CompanyToFind);
		if(AllCompany){
			return res.send({success:true, code:200, msg:"Company found succesfully", data:AllCompany});
		}else{
			return res.send({success:false, code:500, msg:"Error in finding Company"});
		}
	}catch(error){
		console.log(error,"error")
		return res.send({success:false, code:500, msg:"Error in finding Company", err:error});
	}
}

/**
 * @description [calculation before remove Company to db and after remove Company ]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */

service.removeCompany = async (req,res)=>{
	if(!req.body._id){
		return res.send({success:false, code:500, msg:"_id is missing"})
	}
	try{
		var CompanyToEdit = {
			query:{_id:req.body._id},
			data:{$set:{trash:true}}
		}
		var RemovedCompany = await Company.editCompany(CompanyToEdit);
		if(RemovedCompany){
			return res.send({success:true, code:200, msg:"Company deleted succesfully", data:RemovedCompany});
		}else{
			return res.send({success:false, code:500, msg:"Error in deleteing Company"});
		}
	}catch(error){
		return res.send({success:false, code:500, msg:"Error in deleteing Company", err:error});
	}
}

/**
 * @description [calculation before edit Company to db and after edit Company ]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */

service.updateCompany = async (req,res)=>{
	if(!req.body._id){
		return res.send({success:false, code:500, msg:"_id is missing"})
	}
	var dataToEdit = {};
   
    for(var key in req.body){
        console.log(key," = key")
        if(key!=='trash' && key!=='_id' && req.body[key]!=='undefined' && req.body[key]!==null && req.body[key]!==''){
          dataToEdit[key]=req.body[key];
        }
    }
    console.log("step 2",dataToEdit)
    if(!dataToEdit){
        return res.send({success:false,code:500, msg:"Data is missing"})
    }
	try{
		var CompanyToEdit = {
			query:{_id:req.body._id},
			data:{$set:dataToEdit}
		}
		var UpdatedCompany = await Company.editCompany(CompanyToEdit);
		if(UpdatedCompany){
			return res.send({success:true, code:200, msg:"Company updated succesfully", data:UpdatedCompany});
		}else{
			return res.send({success:false, code:500, msg:"Error in updating Company"});
		}
	}catch(error){
		return res.send({success:false, code:500, msg:"Error in updating Company", err:error});
	}
}

export default service;
