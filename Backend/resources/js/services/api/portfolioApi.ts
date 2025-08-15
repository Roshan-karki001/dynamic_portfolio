import { RTK_TAGS, emptySplitApi } from '@/services/emptySplitApi'

export const portfolioApi = emptySplitApi.injectEndpoints({
    endpoints: (builder) => ({
        getUserDetails: builder.query<User, void>({
            query: () => ({
                url: `user-details`,
            }),
            transformResponse: (response: ApiResponse) => {
                return response.data as User
            },
            providesTags: [RTK_TAGS.GET_PORTFOLIO_DETAILS],
        }),
        getTechnologies: builder.query<Technology[], void>({
            query: () => ({
                url: `technologies`,
            }),
            transformResponse: (response: ApiResponse) => {
                return response.data as Technology[]
            },
            providesTags: [RTK_TAGS.GET_PORTFOLIO_DETAILS],
        }),
        getProjects: builder.query<Project[], void>({
            query: () => ({
                url: `projects`,
            }),
            transformResponse: (response: ApiResponse) => {
                return response.data as Project[]
            },
            providesTags: [RTK_TAGS.GET_PORTFOLIO_DETAILS],
        }),
        storeMessage: builder.mutation({
            query: (data) => ({
                url: 'message',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: [RTK_TAGS.GET_PORTFOLIO_DETAILS],
        }),
    }),
})

export const { useGetUserDetailsQuery, useGetTechnologiesQuery, useGetProjectsQuery, useStoreMessageMutation } =
    portfolioApi
