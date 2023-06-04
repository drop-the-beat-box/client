import { Avatar } from "@material-ui/core";

function Profile({ index, image, name }) {
  return (
    <div>
      <div className="profile">
        <Avatar src={image}></Avatar>
        <p>{name}</p>
      </div>
    </div>
  );
}

export default Profile;
