import { useEffect } from 'react';

import '../App.css';
import {animate,init} from  '../JS/object.js';
import * as handle from '../JS/handle.js' ;
const Test1 = () => {
    useEffect(() => {
        init();
        animate();
        handle.init();
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