
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var sensorsdataSchema= new Schema({
		value:Number,
		date:String
	
});

var Data = mongoose.model('Data', sensorsdataSchema);

module.exports = {
  Data: Data
};