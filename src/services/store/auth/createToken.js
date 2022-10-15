import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const authCreateToken = createAsyncThunk(
  "auth/login",
  async (loginModel) => {
    const {data} = await axios.post("http://localhost:80/auth/login", loginModel
    );
    console.log(data)
     if(data.token){
      localStorage.setItem("token",JSON.stringify(data.token))
   
     }
    return data;
  }
);
export const userRegister = createAsyncThunk(
  "auth/userRegister",
  async (registerModel) => {
    const {data} = await axios.post("http://localhost:80/auth/register", registerModel
    );
    console.log(data)
     if(data.token){
      localStorage.setItem("token",JSON.stringify(data.token))
     }
    return data;
  }
);