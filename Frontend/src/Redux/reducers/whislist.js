import { createSlice } from "@reduxjs/toolkit";

const  initialState = {
    wishlist: localStorage.getItem("wishlist") ? JSON.parse(localStorage.getItem("wishlist")) : []
}

const wishlistSlice = createSlice({
    name:  "allwishlist",
    initialState,


    reducers:{
        addtoWishlist : (state,action)=>{
            const item = action.payload;
            const itemExists = state.wishlist.find((i)=>i._id===item._id)
            if(itemExists){
                state.wishlist = state.wishlist.map((i)=> i._id==itemExists._id ? item:i)
            }
            else{
                state.wishlist.push(item)
            }
            localStorage.setItem("wishlist",JSON.stringify(state.wishlist))

        },

        removeFromWishlist: (state, action) => {
            state.wishlist = state.wishlist.filter((i) => i._id !== action.payload._id);
            localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
          },
    }

})

export const { addtoWishlist, removeFromWishlist} = wishlistSlice.actions;
export default wishlistSlice.reducer;