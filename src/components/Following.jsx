import React, { useState } from "react";

import { setDataChangeHandler, getFollowingMembers } from "../services/DataService";
import { Avatar } from "@material-ui/core";
import Profile from "./Profile";
export let persons = [];

function Following() {
  const [persons, setPersons] = useState([]);

  setDataChangeHandler(() => {
    setPersons(getFollowingMembers(0));
  });

  return (
    <div className="following-container">
      {persons.map((person, index) => (
        <Profile
          key={index}
          image={person.image}
          name={person.name}
        />
      ))}
    </div>
  );
}

export default Following;
