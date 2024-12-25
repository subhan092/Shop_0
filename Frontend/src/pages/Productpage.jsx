import React, { useEffect, useState } from 'react'
import styles from '../styles/styles'
import { productData } from '../static/data'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/Route/ProductCard/ProductCard'
import Header from '../components/Layout/Header'
import { useSelector } from 'react-redux'
import Loader from '../components/Layout/Loader'



const Productpage = () => {
      const [searchParams] =useSearchParams();
      const seacrhedCategory =searchParams.get("category");
      const [data,setData] = useState([]);
      const { allProducts , productLoading
      } = useSelector((state) => state.products);


      useEffect(() => {
        if(allProducts == null){
          const d =  allProducts && allProducts.sort((a,b)=> a.sold_out - b.sold_out)
            setData(d);
        }
        else{
            const d= allProducts && allProducts.filter((i)=> i.category === seacrhedCategory);
            setData(d);
        }
        console.log(data)
      }, [allProducts])
      
  return (
        <>
            <Header activeHeading={3}/>
            <div className={styles.section}>
           { productLoading && productLoading  ? (<Loader/>) : 
           (
            <>
            <div className="grid grid-col-1 gap-3 md:gap-5  my-12 sm:grid-cols-2 p-3 pt-6  md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 mx-2">
         {
            data && data.map((i,index)=>   <ProductCard data={i}  key={index} /> )
         }
         </div>
         {
            data.length === 0 ? (
                <h1 className='text-center  pt-12 text-red-400 font-bold text-2xl'>No product found in this category</h1>
            ) : null 
         }
            </>
           )
           }
     </div>
     </>
  )
}

export default Productpage