import { createSlice } from '@reduxjs/toolkit';
import { signInUser , logoutUser , registerUser , avatarChange , credentialsUpdate } from './userApiCalls';


const initialState = {
  userData: null,
  error: null,
  loading: false,
  status:false
};


// Then, handle actions in your reducers:
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
    .addCase(signInUser.pending, (state) => {
      state.loading = true;
    })
    .addCase(signInUser.fulfilled,(state,action)=>{
      state.loading = false;
      state.status = true;
      state.userData = action.payload;
      state.error = null;
    })
    .addCase(signInUser.rejected,(state,action)=>{
      state.loading = false;
      state.error = action.payload;
      state.status = false;
      state.userData = null;
    })
    .addCase(logoutUser.pending,(state)=>{
      state.loading = true;
    })
    .addCase(logoutUser.fulfilled,(state)=>{
      state.loading = false;
      state.userData = null;
      state.error = null;
      state.status = false;
    })
    .addCase(logoutUser.rejected,(state,action)=>{
      state.loading = false;
      state.error = action.payload;
      state.status = false;
    })
    .addCase(registerUser.pending, (state) => {
      state.loading = true;
    })
    .addCase(registerUser.fulfilled,(state)=>{
      state.loading = false;
      state.error = null;
    })
    .addCase(registerUser.rejected,(state,action)=>{
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(avatarChange.pending, (state) => {
      state.loading = true;
    })
    .addCase(avatarChange.fulfilled,(state , action)=>{
      state.loading = false;
      state.userData = action.payload;
      state.error = null;
      state.status = true;
    })
    .addCase(avatarChange.rejected,(state,action)=>{
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(credentialsUpdate.pending, (state) => {
      state.loading = true;
    })
    .addCase(credentialsUpdate.fulfilled,(state , action)=>{
      state.loading = false;
      state.userData = action.payload;
      state.error = null;
      state.status = true;
    })
    .addCase(credentialsUpdate.rejected,(state,action)=>{
      state.loading = false;
      state.error = action.payload;
    })
  },
})

export default userSlice.reducer
