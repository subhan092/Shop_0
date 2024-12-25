import React, { useEffect, useState } from 'react'
import { productData } from '../../static/data'
import styles from '../../styles/styles';
import ProductCard from '../Route/ProductCard/ProductCard';
import { useSelector } from 'react-redux';

const SuggestedProducts = ({data}) => {
    const [value , setValue] = useState([]);
    const { allProducts, productLoading, message } = useSelector((state) => state.products);

    useEffect(() => {
       const relatedData =   allProducts && allProducts.filter((i,index)=> i.category == data.category )
         setValue(relatedData);
    }, [])
    
  return (
      <div>  
       {
        data  ? ( 
          <div className={`${styles.section}`}>
          <div className={`${styles.heading}`}>
        <h1>Related Product</h1>
       </div>
              <div className="grid grid-col-1 gap-3 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 mx-2 mb-10">
                {
                    value  && value.map((i,index)=>{
                     return   <ProductCard   data={i} key={index}  />
                    })
                }
              </div>
          </div>
          ) : null
       }
       </div>
  )
}

export default SuggestedProducts