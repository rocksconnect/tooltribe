/**
 * @file(user.service.js) All service realted to user  
 * @author Shakshi Pandey <shakshipandey11@gmail.com>
 * @version 1.0.0
 * @lastModifed 26-March-2018
 * @lastModifedBy Shakshi
 */

import brand from '../models/brand.model'
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

service.addBrand = async (req,res)=>{

	if(!req.body.brandName){
		return res.send({success:false, code:500, msg:"brandName is missing"});
	}
	if(!req.body.brandDescription){
		return res.send({success:false, code:500, msg:"brandDescription is missing"});
	}
	
	try{
		var insertData = brand({
			brandName:req.body.brandName,
			brandDescription:req.body.brandDescription,
			status:'true',
			trash:false
		});
		
		var savedBrand = await brand.addBrand(insertData);
		if(savedBrand){
			return res.send({success:true, code:200, msg:"added succesfully."});
		}else{
			return res.send({success:false, code:500, msg:"Error in adding brand."});
		}
	}catch(error){
		return res.send({success:false, code:500, msg:"Error in adding IdProofType", err:error});
	}
}

/**
 * @getBrandList
*/
service.getBrandList = async (req,res)=>{
	try{
		var where = {
			query:{trash:false,status:true},
			projection:{trash:0}
		}
		var data = await brand.getBrandList(where);
		
		if(data){
			return res.send({success:true, code:200, msg:"succes", data:data});
		}else{
			return res.send({success:false, code:500, msg:"Error in finding getBrandList"});
		}
	}catch(error){
		return res.send({success:false, code:500, msg:"Error in finding getBrandList", err:error});
	}
}


/**
 * @editBrand
*/
service.editBrand = async (req,res)=>{

	if(!req.body.brandId){
		return res.send({success:false, code:500, msg:"brandId is missing"});
	}
	if(!req.body.brandName){
		return res.send({success:false, code:500, msg:"brandName is missing"});
	}
	if(!req.body.brandDescription){
		return res.send({success:false, code:500, msg:"brandDescription is missing"});
	}

	
	try{
		var data = {
			query:{brandId:req.body.brandId},
			data:{$set:{
        			brandName: req.body.brandName,
        			brandDescription: req.body.brandDescription
        		}
        	}
		}
		var data = await brand.editBrand(data);
		if(data){
			return res.send({success:true, code:200, msg:"Isucces", data:data});
		}else{
			return res.send({success:false, code:500, msg:"Error in updating brand"});
		}
	}catch(error){
		return res.send({success:false, code:500, msg:"Error in finding getBrandList", err:error});
	}
}



/**
 * @editBrand
*/
service.deletedBrand = async (req,res)=>{

	if(!req.body.brandId){
		return res.send({success:false, code:500, msg:"brandId is missing"});
	}
	if(!req.body.status){
		return res.send({success:false, code:500, msg:"status is missing"});
	}
	

	try{
		var data = {
			query:{brandId:req.body.brandId},
			data:{$set:{
        			status: req.body.status
        		}
        	}
		}
		var data = await brand.editBrand(data);
		if(data){
			return res.send({success:true, code:200, msg:"Isucces", data:data});
		}else{
			return res.send({success:false, code:500, msg:"Error in updating brand"});
		}
	}catch(error){
		return res.send({success:false, code:500, msg:"Error in finding getBrandList", err:error});
	}
}



export default service;
