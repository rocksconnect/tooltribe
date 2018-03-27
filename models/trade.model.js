/**
 * @file(trade.model.js) All db service realted to trade  
 * @author Shakshi Pandey <shakshipandey11@gmail.com>
 * @version 1.0.0
 * @lastModifed 26-March-2018
 * @lastModifedBy Shakshi
 */
import mongoose from 'mongoose';
import AutoIncrement from "mongoose-auto-increment";
AutoIncrement.initialize(mongoose);

const TradeSchema = mongoose.Schema({
  
    trade:{type:String},
    tradeId:{type:String},
    status:{type:String},
    trash:{type:String},
    createAt:{type: Date,default:Date.now()},
    updatedAt:{type: Date,default:Date.now()}
  }, {collection : 'trade'});

  TradeSchema.plugin(AutoIncrement.plugin,{model:'trade',field:'tradeId',startAt:1,incrementBy:1});

let TradeModel = mongoose.model('trade',TradeSchema);

TradeModel.addTrade = (tradeToAdd) => {
    return tradeToAdd.save();
}
TradeModel.findTrade = (tradeToFind) =>{
	return TradeModel.find(tradeToFind.query,tradeToFind.projection);
}
TradeModel.editTrade =(tradeToEdit) =>{
	return TradeModel.update(tradeToEdit.query,tradeToEdit.data);
}
export default TradeModel;
