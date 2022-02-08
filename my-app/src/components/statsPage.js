import React,{useEffect, useState} from 'react'

const StatsPage = () => {
const [productStats,setProductStats] = useState([]);
    useEffect(() => {
       
        
        const getProducts = async()=>{
            let finalRes = '';
             await fetch("http://localhost:4000/stats")
             .then(response => response.json())
             .then(result => {
               finalRes = result;
         })
         setProductStats(finalRes);
         
         }
          getProducts();
      },[]);
   
   
let productsList,productsList2,productsList3='';
console.log(productStats,'productStats');
if(productStats.length > 0 ){
    

        productsList= productStats[1].map((product,i)=>{
           
            
          return (
                            <tr>
        <td style={{height:"0px"}} className='grid-item'>{product.title}</td>
<td className='grid-stat'>{product.numberproducts}</td>
          </tr>
          )
              });
              
              
              productsList2= productStats[0].map((product,i)=>{
                let created_at = product.created_at;
                created_at = created_at.split('').slice(0,10).join('');
                return (
                                  <tr>
              <td style={{height:"0px"}} className='grid-item'>{product.title}</td>
        <td className='grid-stat'>{product.price}$</td>
        <td className='grid-stat'>{created_at}</td>
                </tr>
                )
                    });



                    productsList3= productStats[2].map((product,i)=>{
                      console.log(product,'product inside productslist3');
                        return (
                                          <tr>
                      <td style={{height:"0px"}} className='grid-item'>{product.title}</td>
            
                        </tr>
                        )
                            });
}


    return (
        <div>
       
            {productsList || productsList2? '': <h1 style={{textAlign:"center"}}>Product list is empty! go to the admin page to add products!</h1>}
        <div style={{display:productsList? '': "none"}} className='grid-container3'>

            <div className='grid-item2'>
       <h1 style={{textAlign:"center",marginBottom:"30px"}}>Top 5 sold products</h1>
       <table id="customers">
        <thead>
            <th style={{border:"1px solid black"}}>Product name</th>
            <th style={{border:"1px solid black"}}>number of products</th>
            </thead>
            <tbody>
       {productsList}
       
       </tbody>
        </table>
</div>

<div className='grid-item2'>

        <h1 style={{textAlign:"center",marginBottom:"31px",marginTop:"40px"}}>Sales for the past 5 days</h1>
       <table id="customers">
        <thead>
            <th style={{border:"1px solid black"}}>Product name</th>
            <th style={{border:"1px solid black"}}>Product price</th>
            <th style={{border:"1px solid black"}}>Created at</th>
            </thead>
            <tbody>
       {productsList2}
       </tbody>
        </table>

</div>


<div className='grid-item2'>

        <h1 style={{textAlign:"center",marginBottom:"31px",marginTop:"40px"}}>5 unique sold products</h1>
       <table id="customers">
        <thead>
            <th style={{border:"1px solid black"}}>Product name</th>
            </thead>
            <tbody>
{productsList3}
       </tbody>
        </table>

</div>
    </div>
    </div>
    )
}

export default StatsPage
