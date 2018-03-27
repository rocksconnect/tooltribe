/**
 * @file(user.service.js) All service realted to user  
 * @author Shakshi Pandey <shakshipandey11@gmail.com>
 * @version 1.0.0
 * @lastModifed 26-March-2018
 * @lastModifedBy Shakshi
 */

import Trade from '../models/trade.model'
import logger from '../core/logger/app.logger'
import successMsg from '../core/message/success.msg'
import msg from '../core/message/error.msg.js'
import utility from '../core/utility.js' 
import  crypto from 'crypto'
import jwt from 'jsonwebtoken'
import nm from 'nodemailer'
import rand from 'csprng'




/**
 * [service is a object ]
 * @type {Object}
 */

const service = {};

/**
 * @description [calculation before add trade to db and after adding trade ]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */

service.addTrade = async (req,res)=>{
	if(!req.body.trade){
		return res.send({success:false, code:500, msg:"Trade is missing"});
	}
	if(!req.body.status){
		return res.send({success:false, code:500, msg:"Status is missing"});
	}
	try{
		var tradeToAdd = Trade({
			trade:req.body.trade,
			status:req.body.status,
			trash:false,
		})
		var savedTrade = await Trade.addTrade(tradeToAdd);
		if(savedTrade){
			return res.send({success:true, code:200, msg:"Trade added succesfully"});
		}else{
			return res.send({success:false, code:500, msg:"Error in adding trade"});
		}
	}catch(error){
		return res.send({success:false, code:500, msg:"Error in adding trade", err:error});
	}
}

/**
 * @description [calculation before find trade to db and after find trade ]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */

service.getTrade = async (req,res)=>{
	
	try{
		var tradeToFind = {
			query:{trash:false},
			projection:{trash:0}
		}
		var AllTrade = await Trade.findTrade(tradeToFind);
		if(AllTrade){
			return res.send({success:true, code:200, msg:"Trade found succesfully", data:AllTrade});
		}else{
			return res.send({success:false, code:500, msg:"Error in finding trade"});
		}
	}catch(error){
		return res.send({success:false, code:500, msg:"Error in finding trade", err:error});
	}
}

/**
 * @description [calculation before remove trade to db and after remove trade ]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */

service.removeTrade = async (req,res)=>{
	if(!req.body._id){
		return res.send({success:false, code:500, msg:"_id is missing"})
	}
	try{
		var tradeToEdit = {
			query:{_id:req.body._id},
			data:{$set:{trash:true}}
		}
		var RemovedTrade = await Trade.editTrade(tradeToEdit);
		if(RemovedTrade){
			return res.send({success:true, code:200, msg:"Trade deleted succesfully", data:RemovedTrade});
		}else{
			return res.send({success:false, code:500, msg:"Error in deleteing trade"});
		}
	}catch(error){
		return res.send({success:false, code:500, msg:"Error in deleteing trade", err:error});
	}
}

/**
 * @description [calculation before edit trade to db and after edit trade ]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */

service.updateTrade = async (req,res)=>{
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
		var tradeToEdit = {
			query:{_id:req.body._id},
			data:{$set:dataToEdit}
		}
		var UpdateddTrade = await Trade.editTrade(tradeToEdit);
		if(UpdateddTrade){
			return res.send({success:true, code:200, msg:"Trade updated succesfully", data:UpdateddTrade});
		}else{
			return res.send({success:false, code:500, msg:"Error in updating trade"});
		}
	}catch(error){
		return res.send({success:false, code:500, msg:"Error in updating trade", err:error});
	}
}
export default service;
