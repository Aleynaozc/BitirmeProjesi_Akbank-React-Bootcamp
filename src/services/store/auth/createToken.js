import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const authCreateToken = createAsyncThunk(
  "auth/login",
  async (loginModel) => {
    const {data} = await axios.post("auth/login", loginModel);
    return data;
  }
);
