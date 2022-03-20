import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
  token: "",
};

export const consentSlice = createSlice({
  name: "consent",
  initialState,
  reducers: {
    setConsentToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export const { setConsentToken } = consentSlice.actions;

export const selectConsentToken = (state: RootState) => {
  return state.consent.token;
};

export default consentSlice.reducer;
