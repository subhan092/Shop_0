import React, { useEffect, useState } from 'react'
import { RxCross1 } from "react-icons/rx";
import { Link } from 'react-router-dom';
import styles from '../../../styles/styles';
import {
    AiFillHeart,
    AiOutlineHeart,
    AiOutlineMessage,
    AiOutlineShoppingCart,
  } from "react-icons/ai";
import { backend_url } from '../../../Url';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../Redux/reducers/cart';
import  { addtoWishlist, removeFromWishlist } from '../../../Redux/reducers/whislist';

 

const ProductDetailCard = ({setOpen , data}) => {
    const [click ,setClick] = useState(false)
    const [select ,setSelect] = useState(false)
    const [count ,setCount] = useState(1)
    const {cart} = useSelector((state)=>state.allcart)
    const dispatch =  useDispatch()
    const {wishlist} = useSelector((state)=>state.allwishlist)


    useEffect(() => {
      if(wishlist && wishlist.find((i)=>i._id==data?._id) ){
        setClick(true)
      }
      else{
        setClick(false)
      }
    }, [wishlist])

    const handleAddtoCart =(id)=>{
      const itemExist = cart && cart.find((i)=>i._id==id)
      console.log(itemExist)
      if(itemExist){
        toast.error("item is already exist in cart")
      }
     else{
        if(count> data.stock){
          toast.error("product stock limited")
        }
        else{
          const cartData= {...data, qty:count};
          dispatch(addToCart(cartData))
          toast.success("item is added to cart!")
        }
     }
    }

   const decrementCount=()=>{
    setCount( count -1);
   }
   const incrementCount=()=>{
    setCount (count + 1);
  }

  const addtoWishlistHandle = (data)=>{
    setClick(!click)
    dispatch(addtoWishlist(data))
    toast.success("item addded to wishlist sucessfully")
  }

  const handleremoveWishlist = (data)=>{
    setClick(!click)
    dispatch(removeFromWishlist(data))
  }

  return (
    <div className="bg-[#fff]">
    {data ? (
      <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center">
        <div className="w-[90%] 800px:w-[60%] h-[90vh] overflow-y-scroll 800px:h-[75vh] bg-white rounded-md shadow-sm relative p-4">
          <RxCross1
            size={30}
            className="absolute right-3 top-3 z-50"
            onClick={() => setOpen(false)}
          />

          <div className="block w-full 800px:flex">
            <div className="w-full 800px:w-[50%]">
              <img src={
                data && data.images
                  ? `${backend_url}public/product/${data.images[0]}`
                  : "path/to/fallback-image.jpg"
              } alt="" />
              <div className="flex">
                <Link to={`/shop/preview/${data.shop._id}`} className="flex">
                  <img
                    src={
                data.shop && data.shop.avatar
                  ? `${backend_url}public/shop/${data.shop.avatar}`
                  : "path/to/fallback-image.jpg"
              }
                    className="w-[50px] h-[50px] rounded-full mr-2"
                  />
                  <div>
                    <h3 className={`${styles.shop_name}`}>
                      {data.shop.name}
                    </h3>
                    <h5 className="pb-3 text-[15px]">{data?.ratings} Ratings</h5>
                  </div>
                </Link>
              </div>
              <div
                className={`${styles.button} bg-[#000] mt-4 rounded-[4px] h-11`}
        
              >
                <span className="text-[#fff] flex items-center">
                  Send Message <AiOutlineMessage className="ml-1" />
                </span>
              </div>
              <h5 className="text-[16px] text-[red] mt-5">(50) Sold out</h5>
            </div>

            <div className="w-full 800px:w-[50%] pt-5 pl-[5px] pr-[5px]">
              <h1 className={`${styles.productTitle} text-[20px]`}>
                {data.name}
              </h1>
              <p>{data.description}</p>

              <div className="flex pt-3">
                <h4 className={`${styles.productDiscountPrice}`}>
                  {data.discountPrice}$
                </h4>
                <h3 className={`${styles.price}`}>
                  {data.originalPrice ? data.originalPrice + "$" : null}
                </h3>
              </div>
              <div className="flex items-center mt-12 justify-between pr-3">
                <div>
                  <button
                    className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                    onClick={decrementCount}
                  >
                    -
                  </button>
                  <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
                    {count}
                  </span>
                  <button
                    className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                    onClick={incrementCount}
                  >
                    +
                  </button>
                </div>
                <div>
                  {click ? (
                    <AiFillHeart
                      size={30}
                      className="cursor-pointer"
                      onClick={() => handleremoveWishlist(data)}
                      color={click ? "red" : "#333"}
                      title="Remove from wishlist"
                    />
                  ) : (
                    <AiOutlineHeart
                      size={30}
                      className="cursor-pointer"
                      onClick={() => addtoWishlistHandle(data)}
                      title="Add to wishlist"
                    />
                  )}
                </div>
              </div>
              <div
                className={`${styles.button} mt-6 rounded-[4px] h-11 flex items-center`}
                 onClick={()=>handleAddtoCart(data._id)}
              >
                <span className="text-[#fff] flex items-center">
                  Add to cart <AiOutlineShoppingCart className="ml-1" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : null}
  </div>

  )
}
export default ProductDetailCard