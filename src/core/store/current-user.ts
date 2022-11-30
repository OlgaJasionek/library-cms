import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface CurrentUserState {
  firstName: string | null;
  lastName: string | null;
  id: string | null;
  role: string | null;
  email: string | null;
}

const initialState: CurrentUserState = {
  firstName: null,
  lastName: null,
  id: null,
  role: null,
  email: null,
};

export const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.id = action.payload.id;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.role = action.payload.role;
    },
  },
});

export const { setData } = currentUserSlice.actions;

export const selectCurrentUser = (state: RootState) => state.currentUser;

export default currentUserSlice.reducer;
