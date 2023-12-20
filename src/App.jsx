import './App.css'
import './styles/styles.scss'
import { Navbar } from './components/Navbar/Navbar'
import { ItemListContainer } from './components/ItemListContainer/ItemListContainer'
/*import { Componentes } from './components/componentes/Componentes'*/
import { Clicker } from './components/Clicker/Clicker'
/* import { PokeApi } from './components/pokeapi/PokeApi' */

function App() {
  return (
    <>
        <Navbar />
        <ItemListContainer/>
        {/* <Clicker /> */}
        {/* <PokeApi txt="pokeApi"/> */}
    </>
  )
}

export default App
