import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backend_url } from "../../Url";

export const looadUser = createAsyncThunk('looadUser',async()=>{
    axios.defaults.withCredentials = true
        try {  
            const response = await axios.get('http://localhost:3000/getuser');
            console.log("before getting user in frontend ")
            const data = response.data; 
            console.log("get data in frontend",data);
            return  data.user ;

        } catch (error) {
            console.error('Error fetching user data:', error);
        
        }
})

// update user profile ... 

export const updateUser = createAsyncThunk(
  'updateUser',
  async ({ name, email, phoneNumber, zipcode, address, password }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${backend_url}updateuser`, {
        name,
        email,
        phoneNumber,
        zipcode,
        address,
        password
      });

      return response.data.message;
    } catch (error) {
      return rejectWithValue(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  }
);
