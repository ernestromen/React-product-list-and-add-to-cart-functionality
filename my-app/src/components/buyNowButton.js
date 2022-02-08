import React from 'react'


const BuyNowButton = (prop) => {

    const addToCart = (e) =>{

        let productTitleName = e.target.parentNode.parentNode.children[2].innerHTML;
        let productPrice = e.target.parentNode.parentNode.children[5].innerHTML;
        productPrice=productPrice.replace(/\D/g,'');

        productTitleName=productTitleName.split('');
        productTitleName= productTitleName.splice(productTitleName.indexOf(':')+1,productTitleName.length).join('');


if(prop.cart.length > 0){
prop.cart.map(e=>{
if(e.title === productTitleName || e.price ===productPrice){
    prop.setCount(prop.count+1);
}

});

}
      
        prop.addToCart([...prop.cart,{title:productTitleName,price:productPrice}]);
        }

    return (
<button onClick={addToCart} className='btn-buy'>buy</button>    )
}

export default BuyNowButton
