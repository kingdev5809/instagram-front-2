import Loader from "../../../Components/Loader/Loader";
import React from "react";
import "./Posts.scss";
import PostItem from "./PostItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllPosts } from "../../../Redux/extraReducer";
function PostsSide() {
  const dispatch = useDispatch();
  const { contents,  load } = useSelector((state) => state.Slice);
  useEffect(() => {
    dispatch(getAllPosts());
  }, []);
  return (
    <div className="content-post">
      {!load ? (
        <div>
          {contents.map((post) => (
            <PostItem key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default PostsSide;
