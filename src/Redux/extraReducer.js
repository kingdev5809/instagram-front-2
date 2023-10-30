import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const backendLink = "http://localhost:5000";
export const API = axios.create({
  baseURL: backendLink,
});
//https://insta-clone-server-full.onrender.com

export const getAllPosts = createAsyncThunk("getAllPosts", async () => {
  const response = await API.get("post/all");
  return response.data;
});

export const AddNewPostApi = createAsyncThunk("AddNewPostApi", async (data) => {
  const response = await API.post("post/add", data);
  return response.data;
});

export const EditUserApi = createAsyncThunk("EditUserApi", async (data) => {
  const response = await API.post(`user/edit`, data);
  return response.data;
});

export const DeleteThePost = createAsyncThunk("DeleteThePost", async (id) => {
  const response = await API.delete(`post/${id}`);
});

export const AddComment = createAsyncThunk("AddComment", async (data) => {
  const response = await API.post("comment", data);
  return response.data;
});

export const GetAllCommentsApi = createAsyncThunk(
  "GetAllCommentsApi",
  async (id) => {
    const response = await API.get(`comment/${id}`);
    return response.data;
  }
);

export const RegisterUser = createAsyncThunk("RegisterUser", async (data) => {
  const response = await API.post("user/register", data);
  return response.data;
});

export const LoginUser = createAsyncThunk("LoginUser", async (data) => {
  const response = await API.post("user/login", data);
  return response.data;
});

export const LikeThePostApi = createAsyncThunk(
  "LikeThePostApi",
  async (data) => {
    const response = await API.post("post/like", data);
    return response.data;
  }
);
export const OneUserGetPostsAPi = createAsyncThunk(
  "OneUserGetPostsAPi",
  async (id) => {
    const response = await API.get(`post/user/${id}`);
    return response.data;
  }
);
export const DeletePost = createAsyncThunk("DeletePost", async (id) => {
  const response = await API.post(`post/delete/${id}`);
  return response.data;
});

export const GetAllUsersApi = createAsyncThunk(
  "GetAllUsersApi-get",
  async () => {
    const response = await API.get("user/all");
    return response.data;
  }
);
export const OneUserGetApi = createAsyncThunk("OneUserGetApi", async (id) => {
  const response = await API.get(`user/${id}`);
  return response.data;
});

export const FollowUserApi = createAsyncThunk("follow", async (data) => {
  const response = await API.post("user/follow", data);
  return response.data;
});
