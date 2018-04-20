/**
 * @file(user.service.js) All service realted to user  
 * @author Shakshi Pandey <shakshipandey11@gmail.com>
 * @version 1.0.0
 * @lastModifed 26-March-2018
 * @lastModifedBy Shakshi
 */
import Category from '../models/category.model'
import ViewdTools from '../models/viewdTool.model'
import Tools from '../models/tools.model'
import ShareTool from '../models/shareTool.model'
import logger from '../core/logger/app.logger'
import successMsg from '../core/message/success.msg'
import msg from '../core/message/error.msg.js'
import common from '../core/message/common.msg.js'
import utility from '../core/utility.js' 

import rand from 'csprng'
import ObjectID from "bson-objectid";


/**
 * [service is a object ]
 * @type {Object}
 */

const service = {};

/**
|------------------------------------------
| @Function : getHomeScreenData
|------------------------------------------
*/
service.getHomeScreenData = async (req,res)=>{
    try{
        /*--- get category data---*/
        var categoryToFind = {
            query:{trash:"false"},
            projection:{trash:0},
            page:0
        }
        var categoryData = await Category.findCategory(categoryToFind);

        /*--- get recent viewed tool data---*/
        var viewdToolData = [];
        if(req.body.userId){
            var dataToFind = {
                query:{viewedBy:ObjectID(req.body.userId)}
            }
            viewdToolData = await ViewdTools.getViewdTool(dataToFind);
        }
       
        /*--- get recent tool data---*/
        var recentToolData = await Tools.getToolList();
        let recentToolData = recentToolData.map(function(result){
            result['ratings']    = Math.floor(Math.random() * 5);
            result['rentedUser'] = Math.floor(Math.random() * 150);
            return result;
        });


        if(!req.body.type){
            var data = {
                recentToolData:recentToolData,
                viewdToolData:viewdToolData,
                categoryData:categoryData
            };
        }else{
            var data = {
                recentToolData:(req.body.type=='recentTool')?recentToolData:[],
                viewdToolData:(req.body.type=='viewdTool')?recentToolData:[],
                categoryData:(req.body.type=='category')?recentToolData:[]
            };
        }
        
        if(data){
            return res.send({success:true, code:200, msg:"Success", data:data});
        }else{
            return res.send({success:false, code:500, msg:"Error in finding getToolList"});
        }
    }catch(error){
        return res.send({success:false, code:500, msg:"Error in finding getToolList", err:error});
    }
}


/**
|------------------------------------------
| @Function : homeScreenSearch
|------------------------------------------
*/
service.homeScreenSearch = async (req,res)=>{
    if(!req.body.search){
        return res.send({success:false, code:500, msg:"search is missing"});
    }

    if(req.body.location){
        if(!req.body.latitude){
            return res.send({success:false, code:500, msg:"latitude is missing"});
        }
        if(!req.body.longitude){
            return res.send({success:false, code:500, msg:"longitude is missing"});
        }
    }

    try{

        if(req.body.location){
            var lat1  = (req.body.latitude)?req.body.latitude:22.753285;
            var long1 = (req.body.longitude)?req.body.longitude:75.893696;

            var data = await Tools.getToolList();

            for (var x in data) {
               data[x]['distance'] = distance(lat1, long1, data[x]['toolLocation']['latitude'], data[x]['toolLocation']['longitude']);
            }

            //var a = distance(22.753285, 75.893696, 22.962267, 76.050795);
            return res.send({success:true, code:200, msg:"Success", data:data});
        }
        

        var insertArray = [];

        var whereCategoryData = {
            query:{category:{ $regex: new RegExp('^'+req.body.search), $options:'i'  }},
            projection:{trash:false}
        }
        var data = await Category.getSearchCategory(whereCategoryData);

        var whereToolData = {
            query:{toolName:{ $regex: new RegExp('^'+req.body.search), $options:'i'  }},
            projection:{hideTool:"NO"}
        }

        var toolData = await Tools.getSearchTool(whereToolData);

        if(data){
            for (var x in data) {
                var insertdata = {
                    "name" : data[x].category,
                    "type" : 'category',
                    "_id"  : data[x]._id,
                    
                };
                insertArray.push(insertdata);
            }
        }

        if(toolData){
            for (var x in toolData) {
                var insertdata = {
                    "name" : toolData[x].toolName,
                    "type" : 'tool',
                    "_id"  : toolData[x]._id,
                    
                };
                insertArray.push(insertdata);
            }
        }

        if(data){
            return res.send({success:true, code:200, msg:"Success", data:insertArray});
        }else{
            return res.send({success:false, code:500, msg:"Error in finding getToolList"});
        }

    }catch(error){
        return res.send({success:false, code:500, msg:"Error in finding getToolList", err:error});
    }
}



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
 * @getDetailsOfTool
