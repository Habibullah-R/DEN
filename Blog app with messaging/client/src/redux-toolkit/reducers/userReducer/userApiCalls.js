import { createAsyncThunk } from "@reduxjs/toolkit";
import { setItems } from '../../../utills/localStorage';
import { toast } from 'react-toastify';
import { getToken } from "../../../utills/localStorage";

const token = getToken();

export const signInUser = createAsyncThunk(
    'user/signInUser',
    async ({email,password},thunkAPI) => {
      try {
        const response = await fetch("/api/v1/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });
        const data = await response.json();
        if(data.success === false){
            throw new Error(data.message);
        }
        setItems(data.data.token);
        toast(data.message);
        return data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    },
  )


  export const logoutUser = createAsyncThunk(
    "/api/logoutUser",
    async(thunkAPI)=>{
          try {
      const response = await fetch("/api/v1/user/logout", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.success === false) {
        throw new Error(data.message)
      }
      localStorage.clear();
      toast(data.message);
      return;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
    }
  )


  export const registerUser = createAsyncThunk(
    "api/registerUser",
    async ({username , email , password},thunkAPI)=>{
    try {
      const response = await fetch("/api/v1/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });
      const data = await response.json();
      if (data.success === false) {
        throw new Error(data.message);
      }
      toast(data.message);
      return;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
    }
  ) 



export const avatarChange = createAsyncThunk(
    "/api/updateAvater",
    async(avatar)=>{
          try {

      const formData = new FormData();
      formData.append("avatar", avatar);

      const response = await fetch("/api/v1/user/updateavatar", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await response.json();
      if (data.success === false) {
        throw new Error(data.message);
      }
      toast(data.message)
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    }
  )

  export const credentialsUpdate = createAsyncThunk(
    "api/credentialsUpdate",
    async({username , email},thunkAPI)=>{
    try {
      const response = await fetch("/api/v1/user/updatedetails", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username,
          email,
        }),
      });
      const data = await response.json();
      if (data.success === false) {
        throw new Error(data.message);
      }
      toast(data.message)
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
    }
  )