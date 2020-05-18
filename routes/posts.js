var express = require('express');
var router = express.Router();
var models = require('../models');  
var authService = require('../config/auth'); 


router.get('/', function (req, res, next) {
       let token = req.cookies.jwt;
       if (token) {
         authService.verifyUser(token)
           .then(user => {
             if (user) {
               models.posts
               .findAll({
                 where: {UserId: user.UserId, Deleted: false}
               })
               .then(result => res.render("posts", {posts: result}));
               console.log(user.posts);
               res.render("posts", {posts: user.posts});
               res.send(JSON.stringify(user));
             } else {
               res.status(401);
               res.send('Invalid authentication token');
             }
           });
       } else {
         res.status(401);
         res.send('Must log in first');
       }
     });

router.get('/:id', function (req, res, next) {
  let postId = parseInt(req.params.id);
  models.post.findOne({
    where: {
      PostId: postId
    },
    raw: true
  })
  //  .findByPk(parseInt(req.params.id), {
  //         include: [{ model: models.user }]
      
        .then(post => {
          console.log(post);
          res.render("editPost");
        });
    });
  
// router.post("/", function(req, res, next){
//   let postId = parseInt(req.params.id);
//   models.posts
//   .update(
//      { Deleted: true},
//      {
//             where: {PostId: postId}
//      }
//   )
//   .then(result => res.redirect("/"));
// });

router.post("/", function(req, res, next) {
  let token = req.cookies.jwt;
  if (token) {
    authService.verifyUser(token).then(user => {
      if (user) {
        models.posts
          .findOrCreate({
            where: {
              UserId: user.UserId,
              PostTitle: req.body.postTitle,
              PostBody: req.body.postBody
            }
          })
          .spread((result, created) => res.redirect("/posts"));
      } else {
        res.status(401);
        res.send("Invalid authentication token");
      }
    });
  } else {
    res.status(401);
    res.send("Must be logged in");
  }
});

router.delete("/:id", function(req, res, next){
let postId = parseInt(req.params.id);
models.posts
.update(
  { Deleted: true},
  {
    where: {PostId: postId}
  }
)
.then(result => res.redirect('/'));

});

router.put("/:id", function (req, res, next) {
  let userId = parseInt(req.params.id);
  models.posts
    .update(req.body, { where: { Post_Id: postId } })
    .then(result => res.redirect('/'));
    
    });

   
module.exports = router;
