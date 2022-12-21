import { configureStore } from "@reduxjs/toolkit";

import currentUserReducer from "./current-user";
import chatReducer from "./chat";

export const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
    chat: chatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
