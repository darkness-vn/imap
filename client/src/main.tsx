import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom"
import './index.css'
import Layout from './layout'
import Home from './pages/Home'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'

const Register = React.lazy(() => import('./pages/Register'))
const Map = React.lazy(() => import('./pages/Map'))

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="register" element={<Register />} />
      <Route path="map" element={<Map />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
