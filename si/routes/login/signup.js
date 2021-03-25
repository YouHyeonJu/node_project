var express = require('express');
var router = express.Router();
var modellogin = require('../../models/loginDAO');
var modelst = require('../../models/studentDAO');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('signup',{IDerror:0});
});
router.post('/', function(req, res, next) {
      modellogin.selectemail(req.body.new_idem, (results)=>{
        //res.send(results[0]);
        console.log("성공");
          if(req.body.new_pw==req.body.new_ppw){
          // console.log(req.body.id, results[0].email, req.body.pw, results[0].pwd)
          try{
            if(req.body.new_idem === results[0].email){
              res.render('signup',{IDerror:1});
            }
        }catch(err){
          const data = { // 데이터 정리
            email:req.body.new_idem,
            pwd: req.body.new_pw, 
            user_id: 1,
            name: req.body.name,
            student_num: req.body.numclass
            
        };
        modellogin.insertsignup(data);
        const data2={
          student_num: req.body.numclass,
          outing:0,
          returned:0,
          scan:0
        }
        console.log(data2);
        modelst.insertid(data2);
          res.redirect('/');
        }
      }else{
        res.render('signup',{IDerror:2});
      }
      });
  
  });
  module.exports = router;
