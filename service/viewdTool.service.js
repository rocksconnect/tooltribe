/**
 * @file(user.service.js) All service realted to viewd tool  
 * @author Shakshi Pandey <shakshipandey11@gmail.com>
 * @version 1.0.0
 * @lastModifed 26-March-2018
 * @lastModifedBy Shakshi
 */

import ViewdTools from '../models/viewdTool.model'
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

/*
|--------------------------------------
| @services : Add Viewd tool
|--------------------------------------
*/
service.addViewedTool = async (req,res) =>{
    if(!req.body.userId){
        return res.send({success:false, code:500, msg:"userId is missing."});
    }
    if(!req.body.toolId){
        return res.send({success:false, code:500, msg:"toolId is missing."});
    }

    try{
        var data = await ViewdTools.getOneViewdTool({viewedBy:ObjectID(req.body.userId),toolId:ObjectID(req.body.toolId)});

        if(data){
            var dataToUpdate = {
                query:{toolId:req.body.toolId,viewedBy:req.body.userId},
                data:{$set:{updatedAt:new Date()}}
            }
            await ViewdTools.updateViewdTools(dataToUpdate);
        }else{
            var dataToAdd = ViewdTools({
                viewedBy:req.body.userId,
                toolId:req.body.toolId
            })
            await ViewdTools.addViewdTools(dataToAdd);
        }
        
        return res.send({success:true, code:200, msg:"Successfully added"});
    }catch(error){
        return res.send({success:true, code:500, msg:"Error in add viewed tool"})
    }

}



/*
|--------------------------------------
| @services : Update Viewd  tool
|--------------------------------------
*/
service.updateViewedTool = async (req,res) =>{
    if(!req.body.userId){
        return res.send({success:false, code:500, msg:"userId is missing."});
    }
    if(!req.body.toolId){
        return res.send({success:false, code:500, msg:"toolId is missing."});
    }
    try{
        var dataToUpdate = {
            query:{toolId:req.body.toolId,viewedBy:req.body.userId},
            data:{$set:{updatedAt:new Date()}}
        }
        var recentTools = await ViewdTools.updateViewdTools(dataToUpdate);
      
        return res.send({success:true, code:200, msg:"Successfully updated"})
    }catch(error){
       
        return res.send({success:true, code:500, msg:"Error in updatedation viewd tool"})
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
        var dataToFind = {
            query:{viewedBy:ObjectID(req.body.userId)}
        }
        var ViewdToolsData =await ViewdTools.getViewdTool(dataToFind);
        return res.send({success:true, code:200, msg:"Successfully viewd tool found",data:ViewdToolsData})
    }catch(error){
        
        return res.send({success:true, code:500, msg:"Error in getting v9iewd tool"})
    }

}


export default service;