import SideBarButton from "./SideBarButton";

function SideBar() {
    return(
        <aside className="sidebar">
            <div className="sidebar-top">
                <SideBarButton name = "ButtonName" onClick = {() => {
                    console.log("OnClick");
                }}></SideBarButton>
                {/* <button className="sidebar-topbutton">TopButton</button> */}
            </div>

            <div className="sidebar-middle">
                <div className="sidebar-middleview"></div>
            </div>

            <div className="sidebar-bottom">
            <SideBarButton name = "TrashCan"></SideBarButton>
            </div>
        </aside>
    )
}

export default SideBar;