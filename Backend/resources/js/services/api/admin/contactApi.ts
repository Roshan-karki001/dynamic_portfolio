import { RTK_TAGS, emptySplitApi } from '@/services/emptySplitApi'

export const contactApi = emptySplitApi.injectEndpoints({
    endpoints: (builder) => ({
        getMessages: builder.query<Message[], void>({
            query: () => ({
                url: `admin/messages`,
            }),
            transformResponse: (response: ApiResponse) => {
                let messages = response.data as Message[]
                return messages
            },
            providesTags: [RTK_TAGS.GET_MESSAGE],
        }),

        deleteMessage: builder.mutation({
            query: ({ id }) => ({
                url: `admin/messages/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [RTK_TAGS.GET_MESSAGE],
        }),
    }),
})

export const { useGetMessagesQuery, useDeleteMessageMutation } = contactApi
