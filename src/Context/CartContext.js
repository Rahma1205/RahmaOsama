import axios from 'axios';

import { createContext, useEffect, useState } from 'react';
import React from 'react';



export const CartContext = createContext();

export default function CartContextProvider(props) {
  let[cartId,setCartId]=useState(null);
  let[numOfCartItems,setnumOfCartItems]=useState(0);
  async function getCart(){
    let response=await getLoggedUserCart();
if(response.data.status==='success'){
  setnumOfCartItems(response.data.numOfCartItems);
  setCartId(response.data.data._id);
}
  }
  useEffect(()=>{
getCart();
  },[]);
  let headers = { token: localStorage.getItem('userToken')
  }

  
  async function addToCart(productId) {
    
     return await axios.post(
        'https://ecommerce.routemisr.com/api/v1/cart',
        { productId:productId },
        { headers :headers}
      ).then((response)=>response).catch((error)=>error)
     
  }

  async function getLoggedUserCart() {
    
      return axios.get('https://ecommerce.routemisr.com/api/v1/cart', { headers }).then((response)=>response).catch((error)=>error)

    }
  

  async function removeItemFromCart(productId) {
    
      return  await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { headers :headers}).then((response)=>response).catch((error)=>error)
     
  }

  async function updateProductCount(productId, count) {
    
      return  await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count :count},
        { headers :headers}
      ).then((response)=>response).catch((error)=>error);
  }

  async function onlinePayment(cartId, shippingAddress) {
    
      return await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
        { shippingAddress:shippingAddress },
        { headers:headers }
      ).then((response)=>response).catch((error)=>error);
      
  }

  return (<> <CartContext.Provider value={{ addToCart, getLoggedUserCart, removeItemFromCart, updateProductCount, onlinePayment,numOfCartItems,cartId,setnumOfCartItems  }}>
    {props.children}
  </CartContext.Provider></>
   
  );
}
