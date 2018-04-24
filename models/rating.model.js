import mongoose from 'mongoose';
import AutoIncrement from "mongoose-auto-increment";
AutoIncrement.initialize(mongoose);



const RatingSchema = mongoose.Schema({
	ratingId:{type:Number},
	userId: {type: mongoose.Schema.ObjectId},
	receiverId: {type: mongoose.Schema.ObjectId},//reciver and tool id
    rating:{type: Number},
    reviewsTitle:{type: String},
    reviews:{type: String},
    ratingType:{type: String},//tool,user,provider
    status :{type:String, default: 'false'},
    createAt:{type: Date, default: Date.now},
    updatedAt:{type: Date, default: Date.now}
},{collection:'rating'});

RatingSchema.plugin(AutoIncrement.plugin,{model:'rating',field:'ratingId',startAt:1,incrementBy:1});

let RatingModel = mongoose.model('rating',RatingSchema);

RatingModel.addRating = (data) => {
    return data.save();
}


RatingModel.getRatingInUser = (where) => {
    return RatingModel.find(where,{_id:0,__v:0});
}

RatingModel.getAvgRating = (where,cb) => {

	RatingModel.aggregate([
	    { "$match": {
                  $and: [ 
                      where.ratingQuery, 
                      {"ratingType":'USER'}
                  ]
                }
        },
	    { "$group": {
	        "_id": null,
	        "rating": { "$avg": "$rating" }
	    }}
	]).then( async function(result) {

        var arr = {
            rating  : (result[0])?parseFloat(result[0].rating).toFixed(2):"0", 
            review  : await RatingModel.find(where.ratingQuery),
            rentals : "50"
        };

        cb(arr); 
    });
}

export default RatingModel;