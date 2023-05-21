import React from "react";

function ProfileMenuButton({ text, onClick }) {
  return (
    <button className="profilemenu-button" onClick={onClick}>
      {text}
    </button>
  );
}

function ProfileMenu() {
  return (
    <div className="profilemenu-container">
      <ProfileMenuButton text="MyFilePage" />
      <ProfileMenuButton text="SharingFilePage" />
      <ProfileMenuButton text="SharingPage" />
      <ProfileMenuButton text="TrashFilePage" />
    </div>
  );
}

export default ProfileMenu;
