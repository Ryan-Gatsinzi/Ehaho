import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link, useHistory, useParams } from 'react-router-dom';

function MyProducts() {
    const check = localStorage.getItem('user');
    if (check == null){
        return window.location.href = '/'
    }
    const { id } = useParams();
    const [msg, setMsg] = useState("");
    const [data, setData] = useState("");
    const token = localStorage.getItem('user').token;

    
    useEffect(() => {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`
        axios.get(`/api/my_products`)
        .then(function (response){
            if (response.data.products.length == 0){
                setMsg('No products available')   
                return                           
            }else{
                setData(response.data.products)              
            }                     
            
        })        
      },[])         
    return (
        <div>   
            <div className="text-center" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop:"20px"}}>  
            <h1 className='text-danger text-center'>{msg}</h1>  
        { Object.keys(data).map(prod=> {   
            {console.log(data[prod].image)}     
           return( <div className="card" style={{width: "18rem", margin:"auto"}} key={prod}> 
          {data[prod].image.length > 0 && <img className="card-img-top" src={`/storage/uploads/${data[prod].image[0].image_name}`} alt="Product image" style={{width:"100%"}}/>}     
           <hr/>                   
            <div className="card-body">
            <h3 className="card-title"><strong>{data[prod].product_name}</strong></h3>
              <h6 className="card-title">Published: {data[prod].product.product_published}</h6>
              <h6 className="card-title">Price: {data[prod].product.product_price}</h6>
              <h6 className="card-title">Packaging: {data[prod].packaging} <i>({data[prod].unit})</i></h6>
              <h6 className="card-title">Minimum order indicator: {data[prod].product.minimum_order_indicator}</h6>
              <hr/>
              <p className="card-text">{data[prod].product.product_description}</p>    
                <div className="btn-group btn-group-toggle btn-primary" data-toggle="buttons">                                        
                    <label className="btn btn-primary">
                    <Link to={`/edit/${data[prod].product.id}`} style={{textDecoration: 'none', color:'white'}}>Edit</Link> 
                    </label>
                    <label className="btn btn-primary">
            <Link to={`/business_products_gallery/${data[prod].product.id}`} className="btn-group btn-group-toggle btn-primary" style={{textDecoration: 'none', color:'white'}}>Gallery</Link>
            </label>  
                </div>             
            </div>     
          </div>)
        })}
               
    </div>                 
     
        </div>
    );
}

export default MyProducts;