import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import clients, { thunkHandler } from "../../services/api";

import { toast } from "react-toastify";

const initialState = {
    status: "idle",
    user: null,
  };
  
  export const login = createAsyncThunk("auth/login", ({ data }, thunkAPI) => {  
    const response = thunkHandler(
      clients.default.client({
        method: "POST",
        url: "/auth/login",
        data,
      }),
      thunkAPI
    );
    return response;
  });
  
  
  export const me = createAsyncThunk("auth/me", (_, thunkAPI) => {  
    clients.default.client.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem('accessToken')}`;
    const response = thunkHandler(
      clients.default.client({
        method: "GET",
        url: "/auth/me"
      }),
      thunkAPI
    );
    return response;
  });
  
  export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      logout: (state) => {
        state.user = null;
        localStorage.clear();
        delete clients.default.client.defaults.headers.common["Authorization"];
      },
    },
    extraReducers: {
        [login.pending]: (state) => {
          state.status = "loading";
        },
        [login.fulfilled]: (state, action) => {
          const user = action.payload.data;
          state.status = "succeeded";
          state.user = user;
          localStorage.setItem("accessToken", user.accessToken);
          localStorage.setItem("user", JSON.stringify(user));
          toast.success('Logged in successfully');
          clients.default.client.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${user.accessToken}`;
        },
        [login.rejected]: (state, action) => {
          state.status = "failed";
          toast.error(action.payload.data.message);
        },
        [me.pending]: (state) => {
          state.status = "loading";
        },
        [me.fulfilled]: (state, action) => {
          const user = action.payload.data;
          state.status = "succeeded";
          state.user = user;
          user.accessToken = localStorage.getItem('accessToken');
        },
        [me.rejected]: (state, action) => {
          state.status = "failed";
          toast.error(action.payload.data.message);
        },
    },
  });
  
  
  export const { logout } = authSlice.actions;
  export default authSlice.reducer;