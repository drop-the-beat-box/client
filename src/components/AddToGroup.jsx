import React, { useSyncExternalStore } from "react";
import ReactLoading from "react-loading";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { roomStore } from "../services/DataService";

function AddToGroup({ onSelect, onCancel }) {
  const rooms = useSyncExternalStore(
    roomStore.subscribe,
    roomStore.getSnapshot
  );

  return (
    <div className="modal-wrapper">
      <div className="add-to-group-modal">
        <h3>공유할 그룹을 선택하세요</h3>
        <div
          className="add-to-group-close-button"
          onClick={() => {
            onCancel();
          }}
        >
          <FontAwesomeIcon icon={faX} style={{ color: "#6c86b2" }} />
        </div>
        {roomStore.getIsRoomLoaded() ? (
          <div className="add-to-group-list">
            {rooms.map((room, index) => (
              <div
                className="add-to-group-list-item"
                onClick={() => {
                  onSelect(room.teamId);
                }}
              >
                <h3>{room.teamName}</h3>
              </div>
            ))}
          </div>
        ) : (
          <div className="add-to-group-loading">
            <ReactLoading type="bars" color="#415165"></ReactLoading>
          </div>
        )}
      </div>
    </div>
  );
}
export default AddToGroup;
