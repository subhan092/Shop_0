import React, { useEffect, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import { MdTrackChanges } from "react-icons/md";
import { backend_url } from "../../Url";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../Redux/actions/user";
import { toast } from "react-toastify";
import { getUserOrder } from "../../Redux/actions/order";
import order from "../../Redux/reducers/order";

const ProfileContent = ({ active }) => {
   
  const { user , message } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
    const [zipcode, setzipCode] = useState(user && user.zipcode);
   const [address, setAddress] = useState(user && user.address);
   const [password, setPassword] = useState('');

   
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({ name, email, phoneNumber, zipcode, address, password }))
      .unwrap()
      .then((message) => {
        toast.success(message);
      })
      .catch((error) => {
        toast.error(error);
      });
  };


  
  
  return (
    <div className="w-full ">
      {active === 1 ? (
        <div className="flex  flex-col items-center w-full">
          <div className="relative">
                     <img
                      src={`${backend_url}public/images/${user && user.avatar}`}
                      className="w-[150px] h-[140px] rounded-full"
                      alt=""
                    />
            <div className="absolute bg-white  rounded-full bottom-[5px] right-[2px] ">
              <AiOutlineCamera className="   " size={30} />
            </div>
          </div>
          <br />
          <br />
          <br />
           <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap w-full px-4"> 
            {/* one row */}
            <div className="flex w-full mb-2 gap-4">
              <div className="w-[50%] ">
                <label className="block pb-2">Full Name</label>
                <input className={`${styles.input}`} type="text" value={name} onChange={(e)=>setName(e.target.value)} />
              </div>
              <div className="w-[50%]">
                <label className="block pb-2">Email Adress</label>
                <input className={`${styles.input}`} type="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
              </div>
            </div>
            {/* second row */}
            <div className="flex w-full mb-2 gap-4">
              <div className="w-[50%] ">
                <label className="block pb-2">Phone Number</label>
                <input className={`${styles.input}`} type="text" value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)} />
              </div>
              <div className="w-[50%]">
                <label className="block pb-2">Zip code</label>
                <input className={`${styles.input}`} type="text" value={zipcode} onChange={(e)=>setzipCode(e.target.value)} />
              </div>
            </div>
            {/* third row */}
            <div className="flex w-full mb-2 gap-4">
              <div className="w-[50%] ">
                <label className="block pb-2">Address</label>
                <input className={`${styles.input}`} type="text" value={address} onChange={(e)=>setAddress(e.target.value)} />
              </div>
              <div className="w-[50%]">
                <label className="block pb-2">Enter your Password</label>
                <input className={`${styles.input}`} type="password"  value={password} onChange={(e)=>setPassword(e.target.value)}/>
              </div>
            </div>
            <div className="w-[35%] mt-4">
              <input
                className=" w-full h-[2.5rem] bg-transparent text-[1.2rem] border-2 border-blue-500
                 rounded cursor-pointer hover:border-white hover:text-white hover:bg-blue-400 delay-200"
                type="submit"
                value="Update"
              />
            </div>
          
            </div>
            </form>
        </div>
      ) : null}

      {
        active === 2 ?  (
          <AllOrders orders={orders} user={user}/>
        ) : null
      }

      {
        active === 3 ? (
          <AllRefundOrders/>
        ): null
      }

      {
        active === 5 ? (
          <TrackOrder/>
        ): null
      }

    </div>
  );
};




