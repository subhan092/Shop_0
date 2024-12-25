import React from 'react'
import ProductCard from '../ProductCard/ProductCard'
import styles from '../../../styles/styles'
import { productData } from '../../../static/data'
import { useSelector } from 'react-redux'


const FeaturedProduct = () => {
  const {allProducts} = useSelector((state) => state.products);
  return (
       <div className={`${styles.section}`}>
       <div className={`${styles.heading}`}>
        <h1>Featured Product</h1>
       </div>
              <div className="grid grid-col-1 gap-3 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 mx-2 mb-10">
                {
                    allProducts  && allProducts.map((i,index)=>{
                     return   <ProductCard   data={i} key={index}  />
                    })
                }
              </div>
       </div>
  )
}

export default FeaturedProduct