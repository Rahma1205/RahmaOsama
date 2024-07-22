import './App.css';
import React, { useEffect, useState } from 'react';
import Register from './Component/Register/Register';
import Category from './Component/Category/Category';
import Notfound from './Component/Notfound/Notfound';
import Cart from './Component/Cart/Cart';
import Login from './Component/Login/Login';
import Layout from './Component/Layout/Layout';
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom';
import Home from './Component/Home/Home';
import Product from './Component/Product/Product';
import { jwtDecode } from 'jwt-decode';
import ProtectedRoute from './Component/ProtectedRoute/ProtectedRoute';
import ProudactDetails from './Component/ProudactDetails/ProudactDetails';
import CheckOut from './Component/CheckOut/CheckOut';
import { Toaster } from 'react-hot-toast';
import { Offline } from 'react-detect-offline';
import CartContextProvider from './Context/CartContext';
import ForgetPassword from './Component/ForgetPassword/ForgetPassword';
import RestPassword from './Component/RestPassword/RestPassword';
import NewPassword from './Component/NewPassword/NewPassword';
import AllOrders from './Component/AllOrders/AllOrders';


export default function App() {
  const [userData, setUserData] = useState(null);


  function saveUserData() {
    const encodedToken = localStorage.getItem('userToken');
    const decodeToken = jwtDecode(encodedToken);
    setUserData(decodeToken);
   
  }



  const routers = createHashRouter([
    {
      path: '', element: <Layout userData={userData} setUserData={setUserData} />, children: [
        { index: true, element: <Login saveUserData={saveUserData} /> },
        { path: 'Cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
        { path: 'Home', element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: 'Register', element: <Register /> },
        { path: 'ForgetPassword', element: <ForgetPassword /> },
        { path: 'RestPassword', element: <RestPassword /> },
        { path: 'NewPassword', element: <NewPassword /> },
        { path: 'Product', element: <ProtectedRoute><Product /></ProtectedRoute> },
        { path: 'Categories', element: <ProtectedRoute><Category /></ProtectedRoute> },
        { path: 'allorders', element: <ProtectedRoute ><AllOrders /></ProtectedRoute> },

        { path: 'CheckOut', element: <CheckOut /> },
        { path: 'ProudactDetails/:id', element: <ProtectedRoute><ProudactDetails /></ProtectedRoute> },
        { path: '*', element: <Notfound /> },
      ]
    }
  ]);


  return (
    <CartContextProvider> <Toaster />
      <Offline><div className="notice rounded-2">You're offline right now. Check your connection.</div></Offline>
      <RouterProvider router={routers} /></CartContextProvider>


  );
}
