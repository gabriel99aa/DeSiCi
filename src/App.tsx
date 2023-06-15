import React from 'react'
import { Offers } from './Features/Pages/Offers'
import { Header } from './Features/Components/Header'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import { Bills } from './Features/Pages/Bills'
import { Favorites } from './Features/Pages/Favorites'
import { ShoppingCart } from './Features/Pages/ShoppingCar'
import './App.css'

const App: React.FC = () => {
  return (
    <main>
      <Router>
        <Header />
        <Routes>
          <Route path="DeSiCi/Offers" element={<Offers />} />
          <Route path="DeSiCi/Bills" element={<Bills />} />
          <Route path="DeSiCi/Favorites" element={<Favorites />} />
          <Route path="DeSiCi/ShoppingCart" element={<ShoppingCart />} />
          <Route path="*" element={<Navigate to="DeSiCi/Offers" />} />
        </Routes>
      </Router>
    </main>
  )
}

export default App
