import { createSlice } from "@reduxjs/toolkit";



export const favouriteSlice = createSlice({
  name: "favourite",
  initialState: {
    favItems:[]
    
  },
  reducers: {
    addFavItem(state, action) {
     
        state.favItems.push(action.payload);
      },
      removeFavItem(state, action){
        const id = action.payload
        state.favItems = state.favItems.filter(item => item.id !== id)
      },
      updateFavItem : (state, action) => {
        const id = action.payload.id
        const index = state.favItems.findIndex(item => item.id === id)
        if (index !== -1) {
          state.favItems[index] = { ...state.favItems[index], ...action.payload }
        }
      },
    },
    


   
  
});

export const { addFavItem, removeFavItem, updateFavItem } = favouriteSlice.actions;
export default favouriteSlice.reducer;
