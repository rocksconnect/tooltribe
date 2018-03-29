/**
 * @file(user.service.js) All service realted to user  
 * @author Shakshi Pandey <shakshi.kumari@limitlessmobile.com>
 * @version 1.0.0
 * @lastModifed 5-Feb-2018
 * @lastModifedBy Shakshi
 */

import User from '../models/user.model'
import logger from '../core/logger/app.logger'
import successMsg from '../core/message/success.msg'
import msg from '../core/message/error.msg.js'
import utility from '../core/utility.js' 
import  crypto from 'crypto'
import jwt from 'jsonwebtoken'
import nm from 'nodemailer'
import rand from 'csprng'




/**
 * [service is a object ]
 * @type {Object}
 */

const service = {};

/**
 * @description [with all the calculation before getAll function of model and after getAll]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */

service.getAll = async (req,res) =>{
    //console.log("hiiiiii");
    if(!req.query._id){
       return res.send({"success":false,"code":"500","msg":msg.clientId});
    }
    let clientId = utility.removeQuotationMarks(req.query.clientId);
	try{
		let dataToFind = {
			query:{_id:req.query._id}
		};
		const user = await User.getAll(dataToFind);
        logger.info('sending all user...');
       //console.log(user);
		res.send({success:true, code:200, msg:successMsg.allUser, data:user});
	}catch(err){
		logger.error('Error in getting user- ' + err);
		res.send({success:false, code:500, msg:msg.getUser, err:err});
	}
}

/**
 * @description  [Get one user details from db]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description] 
 * @return {[type]}     [description]
 */
service.getOne=async(req,res)=>{
    let userToFind={
        userId:req.query.userId}
    console.log(req.query.userId);
 
 try{
    
     const getOneUser=await User.getOne(userToFind);
     logger.info('get one user-' +getOneUser);
     res.send({"success":true,"code":"200","msg":successMsg.getOneUser,"data":getOneUser});
 }
 catch(err){
     logger.error('Failed to get user- ' + err);
     res.send({"success":false, "code":"500", "msg":msg.getUser,"err":err});

 }

}

/**
 * @description [calculation before add user to db and after adding users ]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */
