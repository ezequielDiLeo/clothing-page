import './ItemListContainer.scss'
import { ItemList } from '../itemList/ItemList'
import { useProductos } from '../../hooks/useProductos'




export const ItemListContainer = () => {
  const { productos, loading, error, retry } = useProductos()

  return (
    <ItemList productos={productos} loading={loading} error={error} onRetry={retry} />
)} 


 