import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
  error: null,
  loading: false,
  status:false
};

export const counterSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signinStart: (state) => {
      state.loading = true;
    },
    signinSuccess: (state, action) => {
      state.loading = false;
      state.status = true;
      state.userData = action.payload;
      state.error = null;
    },
    signinFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.status = false;
      state.userData = null;
    },
    signupStart: (state) => {
      state.loading = true;
    },
    signupSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    signupFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    LogoutStart: (state) => {
      state.loading = true;
    },
    LogoutSuccess: (state) => {
      state.loading = false;
      state.error = null;
      state.userData = null;
      state.status = false;
    },
    LogoutFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateStart:(state)=>{
      state.loading = true;
    },
    updateSuccess:(state,action)=>{
      state.loading = false;
      state.status = true;
      state.userData = action.payload;
      state.error = null;
    },
    updateFailure:(state,action)=>{
      state.loading = false;
      state.status = true;
      state.error = action.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const { 
    signinFailure,
    signinSuccess,
    signinStart,
    signupFailure,
    signupSuccess,
    signupStart,
    LogoutFailure,
    LogoutStart,
    LogoutSuccess,
    updateFailure,
    updateStart,
    updateSuccess
 } = counterSlice.actions;

export default counterSlice.reducer;
