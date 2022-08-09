import { HashRouter, Routes, Route } from "react-router-dom";
import './App.css';
import {useSelector} from 'react-redux';
import {Home, Login, ProductDetail, Purchases} from './pages/index';
import {NavBar, LoadingScreen} from './components';

function App() { 
  const isLoading = useSelector((state) => state.isLoading);

  return (
   <HashRouter>
      <NavBar/>
      {isLoading && <LoadingScreen />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/purchases" element={<Purchases />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/products/:id" element={<ProductDetail />} />
      </Routes>
   </HashRouter> 
  )
}

export default App
