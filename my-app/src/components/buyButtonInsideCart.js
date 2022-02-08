import React from 'react';
import axios from 'axios';



const BuyButtonInsideCart = (prop) => {

    const sendCartItemsToDataBase = () =>{
        const url = "http://localhost:4000/cartProducts";

//======Clears state of the cart in UI =======///

///======Save state data for database transition =====///
let reactData = prop.cart;
        prop.addToCart([]);


        //======Sending the state products to the database======///

        let sendData = () => {
            axios.post(url, reactData, {headers:{Accept: 'application/json', "content-type": "application/json"}})
           .then(({res}) => res)
           .catch(err => console.log('this is an error inside sendData'));
        }
        
         sendData();
    
    }



    return (
        <button type="submit" onClick={sendCartItemsToDataBase}>buy items</button>
    )

}

export default BuyButtonInsideCart
