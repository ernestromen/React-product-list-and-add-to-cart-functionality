const { v4: uuidv4 } = require('uuid');

const initialState ={
  items:[]
};

export default function mainReducer(state = initialState, action) {
  // Check to see if the reducer cares about this action
  if (action.type === 'FETCH_PRODUCTS') {

    return {
      ...state,
      items:action.payload
    }
  }else if(action.type==='EDIT_PRODUCT'){
  let arr =  state.items.map((e,i,a)=>{
      if(action.payload.formId === e.id.toString()){
return {...e,title:action.payload.title,price:action.payload.price,description:action.payload.description,imageUrl:action.payload.imageUrl}
      }
      return e;
    })
 
    return {
      ...state,
      items:arr

    }

  }else if(action.type==='ADD_PRODUCT'){


    let arr = state;

  //=====Check for duplicate titles======///
let count = 0;
  arr.items.map(e=>{
if(e.title ===action.payload.title){
  count++;
}
  });
  if(!(count>0)){
    action.payload['id'] =uuidv4();
        arr.items[arr.items.length] = action.payload;
    
        return {
          ...state,
                items:[...arr.items]
    
        }

  }else{
    alert('cannot use same title name');
  }


  }else if(action.type === 'BEFORE_DELETE_PRODUCT'){

let lastAddedProductWithNewId= state.items[state.items.length-1];



let arr = state.items.filter(product=>{

    if(product.id){
  if(action.payload !== product.title.toString()){
    return product;
  }else{
    return '';
  }
  }
});

return {
  ...state,                                                                                        
  items:arr
  // items:[{id:54,title:'PRODUCT2',price:0}]                                                                                               

}


  }else if(action.type === 'DELETE_PRODUCT'){

let arr = state.items.filter(product=>{
  if(product.id){
  if(action.payload !== product.id.toString()){
    return product;
  }else{
    return '';
  }
  }
});


    return{
      ...state,
      items:arr
    }
  }
  return state
}