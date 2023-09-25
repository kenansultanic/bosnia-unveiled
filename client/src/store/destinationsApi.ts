import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const destinationsApi = createApi({
    reducerPath: "destinationsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000" }),
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
                query: (destId: string) => {
                    return {
                        url: `/destination/${destId}/`,
                        method: "GET"
                    };
                }
            }),
            getClosestDestinations: builder.query({
                query: ({ destId, distance, categories }) => {
                    // MODIFY
                    const categoriesStr = JSON.stringify(categories);

                    return {
                        url: "/destinations/closest",
                        params: {
                            location_id: destId,
                            distance: distance,
                            categories: categoriesStr
                        },
                        method: "GET"
                    };
                }
            })
        };
    }
});

export const { useFetchDestinationsQuery, useGetDestinationQuery } = destinationsApi;