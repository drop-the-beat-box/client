import { useState } from "react";

function SideBarButton(props) {
    const [isHovering, setIsHovering] = useState(false);

    const onMouseOver = () => setIsHovering(true);
    const onMouseOut=() => setIsHovering(false);

    return (
        <button onClick = {(event) => {
            event.preventDefault();
            props.onClick();
        }} 
        className={isHovering? "sbbutton-hover" : "sbbutton"}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}>
            <div className="sbbutton-name">
                <p>{props.name}</p>
            </div>
        </button>
    )
    
}

export default SideBarButton;