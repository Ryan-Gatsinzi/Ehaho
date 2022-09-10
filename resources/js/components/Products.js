import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'

function Products() {
    const check = localStorage.getItem('user');
    if (check == null){
        return window.location.href = '/'
    }
    const [msg, setMsg] = useState("");
    const [data, setData] = useState("");
    const [data2, setData2] = useState("");    
    const token = localStorage.getItem('user').token;    
    useEffect(() => {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`
        axios.get('/api/products')
        .then(function (response){
            setData(response.data.products)
            console.log(response.data.products.length)
            if (response.data.products.length == 0){
                setMsg('No products available')                
            }
            
        })        
      },[])         
    return (
        <div>   
            <div className="text-center" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop:"20px"}}>  
            <h1 className='text-danger text-center'>{msg}</h1>  
        { Object.keys(data).map(product=> {   
            {console.log(data[product])}     
           return( <div className="card" style={{width: "18rem", margin:"auto"}} key={product}>           
            <div className="card-body">
              <h5 className="card-title">{data[product].product_name}</h5>
              <hr/>
              <p className="card-text">{data[product].default_description}</p>                                      
            <Link to={`/purchase/${data[product].id}`} className="btn btn-primary">Purchase</Link>        
            </div>     
          </div>)
        })}
               
    </div>                 
     
        </div>
    );
}

export default Products;