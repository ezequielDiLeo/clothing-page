import './ItemListContainer.scss'
import { ItemList } from '../itemList/ItemList'
import { useProductos } from '../../hooks/useProductos'




export const ItemListContainer = () => {
  const { productos } = useProductos()

  return (
    <ItemList productos={productos}/>
)} 


 