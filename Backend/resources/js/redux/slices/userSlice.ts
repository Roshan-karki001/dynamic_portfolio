import { createSlice } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import { store } from '../store'
import { emptySplitApi } from '@/services/emptySplitApi'
import storage from 'redux-persist/lib/storage'

const isServer = typeof window === 'undefined'

// Fallback storage for server-side with asynchronous methods
const createNoopStorage = () => ({
    getItem(_key: any): Promise<string | null> {
        return Promise.resolve(null) // Mimic async behavior
    },
    setItem(_key: any, value: any): Promise<any> {
        return Promise.resolve(value) // Mimic async behavior
    },
    removeItem(_key: any): Promise<void> {
        return Promise.resolve() // Mimic async behavior
    },
})

// Use storage for client-side
const storageToUse = isServer ? createNoopStorage() : storage

// Initial state for the user slice
const initialState = {
    value: null,
}

// User slice with reducers
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setReduxUser: (state, action) => {
            state.value = action.payload
        },
        logoutReduxUser: (state) => {
            state.value = null
            // Reset all query caches
            store.dispatch(emptySplitApi.util.resetApiState())
        },
    },
})

export const { setReduxUser, logoutReduxUser } = userSlice.actions

// Persist configuration
const persistConfig = {
    key: 'root',
    storage: storageToUse, // Now this is a synchronous storage object, not a promise
}

export const persistedUserReducer = persistReducer(persistConfig, userSlice.reducer)
