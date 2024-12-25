import React, { useEffect } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getShopOrder } from "../Redux/actions/order";

const AllOrders = () => {
  const {seller} = useSelector((state)=>state.seller)
  const {shoporders}= useSelector((state)=>state.order)
  const dispatch = useDispatch()
  useEffect(() => {
    if(seller){
      dispatch(getShopOrder(seller._id))
    }
  }, [dispatch])
  console.log('seller in orders' ,seller._id);
    
  const columns = [
    { field: "id", headerName: "Order ID" },
    { field: "status", headerName: "Status" },
    { field: "itemsQty", headerName: "Items Qty" },
    { field: "total", headerName: "Total" },
    { field: " ", headerName: "" },
  ];

  return (
    <div className="w-full mx-8 pt-1 mt-10 bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.field}
                  className="py-2 px-4 text-left bg-gray-200 text-gray-600 font-semibold text-sm"
                >
                  {col.headerName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {shoporders && shoporders.map((order) => (
              <tr key={order._id} className="border-b">
                <td className="py-2 px-4 text-sm">{order._id}</td>
                <td
                  className={`py-2 px-4 text-sm ${
                    order.status
                    //   ? "text-green-500"
                    //   : "text-red-500"
                  }`}
                >
                  {order.status}
                </td>
                <td className="py-2 px-4 text-sm">{order.cart.length}</td>
                <td className="py-2 px-4 text-sm">US$ {order.cart[0].discountPrice}</td>
                <td className="py-2 px-4 text-sm">
                  <Link to={`/order/${order._id}`}>
                    <AiOutlineArrowRight size={20} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllOrders;
