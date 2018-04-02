import mongoose from 'mongoose';
import AutoIncrement from "mongoose-auto-increment";
AutoIncrement.initialize(mongoose);

const ToolSchema = mongoose.Schema({   
    userId: {type: Number },
    toolName:{type: String },
    brandId:{type: String }, // brand from Admin
    categoryId:{type: String }, // Categories from Admin
    modelNo:{type: String },
    year:{type: String },
    specifications:{type: String },
    description:{type: String },
    buyingOption:{type:String}, //{RENT,SELL,BOTH}
    rentAmount:{type:Number},
    sellingPrice:{type:Number},
    depositAmount:{type:Number},    
    shipment:{type:String}, // SELL/RENT/BOTH
    deliveryAvailable:{type:String}, // YES/NO
    pickupAvailable:{type:String}, // YES/NO
    deliveryAmount:{type:Number}, // Calculating from distance b/w pickup and deliver address
    toolProtection:{type:String}, // If they select yes then protection will be 10% of tool price
    toolProtectionPrice:{type:Number},
    hideTool : {type:String}, // if it is YES/NO then tool will not display to front
    activeAfter : {type:Date}, // after this date tool will display to front, from lastdate + time
    toolLocation: {   // pickup address
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
    toolImages: [{title:{type:String},imgName:{type:String},path:{type:String}, isDefault: {type:String}}],
    accessories: [{
        name:{type:String},
        description:{type:String},
        imgName:{type:String},
        imgPath:{type:String}
        }]
    }],
    toolStatus :{type:String}, // {AVAILABLE: available for booking,BOOKED: Pre Booked for future,RENTED : already on rent} 
    createAt:{type: Date},
    updatedAt:{type: Date}
  }, {collection : 'tools'});

  ToolSchema.plugin(AutoIncrement.plugin,{model:'user',field:'userId',startAt:1,incrementBy:1});

let ToolModel = mongoose.model('users',ToolSchema);



export default ToolModel;
