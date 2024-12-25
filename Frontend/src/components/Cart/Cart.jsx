import React, { useEffect, useState } from 'react';
import { IoBagHandleOutline } from 'react-icons/io5';
import { RxCross1 } from 'react-icons/rx';
import styles from '../../styles/styles';
import CartSingle from './CartSingle';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../Redux/reducers/cart';
import { backend_url } from '../../Url';
import axios from 'axios';
import { toast } from 'react-toastify';
import { loadSeller } from '../../Redux/actions/seller';

const Cart = ({ setOpenCart }) => {
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.allcart);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(loadSeller());
  }, [dispatch]);

  const handleRemoveCart = (data) => {
    dispatch(removeFromCart(data));
  };

  const handleQuantityChange = (data) => {
    dispatch(addToCart(data));
  };

  const totalPrice = cart.reduce((acc, item) => acc + item.qty * item.discountPrice, 0);

  const handleCheckout = async () => {
    const body = { products: cart };
    const orderData = { user, cart, seller };

    if (isLoading) return; // Prevent multiple clicks
    setIsLoading(true);

    try {
      const response = await fetch(`${backend_url}checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        if (data.url) {
          localStorage.setItem('latestOrder', JSON.stringify(orderData));
          window.location.replace(data.url);
        } else {
          throw new Error('Invalid checkout URL');
        }
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Checkout failed');
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      toast.error(`Checkout failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#0000004b] w-full h-screen z-10 fixed top-0 left-0">
      <div className="bg-white w-[25%] z-20 flex flex-col fixed top-0 right-0 shadow h-screen">
        <div>
          <div className="w-full flex justify-end pr-2 pt-2">
            <RxCross1 size={25} className="cursor-pointer" onClick={() => setOpenCart(false)} />
          </div>
          {/* Item count */}
          <div className={`${styles.noramlFlex} p-3 pr-4`}>
            <IoBagHandleOutline size={24} />
            <h5 className="text-2xl">{cart.length} items</h5>
          </div>
        </div>
        <br />
        {/* Cart items */}
        {cart.map((item, index) => (
          <CartSingle key={index} data={item} handleRemoveCart={handleRemoveCart} handleQuantityChange={handleQuantityChange} />
        ))}
        {/* Checkout button */}
        <div>
          <button
            className="bg-red-600 text-[#fff] py-2 font-semibold font-sans rounded w-[95%] ml-3 mt-6 text-2xl"
            onClick={handleCheckout}
            disabled={isLoading} // Disable button during checkout
          >
            {isLoading ? 'Processing...' : `Check out ($${totalPrice})`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
