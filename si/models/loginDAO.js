    var connection = require('./db')

exports.selectemail = function(email, cb){
    connection.query('SELECT * FROM usersdata WHERE email = ?', [email], function (error, results, fields) {
        if(error){
            console.log(error);
        }else{
            cb(results);
        }
    });
}
exports.selectforgot = function(email, cb){
    connection.query('SELECT email FROM usersdata where email = (SELECT email FROM forgot WHERE email = ? )', [email], function (error, results, fields) {
        if(error){
            console.log(error);
        }else{
            cb(results);
        }
    });
}
exports.selectforgottoken = function(token, cb){
    connection.query('SELECT token FROM forgot WHERE email = (SELECT email FROM usersdata WHERE email = ? )', [token], function (error, results, fields) {
        if(error){
            console.log(error);
        }else{
            cb(results);
        }
    });
}
exports.selectforgotpwd = function(token, cb){
    connection.query('select newpw from forgot where token= ?', [token], function (error, results, fields) {
        if(error){
            console.log(error);
        }else{
            cb(results);
        }
    });
}
exports.updateforgotpwd = function(pwd,email){
    connection.query('UPDATE usersdata SET pwd = ? where email= ?', [pwd,email], function (error, results, fields) {
        if(error){
            console.log(error);
        }
    });
}
exports.insertforgot = function(body){
    sql = 'INSERT INTO forgot (token,ttl,email,newpw) VALUES(?, ?, ?, ?)';
    values = [body.token, body.ttl,body.email,body.newpw];
    connection.query(sql, values, function(error, results, fields){
        if(error){
            console.log(error);
        }
    })
}
exports.insertsignup = function(body){
    sql = 'INSERT INTO usersdata (email,pwd,user_id,name,student_num) VALUES(?, ?, ?, ?, ?)';
    values = [body.email, body.pwd, body.user_id,body.name,body.student_num];
    connection.query(sql, values, function(error, results, fields){
        if(error){
            console.log(error);
        }
    })
}
exports.deleteforgot = function(email){
    connection.query('DELETE FROM forgot WHERE email=?',[email],function (error, results, fields) {
        if(error){
            console.log(error);
        }
    });
}
exports.selectnum = function(email, cb){
    connection.query('select student_num from usersdata where email= ?', [email], function (error, results, fields) {
        if(error){
            console.log(error);
        }else{
            cb(results);
        }
    });
}
exports.selectemailjoin = function(email, cb){
    connection.query('select * from forgot, usersdata where forgot.email = usersdata.email and usersdata.email=?', [email], function (error, results, fields) {
        if(error){
            console.log(error);
        }else{
            cb(results);
        }
    });
}

