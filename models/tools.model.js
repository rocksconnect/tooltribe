import common from '../core/message/common.msg.js'
import mongoose from 'mongoose';
import AutoIncrement from "mongoose-auto-increment";
AutoIncrement.initialize(mongoose);

const ToolSchema = mongoose.Schema({   
    toolId: {type: Number },
    userId: {type: mongoose.Schema.ObjectId ,required: true},
    toolName:{type: String,required: true },
    brandId:{type: mongoose.Schema.ObjectId ,required: true}, // brand from Admin
    categoryId:{type: mongoose.Schema.ObjectId,required: true }, // Categories from Admin
    modelNo:{type: String,required: true },
    toolSize:{type: String, default:'Small' }, //Small/Medium/Big
    toolPrice:{type: Number }, 
    year:{type: String },
    specifications:{type: String },
    description:{type: String },
    buyingOption:{type:String}, //{RENT,SELL,BOTH}
    rentAmount:{type:Number},
    sellingPrice:{type:Number},
    depositAmount:{type:Number},    
    shipment:{type:String,required: true}, // SELL/RENT/BOTH
    deliveryAvailable:{type:String}, // YES/NO
    pickupAvailable:{type:String}, // YES/NO
    deliveryAmount:{type:Number}, // Calculating from distance b/w pickup and deliver address
    toolProtection:{type:String}, // If they select yes then protection will be 10% of tool price
    toolProtectionPrice:{type:Number},
    hideTool : {type:String}, // if it is YES/NO then tool will not display to front
    activeAfter : {type:Date, default: Date.now}, // after this date tool will display to front, from lastdate + time
    toolLocation: {   // pickup address
        address:{type:String},
        latitude:{type:Number},
        longitude:{type:Number},
        city:{type: String},
        state:{type: String },
        country:{type: String },
        zipCode:{type:String}
    },
    ratings:{type:Number},
    rentedUser:{type:Number},
    distance:{type:String},
    toolAvailability:{
        from:{type:Date, default: Date.now},
        to:{type:Date, default: Date.now}
    },
    toolImages: [{title:{type:String},imgName:{type:String},imgPath:{type:String}, isDefault: {type:String}}],
    accessories: [{
        name:{type:String},
        description:{type:String},
        imgName:{type:String},
        imgPath:{type:String}
    }],
    toolStatus :{type:String, default: 'AVAILABLE'}, // {AVAILABLE: available for booking,BOOKED: Pre Booked for future,RENTED : already on rent} 
    
    createAt:{type: Date, default: Date.now},
    updatedAt:{type: Date, default: Date.now}
  }, {collection : 'tools'});

  ToolSchema.plugin(AutoIncrement.plugin,{model:'tools',field:'toolId',startAt:1,incrementBy:1});

let ToolModel = mongoose.model('tools',ToolSchema);



ToolModel.addTools = (toolsToAdd) => {
    return toolsToAdd.save();
}


ToolModel.getUserToolCount = (where) => {
    return ToolModel.find(where);
}



ToolModel.getDeatilsToolById = (toolToFind) => {
    console.log("toolToFind == ",toolToFind)
    return ToolModel.aggregate([
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
            $lookup:{
                from:"category",
                localField:"categoryId",
                foreignField:"_id",
                as:"categoryDocs"
            }

        },
        {
            $unwind:"$categoryDocs"
        },

        {
            $lookup:{
                from:"user",
                localField:"userId",
                foreignField:"_id",
                as:"userDocs"
            }
        },
        {
            $unwind:"$userDocs"
        },
        {
            $project:{
                toolId: 1,
                userId: 1,
                toolName:1,
                brandId:1,
                categoryId:1,
                modelNo:1,
                toolSize:1,
                toolPrice:1, 
                year:1,
                specifications:1,
                description:1,
                buyingOption:1, 
                rentAmount:1,
                sellingPrice:1,
                depositAmount:1,    
                shipment:1, 
                deliveryAvailable:1, 
                pickupAvailable:1,
                deliveryAmount:1, 
                toolProtection:1, 
                toolProtectionPrice:1,
                hideTool : 1,
                activeAfter : 1,
                toolLocation: 1,
                toolAvailability:1,
                toolImages:1,
                accessories: 1,
                toolStatus :1,
                brandName:"$brandDocs.brandName",
                brandDescription:"$brandDocs.brandDescription",
                category:"$categoryDocs.category",
                userId:"$userDocs._id",
                userName:"$userDocs.fullName",
                userEmail:"$userDocs.email",
                userProfileImg:"$userDocs.pathOfProfileImg"
            }
        }

    ]);
}

ToolModel.addAccessoriesImage = (objToUpdate) => {
    return ToolModel.update(objToUpdate.query,objToUpdate.data);
}

ToolModel.getToolList = (dataToFind)=>{
    var query = {};
    if(dataToFind){
        query = dataToFind.query;
    }
    return ToolModel.find(query).lean().sort({createAt:-1});
}

ToolModel.getRecentViewToolData = ()=>{
    return ToolModel.find().lean().sort({updatedAt:-1});
}

ToolModel.getCategoryToolList = (param)=>{
    

    return  ToolModel.find(param.query).lean().sort({createAt:-1}); 
    
    //let page = common.pageLimit * Math.max(0, param.page);
    //return  ToolModel.find(param.query).skip(page).limit(common.pageLimit).lean().sort({createAt:-1}); 

}


ToolModel.getCategoryToolCount = (where)=>{
    return ToolModel.count(where);
}


ToolModel.hideTool = (data)=>{
    return ToolModel.update(data.query,data.data);
    
}

ToolModel.getUserTool = (where) => {
    return ToolModel.find(where.query);
}

ToolModel.getSearchTool = (where) => {
    return ToolModel.find(where.query,{toolName:1});
}


export default ToolModel;