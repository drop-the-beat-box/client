function SideBar() {
    return(
        <aside className="sidebar">
            <div className="sidebar-top">
                <button className="sidebar-topbutton">TopButton</button>
            </div>

            <div className="sidebar-middle">
                <div className="sidebar-middleview"></div>
            </div>

            <div className="sidebar-bottom">
                <button className="sidebar-bottombutton">BottomButton</button>
            </div>
        </aside>
    )
}

export default SideBar;