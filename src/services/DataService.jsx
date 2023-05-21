const datas = [
  { name: "Dar", email: "dshadbolt0@ebay.com" },
  { name: "Dara", email: "dcoulthart1@spotify.com" },
  { name: "Elwira", email: "ehayden2@meetup.com" },
  { name: "Leone", email: "lbengal3@chron.com" },
  { name: "Leonore", email: "lhonnicott4@marriott.com" },
  { name: "Vere", email: "vaynold5@mysql.com" },
  { name: "Claudia", email: "cmoakler6@digg.com" },
  { name: "Kiri", email: "kyoskowitz7@topsy.com" },
  { name: "Phillis", email: "pgrasner8@cloudflare.com" },
  { name: "Gilemette", email: "gchadburn9@disqus.com" },
];

function findMembers(keyword) {
  let result = [];
  datas.forEach((member) => {
    if (member.name.includes(keyword) || member.email.includes(keyword)) {
      result.push(member);
    }
  });
  return result;
}

export { findMembers };
