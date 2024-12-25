import {  createSlice } from "@reduxjs/toolkit";
import { loadSeller } from "../actions/seller";



 const sellerSlice = createSlice({
  name : 'seller',

   initialState: {
    isSeller: false,
    isLoading: false,
    seller: null,
    error: null,
  },

  reducers: {
    clearErrors(state) {
      state.error = null;
    },
  },

  extraReducers : (builder)=>{
    builder.addCase(loadSeller.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(loadSeller.fulfilled, (state, action) => {
      state.isSeller = true;
      state.isLoading = false;
      state.seller = action.payload;
    })
    builder.addCase(loadSeller.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isSeller = false;
    })
    

  }
  
});

export const { clearErrors } = sellerSlice.actions;
export default sellerSlice.reducer;
