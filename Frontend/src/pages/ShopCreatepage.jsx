import React, { useEffect } from 'react'
import ShopCreate from '../components/Shop/ShopCreate'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Layout/Loader';

const ShopCreatepage = () => {
  const { isSeller ,seller , isLoading } = useSelector((state) => state.seller);
  const navigate = useNavigate();

 if(isLoading === true){
  <Loader/>
 }
  useEffect(() => {
    seller &&
     isSeller === true ?
       navigate(`/dashboard`)
     : null
   }, [isSeller , isLoading]);
 
  return (
     <ShopCreate/>
      
)
}

export default ShopCreatepage