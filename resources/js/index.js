import React from 'react';
import { Router }  from 'react-router-dom';
import App from './components/App'
// const el = document.querySelector('#root');


// const root = createRoot( document.querySelector("#root") );
// root.render( <App /> );

Router(<App />, document.getElementById('#root'));