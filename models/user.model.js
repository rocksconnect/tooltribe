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
    fullname:{type: String },
    address:{type: String },
    city:{type: String },
    state:{type: String },
    status:{type: String },
    zipCode:{type:String},
    phone:{type:String},
    trade:{type:String},
    companyId:{type:String},
    idProof:{type:String},
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
    createAt:{type: Date},
    updatedAt:{type: Date}
  }, {collection : 'user'});

  UserSchema.plugin(AutoIncrement.plugin,{model:'user',field:'userId',startAt:1,incrementBy:1});

let UserModel = mongoose.model('users',UserSchema);

UserModel.getAll = (dataToFind) => {
   return UserModel.aggregate([
    { $match: dataToFind.query},
    {
      $lookup:{
        from:"usertype",
        localField:"userTypeId", 
        foreignField:"userTypeId",
        as:"userType_docs"
      }

    },
    { 
      $unwind:"$userType_docs"
    },
    {
        $project:{
            clientId:1,
            userId:1,
            emailId: 1,
            name:1,
            userTypeId:1 ,           
            userType:"$userType_docs.userType",          
            status:1

        }
    }
   ]);
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
export default UserModel;
