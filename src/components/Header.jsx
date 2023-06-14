import { useState, useCallback } from "react";
import { useCookies } from "react-cookie";
import {
  faMagnifyingGlass,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { searchMembers, follow, unfollow } from "../services/APIService";
import { followingStore } from "../services/DataService";
import SearchMember from "./SearchMember";
import PopupMenu from "./PopupMenu";
import FollowConfirm from "./FollowConfirm";
import ProfileImage from "../img/profile.jpeg";

function Header() {
  const [searchInput, setSearchInput] = useState("");
  const [memberList, setMemberList] = useState([]);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState();
  const [cookies] = useCookies();
  const token = cookies["jwt-token"];

  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  const debounceTimout = 300;

  const searchMemberItems = memberList.map((member, index) => (
    <SearchMember
      key={index}
      member={member}
      onClick={() => {
        if (!member.following) {
          setSelectedMember(member);
        } else {
          unfollow(token, member.memberId).then((v) => {
            followingStore.updateList(token);
          });
          member.following = false;
          forceUpdate();
        }
      }}
    />
  ));

  const popupItems = [
    { text: "My File Page", linkPage: "/myfilepage" },
    { text: "Sharing Page", linkPage: "/sharingpage" },
    { text: "Sharing File Page", linkPage: "/sharingfilepage" },
    { text: "Trash Can", linkPage: "/trashcan" },
    { text: "Logout", linkPage: "/" },
  ];

  const searchEmptyItem = (
    <div className="header-bottombox-empty-container">
      <img
        className="header-bottombox-empty-img"
        alt="search result empty"
        src="https://ar-color-book.s3.ap-northeast-2.amazonaws.com/dropthebeatboxicon.png"
      />
      <p className="header-bottombox-empty-text">No Result.</p>
    </div>
  );

  let debounce = null;

  return (
    <div className="header">
      {selectedMember && (
        <FollowConfirm
          member={selectedMember}
          onOk={() => {
            follow(token, selectedMember.memberId).then((v) => {
              followingStore.updateList(token);
            });
            selectedMember.following = true;
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
                // Debounce
                clearTimeout(debounce);
                debounce = setTimeout(() => {
                  setSearchInput(e.target.value);
                  searchMembers(token, e.target.value).then((result) => {
                    setMemberList(result);
                  });
                }, debounceTimout);
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
          <div className="header-profile-popup-container">
            <div></div>
            <PopupMenu isOpen={menuIsOpen} items={popupItems} />
          </div>
          <img
            src={ProfileImage}
            alt="profile"
            className="header-profile-avatar-container"
          />
          <button
            className="header-profile-toggle-btn"
            onClick={() => {
              setMenuIsOpen(!menuIsOpen);
            }}
          >
            <FontAwesomeIcon icon={faCaretDown} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
