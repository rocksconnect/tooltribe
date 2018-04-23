import mongoose from 'mongoose';
import AutoIncrement from "mongoose-auto-increment";
AutoIncrement.initialize(mongoose);

const UserSchema = mongoose.Schema({
  
    deviceId:{type:String},
    deviceToken:{type:String},
    latitude:{type:String},
    longitude:{type:String},
    deviceType:{type:String},
    token:{type:String},
    salt:{type:String},
    temp_str:{type:String},
    userId: {type: Number },
    email: {type: String , index:{unique:true} },
    password: {type: String },
    fullName:{type: String ,required: true},
    address:{type: String },
    city:{type: String },
    state:{type: String },
    status:{type: String },
    zipCode:{type:String},
    phone:{type:String},
    about:{type:String},
    trade:{type: mongoose.Schema.ObjectId},
    companyId:{type: mongoose.Schema.ObjectId},
    idProof:{type: mongoose.Schema.ObjectId},
    idProofNubmer:{type:String},
    signature:{type:String},
    imgPath:{type:String},
    googleId: { type: String }, 
    facebookId: { type: String },
    userType:{type:String},
    socialType:{type:String},
    pathOfIdProof:{type:String},
    pathOfProfileImg :{type:String},
    termsOfServices:{type:String},
    privacyPolicy:{type:String},
    refralCode:{type:String},
    myRefralCode:{type:String},
    deliveryAddress: [{
        address:{type:String},
        isDefault:{type:String}, // 1/0
        latitude:{type:String},
        longitude:{type:String},
        city:{type: String },
        state:{type: String },
        country:{type: String },
        zipCode:{type:String}
    }],
    adminAssignedRole:{type: String },
    createAt:{type: Date, default: Date.now},
    updatedAt:{type: Date, default: Date.now}
  }, {collection : 'user'});

  UserSchema.plugin(AutoIncrement.plugin,{model:'user',field:'userId',startAt:1,incrementBy:1});

let UserModel = mongoose.model('users',UserSchema);

UserModel.getAll = (dataToFind) => {
   // return UserModel.aggregate([
   //  { $match: dataToFind.query},
   //  {
   //    $lookup:{
   //      from:"usertype",
   //      localField:"userTypeId", 
   //      foreignField:"userTypeId",
   //      as:"userType_docs"
   //    }

   //  },
   //  { 
   //    $unwind:"$userType_docs"
   //  },
   //  {
   //      $project:{
   //          clientId:1,
   //          userId:1,
   //          emailId: 1,
   //          name:1,
   //          userTypeId:1 ,           
   //          userType:"$userType_docs.userType",          
   //          status:1

   //      }
   //  }
   // ]);
   return UserModel.find(dataToFind.query,dataToFind.projection);
}
UserModel.getOne = (userToFind) => {
    console.log(userToFind," = userToFind")
    return UserModel.findOne(userToFind);
}
 
UserModel.addUser = (userToAdd) => {
    return userToAdd.save();
}

UserModel.editUser = (objToUpdate) =>{
    console.log(objToUpdate,"8888");
    return UserModel.update(objToUpdate.query,objToUpdate.data);
}


UserModel.removeUser = (userId) => {
    return UserModel.remove({userId: userId});
}

UserModel.getCount = (userToCount)=>{
    
    return UserModel.find(userToCount.query).count();
}

/**
 * [Service is responsible for getting selected detail of user or client or admin]
 * @param  {[type]} user [user object contains username and password]
 * @return {[type]}      [object]
 */
UserModel.login = (user) =>{
    return UserModel.findOne({email:user.email},{});
}

UserModel.userLogin = (where) =>{
    console.log(where);
    return UserModel.findOne(where,{});
}

UserModel.forgetPassword = (user)=>{
    return UserModel.find({email:user.email});
}
UserModel.forgetPasswordReset=(user)=>{
    return UserModel.find({email:user.email});
}
UserModel.changePassword=(user)=>{
    return UserModel.find({emailId:user.emailId});
}

UserModel.findOneUpdate = (userObj)=>{
    return UserModel.findOneAndUpdate(userObj.query,userObj.data, {new: true})
}

UserModel.addDeliveryAddress = (userObj)=>{
    return UserModel.findOneAndUpdate(userObj.query,userObj.data, {new: true});
}

UserModel.deletedDeliveryAddress = (userObj)=>{
  return UserModel.update(userObj.query,userObj.data, {new: true});
}

UserModel.getUserProfile = (where) => {
  return UserModel.findOne(where,{fullName:1,email:1,phone:1,address:1,city:1,state:1,zipCode:1,deviceId:1,deviceType:1,deviceToken:1,longitude:1,latitude:1,pathOfProfileImg:1,deliveryAddress:1}).lean();

  return UserModel.aggregate([
        {
            $match:where
        },
        {
            $lookup:{
                from:"trade",
                localField:"trade",
                foreignField:"_id",
                as:"tradeDocs"
            }
        },
        {
            $unwind : "$tradeDocs"
        },
        {
            $project:{fullName:1,email:1,phone:1,address:1,city:1,state:1,zipCode:1,deviceId:1,deviceType:1,deviceToken:1,longitude:1,latitude:1,pathOfProfileImg:1,deliveryAddress:1,tradeName:"$tradeDocs.trade"}
        }
    ]);
  
}


export default UserModel;