const AllOrders = () => {
  const { user , message } = useSelector((state) => state.user);
  const {orders} = useSelector((state)=>state.order)
  const dispatch = useDispatch();
  console.log('orders in user orders', orders)
  useEffect(() => {
    dispatch(getUserOrder(user._id))
 }, [dispatch])
  console.log(" order is",orders)

  return (
    <div className="overflow-x-auto pl-8 pt-1">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Order ID</th>
            <th className="px-4 py-2 border-b">Status</th>
            <th className="px-4 py-2 border-b">Items Qty</th>
            <th className="px-4 py-2 border-b">Total</th>
            <th className="px-4 py-2 border-b"></th>
          </tr>
        </thead>
        <tbody>
          {orders && orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order._id} className="border-b">
                <td className="px-4 py-2 text-center">{order._id}</td>
                <td
                  className={`px-4 py-2 text-center ${
                    order.status === "Delivered" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {order.status}
                </td>
                <td className="px-4 py-2 text-center">{order.cart.length}</td>
                <td className="px-4 py-2 text-center">US$ {order.cart[0].discountPrice}</td>
                <td className="px-4 py-2 text-center">
                  <Link to={`/user/order/${order._id}`}>
                    <button className="text-blue-600 hover:text-blue-800">
                      <AiOutlineArrowRight size={20} />
                    </button>
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4">
                No orders found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};



const AllRefundOrders = () => {
  const orders = [
    {
      _id: "1",
      status: "Processing refund",
      cart: [{}, {}, {}], // 3 items
      totalPrice: 150.0,
    },
    {
      _id: "2",
      status: "Delivered",
      cart: [{}, {}], // 2 items
      totalPrice: 100.0,
    },
    {
      _id: "3",
      status: "Processing refund",
      cart: [{}], // 1 item
      totalPrice: 50.0,
    },
    {
      _id: "4",
      status: "Cancelled",
      cart: [{}, {}, {}, {}], // 4 items
      totalPrice: 200.0,
    },
  ];

  const eligibleOrders = orders.filter(
    (order) => order.status === "Processing refund"
  );

  return (
    <div className="overflow-x-auto pl-8 pt-1">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Order ID</th>
            <th className="px-4 py-2 border-b">Status</th>
            <th className="px-4 py-2 border-b">Items Qty</th>
            <th className="px-4 py-2 border-b">Total</th>
            <th className="px-4 py-2 border-b"></th>
          </tr>
        </thead>
        <tbody>
          {eligibleOrders && eligibleOrders.length > 0 ? (
            eligibleOrders.map((order) => (
              <tr key={order._id} className="border-b">
                <td className="px-4 py-2 text-center">{order._id}</td>
                <td
                  className={`px-4 py-2 text-center ${
                    order.status === "Delivered" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {order.status}
                </td>
                <td className="px-4 py-2 text-center">{order.cart.length}</td>
                <td className="px-4 py-2 text-center">US$ {order.totalPrice}</td>
                <td className="px-4 py-2 text-center">
                  <Link to={`/user/order/${order._id}`}>
                    <button className="text-blue-600 hover:text-blue-800">
                      <AiOutlineArrowRight size={20} />
                    </button>
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4">
                No refund orders found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};


const TrackOrder = () => {
  const orders = [
    {
      _id: "1",
      status: "Delivered",
      cart: [{}, {}, {}], // 3 items
      totalPrice: 150.0,
    },
    {
      _id: "2",
      status: "Pending",
      cart: [{}, {}], // 2 items
      totalPrice: 100.0,
    },
    {
      _id: "3",
      status: "Cancelled",
      cart: [{}], // 1 item
      totalPrice: 50.0,
    },
    {
      _id: "4",
      status: "Processing",
      cart: [{}, {}, {}, {}], // 4 items
      totalPrice: 200.0,
    },
  ];

  return (
    <div className="overflow-x-auto pl-8 pt-1">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Order ID</th>
            <th className="px-4 py-2 border-b">Status</th>
            <th className="px-4 py-2 border-b">Items Qty</th>
            <th className="px-4 py-2 border-b">Total</th>
            <th className="px-4 py-2 border-b"></th>
          </tr>
        </thead>
        <tbody className="text-center">
          {orders && orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order._id} className="border-b">
                <td className="px-4 py-2">{order._id}</td>
                <td
                  className={`px-4 py-2 ${
                    order.status === "Delivered"
                      ? "text-green-600"
                      : order.status === "Cancelled"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {order.status}
                </td>
                <td className="px-4 py-2">{order.cart.length}</td>
                <td className="px-4 py-2">US$ {order.totalPrice}</td>
                <td className="px-4 py-2 text-center">
                  <Link to={`/user/track/order/${order._id}`}>
                    <button className="text-blue-600 hover:text-blue-800">
                      <MdTrackChanges size={20} />
                    </button>
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-4">
                No orders found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};



export default ProfileContent;
