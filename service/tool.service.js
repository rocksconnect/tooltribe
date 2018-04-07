/**
 * @file(user.service.js) All service realted to user  
 * @author Shakshi Pandey <shakshipandey11@gmail.com>
 * @version 1.0.0
 * @lastModifed 26-March-2018
 * @lastModifedBy Shakshi
 */

import Tools from '../models/tools.model'
import logger from '../core/logger/app.logger'
import successMsg from '../core/message/success.msg'
import msg from '../core/message/error.msg.js'
import common from '../core/message/common.msg.js'
import utility from '../core/utility.js' 

import rand from 'csprng'


/**
 * [service is a object ]
 * @type {Object}
 */

const service = {};



/**
 * @getToolList
*/
service.getToolList = async (req,res)=>{
    try{
        
        var data = await Tools.getToolList();
        
        if(data){
            return res.send({success:true, code:200, msg:"succes", data:data});
        }else{
            return res.send({success:false, code:500, msg:"Error in finding getToolList"});
        }
    }catch(error){
        return res.send({success:false, code:500, msg:"Error in finding getToolList", err:error});
    }
}


/**
 * @description [addTool Service]
 * @param  {[object]}
 */
service.addTool = async (req,res)=>{

    /*--- shipmentStatus validation ---*/
    if(!req.body.shipmentStatus){
        return res.send({success:false, code:500, msg:"shipmentStatus is missing"})
    }

    if(req.body.shipmentStatus.toUpperCase()=='BOTH'){
        if(!req.body.rentAmount){
            return res.send({success:false, code:500, msg:"rentAmount is missing"})
        }

        if(!req.body.sellAmount){
            return res.send({success:false, code:500, msg:"sellAmount is missing"})
        }
    }else if(req.body.shipmentStatus.toUpperCase()=='RENT'){
        if(!req.body.rentAmount){
            return res.send({success:false, code:500, msg:"rentAmount is missing"})
        }
    }else if(req.body.shipmentStatus.toUpperCase()=='SELL'){
        if(!req.body.sellAmount){
            return res.send({success:false, code:500, msg:"sellAmount is missing"})
        }
    }else{
        return res.send({success:false, code:500, msg:"please enter a valid shipmentStatus"})
    }


    /*--- deliveryStatus validation ---*/
    if(!req.body.deliveryStatus){
        return res.send({success:false, code:500, msg:"deliveryStatus is missing"})
    }

    let deliveryAvailable = 'NO';
    let pickupAvailable = 'NO';

    if(req.body.deliveryStatus.toUpperCase()=='BOTH'){
        deliveryAvailable = 'YES';
        pickupAvailable   = 'YES';
    }else if(req.body.deliveryStatus=='delivery'){
        if(!req.body.deliveryAmount){
            return res.send({success:false, code:500, msg:"deliveryAmount is missing"})
        }
        deliveryAvailable = 'YES';
    }else if(req.body.deliveryStatus=='pickup'){
        pickupAvailable   = 'YES';
    }else{
        return res.send({success:false, code:500, msg:"please enter a valid deliveryStatus"})
    }

    let addToolsData = Tools({

        userId:req.body.userId,
        toolName:req.body.toolName,
        brandId:req.body.brandId,
        categoryId:req.body.categoryId,
        modelNo:req.body.modelNo,
        year:(req.body.year)?req.body.year:'',
        
        specifications: (req.body.specifications)?req.body.specifications:'',
        description: (req.body.description)?req.body.description:'',
        toolSize: (req.body.toolSize)?req.body.toolSize:'Small',
        toolPrice:(req.body.toolPrice)?req.body.toolPrice:'0', 
        
        shipment:(req.body.shipmentStatus)?req.body.shipmentStatus.toUpperCase():'',
        buyingOption:(req.body.shipmentStatus)?req.body.shipmentStatus.toUpperCase():'',//{RENT,SELL,BOTH}
        rentAmount:(req.body.rentAmount)?req.body.rentAmount:'0',
        sellingPrice:(req.body.sellingPrice)?req.body.sellingPrice:'0',
        depositAmount:(req.body.depositAmount)?req.body.depositAmount:'0',
        
        
        deliveryAvailable:deliveryAvailable,
        pickupAvailable:pickupAvailable,
        deliveryAmount:(req.body.deliveryAmount)?req.body.deliveryAmount:'0',
        toolProtection:(req.body.toolProtection)?req.body.toolProtection:'',
        toolProtectionPrice:(req.body.toolProtectionPrice)?req.body.toolProtectionPrice:'0',
        
        hideTool : (req.body.hideTool)?req.body.hideTool:'NO',
        activeAfter : (req.body.activeAfter)?req.body.activeAfter:new Date(),

        toolLocation:{   // pickup address
            address:(req.body.address)?req.body.address:'',
            latitude:(req.body.latitude)?req.body.latitude:'',
            longitude:(req.body.longitude)?req.body.longitude:'',
            city:(req.body.city)?req.body.city:'',
            state:(req.body.state)?req.body.state:'',
            country:(req.body.country)?req.body.country:'',
            zipCode:(req.body.zipCode)?req.body.zipCode:'',
        },
        toolAvailability:{
            from:(req.body.fromTime)?req.body.fromTime:'',
            to:(req.body.toTime)?req.body.toTime:''
        },
        toolImages:[],
        accessories:[],
        createAt: new Date(),
        updatedAt: new Date()
    });
    console.log(addToolsData)
    try{
        const data = await Tools.addTools(addToolsData);
        res.send({"success":true, "code":200, "msg":successMsg.addUser,"data":data});
    }catch(err){
        res.send({"success":false, "code":500, "msg":err.message,"err":err});
    }
}


