import { createSlice } from "@reduxjs/toolkit";
import { getDestinations, getDestinationById, getClosestDestinations } from "./getDestinations";

interface DestinationsInitialState {
    allDestinations: any[],
    searchedDestinations: any[],
    isSearched: boolean
}

const initialState: DestinationsInitialState = {
    allDestinations: [],
    searchedDestinations: [],
    isSearched: false
};

export const destinationsSlice = createSlice({
    name: "destinations",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getDestinations.fulfilled, (state, action) => {
            state.allDestinations.push(...action.payload.results);
        });
        builder.addCase(getDestinationById.fulfilled, (state, action) => {
            state.allDestinations.push(action.payload);
        });
        builder.addCase(getClosestDestinations.fulfilled, (state, action) => {
            const newDestinations = action.payload.closest_destinations;

            // Check if each destination is not already in allDestinations
            const uniqueDestinations = newDestinations.filter(
              (destination: any) => !state.allDestinations.includes(destination)
            );

            state.allDestinations.push(...newDestinations);
            state.searchedDestinations = action.payload.closest_destinations;
            state.isSearched = true;
        });
    }
});

export default destinationsSlice.reducer;