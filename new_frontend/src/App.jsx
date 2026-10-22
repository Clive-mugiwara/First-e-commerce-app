import './App.css';
import {Navbar} from './Components/Navbar/Navbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { Shop } from './Pages/Shop';
import { ShopCategory } from './Pages/ShopCategory';
import { Product } from './Pages/Product';
import { Cart } from './Pages/Cart';
import { LoginSignup } from './Pages/LoginSignup';
import { Footer } from './Components/Footer/Footer';
import PlaceOrder from './Pages/PlaceOrder';
import Orders from './Pages/Orders';

function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path='/bracelets' element={<ShopCategory category="Bracelets"/>}/>
        <Route path='/rings' element={<ShopCategory category="Rings"/>}/>
        <Route path='/watches' element={<ShopCategory category="Watches"/>}/>
        <Route path = "product" element={<Product/>}>
          <Route path=':productId' element={<Product/>}/>
        </Route>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<LoginSignup/>}/>
        <Route path='/placeOrder' element={<PlaceOrder/>}/>
        <Route path='/orders' element={<Orders/>}/>
        </Routes>
       <Footer/>
      
    </div>
  );
}

export default App;
