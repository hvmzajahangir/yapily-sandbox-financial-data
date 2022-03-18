import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState = {
  institution: {
    id: "",
    name: "",
  },
};

export const institutionSlice = createSlice({
  name: "selectedInstitution",
  initialState,
  reducers: {
    setSelectedInstitution: (
      state,
      action: PayloadAction<{ [key: string]: string }>
    ) => {
      state.institution = { ...state.institution, ...action.payload };
    },
  },
});

export const { setSelectedInstitution } = institutionSlice.actions;

export const selectSelectedInstitution = (state: RootState) => {
  return state.selectedInstitution.institution;
};

export default institutionSlice.reducer;