service.addUser = async (req, res) => {
    
    if(!req.body.email){
      return res.send({success:false, code:500, msg:"Email is missing"})
    }
    if(!req.body.deviceId){
      return res.send({success:false, code:500, msg:"deviceId is missing"})
    }
    if(!req.body.deviceToken){
      return res.send({success:false, code:500, msg:"deviceToken is missing"})
    }
    if(!req.body.deviceType){
      return res.send({success:false, code:500, msg:"deviceType is missing"})
    } 
    if(!req.body.latitude){
      return res.send({success:false, code:500, msg:"latitude is missing"})
    }
    if(!req.body.longitude){
      return res.send({success:false, code:500, msg:"longitude is missing"})
    }
    if(!req.body.password){
      return res.send({success:false, code:500, msg:"Password is missing"})
    }
    if(!req.body.address){
      return res.send({success:false, code:500, msg:"Address is missing"})
    }
    if(!req.body.city){
      return res.send({success:false, code:500, msg:"City is missing"})
    }
    if(!req.body.state){
      return res.send({success:false, code:500, msg:"State is missing"})
    }
    if(!req.body.zipCode){
      return res.send({success:false, code:500, msg:"ZipCode is missing"})
    }
    if(!req.body.phone){
      return res.send({success:false, code:500, msg:"Phone is missing"})
    }
    if(!req.body.fullName){
      return res.send({success:false, code:500, msg:"FullName is missing"})
    }
    if(!req.body.tradeId){
      return res.send({success:false, code:500, msg:"tradeId is missing"})
    }
    if(!req.body.company){
      return res.send({success:false, code:500, msg:"Company is missing"})
    }
    if(!req.body.idProof){
      return res.send({success:false, code:500, msg:"idProof is missing"})
    }
    if(!req.body.idProofNumber){
      return res.send({success:false, code:500, msg:"idProof Number is missing"})
    }
    if(!req.body.socialType){
      return res.send({success:false, code:500, msg:"SocialType is missing"})
    }
    if(!req.files){
      return res.send({success:false, code:400, msg:"No files were uploaded."})//res.status(400).send('No files were uploaded.');
    }

    let idProofImage = req.files.idProofImage;
    let profileImage = req.files.profileImage;

    var idProofImageUploaded = await sampleFile.mv('./public/images/'+req.files.idProofImage.name);
    var profileImagUploaded = await sampleFile.mv('./public/images/'+req.files.profileImage.name);

    var temp =rand(100,30);
    var newPassword=temp+req.body.password;
    var token= crypto.createHash('sha512').update(req.body.password+rand).digest("hex");
    var hashed_password=crypto.createHash('sha512').update(newPassword).digest("hex");
    
    let userToAdd = User({

      token:token,
      salt:temp,
      temp_str:"",
      email: req.body.email,
      password: hashed_password,
      deviceId:req.body.deviceId,
      deviceType:req.body.deviceType,
      deviceToken:req.body.deviceToken,
      longitude:req.body.longitude,
      latitude:req.body.latitude,
      phone:req.body.phone,
      address:req.body.address,
      city:req.body.city,
      state: req.body.state,
      googleId: req.body.socialType == 'google' ? req.body.socialId : null, 
      facebookId: req.body.socialType == 'facebook' ? req.body.socialId : null,
      socialType: req.body.socialType,
      zipCode: req.body.zipCode,
      fullName:req.body.fullName,
      tradeId:req.body.tradeId,
      company:req.body.company,
      idProof:req.body.idProof,
      idProofNubmer: req.body.idProofNubmer,
      signature:req.body.signature,
      pathOfIdProof:'/images/'+req.files.idProofImage.name,
      pathOfProfileImg:'/images/'+req.files.profileImage.name,
      status:req.body.status || "Active",
      userType:"",
      createAt: new Date(),
      updatedAt: new Date()
    });
    try {
        
        const savedUser = await User.addUser(userToAdd);
        
        var objToMail = {
          to: req.body.email,
          subject:"Registration",
          text:"Welcome in tooltribe",
          errMsg:"Error in sending mail",
          successMsg:"successfully send mail"
        }
        const mailToUser = await utility.sendMail(objToMail);
        console.log("mailToUser",mailToUser)
        logger.info('Adding user...');
        console.log(savedUser);
        
        res.send({"success":true, "code":"200", "msg":successMsg.addUser});
    }
    catch(err) {
        logger.error('Error in adding User- ' + err);
        res.send({"success":false, "code":"500", "msg":msg.addUser,"err":err});
    }
}
/**
 * @description [calculation before add superadmin to db  ]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */
service.RegisterSuperAdmin = async (detailsToReg) => {

    console.log("RegisterSuperAdmin called")
    var temp =rand(100,30);
    var newPassword=temp+detailsToReg.password;
    var token= crypto.createHash('sha512').update(detailsToReg.password+rand).digest("hex");
    var hashed_password=crypto.createHash('sha512').update(newPassword).digest("hex");
    
    
    let userToAdd = User({

      token:token,
      salt:temp,
      temp_str:"",
      email: detailsToReg.email,
      password: hashed_password,
      status: "Active",
      userType:"SuperAdmin",
      createAt: new Date(),
      updatedAt: new Date()
    });
    try {
        
        const savedUser = await User.addUser(userToAdd);
        
        
        logger.info('Register superAdmin...');
      //  console.log(savedUser);
        
    }
    catch(err) {
        logger.error('Error in adding superadmin- ' + err);
        
    }
}
service.editUser = async(req,res)=>{
    console.log("hiii",req.user)
    if(!req.user._id){
        res.send({"success":false,"code":500,"msg":msg._id})
        
    }
    var dataToEdit = {};
   
    for(var key in req.body){
        console.log(key," = key")
        if(key!=='userType' && key!=='password' && key!=='_id' && req.body[key]!=='undefined' && req.body[key]!==null && req.body[key]!==''){
          dataToEdit[key]=req.body[key];
        }
    }
    console.log("step 2",dataToEdit)
    if(!dataToEdit){
        return res.send({success:false,code:500, msg:"Data is missing"})
    }
    let userToEdit={
        query:{"_id":req.user._id},
        data:{"$set":dataToEdit}
    };

    try{
        const editUser= await User.editUser(userToEdit);
        logger.info("update user");
        console.log("update user");
        res.send({"success":true,"code":200,"msg":successMsg.editUser,"data":editUser});

    }
    catch(err){
        logger.error('Error in updaing user- ' + err);
        res.send({"success":false, "code":"500", "msg":msg.editUser,"err":err});
    }
}

