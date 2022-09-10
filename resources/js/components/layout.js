import { divide } from 'lodash';
import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import { BrowserRouter as Router, Route, Link  } from 'react-router-dom'
function Layout() {
    // const msg = document.querySelector('#msg');
    const isLoggedIn = localStorage.getItem('user')   
    const [btn, setBtn] = useState(isLoggedIn != null ? 'Logout' : 'Login')
    const [msg, setMsg] = useState("");         
    // if(isLoggedIn != null){
    //   setBtn('Logout')     
    // }
    
    const logout = ()=>{
      axios.get('/api/logout')
      .then(function (response){        
        localStorage.removeItem('user')
        setMsg(response.data.message)
        setBtn('Login')
        setTimeout(function(){
          location.href = '/'        
        }, 1500);
      })
    }

    setTimeout(function(){
      if(msg != ''){
        document.querySelector('#msg').innerHTML=''
      }        
    },1500)

    return (        
        <div>
        <nav className="navbar navbar-expand-lg bg-light" id='nav_bar'>
        <div className="container-fluid">
          <Link className="nav-link"  to="/">Ehaho</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link"  to="/">Home</Link>
              </li>             
              <li className="nav-item">
                <Link className="nav-link" to="/products">Add Products</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/my_products">My Products</Link>
              </li>         
              <li className="nav-item">
                <Link className="nav-link" to="add_more">Add more</Link>
              </li>         
              <li className="nav-item">
                <Link className="nav-link" to="sell">Sell</Link>
              </li>         
               
            </ul>            
            <span className="navbar-text">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">                                        
                    {btn == 'Logout' ? <span className= "nav-link" onClick={()=>logout()} style={{cursor:'pointer'}}>Logout</span> : <Link className="nav-link" to={btn.toLowerCase()}>{btn}</Link>}
                  </li>
              </ul>
          </span>                                  
            
          </div>
        </div>
      </nav>
      {msg ? <div id='msg'><div className="alert alert-success">{msg}</div> </div> : <div hidden></div>}
      
      
        </div>        
    );
}

export default Layout;