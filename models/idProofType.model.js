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

const IdProofTypeSchema = mongoose.Schema({
  
    IdProofType:{type:String},
    IdProofTypeId:{type:String},
    status:{type:String},
    trash:{type:String},
    createAt:{type: Date,default:Date.now()},
    updatedAt:{type: Date,default:Date.now()}
  }, {collection : 'idProofType'});

IdProofTypeSchema.plugin(AutoIncrement.plugin,{model:'idProofType',field:'IdProofTypeId',startAt:1,incrementBy:1});

let IdProofTypeModel = mongoose.model('idProofType',IdProofTypeSchema);

IdProofTypeModel.addIdProofType = (IdProofTypeToAdd) => {
    return IdProofTypeToAdd.save();
}
IdProofTypeModel.findIdProofType = (IdProofTypeToFind) =>{
	return IdProofTypeModel.find(IdProofTypeToFind.query,IdProofTypeToFind.projection);
}
IdProofTypeModel.editIdProofType =(IdProofTypeToEdit) =>{
	return IdProofTypeModel.update(IdProofTypeToEdit.query,IdProofTypeToEdit.data);
}
export default IdProofTypeModel;