service.deleteUser = async (req, res) => {
    let userToDelete = req.body.userId;
    if(!req.body.userId){
        ({"success":false,"code":"500","msg":msg.userId });
    }
    try{
        const removedUser = await User.removeUser(userToDelete);
        logger.info('Deleted user-' + removedUser);
        res.send({"success":true, "code":"200", "msg":successMsg.deleteUser,"data":removedUser});
    }
    catch(err) {
        logger.error('Failed to delete User- ' + err);
        res.send({"success":false, "code":"500", "msg":msg.deleteUser,"err":err});
    }
}

/**
 * @description [App login functionality]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */

service.login = async (req, res) =>{
    var query = {};
    if(req.body.socialType == 'google' && req.body.socialId !== undefined ){
      query = { googleId: req.body.socialId }
    } else if(req.body.socialType == 'facebook' && req.body.socialId !== undefined ) {
      query = { facebookId: req.body.socialId }
    } else if(req.body.email !== undefined  && req.body.password !== undefined ) {
        console.log("2222222")
      query = { email: req.body.email }
    } else {
         console.log("2222222888",req.body.email,req.body.password)
      query = null
    }
    if(!query || !req.body.email){
        return res.send({success:false, code:500, msg:msg.emailId});
    }
    if(!query || !req.body.password){
        return res.send({success:false, code:500, msg:msg.password})
    }
    console.log("1111111111")
    try{
       
        const loggedUser = await User.login(query);
        console.log(loggedUser, "loggedUser")
        if(loggedUser )
        {   var temp=loggedUser.salt;
            var hash_db=loggedUser.password;
            var id=loggedUser.token;
            var userId=loggedUser.userId;
            var name=loggedUser.name;
            var email=loggedUser.email;
            var newpass=temp+req.body.password;
            var hashed_password1=crypto.createHash('sha512').update(newpass).digest("hex");
            if(hash_db==hashed_password1)
            {
                var token = jwt.sign({name:loggedUser.name,email:loggedUser.email,_id:loggedUser._id,userType:loggedUser.userType}, 'shhhhh');

                var data ={
                  _id:loggedUser._id,
                  email:loggedUser.email,
                  fullName:loggedUser.fullName,
                  deviceId:loggedUser.deviceId,
                  deviceType:loggedUser.deviceType,
                  deviceToken:loggedUser.deviceToken,
                  longitude:loggedUser.longitude,
                  latitude:loggedUser.latitude,
                  phone:loggedUser.phone,
                  address:loggedUser.address,
                  city:loggedUser.city,
                  state: loggedUser.state,
                  googleId: loggedUser.socialType == 'google' ? loggedUser.socialId : null, 
                  facebookId: loggedUser.socialType == 'facebook' ? loggedUser.socialId : null,
                  socialType: loggedUser.socialType,
                  zipCode: loggedUser.zipCode,
                  fullName:loggedUser.fullName,
                  tradeId:loggedUser.tradeId,
                  company:loggedUser.company,
                  idProof:loggedUser.idProof,
                  idProofNubmer: loggedUser.idProofNubmer,
                  signature:loggedUser.signature,
                  status:loggedUser.status ,
                  userType:loggedUser.userType,
                  pathOfIdProof:loggedUser.pathOfIdProof,
                  pathOfProfileImg:loggedUser.pathOfProfileImg,
                  createAt: loggedUser.createAt

                }
               

                res.send({success:true, code:200, msg:successMsg.loginUser, data:data, token:token });
            }
            else
            {
               res.send({"success":false,"code":"500","msg":"password does not match"})
            }

        }
        else
        {
            res.send({success:false, code:500, msg:"EmailId or password does not match"})
        }
    }catch(error){
      console.log(error,"error")
        res.send({success:false, code:500, msg:msg.login, err:error})
    }
}

