import React, { useState } from 'react'
import {connect} from 'react-redux';
import {mapStateToProps} from './mapStateToProp';
import BuyNowButton from './buyNowButton';
import BuyButtonInsideCart from './buyButtonInsideCart';


const Home = (promp) => {
    const [cart,addToCart] = useState([]);
const [showCartList, setShowCartList] = useState(false);
const [count, setCount] = useState(1);
  

const cartListHere =cart.map(el=>{
    return(
    <div style={{'display':'flex'}}>
     <div>{el.title}</div><div>&nbsp;&nbsp;&nbsp;&nbsp;</div>
       <div>{el.price}$</div>
</div>
)

})
           const showListWithProducts = (e)=>{
            if(showCartList){
                setShowCartList(false)
            }else if(!(showCartList) && cart.length>0){
                setShowCartList(true)
            }
            
        }


       let productsList ='';
        if(promp.products.length >0) {
productsList= promp.products.map((product,i)=>{
                return (
                    <div  className="grid-container">
                <div style={{textAlign:'left'}} className="grid-item">
                <img src={product.imageUrl}></img><br/>
                {/* <div style={{backgroundImage:'url(images/image2.jpg)'}} ></div><br/> */}
                  <div className='productTitle'>title:{product.title}</div><br/>
                  Description:<br/>{product.description}<br/>
                  <div className='productPrice'>
                  Price:<span style={{fontWeight:'600'}}>{product.price}$</span><br/>
                  </div>
                  <div style={{textAlign:'center'}}><BuyNowButton setCount={setCount} count={count} cart={cart} addToCart={addToCart}/></div>
                    </div>
                
                </div>
                )

                    })

        }
          
    

    return (
        <div style={{display:'grid'}}>
            <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
        <div onClick={showListWithProducts} className='shoppingCart-display'>
            <div><i style={{paddingLeft:'5px',paddingRight:'5px'}} class="far fa-shopping-cart"></i>shopping cart {cart.length}</div>
            {showCartList?<div>{cartListHere}</div> : ''}
            {showCartList?<BuyButtonInsideCart cart={cart} addToCart={addToCart}/> : ''}
            
            </div>
<div className='grid-container2'>
{productsList ? productsList : <h1>Product list is empty! go to the admin page to add products!</h1>}
    </div>
    </div>
        )
}

export default connect(mapStateToProps)(Home);
