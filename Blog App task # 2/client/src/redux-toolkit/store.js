import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userSlice'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import {thunk} from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducers = combineReducers({
  user:userReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducers)

export const store = configureStore({
  reducer: persistedReducer,
   middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store)