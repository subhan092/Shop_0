import {  createSlice } from "@reduxjs/toolkit";
import { looadUser, updateUser } from "../actions/user";



 const userSlice = createSlice({
  name : 'user',

   initialState: {
    isAuthenticated: false,
    loading: false,
    user: null,
    error: null,
    message:null,
  },
   
  reducers: {
    clearErrors(state) {
      state.error = null;
    },
  },
  
  extraReducers : (builder)=>{
    builder.addCase(looadUser.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(looadUser.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    })
    builder.addCase(looadUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    })

    builder.addCase(updateUser.pending,(state)=>{
      state.loading = true
    })
    builder.addCase(updateUser.fulfilled,(state, action)=>{
      state.loading = false
      state.message = action.payload;
    })
    builder.addCase(updateUser.rejected,(state)=>{
      state.loading = false
      state.message = action.payload
    })

  }
  
});

export const { clearErrors } = userSlice.actions;
export default userSlice.reducer;
