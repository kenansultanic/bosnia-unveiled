import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "api";

const getDestinations = createAsyncThunk(
    "destinations/get",
    async () => {
        const res = await api.get("/destinations/");

        return res.data;
    }
);

const getDestinationById = createAsyncThunk(
    "destinations/getById",
    async (id: number) => {
        const res = await api.get(`/destination/${id}`);

        return res.data;
    }
);

const getClosestDestinations = createAsyncThunk(
    "destinations/getClosest",
    async (obj: any) => {
        const categories = obj.categories.join(",");
        const res = await api.get("/destinations/closest", {
            params: {
                location_id: obj.locationId,
                distance: obj.distance,
                categories: categories
            }
        });

        return res.data;
    }
);

export { getDestinations, getDestinationById, getClosestDestinations };