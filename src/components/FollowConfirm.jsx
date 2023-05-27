import React from "react";

function FollowConfirm({ member, onOk, onCancel }) {
  return (
    <div className="followconfirm-shadow">
      <div className="followconfirm-dialog">
        <h1 className="followconfirm-text">
          {member.name} 님을 팔로우하시겠습니까?
        </h1>
        <div className="followconfirm-button-container">
          <button className="followconfirm-button-ok" onClick={onOk}>
            예
          </button>
          <button className="followconfirm-button-cancel" onClick={onCancel}>
            아니오
          </button>
        </div>
      </div>
    </div>
  );
}

export default FollowConfirm;
