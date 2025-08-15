import { API_BASE_URL } from '@/constants/domain'
import { fetchBaseQuery } from '@reduxjs/toolkit/query'

export const rtkBaseQuery = fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers, { getState, endpoint }) => {
        headers.set('Accept', 'application/json')
        let reduxToken = (getState() as any)?.user?.value?.token

        if (reduxToken) {
            headers.set('Authorization', `Bearer ${reduxToken}`)
        }

        return headers
    },
})
