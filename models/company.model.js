/**
 * @file(Company.model.js) All db service realted to trade  
 * @author Shakshi Pandey <shakshipandey11@gmail.com>
 * @version 1.0.0
 * @lastModifed 26-March-2018
 * @lastModifedBy Shakshi
 */
import mongoose from 'mongoose';
import AutoIncrement from "mongoose-auto-increment";
AutoIncrement.initialize(mongoose);

const CompanySchema = mongoose.Schema({
  
    companyName:{type:String,index:{unique:true}},
    status:{type:String},
    trash:{type:String},
    createAt:{type: Date,default:Date.now()},
    updatedAt:{type: Date,default:Date.now()}
  }, {collection : 'company'});

CompanySchema.plugin(AutoIncrement.plugin,{model:'company',field:'companyId',startAt:1,incrementBy:1});

let CompanyModel = mongoose.model('company',CompanySchema);

CompanyModel.addCompany = (CompanyToAdd) => {
    return CompanyToAdd.save();
}
CompanyModel.findCompany = (CompanyToFind) =>{
	return CompanyModel.find(CompanyToFind.query,CompanyToFind.projection);
}
CompanyModel.editCompany =(CompanyToEdit) =>{
	return CompanyModel.update(CompanyToEdit.query,CompanyToEdit.data);
}
export default CompanyModel;
