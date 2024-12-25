import React, { useEffect } from "react";

import Lottie from "react-lottie";
import animationData from '../../assets/animations/107043-success.json'
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import axios from "axios";
import { toast } from "react-toastify";
import { backend_url } from "../../Url";

const SucessPage = () => {
  useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem('latestOrder'));
      createOrder(orderData);
    console.log("orderData",orderData);
  }, []);


  const createOrder = async (orderData) => {
    try {
      await axios.post(`${backend_url}order/create`, orderData).then((response)=>{
        toast.success(response.data.message);
        localStorage.removeItem('latestOrder',);
        localStorage.removeItem('cartItems');     
         window.location.reload(true)
      }).catch((error)=>{
        toast.error(error.response.data.message);
      })
    } catch (error) {
      console.error('Order creation error:', error);
    }
  };
  return (
    <div>
      <Header />
      <Success />
      <Footer />
    </div>
  );
};

const Success = () => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div>
      <Lottie options={defaultOptions} width={300} height={300} />
      <h5 className="text-center mb-14 text-[25px] text-[#000000a1]">
        Your order is successful 😍
      </h5>
      <br />
      <br />
    </div>
  );
};

export default SucessPage;
