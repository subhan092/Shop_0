// AdminProductList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../Redux/actions/product";
import Loader from "../Layout/Loader";
import { backend_url } from "../../Url";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import UpdateProductModal from "./UpdateProductModal";
import DeleteProduct from "./DeleteProduct";

const ProductList = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const [product, setProducts] = useState([]);
  const { products, productLoading } = useSelector((state) => state.products);
  const [showModal, setShowModel] = useState(false);
  const [selectedproduct, setSelectedproduct] = useState(null);
  const [ ShowDeleteModal , setShowDeleteModal] = useState(false);
  useEffect(() => {
      dispatch(getProducts(id));
    
  }, [dispatch]);
  console.log("id is", id);
  console.log("product list", products);

  const handleModel=(pid)=>{
    setShowModel(true);
    setSelectedproduct(pid);
}
const handleDeleteClick = (pid) => {
 setSelectedproduct(pid);
 setShowDeleteModal(true);
};


  // Delete product

  console.log("selected product",selectedproduct)

  return (
    <div className="container mx-auto p-4">
    <h1 className="text-3xl font-bold mb-6 text-center">
      Manage All Products
    </h1>
    {products === null ? (
      <div className="grid place-items-center text-2xl text-red-600 w-full h-screen">
        <div>No products found in this shop</div>
      </div>
    ) : (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-3 px-6 text-left">Image</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Description</th>
              <th className="py-3 px-6 text-left">Price</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-t border-gray-200 hover:bg-gray-100 transition">
                <td className="py-4 px-6">
                  <img
                    src={`${backend_url}public/product/${product.images[0]}`}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                </td>
                <td className="py-4 px-6">{product.name}</td>
                <td className="py-4 px-6">
                  {product.description && product.description.length > 100
                    ? product.description.slice(0, 100) + '...'
                    : product.description || "No description available"}
                </td>
                <td className="py-4 px-6">${product.discountPrice}</td>
                <td className="py-3 px-6 text-center">
                  <button className="text-green-500 hover:text-green-700" onClick={()=>{handleModel(product._id)}}>
                    <AiOutlineEdit size={20} />
                  </button>
                </td>
                {
                   showModal ? (<UpdateProductModal showModal={showModal} setShowModal={setShowModel} productId={selectedproduct} />) : null 
                                   }
                <td className="py-3 px-6 text-center">
                  <button onClick={() => handleDeleteClick(product._id)} data-modal-target="popup-modal" data-modal-toggle="popup-modal" type="button" className="text-red-500 hover:text-red-700" >
                    <AiOutlineDelete size={20} />
                  </button>
                  {ShowDeleteModal ?( <DeleteProduct ShowModal={ShowDeleteModal} SetShowModal={setShowDeleteModal} productId={product._id}/> ): null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
  
  );
};

export default ProductList;
