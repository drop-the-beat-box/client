import { useState, useCallback } from "react";
import {
  faMagnifyingGlass,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { findMembers, follow, unfollow, datas } from "../services/DataService";
import SearchMember from "./SearchMember";
import PopupMenu from "./PopupMenu";
import FollowConfirm from "./FollowConfirm";

function Header() {
  const [searchInput, setSearchInput] = useState("");
  const [memberList, setMemberList] = useState([]);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState();

  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  const searchMemberItems = memberList.map((member, index) => (
    <SearchMember
      member={member}
      onClick={() => {
        if (!member.following) {
          setSelectedMember(member);
        } else {
          unfollow(member.id);
        }
        forceUpdate();
      }}
    />
  ));

  const popupItems = [
    { text: "My File Page", linkPage: "/myfilepage" },
    { text: "Sharing Page", linkPage: "/sharingpage" },
    { text: "Sharing File Page", linkPage: "/sharingfilepage" },
    { text: "Trash Can", linkPage: "/trashcan" },
  ];

  const searchEmptyItem = (
    <div className="header-bottombox-empty-container">
      <img
        className="header-bottombox-empty-img"
        src="https://ar-color-book.s3.ap-northeast-2.amazonaws.com/dropthebeatboxicon.png"
      />
      <p className="header-bottombox-empty-text">No Result.</p>
    </div>
  );

  return (
    <div className="header">
      {selectedMember && (
        <FollowConfirm
          member={selectedMember}
          onOk={() => {
            follow(selectedMember.id);
            setSelectedMember();
          }}
          onCancel={() => {
            setSelectedMember();
          }}
        />
      )}
      <div className="header-logo">
        <img
          src="https://ar-color-book.s3.ap-northeast-2.amazonaws.com/dropthebeatboxicon.png"
          alt="logo"
          width="50px"
          height="50px"
          style={{
            cursor: "pointer",
          }}
          onClick={(event) => {
            window.location.replace("/mainpage");
          }}
        ></img>
        <button
          className="header-title"
          onClick={(event) => {
            window.location.replace("/mainpage");
          }}
        >
          <p style={{ cursor: "pointer" }}>DropTheBeatBox</p>
        </button>
      </div>

      <form className="header-search">
        <div className="header-searchbar-container">
          <div className="header-searchbar-big-container">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              style={{ color: "#6c86b2" }}
            />
            <input
              name="searchId"
              className="header-searchbar"
              type="search"
              placeholder="Find friends..."
              height="100"
              onChange={(e) => {
                setSearchInput(e.target.value);
                const result = findMembers(e.target.value);
                setMemberList(result);
              }}
            ></input>
          </div>
          <div
            className={
              searchInput ? "header-bottombox" : "header-bottombox-disabled"
            }
          >
            {memberList.length > 0 ? searchMemberItems : searchEmptyItem}
          </div>
        </div>
      </form>

      <div className="header-profile">
        <div className="header-profile-content">
          <div className="header-profile-avatar-container" />
          <button
            className="header-profile-toggle-btn"
            onClick={() => {
              setMenuIsOpen(!menuIsOpen);
            }}
          >
            <FontAwesomeIcon icon={faCaretDown} />
          </button>
        </div>
        <PopupMenu isOpen={menuIsOpen} items={popupItems} />
      </div>
    </div>
  );
}

export default Header;
