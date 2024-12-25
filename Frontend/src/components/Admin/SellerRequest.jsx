import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { backend_url } from "../../Url";

const SellerRequest = () => {
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


  const columns = [
    { field: "rowNumber", headerName: "No." },
    // { field: "sellerName", headerName: "Seller Name" },
    { field: "shopName", headerName: "Shop Name" },
    { field: "email", headerName: "Email" },
    { field: "address", headerName: "Address" },
    { field: "status", headerName: "Status" },
    { field: "action", headerName: "Action" },
  ];

  const seller = sellers.filter((item,index)=> item.status !== 'active')

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
            {seller.map((seller, index) => (
              <tr key={seller.id} className="border-b">
                <td className="py-2 px-4 text-sm">{index + 1}</td>
                <td className="py-2 px-4 text-sm">{seller.name}</td>
                {/* <td className="py-2 px-4 text-sm">{seller.shopName}</td> */}
                <td className="py-2 px-4 text-sm">{seller.email}</td>
                <td className="py-2 px-4 text-sm">{seller.address}</td>
                <td className="py-2 px-4 text-sm">{seller.status}</td>
                <td className="py-2 px-4 text-sm">
                  <Link to={`/shop-info/${seller._id}`} className="text-blue-500">
                    View Shop Info
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

export default SellerRequest;
