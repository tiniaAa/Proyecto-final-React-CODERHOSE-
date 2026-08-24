import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import { Routes,Route } from 'react-router-dom';

import ItemLisContainer from "./components/ItemListContainer";
import Header from './components/Header';
import Footer from './components/Footer';
import Inicio from './components/Inicio';
import ItemDetailContainer from './components/ItemDetailContainer';
import Error from './components/Error';
import CheckoutContainer from './components/CheckoutContainer'
import { CartProvider } from './context/CartContext';
import CartContainer from './components/CartContainer';
function App() {
  

  return (
      <>
      <div className="app-container">
        <CartProvider>
          <Header/>
            <main className="main-content">
              <Routes>
                <Route path='/' element={<Inicio/>}/>
                <Route path='/catalogo' element={<ItemLisContainer mensaje={"Catalogo"}/>}/>
                <Route path='/catalogo/filtro/:type' element={<ItemLisContainer mensaje={"Categoria:"}/>}/>
                <Route path='/productoDetalle/:id' element={<ItemDetailContainer/>}/>
                <Route path='/carrito' element={<CartContainer/>}/>
                <Route path='/check' element={<CheckoutContainer/>}/>
                <Route path='*' element={<Error/>}/>
              </Routes>
            </main>
          <Footer/>
        </CartProvider>
      </div>  
    </>
  )
}

export default App
