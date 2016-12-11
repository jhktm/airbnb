var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
 
  
  checkin:{type: String},
  checkout:{type: String},
  people:{type:Number , default:0},
  createdAt: {type: Date, default: Date.now},//작성일
  read: {type: Number ,default: 0},

  roomnamem: {type: String},
  name:{type:String}, //작성자 저장
  email:{type: String}//작성한 사람

  


}, {
  toJSON: { virtuals: true},
  toObject: {virtuals: true}
});

var Post = mongoose.model('post', schema);// 룸으로 간다

module.exports = Post;