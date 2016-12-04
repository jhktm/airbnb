var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
  email: {type: String, required: true, index: true, unique: true, trim: true},//이메일

  password: {type: String},

  content: {type: String },

  title:{type: String},

  createdAt: {type: Date, default: Date.now},//작성일

  read: {type: Number ,default: 0},

}, {
  toJSON: { virtuals: true},
  toObject: {virtuals: true}
});

var Post = mongoose.model('Post', schema);// post로 바꿈

module.exports = Post;


//   title:{type: String}, // 제목
//   content: {type: String }, // 간단한 설명
//   city:{type: String}, // 도시
//   address:{type: String}, // 주소
//   price:{type: String}, // 숙소요금
//   facility:{type: String}, //편의시설
//   rule:{type: String}, //이용규칙
//   email: {type: String, required: true, index: true, unique: true, trim: true},//이메일
