import React, { useSyncExternalStore } from "react";

import Profile from "./Profile";
import { followingStore } from "../services/DataService";

function Following({ name }) {
  const persons = useSyncExternalStore(
    followingStore.subscribe,
    followingStore.getSnapshot
  );

  return (
    <div className="following-container">
      {persons.map((person, index) => (
        <Profile member={person} identifier={name} key={index} />
      ))}
    </div>
  );
}

export default Following;
