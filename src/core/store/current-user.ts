import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

type CurrentUser = {
  firstName: string;
  lastName: string;
  id: string;
  role: string;
  email: string;
};

export interface CurrentUserState {
  data: CurrentUser | null;
  isInitialLoaded: boolean;
}

const initialState: CurrentUserState = {
  data: null,
  isInitialLoaded: false,
};

export const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = {
        id: action.payload.id,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        role: action.payload.role,
      };
      state.isInitialLoaded = true;
    },
  },
});

export const { setData } = currentUserSlice.actions;

export const selectCurrentUser = (state: RootState) => state.currentUser.data;

export const selectIsInitialLoaded = (state: RootState) => state.currentUser.isInitialLoaded;

export default currentUserSlice.reducer;
