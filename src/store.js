import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice';

const store = configureStore({
    reducer: {
        cart: cartReducer, // Add cart reducer to the store
    },
});

export default store;