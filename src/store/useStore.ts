import { useContext } from 'react'
import { StoreContext } from './StoreContext'

export const useStore = () => {
  const store = useContext(StoreContext)

  if (!store) {
    throw new Error('Store is not provided')
  }

  return store
}
