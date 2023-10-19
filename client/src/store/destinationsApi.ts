import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const destinationsApi = createApi({
    reducerPath: "destinationsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://project-production-149b.up.railway.app" }),
    endpoints(builder) {
        return {
            fetchDestinations: builder.query({
                query: () => {
                    return {
                        url: "/destinations",
                        method: "GET"
                    };
                }
            }),
            getDestination: builder.query({
                query: (destId: number) => {
                    return {
                        url: `/destination/${destId}/`,
                        method: "GET"
                    };
                }
            }),
            getClosestDestinations: builder.query({
                query: ({ locationID, distance, categories }) => {
                    return {
                        url: "/destinations/closest",
                        params: {
                            location_id: locationID,
                            distance: distance,
                            categories: categories.join(',')
                        },
                        method: "GET"
                    };
                }
            })
        };
    }
});

export const { useFetchDestinationsQuery, useGetDestinationQuery, useGetClosestDestinationsQuery } = destinationsApi;