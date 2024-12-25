import React, { useState ,useEffect } from 'react'
import ProductDetails, { ProductDetailsInfo }  from '../components/Products/ProductDetails'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import { useParams } from 'react-router-dom'
import { productData } from '../static/data'
import SuggestedProducts from '../components/Products/SuggestedProducts'
import Loader from '../components/Layout/Loader'
import { useSelector } from 'react-redux'


const ProductDetailPage = () => {
  const {name} =  useParams();
  const [data , setData] = useState(null)
  const  Productname = name.replace(/-/g," ")
  const { allProducts, productLoading, message } = useSelector((state) => state.products);

  useEffect(() => {
     const findData = allProducts.find((i)=> i.name == Productname );
     setData(findData);
     
  }, [allProducts])
  return (
    
      <>
      {productLoading ? (<Loader/>):  (
         <div>
         <Header/>
     <ProductDetails data={data} />
      { data &&  <SuggestedProducts  data={data} />} 
      {data && <ProductDetailsInfo data={data} /> }
     <Footer/>
         </div>
      ) }

      </>    
)
}

export default ProductDetailPage