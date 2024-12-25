import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user";
import sellerReducer from "./reducers/seller";
import productReducer from "./reducers/product";
import cartReducer from "./reducers/cart";
import wishlistReducer from "./reducers/whislist";
import orderReducer from "./reducers/order";

export const Store = configureStore({
    reducer:{
        user : userReducer,
        seller:sellerReducer,
        products:productReducer,
        allcart: cartReducer,
        allwishlist:  wishlistReducer,
        order: orderReducer
    }
})