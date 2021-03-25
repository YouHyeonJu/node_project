var connection = require('./db')

exports.insertstudent = function(body){
    sql = 'INSERT INTO studentgo (student_num,howhour,sayou) VALUES(?,?,?)';
    values = [body.student_num, body.howhour, body.sayou];
    connection.query(sql, values, function(error, results, fields){
        if(error){
            console.log(error);
        }
    })
}
exports.insertid = function(body){
    
    sql = 'INSERT INTO studentout (student_num,outing,returned,scan) VALUES ( ?, ?, ?, ?)';
    values = [body.student_num, body.outing, body.returned, body.scan];
    connection.query(sql, values, function(error, results, fields){
        if(error){
            console.log(error);
        }

    })
}
exports.insertscan = function(body){
    
    sql = 'INSERT INTO studentout (scan) VALUES (?)';
    values = [body.scan];
    connection.query(sql, values, function(error, results, fields){
        if(error){
            console.log(error);
        }

    })
}
exports.selectstudent = function(student_num, cb){
    connection.query('SELECT * FROM studentgo WHERE student_num = ?', [student_num], function (error, results, fields) {
        if(error){
            console.log(error);
        }else{
            cb(results);
        }
    });
}
exports.insertnum = function(body){
    sql = 'INSERT INTO usersdata (student_num) VALUES(?)';
    values = [body.student_num];
    connection.query(sql, values, function(error, results, fields){
        if(error){
            console.log(error);
        }
    })
}
exports.updatescan = function(scan,student_num){
    connection.query('UPDATE studentout SET scan = ? where student_num= ?', [scan,student_num], function (error, results, fields) {
        if(error){
            console.log(error);
        }
    });
}
exports.selectsayou = function(student_num, cb){
    connection.query('select sayou,howhour from studentgo where student_num= ?', [student_num], function (error, results, fields) {
        if(error){
            console.log(error);
        }else{
            cb(results);
        }
    });
}
exports.updatesayou = function(sayou,student_num){
    connection.query('UPDATE studentgo SET sayou = ? where student_num= ?', [sayou,student_num], function (error, results, fields) {
        if(error){
            console.log(error);
        }
    });
}
exports.selectgooutjoin = function(student_num, cb){
    connection.query('select * from studentgo A, studentout B where A.student_num = B.student_num and A.student_num=?', [student_num], function (error, results, fields) {
        if(error){
            console.log(error);
        }else{
            cb(results);
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

