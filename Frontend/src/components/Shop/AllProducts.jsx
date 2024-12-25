import React, { useEffect } from "react";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProduct, getProducts } from "../../Redux/actions/product";
import { Store } from "../../Redux/store";
import { toast } from "react-toastify";
import Loader from "../Layout/Loader";

const AllProducts = () => {

  const {seller} = useSelector((state)=>state.seller)
  const {products , productLoading } = useSelector((state)=>state.products)
  const dispatch =  useDispatch()
  console.log("seller in products",seller)
  useEffect(() => {
    if (seller?._id) {
        dispatch(getProducts(seller._id)); // Dispatch the action with the seller's ID
    }
}, [dispatch, seller]);

  
   console.log("shop all products is", products)

  const handleDelete = (id) => {
    dispatch(deleteProduct(id))
    console.log(`Product with id ${id} deleted`);
    toast.success("product deleted sucessfully..")
    window.location.reload(true);
  };

  const columns = [
    { field: "id", headerName: "Product Id" },
    { field: "name", headerName: "Name" },
    { field: "price", headerName: "Price" },
    { field: "Stock", headerName: "Stock" },
    { field: "sold", headerName: "Sold out" },
    { field: "Preview", headerName: "" },
    { field: "Delete", headerName: "" },
  ];

  return (
    <>
   { products && productLoading  ? ( <Loader/>):(
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
            {products &&  products.map((product) => (
              <tr key={product._id} className="border-b">
                <td className="py-2 px-4 text-sm">{product._id}</td>
                <td className="py-2 px-4 text-sm">{product.name}</td>
                <td className="py-2 px-4 text-sm">US$ {product.discountPrice}</td>
                <td className="py-2 px-4 text-sm">{product.stock}</td>
                <td className="py-2 px-4 text-sm">{product.sold_out}</td>
                <td className="py-2 px-4 text-sm">
                  <Link to={`/product/${product.name}`}>
                    <AiOutlineEye size={20} />
                  </Link>
                </td>
                <td className="py-2 px-4 text-sm">
                  <button onClick={() => handleDelete(product._id)}>
                    <AiOutlineDelete size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) }
    </>
  );
};

export default AllProducts;
