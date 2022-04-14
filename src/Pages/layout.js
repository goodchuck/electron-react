import Splash from './splash';
import SideBar from './sidebar';
import Main from './main';

const Layout = ({children}) => {
    return (
        <div style={{display:'flex'}}>
            <SideBar />
            <div className='main-div'>
                {children}
            </div>
            
        </div>
    )
}

export default Layout;