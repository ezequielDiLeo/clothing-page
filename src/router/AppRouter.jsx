
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext/UserContext'
import { Navbar } from '../components/Navbar/Navbar'
import { ItemListContainer } from '../components/ItemListContainer/ItemListContainer'
import { Checkout } from '../components/Checkout/Checkout'
import { ItemDetailContainer } from '../components/ItemDetailContainer/ItemDetailContainer'
import { CartView } from '../components/CartView/CartView'
import { ItemProductContainer } from '../components/ItemProductContainer/ItemProductContainer'
import { LoginScreen } from '../components/LoginScreen/LoginScreen'
import { Footer } from '../components/Footer/Footer'


export const AppRouter = () => {
    const { user } = useContext(UserContext)


  return (
    <>
        <BrowserRouter>

            <Navbar />

            {
            user.logged ? 
            (<>
                <Routes>
                    <Route path='/' element={<ItemListContainer />}/> 
                    <Route path='/checkout' element={<Checkout />}/>
                    <Route path='/item/:itemId' element={<ItemDetailContainer />}/>
                    <Route path='/cart' element={<CartView/>} />
                    <Route path='/productos/:categoryName' element={ <ItemListContainer /> }/>
                    <Route path='/items/:categoryId' element= { <ItemProductContainer /> } />
                    
                    <Route path='*' element= {<Navigate to="/" /> } />
                </Routes>

                <Footer/>
            </>
            ) : ( <>
                <Routes>
                    <Route path='/login' element={<LoginScreen />} />
                    <Route path='*' element={<Navigate to='/login' />} />
                </Routes>
                </>
            )}

        </BrowserRouter>
    </>
  )
}
