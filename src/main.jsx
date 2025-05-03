import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import Products from './pages/Products.jsx'
import SingleProduct from './pages/SingleProduct.jsx'
import { store } from './redux/store';
import { Provider } from 'react-redux';
import Cart from './pages/Cart';
import { removeFromCart } from './redux/cartslice';
import Home from './pages/Home.jsx';  


const router = createBrowserRouter([
  {
    path: '',
    element: <App/>,
    children: [
      {
        path: '',
        element: <Home/>
      },
      {
        path: 'products',
        element: <Products/>
      },
      {
        path: 'product/:id',
        element: <SingleProduct/>
      },
      { path: 'cart', 
        element: <Cart /> 
      },
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </Provider>
);