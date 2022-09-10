import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link, useHistory, useParams, useNavigate } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css'

function DelBtn(prop){
  prop.count
  return(
    <>
      <h2 className="delete_prod" onClick={() => delete_product(count)}>
      <span aria-hidden="true" className="close" data-dismiss="modal" aria-label="Close">&times;</span>
      </h2>
    <hr />
    </>    
    
  );
}

function Add_more(){
    const check = localStorage.getItem('user');
    if (check == null){
        return window.location.href = '/'
    }
    const { id } = useParams();
    const navigate = useNavigate();    
    const [data, setData] = useState("");
    const product = [];
    const [purchase_unit_price, setpurchase_unit_price] = useState([]);
    const [quantity, setquantity] = useState([]);
    const [product_discount, setProduct_discount] = useState([]);
    const [receipt_number, setReceipt_number] = useState("");
    const [date, setDate] = useState("");
    const [error, setError] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('user').token;
    let count = 0;

    const loader = ()=>{     
        return <div className='parent'><div className="loader"></div></div>
    }    

    useEffect(() => {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`        
        axios.get(`/api/add_more_form/${id}`)
        .then(function (res){
            setData(res.data)
            if (res.data.products.length == 0){
              setError(['No products available'])              
            }            
            setLoading(false)
        })       
      },[]) 

    if(loading == true){
        return loader()
    }
    const handelValidation = ()=>{
        let formIsValid = true;
        const params = {
            'Price':purchase_unit_price,
            'Quantity':quantity,
            'Discount':product_discount,
            'receipt number':receipt_number,
            'Date':date
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
      const price = []
      document.querySelectorAll('[name="purchase_unit_price"]').forEach(el =>{
        price.push(el.value)      
      })

      const quantity = []
      document.querySelectorAll('[name="quantity"]').forEach(el =>{
        quantity.push(el.value)      
      })
      
      const discount = []
      document.querySelectorAll('[name="product_discount"]').forEach(el =>{
        discount.push(el.value)      
      })

      if(price[price.length - 1] != ''|| quantity[quantity.length - 1] != ''|| discount[discount.length - 1] != ''){
        prod_div.innerHTML += prod_fields        
        count++;
        product.push({
                  id:count,
                  business_product_id:'',
                  purchase_unit_package:document.querySelector('#purchase_unit_package').value,
                  product_discount:discount[discount.length - 1],
                  purchase_unit_price:price[price.length - 1],
                  purchase_quantity:quantity[quantity.length - 1],      
                })
        console.log(product)
        }else{
          alert('Fill all fields')
        } 
      handelValidation();      
      if(handelValidation() == true){     
            
        axios.post('/api/add_more', {
                business_product_id: id,           
                business_id:data.products.business_id,
                supplier_id:1,
                receipt_number:receipt_number,
                purchase_unit_package:document.querySelector('#purchase_unit_package').value,
                purchase_date:date,
                product_discount:product_discount,
                purchase_unit_price:purchase_unit_price,
                purchase_quantity:quantity,
                payment_method:document.querySelector('#payment_method').value, 
                purchase_channel:'Offline',
                purchase_platform:'Web'
              })
              .then(function (response){
                setMessage(response.data.message);
                if(response.data.error){
                  setError(response.data.error); 
                }          
                setTimeout(function(){
                    navigate(-1)              
                  },1500)         
              })
              .catch(function (err) {
                setError(err)        
              });
        }        
    }

    const another = ()=>{
      const prod_div = document.querySelector('#prod_div');
      const prod_fields = document.querySelector('#prod_fields').outerHTML;    
      const price = []
      document.querySelectorAll('[name="purchase_unit_price"]').forEach(el =>{
        price.push(el.value)      
      })

      const quantity = []
      document.querySelectorAll('[name="quantity"]').forEach(el =>{
        quantity.push(el.value)      
      })
      
      const discount = []
      document.querySelectorAll('[name="product_discount"]').forEach(el =>{
        discount.push(el.value)      
      })
      if(price[price.length - 1] != ''|| quantity[quantity.length - 1] != ''|| discount[discount.length - 1] != ''){
        prod_div.innerHTML += prod_fields
        count++;
        document.querySelector('#prod_fields').id = count             
        document.querySelector('#prod_fields').innerHTML += String(<DelBtn count={count}/>)
        product.push({
                  id:count,
                  business_product_id:'',
                  purchase_unit_package:document.querySelector('#purchase_unit_package').value,
                  product_discount:discount[discount.length - 1],
                  purchase_unit_price:price[price.length - 1],
                  purchase_quantity:quantity[quantity.length - 1],      
                })
      console.log(product)
      }else{
        alert('Fill all fields')
        return
      }      
    }    
    
    const delete_product = (prod_num)=>{
      console.log(prod_num)
      const product_div = document.querySelectorAll('#prod_fields')
        product_div.forEach(el=>{
          alert(el)
          if(el.id == prod_num){            
            el.remove()
            product.forEach((prod, index) => {
              if(prod.id == prod_num){
                product.splice(index, 1)                
              }              
            })
  
          }
        })
        console.log(product)
    }
    return (       
        <div>
            <section className="h-100 h-custom">
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-lg-8 col-xl-6">
          <div className="card rounded-3">           
            <div className="card-body p-4 p-md-5">                         
              {/* <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Product name: <i>{data && data.product_name}</i></h3> */}
              <span style={{color:'green', paddingBottom:'30px', fontSize:'15px'}}>{message}</span>
              <span style={{color:'red', paddingBottom:'30px', fontSize:'15px'}} className='text-large'>{error && error.reduce((errors, err)=> errors+", "+err ,"").substring(1)}</span>              
              <form className="px-md-2" onSubmit={purchase_product}>              
              {/* Button trigger modal */}        
              
              <h5 onClick={another}><span aria-hidden="true" className="close" data-dismiss="modal" aria-label="Close" style={{cursor:'pointer', paddingBottom: '20px'}}> <h2>+</h2></span></h5>
              <hr/>
              <div id='prod_div'>                                      
                <div id='prod_fields'>
                  <div className="row">                
                <div className="col-md-6 mb-4"> 
                  <div className="form-outline datepicker" style={{paddingRight: '25px', paddingBottom: '25px'}}>
                    <label className="form-label">Price</label>
                    <input type="number" className="form-control" name="purchase_unit_price" id="exampleDatepicker1"  placeholder="Rwanda francs" value = {purchase_unit_price} onChange={(event) => setpurchase_unit_price(event.target.value)}/>  
                                        
                    <p className="text-danger h6"></p>                                           
                  </div>
                

                </div>  <div className="col-md-6 mb-4">

                  <div className="form-outline datepicker"  style={{paddingLeft: '25px', paddingBottom: '25px'}}>
                      <label className="form-label">Discount (%)</label>
                      <input type="number" className="form-control" name="product_discount" id="exampleDatepicker1"  value = {product_discount} onChange={(event) => setProduct_discount(event.target.value)} placeholder='Discount in percentage'/>
                      
                        <p className="text-danger h6"></p>
                      
                    </div>
                    
                </div>
              </div>
              <div className="form-outline datepicker"  style={{paddingRight: '25px', paddingBottom: '25px'}}>
                    <label className="form-label">Quantity</label>
                      <input type="number" name="quantity" className="form-control"  value = {quantity} onChange={(event) => setquantity(event.target.value)} placeholder='Quantity'/>
                      
                      <p className="text-danger h6"></p>
                      
                  </div>
                  
              <div className="mb-4">                                   
                <label className="form-label">Packaging</label>
                <select className="form-select" id="purchase_unit_package">
                  { data && Object.keys(data.packaging).map(pckg=> {                   
                  return(<option value={data.packaging[pckg].id} key={pckg}>{data.packaging[pckg].package_name}</option>)
                  })}                                 
                          </select>  
                          
                  <p className="text-danger h6"></p>             
              </div>  
              <div className='del'></div>
                </div>                                           
              <hr/>             
              </div>                
          {/* <div className="d-grid gap-2 d-md-flex" style={{paddingBottom: '20px'}}>
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalScrollable">
            Prouduct information 
            </button>
            <h2><span aria-hidden="true" className="close" id='delete_prod' data-dismiss="modal" aria-label="Close" style={{cursor:'pointer'}}>&times;</span></h2>
          </div> */}
              
              {/* Modal */}
              {/* <div className="modal fade" id="exampleModalScrollable" tabindex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-scrollable" role="document">
                  <div className="modal-content">
                    <div className="modal-header">   */}
                    {/* <h2>#{productNum}</h2>                     */}
                      {/* <h2><span aria-hidden="true" className="close" data-dismiss="modal" aria-label="Close" style={{cursor:'pointer'}}>&times;</span></h2>
                    </div>
                    <div className="modal-body">
                    <div className="row">                
                <div className="col-md-6 mb-4"> 
                  <div className="form-outline datepicker" style={{paddingRight: '25px', paddingBottom: '25px'}}>
                    <label className="form-label">Price</label>
                    <input type="number" className="form-control" name="purchase_unit_price" id="exampleDatepicker1"  placeholder="Rwanda francs" value = {purchase_unit_price} onChange={(event) => setpurchase_unit_price(event.target.value)}/>   
                    <p className="text-danger h6"></p>                                           
                  </div>

                  <div className="form-outline datepicker"  style={{paddingRight: '25px', paddingBottom: '25px'}}>
                    <label className="form-label">Quantity</label>
                      <input type="number" name="quantity" className="form-control"  value = {quantity} onChange={(event) => setquantity(event.target.value)}/>
                      <p className="text-danger h6"></p>
                      
                  </div>

                </div>  <div className="col-md-6 mb-4">

                  <div className="form-outline datepicker"  style={{paddingLeft: '25px', paddingBottom: '25px'}}>
                      <label className="form-label">Discount (%)</label>
                      <input type="number" className="form-control" name="product_discount" id="exampleDatepicker1"  value = {product_discount} onChange={(event) => setProduct_discount(event.target.value)}/>
                        <p className="text-danger h6"></p>
                      
                    </div>

                    <div className="form-outline datepicker"  style={{paddingLeft: '25px', paddingBottom: '25px'}}>
                      <label className="form-label">Reciept number</label>
                        <input type="number" name="receipt_number" className="form-control" value = {receipt_number} onChange={(event) => setReceipt_number(event.target.value)}/>  
                        <p className="text-danger h6"></p>                                                
                    </div>
                </div>
              </div>

              <div className="mb-4">                                   
                <label className="form-label">Packaging</label>
                <select className="form-select" id="purchase_unit_package">                                  

                  { data && Object.keys(data.packaging).map(pckg=> {                   
                  return(<option value={data.packaging[pckg].id} key={pckg}>{data.packaging[pckg].package_name}</option>)
                  })}                                 
                          </select>                 
                  <p className="text-danger h6"></p>                   
              </div>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                      <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                  </div>
                </div>
              </div>            */}
                <div className="mb-4">                                   
                  <label className="form-label">Supplier</label>
                  <select className="form-select" id="supplier_id" name="supplier_id">                                                          
                    <option value='3'>Generyal Supplier</option>
                  </select>               
                    <p className="text-danger h6"></p>                   
                </div>
                <div className="mb-4">                                   
                  <label className="form-label">Payment method</label>
                  <select className="form-select" id="payment_method" name="payment_method">                                                          
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
                        <input name="date" type="date" className="form-control" id="exampleFormControlTextarea1" value={date} onChange={(event) => setDate(event.target.value)}/>   
                       
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

export default Add_more;