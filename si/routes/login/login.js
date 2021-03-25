var express = require('express');
var router = express.Router();
var modellogin = require('../../models/loginDAO');
/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.session.remember){
      res.redirect('/studenthome');
    }
    else{
      res.render('login',{IDerror:0});
    }
});

router.post('/', function(req, res, next) {
  console.log('req.body: ', req.body);
    modellogin.selectemail(req.body.id, (results)=>{
      try{
        if(req.body.id === results[0].email){
          if(req.body.pw === results[0].pwd){
            console.log(req.body.re=="cookieName");//여기 오류
            if (req.body.re=="cookieName"){
              req.session.remember = true;
            }
            req.body.IDerror=0;
            req.session.isLogin = true;
            req.session.userEmail = req.body.id;
            console.log(req.body.id);
            if(results[0].user_id==1){
              res.redirect('/studenthome');
            }else if(results[0].user_id==2){
              res.redirect('/teacherhome');
            }else{
              res.redirect('/guardhome');
            }
          
          }
        }
      }
      catch(err){
        res.render('login',{IDerror:1});
      }
    });
});

module.exports = router;
