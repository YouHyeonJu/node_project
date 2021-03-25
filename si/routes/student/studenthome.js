var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/logout',function(req,res,next){
  res.render('login');
});
router.post('/logout',function(req, res, next) {
  console.log("접근완료");
  req.session.destroy(function(err){
    if(err)
      console.log(`req.session.destroy error : ${err}`);
    res.redirect('/');
  });
})
router.get('/', function(req, res, next) {
  res.render('studenthome');
});
router.post('/',function(req, res, next) {
  
});

module.exports = router;
