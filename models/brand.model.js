/**
 * @file(IdProofType.model.js) All db service realted to trade  
 * @author Shakshi Pandey <shakshipandey11@gmail.com>
 * @version 1.0.0
 * @lastModifed 26-March-2018
 * @lastModifedBy Shakshi
 */
import mongoose from 'mongoose';
import AutoIncrement from "mongoose-auto-increment";
AutoIncrement.initialize(mongoose);

const brandSchema = mongoose.Schema({
  
    brandName:{type:String},
    brandId:{type:String},
    brandDescription:{type:String},
    status:{type:String},
    trash:{type:String},
    createAt:{type: Date,default:Date.now()},
    updatedAt:{type: Date,default:Date.now()}
  }, {collection : 'brand'});

brandSchema.plugin(AutoIncrement.plugin,{model:'brand',field:'brandId',startAt:1,incrementBy:1});

let brandModel = mongoose.model('brand',brandSchema);

brandModel.addBrand = (data) => {
    return data.save();
}

brandModel.getBrandList = (where) => {
	console.log(where);
	return brandModel.find(where.query);
}

brandModel.editBrand = (data)=>{
	console.log(data);
	return brandModel.update(data.query,data.data);
}


export default brandModel;
