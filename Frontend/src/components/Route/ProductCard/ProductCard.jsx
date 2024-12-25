import React, { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineEye,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import ProductDetailCard from "../ProductDetailCard/ProductDetailCard";
import { backend_url } from "../../../Url";
import { addtoWishlist, removeFromWishlist } from "../../../Redux/reducers/whislist";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../Redux/reducers/cart";
import { toast } from "react-toastify";


const ProductCard = ({ data }) => {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch =  useDispatch()
  const d = data.name;
  const Product_Name = d.replace(/\s+/g, "-");
  const {cart} = useSelector((state)=>state.allcart)
  const {wishlist} = useSelector((state)=>state.allwishlist)
  // console.log(data.images[0]); // Check if this logs the correct image path
  useEffect(() => {
    if(wishlist && wishlist.find((i)=>i._id==data._id) ){
      setClick(true)
    }
    else{
      setClick(false)
    }
  }, [wishlist])
  
  const addtoWishlistHandle = (data)=>{
    const itemExist = wishlist && wishlist.find((i)=>i._id==id)
    console.log(itemExist)
    if(itemExist){
      setClick(true)
    }
    dispatch(addtoWishlist(data))
    toast.success("item addded to wishlist sucessfully")
  }
  const handleremoveWishlist = (data)=>{
    setClick(!click)
    dispatch(removeFromWishlist(data))
  }

  const handleAddtoCart =(id)=>{
    const itemExist = cart && cart.find((i)=>i._id==id)
    console.log(itemExist)
    if(itemExist){
      toast.error("item is already exist in cart")
    }
   else{ 
        const cartData= {...data, qty:1};
        dispatch(addToCart(cartData))
        toast.success("item addded to cart sucessfully!")
   }
  }
  return (
    <>
      <div className="w-full min-h-[360px] space-x-4 space-y-2 relative bg-white rounded-md shadow-md cursor-pointer">
        <div className="flex flex-col gap-3 px-4  justify-end">
          <Link to={`/Product/${Product_Name}`}>
            <img
              className="w-[80%] mx-auto object-contain h-[220px]"
              src={data && data.images ? `${backend_url}public/product/${data.images[0]}` : 'path/to/fallback-image.jpg' }
              alt={data.name}
            />
          </Link>
          <Link to={`/shop/preview/${data.shop._id}`}>
            <h5 className="text-blue-500  ">{data.shop.name}</h5>
          </Link>
          <Link to={`/Product/${Product_Name}`}>
            <h3 className="pb-3 font-[500]">
              {data.name.length > 40
                ? data.name.slice(0, 40) + "......"
                : data.name}
            </h3>
          </Link>
          <div className="flex">
            <AiFillStar
              className="cursor-pointer mr-2 size-[20px] "
              color="#F6BA00"
            />
            <AiFillStar
              className="cursor-pointer mr-2 size-[20px]"
              color="#F6BA00"
            />
            <AiFillStar
              className="cursor-pointer mr-2 size-[20px] "
              color="#F6BA00"
            />
            <AiFillStar
              className="cursor-pointer mr-2 size-[20px]"
              color="#F6BA00"
            />
            <AiOutlineStar
              className="cursor-pointer mr-2 size-[20px]"
              color="#F6BA00"
            />
          </div>
          <div className="py-2 flex items-center justify-between ">
            <div className="flex gap-4">
              <h5 className={`${styles.productDiscountPrice}`}>
                {data.discountPrice ? `$${data.discountPrice}` : null}
              </h5>
              <h4 className={`${styles.price}`}>
                {data.originalPrice ? `$${data.originalPrice}` : null}
              </h4>
            </div>
            <span className="font-[400] text-blue-400 text-[17px]">
              {data.sold_out || 0} Sold
            </span>
          </div>
          {/* side options */}
          <div>
            {click ? (
              <AiFillHeart
                size={22}
                className="cursor-pointer absolute right-2 top-5"
                onClick={() => handleremoveWishlist(data)}
                color={click ? "red" : "#333"}
                title="Remove from wishlist"
              />
            ) : (
              <AiOutlineHeart
                size={22}
                className="cursor-pointer absolute right-2 top-5"
                onClick={() => addtoWishlistHandle(data)}
                color={click ? "red" : "#333"}
                title="Add to wishlist"
              />
            )}
            <AiOutlineEye
              size={22}
              className="cursor-pointer absolute right-2 top-14"
              onClick={() => setOpen(!open)}
              color="#333"
              title="Quick view"
            />
            <AiOutlineShoppingCart
              size={25}
              className="cursor-pointer absolute right-2 top-24"
              onClick={()=>handleAddtoCart(data._id)}
              color="#444"
              title="Add to cart"
            />
            {open ? (
              <ProductDetailCard open={open} setOpen={setOpen} data={data} />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
