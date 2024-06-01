import io from "socket.io-client";
import { apiSlice } from "../api/apiSlice";

export const messagesApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMessages: builder.query({
            query: (id) =>
                `/messages?conversationId=${id}&_sort=timestamp&_order=desc&_page=1&_limit=${import.meta.env.VITE_APP_MESSAGES_PER_PAGE}`,

            transformResponse(apiResponse, meta) {
                const totalCount = meta.response.headers.get("X-Total-Count");
                return {
                    data: apiResponse,
                    totalCount,
                };
            },

            async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
                // create socket
                const socket = io(import.meta.env.VITE_APP_URL, {
                    reconnectionDelay: 1000,
                    reconnection: true,
                    reconnectionAttemps: 10,
                    transports: ["websocket"],
                    agent: false,
                    upgrade: false,
                    rejectUnauthorized: false,
                });

                try {
                    await cacheDataLoaded;
                    socket.on("messages", (data) => {
                        updateCachedData((draft) => {
                            const messages = draft.data.find(
                                (c) => c.conversationId == data?.data?.conversationId
                            );

                            if (messages?.conversationId) {
                                draft.data.unshift(data?.data)
                            }
                        })
                    });
                } catch (err) {
                    console.log(err)
                }

                await cacheEntryRemoved;
                socket.close();
            },
        }),

        getMoreMessages: builder.query({
            query: ({ id, page }) =>
                `/messages?conversationId=${id}&_sort=timestamp&_order=desc&_page=${page}&_limit=${import.meta.env.VITE_APP_MESSAGES_PER_PAGE}`,

            async onQueryStarted({ id }, { queryFulfilled, dispatch }) {
                try {
                    const messages = await queryFulfilled;
                    if (messages?.data?.length > 0) {
                        // update conversation cache pessimistically start
                        dispatch(
                            messagesApi.util.updateQueryData(
                                "getMessages",
                                id,
                                (draft) => {
                                    return {
                                        data: [
                                            ...draft.data,
                                            ...messages.data,
                                        ],
                                        totalCount: Number(draft.totalCount),
                                    };
                                }
                            )
                        );
                        // update messages cache pessimistically end
                    }
                } catch (err) { }
            },
        }),

        addMessage: builder.mutation({
            query: (data) => ({
                url: "/messages",
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const { useGetMessagesQuery, useAddMessageMutation } = messagesApi;