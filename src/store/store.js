import rootReducer from "./root";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistReducer, persistStore } from "redux-persist";
import { api } from "../Api/rtkApi";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  devTools: false,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableStateInvariant: false,
    }).concat(api.middleware), // NOTE this addition
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
setupListeners(store.dispatch); // NOTE this addition

export default store;
