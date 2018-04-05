import mongoose from 'mongoose';
import AutoIncrement from "mongoose-auto-increment";
AutoIncrement.initialize(mongoose);

const RecentlyviewsSchema = mongoose.Schema({   
    viewId: {type: Number },
    userId: {type: String },
    toolId: {type: String },
    createAt:{type: Date, default: Date.now},
    updatedAt:{type: Date, default: Date.now}
  }, {collection : 'recentlyviews'});

  RecentlyviewsSchema.plugin(AutoIncrement.plugin,{model:'recentlyviews',field:'viewId',startAt:1,incrementBy:1});

let RecentlyviewsModel = mongoose.model('recentlyviews',RecentlyviewsSchema);



export default RecentlyviewsModel;
