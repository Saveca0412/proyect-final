import {createSlice} from '@reduxjs/toolkit';
import { setIsLoading } from './isLoading.slice';
import axios from 'axios';
import getConfig from '../../utils/getConfig';

export const PurchasesSlice = createSlice({
    name: 'purchases',
    initialState: null,
    reducers:{
        setPurchases: (state, action) => {
            const purchases = action.payload;
            return purchases
        }
    }
})

export const getPurchasesThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get("https://ecommerce-api-react.herokuapp.com/api/v1/purchases",getConfig())
      .then(res => dispatch(setPurchases(res.data))) 
      .finally(() => dispatch(setIsLoading(false)));
}




export const { setPurchases } = PurchasesSlice.actions;

export default PurchasesSlice.reducer;