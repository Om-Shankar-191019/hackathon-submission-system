import { createSlice } from "@reduxjs/toolkit";

export const navigationSlice = createSlice({
  name: "navigationData",
  initialState: {
    activeSubmission: "All Submissions",
    searchTerm: null,
    currentDropdown: "Newest",
    activeDetailId:null
  },
  reducers: {
    submissionUpdate(state, action) {
      state.activeSubmission = action.payload;
    },
    searchUpdate(state, action) {
      state.searchTerm = action.payload;
    },

    dropdownUpdate(state, action) {
      state.currentDropdown = action.payload;
    },
    detailsUpdate(state, action) {
      state.activeDetailId = action.payload;
    },
  },
});

export const { submissionUpdate,searchUpdate,dropdownUpdate, detailsUpdate } = navigationSlice.actions;
export default navigationSlice.reducer;
