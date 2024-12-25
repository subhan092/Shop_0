import axios from "axios";
import React, { useState, useEffect } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import { backend_url } from "../../Url";

const AllSellers = () => {
  const [sellers, setSellers] = useState([]); // State to store sellers

  useEffect(() => {
    axios.get(`${backend_url}seller/get-all-seller`) // API call to fetch sellers
      .then((resp) => {
        setSellers(resp.data.sellers); // Store fetched sellers in state
      })
      .catch((error) => {
        console.log("Error fetching sellers:", error);
      });
  }, []);

  console.log('all sellers ',sellers);
  const columns = [
    { field: "rowNumber", headerName: "id." },
    { field: "shopName", headerName: "Shop Name" },
    { field: "email", headerName: "Email" },
    { field: "phone", headerName: "Phone" },
    { field: "address", headerName: "Address" },
    { field: "status", headerName: "status" },
    { field: "action", headerName: "Action" },
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
            {sellers.map((seller, index) => (
              <tr key={seller._id} className="border-b">
                <td className="py-2 px-4 text-sm">{seller._id}</td>
                <td className="py-2 px-4 text-sm">{seller.name}</td>
                <td className="py-2 px-4 text-sm">{seller.email}</td>
                <td className="py-2 px-4 text-sm">{seller.phone}</td>
                <td className="py-2 px-4 text-sm">{seller.address}</td>
                <td className="py-2 px-4 text-sm">{seller.status}</td>
                <td className="py-2 px-4 text-sm">
                  <Link to={`/shop/preview/${seller._id}`}>
                    <AiOutlineEye size={20} />
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

export default AllSellers;
