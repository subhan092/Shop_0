import React, { useEffect, useState } from "react";
import axios from "axios";
import { backend_url } from "../../Url";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const ManageSellers = () => {
  const [sellers, setSellers] = useState([]); // State to store sellers
  

  useEffect(() => {
    axios
      .get(`${backend_url}seller/get-all-seller`) // API call to fetch sellers
      .then((resp) => {
        setSellers(resp.data.sellers); // Store fetched sellers in state
      })
      .catch((error) => {
        console.log("Error fetching sellers:", error);
      });
  }, []);

  return (
    <div className="w-full p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        All Shops sellers
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="py-3 px-6 text-left">Image</th>
              <th className="py-3 px-6 text-left">Shop name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Address</th>
              <th className="py-3 px-6 text-center">Total Products</th>
              <th className="py-3 px-6 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {sellers && sellers.map((seller) => (
              <tr key={seller._id} className="border-b hover:bg-blue-50">
                <td className="py-3 px-6 text-left">
                  <img
                    src={`${backend_url}public/shop/${seller.avatar}`}
                    alt="shop-image"
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="py-3 px-6 text-left text-gray-700 font-semibold">
                  {seller.name}
                </td>
                <td className="py-3 px-6 text-left text-gray-600">
                  {seller.email}
                </td>
                <td className="py-3 px-6 text-left text-gray-600">
                  {seller.address}
                </td>
                <td className="py-3 px-6 text-left text-gray-600">
                  {seller.length}
                </td>
                <td className="py-3 px-6 text-left text-gray-600 cursor-pointer">
                  <Link to={`/admin/product-list/${seller._id}`}>
                    <FaArrowRight size={20} />
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

export default ManageSellers;
