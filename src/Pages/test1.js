import { useEffect } from 'react';

import '../App.css';
import {animate,init} from  '../JS/object.js';

const Test1 = () => {
    useEffect(() => {
        init();
        animate();
    })
    
    return (
        <>
            <h1>test1!</h1>
            <div id='testCanvas'></div>
        </>
    )
}

export default Test1;