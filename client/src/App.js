
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import Footer from './Components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
      
      <Routes>
        <Route path='/' element={<Shop />} />
        <Route path='/earphones' element={<ShopCategory category="earphones" />} />
        <Route path='/headphones' element={<ShopCategory category="headphones" />} />
        <Route path='/speakers' element={<ShopCategory category="speakers"/>} />
      <Route path='product' element={<Product/>}>
        <Route path=':productId' element={<Product/>}/>

      </Route>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/login' element={<LoginSignup/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
