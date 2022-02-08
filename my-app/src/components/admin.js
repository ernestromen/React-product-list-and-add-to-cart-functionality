import React from 'react'
import {useState} from 'react';
import '../App.css';
import  { EditForm }  from './editForm';
import axios from 'axios';
import {useDispatch,connect} from 'react-redux';
import {actionForDeletingProduct} from '../actions/actions';
import {actionForBeforeDeletingProduct} from '../actions/actions';

import {mapStateToProps} from './mapStateToProp';
const { v4: uuidv4 } = require('uuid');

const Admin = (promp) => {

const dispatch = useDispatch();
const [formId, setFormId] = useState(false);
 
// const [products, setProducts] = useState([]);
//========Form type state==========//
const [formType, setFormType] = useState();


//========Showing form on click===========//
    const [showForm, setShowForm] = useState(false);
    const changeStatus = (e) =>{
if(e.target.innerHTML === 'edit'){
setFormType('edit');

}else if(e.target.innerHTML === 'add'){
    setFormType('add');


}
      //=======Id from node=======//
        setShowForm(!promp.showForm);
        const trId = e.target.parentNode.parentNode.children[0].dataset.id;
        setFormId(trId);


        };

 const deleteProductFromDataBase = (e) =>{

   //====Id from database!=====//
             let trId = e.target.parentNode.parentNode.children[0].dataset.id;
             //=====Randomly generated ID=====//

            //  let whatineed =  document.querySelector('#customers tbody tr:last-child input[id]').getAttribute('id');

//=====Add the randomnly generated id to the new product state and then delete from the state the product that got that same Id=====////



//=======Deleting product from application state ======///
if(trId.length < 5){
    dispatch(actionForDeletingProduct(trId));

    try{
        //=========sending to server============
        

        const url = "http://localhost:4000";
                // const formId = e.target.parentNode.parentNode.children[1].parentNode.parentNode.children[0].dataset.id;
        let sendData = () => {
            axios.delete(url, {
                headers:{
                    Accept: 'application/json', "content-type": "application/json"
                },
                data:{
                    formId:trId
                }
            })
           .then(({res}) => res)
           .catch(err => console.log('this is an error inside sendData'))
        }
        
         sendData();
        
        }catch(err){
            console.log(err);
        }
}else{
let trId = e.target.parentNode.parentNode.children[1].innerHTML;
dispatch(actionForBeforeDeletingProduct(trId));

    try{
        //=========sending to server============
        

        const url = "http://localhost:4000";
                // const formId = e.target.parentNode.parentNode.children[1].parentNode.parentNode.children[0].dataset.id;
        let sendData = () => {
            axios.delete(url, {
                headers:{
                    Accept: 'application/json', "content-type": "application/json"
                },
                data:{
                    formId:trId
                }
            })
           .then(({res}) => res)
           .catch(err => console.log('this is an error inside sendData'))
        }
        
         sendData();
        
        }catch(err){
            console.log(err);
        }

}




}

///=======displaying data from state=====
let everything='';

if(promp.products.length >0 && promp.products[0] !== 'undefined'){

             everything = promp.products.map((product,i)=>{
                return <tr key={uuidv4()}>
                    <input type="hidden" id={uuidv4()} data-id={product.id}/>
<td key={uuidv4()}>{product.title}</td> 
<td key={uuidv4()}>{product.price}$</td> 
<td key={uuidv4()}>{product.description}</td> 
<td  key={uuidv4()}>{product.imageUrl}</td> 
<td style={{display:"block"}} key={uuidv4()}><button style={{marginTop:"8px",width:'100%'}} onClick={changeStatus}>edit</button></td>
<td style={{display:"block"}}  key={uuidv4()}><button style={{width:'100%'}} onClick={deleteProductFromDataBase} >delete</button></td>
               </tr>

                    })

}

    return (
        <div>
 
        <div style={{textAlign:'center',marginBottom:'30px'}}>
        <button style={{width:'100px',marginTop:'30px'}} onClick={changeStatus}>add</button>
</div>
{everything ? '' : <h1 style={{textAlign:"center", marginBottom:"40px"}}>Product list empty!</h1>}
        <table  style={{border:'3px solid black', display:everything?'':"none"}} id="customers">
            <thead>
  <tr>
    <th>Title</th>
    <th>Price</th>
    <th>Description</th>
    <th>imageUrl</th>
    <th>option</th>
  </tr>
  </thead>
<tbody>
   {everything}
 </tbody>
  </table>
  {(showForm) ? <EditForm setProducts={promp.setProducts} products={promp.products} formType={formType} formId={formId ? formId : ''}  showForm={(showForm)} setShowForm={setShowForm}/>:'' }
 </div>
    )
}


  
 export default connect(mapStateToProps)(Admin);
