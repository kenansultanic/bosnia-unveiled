import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "api";

const getDestinations = createAsyncThunk(
    "destinations/get",
    async (obj: any) => {
        const res = await api.get("/destinations/", {
            params: {
                page: obj.page,
                per_page: obj.perPage
            }
        });

        return res.data;
    }
);

const getLocationsAndCategories = createAsyncThunk(
    "locations/get",
    async () => {
        const res = await api.get("/locations-and-categories/");

        return res.data;
    }
);

const getDestinationById = createAsyncThunk(
    "destinations/getById",
    async (id: number) => {
        const res = await api.get(`/destination/${id}/`);

        return res.data;
    }
);

const getClosestDestinations = createAsyncThunk(
    "destinations/getClosest",
    async (obj: any) => {
        const categories = obj.categories.join(",");
        console.log(categories);

        const res = await api.get("/destinations/closest/", {
            params: {
                location_id: obj.locationId,
                distance: obj.distance,
                categories: categories
            }
        });

        return res.data;
    }
);

const getSearchedDestinations = createAsyncThunk(
    "destinations/getSearched",
    async (term: string) => {
        const res = await api.get(`/destinations/search/?query=${term}`);

        return res.data;
    }
);

const getRandomDestinations = createAsyncThunk(
    "destinations/getRandom",
    async (n: number) => {
        const res = await api.get(`/destinations/random/${n}/`);

        return res.data;
    }
);

// DEV ONLY
const pause = (time: number) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(null);
        }, time)
    });
};

export { getDestinations, getLocationsAndCategories, getDestinationById, getClosestDestinations, getSearchedDestinations, getRandomDestinations };