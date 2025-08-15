import { RTK_TAGS, emptySplitApi } from '@/services/emptySplitApi'

export const userSettingApi = emptySplitApi.injectEndpoints({
    endpoints: (builder) => ({
        getUserSetting: builder.query<UserSetting, void>({
            query: () => ({
                url: `admin/user/info`,
            }),
            transformResponse: (response: ApiResponse) => {
                return response.data as UserSetting
            },
            providesTags: [RTK_TAGS.GET_USER_SETTINGS],
        }),
        updatePersonalInformation: builder.mutation({
            query: (data) => ({
                url: 'admin/user/update-personal-info',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: [RTK_TAGS.GET_USER_SETTINGS],
        }),
        updatePassword: builder.mutation({
            query: (data) => ({
                url: 'admin/user/update-password',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: [RTK_TAGS.GET_USER_SETTINGS],
        }),
        updateProfilePicture: builder.mutation({
            query: (data) => ({
                url: 'admin/user/upload-photo',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: [RTK_TAGS.GET_USER_SETTINGS],
        }),
        updateSocialLink: builder.mutation({
            query: (data) => ({
                url: 'admin/user/update-social-links',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: [RTK_TAGS.GET_USER_SETTINGS],
        }),
    }),
})

export const {
    useGetUserSettingQuery,
    useUpdatePersonalInformationMutation,
    useUpdatePasswordMutation,
    useUpdateProfilePictureMutation,
    useUpdateSocialLinkMutation,
} = userSettingApi
