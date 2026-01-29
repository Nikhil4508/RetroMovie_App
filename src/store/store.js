import { configureStore } from "@reduxjs/toolkit";
import retroReducer from './retroSlice'
export const store = configureStore({
    reducer: {
        retroMovieData : retroReducer
    },
})