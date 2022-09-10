import React, {useState} from 'react';
import axios from 'axios';
function Home() {
    const isLoggedIn = JSON.parse(localStorage.getItem('user'))
    const [welcomeMsg, setWelcomeMsg] = useState(isLoggedIn != null ? `Welcome ${isLoggedIn.user_info.first_name}`:"Login to access application");       
    return (        
        <div>
            <h1 className='text-center'>{welcomeMsg}</h1><br/>
        </div>
    );
}

export default Home;