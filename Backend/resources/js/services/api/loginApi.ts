import { RTK_TAGS, emptySplitApi } from '@/services/emptySplitApi'

export const loginApi = emptySplitApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: 'login',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: [RTK_TAGS.GET_LOGIN],
            /* after updating category, invalidate cached data of GET_LOGIN and refetch GET_LOGIN */
        }),
    }),
})

export const { useLoginMutation } = loginApi
