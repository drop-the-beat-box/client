import { useState } from "react";

import { findMembers } from "../services/DataService";
import SearchMember from "./SearchMember";

function Header() {
  const [searchInput, setSearchInput] = useState("");
  const [memberList, setMemberList] = useState([]);

  const searchMemberItems = memberList.map((member, index) => (
    <SearchMember member={member} />
  ));

  return (
    <div className="header">
      <div className="header-logo">
        <img
          src="https://ar-color-book.s3.ap-northeast-2.amazonaws.com/dropthebeatboxicon.png"
          alt="logo"
          width="50px"
          height="50px"
        ></img>
        <h2 className="header-title">DropTheBeatBox</h2>
      </div>

      <form className="header-search">
        <div className="header-searchbar-container">
          <input
            name="searchId"
            className="header-searchbar"
            type="search"
            placeholder="search"
            height="100"
            onChange={(e) => {
              setSearchInput(e.target.value);
              const result = findMembers(e.target.value);
              setMemberList(result);
            }}
          ></input>
          <div
            className={
              searchInput ? "header-bottombox" : "header-bottombox-disabled"
            }
          >
            {searchInput ? searchMemberItems : null}
          </div>
        </div>
        <input
          className="header-searchbutton"
          type="submit"
          value="Go"
          height="100"
        ></input>
      </form>

      <div className="header-profile">
        <h2>Profile</h2>
      </div>
    </div>
  );
}

export default Header;
