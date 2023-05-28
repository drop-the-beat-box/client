const randomImage = "https://picsum.photos/200/300";

let datas = [
  {
    id: 0,
    name: "Dar",
    email: "dshadbolt0@ebay.com",
    following: false,
    image: randomImage,
  },
  {
    id: 1,
    name: "Dara",
    email: "dcoulthart1@spotify.com",
    following: false,
    image: randomImage,
  },
  {
    id: 2,
    name: "Elwira",
    email: "ehayden2@meetup.com",
    following: false,
    image: randomImage,
  },
  {
    id: 3,
    name: "Leone",
    email: "lbengal3@chron.com",
    following: false,
    image: randomImage,
  },
  {
    id: 4,
    name: "Leonore",
    email: "lhonnicott4@marriott.com",
    following: false,
    image: randomImage,
  },
  {
    id: 5,
    name: "Vere",
    email: "vaynold5@mysql.com",
    following: false,
    image: randomImage,
  },
  {
    id: 6,
    name: "Claudia",
    email: "cmoakler6@digg.com",
    following: false,
    image: randomImage,
  },
  {
    id: 7,
    name: "mkaos",
    email: "ajso2981@naver.com",
    following: false,
    image: randomImage,
  },
  {
    id: 8,
    name: "Phillis",
    email: "pgrasner8@cloudflare.com",
    following: false,
    image: randomImage,
  },
  {
    id: 9,
    name: "Gilemette",
    email: "gchadburn9@disqus.com",
    following: false,
    image: randomImage,
  },
  {
    id: 10,
    name: "Charles",
    email: "abcabc7@topsy.com",
    following: false,
    image: randomImage,
  },
  {
    id: 11,
    name: "Hwang Yuhwan",
    email: "abcabc7@topsy.com",
    following: false,
    image: randomImage,
  },
  {
    id: 12,
    name: "Park Chansu",
    email: "abcabc7@topsy.com",
    following: false,
    image: randomImage,
  },
  {
    id: 13,
    name: "Jo Yerin",
    email: "abcabc7@topsy.com",
    following: false,
    image: randomImage,
  },
  {
    id: 14,
    name: "Song Minseok",
    email: "abcabc7@topsy.com",
    following: false,
    image: randomImage,
  },
  {
    id: 15,
    name: "Choi Youngwook",
    email: "abcabc7@topsy.com",
    following: false,
    image: randomImage,
  },
  {
    id: 16,
    name: "Jung Sunghoon",
    email: "abcabc7@topsy.com",
    following: false,
    image: randomImage,
  },
  {
    id: 17,
    name: "Kibi",
    email: "abcabc7@topsy.com",
    following: false,
    image: randomImage,
  },
  {
    id: 18,
    name: "Bivi",
    email: "abcabc7@topsy.com",
    following: false,
    image: randomImage,
  },
  {
    id: 19,
    name: "Ireasi",
    email: "abcabc7@topsy.com",
    following: false,
    image: randomImage,
  },
  {
    id: 20,
    name: "Iselaz",
    email: "abcabc7@topsy.com",
    following: false,
    image: randomImage,
  },
];

let dataChangeHandler = () => {};

function findMembers(keyword) {
  let result = [];

  // TODO: API 호출 코드 추가하기.
  // API 호출 코드
  // const datas = API 호출결과

  datas.forEach((member) => {
    if (member.name.toLowerCase().includes(keyword.toLowerCase())) {
      result.push(member);
    }
  });
  return result;
}

function follow(id) {
  let member = datas.find((element, index, array) => element.id === id);
  member.following = true;
  dataChangeHandler();
}

function unfollow(id) {
  let member = datas.find((element, index, array) => element.id === id);
  member.following = false;
  dataChangeHandler();
}

function getFollowingMembers(myId) {
  let result = [];
  datas.forEach((member) => {
    if (member.following) {
      result.push(member);
    }
  });
  return result;
}

function setDataChangeHandler(handler) {
  dataChangeHandler = handler;
}

export {
  findMembers,
  follow,
  unfollow,
  getFollowingMembers,
  setDataChangeHandler,
  datas,
};
