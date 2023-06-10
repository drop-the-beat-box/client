import { Avatar } from "@material-ui/core";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Profile({ member, identifier }) {
  if (identifier === "SharingFilePage") {
    return (
      <div>
        <div className="profile">
          <Avatar src={member.profileUrl}></Avatar>
          <p>{member.name}</p>
          <FontAwesomeIcon
            icon={faPlus}
            className="plus-button"
            style={{ color: "#415165" }}
            /*onClick={handler}*/
          />
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="profile">
          <Avatar src={member.profileUrl}></Avatar>
          <p>{member.name}</p>
        </div>
      </div>
    );
  }
}

export default Profile;
