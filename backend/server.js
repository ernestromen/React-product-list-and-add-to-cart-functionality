const http = require('http');
const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const hostname = '127.0.0.1';
bodyParser = require("body-parser");
const {connect,editProductList,addToProductList,deleteProductFromList,takeCartProducts,showProductsStats} = require('./controllers/mainController');
const mysql = require('mysql');






//=====================//

//=====gives permission to localhost3000 to fetch data from locahost4000=====
app.use(cors({
  origin:"http://localhost:3000",
  credentials:true,
}));

//bodyparser is used to interpet the incoming data from the client to the server (on post request)
app.use(bodyParser.json()); // for parsing application/json

//=========displays json data from the sql database on entry to localhost4000/stats url=======//

app.get('/stats',async function(req, res) {
 showProductsStats(req,res);
  });

  //=========displays json data from the sql database on entry to localhost4000 url=======

app.get('/',function(req, res) {
connect(req,res);

});


//=====Adding existing product inside list ==========
app.post('/',function(req, res) {
  res.sendStatus(200);

  var dataReceived = (req.body);

 
  addToProductList(req, res);
});

//=====Another post request=======/

app.post('/:cartProducts',function(req, res) {
  res.sendStatus(200);

  takeCartProducts(req,res);
});


//=====Editing existing product inside list ==========

app.put('/',function(req, res) {
  res.sendStatus(200);

  var dataReceived = (req.body);

  editProductList(req,res);


});
//=====Deleting existing product inside list ==========

app.delete('/',function(req, res) {
  res.sendStatus(200);

  deleteProductFromList(req, res);

});

const port = process.env.PORT || 4000;


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})