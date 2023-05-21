import React from "react";

import AvatarImage from "../img/고양이.jpeg";

function SearchMember({ member }) {
  return (
    <div className="searchmember-container">
      <div className="searchmember-avatar-container">
        <img src={AvatarImage} />
      </div>
      <div className="searchmember-text-container">
        <p className="searchmember-name">{member.name}</p>
        <p className="searchmember-email">{member.email}</p>
      </div>
    </div>
  );
}

export default SearchMember;
