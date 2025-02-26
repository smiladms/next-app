"use client"

import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./slices/cartSlice";
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, cartReducer)

export const store = configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
    reducer: {
        shoppingCart: persistedReducer
    }
})

export const persistor = persistStore(store)