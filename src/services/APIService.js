/* HTTP Methods */

async function get(token, url, body) {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "*/*",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return await response.json();
}

async function post(token, url, body) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "*/*",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return await response.json();
}

async function del(token, url, body) {
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Accept: "*/*",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return await response.json();
}

async function patch(token, url, body) {
  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      Accept: "*/*",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return await response.json();
}
/* HTTP Method ends */

const deleteTempFile = (token, url) => patch(token, url);

const deletePermanentFile = (token, url) => del(token, url);

const restoreFiles = (token, url) => patch(token, url);

const makeARoom = (token, url, room_name) => {
  const requestData = {
    name: `${room_name}`,
  };
  return post(token, url, requestData);
};

const addMembers = (token, url, members) => {
  const requestData = {
    memberIdList: members,
  };
  return post(token, url, requestData);
};

const getRoomFiles = async (token, team_id) => {
  const result = await get(token, `/shared/files/team/${team_id}`);
  return result.fileDtoList;
};

module.exports = {
  searchMembers: async (token, keyword) => {
    const result = await get(token, `/team/member/search?keyword=${keyword}`);
    return result.memberDtoList;
  },
  follow: async (token, id) => {
    const result = await post(token, `/member/friend/${id}`);
    return result;
  },
  unfollow: async (token, id) => {
    const result = await del(token, `/member/friend/${id}`);
    return result;
  },
  getFriends: async (token) => {
    const result = await get(token, "/member/friends");
    return result.friendDtoList;
  },
  uploadFile: async (token, formData) => {
    const response = await fetch("/member/file", {
      method: "POST",
      headers: {
        Accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    return await response;
  },
  getMyFiles: async (token) => {
    const result = await get(token, "/member/files");
    return result.fileDtoList;
  },
  deleteFile: async (token, file_id) => {
    const result = await deleteTempFile(
      token,
      `/member/file/trash-can/${file_id}`
    );
    return result;
  },
  getTrashFiles: async (token) => {
    const result = await get(token, "/member/file/trash-can");
    return result.trashFileDtoList;
  },
  deletePermanent: async (token, file_id) => {
    const result = await deletePermanentFile(token, `/member/file/${file_id}`);
    return result;
  },
  restoreFile: async (token, file_id) => {
    const result = await restoreFiles(
      token,
      `/member/file/trash-can/roll-back/${file_id}`
    );
    return result;
  },
  makeRoom: async (token, room_name) => {
    const result = await makeARoom(token, `/member/team`, room_name);
    return result;
  },
  addMember: async (token, team_id, members) => {
    const result = await addMembers(token, `/team/${team_id}/member`, members);
    return result.joinMemberList;
  },
  getRoomFiles: (token, team_id) => {
    return getRoomFiles(token, team_id);
  },
  getRooms: async (token) => {
    const result = await get(token, "/member/teams");

    // 팀에 속한 파일들 가져오기
    for (const team of result.teamDtoList) {
      team.files = await getRoomFiles(token, team.teamId);
    }
    return result.teamDtoList;
  },
  addFileToRoom: async (token, file_id, team_id) => {
    const result = await post(token, `/shared/${file_id}/team/${team_id}`);
    return result;
  },
};
