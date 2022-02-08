//======Model page=========

const mysql = require('mysql');
//======Database connection=======

function initialConnection(){

   connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'wixtest',
    multipleStatements: true
  });
  return connection;
}


function showProducts(req,res){

  initialConnection();


 
connection.query('SELECT * FROM products', function (error, results, fields) {
  if (error) console.log('this is the error');
  res.end(JSON.stringify(results));
res.end();
});
 
connection.end();
}




function editProduct(req,res){
  initialConnection();
  
  let formId = req.body.formId;
  let title = req.body.title;
  let price = parseInt(req.body.price);
  let description = req.body.description;
  let  imageUrl = req.body.imageUrl;

  connection.connect();
   
  connection.query(`UPDATE products SET title = '${title}', price = '${price}', description = '${description}', imageUrl = '${imageUrl}' WHERE id = '${formId}';`, function (error, results, fields) {
    if (error) console.log(error);
    res.end(JSON.stringify(results));
  res.end();
  });
   
  connection.end();

}



function addProduct(req,res){
  initialConnection();

  
  let title = req.body.title;
  let price = parseInt(req.body.price);
  let description = req.body.description;
  let  imageUrl = req.body.imageUrl;

  connection.connect();
   
  connection.query(`INSERT INTO products (title,price, description, imageUrl) VALUES ('${title}','${price}', '${description}', '${imageUrl}');`, function (error, results, fields) {
    if (error) console.log(error);
    res.end(JSON.stringify(results));
  res.end();
  });
   
  connection.end();

}





function deleteProduct(req,res){
  initialConnection();

  let formId = req.body.formId
connection.connect();

let isnum = /^\d+$/.test(formId);
if(isnum){
  connection.query(`DELETE FROM products WHERE id = '${formId}';`, function (error, results, fields) {
    if (error) console.log(error);
    res.end(JSON.stringify(results));
  res.end();
  });
}else{
  console.log('contains other chars');
  connection.query(`DELETE FROM products WHERE title = '${formId}';`, function (error, results, fields) {
    if (error) console.log(error);
    res.end(JSON.stringify(results));
  res.end();
  });

}

   

   
  connection.end();

}


function addCartProducts(req,res){
  
  initialConnection();


  connection.connect();

for(var x =0 ; x <req.body.length-1; x++ ){

let title = req.body[x].title;
let price = parseInt(req.body[x].price);

  connection.query(`INSERT INTO cartproducts (title,price,created_at) VALUES ('${title}','${price}', NOW());`, function (error, results, fields) {
    if (error) console.log(error);
    res.end(JSON.stringify(results));
  res.end();
  });

}
 
  connection.end();

}




//======This function returns data to three tables=======/
/*
 * Top 5 soldproducts
 * Sales for the past 5 days
 * 5 unique sold products
*/
function showTop5Products(req,res){

  initialConnection();



  connection.connect();



connection.query('SELECT title,price,created_at from cartproducts WHERE created_at >= (SELECT MAX(DATE_ADD(created_at,INTERVAL-5 day)) FROM cartproducts);SELECT title,count(title) as numberproducts FROM CARTPRODUCTS group by title order by numberproducts desc limit 5;SELECT title FROM cartproducts group by title;', function (error, results, fields) {
  if (error) console.log('this is the err');
  
  res.end(JSON.stringify(results));

  res.end();
});

connection.end();


}



module.exports={
  showProducts,
  editProduct,
  addProduct,
  deleteProduct,
  addCartProducts,
  showTop5Products,
   }