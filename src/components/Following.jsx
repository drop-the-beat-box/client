import React, { useState, useEffect, useSyncExternalStore } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";

import Profile from "./Profile";
import { followingStore } from "../services/DataService";
import { getMembers } from "../services/APIService";

function Following({ name }) {
  const persons = useSyncExternalStore(
    followingStore.subscribe,
    followingStore.getSnapshot
  );

  const { teamId } = useParams();
  const [members, setMembers] = useState([]);
  const [cookie] = useCookies();
  const token = cookie["jwt-token"];

  if (name === "SharingFilePage") {
    getMembers(token, teamId).then((result) => {
      setMembers(result);
    });
  }

  return (
    <>
      {name === "MainPage" ? (
        <div className="following-container">
          {persons.map((person, index) => (
            <Profile member={person} identifier={name} key={index} />
          ))}
        </div>
      ) : (
        <div className="sharing-members-container">
          <h3>Members</h3>
          <div className="sharing-members-list">
            {members.map((person, index) => (
              <Profile member={person} key={index} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Following;
