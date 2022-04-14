import '../CSS/splash.css';
import splash_icon from '../imgs/splash_icon.png';
import { useNavigate } from 'react-router-dom'
const Splash = () => {
    let navigate = useNavigate();
    setTimeout(function(){
        navigate("/home")
    },2000)
    return (
        <>
            <div style={{display:'flex', position: 'relative'}}>
                <div className="backGround"></div>
                <div id='splash_contents'>
                    <img id="splash_logo" src={splash_icon} alt='none' />
                    <div className="splash_content_div">원터치 수목관리</div>
                    <div className="splash_content_div">Treeplan Service</div>  
                </div>
            </div>
        </>
    )
}

export default Splash;