var express = require("express");
var router = express.Router();
//데이터 베이스 가져오기
var Post = require("../models/Post");
var Room = require("../models/Room")

//처음 화면 이다 에러가 아니면 렌더로 posts/index로 보낸다

router.get("/", function (req, res, next) {
  Post.find({}, function(err, posts) {
    if (err) {
      return next(err);
    }
    //렌더는 이동 시키고 옆에  , { } 안은 변수와 그값을 보낸다
    res.render('reser/index', {posts: posts});//view 의  posts/index로 보내기
 
 }); 
});
router.get("/new" , function(req , res,next){
  res.render('reser/edit', {post: {}});
})


router.post("/", function (req, res, next) { // 방만들기

  var post = new Post({
    
      
      checkin: req.body.checkin,
      checkout:req.body.checkout,
      people: req.body.people,

      name: req.user.name,
      email: req.user.email
    }) ;

    post.save(function(err){
      if(err){
        return next(err);
      }else{
        Room.find({}, function(err, rooms) {
          if (err) {
           return next(err);
          }
         res.render('posts/index' ,{rooms: rooms});
         });
      }
    });
});






module.exports = router;