import { createApi } from '@reduxjs/toolkit/query/react'
import { rtkBaseQuery } from './rtkBaseQuery'

// debugger
// initialize an empty api service that we'll inject endpoints into later as needed
export const emptyApi = createApi({
    baseQuery: rtkBaseQuery,
    endpoints: () => ({}),
})

export const RTK_TAGS = {
    GET_PORTFOLIO_DETAILS: 'GET_PORTFOLIO_DETAILS',
    GET_DASHBOARD: 'GET_DASHBOARD',

    GET_USER_SETTINGS: 'GET_USER_SETTINGS',

    GET_CONTACT_US: 'GET_CONTACT_US',
    GET_LOGIN: 'GET_LOGIN',
    GET_TECHNOLOGY: 'GET_TECHNOLOGY',
    GET_PROJECT: 'GET_PROJECT',
    GET_MESSAGE: 'GET_MESSAGE',
}

export const emptySplitApi = emptyApi.enhanceEndpoints({
    addTagTypes: Object.values(RTK_TAGS),
})
