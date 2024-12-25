import React, { useEffect } from 'react'
import ShopLogin from '../components/Shop/ShopLogin'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ShopLoginPage = () => {
  const { isSeller ,seller , isLoading } = useSelector((state) => state.seller);
  const navigate = useNavigate();

 
  useEffect(() => {
    if(isLoading === false){
    seller &&
     isSeller === true ?
       navigate(`/dashboard`)
     : null
}}, [isSeller , isLoading]);
 
  console.log("login seller",seller);
  return (
   <ShopLogin/>
)
}

export default ShopLoginPage