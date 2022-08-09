import { createSlice, isAsyncThunkAction } from "@reduxjs/toolkit";
import axios from "axios";
import { setIsLoading } from "./isLoading.slice";

export const ProductsSlice = createSlice({
  name: "Products",
  initialState: [],
  reducers: {
    setProducts: (state, action) => {
      const products = action.payload;
      return products;
    }
  }
});

export const getProductsThunk = () => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios.get("https://ecommerce-api-react.herokuapp.com/api/v1/products")
    .then((res) => dispatch(setProducts(res.data.data.products))) // setProducts(res.data)
    .finally(() => dispatch(setIsLoading(false)));
};
export const filterHeadlineThunk = (searchValue) => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products?query=${searchValue}`)
    .then((res) => dispatch(setProducts(res.data.data.products)))
    .finally(() => dispatch(setIsLoading(false)))
    //.catch(error=>console.log(error.response))
};
//https://ecommerce-api-react.herokuapp.com/api/v1/products?query=${searchByTitle}

export const filterCategoryThunk = (searchByTitle) => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products?category=${searchByTitle}`)
    .then((res) => dispatch(setProducts(res.data.data.products))) // setProducts(res.data)
    .finally(() => dispatch(setIsLoading(false)));
    
};




export const { setProducts } = ProductsSlice.actions;

export default ProductsSlice.reducer;
