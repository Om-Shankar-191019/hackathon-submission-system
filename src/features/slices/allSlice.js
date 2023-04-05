import { createSlice } from "@reduxjs/toolkit";

export const allSlice = createSlice({
  name: "all",
  initialState: {
    items: [],
  },
  reducers: {
    addItem(state, action) {
      state.items.push(action.payload);
    },

    updateItem : (state, action) => {
      const id = action.payload.id
      const index = state.items.findIndex(item => item.id === id)
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload }
      }
    },

    removeItem(state, action){
      const id = action.payload
      state.items = state.items.filter(item => item.id !== id)
    },


  },
});

export const { addItem, updateItem , removeItem} = allSlice.actions;
export default allSlice.reducer;
