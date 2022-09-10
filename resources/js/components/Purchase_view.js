import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link, useHistory, useParams, useNavigate } from 'react-router-dom';

function Purchase_view() {
    const check = localStorage.getItem('user');
    if (check == null){
        return window.location.href = '/'
    }
    const navigate = useNavigate();
    const [data, setData] = useState("");
    const [data2, setData2] = useState(""); 
    const [minimum_order_quantity, setMinimum_order_quantity] = useState("");
    const [minimum_order_indicator, setMinimum_order_indicator] = useState("");
    const [opening_stock, setOpening_stock] = useState("");
    const [price, setPrice] = useState("");
    const [default_unit_package, setDefault_unit_package] = useState("");
    const [product_description, setProduct_description] = useState("");
    const [error, setError] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('user').token;

    const loader = ()=>{     
        return <div className='parent'><div className="loader"></div></div>
    }    

    useEffect(() => {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`        
        axios.get('/api/products')
        .then(function (res){
            setData(res.data.products[0])
            if (res.data.products.length == 0){
              setError(['No products available'])              
            }            
            setLoading(false)
        })       
      },[]) 

    if(loading == true){
        return loader()
    }

    const handleFormData = event => {    
      console.log(`/api/purchase/${event.target.value}`)
      axios.get(`/api/purchase_view/1`)
        .then(function (response){
            setData2(response.data)  
            console.log(error); 
            document.querySelector('#gallery').disabled = false;     
            setProduct_description(response.data.product.default_description)                     
        })                  
    }
    const handelValidation = ()=>{
        let formIsValid = true;
        const params = {
            'Minimum order quantity':minimum_order_quantity,
            'Minimum order indicator':minimum_order_indicator,
            'Opening stock':opening_stock,
            'Price':price,
            'Product description':product_description
                    }
            const err = new Array();
            Object.keys(params).map(el=>{
            if(params[el] == ""){                
                err.push(`${el} can not be empty`)                             
                setError(err);
                formIsValid = false;
            }

        });
        setError(err);
       return formIsValid
    }

    const purchase_product = (e)=>{
        e.preventDefault();        
        handelValidation(); 
        console.log(error.includes('No products available'));    
        if(handelValidation() == true){            
            axios.post('/api/purchase_product', {               
                product_id:data2.product.id,
                product_price:price,
                default_unit_package:document.querySelector('#default_unit_package').value,
                product_description:product_description,
                opening_stock:opening_stock,
                minimum_order_quantity:minimum_order_quantity,
                minimum_order_indicator:minimum_order_indicator,
              })
              .then(function (response){
                setMessage(response.data.message);
                if(response.data.error){
                  setError(response.data.error); 
                }          
                setTimeout(function(){                                
                  },1500)         
              })
              .catch(function (err) {
                setError(err)        
              });
        }        
    }

    return (       
        <div>
            <section className="h-100 h-custom">
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-lg-8 col-xl-6">
          <div className="card rounded-3">           
            <div className="card-body p-4 p-md-5"> 
            <div>
           {data2 && data2.image.length > 0 && <img class="card-img-top" src={`/storage/uploads/${data2.image[0].image_name}`} alt="Card image" style={{width:"100%"}}/>}
              </div>             
            <button id="gallery" className="btn btn-success btn-sm mb-1 float-md-right" disabled><Link to={`/gallery/${data2 && data2.product.id}`} style={{textDecoration: 'none', color:'white'}}>View product gallery</Link></button>
              <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Product name: <i>{data2 && data2.product.product_name}</i></h3>
              <span style={{color:'green', paddingBottom:'30px', fontSize:'15px'}}>{message}</span>
              <span style={{color:'red', paddingBottom:'30px', fontSize:'15px'}} className='text-large'>{error && error.reduce((errors, err)=> errors+", "+err ,"").substring(1)}</span>
              <div className="mb-4">                                   
                  <label className="form-label">Products</label>
                  <select className="form-select" id="" onChange={handleFormData}>
                  <option value='0' selected disabled>Select product</option>                                                 
                    { Object.keys(data).map(product=> {                   
                    return(<option value={data[product].id} key={product}>{data[product].product_name}</option>)
                    })}                                 
                    </select>                 
                    <p className="text-danger h6"></p>                   
                </div>
              <form className="px-md-2" onSubmit={purchase_product}>              
                <div className="row">                
                  <div className="col-md-6 mb-4"> 
                    {/* <input type="number" name="product_id" value="{{$product->id}}" hidden/> */}
                    <div className="form-outline datepicker" style={{paddingRight: '25px', paddingBottom: '25px'}}>
                      <label className="form-label">Minimum order quantity</label>
                      <input type="number" className="form-control" name="minimum_order_quantity" id="exampleDatepicker1" value = {minimum_order_quantity} onChange={(event) => setMinimum_order_quantity(event.target.value)}/>   
                      <p className="text-danger h6"></p>                                           
                    </div>

                    <div className="form-outline datepicker"  style={{paddingRight: '25px', paddingBottom: '25px'}}>
                      <label className="form-label">Minimum order indicator</label>
                        <input type="number" name="minimum_order_indicator" className="form-control"  value = {minimum_order_indicator} onChange={(event) => setMinimum_order_indicator(event.target.value)}/>
                        <p className="text-danger h6"></p>
                         
                    </div>
  
                  </div>  <div className="col-md-6 mb-4">
  
                    <div className="form-outline datepicker"  style={{paddingLeft: '25px', paddingBottom: '25px'}}>
                        <label className="form-label">Opening stock</label>
                        <input type="number" className="form-control" name="opening_stock" id="exampleDatepicker1"  value = {opening_stock} onChange={(event) => setOpening_stock(event.target.value)}/>
                          <p className="text-danger h6"></p>
                         
                      </div>
  
                      <div className="form-outline datepicker"  style={{paddingLeft: '25px', paddingBottom: '25px'}}>
                        <label className="form-label">Price</label>
                          <input type="number" name="product_price" className="form-control" placeholder="Rwanda francs"  value = {price} onChange={(event) => setPrice(event.target.value)}/>  
                           <p className="text-danger h6"></p>
                                                 
                      </div>
                  </div>
                </div>
  
                <div className="mb-4">                                   
                  <label className="form-label">Packaging</label>
                  <select className="form-select" id="default_unit_package">                                  
 
                    { data2 && Object.keys(data2.packaging).map(pckg=> {                   
                    return(<option value={data2.packaging[pckg].id} key={pckg}>{data2.packaging[pckg].package_name}</option>)
                    })}                                 
                            </select>                 
                    <p className="text-danger h6"></p>                   
                </div>

                    <div className="mb-3">
                        <label className="form-label">Description</label>
                        <textarea name="product_description" className="form-control" id="exampleFormControlTextarea1" rows="3"  value={product_description} onChange={(event) => setProduct_description(event.target.value)}></textarea>   
                       
                          <p className="text-danger h6"></p>                                      
                    </div>
  
                <button type='submit' id="sumbit" className="btn btn-success btn-lg mb-1">Submit</button>
  
              </form>
  
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
        </div>
    );
}

export default Purchase_view;