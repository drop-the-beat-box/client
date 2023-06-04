async function get(token, url) {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "*/*",
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
}

async function post(token, url, body) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "*/*",
      Authorization: `Bearer ${token}`,
    },
    body: body,
  });
  return await response.json();
}

async function del(token, url) {
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Accept: "*/*",
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
}

function deleteAFile(token, fileId) {}

function getAFile(token, fileId) {}

module.exports = {
  searchMembers: async (token, keyword) => {
    const result = await get(token, `/team/member/search?keyword=${keyword}`);
    console.log(result.memberDtoList);
    return result.memberDtoList;
  },
  follow: async (token, id) => {
    const result = await post(token, `/member/friend/${id}`);
    return result;
  },
  unfollow: async (token, id) => {
    const result = await post(token, `/member/friend/${id}`);
    return result;
  },
  getFriends: async (token) => {
    const result = await get(token, "/member/friends");
    return result.friendDtoList;
  },
  uploadFile: async (token, formData) => {
    const result = await post(token, "/member/file", formData);
    return result;
  },
  getMyFiles: async (token) => {
    const result = await get(token, "/member/files");
    console.log(result.fileDtoList);
    return result.fileDtoList;
  },
};
