/**
 * @file(category.model.js) All db service realted to trade  
 * @author Shakshi Pandey <shakshipandey11@gmail.com>
 * @version 1.0.0
 * @lastModifed 26-March-2018
 * @lastModifedBy Shakshi
 */
import common from '../core/message/common.msg.js'
import mongoose from 'mongoose';
import AutoIncrement from "mongoose-auto-increment";
AutoIncrement.initialize(mongoose);

const CategorySchema = mongoose.Schema({
  
    category:{type:String},
    categoryId:{type:String},
    status:{type:String},
    trash:{type:String},
    desc:{type:String},
    fileName:{type:String},
    bufferData: {type:String},
    path: {type:String},
    createAt:{type: Date,default:Date.now()},
    updatedAt:{type: Date,default:Date.now()}
  }, {collection : 'category'});

CategorySchema.plugin(AutoIncrement.plugin,{model:'category',field:'categoryId',startAt:1,incrementBy:1});

let CategoryModel = mongoose.model('category',CategorySchema);

CategoryModel.addCategory = (categoryToAdd) => {
    return categoryToAdd.save();
}

CategoryModel.findCategory = (categoryToFind) =>{
    //return CategoryModel.find(categoryToFind.query,categoryToFind.projection).lean();

    let page = common.pageLimit * Math.max(0, categoryToFind.page);
    return CategoryModel.aggregate(
        [
            {$match:categoryToFind.query},
            {
            $lookup:
                {
                    from:"tools",
                    localField:"_id",
                    foreignField:"categoryId",
                    as:"tool_docs"
                }
            },
            {
                $project:{
                    category:1,
                    categoryId:1,
                    status:1,
                    trash:1,
                    desc:1,
                    fileName:1,                  
                    path: 1,
                    createAt:1,
                    updatedAt:1,
                    toolCount:{$size:"$tool_docs"}
                }
            }
        ]
    ).skip(page).limit(common.pageLimit)
}


CategoryModel.findHomeCategory = (categoryToFind) =>{
    //return CategoryModel.find(categoryToFind.query,categoryToFind.projection).lean();

    
    return CategoryModel.aggregate(
        [
            {$match:categoryToFind.query},
            {
            $lookup:
                {
                    from:"tools",
                    localField:"_id",
                    foreignField:"categoryId",
                    as:"tool_docs"
                }
            },
            {
                $project:{
                    category:1,
                    categoryId:1,
                    status:1,
                    trash:1,
                    desc:1,
                    fileName:1,                  
                    path: 1,
                    createAt:1,
                    updatedAt:1,
                    toolCount:{$size:"$tool_docs"}
                }
            }
        ]
    ).limit(common.pageLimit)
}

CategoryModel.getCategoryList =() =>{
    return CategoryModel.find();
}

CategoryModel.editCategory =(categoryToEdit) =>{
	return CategoryModel.update(categoryToEdit.query,categoryToEdit.data);
}
export default CategoryModel;
