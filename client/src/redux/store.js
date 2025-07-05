import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlica';
import courseSlice from './courseSlice';
import lectureSlice from './lectureSlice';


import {
   persistReducer,
   FLUSH,
   REHYDRATE,
   PAUSE,
   PERSIST,
   PURGE,
   REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'

const persistConfig = {
   key: 'root',
   version: 1,
   storage,
}
const rootReducer = combineReducers({
  auth:authSlice,
  course:courseSlice,
  lecture:lectureSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
   reducer: persistedReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: {
            ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER ]
         },
      })
})

// const store = configureStore({
//    reducer:{
//       auth:authSlice
//    } 
// })

export default store;