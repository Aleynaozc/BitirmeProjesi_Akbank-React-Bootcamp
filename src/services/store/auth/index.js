import { createSlice } from "@reduxjs/toolkit";
import { authCreateToken } from "./createToken";



const authStore = createSlice({
  name: "auth",
  initialState: {
    isLoading:false,
    token:undefined,
    error:null,
  },
  reducers: {},
  extraReducers: {
    [authCreateToken.fulfilled]: (state,action) => {
      state.isLoading = true;
      state.token=action.payload.token;
     
    },
    [authCreateToken.rejected]: (state,action) => {
      state.isLoading = false;
      state.token=undefined;
      state.error=action.error.message;

    },

   
  },
});

export default authStore.reducer;