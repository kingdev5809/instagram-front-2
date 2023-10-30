import React from "react";
import { defaultUser } from "../../../assets/photos";
import "./Story.scss";
function StorySide() {
  const users = [
    { id: 1, name: "Ahmad" },
    { id: 2, name: "MuhammadAli" },
    { id: 3, name: "Ali" },
    { id: 4, name: "Uthman" },
    { id: 5, name: "Umar" },
    { id: 6, name: "Fatima" },
    { id: 7, name: "Khadija" },
    { id: 8, name: "Aisha" },
    { id: 9, name: "Zainab" },
    { id: 10, name: "Laila" },
  ];
  return (
    <div>
      <div className="box__history">
        <div className="stories__content">
          {users?.map((user) => (
            <div key={user.id}>
              <button className="history history--has-history">
                <div className="boxStory__avatar">
                  <div className="boxStory__border">
                    <svg
                      width="64"
                      height="64"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle r="31" cy="32" cx="32" />

                      <defs>
                        <linearGradient
                          y2="0"
                          x2="1"
                          y1="1"
                          x1="0"
                          id="--history-gradient"
                        >
                          <stop offset="0" stopColor="#f09433" />
                          <stop offset="0.25" stopColor="#e6683c" />
                          <stop offset="0.5" stopColor="#dc2743" />
                          <stop offset="0.75" stopColor="#cc2366" />
                          <stop offset="1" stopColor="#bc1888" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>

                  <div className="boxStory__picture">
                    <img src={defaultUser} alt="User Picture" />
                  </div>
                </div>
                <span className="boxStory__user">{user?.name}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StorySide;
