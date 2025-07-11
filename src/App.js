import './App.css';
import { Routes,Route } from 'react-router-dom';
import ProductDetails from "./Component/ProductDetails"
import Home from './Component/Home';
import LogIn from './Component/LoginRegister/LogIn ';
import Registerpage from './Component/LoginRegister/Register';
import MainLayout from './Component/Mainlayout';
import Cart from './Component/Cart/Cart';
import Checkout from './Component/Cart/CheckOut';
import { useState } from 'react';
function App() {
  const [cart, setCart] = useState([]);
  const [searchProduct, setSearchProduct] = useState("");
  
  return (
   <Routes>
    <Route path='/login' element={<LogIn/>}/>
    <Route path='/Register' element={<Registerpage/>}/>
    <Route element={<MainLayout cart={cart}  setCart={setCart} searchProduct={searchProduct} setSearchProduct={setSearchProduct} />}>
        <Route path="/" element={<Home  cart={cart} setCart={setCart} searchProduct={searchProduct}/> }/>
        <Route path="/product/:id" element={<ProductDetails cart={cart} setCart={setCart} />} />
        <Route path='/cart' element={<Cart  cart={cart} setCart={setCart}/>} />
        <Route path="/checkout" element={<Checkout cart={cart} setCart={setCart} />} />
      </Route>
   </Routes>
  );
}
export default App;
