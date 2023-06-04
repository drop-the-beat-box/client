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

async function getMyFiles(token) {
  const result = await get(token, "/member/files");
  return result.fileDtoList;
}

function deleteAFile(token, fileId) {}

function getAFile(token, fileId) {}

export { getMyFiles };
