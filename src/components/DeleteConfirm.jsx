import React from "react";

function DeleteConfirm({ name, onCancel, onConfirm }) {
  return (
    <div className="delete-modal">
      <h3>{name} 파일을 정말로 삭제하시겠습니까?</h3>
      <div className="delete-modal-buttons">
        <button onClick={onConfirm}>확인</button>
        <button onClick={onCancel}>취소</button>
      </div>
    </div>
  );
}
export default DeleteConfirm;
