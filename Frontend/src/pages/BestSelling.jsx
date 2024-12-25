import React, { useEffect, useState } from 'react'
import styles from '../styles/styles'
import { productData } from '../static/data'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/Route/ProductCard/ProductCard'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import { getAllProducts } from '../Redux/actions/product'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Layout/Loader'




const BestSelling = () => {
    const [data, setData] = useState([]);
    const dispatch = useDispatch();
    const { allProducts, productLoading, message } = useSelector((state) => state.products);

    // Pehla useEffect sirf data fetch karne ke liye
    useEffect(() => {
      dispatch(getAllProducts());
    }, [dispatch]); // Yeh hook sirf ek martaba chalega jab component mount hoga
  
    // Dosra useEffect jab allProducts update hote hain
    useEffect(() => {
        if ( allProducts && allProducts.length > 0) {
            
          setData(allProducts); // Ye hook tab chalega jab allProducts mein data aayega
        }
      }, [allProducts]); // Yeh hook allProducts ki change hone par chalega
    console.log("all products is" ,allProducts)
  return (
        <>
         {
    productLoading ? (
      <Loader />
    ) : (
      <div>
      <Header activeHeading={2} />
      <br />
      <br />
      <div className={`${styles.section}`}>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
          {data && data.map((i, index) => <ProductCard data={i} key={index} />)}
        </div>
      </div>
      <Footer />
    </div>
    )
   }
     </>
  )
}

export default BestSelling