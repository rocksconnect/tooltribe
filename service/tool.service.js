/**
 * @file(user.service.js) All service realted to user  
 * @author Shakshi Pandey <shakshipandey11@gmail.com>
 * @version 1.0.0
 * @lastModifed 26-March-2018
 * @lastModifedBy Shakshi
 */

//import brand from '../models/brand.model'
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
 * @description [addTool Service]
 * @param  {[object]}
 * @return {[object]}
 */
service.addTool = async (req,res)=>{
	if(!req.body.brandName){
		return res.send({success:false, code:500, msg:"brandName is missing"});
	}
	if(!req.body.brandDescription){
		return res.send({success:false, code:500, msg:"brandDescription is missing"});
	}
}


/*
|--------------------------------------
| @services : addImage
|--------------------------------------
*/
service.addAccessoriesImage = async (req, res) => {
    if(req.files){
        
        var data = req.files;
        var array = [];

        for (var x in data) {
            console.log(data[x]);
            var imgRand = Date.now()+rand(24,24)+'.png';
            let idProofImage = data[x];
            var idProofImageUploaded = await idProofImage.mv(common.toolPath+imgRand);
            var insertdata = {
                            "name" : imgRand,
                            "pathName" : '/images/'+imgRand
                        };
            array.push(insertdata);
        }

        return res.send({success:false, code:400, msg:array});
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
    if(req.files){
        
        if(req.files.toolImage){

        	var imgRand = Date.now()+rand(24,24)+'.png';
            let toolImage = req.files.toolImage;
            var toolImageUploaded = await toolImage.mv(common.toolPath+imgRand);
            

        	return res.send({success:false, code:200, msg:'toolImageUploaded'});

        }else{
        	return res.send({success:false, code:400, msg:"Please upload files."});
        }
   
    }else{
        return res.send({success:false, code:400, msg:"Please upload files."});
    }
}

export default service;