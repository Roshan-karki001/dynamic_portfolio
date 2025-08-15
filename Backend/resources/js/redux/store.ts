// store.ts
import { configureStore } from '@reduxjs/toolkit'
import { logoutReduxUser, persistedUserReducer } from './slices/userSlice'
import { emptySplitApi } from '@/services/emptySplitApi'
import { isRejectedWithValue } from '@reduxjs/toolkit'
import { persistStore } from 'redux-persist'
import type { Persistor } from 'redux-persist/es/types'

const isServer = typeof window === 'undefined'

export const unauthenticatedMiddleware =
    ({ dispatch }) =>
    (next) =>
    (action) => {
        if (isRejectedWithValue(action) && action.payload.status === 401) {
            dispatch(logoutReduxUser())
        }
        return next(action)
    }

export const store = configureStore({
    reducer: {
        user: persistedUserReducer,
        [emptySplitApi.reducerPath]: emptySplitApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat([emptySplitApi.middleware, unauthenticatedMiddleware]),
})

export const initializePersistor = (): Promise<Persistor> => {
    if (!isServer) {
        return Promise.resolve(persistStore(store))
    }
    return Promise.reject(new Error('Cannot initialize persistor on the server'))
}
