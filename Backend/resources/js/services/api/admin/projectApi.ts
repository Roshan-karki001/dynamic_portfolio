import { RTK_TAGS, emptySplitApi } from '@/services/emptySplitApi'

export const projectApi = emptySplitApi.injectEndpoints({
    endpoints: (builder) => ({
        getProjects: builder.query<Project[], void>({
            query: () => ({
                url: `admin/projects`,
            }),
            transformResponse: (response: ApiResponse) => {
                let projects = response.data as Project[]
                return projects
            },
            providesTags: [RTK_TAGS.GET_PROJECT],
        }),
        getProject: builder.query<Project, string | number | undefined>({
            query: (id) => ({
                url: `admin/projects/${id}`,
            }),
            transformResponse: (response: ApiResponse) => {
                return response.data as Project
            },
            providesTags: [RTK_TAGS.GET_PROJECT],
        }),
        storeProject: builder.mutation({
            query: (data) => ({
                url: 'admin/projects',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: [RTK_TAGS.GET_PROJECT],
            /* after updating Project, invalidate cached data of GET_PROJECT and refetch GET_PROJECT */
        }),
        updateProject: builder.mutation({
            query: ({ id, data }) => ({
                url: `admin/projects/${id}`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: [RTK_TAGS.GET_PROJECT],
            /* after updating Project, invalidate cached data of GET_PROJECT and refetch GET_PROJECT */
        }),
        deleteProject: builder.mutation({
            query: ({ id }) => ({
                url: `admin/projects/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [RTK_TAGS.GET_PROJECT],
        }),
    }),
})

export const {
    useGetProjectsQuery,
    useGetProjectQuery,
    useStoreProjectMutation,
    useUpdateProjectMutation,
    useDeleteProjectMutation,
} = projectApi
