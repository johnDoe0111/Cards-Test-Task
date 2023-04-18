import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseServise } from "../../api/baseServise";


export const getItemsAction = createAsyncThunk(
    "get/items", 
    async (currentPage: number) => {
        
    const {data} = await baseServise.get(`/items?page=${currentPage}`);
    
    return data;
});

export const getCardId = createAsyncThunk(
    "card/info", 
    async (id: string) => {
        
    const {data} = await baseServise.get(`/items/${id}`);
    
    return data;
});