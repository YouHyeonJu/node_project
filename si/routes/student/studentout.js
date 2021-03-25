  var express = require('express');
var router = express.Router();
var modelst = require('../../models/studentDAO');
var modellogin = require('../../models/loginDAO');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('studentout');
});
router.get('/1hour', function(req, res, next) {
  res.render('studentout');
});
router.post('/1hour', function(req, res, next) {
  modellogin.selectnum(req.session.userEmail,(results)=>{
  const object = {
    student_num:results[0].student_num,
    howhour:1,
    sayou: req.body.input1,
    scan: req.body.vbt1 ? true : false
};
modelst.selectsayou(results[0].student_num,(result2)=>{
  try{
    if(result2[0].sayou){
      modelst.updatesayou(object.sayou,results[0].student_num);
    }
    
  }catch(err){
    console.log(object);
    modelst.insertstudent(object);
    modelst.updatescan(object.scan,object.student_num);
  }
});

});
  res.redirect('/studentin');
});

router.get('/2hour', function(req, res, next) {
  res.render('studentout');
});

router.post('/2hour', function(req, res, next) {
  modellogin.selectnum(req.session.userEmail,(results)=>{
  const object = {
    student_num:results[0].student_num,
    howhour:2,
    sayou: req.body.input2,
    scan: req.body.vbt2 ? true : false
  };
  modelst.selectsayou(results[0].student_num,(result2)=>{
    try{
      if(result2[0].sayou){
        modelst.updatesayou(object.sayou,results[0].student_num);
      }
    }catch(err){
      console.log(object);
      modelst.insertstudent(object);
      modelst.updatescan(object.scan,object.student_num);
    }
  });
  
});
  res.redirect('/studentin');
  
});
router.get('/giter', function(req, res, next) {
  res.render('studentout');
});

router.post('/giter', function(req, res, next) {
  modellogin.selectnum(req.session.userEmail,(results)=>{
  const object = {
    student_num:results[0].student_num,
    howhour: req.body.input3,
    sayou: req.body.more,
    scan: req.body.vbt3 ? true : false
};
modelst.selectsayou(results[0].student_num,(result2)=>{
  try{
    if(result2[0].sayou){
      modelst.updatesayou(object.sayou,results[0].student_num);
    }
  }catch(err){
    console.log(object);
    modelst.insertstudent(object);
    modelst.updatescan(object.scan,object.student_num);
  }
});

});
  res.redirect('/studentin');
});

module.exports = router;