import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link, useHistory, useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import 'font-awesome/css/font-awesome.min.css'

function Sell(){
    const check = localStorage.getItem('user');
    if (check == null){
        return window.location.href = '/'
    }
    const { id } = useParams();
    const navigate = useNavigate();    
    const [dataOG, setDataOG] = useState("");
    const [data, setData] = useState("");
    const [error, setError] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('user').token;

    const loader = ()=>{     
        return <div className='parent'><div className="loader"></div></div>
    }    

    useEffect(() => {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`        
        axios.get(`/api/get_b_prod`)
        .then(function (res){
          setDataOG(res.data.products)
            if (res.data.products.length == 0){
              setError(['No products available'])              
            }                    
            setLoading(false)
        })       
      },[]) 

      const handleFormData = (prod_id) => {    
        axios.defaults.headers.common.Authorization = `Bearer ${token}`        
        axios.get(`/api/add_more_form/${prod_id}`)
        .then(function (res){
          setData(res.data)
          document.querySelector('#packaging').disabled = false
            if (res.data.products.length == 0){
              setError(['No products available'])              
            }                        
        })       
      }

    if(loading == true){
        return loader()
    }

    const purchase_product = (values)=>{
      const paid = [];    
      values.products.forEach(el => {
        paid.push(el.order_quantity*el.order_unit_price)
        console.log(paid)
      });                         
        axios.post('/api/sell', {
                product_info :values, 
                order_channel:'Offline',
                order_platform:'Web',
                order_paid_amount:paid.reduce((a, b)=> a+b, 0)
              })
              .then(function (response){
                setMessage(response.data.message);
                if(response.data.error){
                  setError(response.data.error); 
                }                      
              })
              .catch(function (err) {
                setError(err)        
              });               
    }       
    return (       
        <div>          
            <section className="h-100 h-custom">
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-lg-8 col-xl-6">
          <div className="card rounded-3">           
            <div className="card-body p-4 p-md-5">                         
              <span style={{color:'green', paddingBottom:'30px', fontSize:'15px'}}>{message}</span>
              <span style={{color:'red', paddingBottom:'30px', fontSize:'15px'}} className='text-large'>{error && error.reduce((errors, err)=> errors+", "+err ,"").substring(1)}</span>
              <Formik
              initialValues={{products:[{order_unit_price:'',order_quantity:'',product_discount:'', business_product_id:'', order_unit_package:''}],sale_date:'', buyer_id:'',payment_method:''}}
              >
                {({
                  values,
                  handleChange,
                  handleSubmit,
                  touched,
                  handleBlur,
                  errors,
              })=>(
              <form className="px-md-2" onSubmit={(e) => {
                e.preventDefault();
                purchase_product(values);
            }}>              
              <hr/>                   
              <FieldArray name='products'>               
                {
                  ({push, remove}) => {
                    return(
                      <div id='prod_fields'>                      
                        {
                          values.products.map((product, index)=>{  
                             return(                                                     
                            <div key={index}>        
                            <div className="mb-4">                                   
                                <label className="form-label">Products</label>
                                <select className="form-select" name={`products[${index}].business_product_id`} onChange={ (e) => {handleFormData(e.target.value);handleChange(`products[${index}].business_product_id`)(e)}}>
                                  <option selected disabled value='0'>Select a product</option>
                                  { Object.keys(dataOG).map((product,index)=> {                                    
                                  return(<option value={dataOG[product].id} key={index}>{dataOG[product].product_name}</option>)
                                  })}                                 
                                  </select>                 
                                  <p className="text-danger h6"></p>                   
                              </div>                                                  
                             <div className="row" >                
                              <div className="col-md-6 mb-4"> 
                                <div className="form-outline datepicker" style={{paddingRight: '25px', paddingBottom: '25px'}}>
                                  <label className="form-label">Price</label>
                                  <input type="number" className="form-control" name={`products[${index}].order_unit_price`} onChange={handleChange(`products[${index}].order_unit_price`)} placeholder="Rwanda francs"  required/>  
                                                      
                                  <p className="text-danger h6"></p>                                           
                                </div>
                              

                              </div>  <div className="col-md-6 mb-4">

                                <div className="form-outline datepicker"  style={{paddingLeft: '25px', paddingBottom: '25px'}}>
                                    <label className="form-label">Discount (%)</label>
                                    <input type="number" className="form-control" name={`products[${index}].product_discount`} onChange={handleChange(`products[${index}].product_discount`)} placeholder='Discount in percentage' required/>
                                    
                                      <p className="text-danger h6"></p>
                                    
                                  </div>
                                  
                              </div>
                            </div>
                            <div className="form-outline datepicker"  style={{paddingRight: '25px', paddingBottom: '25px'}}>
                                  <label className="form-label">Quantity</label>
                                    <input type="number" name={`products[${index}].order_quantity`} onChange={(e)=>{handleChange(`products[${index}].order_quantity`)(e); if(e.target.value > data.stock) {alert(`The quantity entered is more than the curren stock of ${data.stock}`)
                                  e.target.value = ''
                                  }}} className="form-control" placeholder='Quantity' required/>                                    
                                    <p className="text-danger h6"></p>                                    
                                </div>                                
                            <div className="mb-4">                                   
                              <label className="form-label">Packaging</label>                                                            
                              <select className="form-select" onChange={handleChange(`products[${index}].order_unit_package`)} name={`products[${index}].order_unit_package`}>
                              <option selected disabled value="0">Select a packaging</option>
                                { data && Object.keys(data.packaging).map(pckg=> {                                                
                                return(<option value={data.packaging[pckg].id} key={pckg}>{data.packaging[pckg].package_name}</option>)
                                })}                                 
                                        </select>  
                                        
                                <p className="text-danger h6"></p>             
                            </div>                              
                            <h5 onClick={() => {push('')}}><span aria-hidden="true" className="add" data-dismiss="modal" aria-label="Close" style={{cursor:'pointer', paddingBottom: '20px'}}> <h2>+</h2></span></h5>  
                            {index > 0 && 
                            <h5 onClick={() => {remove(index)}} style={{alignItems:'right'}}><span aria-hidden="true" className="close" data-dismiss="modal" aria-label="Close" style={{cursor:'pointer', paddingBottom: '20px'}}> X</span></h5>  
                          }                         
                            <hr/>                               
                            </div>
                             )
                          })
                        }
                           
                      </div>
                          )
                        }
                      }                                              
                
                </FieldArray>                                                                                
                <div className="mb-4">                                   
                  <label className="form-label">Buyer</label>
                  <select className="form-select" name="buyer_id" onChange={handleChange("buyer_id")}>    
                  <option selected disabled value="0">Select a supplier</option>                                                      
                    <option value='1'>General buyer</option>
                  </select>               
                    <p className="text-danger h6"></p>                   
                </div>
                <div className="mb-4">                                   
                  <label className="form-label">Payment method</label>
                  <select className="form-select" name="payment_method" onChange={handleChange("payment_method")}>  
                  <option selected disabled value="0">Select a payment method</option>                                                        
                    <option value='Cheque'>Cheque</option>
                    <option value='Mobile Money'>Mobile Money</option>
                    <option value='Visa'>Visa</option>
                    <option value='Bank Transfer'>Bank Transfer</option>
                    <option value='Cash'>Cash</option>
                  </select>                 
                    <p className="text-danger h6"></p>                   
                </div>

                    <div className="mb-3">
                        <label className="form-label">Date purchased</label>
                        <input name="sale_date" type="date" className="form-control" onChange={handleChange("sale_date")} required/>   
                       
                          <p className="text-danger h6"></p>                                      
                    </div>
  
                <button type='submit' id="sumbit" className="btn btn-success btn-lg mb-1">Submit</button>
  
              </form>
                  )}
              </Formik> 
  
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
        </div>
    );
}

export default Sell;