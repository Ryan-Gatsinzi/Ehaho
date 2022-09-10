import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link, useHistory, useParams, useNavigate } from 'react-router-dom';


function Edit() {
    const check = localStorage.getItem('user');
    if (check == null){
        return window.location.href = '/'
    }
    const navigate = useNavigate();
    const { id } = useParams();
    const [Id, setId] = useState("");    
    const [data, setData] = useState("");    
    const [data2, setData2] = useState("");    
    const [minimum_order_quantity, setMinimum_order_quantity] = useState();
    const [minimum_order_indicator, setMinimum_order_indicator] = useState();
    const [opening_stock, setOpening_stock] = useState();
    const [price, setPrice] = useState();
    const [default_unit_package, setDefault_unit_package] = useState();
    const [product_description, setProduct_description] = useState();
    const [error, setError] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('user').token;

    const loader = ()=>{     
        return <div className='parent'><div className="loader"></div></div>
    }        
    useEffect(() => {
      axios.get(`/api/edit/${id}`)
      .then(function (response){        
        setData2(response.data)      
        setMinimum_order_quantity(response.data.product.minimum_order_quantity)
        setMinimum_order_indicator(response.data.product.minimum_order_indicator)
        setOpening_stock(response.data.product.opening_stock)
        setPrice(response.data.product.product_price)
        setProduct_description(response.data.product.product_description)      
        setLoading(false)                   
      })                   
      },[])               
    if(loading == true){
        return loader()
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

    const edit_product = (e)=>{
        e.preventDefault();        
        handelValidation();                 
        const formData = new FormData()
        formData.append('image',document.querySelector('#image').files[0])
        formData.append('id',data2.product.id)
        formData.append('product_id',data2.product.product_id)
        formData.append('product_price',data2.product.product_price)
        formData.append('default_unit_package',document.querySelector('#default_unit_package').value)
        formData.append('product_description',product_description)
        formData.append('opening_stock',opening_stock)
        formData.append('minimum_order_quantity',minimum_order_quantity)
        formData.append('minimum_order_indicator',minimum_order_indicator)
        formData.append('check',document.querySelector('#check'))
                
        if(handelValidation() == true){    
          console.log(document.querySelector('#image').files[0])     
            axios.post('/api/update',formData, {
              headers:{
                headers: {
                  "Content-Type": "multipart/form-data",
                }
              }
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
                console.log(err)   
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
              <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2"> Product name: <i>{data2 && data2.product_name}</i></h3>
              <span style={{color:'green', paddingBottom:'30px', fontSize:'15px'}}>{message}</span>
              <span style={{color:'red', paddingBottom:'30px', fontSize:'15px'}}>{error &&  error.reduce((errors, err)=> errors+", "+err ,"").substring(1)}</span>
              <form className="px-md-2" onSubmit={edit_product} encType='multipart/form-data'>
              {data2 && <input name="image" id="image" className="btn btn-success btn-sm mb-1 float-md-right" type="file"/>}            
                <div className="row">
                  <div className="col-md-6 mb-4"> 
                    <input type="number" name="product_id" value="{{$product->id}}" hidden/>
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
  
                  </div>
                  <div className="col-md-6 mb-4">
  
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
 
                    {data2 && Object.keys(data2.packaging).map(pckg=> {                   
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
                    <div class="form-group form-check">
                        <label class="form-check-label" for="exampleCheck1">Publish product</label>
                        { data2.product.product_published == 'Yes' ? <input type="checkbox" class="form-check-input" id="check" checked/> : <input type="checkbox" class="form-check-input" id="check"/>}                                          
                     </div>
  
                <button type='submit' id="sumbit" className="btn btn-success btn-lg mb-1">Edit</button>
  
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

export default Edit;