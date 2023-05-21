function Header() {
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
        <input
          name="searchId"
          className="header-searchbar"
          type="search"
          placeholder="Search..."
          height="100"
        ></input>
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
