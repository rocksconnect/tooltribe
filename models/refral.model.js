/**
 * @file(IdProofType.model.js) All db service realted to refral  
 * @author Shakshi Pandey <shakshipandey11@gmail.com>
 * @version 1.0.0
 * @lastModifed 26-March-2018
 * @lastModifedBy Shakshi
 */
import mongoose from 'mongoose';
import AutoIncrement from "mongoose-auto-increment";
AutoIncrement.initialize(mongoose);

const refralSchema = mongoose.Schema({
  	
   	refralContact:{type:Number},
   	refralBy:{type:Number},
   	isUsed:{type: Boolean, default: false},
	createdAt:{type: Date,default:Date.now()},
	updatedAt:{type: Date,default:Date.now()}
},{collection : 'refral'});

refralSchema.plugin(AutoIncrement.plugin,{model:'refral',field:'refralId',startAt:1,incrementBy:1});

let refralModel = mongoose.model('refral',refralSchema);

refralModel.addRefral = (data) => {
    return data.save();
}
export default refralModel;