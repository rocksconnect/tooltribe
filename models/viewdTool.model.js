import mongoose from 'mongoose';
import AutoIncrement from "mongoose-auto-increment";
AutoIncrement.initialize(mongoose);

const ViewdToolSchema = mongoose.Schema({   
    toolId:{type: mongoose.Schema.ObjectId ,required: true},
    viewedBy:{type: mongoose.Schema.ObjectId ,required: true},
    createdAt:{type: Date, default: Date.now},
    updatedAt:{type: Date, default: Date.now}
  }, {collection : 'viewdTool'});

  ViewdToolSchema.plugin(AutoIncrement.plugin,{model:'viewdTool',field:'viewdToolId',startAt:1,incrementBy:1});

let ViewdToolModel = mongoose.model('viewdTool',ViewdToolSchema);

ViewdToolModel.getOneViewdTool = (dataToFind) => {
    return ViewdToolModel.findOne(dataToFind,{'_id':1}).sort({updatedAt:-1});
}



ViewdToolModel.getViewdTool = (dataToFind) => {
    //return ViewdToolModel.find(dataToFind.query,{'_id':1}).sort({updatedAt:-1});

    console.log(dataToFind.query)
    return ViewdToolModel.aggregate([
	    {
            $match:dataToFind.query
        },
	    {
            $lookup:{
                from:"tools",
                localField:"toolId",
                foreignField:"_id",
                as:"toolIdDocs"
            }
        },
        {
            $unwind:"$toolIdDocs"
        },
        {
            $project:{
                _id:0,
                _id:"$toolIdDocs._id",
                userId:"$toolIdDocs.userId",
                toolName:"$toolIdDocs.toolName",
                modelNo:"$toolIdDocs.modelNo",
                year:"$toolIdDocs.year",
                specifications:"$toolIdDocs.specifications",
                description:"$toolIdDocs.description",
                toolPrice:"$toolIdDocs.toolPrice",
                shipment:"$toolIdDocs.shipment",
                buyingOption:"$toolIdDocs.buyingOption",
                rentAmount:"$toolIdDocs.rentAmount",
                sellingPrice:"$toolIdDocs.sellingPrice",
                depositAmount:"$toolIdDocs.depositAmount",
                deliveryAvailable:"$toolIdDocs.deliveryAvailable",
                pickupAvailable:"$toolIdDocs.pickupAvailable",
                deliveryAmount:"$toolIdDocs.deliveryAmount",
                toolProtection:"$toolIdDocs.toolProtection",
                toolProtectionPrice:"$toolIdDocs.toolProtectionPrice",
                hideTool:"$toolIdDocs.hideTool",
                updatedAt:"$toolIdDocs.updatedAt",
                createAt:"$toolIdDocs.createAt",
                toolStatus:"$toolIdDocs.toolStatus",
                accessories:"$toolIdDocs.accessories",
                toolImages:"$toolIdDocs.toolImages",
                toolAvailability:"$toolIdDocs.toolAvailability",
                toolLocation:"$toolIdDocs.toolLocation",
                activeAfter:"$toolIdDocs.activeAfter",
                toolSize:"$toolIdDocs.toolSize"
            }
        }
    ]);


    /*return ToolModel.aggregate([
        {
            $match:toolToFind.query
        },
        {
            $lookup:{
                from:"brand",
                localField:"brandId",
                foreignField:"_id",
                as:"brandDocs"
            }
        },
        {
            $unwind:"$brandDocs"
        },
         {
            $project:{
                accessories: 1,
                toolStatus :1,
                rating:"3",
                brandName:"$brandDocs.brandName",
            }
        }
    ]);*/
}

ViewdToolModel.addViewdTools = (viewdToolsToAdd) => {
    return viewdToolsToAdd.save();
}

ViewdToolModel.updateViewdTools = (viewdToolsToUpdate) => {

    return ViewdToolModel.update(viewdToolsToUpdate.query,viewdToolsToUpdate.data);
}

export default ViewdToolModel;