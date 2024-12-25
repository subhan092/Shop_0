import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { backend_url } from "../../Url";

export const loadSeller = createAsyncThunk('looadSeller',async()=>{
    axios.defaults.withCredentials = true
        try {  
            const {data} = await axios.get(`${backend_url}seller/getseller`);
            console.log("before getting seller in frontend ")
            console.log("get seller data in frontend",data);
            return  data.seller ;

        } catch (error) {
            console.error('Error fetching seller data:', error);
        
        }
})