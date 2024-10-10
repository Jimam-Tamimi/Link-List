import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import authReducer from './slices/authSlice';
import { combineReducers } from 'redux';
import cookieStorage from '@/helpers/cookieStorage';

// Custom cookie storage implementation


// Persist configuration
const persistConfig = {
  key: 'root',
  storage: cookieStorage,
  whitelist: ['auth'], // Only persist auth slice
};

const rootReducer = combineReducers({
  auth: authReducer,
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable to prevent issues with non-serializable values
    }),
});

// Create persistor
export const persistor = persistStore(store);

// Custom hook to dispatch actions with types
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Redux store type
export type RootState = ReturnType<typeof store.getState>;
