/**
 * @file(user.service.js) All service realted to user  
 * @author Shakshi Pandey <shakshipandey11@gmail.com>
 * @version 1.0.0
 * @lastModifed 26-March-2018
 * @lastModifedBy Shakshi
 */

import Category from '../models/category.model'
import logger from '../core/logger/app.logger'
import successMsg from '../core/message/success.msg'
import msg from '../core/message/error.msg.js'
import utility from '../core/utility.js' 





/**
 * [service is a object ]
 * @type {Object}
 */

const service = {};

/**
 * @description [calculation before add Category to db and after adding Category ]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */

service.addCategory = async (req,res)=>{
	
	
	if(!req.body.category){
		return res.send({success:false, code:500, msg:"Category is missing"});
	}
	if(!req.body.status){
		return res.send({success:false, code:500, msg:"Status is missing"});
	}
	if(!req.body.desc){
		return res.send({success:false, code:500, msg:"Description is missing"});
	}
	try{
		console.log(req.files.categoryImage,"req.files.categoryImage")
		if (!req.files)
		    return res.status(400).send('No categories files were uploaded.');

		var categoryToAdd = Category({
			category:req.body.category,
			status:req.body.status,
			desc:req.body.desc,
			fileName:req.files.categoryImage.name,
			path:'/images/'+req.files.categoryImage.name,
			trash:false
		})
		
		 
		// The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
		let sampleFile = req.files.categoryImage;
		var fileUploaded = await sampleFile.mv('./public/images/'+req.files.categoryImage.name);
		 
		var savedCategory = await Category.addCategory(categoryToAdd);
		if(savedCategory){
			return res.send({success:true, code:200, msg:"Category added succesfully"});
		}else{
			return res.send({success:false, code:500, msg:"Error in adding Category"});
		}
	}catch(error){
		console.log(error,"errorerrorerror")
		return res.send({success:false, code:500, msg:"Error in adding Category", err:error});
	}
}

/**
 * @description [calculation before find Category to db and after find Category ]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */

service.getCategory = async (req,res)=>{
	
	try{
		var categoryToFind = {
			query:{trash:false},
			projection:{trash:0}
		}
		var AllCategory = await Category.findCategory(categoryToFind);
		if(AllCategory){
			return res.send({success:true, code:200, msg:"Category found succesfully", data:AllCategory});
		}else{
			return res.send({success:false, code:500, msg:"Error in finding Category"});
		}
	}catch(error){
		return res.send({success:false, code:500, msg:"Error in finding Category", err:error});
	}
}

/**
 * @description [calculation before remove Category to db and after remove Category ]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */

service.removeCategory = async (req,res)=>{
	if(!req.body._id){
		return res.send({success:false, code:500, msg:"_id is missing"})
	}
	try{
		var categoryToEdit = {
			query:{_id:req.body._id},
			data:{$set:{trash:true}}
		}
		var RemovedCategory = await Category.editCategory(categoryToEdit);
		if(RemovedCategory){
			return res.send({success:true, code:200, msg:"Category deleted succesfully", data:RemovedCategory});
		}else{
			return res.send({success:false, code:500, msg:"Error in deleteing Category"});
		}
	}catch(error){
		return res.send({success:false, code:500, msg:"Error in deleteing Category", err:error});
	}
}

/**
 * @description [calculation before edit Category to db and after edit Category ]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */

service.updateCategory = async (req,res)=>{
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
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
	let sampleFile = req.files.categoryImage;
	var fileUploaded = await sampleFile.mv('./public/images/'+req.files.categoryImage.name);

	if(req.files && req.files.categoryImage){
		dataToEdit.fileName=req.files.categoryImage.name;
		dataToEdit.path='/images/'+req.files.categoryImage.name;
	}

    console.log("step 2",dataToEdit)

    if(!dataToEdit){
        return res.send({success:false,code:500, msg:"Data is missing"})
    }
	try{
		var categoryToEdit = {
			query:{_id:req.body._id},
			data:{$set:dataToEdit}
		}
		var UpdatedCategory = await Category.editCategory(categoryToEdit);
		if(UpdatedCategory){
			return res.send({success:true, code:200, msg:"Category updated succesfully", data:UpdatedCategory});
		}else{
			return res.send({success:false, code:500, msg:"Error in updating Category"});
		}
	}catch(error){
		return res.send({success:false, code:500, msg:"Error in updating Category", err:error});
	}
}

export default service;
