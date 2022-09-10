import React, {useState, usena} from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {   
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [passwordError, setpasswordError] = useState("");
    const [phoneError, setphoneError] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [data, setData] = useState("");
    const navigate = useNavigate();
    const handleValidation = (event) => {
      let formIsValid = true;
  
      if (!phone.match(/^[0-9]{10}$/)) {
        formIsValid = false;
        setphoneError("Phone Not Valid only letters and length must be 10 Chracters long");
        return false;
      } else {
        setphoneError("");
        formIsValid = true;
      }
  
      if (password.length == 0) {
        formIsValid = false;
        setpasswordError(
          "Password is not valid"
        );
        return false;
      } else {
        setpasswordError("");
        formIsValid = true;       
      }
  
      return formIsValid;
    };
  
    const loginSubmit = (e) => {
      e.preventDefault();
      handleValidation();
      if(handleValidation() == true){
        console.log(handleValidation());
        axios.post('/api/login', {
          phone: phone,
          pwd: password
        })
        .then(function (response){
          setMessage(response.data.message);
          if(response.data.error){
            setError(response.data.error); 
          }else{
            localStorage.setItem('user',JSON.stringify(response.data));
            setTimeout(function(){              
              window.location.href = "/";              
            },1500)            
          }                    
        })
        .catch(function (err) {
          setError(err)        
        });
      }      
    };
     return (
      <div className="App">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-md-4" style={{paddingTop: '50px'}}>
              <span style={{color:'green', paddingBottom:'30px', fontSize:'15px'}}>{message}</span>
              <span style={{color:'red', paddingBottom:'30px', fontSize:'15px'}}>{error}</span>
              <form id="loginform" onSubmit={loginSubmit}>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="number"
                    className="form-control"
                    id="PhoneInput"
                    name="phone"
                    aria-describedby="phoneHelp"
                    placeholder="Enter Phone"
                    onChange={(event) => setPhone(event.target.value)}
                  />
                  <small id="phoneHelp" className="text-danger form-text">
                    {phoneError}
                  </small>
                </div>
                <div className="form-group" style={{paddingTop: '20px'}}>
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Password"
                    onChange={(event) => setPassword(event.target.value)}
                  />
                  <small id="passworderror" className="text-danger form-text">
                    {passwordError}
                  </small>
                </div>               
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>           
          </div>
        </div>
      </div>
    );
}

export default Login;