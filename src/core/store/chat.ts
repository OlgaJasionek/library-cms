import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface chatState {
  unreadMessagesCount: number;
}

const initialState: chatState = {
  unreadMessagesCount: 0,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setUnreadMessagesCount: (state, action) => {
      state.unreadMessagesCount = action.payload;
    },
    decreaseUnreadMessagesCount: (state, action) => {
      state.unreadMessagesCount = state.unreadMessagesCount - action.payload;
    },
  },
});

export const { setUnreadMessagesCount, decreaseUnreadMessagesCount } = chatSlice.actions;

export const selectUnreadMessagesNumber = (state: RootState) => state.chat;

export default chatSlice.reducer;
