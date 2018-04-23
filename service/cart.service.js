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
 |--------------------------------------
 | @ service : addCart
 |--------------------------------------
*/
service.addToCart = async (req,res)=>{

	if(!req.body.toolId){
		return res.send({success:false, code:500, msg:"toolId _id is missing"});
	}

	if(!req.body.userId){
		return res.send({success:false, code:500, msg:"userId _id is missing"});
	}

	if(!req.body.deviceId){
		return res.send({success:false, code:500, msg:"deviceId is missing"});
	}

	if(!req.body.toolName){
		return res.send({success:false, code:500, msg:"toolName is missing"});
	}

	if(!req.body.toolImageSrc){
		return res.send({success:false, code:500, msg:"toolImageSrc is missing"});
	}
	
	if(!req.body.transactionType){
		return res.send({success:false, code:500, msg:"transactionType is missing"});
	}

	if(!req.body.toolPrice){
		return res.send({success:false, code:500, msg:"toolPrice is missing"});
	}

	if(!req.body.totalAmount){
		return res.send({success:false, code:500, msg:"totalAmount is missing"});
	}

	if(!req.body.handlingCharges){
		return res.send({success:false, code:500, msg:"handlingCharges is missing"});
	}

	if(!req.body.deliveryCharges){
		return res.send({success:false, code:500, msg:"deliveryCharges is missing"});
	}	

	if(req.body.transactionType=='rent'){

		if(!req.body.toolRental){
			return res.send({success:false, code:500, msg:"toolRental is missing"});
		}

		if(!req.body.rentalDays){
			return res.send({success:false, code:500, msg:"rentalDays is missing"});
		}

		if(!req.body.depositAmount){
			return res.send({success:false, code:500, msg:"depositAmount is missing"});
		}
	}

	if(!req.body.shipmentType){
		return res.send({success:false, code:500, msg:"shipmentType is missing"});
	}
	
	if(req.body.shipmentType=='pickup'){
		if(!req.body.pickupAddress){
			return res.send({success:false, code:500, msg:"pickupAddress is missing"});
		}
	}else if(req.body.shipmentType=='delivery'){
		if(!req.body.deliveryAddressId){
			return res.send({success:false, code:500, msg:"deliveryAddressId is missing"});
		}
		
		if(!req.body.deliveryAddress){
			return res.send({success:false, code:500, msg:"deliveryAddress is missing"});
		}

	}else{
		return res.send({success:false, code:500, msg:"please enter a valid shipmentType"})
	}
	
	try{

		let cartData = await Cart.getOneCart({toolId:ObjectID(req.body.toolId),userId:ObjectID(req.body.userId)});

		if(cartData.length){
			return res.send({success:true, code:200, msg:"succes."});
		}else{
			var insertData = Cart({
				toolId:ObjectID(req.body.toolId),
				userId:ObjectID(req.body.userId),
				deviceId:req.body.deviceId,
				toolName:req.body.toolName,
				toolImageSrc:req.body.toolImageSrc,
				poNumber:false,
				transactionType:req.body.transactionType,
				shipmentType:req.body.shipmentType,
				toolRental:(req.body.toolRental)?req.body.toolRental:0,
				toolPrice:req.body.toolPrice,
				rentalDays:(req.body.rentalDays)?req.body.rentalDays:0,
				handlingCharges:req.body.handlingCharges,
			    deliveryCharges:req.body.deliveryCharges,
			    depositAmount:(req.body.rentalDays)?req.body.rentalDays:0,
			    totalAmount:(req.body.totalAmount)?req.body.totalAmount:0,
			    travelTimeCalculate:(req.body.travelTimeCalculate)?req.body.travelTimeCalculate:0,
				deliveryAddressId:(req.body.deliveryAddressId)?req.body.deliveryAddressId:0,
				deliveryAddress:(req.body.deliveryAddress)?req.body.deliveryAddress:'',
				pickupAddress:(req.body.pickupAddress)?req.body.pickupAddress:'',
				trash:false
			});
		
			let savedCart = await Cart.addCart(insertData);
			if(savedCart){
				return res.send({success:true, code:200, msg:"succes."});
			}else{
				return res.send({success:false, code:500, msg:"error"});
			}
		}
	}catch(error){
		return res.send({success:false, code:500, msg:"Error in adding.", err:error});
	}
}

/**
 |--------------------------------------
 | @ service : getCartList
 |--------------------------------------
*/
service.getCartList = async (req,res)=>{
	try{
		var where = {
			query:{trash:false}
		}
		var data = await Cart.getOneCart({userId:ObjectID(req.body.userId)});
		
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
|--------------------------------------
| @ service : editCart
|--------------------------------------
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
 |--------------------------------------
 | @ service : editCart
 |--------------------------------------
*/
service.removeToCart = async (req,res)=>{

	if(!req.body.cartId){
		return res.send({success:false, code:500, msg:"cartId _id is missing"});
	}
	if(!req.body.userId){
		return res.send({success:false, code:500, msg:"userId is missing"});
	}

	
	try{
		var data = {
			query:{_id:ObjectID(req.body.cartId)},
			data:{$set:{
        			trash: true
        		}
        	}
		}
		var data = await Cart.removeCart(data);
		if(data){
			return res.send({success:true, code:200, msg:"removed Cart succesfully", data:data});
		}else{
			return res.send({success:false, code:500, msg:"Error in removing Cart"});
		}
	}catch(error){
		console.log("error == ",error)
		return res.send({success:false, code:500, msg:"Error in removing Cart", err:error});
	}
}

export default service;