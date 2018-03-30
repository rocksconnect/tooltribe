import mongoose from 'mongoose';
import AutoIncrement from "mongoose-auto-increment";
AutoIncrement.initialize(mongoose);

const ToolSchema = mongoose.Schema({
    
    userId: {type: Number },
    toolName:{type: String },
    brand:{type: String }, // Categories from Admin
    modelNo:{type: String },
    year:{type: String },
    specifications:{type: String },
    description:{type: String },
    buyingOption:{type:String},
    rentAmount:{type:Number},
    sellingPrice:{type:Number},
    depositAmount:{type:Number},
    deliveryAvailable:{type:String},
    deliveryAmount:{type:Number},
    toolProtection:{type:String}, // If they select yes then protection will be 10% of tool price
    toolProtectionPrice:{type:Number},
    hideTool : {type:String}, // if it is YES/NO then tool will not display to front
    activeAfter : {type:Date}, // after this date tool will display to front, from lastdate + time
    toolLocation: {
        address:{type:String},
        latitude:{type:String},
        longitude:{type:String},
        city:{type: String },
        state:{type: String },
        country:{type: String },
        zipCode:{type:String}
    },
    toolAvailability:{
        from:{type:Date},
        to:{type:Date}
    },
    toolImages: [{title:{type:String},imgName:{type:String},path:{type:String}}],
    accessories: [{
        name:{type:String},
        description:{type:String},
        accessoriesImages: [{
            title:{type:String},
            imgName:{type:String},
            path:{type:String}
        }]
    }],
    toolStatus :{type:String}, //ACTIVE/INACTIVE   
    createAt:{type: Date},
    updatedAt:{type: Date}
  }, {collection : 'tools'});

  ToolSchema.plugin(AutoIncrement.plugin,{model:'user',field:'userId',startAt:1,incrementBy:1});

let ToolModel = mongoose.model('users',ToolSchema);



export default ToolModel;
