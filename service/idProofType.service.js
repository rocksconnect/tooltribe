/**
 * @file(user.service.js) All service realted to user  
 * @author Shakshi Pandey <shakshipandey11@gmail.com>
 * @version 1.0.0
 * @lastModifed 26-March-2018
 * @lastModifedBy Shakshi
 */

import IdProofType from '../models/idProofType.model'
import logger from '../core/logger/app.logger'
import successMsg from '../core/message/success.msg'
import msg from '../core/message/error.msg.js'
import utility from '../core/utility.js' 
import Trade from '../models/trade.model'
import userTypeConfig from '../models/usertype.model'


import brand from '../models/brand.model'
import Category from '../models/category.model'






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

service.addIdProofType = async (req,res)=>{
	if(!req.body.IdProofType){
		return res.send({success:false, code:500, msg:"IdProofType is missing"});
	}
	if(!req.body.status){
		return res.send({success:false, code:500, msg:"Status is missing"});
	}
	try{
		var IdProofTypeToAdd = IdProofType({
			IdProofType:req.body.IdProofType,
			status:req.body.status,
			trash:false,
		})
		var savedIdProofType = await IdProofType.addIdProofType(IdProofTypeToAdd);
		if(savedIdProofType){
			return res.send({success:true, code:200, msg:"IdProofType added succesfully"});
		}else{
			return res.send({success:false, code:500, msg:"Error in adding IdProofType"});
		}
	}catch(error){
		return res.send({success:false, code:500, msg:"Error in adding IdProofType", err:error});
	}
}

/**
 * @description [calculation before find IdProofType to db and after find IdProofType ]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */

service.getIdProofType = async (req,res)=>{
	
	try{
		var IdProofTypeToFind = {
			query:{trash:false},
			projection:{trash:0}
		}
		var AllIdProofType = await IdProofType.findIdProofType(IdProofTypeToFind);
		if(AllIdProofType){
			return res.send({success:true, code:200, msg:"IdProofType found succesfully", data:AllIdProofType});
		}else{
			return res.send({success:false, code:500, msg:"Error in finding IdProofType"});
		}
	}catch(error){
		return res.send({success:false, code:500, msg:"Error in finding IdProofType", err:error});
	}
}

/**
 * @description [calculation before find getAllList to db and after find getAllList ]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */

service.getAllList = async (req,res)=>{
	
	try{
		var IdProofTypeToFind = {
			query:{trash:false},
			projection:{trash:0}
		}
		var AllIdProofType = await IdProofType.findIdProofType(IdProofTypeToFind);
		var AllTrade = await Trade.findTrade(IdProofTypeToFind);
		const usertype = await userTypeConfig.getAllData();
		if(AllIdProofType){
			return res.send({success:true, code:200, msg:"IdProofType found succesfully", data : {allIdProofType:AllIdProofType,allTrade:AllTrade,usertype:usertype}});
		}else{
			return res.send({success:false, code:500, msg:"Error in finding IdProofType"});
		}
	}catch(error){
		return res.send({success:false, code:500, msg:"Error in finding IdProofType", err:error});
	}
}

/**
 * @description [calculation before remove IdProofType to db and after remove IdProofType ]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */

service.removeIdProofType = async (req,res)=>{
	if(!req.body._id){
		return res.send({success:false, code:500, msg:"_id is missing"})
	}
	try{
		var IdProofTypeToEdit = {
			query:{_id:req.body._id},
			data:{$set:{trash:true}}
		}
		var RemovedIdProofType = await IdProofType.editIdProofType(IdProofTypeToEdit);
		if(RemovedIdProofType){
			return res.send({success:true, code:200, msg:"IdProofType deleted succesfully", data:RemovedIdProofType});
		}else{
			return res.send({success:false, code:500, msg:"Error in deleteing IdProofType"});
		}
	}catch(error){
		return res.send({success:false, code:500, msg:"Error in deleteing IdProofType", err:error});
	}
}

/**
 * @description [calculation before edit IdProofType to db and after edit IdProofType ]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */

service.updateIdProofType = async (req,res)=>{
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
		var IdProofTypeToEdit = {
			query:{_id:req.body._id},
			data:{$set:dataToEdit}
		}
		var UpdatedIdProofType = await IdProofType.editIdProofType(IdProofTypeToEdit);
		if(UpdatedIdProofType){
			return res.send({success:true, code:200, msg:"IdProofType updated succesfully", data:UpdatedIdProofType});
		}else{
			return res.send({success:false, code:500, msg:"Error in updating IdProofType"});
		}
	}catch(error){
		return res.send({success:false, code:500, msg:"Error in updating IdProofType", err:error});
	}
}



/**
 * Create amit
 * @description [calculation before find getAllList to db and after find getAllList ]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */

service.getBrandCategory = async (req,res)=>{


	try{

		var where = {
			query:{trash:false},
			projection:{trash:0}
		}
		var brandData    = await brand.getBrandList(where);
		var categoryData = await Category.getCategoryList(where);
		
		if(brandData || categoryData){
			if(req.body.type=='category'){
				return res.send({success:true, code:200, msg:"succes", data:{categoryData:categoryData}});	
			}else if(req.body.type=='brand'){
				return res.send({success:true, code:200, msg:"succes", data:{brandData:brandData}});	
			}else{
				return res.send({success:true, code:200, msg:"succes", data:{brandData:brandData,categoryData:categoryData}});	
			}
			
		}else{
			return res.send({success:false, code:500, msg:"Error in finding IdProofType"});
		}
	}catch(error){
		return res.send({success:false, code:500, msg:"Error in finding IdProofType", err:error});
	}
}

export default service;
