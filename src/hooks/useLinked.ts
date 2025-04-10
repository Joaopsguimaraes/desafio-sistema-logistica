import { LinkedContext } from '@/context/LinkedContext'
import { useContext } from 'react'

export const useLinked = () => {
  const context = useContext(LinkedContext)

  if (context === undefined) {
    throw new Error('useLinked must be used within a ProductProvider')
  }

  return context
}
