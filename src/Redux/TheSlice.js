import { createSlice } from "@reduxjs/toolkit";
import {
  AddNewPostApi,
  DeleteThePost,
  AddComment,
  getAllPosts,
  GetAllCommentsApi,
  RegisterUser,
  LoginUser,
  OneUserGetPostsAPi,
  GetAllUsersApi,
  OneUserGetApi,
} from "./extraReducer";

const initialState = {
  load: false,
  contents: [],
  reviewLoader: false,
  oneUser: [],
  reviewAdd: false,
  error: "",
  appUser: {},
  postTheUsers: [],
  Comments: [],
  allUsers: [],
  userload: false,
};
const InstaSlice = createSlice({
  name: "slice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPosts.pending, (state) => {
        state.load = true;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.contents = action.payload;
        state.load = false;
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(GetAllUsersApi.pending, (state) => {
        state.load = true;
      })
      .addCase(GetAllUsersApi.fulfilled, (state, action) => {
        state.allUsers = action.payload;
        state.load = false;
      })
      .addCase(GetAllUsersApi.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(AddNewPostApi.pending, (state) => {
        state.load = true;
      })
      .addCase(AddNewPostApi.fulfilled, (state, action) => {
        state.load = false;
      })
      .addCase(AddNewPostApi.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(DeleteThePost.pending, (state) => {
        state.load = true;
      })
      .addCase(DeleteThePost.fulfilled, (state, action) => {
        state.load = false;
      })
      .addCase(DeleteThePost.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(GetAllCommentsApi.pending, (state) => {
        state.reviewLoader = true;
      })
      .addCase(GetAllCommentsApi.fulfilled, (state, action) => {
        state.Comments = action.payload;
        state.reviewLoader = false;
      })
      .addCase(GetAllCommentsApi.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(AddComment.pending, (state) => {
        state.reviewLoader = true;
      })
      .addCase(AddComment.fulfilled, (state, action) => {
        state.reviewLoader = false;
        state.reviewAdd = !state.reviewAdd;
      })
      .addCase(AddComment.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(RegisterUser.pending, (state) => {
        state.load = true;
      })
      .addCase(RegisterUser.fulfilled, (state, action) => {
        state.load = false;
        const { status, msg, user, folowingUsers } = action.payload;

        if (status) {
          state.appUser = user;
          localStorage.setItem("appUser", JSON.stringify(user));
          localStorage.setItem("follow", JSON.stringify(user.folowingUsers));
        } else {
          state.error = msg;
        }
      })
      .addCase(RegisterUser.rejected, (state, action) => {
        state.error = action.payload;
        state.load = false;
      })
      .addCase(LoginUser.pending, (state) => {
        state.load = true;
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        state.load = false;
        state.load = false;
        const { status, msg, user, folowingUsers } = action.payload;
        if (status) {
          state.appUser = user;
          localStorage.setItem("appUser", JSON.stringify(user));
          localStorage.setItem("follow", JSON.stringify(user.folowingUsers));
        } else {
          state.error = msg;
        }
      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.error = action.payload;
        state.load = false;
      })
      .addCase(OneUserGetPostsAPi.pending, (state) => {
        state.load = true;
      })
      .addCase(OneUserGetPostsAPi.fulfilled, (state, action) => {
        state.load = false;
        state.postTheUsers = action.payload;
      })
      .addCase(OneUserGetPostsAPi.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(OneUserGetApi.pending, (state) => {
        state.userload = true;
      })
      .addCase(OneUserGetApi.fulfilled, (state, action) => {
        state.userload = false;
        state.oneUser = action.payload;
      })
      .addCase(OneUserGetApi.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default InstaSlice.reducer;
