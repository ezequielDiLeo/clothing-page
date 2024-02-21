import './App.css'
import './styles/styles.scss'
import { CartProvider } from './components/Cartwidget/CartContext'
import { AppRouter } from './router/AppRouter';
import { UserProvider } from './context/UserContext/UserContext';



function App() {

  return (
    <UserProvider>
      <CartProvider>
        <AppRouter />
      </CartProvider>
    </UserProvider>

  );
}

export default App
