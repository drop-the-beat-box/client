import React from "react";
import { faCheckCircle, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SearchMember({ member, onClick }) {
  const followingIndicate = (
    <>
      <FontAwesomeIcon icon={faCheckCircle} style={{ color: "#34a89a" }} />
      <p className="searchmember-following-text">following</p>
    </>
  );

  const followIndicate = (
    <FontAwesomeIcon
      className="searchmember-plus"
      icon={faPlus}
      style={{ color: "#415165" }}
    />
  );

  return (
    <div
      className={
        member.following
          ? "searchmember-container-following"
          : "searchmember-container"
      }
      onClick={onClick}
    >
      <div className="searchmember-avatar-container">
        <img
          src={member.profileUrl}
          alt="profile"
          style={{ maxWidth: "100%", height: "auto" }}
        />
      </div>
      <div className="searchmember-text-container">
        <p className="searchmember-name">{member.name}</p>
        <p className="searchmember-email">{member.email}</p>
      </div>
      <div className="searchmember-following-container">
        {member.following ? followingIndicate : followIndicate}
      </div>
    </div>
  );
}

export default SearchMember;
