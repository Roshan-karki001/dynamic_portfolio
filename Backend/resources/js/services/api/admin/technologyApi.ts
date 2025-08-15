import { RTK_TAGS, emptySplitApi } from '@/services/emptySplitApi'

export const technologyApi = emptySplitApi.injectEndpoints({
    endpoints: (builder) => ({
        getTechnologies: builder.query<Technology[], void>({
            query: () => ({
                url: `admin/technologies`,
            }),
            transformResponse: (response: ApiResponse) => {
                let technologies = response.data as Technology[]
                return technologies
            },
            providesTags: [RTK_TAGS.GET_TECHNOLOGY],
        }),
        getTechnology: builder.query<Technology, string | number | undefined>({
            query: (id) => ({
                url: `admin/technologies/${id}`,
            }),
            transformResponse: (response: ApiResponse) => {
                return response.data as Technology
            },
            providesTags: [RTK_TAGS.GET_TECHNOLOGY],
        }),
        storeTechnology: builder.mutation({
            query: (data) => ({
                url: 'admin/technologies',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: [RTK_TAGS.GET_TECHNOLOGY],
            /* after updating Technology, invalidate cached data of GET_TECHNOLOGY and refetch GET_TECHNOLOGY */
        }),
        updateTechnology: builder.mutation({
            query: ({ id, data }) => ({
                url: `admin/technologies/${id}`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: [RTK_TAGS.GET_TECHNOLOGY],
            /* after updating Technology, invalidate cached data of GET_TECHNOLOGY and refetch GET_TECHNOLOGY */
        }),
        deleteTechnology: builder.mutation({
            query: ({ id }) => ({
                url: `admin/technologies/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [RTK_TAGS.GET_TECHNOLOGY],
        }),
    }),
})

export const {
    useGetTechnologiesQuery,
    useGetTechnologyQuery,
    useStoreTechnologyMutation,
    useUpdateTechnologyMutation,
    useDeleteTechnologyMutation,
} = technologyApi