*/
service.getDetailsOfTool = async (req,res)=>{
    if(!req.body.toolId){
        return res.send({success:false, code:500, msg:"tool _id is missing"});
    }
    try{
        
        var dataToFind={
            query:{_id:ObjectID(req.body.toolId)}
        }
        var data = await Tools.getDeatilsToolById(dataToFind);
        return res.send({success:true, code:200, msg:"successfully found", data:data});
       
    }catch(error){
        console.log(error)
        return res.send({success:false, code:500, msg:"Error in finding getDetailsOfTool", err:error});
    }
}

/*
* @ Function : getCategoryToolList
*/
service.getCategoryToolList = async (req,res)=>{
    if(!req.body.categoryId){
        return res.send({success:false, code:500, msg:"categoryId is missing"})
    }

    if(!req.body.page){
        return res.send({success:false, code:500, msg:"page is missing"})
    }
    var condition = [];
    if(req.body.brandId){
        condition.push({brandId:ObjectID(req.body.brandId)})
    }
    if(req.body.categoryId){
        condition.push({categoryId:ObjectID(req.body.categoryId)})
    }
    if(req.body.shipment){
        condition.push({shipment:req.body.shipment})
    }
    if(req.body.searchKeyword){
        condition.push({toolName:{ $regex: new RegExp('^'+req.body.searchKeyword), $options:'i'  } })
    }
    if(req.body.accessories){
        condition.push({accessories:{$ne: null}})
    }
    if(req.body.sellingPriceTo && req.body.sellingPriceFrom ){
        let temp = {"sellingPrice" : { 
            "$gte" : req.body.sellingPriceTo,
            "$lte" : req.body.sellingPriceFrom
        }}
        
        condition.push(temp)
    }
    condition.push({hideTool:"NO"})
    // if(req.body.reviews){
    //     condition.push({reviews:req.body.categoryId})
    // }
    var param = {
        query:{
            $and:condition
        },
        page:req.body.page
    };
    try{

        var data  = await Tools.getCategoryToolList(param);
        var originalData = [];
        data.forEach(function(result,index){
            console.log("index  = ",index)
            data[index].ratings    = Math.floor(Math.random() * 5);
            data[index].rentedUser = Math.floor(Math.random() * 150);
            //data[index].distance = distance(29.309532,78.233889,result.toolLocation.latitude,result.toolLocation.longitude);

            if(req.body.distanceTo && req.body.distanceFrom){
                if(data[index].distance>=req.body.distanceTo && data[index].distance<=req.body.distanceFrom){
                    
                     originalData.push(data[index]);
                }
            }else{
                
                 originalData.push(data[index]);
            }
          
        });
        //var count = await Tools.getCategoryToolCount({categoryId:req.body.categoryId});

        // if(addOn){
        console.log("Stop")
            return res.send({success:true, code:200, msg:"succes", data:originalData});
        // }else{
        //     return res.send({success:false, code:500, msg:"Error in finding getToolList"});
        // }
    }catch(error){
        console.log(error)
        return res.send({success:false, code:500, msg:"Error in finding getToolList", err:error});
    }
}


/**
 * @description [addTool Service]
 * @param  {[object]}
 */
