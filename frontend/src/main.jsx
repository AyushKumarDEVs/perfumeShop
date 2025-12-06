import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import HomePage from './components/HomePage'
import './index.css'
import CallToActionBanner from './components/CallToActionBanner'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ProductGrid from './components/ProductGrid'
import ProductPage from './components/ProductPage'

const router = createBrowserRouter([
  { 
    path: "/", 
    Component: HomePage,
    children: [
      {
        index: true,
        Component: ProductGrid,
      },
      {
        path:'/:category',
        Component: ProductGrid,
      },
      {
        path:'/product/:id',
        Component: ProductPage,
      }
    ]

  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode> 
    <RouterProvider router={router} />
  </StrictMode>,
)
