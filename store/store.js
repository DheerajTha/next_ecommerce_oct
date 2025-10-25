import { combineReducers, configureStore } from '@reduxjs/toolkit'
import persistReducer from 'redux-persist/es/persistReducer'
import persistStore from 'redux-persist/es/persistStore'
import localStorage from 'redux-persist/es/storage'

const rootRducer = combineReducers({
    
})

const persistConfig = {
    key: 'root',
    storage:localStorage
}

const persistedReducer = persistReducer(persistConfig, rootRducer)

export const store = configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware)=> 
    getDefaultMiddleware({serializableCheck:false})
})

export const persistor = persistStore(store)