import React, { useState } from 'react'
import { BiMinus, BiPlus } from 'react-icons/bi'
import gift from '../../assets/gift.png'
import { backend_url } from '../../Url'
import { toast } from 'react-toastify'
import { RxCross1 } from 'react-icons/rx'
import { removeFromCart } from '../../Redux/reducers/cart'

const CartSingle = ({key, data, handleQuantityChange , handleRemoveCart}) => {
    const [count,  setCount] = useState(data.qty)
    const totalPrice = data.discountPrice * count
    const increment =(data)=>{
      if(count> data.stock){
        toast.error("product stock limited")
      }
        setCount(count +1);
        const upadateCartData= {...data, qty:count+1}
        handleQuantityChange(upadateCartData)
    }
    const decrement =(data)=>{
        if (count === 1) {
            setCount(1);
        }
        else{
          const upadateCartData= {...data, qty:count-1}
            setCount(count -1);
            handleQuantityChange(upadateCartData)
        } 
    }

  
  return (
        <div> 
            <div className="flex   items-center border-t-[1px] border-b-[1px] py-2   mx-2">
            <hr />
            <div className="flex py-2 flex-col items-center  ">
              <BiPlus  size={20}
                className='bg-red-500 text-white p-1 rounded-3xl cursor-pointer'
                onClick={()=>increment(data)}
              />
               <h2 className='text-[1rem] py-1 '>{count}</h2>
              <BiMinus 
                size={20}
                className='bg-slate-400 rounded-3xl p-1 cursor-pointer'
                onClick={()=>decrement(data)}
              />
            </div>
               <div className="w-[10rem] h-[8rem]"><img src={
                data && data.images
                  ? `${backend_url}public/product/${data.images[0]}`
                  : "path/to/fallback-image.jpg"
              }alt="" className='w-full h-full object-cover' srcset="" /></div>
               <div className="flex flex-col">
                  <h4>{data.name}</h4>
                 <p className='text-red-500 text-bold text-2xl'>${totalPrice }</p>
              </div>
              <RxCross1 size={25} className='cursor-pointer ' onClick={()=>handleRemoveCart(data)}/>
        </div>
        
        </div>
        
        
  )
}

export default CartSingle