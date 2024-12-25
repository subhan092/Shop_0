import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backend_url } from "../../Url";


export const createProduct = createAsyncThunk('createProduct', async ( formdata, { rejectWithValue }) => {
    axios.defaults.withCredentials = true;
    try { 
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };
        const { data } = await axios.post(`${backend_url}product/create`, formdata , config);
        console.log("API Response Data:", data); // Debugging

        return data.product;

    } catch (error) {
        console.log('Error in creating product:', error);
        return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
});



export const getProducts = createAsyncThunk('getProducts', async (id, { rejectWithValue }) => {
    axios.defaults.withCredentials = true;
    try {
        const {data} = await axios.get(`${backend_url}product/get-all-products-shop/${id}`);
        return data.products; 
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});
  // get all products 
  export const getAllProducts = createAsyncThunk(
    'getAllProducts',
    async (_, { rejectWithValue }) => {
      try {
        const { data } = await axios.get(`${backend_url}product/get-all-products`);
        console.log("all products from backend:", data.products); // Add this line
        return data.products;
      } catch (error) {
        console.log("error in getAllProducts:", error);
        return rejectWithValue(error.response.data.message);
      }
    }
  );
  


export const deleteProduct = createAsyncThunk('deleteProduct', async (id, { rejectWithValue }) => {
    axios.defaults.withCredentials = true;
    try {
        const {data} = await axios.delete(`${backend_url}product/delete-shop-product/${id}`);
        return data.message; 

      
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
})

