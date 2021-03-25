var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')
var MySQLStore = require('express-mysql-session')(session);

require('dotenv').config()
var forgotRouter = require('./routes/login/forgot');
var signupRouter = require('./routes/login/signup');
var authRouter = require('./routes/login/auth');
var loginRouter = require('./routes/login/login');  // 루트 요청
var studenthomeRouter = require('./routes/student/studenthome');  // 로그인
var studentinRouter = require('./routes/student/studentin');
var studentoutRouter = require('./routes/student/studentout');
var studentwarningRouter = require('./routes/student/studentwarning');

var teacherhomeRouter = require('./routes/teacher/teacherhome');  // 로그인
var teachercheckRouter = require('./routes/teacher/teachercheck');
var teacheroutRouter = require('./routes/teacher/teacherout');
var teacherwarningRouter = require('./routes/teacher/teacherwarning');

var guardhomeRouter = require('./routes/guard/guardhome');  // 로그인
var guardinckRouter = require('./routes/guard/guardinck');
var guardoutckRouter = require('./routes/guard/guardoutck');




var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// #region express-mysql-session
var options = {
  host: process.env.DB_HOST,
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DATABASE
};
console.log(process.env.DB_HOST, process.env.DB_USER, process.env.DB_PASS);
var sessionStore = new MySQLStore(options);

app.use(session({
  HttpOnly:true,
  secret: process.env.SESSION_SECRET,
  store: sessionStore,
  resave: false,
  saveUninitialized: true// 세션이 필요하기 전까지는 세션을 구동시키지 않는다(true)
}));
// #endregion


app.use('/', loginRouter);
app.use('/forgot',forgotRouter);
app.use('/auth', authRouter);
app.use('/signup', signupRouter);

app.use('/studenthome', studenthomeRouter);
app.use('/studentin', studentinRouter);
app.use('/studentout', studentoutRouter);
app.use('/studentwarning', studentwarningRouter);

app.use('/teacherhome', teacherhomeRouter);
app.use('/teachercheck', teachercheckRouter);
app.use('/teacherwarning', teacherwarningRouter);
app.use('/teacherout', teacheroutRouter);

app.use('/guardinck', guardinckRouter);
app.use('/guardoutck', guardoutckRouter);
app.use('/guardhome', guardhomeRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;