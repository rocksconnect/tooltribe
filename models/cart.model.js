import mongoose from 'mongoose';
import AutoIncrement from "mongoose-auto-increment";
AutoIncrement.initialize(mongoose);

const CartSchema = mongoose.Schema({   
    cartId: {type: Number },
    toolId: {type: String },
    orderNo:{type:String},
    toolName:{type:String},
    transactionType:{type:String},
    toolRental:{type:Number},
    toolPrice:{type:Number},
    rentalDays:{type:Number},
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
    shipmentType:{type:String},
    createAt:{type: Date, default: Date.now},
    updatedAt:{type: Date, default: Date.now}
  }, {collection : 'cart'});

  CartSchema.plugin(AutoIncrement.plugin,{model:'cart',field:'cartId',startAt:1,incrementBy:1});

let CartModel = mongoose.model('cart',CartSchema);



export default CartModel;
