import './App.css'
// import Header from './components/Header'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddProduct from './components/AddProduct';
import UpdateProduct from './components/UpdateProduct';
import Login from './components/login';
import Register from './components/Register';
import { UserProvider } from "./components/user_context/UserContext.jsx";
import Protected from './components/Protected.jsx';
import ProductsList from './components/ProductsList.jsx';
import Product from './components/user_context/product.jsx';
import Cart from './components/Cart.jsx';
import Profile from './components/Profile.jsx';
import ChangePassword from './components/ChangePassword.jsx';

function App() {

  return (
    <>
        {/* <Header /> */}
        <Router>
          <UserProvider>
            <Routes>
              <Route path="/Login" element={<Login />} />
              <Route path="/AddProduct" element={<Protected Cmp={AddProduct}/>} />
              <Route path="/UpdateProduct" element={<Protected Cmp={UpdateProduct} />} />
              <Route path="/" element={<Protected Cmp={ProductsList} />} />
              <Route path="/Product" element={<Protected Cmp={Product} />} />
              <Route path="/Register" element={<Register />} />
              <Route path="/Cart" element={<Protected Cmp={Cart} />} />
              <Route path="/Profile" element={<Protected Cmp={Profile} />} />
              <Route path="/ChangePassword" element={<Protected Cmp={ChangePassword} />} />
            </Routes>
          </UserProvider>
        </Router>
    </>
  )
}

export default App
