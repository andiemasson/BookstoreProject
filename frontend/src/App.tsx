
import './App.css'
import QuantityPage from './pages/QuantityPage';
import CartPage from './pages/CartPage';
import BooksPage from './pages/booksPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';


function App() {

  return (
    <>
      <CartProvider>
        <Router>
          <Routes>
            <Route path='/' element={<BooksPage/>} />
            <Route path='/add/:title/:bookId/:price' element={<QuantityPage/>} />
            <Route path='/cart' element={<CartPage/>} />
          </Routes>
        </Router>
      </CartProvider>
      
    </>
  );
}

export default App;
