var express = require('express');
var router = express.Router();
var modellogin = require('../../models/loginDAO');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
/* GET users listing. */

router.get('/', function(req, res, next) {
    res.render('forgot',{IDerror:0});
});
router.post('/', async function(req, res, next) {
    if(req.body.new_idem && req.body.re_pw && req.body.re_ppw){
            if(req.body.re_pw == req.body.re_ppw){
                console.log("성공");
            }
            else{
                res.rander('forgot',{IDerror:1});
            }
            try{
            modellogin.selectemail(req.body.new_idem, await function(results){
                
                //res.send(results[0]);
                console.log('results: ', results);
                // console.log(req.body.id, results[0].email, req.body.pw, results[0].pwd)
                if(req.body.new_idem === results[0].email && req.body.re_pw == req.body.re_ppw){
                    const token = crypto.randomBytes(20).toString('hex'); // token 생성
                    
                    const data = { // 데이터 정리
                        token:token,
                        ttl: 300, // ttl 값 설정 (5분)
                        email: req.body.new_idem,
                        newpw: req.body.re_pw
                    };
                    console.log('data: ', data);
                    
                     const transporter = nodemailer.createTransport({
                        service: 'gmail',
                        port: 465,
                        secure: true, // true for 465, false for other ports
                        auth: { // 이메일을 보낼 계정 데이터 입력
                          user: 'dbguswn0130@gmail.com',
                          pass: 'guswn0012606!',
                        },
                      });
                      const emailOptions = { // 옵션값 설정
                        from: 'dbguswn0130@gmail.com',
                        to: req.body.new_idem,
                        subject: '띵똥!',
                        html: `비밀번호 새 설정하시려면 아래의 URL을 클릭하여 주세요.`
                         + "http://localhost:3000/auth/?email="+ req.body.new_idem +`&token=${token}`,
                      };
                    //   
                      transporter.sendMail(emailOptions, res);
                      console.log("전송완료"); //전송
                      modellogin.insertforgot(data);
                      console.log("성공요");
                      res.redirect('/');
                    }else{
                        res.rander('forgot',{IDerror:1});
                    }
            });
    }catch(err){
        res.rander('forgot',{IDerror:2});
    }
            
        
        
    }else{
        res.rander('forgot',{IDerror:3});
    }
});

module.exports = router;
