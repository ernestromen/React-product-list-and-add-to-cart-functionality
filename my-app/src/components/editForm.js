import React from 'react'
import {useState,useEffect} from 'react';
import axios from 'axios';
import {useDispatch,connect} from 'react-redux';
import {mapStateToProps} from './mapStateToProp';
import {actionForEditingProduct,actionForAddingProduct} from '../actions/actions';

 export  const EditForm = (promp) => {

//=====State of title =======
const [title, setTitle] = useState("");
//=====State of title =======
const [price, setPrice] = useState("");
//=====State of title =======
const [description, setDescription] = useState("");
//=====State of title =======
const [imageUrl, setImageUrl] = useState("");



///======= State of form validations! =====///
const [titleError, setTitleError] = useState(false);
const [priceError, setPriceError] = useState(false);
const [imgUrlError, setimgUrlError] = useState(false);
const [descriptionError, setDescriptionError] = useState(false);


const dispatch = useDispatch();




  const cancelChange = (e) =>{
  e.preventDefault();
   promp.setShowForm(prev=>!prev);

return promp.showForm;
  }


const conditionForForm= () =>{

  return (
    <div >
<form onSubmit={handleSubmit } className="Form">
<input type="hidden" data-id={promp.formId}/>

  <label>
    Title:<br/>
    <input
     type="text"
      name="Title"
      value={title}
      onChange={e=>setTitle(e.target.value)}
      /><br/>
      {titleError ? <span style={{color:"red"}}>must contain betwenen 3-8 letters</span>:''}
  </label>
 <br/>
  <label>
  Price:<br/>
    <input
     type="number"
      name="Price"
      value={price}
      onChange={e=>setPrice(e.target.value)}
      /><br/>
{priceError ? <span style={{color:"red"}}>must be a  number</span>:''}
  </label>
  <br/>
  <br/>
  <label>
  Description:<br/>
    <textarea 
     type="text"
      name="Description"
      value={description}
      onChange={e=>setDescription(e.target.value)}
      /><br/>
      {descriptionError ? <span style={{color:"red"}}>must contain betwenen 3-20 letters</span>:''}

  </label>
  <br/>
  <label>
  imageUrl:<br/>
    <input
     type="text"
      name="imageUrl"
      value={imageUrl}
      onChange={e=>setImageUrl(e.target.value)}
      /><br/>
      {imgUrlError ? <span style={{color:"red"}}>must contain less than 20 letter and end with '.com'</span>:''}
  </label>
  <input type="submit" value="Submit" /><br/>
  <button type="button" onClick={cancelChange} className="Cancel">Cancel</button>
</form>
</div>

  )

}

const handleSubmit  = (e) =>{
  let formId;
e.preventDefault();

formId=promp.formId;


//====Clean before insert====//

if(!(price) && typeof(price) !== 'number') {

  setPriceError(true);

}else{
  setPriceError(false);

}

let lengthOfTitleInput = e.target.children[1].children[1].value.length;
if(lengthOfTitleInput === 0 || (lengthOfTitleInput < 3 && lengthOfTitleInput>8) ){
  setTitleError(true);
}else{
  setTitleError(false);

}

let lengthOfDescriptionInput = e.target.children[6].children[1].value.length;

if(lengthOfDescriptionInput===0 || (lengthOfDescriptionInput <3 && lengthOfDescriptionInput > 20)){
setDescriptionError(true);


}else{
  setDescriptionError(false);

}


let lengthOfImgUrlInput = e.target.children[8].children[1].value.length;
let re = /.com$/;
//!(re.test(valueOfImgUrlInput)) ||
let valueOfImgUrlInput = e.target.children[8].children[1].value;
if( lengthOfImgUrlInput > 40){
  setimgUrlError(true);
}else{
  setimgUrlError(false);


  const ob = {
    formId,
  title,
  price,
  description,
  imageUrl
  }
  
  const reactData = ob;
  const url = "http://localhost:4000";
  
  if(promp.formType === 'add'){
    console.log(promp.products,'products length');
if(promp.products.length<5){
 ///=====Adding product to application state=====///
  
 dispatch(actionForAddingProduct(reactData));
  
 //====Sending POST request========
 
 try{
   //=========Sending data to server============
 
   const reactData = ob;
   const url = "http://localhost:4000";
   
   let sendData = () => {
       axios.post(url, reactData, {headers:{Accept: 'application/json', "content-type": "application/json"}})
      .then(({res}) => res)
      .catch(err => console.log('this is an error inside sendData'));
   }
   
    sendData();
   
   }catch(err){
       console.log(err);
   }

}else{
  alert('Cannot add more than 5 products');
}
 
  }else if(promp.formType === 'edit'){
  
  //=====Changing application state with redux ======///
  dispatch(actionForEditingProduct(reactData));
  //====Sending PUT request
  try{
    //=========Sending data to server============  
    let sendData = () => {
        axios.put(url, reactData, {headers:{Accept: 'application/json', "content-type": "application/json"}})
       .then(({res}) => res)
       .catch(err => console.log('this is an error inside sendData'));
    }
    
     sendData();
    
    }catch(err){
        console.log(err);
    }
  
  
  
  }
  
  //end of form
    setTitle('');
    setPrice('');
    setDescription('');
    setImageUrl('');
  
  
  }

}





    return (
        <div>
       {conditionForForm()} 
</div>
    )
}

export default connect(mapStateToProps)(EditForm);
