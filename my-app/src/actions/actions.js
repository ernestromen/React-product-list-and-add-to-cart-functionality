///=====Action for getProducts =====

export  const actionForGetProducts = (result)=>{
    return {
      type: 'FETCH_PRODUCTS',
    payload:result
    }
  }
  
  ///========Action for testing ==========//
  export const actionForEditingProduct = (result)=>{
    return {
      type: 'EDIT_PRODUCT',
    payload:result
    }
  }
  
  export const actionForAddingProduct = (result) =>{
  
    return {
      type: 'ADD_PRODUCT',
    payload:result
    }
  
  }


  export const actionForBeforeDeletingProduct = (result) =>{
    return {
      type: 'BEFORE_DELETE_PRODUCT',
    payload:result
    }
  }
  
  export const actionForDeletingProduct = (result) =>{
    return {
      type: 'DELETE_PRODUCT',
    payload:result
    }
  }
  