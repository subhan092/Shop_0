import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backend_url } from "../../Url";

export const getUserOrder = createAsyncThunk('getUserOrder', async (userId, { rejectWithValue }) => {
    axios.defaults.withCredentials = true;
    try {
        const {data} = await axios.get(`${backend_url}order/get-all-order/${userId}`);
        return data.orders; 
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

export const getShopOrder = createAsyncThunk('getShopOrder', async (shopId, { rejectWithValue }) => {
    axios.defaults.withCredentials = true;
    try {
        const {data} = await axios.get(`${backend_url}order/get-seller-all-order/${shopId}`);
        return data.shoporders; 
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});