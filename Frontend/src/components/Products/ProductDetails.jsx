import React, { useEffect, useState } from "react";

import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { backend_url } from "../../Url";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addtoWishlist, removeFromWishlist } from "../../Redux/reducers/whislist";
import { addToCart } from "../../Redux/reducers/cart";


const ProductDetails = ({ data }) => {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
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

 const addtoWishlistHandle = (data)=>{
  setClick(!click)
  dispatch(addtoWishlist(data))
  toast.success("item addded to wishlist sucessfully")
}

const handleremoveWishlist = (data)=>{
  setClick(!click)
  dispatch(removeFromWishlist(data))
}
 
  

  console.log(data);
  const decrementCount = () => {
    setCount(count - 1);
  };
  const incrementCount = () => {
    setCount(count + 1);
  };

  return (
    <div className={`${styles.section}  bg-white`}>
      {data ? (
        <div
          className={`${styles.section} 800px:w-[80%] justify-between flex flex-col md:flex-row my-12 mx-auto`}
        >
          <div className="flex items-center w-[95%]  flex-col md:w-[50%]">
            <img
              className="w-[60%] h-[50%] md:w-[80%] hover:border-2"
              src={
                data && data.images
                  ? `${backend_url}public/product/${data.images[0]}`
                  : "path/to/fallback-image.jpg"
              }
              alt=""
              srcset=""
            />

            <div className="flex justify-center w-full mt-4 md:w-[70%] flex-row ">
              <img
                className="w-[48%] md:w-[60%] hover:border-2"
                src={
                  data && data.images
                    ? `${backend_url}public/product/${data.images[1]}`
                    : "path/to/fallback-image.jpg"
                }
                alt=""
                srcset=""
              />
              <img
                className="w-[48%]  md:w-[60] hover:border-2"
                src={
                  data && data.images
                    ? `${backend_url}public/product/${data.images[2]}`
                    : "path/to/fallback-image.jpg"
                }
                alt=""
                srcset=""
              />
            </div>
          </div>
          {/*  right section   */}
          <div className="flex flex-col w-full  md:w-[50%] space-y-4 mt-[5rem]">
            <h4 className={`${styles.productTitle}`}>{data.name}</h4>
            <p>{data.description}</p>
            <p className={`${styles.productDiscountPrice} text-3xl`}>
              {data.discountPrice}$
            </p>

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
              className={`${styles.button} mt-12 rounded-[3px] h-11 flex items-center`}
              onClick={()=>handleAddtoCart(data._id)}
            >
              <span className="text-[#fff] flex items-center">
                Add to cart <AiOutlineShoppingCart className="ml-1" />
              </span>
            </div>
          </div>
        </div>
      ) : null}

      {/* <ProductDetailsInfo data={data} /> */}
    </div>
  );
};
export const ProductDetailsInfo = ({ data }) => {
  const [active, setActive] = useState(1);
  // const {seller} = useSelector((state)=>state.seller);

  return (
    <div className="bg-[#e9ecf8]  mb-[5rem] relative px-3 800px:px-10 py-2 rounded">
      <div className="w-full flex justify-between border-b pt-10 pb-2">
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(1)}
          >
            Product Details
          </h5>
          {active === 1 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(2)}
          >
            Product Reviews
          </h5>
          {active === 2 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
        <div className="relative">
          <h5
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(3)}
          >
            Seller Information
          </h5>
          {active === 3 ? (
            <div className={`${styles.active_indicator}`} />
          ) : null}
        </div>
      </div>
      {active === 1 ? (
        <>
          <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
          {data.description}
          </p>

        
        </>
      ) : null}

      {active === 2 ? (
        <div className="w-full flex justify-center">
          <h5>No Reviews have for this product!</h5>
        </div>
      ) : null}

      {active === 3 && (
        <div className="w-full block 800px:flex p-5">
          <div className="w-full 800px:w-[50%]">
            <Link to={"/"}>
              <div className="flex items-center">
                <img
                  src={
                data.shop && data.shop.avatar
                  ? `${backend_url}public/shop/${data.shop.avatar}`
                  : "path/to/fallback-image.jpg"
              }
                  className="w-[50px] h-[50px] rounded-full"
                  alt=""
                />
                <div className="pl-3">
                <Link to={`/shop/preview/${data.shop._id}`}>
                <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                </Link>
                  <h5 className="pb-2 text-[15px]">4.2 Rating</h5>
                </div>
              </div>
            </Link>
            <p className="pt-2">
              {data.shop.name}
            </p>
          </div>
          <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 800px:flex flex-col items-end">
            <div className="text-left">
              <h5 className="font-[600]">
                Joined on:
                <span className="font-[500]">20 : 02 .2016 </span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total Products:
                <span className="font-[500]">1212</span>
              </h5>
              <h5 className="font-[600] pt-3">
                Total Reviews:
                <span className="font-[500]">121</span>
              </h5>
              <Link to={`/shop/preview/${data.shop._id}`}>
                <div
                  className={`${styles.button} !rounded-[4px] !h-[39.5px] mt-3`}
                >
                  <h4 className="text-white">Visit Shop</h4>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
