/**
 * @file(category.model.js) All db service realted to trade  
 * @author Shakshi Pandey <shakshipandey11@gmail.com>
 * @version 1.0.0
 * @lastModifed 26-March-2018
 * @lastModifedBy Shakshi
 */
import mongoose from 'mongoose';
import AutoIncrement from "mongoose-auto-increment";
AutoIncrement.initialize(mongoose);

const CategorySchema = mongoose.Schema({
  
    category:{type:String},
    categoryId:{type:String},
    status:{type:String},
    trash:{type:String},
    createAt:{type: Date,default:Date.now()},
    updatedAt:{type: Date,default:Date.now()}
  }, {collection : 'category'});

CategorySchema.plugin(AutoIncrement.plugin,{model:'category',field:'categoryId',startAt:1,incrementBy:1});

let CategoryModel = mongoose.model('category',CategorySchema);

CategoryModel.addCategory = (categoryToAdd) => {
    return categoryToAdd.save();
}
CategoryModel.findCategory = (categoryToFind) =>{
	return CategoryModel.find(categoryToFind.query,categoryToFind.projection);
}
CategoryModel.editCategory =(categoryToEdit) =>{
	return CategoryModel.update(categoryToEdit.query,categoryToEdit.data);
}
export default CategoryModel;
