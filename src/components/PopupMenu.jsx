import React from "react";

function PopupMenuButton(props) {
  return (
    <button
      className="profilemenu-button"
      onClick={
        props.callback
          ? props.callback
          : (event) => {
              window.location.replace(props.linkPage);
            }
      }
    >
      {props.text}
    </button>
  );
}

/*
items template
item = {
  text,
  linkPage,
  callback,
}

linkPage 를 지정해주고 callback 을 지정해주지 않으면 단순 페이지 라우팅 기능을 하는 메뉴 버튼이 됨.
linkPage 를 지정해주지 않고 callback 을 지정해주면 해당 콜백을 호출하는 메뉴 버튼이 됨.
*/
function PopupMenu({ isOpen, items }) {
  const contents = items.flatMap((item) => (
    <PopupMenuButton
      text={item.text}
      linkPage={item.linkPage}
      callback={item.callback}
    />
  ));

  return (
    <div
      className={
        isOpen ? "profilemenu-container" : "profilemenu-container-disabled"
      }
    >
      {contents}
    </div>
  );
}

export default PopupMenu;
