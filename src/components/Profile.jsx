import { Avatar } from "@material-ui/core";

function Profile({ member }) {
  return (
    <div>
      <div className="profile">
        <Avatar src={member.profileUrl}></Avatar>
        <p>{member.name}</p>
      </div>
    </div>
  );
}

export default Profile;
