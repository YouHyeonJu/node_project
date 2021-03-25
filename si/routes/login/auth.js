var express = require('express');
var router = express.Router();
var modellogin = require('../../models/loginDAO');

/* GET users listing. */

router.get('/',function(req, res, next) {
    let email = req.query.email;
    let token = req.query.token;
    var go=0;
    console.log(email);
    console.log(token);
    try{
        modellogin.selectforgottoken(email,(results)=>{
            if(token === results[0].token){
                modellogin.selectforgotpwd(token,(results)=>{
                    console.log(results[0].newpw);
                    console.log(email);
                    modellogin.updateforgotpwd(results[0].newpw,email);
                    console.log(token);
                });
                modellogin.deleteforgot(email);
            }
        });
    }catch(err){
        res.redirect('/');
    }
    res.redirect('/');
});
router.post('/', function(req, res, next) {
    console.log("auth.post.sueccess")
    res.redirect('/');
});

module.exports = router;