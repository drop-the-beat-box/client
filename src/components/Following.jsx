import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

import {
  setDataChangeHandler,
  getFollowingMembers,
} from "../services/DataService";
import Profile from "./Profile";
import { getFriends } from "../services/APIService";

function Following() {
  const [persons, setPersons] = useState([]);
  const [cookie] = useCookies();
  const token = cookie["jwt-token"];

  useEffect(() => {
    console.log("Effect");
    getFriends(token).then((result) => {
      setPersons(result);
    });
  }, []);

  setDataChangeHandler(() => {
    setPersons(getFollowingMembers(0));
  });

  return (
    <div className="following-container">
      {persons.map((person, index) => (
        <Profile member={person} />
      ))}
    </div>
  );
}

export default Following;
