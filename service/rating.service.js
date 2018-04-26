import Tools from '../models/tools.model'
import Rating from '../models/rating.model'
import ObjectID from "bson-objectid";

const service = {};

/**
|------------------------------------------
| @Function : addRating
|------------------------------------------
*/
service.addRating = async (req,res) =>{
    
    if(!req.body.userId){
        return res.send({success:false, code:500, msg:"userId _id is missing"});
    }

    if(!req.body.rating){
        return res.send({success:false, code:500, msg:"rating is missing"});
    }

    if(!req.body.ratingType){
        return res.send({success:false, code:500, msg:"ratingType is missing"});
    }

    if(!req.body.reviewsTitle){
        return res.send({success:false, code:500, msg:"reviewsTitle is missing"});
    }

    if(req.body.ratingType=='tool' || req.body.ratingType=='user'){
        if(!req.body.receiverId){
	        return res.send({success:false, code:500, msg:"receiverId _id is missing"});
	    }
    }else{
    	return res.send({success:false, code:500, msg:"please enter a valid ratingType"});
    }

    try{
    	
    	let insertData = Rating({
				userId: req.body.userId,
				receiverId: req.body.receiverId,
			    rating:req.body.rating,
			    reviewsTitle:req.body.reviewsTitle,
			    reviews:(req.body.reviews)?req.body.reviews:'',
			    ratingType:req.body.ratingType.toUpperCase()
			})
		
		let result = await Rating.addRating(insertData);
		
        if(result){

            if(req.body.ratingType=="tool"){

                var where = [
                        {"receiverId":ObjectID(req.body.receiverId)},
                        {"ratingType":'TOOL'}
                    ];

                let ratings = await Rating.getAvgRating(where);
                let updateData = {
                        query:{_id:req.body.receiverId},
                        data:{$set:{
                                ratings: (ratings[0])?ratings[0].rating:0,
                            }
                        }
                    }
                let resultData = await Tools.addAccessoriesImage(updateData);
            }


			return res.send({success:true, code:200, msg:"succes"});
		}else{
			return res.send({success:false, code:500, msg:"Error in adding trade"});
		}
    }catch(error){
		return res.send({success:false, code:500, msg:"Error", err:error});
	}
}


/**
|------------------------------------------
| @Function : getRating
|------------------------------------------
*/
service.getRating = async (req,res) =>{
    if(!req.body.userId){
        return res.send({success:false, code:500, msg:"userId _id is missing"});
    }
    if(!req.body.type){
        return res.send({success:false, code:500, msg:"type is missing"});
    }

    try{

    }catch(error){

    }
}

export default service;