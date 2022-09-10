import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Layout from "./layout"
import Login from "./login"
import Home from "./Home"
import Products from "./Products"
import MyProducts from "./MyProducts"
import MyBusinesses from "./MyBusinesses"
import Purchase_view from "./Purchase_view"
import Edit from './Edit'
import Gallery from './Gallery'
import Business_product_gallery from './Business_product_gallery'
import Add_more from './Add_more'
import Sell from './Sell'


const App = () =>{
  return (
    <>  
    <Router>  
    <Layout />     
      <Routes> 
        <Route exact path="/" element={<Home />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<Purchase_view />} />
        <Route path="/my_products" element={<MyProducts />} />
        <Route path="/edit/:id" element={<Edit />} />     
        <Route path="/gallery/:id" element={<Gallery />} />  
        <Route path="/business_products_gallery/:id" element={<Business_product_gallery />} />  
        <Route path="/add_more" element={<Add_more />} />  
        <Route path="/sell" element={<Sell />} />  
      </Routes>
    </Router>  
    </>     
)
  }

export default App