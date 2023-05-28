import React from "react";
import circle from "../img/circle.png";
import { Avatar } from "@material-ui/core";
import { faCheckCircle, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const persons = [];

for (let i = 1; i <= 5; i++) {
  persons.push({ id: i, image: circle, name: `Following_${i}` });
}
function Profile({ image, name, page }) {
  if (page === "MainPage") {
    return (
      <div>
        <div className="profile">
          <Avatar src={image}></Avatar>
          <p>{name}</p>
        </div>
      </div>
    );
  } else if (page === "SharingFilePage") {
    return (
      <div>
        <div className="profile">
          <Avatar src={image}></Avatar>
          <p>{name}</p>
          <FontAwesomeIcon
            icon={faPlus}
            className="plus-button"
            style={{ color: "#415165" }}
            /*onClick={handlier}*/
          />
        </div>
      </div>
    );
  }
}

function Following({ name }) {
  if (name === "MainPage") {
    return (
      <div className="following-container">
        {persons.map((person, index) => (
          <Profile
            key={index}
            image={person.image}
            name={person.name}
            page={name}
          />
        ))}
      </div>
    );
  } else if (name === "SharingFilePage") {
    return (
      <div className="following-container">
        {persons.map((person, index) => (
          <Profile
            key={index}
            image={person.image}
            name={person.name}
            page={name}
          />
        ))}
      </div>
    );
  }
}

export default Following;
