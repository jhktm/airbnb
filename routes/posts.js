var express = require("express");
var router = express.Router();
//데이터 베이스 가져오기
var Post = require("../models/Post");


//처음 화면 이다 에러가 아니면 렌더로 posts/index로 보낸다

router.get("/", function (req, res, next) {
  Post.find({}, function(err, posts) {
    if (err) {
      return next(err);
    }
    //렌더는 이동 시키고 옆에  , { } 안은 변수와 그값을 보낸다
    res.render('posts/index', {posts: posts});//view 의  posts/index로 보내기
 
 }); 
});


// 새로 만들려면 edit로 보내버린다 이때 값을 가지고 가서 이프문 확인
router.get("/new", function (req, res, next) {
 //find 해서 id 가 잇는지 없는지 확인할수 잇지만 글쓰기는 처음부터 id 값이 없이
 //새로 만들기때문에 post에 아무것도 넣지 않고 보냇다.
  res.render("posts/edit",{post: {}});
});




// 수정 하는것 아이디를 가지고 간다 
router.get("/:id/edit", function (req, res, next) {
 //저장된 database Post에서 find id 를 하느것이다  params는 배열과 같은거고 그중에 현재의 id 를
 //가지고 실행하나
  Post.findById(req.params.id, function(err, post) {
    if (err) {
      return next(err);
    }
    res.render('posts/edit', {post: post});//post가 만들어졋고 이건 현재의 data 다 post를 보낸다
  });
});



// 상세내역 보여주는것
router.get("/:id", function (req, res, next) {
  Post.findById(req.params.id, function(err, post) {
    if (err) {
      return next(err);
    }
    post.read++;// 조회수를 늘려주고
    post.save(function(err){//저장한다
      if(err){
        return next(err);
      }else{
        res.render('posts/show', {post: post});
      }
    });
  });
});



// 만들어 버리는거다 누르면 이게 실행되서 포스트를 만들어 저장해버린다.
//글쓰기는 아래 validateForm조건에 맞아야 한다 
// 비번은 2글자 이상이어야한다 없으면 안된다
router.post("/", function (req, res, next) {
  var err = validateForm(req.body);

if(err){
  return res.redirect('back');
}
 // if(req.body.email != null && req.body.password != null && req.body.title != null && req.body.content !=null  ){
    var post = new Post({
      email: req.body.email,
      password: req.body.password,
      title: req.body.title,
      content: req.body.content  
    }) ;
    post.save(function(err){
      if(err){
        return next(err);
      }else{
        res.redirect('/posts');
      }
    });
  // }else{
  //   return next(err);
  // }

});

// 수정

//글 수정은 비밀번호가 저장된 비밀번호와 맞아야 한다
router.put("/:id", function (req, res, next) {
var err = validateForm(req.body);
  if (err) {
    return res.redirect('back');
  }
  Post.findById({_id: req.params.id}, function(err, post) {
    if (err) {
      return next(err);
    }
    if (post.password !== req.body.password) {//가지고잇는 객체와 현재 비밀번호가 다르면 back
      return res.redirect('back');
    }

    post.title = req.body.title;
    post.email = req.body.email;
    post.content = req.body.content;

    post.save(function(err) {
      if (err) {
        return next(err);
      }
      //req.flash('success', '사용자 정보가 변경되었습니다.');
      res.redirect('/posts');
    });
  });
});





router.delete('/:id', function(req, res, next) {
  Post.findOneAndRemove({_id: req.params.id}, function(err){
    if(err){
      return next(err);
    }
    res.redirect('/posts');
  });
});


//예외처리를 위해 만듬
function validateForm(form, options) {
  var email = form.email || "";
  email = email.trim();
  if (!email) {
    return '이메일을 입력해주세요.';
  }
  if (!form.password) {
    return '비밀번호를 입력해주세요.';
  }
 
  if (form.password.length < 2) {
    return '비밀번호는 2글자 이상이어야 합니다.';
  }
  return null;
}
//예외가 잇으면 리턴에 값이 들어가고 없으면 null


module.exports = router;