import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link, useHistory, useParams } from 'react-router-dom'

function MyBusinesses() {
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
        axios.get('/api/my_businesses')
        .then(function (response){                  
            if (response.data.length == 0){
                setMsg('No businesses available')  
                return              
            }else{
                setData(response.data.businesses)  
            }
            
        })        
      },[])         
    return (
        <div>   
            <div className="text-center" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop:"20px"}}>            
            <h1 className='text-danger text-center'>{msg}</h1> 
            <h3 className='text text-center'>Select a business</h3> <br/>
        { Object.keys(data).map(business=> {   
            {console.log(data[business])}     
           return( <div className="card" style={{width: "18rem", margin:"auto"}} key={business}>           
            <div className="card-body">
            <h3 className="card-title"><strong>{data[business].business_name}</strong></h3>
              <h6 className="card-title">Phone: {data[business].business_phone}</h6>                             
            <Link to={`/my_product/${data[business].id}`} className="btn btn-primary">view products</Link>      
            </div>     
          </div>)
        })}
               
    </div>                 
     
        </div>
    );
}

export default MyBusinesses;