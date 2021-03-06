/**
 * @file(usertype.service.js) All service realted to asset
 * @author Shakshi Pandey <shakshi.kumari@limitlessmobile.com>
 * @version 1.0.0
 * @lastModifed 15-Jan-2018
 * @lastModifedBy Deepak
 */


import userTypeConfig from '../models/usertype.model'
import logger from '../core/logger/app.logger'
import successMsg from '../core/message/success.msg'
import utility from '../core/utility.js'
import msg from '../core/message/error.msg'


/**
 * [service is a object ]
 * @type {Object}
 */
const service = {};


/**
 * @description [calculation before add Device to db and after adding asset ]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */
service.addUsertype = async (req, res) => {
    if(!req.body.userType){
        res.send({"success":false, "code":500, "msg":msg.userType});
    }
    
    let userTypeToAdd = userTypeConfig({
        userType: req.body.userType,
        status: req.body.status || "Active",
        createAt: new Date()
    });
    try {
        const savedUsertype = await userTypeConfig.addUsertype(userTypeToAdd);
        logger.info('Adding user type ...');
        res.send({"success":true, "code":200, "msg":"user Type added successfully!!","data":savedUsertype});
    }
    catch(err) {
        logger.error('Error in getting Usertype- ' + err);
        res.send({"success":false, "code":500, "msg":msg.addUserType,"err":err});
    }
}





/**
 * @description [with all the calculation before getAll function of model and after getAll]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */
service.getAll = async (req,res) =>{
    try{
        const usertype = await userTypeConfig.getAllData();
        logger.info('sending all usertype...');
		res.send({"success":true, "code":200, "msg":successMsg.allUserType, "data":usertype});
	}catch(err){
		logger.error('Error in getting usertype- ' + err);
		res.send({"success":false, "code":500, "msg":msg.getUserType, "err":err});
	}
}





/**
 * @description [calculation before update Device to db ]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */
service.editUsertype = async (req, res) => {
    if(!req.body.userTypeId){
        res.send({"success":false, "code":500, "msg":"userTypeId is missing"});
    }
    if(!req.body.userType){
        res.send({"success":false, "code":500, "msg":msg.userType});
    }
    

    let userTypeToUpdate = {
        query:{userTypeId:req.body.userTypeId},

        data:{
            $set:{
                userType: req.body.userType,
                status: req.body.status || "Active",
                updatedAt: new Date()
            }
        }
    };
    try {
        const savedUsertype = await userTypeConfig.editUsertype(userTypeToUpdate);
        logger.info('Updating user type ...');
        res.send({"success":true, "code":200, "msg":"user Type update succesfully","data":savedUsertype});
    }
    catch(err) {
        logger.error('Error in updating Usertype- ' + err);
        res.send({"success":false, "code":500, "msg":msg.editUserType,"err":err});
    }
}

/**
 * @description [calculation before delete Device to db and after delete Device]
 * @param  {[type]}
 * @param  {[type]}
 * @return {[type]}
 */
service.deleteUsertype = async (req, res) => {
    if(!req.body._id){
        res.send({"success":false, "code":500, "msg":msg._id});
    }
    let usertypeToDelete = req.body._id;
    
    console.log(usertypeToDelete);
    try{
        const removedUsertype = await userTypeConfig.removedUsertype(usertypeToDelete);
        logger.info('Deleted user type- ' + removedUsertype);
        res.send({"success":true, "code":200, "msg":successMsg.deleteUsertype,"data":removedUsertype});
    }
    catch(err) {
        logger.error('Failed to delete usertype- ' + err);
        res.send({"success":false, "code":500, "msg":msg.deleteUserType,"err":err});
    }
}

export default service;