/*
|--------------------------------------
| @services : addImage
|--------------------------------------
*/
service.addAccessoriesImage = async (req, res) => {

    if(!req.body._id){
        return res.send({success:false, code:500, msg:"_id is missing"})
    }
    
    let jsonData = JSON.parse(req.body.data)

    if(req.files){
        var insertArray = [];
        var fileData = req.files;
        
        if(jsonData.length>0){
            for (var x in jsonData) {
                let imgRand = 'defaulttool.png';
                if(fileData['image'+x]){   
                    imgRand = Date.now()+rand(24,24)+'.png';
                    let idProofImage = fileData['image'+x];
                    var idProofImageUploaded = await idProofImage.mv(common.toolPath+imgRand);
                }
                
                var insertdata = {
                    "name" : jsonData[x].name,
                    "description":jsonData[x].description,
                    "imgName" : imgRand,
                    "imgPath" : '/images/tool/'+imgRand
                };

                insertArray.push(insertdata);

                try{
                    let updateData = {
                        query:{_id:req.body._id},
                        data:{$set:{
                                accessories: insertArray,
                            }
                        }
                    }
                    let resultData = await Tools.addAccessoriesImage(updateData);
                    res.send({"success":true, "code":200, "msg":"tool accessories added successfully!","data":resultData});
                }catch(err){
                    res.send({"success":false, "code":500, "msg":err.message,"err":err});
                }
            }
        } 
        else{
            return res.send({success:false, code:400, msg:"accessories informations not available!"});
        }   
    }else{
        return res.send({success:false, code:400, msg:"Please upload files."});
    }
}


/*
|--------------------------------------
| @services : addImage
|--------------------------------------
*/
service.addToolImage = async (req, res) => {
    if(!req.body._id){
        return res.send({success:false, code:500, msg:"_id is missing"})
    }
    
    let jsonData = JSON.parse(req.body.data)

    if(req.files){
        var insertArray = [];
        var fileData = req.files;
        
        if(jsonData.length>0){
            for (var x in jsonData) {
                let imgRand = 'defaulttool.png';
                if(fileData['image'+x]){   
                    imgRand = Date.now()+rand(24,24)+'.png';
                    let idProofImage = fileData['image'+x];
                    var idProofImageUploaded = await idProofImage.mv(common.toolPath+imgRand);
                }
                
                var insertdata = {
                    "title" : jsonData[x].title,
                    "isDefault" : jsonData[x].isDefault,
                    "imgName" : imgRand,
                    "imgPath" : '/images/tool/'+imgRand
                };

                insertArray.push(insertdata);

                try{
                    let updateData = {
                        query:{_id:req.body._id},
                        data:{$set:{
                                toolImages: insertArray,
                            }
                        }
                    }
                    let resultData = await Tools.addAccessoriesImage(updateData);
                    res.send({"success":true, "code":200, "msg":"tool accessories added successfully!","data":resultData});
                }catch(err){
                    res.send({"success":false, "code":500, "msg":err.message,"err":err});
                }
            }
        }else{
            return res.send({success:false, code:400, msg:"tool informations not available!"});
        }   
    }else{
        return res.send({success:false, code:400, msg:"Please upload files."});
    }
}

export default service;