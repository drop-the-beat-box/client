import {useState} from 'react';
import Footer from './Footer';
import Header from './Header';
import SideBar from './SideBar';
import Body from './Body';
import SideBarButton from './SideBarButton';

function Layout() {
    return (
        <div className='layout'>

            <div className='top'>
                <Header/> 
            </div>   

            <div className='middle'>
                <SideBar/>
                <Body/>
            </div>

            <div className='bottom'>
                <Footer/>
            </div>
            
        </div>
    )
}

export default Layout;