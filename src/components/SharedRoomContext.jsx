import React, { createContext, useState } from "react";

export const SharedRoomContext = createContext();

export const SharedRoomProvider = ({ children }) => {
  const [shareroom, setShareroom] = useState([]);

  return (
    <SharedRoomContext.Provider value={{ shareroom, setShareroom }}>
      {children}
    </SharedRoomContext.Provider>
  );
};
