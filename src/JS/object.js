import * as THREE from 'three';
import { OrbitControls } from '../../node_modules/three/examples/jsm/controls/OrbitControls.js';

    let scene, controls, camera, renderer, cube

    let init = () => {
        console.log("document.getElementById('testCanvas')",document.getElementById("testCanvas"));
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
        
        renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.getElementById("testCanvas").appendChild( renderer.domElement );
        
        var geometry = new THREE.BoxGeometry( 1, 1, 1 );
        var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        cube = new THREE.Mesh( geometry, material );
        scene.add( cube );
    
        camera.position.z = 5;
        controls = new OrbitControls( camera, renderer.domElement );
    
        //controls.update() must be called after any manual changes to the camera's transform
        camera.position.set( 0, 20, 100 );
        controls.update();
    }


    var animate = function () {
        requestAnimationFrame( animate );

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        controls.update();
        renderer.render( scene, camera );
    };


export {animate,init};