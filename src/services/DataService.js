let datas = [
  { id: 0, name: "Dar", email: "dshadbolt0@ebay.com", following: false },
  { id: 1, name: "Dara", email: "dcoulthart1@spotify.com", following: false },
  { id: 2, name: "Elwira", email: "ehayden2@meetup.com", following: false },
  { id: 3, name: "Leone", email: "lbengal3@chron.com", following: false },
  {
    id: 4,
    name: "Leonore",
    email: "lhonnicott4@marriott.com",
    following: false,
  },
  { id: 5, name: "Vere", email: "vaynold5@mysql.com", following: false },
  { id: 6, name: "Claudia", email: "cmoakler6@digg.com", following: false },
  { id: 7, name: "Kiri", email: "kyoskowitz7@topsy.com", following: false },
  {
    id: 8,
    name: "Phillis",
    email: "pgrasner8@cloudflare.com",
    following: false,
  },
  {
    id: 9,
    name: "Gilemette",
    email: "gchadburn9@disqus.com",
    following: false,
  },
];

function findMembers(keyword) {
  let result = [];
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
}

function unfollow(id) {
  let member = datas.find((element, index, array) => element.id === id);
  member.following = false;
}

export { findMembers, follow, unfollow };
