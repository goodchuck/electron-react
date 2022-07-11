import { useEffect } from 'react';
import '../App.css';
// import {Viewer, animate} from  '../JS/object2.js';
import * as pn from '../JS/panorama.js';
const Test2 = () => {
    useEffect(() => {
        pn.init();
        pn.animate();
    })
    return (
        <>
            <div id="container"></div>
            <div id='testCanvas'></div>
        </>
    )
}

export default Test2;