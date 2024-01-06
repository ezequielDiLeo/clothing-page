import './App.css'
import './styles/styles.scss'
import { Navbar } from './components/Navbar/Navbar'
import { ItemListContainer } from './components/ItemListContainer/ItemListContainer'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { PokeApi } from './components/pokeapi/PokeApi'
import { ItemDetailContainer } from './components/ItemDetailContainer/ItemDetailContainer'

function App() {
  return (
      <BrowserRouter>

          <Navbar />

          <Routes>
            <Route path='/' element={<ItemListContainer />}/> 
            <Route path='/pokeapi' element={<PokeApi />} />
            <Route path='/item/:itemId' element={<ItemDetailContainer />}/>
            <Route path='/productos/:categoryId' element={ <ItemListContainer /> }/>
            <Route path='*' element= { <h2 className=''>Page Not Found ERR 404</h2> } />
          </Routes>

      </BrowserRouter>
  );
}

export default App