service.forgetPassword= async(req,res)=>
{
    if(!req.body.email){
        return res.send({success:false, code:500, msg:"Email is missing"})
    }
    var temp=rand(24,24);
    try{
        const logUser=await User.forgetPassword(req.body);
        //  console.log(logUser);
         if(logUser.length!=0)
         {
            logUser[0].temp_str=temp
            console.log(logUser[0].temp_str);
            var updatedUser = await User.findOneUpdate({query:{email:req.body.email},data:{$set:{temp_str:logUser[0].temp_str}}});
            var  mailOption = 
            {
              to:req.body.email,
              subject:"reset password",
              text:"Hello " + req.body.email +".Code to reset your Password is" +temp+".\n\nRegards,\nAdmin,\Thank You.",
              errMsg:"resetting password fail",
              successMsg:"Check your email and enter varification code"
            }
            var sendMail = await utility.sendMail(mailOption)
            return res.send({"success":true,"code":"200","msg":"Check your email and enter varification code"});
            
        }else{
            return res.send({"success":false,"code":"500","msg":"Email does not exist in our system"});
        }
    }
    catch(err)
    {
         res.send({"success":false,"code":"500","msg":"Email does not exist!!",data:err})
    }
}

service.forgetPasswordReset=async (req,res)=>{
    if(!req.body.email){
        return res.send({success:false, code:500, msg:"Email is missing"})
    }
    if(!req.body.newPassword){
        return res.send({success:false, code:500, msg:"New Password is missing"})
    }
    if(!req.body.code){
        return res.send({success:false, code:500, msg:"Code is missing"})
    }
    try{
           const logUser=await User.forgetPasswordReset(req.body);
           console.log(logUser);
           if(logUser.length!=0);
           {
              var temp = logUser[0].temp_str;
              console.log(temp);
              var temp2=rand(24,24);
              var new_pass= temp2 + req.body.newPassword;
              console.log(new_pass);
              var new_hashed_pass= crypto.createHash('sha512').update(new_pass).digest("hex");
              console.log(new_hashed_pass);
              console.log(req.body.code);
              if(temp==req.body.code){
                  
                var updatedUser = await User.findOneUpdate({
                    query:{
                        email:req.body.email
                    },
                    data:{
                        $set:{
                            password:new_hashed_pass,salt:temp2 ,temp_str:""
                        }
                    }
                });
                
                if(!updatedUser)
                {
                    return res.send({"success":false,"msg":"Password does not changed"});
                }
                else
                    return res.send({"success":true,"msg":"Password changed successfully"});
              }
              else{
              res.send({success:false, code:500,"msg":"code does not match"});
              }
           }
    }
    catch(err){
        res.send({success:false, code:500, "msg":"Email is not valid"});
    }
}
service.changePassword = async(req,res)=>{
    if(!req.user.email){
        return res.send({success:false, code:500, msg:"Email is missing"})
    }
    if(!req.body.newPassword){
        return res.send({success:false, code:500, msg:"New Password is missing"})
    }
    if(!req.body.oldPassword){
        return res.send({success:false, code:500, msg:"Old Password is missing"})
    }
    try{
        
        var temp1 = rand(160,36);
        // console.log(temp1);
        var newPass1= temp1 + req.body.newPassword;
        // console.log(newPass1);
        var hashed_pass2 = crypto.createHash('sha512').update(newPass1).digest("hex");
        console.log(hashed_pass2);
         const changepass=await User.changePassword(req.body);
        //  console.log(changepass);
         if(changepass.length!=0)
         {
               var temp= changepass[0].salt;
               var hash_db=changepass[0].password;
               var newPass2=temp+ req.body.oldPassword;
               var new_hashed_pass1=crypto.createHash('sha512').update(newPass2).digest("hex");
                if(hash_db==new_hashed_pass1)
                {
                    User.findOneAndUpdate({"email":req.user.email}, {$set:{password:hashed_pass2,salt:temp1}}, {new: true}, function(err, doc){
                        if(err)
                        {
                            return res.send({"success":false,"code":"500","msg":"old password not match"});
                        }
                        else
                        {
                            return res.send({"success":true,"code":"200","msg":" password changed successfully"});
                        }
                    })
                }else{
                    return res.send({"success":false,"code":"500","msg":"old password does not match"});
                }
         }
         else
         {
           return  res.send({"success":false,"code":"500","msg":"emailId not exist!!"});
         }
    }
    catch(err)
    {
      res.send({"success":false,"code":"500","msg":"password changing fail"});

    }
}
export default service;
