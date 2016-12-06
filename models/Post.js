var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
 
  
  checkin:{type: String},
  checkout:{type: String},
  people:{type:Number , default:0},
  createdAt: {type: Date, default: Date.now},//작성일
  read: {type: Number ,default: 0},
  name:{type:String},
  email:{type: String}
  


}, {
  toJSON: { virtuals: true},
  toObject: {virtuals: true}
});

var Post = mongoose.model('post', schema);// 룸으로 간다

module.exports = Post;