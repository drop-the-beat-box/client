import React, { useState, useCallback } from "react";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { follow, unfollow } from "../services/DataService";
import AvatarImage from "../img/고양이.jpeg";

function SearchMember({ member }) {
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  return (
    <div
      className={
        member.following
          ? "searchmember-container-following"
          : "searchmember-container"
      }
      onClick={() => {
        console.log(member);
        if (member.following) {
          unfollow(member.id);
        } else {
          follow(member.id);
        }
        forceUpdate();
      }}
    >
      <div className="searchmember-avatar-container">
        <img src={AvatarImage} />
      </div>
      <div className="searchmember-text-container">
        <p className="searchmember-name">{member.name}</p>
        <p className="searchmember-email">{member.email}</p>
      </div>
      <div
        className={
          member.following
            ? "searchmember-following-container"
            : "searchmember-following-container-disabled"
        }
      >
        <FontAwesomeIcon icon={faCheckCircle} style={{ color: "#34a89a" }} />
        <p className="searchmember-following-text">following</p>
      </div>
    </div>
  );
}

export default SearchMember;
