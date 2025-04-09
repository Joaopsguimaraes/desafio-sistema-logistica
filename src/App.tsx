import { BrowserRouter, Route, Routes } from 'react-router'
import { Layout } from '@/components/Layout'
import { lazy, Suspense } from 'react'
import { LoadingScreen } from '@/components/LoadingScreen'
import { LogisticsProvider } from '@/context/LogisticsContext'
import { ProductsProvider } from './context/ProductsContext'

const Dashboard = lazy(() => import('./pages/Dashboard'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Products = lazy(() => import('./pages/Products'))

function App() {
  return (
    <LogisticsProvider>
      <ProductsProvider>
        <BrowserRouter>
          <Suspense fallback={<LoadingScreen />}>
            <Routes>
              <Route
                path="/"
                element={
                  <Layout>
                    <Dashboard />
                  </Layout>
                }
              />
              <Route
                path="/products"
                element={
                  <Layout>
                    <Products />
                  </Layout>
                }
              />
              <Route
                path="*"
                element={<NotFound />}
              />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ProductsProvider>
    </LogisticsProvider>
  )
}

export default App
