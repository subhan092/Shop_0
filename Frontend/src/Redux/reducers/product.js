import { createSlice } from "@reduxjs/toolkit";
import { createProduct, deleteProduct, getAllProducts, getProducts } from "../actions/product";

const productSlice = createSlice({
  name: "products",
  initialState: {
    productLoading: false,
    product: null,
    success: false,
    error: null,
    products: null,
    allProducts: []
  },

  reducers: {
    clearErrors(state) {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.productLoading = true;
        state.success = false; // Reset success status when a new request is made
        state.error = null; // Clear any previous errors when a new request is made
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.productLoading = false;
        state.product = action.payload;
        state.success = true;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.productLoading = false;
        state.error = action.payload;
        state.success = false;
      });

    // get all shop products
    builder
      .addCase(getProducts.pending, (state) => {
        state.productLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.productLoading = false;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.productLoading = false;
        state.error = action.payload;
      });

    // delete  product by id
    builder
      .addCase(deleteProduct.pending, (state) => {
        state.productLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.productLoading = false;
        state.message = action.payload;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.productLoading = false;
        state.message = action.payload;
      });

      builder
      .addCase(getAllProducts.pending, (state) => {
        state.productLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.productLoading = false;
        state.allProducts = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.productLoading = false;
        state.message = action.payload;
      });
  },
});

export default productSlice.reducer;
export const { clearErrors } = productSlice.actions;
