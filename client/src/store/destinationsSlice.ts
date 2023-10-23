import { createSlice } from "@reduxjs/toolkit";
import { getDestinations, getDestinationById, getClosestDestinations } from "./getDestinations";

interface Destination {

}
const initialState: Destination[] = [];

export const destinationsSlice = createSlice({
    name: "destinations",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getDestinations.fulfilled, (state, action) => {
            state.push(...action.payload);
        });
        builder.addCase(getDestinationById.fulfilled, (state, action) => {
            state.push(action.payload);
        });
        builder.addCase(getClosestDestinations.fulfilled, (state, action) => {
            state.push();
        });
    }
});

export default destinationsSlice.reducer;