import './App.css'
import './styles/styles.scss'
import { Navbar } from './components/Navbar/Navbar'
import { ItemListContainer } from './components/ItemListContainer/ItemListContainer'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { PokeApi } from './components/pokeapi/PokeApi'

function App() {
  return (
      <BrowserRouter>
          {/* <Routes>
            <Route path='/not-found' element={null}/>
            <Route path='*' element={<Navbar />} />          
          </Routes> */}

          <Navbar />

          <Routes>
            <Route path='/' element={<ItemListContainer />}/> 
            <Route path='/pokeapi' element={<PokeApi />} />
            <Route path='/not-found' element= { <h2 className=''>Page Not Found ERR 404</h2> } />
            <Route path='*' element={<Navigate to={"/not-found"}/>} />
          </Routes>

          {/* <Footer /> */}

      </BrowserRouter>
  )
}

export default App
