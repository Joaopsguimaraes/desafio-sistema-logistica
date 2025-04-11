import { BrowserRouter, Route, Routes } from 'react-router'
import { Layout } from '@/components/Layout'
import { lazy, Suspense } from 'react'
import { LoadingScreen } from '@/components/LoadingScreen'
import { LogisticsProvider } from '@/context/LogisticsContext'
import { ProductsProvider } from './context/ProductsContext'
import { LinkedProvider } from './context/LinkedContext'

const Dashboard = lazy(() => import('./pages/Dashboard'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Products = lazy(() => import('./pages/Products'))
const Sales = lazy(() => import('./pages/Sales'))
const Purchases = lazy(() => import('./pages/Purchase'))

function App() {
  return (
    <LogisticsProvider>
      <ProductsProvider>
        <LinkedProvider>
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
                  path="/sales"
                  element={
                    <Layout>
                      <Sales />
                    </Layout>
                  }
                />
                <Route
                  path="/purchase"
                  element={
                    <Layout>
                      <Purchases />
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
        </LinkedProvider>
      </ProductsProvider>
    </LogisticsProvider>
  )
}

export default App
