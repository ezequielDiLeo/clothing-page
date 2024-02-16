import './App.css'
import './styles/styles.scss'
import { Navbar } from './components/Navbar/Navbar'
import { ItemListContainer } from './components/ItemListContainer/ItemListContainer'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { PokeApi } from './ejemplo/pokeapi/PokeApi'
import { ItemDetailContainer } from './components/ItemDetailContainer/ItemDetailContainer'
import { CartProvider } from './components/Cartwidget/CartContext'
import { CartView } from './components/CartView/CartView'
import { ItemProductContainer } from './components/ItemProductContainer/ItemProductContainer'
import { Footer } from './components/Footer/Footer'


function App() {

  return (
        <CartProvider>

            <BrowserRouter>

              <Navbar />

              <Routes>
                <Route path='/' element={<ItemListContainer />}/> 
                <Route path='/pokeapi' element={<PokeApi />} />
                <Route path='/item/:itemId' element={<ItemDetailContainer />}/>
                <Route path='cart' element={<CartView/>} />
                <Route path='/productos/:categoryName' element={ <ItemListContainer /> }/>
                <Route path='/items/:categoryId' element= { <ItemProductContainer /> } />
                <Route path='*' element= { <h2 className=''>Page Not Found ERR 404</h2> } />
              </Routes>

              <Footer/>

            </BrowserRouter>
        </CartProvider>

  );
}

export default App
