import { useState } from "react";
import {
  faMagnifyingGlass,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { findMembers } from "../services/DataService";
import SearchMember from "./SearchMember";
import ProfileMenu from "./ProfileMenu";

function Header() {
  const [searchInput, setSearchInput] = useState("");
  const [memberList, setMemberList] = useState([]);
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const searchMemberItems = memberList.map((member, index) => (
    <SearchMember member={member} />
  ));

  const searchEmptyItem = (
    <div className="header-bottombox-empty-container">
      <img
        className="header-bottombox-empty-img"
        src="https://ar-color-book.s3.ap-northeast-2.amazonaws.com/dropthebeatboxicon.png"
        alt="logoimg"
      />
      <p className="header-bottombox-empty-text">No Result.</p>
    </div>
  );

  return (
    <div className="header">
      <div className="header-logo">
        <img
          src="https://ar-color-book.s3.ap-northeast-2.amazonaws.com/dropthebeatboxicon.png"
          alt="logo"
          width="50px"
          height="50px"
        ></img>
        <button
          className="header-title"
          onClick={(event) => {
            window.location.replace("/mainpage");
          }}
        >
          DropTheBeatBox
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
        <ProfileMenu isOpen={menuIsOpen} />
      </div>
    </div>
  );
}

export default Header;
