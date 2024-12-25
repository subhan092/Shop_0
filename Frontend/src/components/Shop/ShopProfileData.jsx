import React, { useEffect, useState } from 'react'
import styles from '../../styles/styles';
import { Link } from 'react-router-dom';
import { productData } from '../../static/data';
import ProductCard from '../Route/ProductCard/ProductCard'
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../Redux/actions/product';
import  Loader from '../Layout/Loader'

const ShopProfileData = ({isOwner}) => {
  const [active , setActive] = useState(1);
  const {seller} = useSelector((state)=>state.seller)
  const {products , productLoading } = useSelector((state)=>state.products)
  const dispatch =  useDispatch()

  useEffect(() => {
    if (seller?._id) {
        dispatch(getProducts(seller._id)); // Dispatch the action with the seller's ID
    }
}, [dispatch, seller]);
console.log("products in shop ",products);
console.log("seller is", seller);
  return (
    <>
    {productLoading ? ( <Loader/>) : (
      <div>
      <div className="w-full">
        <div className="flex items-center justify-between">
        <div className="flex gap-6">
          <div onClick={()=>{setActive(1)}}>
            <h5 className={`${active === 1 ? "text-red-500 font-semibold" : "" } text-[1.3rem] cursor-pointer`}>Shop Products</h5>
          </div>
          <div onClick={()=>{setActive(2)}}>
            <h5 className={`${active === 2 ? "text-red-500 font-semibold" : "" } text-[1.3rem] cursor-pointer`}>Shop Reviews</h5>
          </div>
        </div>
        <div>
          {isOwner && (
            <div>
              <Link to="/dashboard">
                <div className={`${styles.button} !rounded-[4px] h-[42px]`}>
                  <span className="text-[#fff]">Go Dashboard</span>
                </div>
              </Link>
            </div>
          )}
        </div>
        </div>

        <br />
      {active === 1 && (
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
          {products &&
            products.map((i, index) => (
              <ProductCard data={i} key={index} isShop={true} />
            ))}
        </div>
      )}
      </div>
    </div>
    )}
    
    </>
  )
}

export default ShopProfileData