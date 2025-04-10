import { LogisticsContext } from '@/context/LogisticsContext'
import { useContext } from 'react'

export const useLogistics = () => {
  const context = useContext(LogisticsContext)
  if (context === undefined) {
    throw new Error('useLogistics must be used within a LogisticsProvider')
  }
  return context
}