service.addTool = async (req,res)=>{

    if(!req.body.address){
        return res.send({success:false, code:500, msg:"address is missing"})
    }
    if(!req.body.latitude){
        return res.send({success:false, code:500, msg:"latitude is missing"})
    }
    if(!req.body.longitude){
        return res.send({success:false, code:500, msg:"longitude is missing"})
    }
    

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

    if(!req.body.data){
        return res.send({success:false, code:500, msg:"data is missing"})
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
    if(!req.body.data){
        return res.send({success:false, code:500, msg:"data is missing"})
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

/*
|--------------------------------------
| @services : Get Recently added tool
|--------------------------------------
*/
service.getRecentTool = async (req,res) =>{
    /*if(!req.query.userId){
        return res.send({success:false, code:500, msg:"userId is missing."});
    }*/
    try{
        /*var dataToFind = {
            query:{userId:ObjectID(req.query.userId)}
        }*/
        //var data = await Tools.getToolList(dataToFind);
        var data = await Tools.getToolList();
        let addOn = data.map(function(result){
            result['ratings']    = Math.floor(Math.random() * 5);
            result['rentedUser'] = Math.floor(Math.random() * 150);
            return result;
        });
        return res.send({success:true, code:200, msg:"Successfully found",data:addOn})
    }catch(error){
        return res.send({success:true, code:500, msg:"Error in getting recent tool"})
    }
}


/*
|--------------------------------------
| @services : Get getRecentViewTool
|--------------------------------------
*/
service.getRecentViewTool = async (req,res) =>{

    if(!req.body.userId){
        return res.send({success:false, code:500, msg:"userId is missing."});
    }
    
    try{
        /*var dataToFind = {
            query:{userId:ObjectID(req.body.userId)}
        }*/
        //var data = await Tools.getToolList(dataToFind);
        var data = await Tools.getRecentViewToolData();
        
        let addOn = data.map(function(result){
            result['ratings']    = Math.floor(Math.random() * 5);
            result['rentedUser'] = Math.floor(Math.random() * 150);
            return result;
        });
        return res.send({success:true, code:200, msg:"Successfully found",data:addOn})
    }catch(error){
        return res.send({success:true, code:500, msg:"Error in getting recent tool"})
    }

}

/*
|-------------------------------------
| @services : hideTool
|-------------------------------------
*/
service.hideTool = async (req, res) => {
    if(!req.body._id){
        return res.send({success:false, code:500, msg:"_id is missing"})
    }
    if(!req.body.userId){
        return res.send({success:false, code:500, msg:"userId is missing"})
    }
    if(!req.body.status){
        return res.send({success:false, code:500, msg:"status is missing"});
    }

    if(req.body.status=='yes' && req.body.status=='no'){
        return res.send({success:false, code:500, msg:"please enter a valid status value"});
    }

    try{

        var where = {
            query:{_id:req.body._id,userId:req.body.userId}
        }
        var toolData = await Tools.getUserTool(where);

        if(toolData.length){
            
            var data = {
                query:{_id:req.body._id},
                data:{$set:{
                        hideTool: req.body.status.toUpperCase()
                    }
                }
            }
            var data = await Tools.hideTool(data);
            if(data){
                return res.send({success:true, code:200, msg:"succes", data:data});
            }else{
                return res.send({success:false, code:500, msg:"Error in updating tool"});
            }

        }else{
            return res.send({success:false, code:500, msg:"This is not your tool."});
        }
        
    }catch(error){
        return res.send({success:false, code:500, msg:"Error", err:error});
    }

}

/*
|-------------------------------------
| @services : ShareTool
|-------------------------------------
*/
service.addShareTool = async (req,res)=>{
    if(!req.body.userId){
        return res.send({success:false, code:500, msg:"userId is missing."});
    }
    if(!req.body.toolId){
        return res.send({success:false, code:500, msg:"toolId is missing"});
    }
    if(!req.body.shareType){
        return res.send({success:false, code:500, msg:"shareType is missing"});
    }
    try{
        var dataToAdd = ShareTool({
            userId:req.body.userId,
            toolId:req.body.toolId,
            shareType:req.body.shareType
        })
        var saveShareTool = ShareTool.addShareTools(dataToAdd);
        return res.send({success:true, code:200, msg:"Successfully Add shared tool"});
    }catch(error){
        console.log(error,"error")
        return res.send({success:true, code:500, msg:"Error in adding of shared tool"});
    }
}


/*
|-------------------------------------
| @services : distance
|-------------------------------------
*/
function distance(lat1, lon1, lat2, lon2) {

    var p = 0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p)/2 + 
            c(lat1 * p) * c(lat2 * p) * 
            (1 - c((lon2 - lon1) * p))/2;

  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}
export default service;