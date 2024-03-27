import { createSlice } from "@reduxjs/toolkit";
import { getDestinations, getLocationsAndCategories, getDestinationById, getClosestDestinations, getSearchedDestinations, getRandomDestinations } from "./getDestinations";

interface DestinationsInitialState {
    allDestinations: any,
    searchedDestinations: any[],
    searchedDestinationsByName: any[],
    randomDestinations: any[],
    isSearched: boolean,
    locationsAndCategories: any,
    destinationById: any
}

const initialState: DestinationsInitialState = {
    allDestinations: {},
    searchedDestinations: [],
    searchedDestinationsByName: [],
    randomDestinations: [],
    isSearched: false,
    locationsAndCategories: {},
    destinationById: {}
};

export const destinationsSlice = createSlice({
    name: "destinations",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getDestinations.fulfilled, (state, action) => {
            state.allDestinations = action.payload;
        });
        builder.addCase(getLocationsAndCategories.fulfilled, (state, action) => {
            state.locationsAndCategories = action.payload;
        });
        builder.addCase(getDestinationById.fulfilled, (state, action) => {
            state.destinationById = action.payload;
        });
        builder.addCase(getClosestDestinations.fulfilled, (state, action) => {
            state.searchedDestinations = action.payload.closest_destinations;
            state.isSearched = true;
        });
        builder.addCase(getSearchedDestinations.fulfilled, (state, action) => {
            state.searchedDestinationsByName = action.payload;
        });
        builder.addCase(getRandomDestinations.fulfilled, (state, action) => {
            state.randomDestinations = action.payload;
        });
    }
});

export default destinationsSlice.reducer;