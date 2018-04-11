import mongoose from 'mongoose';
import AutoIncrement from "mongoose-auto-increment";
AutoIncrement.initialize(mongoose);

const ViewdToolSchema = mongoose.Schema({   
    toolId:{type:String},
    viewedBy:{type:String},
    createdAt:{type: Date, default: Date.now},
    updatedAt:{type: Date, default: Date.now}
  }, {collection : 'viewdTool'});

  ViewdToolSchema.plugin(AutoIncrement.plugin,{model:'viewdTool',field:'viewdToolId',startAt:1,incrementBy:1});

let ViewdToolModel = mongoose.model('viewdTool',ViewdToolSchema);

ViewdToolModel.addViewdTools = (viewdToolsToAdd) => {
    return viewdToolsToAdd.save();
}
ViewdToolModel.updateViewdTools = (viewdToolsToUpdate) => {
    return ViewdToolModel.update(toolsToUpdate.query,toolsToUpdate.data);
}
ViewdToolModel.a1 = (userId) => {
    //console.log("viewdToolsTofind = ",viewdToolsTofind,viewdToolsTofind.query)
    return ViewdToolModel.find({"viewedBy":userId});
}
export default ViewdToolModel;