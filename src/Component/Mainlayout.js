import React from 'react';
import Nav from './Nav'; 
import Footer from './Footer/Footer';
import { Outlet } from 'react-router-dom';
const MainLayout = ({searchProduct, setSearchProduct,cart,setCart}) => {
  return (
    <>
      <Nav cart={cart}  searchProduct={searchProduct} setSearchProduct={setSearchProduct}/>
      <div className="container mt-4" >
        <Outlet /> 
      </div>
      <Footer/>
    </>
  );
};

export default MainLayout;
