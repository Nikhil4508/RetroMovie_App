import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    bannerData: [],
    imageURL:"",
}

export const retroSlice = createSlice({
    name:"RetroMovie",
    initialState,
    reducers: {
        setBannerData : (state,action) => {
            state.bannerData =  action.payload
        },
        setImageURL : (state,action) => {
            state.imageURL = action.payload
        }
    },
})

export const {setBannerData,setImageURL} =retroSlice.actions

export default retroSlice.reducer