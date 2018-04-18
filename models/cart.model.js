import mongoose from 'mongoose';
import AutoIncrement from "mongoose-auto-increment";
AutoIncrement.initialize(mongoose);

const CartSchema = mongoose.Schema({   
    cartId: {type: Number },
    toolId: {type: mongoose.Schema.ObjectId ,required: true},
    userId: {type: mongoose.Schema.ObjectId ,required: true},
    deviceId: {type: String},
    toolName:{type:String},
    poNumber:{type:String},
    transactionType:{type:String}, // {BUY/RENT}    
    shipmentType:{type:String}, // {PICKUP/DELIVERY}    
    toolRental:{type:Number},
    toolPrice:{type:Number},
    rentalDays:{type:Number},
    
    referalCode:{type:String}, 
    handlingCharges:{type:Number},
    deliveryCharges:{type:Number},
    depositAmount:{type:Number},
    travelTimeCalculate:{type:Number},
    deliveryAddressId:{type:String},
    pickupAddressId:{type:String},

    deliveryAddress:{
        address:{type:String},
        latitude:{type:String},
        longitude:{type:String},
        city:{type: String },
        state:{type: String },
        country:{type: String },
        zipCode:{type:String}
    },
    pickupAddress:{
        address:{type:String},
        latitude:{type:String},
        longitude:{type:String},
        city:{type: String },
        state:{type: String },
        country:{type: String },
        zipCode:{type:String}
    },
    createAt:{type: Date, default: Date.now},
    updatedAt:{type: Date, default: Date.now}
  }, {collection : 'cart'});

  CartSchema.plugin(AutoIncrement.plugin,{model:'cart',field:'cartId',startAt:1,incrementBy:1});

let CartModel = mongoose.model('cart',CartSchema);



export default CartModel;
