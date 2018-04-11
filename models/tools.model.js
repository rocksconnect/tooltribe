import mongoose from 'mongoose';
import AutoIncrement from "mongoose-auto-increment";
AutoIncrement.initialize(mongoose);

const ToolSchema = mongoose.Schema({   
    toolId: {type: Number },
    userId: {type: String },
    toolName:{type: String,required: true },
    brandId:{type: String ,required: true}, // brand from Admin
    categoryId:{type: String,required: true }, // Categories from Admin
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
        latitude:{type:String},
        longitude:{type:String},
        city:{type: String},
        state:{type: String },
        country:{type: String },
        zipCode:{type:String}
    },
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

ToolModel.addAccessoriesImage = (objToUpdate) => {
    return ToolModel.update(objToUpdate.query,objToUpdate.data);
}

ToolModel.getToolList = (dataToFind)=>{
    var query = {};
    if(dataToFind){
        query = dataToFind.query;
    }
    return ToolModel.find(query).sort({createAt:-1});
}



ToolModel.getCategoryToolList = (param)=>{
    console.log(param.page);
    let page = 10 * Math.max(0, param.page);
    return  ToolModel.find({categoryId:param.categoryId}).skip(page).limit(3).lean().sort({createAt:-1});; 

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


export default ToolModel;
