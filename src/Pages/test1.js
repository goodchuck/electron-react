import { useEffect } from 'react';

import '../App.css';
import {Viewer, animate} from  '../JS/object.js';
const Test1 = () => {
    useEffect(() => {
        let ViewerE = new Viewer();
        ViewerE.init();
        ViewerE.animate();
    })
    
    return (
        <>
            {/* <h1>test1!</h1> */}
            {/* <div id="testbutton">x+</div>
            <div id="testbutton_y">y+</div>
            <div id="testbutton_z">z+</div> */}
            <div id='testCanvas'></div>
        </>
    )
}

export default Test1;