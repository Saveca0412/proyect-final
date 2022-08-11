import { HashRouter, Routes, Route } from "react-router-dom";
import './App.css';
import {useSelector} from 'react-redux';
import {Home, Login, ProductDetail, Purchases} from './pages/index';
import {NavBar, LoadingScreen, ProtectedRoutes} from './components';

function App() { 
  const isLoading = useSelector((state) => state.isLoading);

  return (
   <HashRouter>
      <NavBar/>
      {isLoading && <LoadingScreen />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<ProtectedRoutes/>}>
          <Route path="/purchases" element={<Purchases />} />
        </Route>
        <Route path="/login" element={<Login />} /> 
        <Route path="/products/:id" element={<ProductDetail />} />
      </Routes>
   </HashRouter> 
  )
}

export default App
