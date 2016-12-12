var express = require("express");
var router = express.Router();
//데이터 베이스 가져오기
var Post = require("../models/Post"),
    Room = require("../models/Room"),
    User = require("../models/User");

//처음 화면 이다 에러가 아니면 렌더로 posts/index로 보낸다

// router.get("/", function (req, res, next) {
//   Post.find({}, function(err, posts) {
//     if (err) {
//       return next(err);
//     }
//     //렌더는 이동 시키고 옆에  , { } 안은 변수와 그값을 보낸다
//     res.render('reser/index', {posts: posts});//view 의  posts/index로 보내기
 
//  }); 
// });

// router.get("/:id", function (req, res, next) {
//   Post.find({}, function(err, posts) {
//     if (err) {
//       return next(err);
//     }
//     //렌더는 이동 시키고 옆에  , { } 안은 변수와 그값을 보낸다
//     res.render('reser/index', {posts: posts});//view 의  posts/index로 보내기
//   }); 
// });



router.get("/:id/new" , function(req , res,next){ // 방에 예약 아이디는 방 번호
  Room.findById(req.params.id, function(err, room) { // room 은 그방
    if (err) {
      return next(err);
    }
    res.render('reser/edit', {post: {}, room: room});
  });
  
});





router.get("/:id", function (req, res, next) {


  Room.findById(req.params.id, function(err, room) { // room 은 그방
    if (err) {
      return next(err);
    }
    Post.find({}, function(err, posts) {
      if (err) {
       return next(err);
     }
     //렌더는 이동 시키고 옆에  , { } 안은 변수와 그값을 보낸다
      res.render('reser/index', {posts: posts , room: room});//view 의  posts/index로 보내기
    }); 
    
  });
  
});

router.get("/:id/my", function (req, res, next) {


  User.findById(req.params.id, function(err, user) { // room 은 그방
    if (err) {
      return next(err);
    }
    Post.find({}, function(err, posts) {
      if (err) {
       return next(err);
     }
     //렌더는 이동 시키고 옆에  , { } 안은 변수와 그값을 보낸다
      res.render('reser/myreser', {posts: posts , user: user});//view 의  posts/index로 보내기
    }); 
    
  });
  
});


// router.post("/", function (req, res, next) { // 방만들기

//   var post = new Post({
//       checkin: req.body.checkin,//체크인
//       checkout:req.body.checkout,//체크아웃
//       people: req.body.people,// 인원수

//       title: req.body.title,

//       name: req.user.name, //예약한 사람
//       email: req.user.email // 예약한 사람 이름

//       // 예약한방
  
//     }) ;
//     post.save(function(err){
//       if(err){
//         return next(err);
//       }else{
//         Room.find({}, function(err, rooms) {
//           if (err) {
//            return next(err);
//           }
//          res.render('posts/index' ,{rooms: rooms});
//          });
//       }
//     });
// });




router.post("/:id", function (req, res, next) { // 방만들기

  Room.findById(req.params.id, function(err, room) { // room 은 그방
      if (err) {
        return next(err);
      }
      var post = new Post({
      check_in: req.body.check_in,//체크인
      check_out: req.body.check_out,//체크인
      people: req.body.people,// 인원수

      title: room.title,

      name: req.user.name, //예약한 사람
      email: req.user.email // 예약한 사람 이름

      // 예약한방
  
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
  
});
router.get("/:id/ok", function (req, res, next) { // 방만들기
  Post.findById({_id: req.params.id}, function(err, posts) {
      if (err) {
        return next(err);
      }
      posts.status = "승인되었습니다"
      posts.save(function(err){
      if(err){
        return next(err);
      }else{
        res.redirect('back');
      }
    });
  });
});

router.get("/:id/no", function (req, res, next) { // 방만들기
  Post.findById({_id: req.params.id}, function(err, posts) {
      if (err) {
        return next(err);
      }
      posts.status = "승인거절"
      posts.save(function(err){
      if(err){
        return next(err);
      }else{
        res.redirect('back');
      }
    });
  });
});





module.exports = router;