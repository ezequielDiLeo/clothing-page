import './App.css'
import './styles/styles.scss'
import { Navbar } from './components/Navbar/Navbar'
import { ItemListContainer } from './components/ItemListContainer/ItemListContainer'

function App() {
  return (
    <>
      <Navbar />
      <ItemListContainer greeting={"Productos"} />
    </>
  )
}

export default App
