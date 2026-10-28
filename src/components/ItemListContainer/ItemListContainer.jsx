import './ItemListContainer.scss'
import { ItemList } from '../itemList/ItemList'
import { useProductos } from '../../hooks/useProductos'
import { usePromotion } from '../../hooks/usePromotion'




export const ItemListContainer = () => {
  const { productos, loading, error, retry } = useProductos()
  const promotion = usePromotion()

  return (
    <ItemList productos={productos} loading={loading} error={error} onRetry={retry} promotion={promotion} />
)} 


 