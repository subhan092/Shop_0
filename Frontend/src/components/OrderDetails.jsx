import React, { useEffect, useState } from "react";
import styles from "../styles/styles";
import { BsFillBagFill } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { backend_url } from "../Url";
import { getUserOrder } from "../Redux/actions/order";

const OrderDetails = () => {
  // Static order data
  // const orders = [
  //   {
  //     _id: "1",
  //     status: "Processing",
  //     createdAt: "2023-08-01T00:00:00Z",
  //     totalPrice: 100,
  //     shippingAddress: {
  //       address1: "123 Main St",
  //       address2: "Apt 4B",
  //       country: "USA",
  //       city: "New York",
  //     },
  //     user: {
  //       phoneNumber: "123-456-7890",
  //     },
  //     paymentInfo: {
  //       status: "Paid",
  //     },
  //     cart: [
  //       {
  //         name: "Product 1",
  //         discountPrice: 50,
  //         qty: 1,
  //         images: [{ url: "https://st-troy.mncdn.com/mnresize/1500/1500/Content/media/ProductImg/original/mpwp3tua-apple-iphone-14-256gb-mavi-mpwp3tua-637986832343472449.jpg" }],
  //       },
  //       {
  //         name: "Product 2",
  //         discountPrice: 50,
  //         qty: 1,
  //         images: [{ url: "https://st-troy.mncdn.com/mnresize/1500/1500/Content/media/ProductImg/original/mpwp3tua-apple-iphone-14-256gb-mavi-mpwp3tua-637986832343472449.jpg" }],
  //       },
  //     ],
  //   },
   
  // ];

   const {user} = useSelector((state)=>state.user)
   const {orders} = useSelector((state)=>state.order)



   const dispatch = useDispatch()
   useEffect(() => {
     if(user){
       dispatch(getUserOrder(user._id))
     }
   }, [])
 

  const [status, setStatus] = useState("");

  const navigate = useNavigate();

  // Hardcoded order ID for the example
  const {id} =useParams() 
  const data = orders && orders.find((item) => item._id === id);

  const orderUpdateHandler = () => {
    console.log("Order status updated to:", status);
    alert("Order updated!");
    navigate("/profile");
  };

  const refundOrderUpdateHandler = () => {
    console.log("Refund status updated to:", status);
    alert("Refund status updated!");
  };

  console.log(data?.status);

  return (
    <div className={`py-4 min-h-screen ${styles.section}`}>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          <BsFillBagFill size={30} color="crimson" />
          <h1 className="pl-2 text-[25px]">Order Details</h1>
        </div>
        <Link to="/profile">
          <div
            className={`${styles.button} !bg-[#fce1e6] !rounded-[4px] text-[#e94560] font-[600] !h-[45px] text-[18px]`}
          >
            Order List
          </div>
        </Link>
      </div>

      <div className="w-full flex items-center justify-between pt-6">
        <h5 className="text-[#00000084]">
          Order ID: <span>#{data?._id?.slice(0, 8)}</span>
        </h5>
        <h5 className="text-[#00000084]">
          Placed on: <span>{data?.createdAt?.slice(0, 10)}</span>
        </h5>
      </div>

      {/* order items */}
      <br />
      <br />
      {data &&
        data.cart.map((item, index) => (
          <div className="w-full flex items-start mb-5" key={index}>
            <img
              src={`${backend_url}public/product/${item.images[0]}`}
              alt=""
              className="w-[80x] h-[80px]"
            />
            <div className="w-full">
              <h5 className="pl-3 text-[20px]">{item.name}</h5>
              <h5 className="pl-3 text-[20px] text-[#00000091]">
                US${item.discountPrice} x {item.qty}
              </h5>
            </div>
          </div>
        ))}

      <div className="border-t w-full text-right">
        <h5 className="pt-3 text-[18px]">
          Total Price: <strong>US${data?.totalPrice}</strong>
        </h5>
      </div>
      <br />
      <br />
      {/* <div className="w-full 800px:flex items-center">
        <div className="w-full 800px:w-[60%]">
          <h4 className="pt-3 text-[20px] font-[600]">Shipping Address:</h4>
          <h4 className="pt-3 text-[20px]">
            {data?.shippingAddress.address1 +
              " " +
              data?.shippingAddress.address2}
          </h4>
          <h4 className=" text-[20px]">{data?.shippingAddress.country}</h4>
          <h4 className=" text-[20px]">{data?.shippingAddress.city}</h4>
          <h4 className=" text-[20px]">{data?.user?.phoneNumber}</h4>
        </div>
        <div className="w-full 800px:w-[40%]">
          <h4 className="pt-3 text-[20px]">Payment Info:</h4>
          <h4>
            Status:{" "}
            {data?.paymentInfo?.status ? data?.paymentInfo?.status : "Not Paid"}
          </h4>
        </div>
      </div> */}

      <br />
      <br />
      <h4 className="pt-3 text-[20px] font-[600]">Order Status:</h4>
      {data?.status !== "Processing refund" &&
        data?.status !== "Refund Success" && (
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-[200px] mt-2 border h-[35px] rounded-[5px]"
          >
            {[
              "Processing",
              "Transferred to delivery partner",
              "Shipping",
              "Received",
              "On the way",
              "Delivered",
            ]
              .slice(
                [
                  "Processing",
                  "Transferred to delivery partner",
                  "Shipping",
                  "Received",
                  "On the way",
                  "Delivered",
                ].indexOf(data?.status)
              )
              .map((option, index) => (
                <option value={option} key={index}>
                  {option}
                </option>
              ))}
          </select>
        )}
      

     
    </div>
  );
};

export default  OrderDetails;
