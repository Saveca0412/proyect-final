import { configureStore } from "@reduxjs/toolkit";
import PurchasesSlice from "./slices/Purchases.slice";
import isLoadingSlice from "./slices/isLoading.slice";
import ProductsSlice from "./slices/Products.slice";

export default configureStore({
  reducer: {
    isLoading: isLoadingSlice,
    prduct: ProductsSlice,
    purchases : PurchasesSlice
  }
});
