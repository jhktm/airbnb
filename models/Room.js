var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
  title:{type: String}, // 제목
  content: {type: String }, // 간단한 설명
  city:{type: String}, // 도시
  address:{type: String}, // 주소
  price:{type: String}, // 숙소요금
  facility:{type: String}, //편의시설
  rule:{type: String}, //이용규칙
  createdAt: {type: Date, default: Date.now},//작성일

  read: {type: Number ,default: 0},
  
  name:{type:String}, // 방만든 사람
  email:{type: String} // 방만든 사람 이름

}, {
  toJSON: { virtuals: true},
  toObject: {virtuals: true}
});

var Room = mongoose.model('Room', schema);// 룸으로 간다

module.exports = Room;