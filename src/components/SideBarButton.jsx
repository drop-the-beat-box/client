import { useState } from "react";
import React from 'react';

function SideBarButton(props) {
    const [isHovering, setIsHovering] = useState(false);
    const onMouseOver = () => setIsHovering(true);
    const onMouseOut=() => setIsHovering(false);

    console.log("Render");
    return (
        <button onClick = {(event) => {
            event.preventDefault();
            props.onClick();
        }} 
        className={isHovering? "sbbutton-hover" : "sbbutton"}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}>
            <div className="sbbutton-text">
                <p>{props.name}</p>
            </div>
        </button>
    )
}

export default React.memo(SideBarButton);