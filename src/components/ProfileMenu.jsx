import React from "react";

function ProfileMenuButton(props) {
  return (
    <button
      className="profilemenu-button"
      onClick={(event) => {
        window.location.replace(props.linkPage);
      }}
    >
      {props.text}
    </button>
  );
}

function ProfileMenu({ isOpen }) {
  return (
    <div
      className={
        isOpen ? "profilemenu-container" : "profilemenu-container-disabled"
      }
    >
      <ProfileMenuButton text="MyFilePage" linkPage="/myfilepage" />
      <ProfileMenuButton text="SharingFilePage" linkPage="/sharingfilepage" />
      <ProfileMenuButton text="SharingPage" linkPage="/sharingpage" />
      <ProfileMenuButton text="Trashcan" linkPage="/trashcan" />
    </div>
  );
}

export default ProfileMenu;
