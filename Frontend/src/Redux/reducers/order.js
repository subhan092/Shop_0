import { createSlice } from "@reduxjs/toolkit";
import { getShopOrder, getUserOrder } from "../actions/order";

const initialState ={
    loading : null,
    orders: null,
    error:null,
    shoporders: null
}

const orderSlice = createSlice({
    name:'order',
    initialState,
    extraReducers: (builder)=>{
        builder
        .addCase(getUserOrder.pending,(state,action)=>{
            state.loading = true
          })
          .addCase(getUserOrder.fulfilled,(state,action)=>{
            state.loading = false
            state.orders= action.payload
          })
          .addCase(getUserOrder.rejected,(state,action)=>{
            state.loading = false
            state.error= action.payload
          })

          // get shop orders
          builder
          .addCase(getShopOrder.pending,(state,action)=>{
              state.loading = true
            })
            .addCase(getShopOrder.fulfilled,(state,action)=>{
              state.loading = false
              state.shoporders= action.payload
            })
            .addCase(getShopOrder.rejected,(state,action)=>{
              state.loading = false
              state.error= action.payload
            })
    }
})

export default orderSlice.reducer;
