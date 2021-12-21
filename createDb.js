var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Priya@123",
  database:"Blog_App"
});

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   con.query("CREATE DATABASE ", function (err, result) {
//     if (err) throw err;
//     console.log("Database created");
//   });
// });

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   var sql = "CREATE TABLE registration (id INT AUTO_INCREMENT PRIMARY KEY ,username VARCHAR(255), password VARCHAR(255))";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log("Table created");
//   });
// });



// con.connect(function(err){
//       if (err) throw err;
//       console.log("database connected");
//       var sql = "CREATE TABLE POST (post_id INT AUTO_INCREMENT PRIMARY KEY,title VARCHAR(200) NOT NULL ,text VARCHAR(5000) NOT NULL ,id int ,FOREIGN KEY (id) REFERENCES registration (id))"
//       con.query(sql,(err,result)=>{
//           if (err) throw err;
//           console.log("table created");
//       })
//   })

//   "CREATE TABLE c_order (oid int NOT NULL auto_increment primary key, orderdate date,oamount int ,cid int,foreign key(cid) references customers(cid))";


// con.connect(function(err){
//     if (err) throw err;
//     console.log("Connected");
//     var sql = "CREATE TABLE options (likes INT(255) NOT NULL DEFAULT (0) ,dislikes INT(255) NOT NULL DEFAULT(0),post_id INT,id INT,FOREIGN KEY(post_id) REFERENCES POST(post_id),FOREIGN KEY(id) REFERENCES registration(id))"
//     con.query(sql,(err,result)=>{
//         if (err) throw err;
//         console.log("table created");
//     })
// })

// con.connect(function(err){
//   if (err) throw err;
//   console.log("database connected");
//   var sql = "DROP TABLE registration"
//   con.query(sql,(err,result)=>{
//       if (err) throw err;
//       console.log("table deleted");
//   })
// })


module.exports = con
