import React from "react";
import { defaultUser } from "../../assets/photos";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { OneUserGetApi, OneUserGetPostsAPi } from "../../Redux/extraReducer";
import { useParams } from "react-router";

function PublicProfile() {
  const { postTheUsers, oneUser } = useSelector((state) => state.Slice);
  const dispatch = useDispatch();
  const params = useParams();
  const id = params.id;
  useEffect(() => {
    dispatch(OneUserGetApi(id));
    dispatch(OneUserGetPostsAPi(id));
  }, [id]);

  return (
    <div>
      <div className="the-page-prufle">
        <header>
          <div className="container">
            <div className="prufle">
              <div className="prufle-image">
                <img src={defaultUser} alt="" />
              </div>

              <div className="prufle-user-settings">
                <h1 className="prufle-user-name">{oneUser?.name}</h1>

                <button
                  className="btn prufle-settings-btn"
                  aria-label="prufle settings"
                >
                  <i className="fas fa-cog" aria-hidden="true"></i>
                </button>
              </div>

              <div className="prufle-stats">
                <ul>
                  <li>
                    <span className="prufle-stat-count">
                      {postTheUsers.length}
                    </span>{" "}
                    content-post
                  </li>
                  <li>
                    <span className="prufle-stat-count">0</span> followers
                  </li>
                  <li>
                    <span className="prufle-stat-count">
                      {oneUser?.folowingUsers?.length}
                    </span>{" "}
                    following
                  </li>
                </ul>
              </div>

              <div className="prufle-bio">
                <p>
                  <span className="prufle-real-name">{oneUser?.fullName}</span>
                </p>
              </div>
            </div>
          </div>
        </header>

        <main>
          <div className="container">
            <div className="profile-content-post">
              {postTheUsers?.length === 0 ? (
                <div>
                  <h1>This user have not any content-post</h1>
                </div>
              ) : (
                ""
              )}
              {postTheUsers?.map((post) => (
                <div className="content-post-item-profile" tabIndex="0">
                  <img
                    src={post.image}
                    className="profile-content-post-image"
                    alt=""
                  />

                  <div className="content-post-item-profile-info">
                    <p>{post.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default PublicProfile;
