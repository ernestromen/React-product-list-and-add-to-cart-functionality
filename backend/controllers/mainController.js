const {showProducts,editProduct,addProduct,deleteProduct,addCartProducts,showTop5Products,showSalesForThePast5Days} = require('../models/mainModel');


function connect(req,res){
    showProducts(req,res);
}

function editProductList(req,res){
    editProduct(req,res)
}


function addToProductList(req,res){

    addProduct(req,res);
}

function deleteProductFromList(req,res){

    deleteProduct(req,res);
}


function takeCartProducts(req,res){
    addCartProducts(req,res);
}


function showProductsStats(req,res){

    showTop5Products(req,res);
}



module.exports = {
    connect,
    editProductList,
    addToProductList,
    deleteProductFromList,
    takeCartProducts,
    showProductsStats,
      
   };