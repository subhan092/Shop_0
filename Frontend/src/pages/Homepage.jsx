import React, { useEffect, useState } from 'react'
import Header from '../components/Layout/Header'
import Hero from '../components/Route/Hero/Hero'
import Categories from '../components/Route/Categories/Categories'
import BestDeal from '../components/Route/BestDeal/BestDeal'
import FeaturedProduct from '../components/Route/FeaturedProduct/FeaturedProduct'
import Events from '../components/Events/Events'
import Sponserd from '../components/Route/Sponserd'
import Footer from '../components/Layout/Footer'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import Loader from '../components/Layout/Loader'

const Homepage = () => {

  const {productLoading } = useSelector((state) => state.products);


  // useEffect(() => {
  //     try {
  //        axios.get('http://localhost:3000/').then((response)=>{
  //         if(response.data.valid){
  //           toast.success(response.data.message);
  //         }
  //        })
  //     } catch (error) {
  //    toast.error(error.response.data.message)
  //     }
    
  // }, []);
  return (
    <div>
     { 
      productLoading &&
       productLoading ? (<Loader/>) :(
        <>
        <Header  activeHeading={1}/>
    <Hero/>
    <Categories/>
    <BestDeal/>
    <Events/>
    <FeaturedProduct/>
    <Sponserd/>
    <Footer/>
    </>
       ) 
       
     }
    
    </div>
  )
}

export default Homepage