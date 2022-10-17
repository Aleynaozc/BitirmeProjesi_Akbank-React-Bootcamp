import { createSlice } from "@reduxjs/toolkit";
import { authCreateToken, userRegister } from "./createToken";



const authStore = createSlice({
  name: "auth",
  initialState: {
    isLoading:false,
    user:undefined,
    error:null,
  },
  reducers: {},
  extraReducers: {
    [authCreateToken.fulfilled]: (state,action) => {
      state.isLoading = true;
      state.user=action.payload;
     
    },
    [authCreateToken.rejected]: (state,action) => {
      state.isLoading = false;
      state.user=undefined;
      state.error=action.error.message;

    },

    [userRegister.fulfilled]: (state) => {
      state.isLoading = true;
    },
    [userRegister.rejected]: (state,action) => {
      state.isLoading = false;
      state.error=action.error.message;
     
    }
   
  },
});

export default authStore.reducer;