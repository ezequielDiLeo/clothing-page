
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Navbar } from '../components/Navbar/Navbar'
import { ItemListContainer } from '../components/ItemListContainer/ItemListContainer'
import { Checkout } from '../components/Checkout/Checkout'
import { ItemDetailContainer } from '../components/ItemDetailContainer/ItemDetailContainer'
import { CartView } from '../components/CartView/CartView'
import { ItemProductContainer } from '../components/ItemProductContainer/ItemProductContainer'
import { Footer } from '../components/Footer/Footer'
import { Ticker } from '../components/ticker/ticker'
import { ScrollToTop } from '../components/scrollToTop/scrollToTop';
import { Help } from '../components/ayuda/ayuda'
import { Faq } from '../components/faq/faq'
import { Devoluciones } from '../components/devoluciones/devoluciones'
import { Envios } from '../components/envios/envios'
import { ProtectedRouteWithModal } from '../components/ProtectedRouteWithModal/ProtectedRouteWithModal'
import { useState } from 'react'
import { LoginScreen } from '../components/LoginScreen/LoginScreen'
import { RegisterScreen } from '../components/registerScreen/register'



export const AppRouter = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);


  return (
    <>
         
        <BrowserRouter>
          <ScrollToTop />
          <Ticker />
          <Navbar />

          <Routes>
              {/* Rutas públicas */}
              <Route path='/' element={<ItemListContainer />} />
              <Route path='/item/:itemId' element={<ItemDetailContainer />} />
              <Route path='/productos/:categoryName' element={<ItemListContainer />} />
              <Route path='/items/:categoryId' element={<ItemProductContainer />} />
              <Route path='/cart' element={<CartView />} />
              <Route path="/ayuda" element={<Help />} />
              <Route path="/faq" element={<Faq />} />
              <Route path='/devoluciones' element={<Devoluciones />} />
              <Route path='/envios' element={<Envios />} />

              {/* Rutas protegidas */}
              <Route path='/checkout' element={
                <ProtectedRouteWithModal onShowLogin={() => setShowLogin(true)}>
                  <Checkout />
                </ProtectedRouteWithModal>
              }
            />

              {/* Catch all */}
              <Route path='*' element={<Navigate to='/' />} />
          </Routes>

          {showLogin && (
            <LoginScreen
              onClose={() => setShowLogin(false)}
              onSwitch={() => {
                setShowLogin(false);
                setShowRegister(true);
              }}
            />
          )}
          {showRegister && (
            <RegisterScreen
              onClose={() => setShowRegister(false)}
              onSwitch={() => {
                setShowRegister(false);
                setShowLogin(true);
              }}
            />
          )}



          <Footer />
        </BrowserRouter>
    </>
  )
}
