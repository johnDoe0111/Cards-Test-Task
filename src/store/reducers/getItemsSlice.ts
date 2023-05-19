import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getItemsState, IGetItems, IItems } from "../../types/IGetItems";
import { getCardId, getItemsAction } from "./getItemsAction";


const initialState: getItemsState = {
    getItems: [],
    cardId: {} as IItems,
    isLoading: false,
    error: false
}

export const getItemsSlice = createSlice({
    name: 'getItems',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getItemsAction.pending, state => {
            state.isLoading = true
        })
        builder.addCase(getItemsAction.fulfilled, (state, action: PayloadAction<IGetItems>) => {
            if (!JSON.stringify(state.getItems).includes(action.payload.items[0].id)) {
                state.getItems.push(action.payload)
            }
            state.isLoading = false
        })
        builder.addCase(getItemsAction.rejected, state => {
            state.error = true
        })
        builder.addCase(getCardId.pending, state => {
            state.isLoading = true
        })
        builder.addCase(getCardId.fulfilled, (state, action: PayloadAction<IItems>) => {
            state.cardId = action.payload
            state.isLoading = false
        })
    },
})

export default getItemsSlice.reducer;