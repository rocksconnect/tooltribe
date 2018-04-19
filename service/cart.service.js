/**
 * @file(user.service.js) All service realted to user  
 * @author Shakshi Pandey <shakshipandey11@gmail.com>
 * @version 1.0.0
 * @lastModifed 26-March-2018
 * @lastModifedBy Shakshi
 */

import Cart from '../models/cart.model'
import logger from '../core/logger/app.logger'
import successMsg from '../core/message/success.msg'
import msg from '../core/message/error.msg.js'
import utility from '../core/utility.js' 
import Trade from '../models/trade.model'
import userTypeConfig from '../models/usertype.model'
import ObjectID from "bson-objectid";



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

service.addCart = async (req,res)=>{

	
	if(!req.body.toolId){
		return res.send({success:false, code:500, msg:"toolId is missing"});
	}
	if(!req.body.orderNo){
		return res.send({success:false, code:500, msg:"orderNo is missing"});
	}
	if(!req.body.toolName){
		return res.send({success:false, code:500, msg:"toolName is missing"});
	}
	if(!req.body.transactionType){
		return res.send({success:false, code:500, msg:"transactionType is missing"});
	}
	if(!req.body.toolRental){
		return res.send({success:false, code:500, msg:"toolRental is missing"});
	}
	if(!req.body.toolPrice){
		return res.send({success:false, code:500, msg:"toolPrice is missing"});
	}
	if(!req.body.rentalDays){
		return res.send({success:false, code:500, msg:"rentalDays is missing"});
	}
	if(!req.body.deliveryAddressId){
		return res.send({success:false, code:500, msg:"deliveryAddressId is missing"});
	}
	if(!req.body.pickupAddressId){
		return res.send({success:false, code:500, msg:"pickupAddressId is missing"});
	}
	if(!req.body.deliveryAddress){
		return res.send({success:false, code:500, msg:"deliveryAddress is missing"});
	}
	if(!req.body.pickupAddress){
		return res.send({success:false, code:500, msg:"pickupAddress is missing"});
	}
	if(!req.body.shipmentType){
		return res.send({success:false, code:500, msg:"shipmentType is missing"});
	}
	if(!req.body.toolImageSrc){
		return res.send({success:false, code:500, msg:"toolImageSrc is missing"});
	}
	
	try{
		var insertData = Cart({
			toolId:ObjectID(req.body.toolId),
			orderNo:req.body.orderNo,
			toolName:req.body.toolName,
			transactionType:req.body.transactionType,
			toolRental:req.body.toolRental,
			toolPrice:req.body.toolPrice,
			rentalDays:req.body.rentalDays,
			deliveryAddressId:req.body.deliveryAddressId,
			pickupAddressId:req.body.pickupAddressId,
			deliveryAddress:req.body.deliveryAddress,
			pickupAddress:req.body.pickupAddress,
			shipmentType:req.body.shipmentType,
			toolImageSrc:req.body.toolImageSrc,
			trash:false
		});
		
		var savedCart = await Cart.addCart(insertData);
		if(savedCart){
			return res.send({success:true, code:200, msg:"Cart added succesfully."});
		}else{
			return res.send({success:false, code:500, msg:"Error in adding Cart."});
		}
	}catch(error){
		return res.send({success:false, code:500, msg:"Error in adding IdProofType", err:error});
	}
}

/**
 * @getCart
*/
service.getCart = async (req,res)=>{
	try{
		var where = {
			query:{trash:false},
			projection:{trash:0}
		}
		var data = await Cart.getCartList(where);
		
		if(data){
			return res.send({success:true, code:200, msg:"succes", data:data});
		}else{
			return res.send({success:false, code:500, msg:"Error in finding getCartList"});
		}
	}catch(error){
		return res.send({success:false, code:500, msg:"Error in finding getCartList", err:error});
	}
}


/**
 * @editCart
*/
service.editCart = async (req,res)=>{

	if(!req.body.CartId){
		return res.send({success:false, code:500, msg:"CartId is missing"});
	}
	if(!req.body.CartName){
		return res.send({success:false, code:500, msg:"CartName is missing"});
	}
	if(!req.body.CartDescription){
		return res.send({success:false, code:500, msg:"CartDescription is missing"});
	}

	
	try{
		var data = {
			query:{CartId:req.body.CartId},
			data:{$set:{
        			CartName: req.body.CartName,
        			CartDescription: req.body.CartDescription
        		}
        	}
		}
		var data = await Cart.editCart(data);
		if(data){
			return res.send({success:true, code:200, msg:"Isucces", data:data});
		}else{
			return res.send({success:false, code:500, msg:"Error in updating Cart"});
		}
	}catch(error){
		return res.send({success:false, code:500, msg:"Error in finding getCartList", err:error});
	}
}



/**
 * @editCart
*/
service.deletedCart = async (req,res)=>{

	if(!req.body.CartId){
		return res.send({success:false, code:500, msg:"CartId is missing"});
	}
	if(!req.body.status){
		return res.send({success:false, code:500, msg:"status is missing"});
	}
	

	try{
		var data = {
			query:{CartId:req.body.CartId},
			data:{$set:{
        			status: req.body.status
        		}
        	}
		}
		var data = await Cart.editCart(data);
		if(data){
			return res.send({success:true, code:200, msg:"Isucces", data:data});
		}else{
			return res.send({success:false, code:500, msg:"Error in updating Cart"});
		}
	}catch(error){
		return res.send({success:false, code:500, msg:"Error in finding getCartList", err:error});
	}
}



export default service;
