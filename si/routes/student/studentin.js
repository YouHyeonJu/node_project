var express = require('express');
var router = express.Router();
var modelst = require('../../models/studentDAO');
var moment = require('moment');

/* GET users listing. */
router.get('/', function(req, res, next) {
  const today = moment();
  var d = new Date();
  var fmt1 = 'HH:mm';
  var now = moment(d).format(fmt1);
  today.format('MM-DD');
  modelst.selectnum(req.session.userEmail,(num)=>{
  modelst.selectgooutjoin(num[0].student_num,(results)=>{
    console.log('results: ',results);

    res.render('studentin',{
      student_id:results[0].student_num,
      howhour:results[0].howhour,
      sayou:results[0].sayou,
      return_time:results[0].return_time,
      outing_time:results[0].outing_time,
      outing:results[0].outing,
      returned:results[0].returned,
      nowd:today.format('MM-DD'),
      nowxd:now
    });
  });
});
});
router.post('/', function(req, res, next) {
   
});

module.exports = router;
