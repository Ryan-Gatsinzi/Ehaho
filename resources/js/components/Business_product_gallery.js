import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link, useHistory, useParams, useNavigate } from 'react-router-dom';

function Business_product_gallery() {
    const check = localStorage.getItem('user');
    if (check == null){
        return window.location.href = '/'
    }
    const { id } = useParams();
    const token = localStorage.getItem('user').token;
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState();    

    const loader = ()=>{     
        return <div className='parent'><div className="loader"></div></div>
    }
    useEffect(() => {
        axios.defaults.headers.common.Authorization = `Bearer ${token}` 
        axios.get(`/api/business_products_gallery/${id}`)
        .then(function (response){
            setData(response.data.images)
            setLoading(false)
        })                                    
    },[]);

    if(loading == true){
        return loader()
    }
    return (
    <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel" >
        <div className="carousel-inner">
            {data &&
            data.map(image=> {

            return (<div className="carousel-item active" data-bs-interval="10000" key={image.id}>                  
                <img src={`/storage/uploads/${image.image_name}`}  alt="..."  style={{boxShadow: '10px 10px 5px', objectFit: 'cover', maxWidth:'100%', height:'300px', display:'flex', justifyContent:'center', alignItems:'center'}} className="mx-auto d-block" key={image.id}/>
            
            {/* <img src="/storage/uploads/Embe.jpg" alt="..."  style={{ width:'220px', height: '231px', display:'flex', justifyContent:'center', alignItems}}/> */}
            <div className="carousel-caption d-none d-md-block">            
            </div>
            </div>)
            })               
            }      
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
        </button>
    </div>      
    );
}

export default Business_product_gallery;