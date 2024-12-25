import React from 'react'
import { AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai'
import { RxCross1 } from 'react-icons/rx'
import styles from '../../styles/styles'
// import CartSingle from '../Cart/CartSingle'
import { Link } from 'react-router-dom'
import gift from '../../assets/gift.png'
import { useDispatch, useSelector } from 'react-redux'
import { backend_url } from '../../Url'
import { removeFromWishlist } from '../../Redux/reducers/whislist'
import { addToCart } from '../../Redux/reducers/cart'

const Wishlist = ({setOpenWishlist}) => {
    const {wishlist} = useSelector((state)=>state.allwishlist);
    const dispatch = useDispatch()
    const hanleremoveWislist = (data)=>{
            dispatch(removeFromWishlist(data))
    }
    const handleAddtoCart =(data)=>{
        const cartData= {...data, qty:1};
        dispatch(addToCart(cartData))
        setOpenWishlist(false)
    }


  return (
      <div className='bg-[#0000004b]  w-full h-screen z-10 fixed top-0 left-0    '>
       <div className="bg-white w-[25%] z-20  flex flex-col   fixed top-0 right-0  shadow h-screen">
       <div>
        <div className='w-full flex justify-end pr-2 pt-2'>
            <RxCross1
                 size={25}
                 className='cursor-pointer'
                 onClick={()=>setOpenWishlist(false)}
            />
        </div>
        {/* item lenght */}
          <div className={`${styles.noramlFlex} p-3 pr-4`}>
            <AiOutlineHeart 
                size={24}
            />
            <h5 className='text-2xl'>{wishlist.length}items</h5>
          </div>
          </div> 
          <br />
           {/* card single */}

           {
            wishlist && wishlist.map((i,index)=>  
               <CartSingle  key={index} data={i} hanleremoveWislist={hanleremoveWislist} handleAddtoCart={handleAddtoCart} />
              )
           }
                  
       </div>
     
      </div>
      
  )
};


 const CartSingle = ({ data , hanleremoveWislist , handleAddtoCart}) => {
    
  return (
        <div> 
            <div className="flex justify-between items-center border-t-[1px] border-b-[1px] py-4 mx-3">
            <hr />
               <RxCross1 size={20} className='cursor-pointer' onClick={()=>hanleremoveWislist(data)}/>
               <div className="w-[5rem]"><img src={
                data && data.images
                  ? `${backend_url}public/product/${data.images[0]}`
                  : "path/to/fallback-image.jpg" } /></div>
               <div className="flex flex-col">
                  <h4>{data.name}</h4>
                 <p className='text-red-500 text-bold text-2xl'>${data.discountPrice}</p>
              </div>
              <AiOutlineShoppingCart className='cursor-pointer' size={30} onClick={()=>handleAddtoCart(data)} />
        </div>
        
        </div>
        
        
  )
}



export default Wishlist