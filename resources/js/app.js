// /**
//  * First we will load all of this project's JavaScript dependencies which
//  * includes React and other helpers. It's a great starting point while
//  * building robust, powerful web applications using React + Laravel.
//  */

// require('./bootstrap');

// /**
//  * Next, we will create a fresh React component instance and attach it to
//  * the page. Then, you may begin adding components to this application
//  * or customize the JavaScript scaffolding to fit your unique needs.
//  */

require('./components/App');
import React from 'react';
import { render }  from 'react-dom';
import App from './components/App'
const el = document.querySelector('#roots');


// const root = createRoot( document.querySelector("#root") );
// root.render( <App /> );

render(<App />, el);
// import React from 'react';
// // import { createRoot }  from 'react-dom/client';
// import App from './components/App'
// const root = createRoot( document.querySelector("#root") );
// root.render( <App /> );

//ReactDOM.render(<App />, document.getElementById('#root'))