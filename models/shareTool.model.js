import mongoose from 'mongoose';
import AutoIncrement from "mongoose-auto-increment";
AutoIncrement.initialize(mongoose);

const ShareToolSchema = mongoose.Schema({   
    toolId:{type:String},
    userId:{type:String},
    shareType:{type:String},
    createdAt:{type: Date, default: Date.now},
    updatedAt:{type: Date, default: Date.now}
  }, {collection : 'shareTool'});

  ShareToolSchema.plugin(AutoIncrement.plugin,{model:'shareTool',field:'shareToolId',startAt:1,incrementBy:1});

let ShareToolModel = mongoose.model('shareTool',ShareToolSchema);

ShareToolModel.getShareTool = (dataToFind) => {
   
    return ShareToolModel.find(dataToFind.query).sort({updatedAt:-1});
}
ShareToolModel.addShareTools = (shareToolsToAdd) => {
    return shareToolsToAdd.save();
}
ShareToolModel.updateShareTools = (shareToolsToUpdate) => {

    return ShareToolModel.update(shareToolsToUpdate.query,shareToolsToUpdate.data);
}

export default ShareToolModel;