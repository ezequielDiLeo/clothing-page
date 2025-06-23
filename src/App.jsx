import './App.css'
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
