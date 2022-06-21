import * as THREE from 'three';
import { OrbitControls } from '../../node_modules/three/examples/jsm/controls/OrbitControls.js';
import { FBXLoader } from '../../node_modules/three/examples/jsm/loaders/FBXLoader.js';
import { TWEEN } from '../../node_modules/three/examples/jsm/libs/tween.module.min';
import { TfT } from '../JS/handle.js';
// import eyepath from '../public/img/eye_2.png';
    let scene, controls, camera, renderer, cube, raycaster, pointer;
    let ready = false;
    let init = () => {
        console.log("document.getElementById('testCanvas')",document.getElementById("testCanvas"));
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000000 );
        scene.add(new THREE.AxesHelper(5))
        renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.getElementById("testCanvas").appendChild( renderer.domElement );

        document.getElementById("testCanvas").addEventListener("mousemove",onPointerMove);
        document.getElementById("testCanvas").addEventListener("mousedown",onPointerDown);
        pointer = new THREE.Vector2();
        function onPointerMove( event ) {
            pointer.x = ( event.clientX / document.getElementById("testCanvas").clientWidth ) * 2 - 1;
            pointer.y = -( (event.clientY) / document.getElementById("testCanvas").clientHeight ) * 2 + 1;
            // console.log(pointer.x, pointer.y);

            const intersects = raycaster.intersectObjects( TfT.pickVolumes, true);

            if( intersects.length > 0) {

                for(let i =0; i< TfT.pickVolumes.length; i++){
                    // console.log(intersects[i].object);
                    TfT.pickVolumes[i].dispatchEvent({type: 'mouseleave'});
                }

                console.log("intersect",intersects,TfT.pickVolumes);
                for(let i =0; i<intersects.length; i++){
                    // console.log(intersects[i].object);
                    if(intersects[i].object.name.indexOf("focus.x+") >= 0) return TfT.pickVolumes[0].dispatchEvent({type: 'mouseover',object:TfT.pickVolumes[0]});
                    else if (intersects[i].object.name.indexOf("focus.x-") >= 0) return TfT.pickVolumes[1].dispatchEvent({type: 'mouseover',object:TfT.pickVolumes[1]});
                    else if (intersects[i].object.name.indexOf("focus.y+") >= 0) return TfT.pickVolumes[2].dispatchEvent({type: 'mouseover',object:TfT.pickVolumes[2]});
                    else if (intersects[i].object.name.indexOf("focus.y-") >= 0) return TfT.pickVolumes[3].dispatchEvent({type: 'mouseover',object:TfT.pickVolumes[3]});
                    else if (intersects[i].object.name.indexOf("focus.z+") >= 0) return TfT.pickVolumes[4].dispatchEvent({type: 'mouseover',object:TfT.pickVolumes[4]});
                    else if (intersects[i].object.name.indexOf("focus.z-") >= 0) return TfT.pickVolumes[5].dispatchEvent({type: 'mouseover',object:TfT.pickVolumes[5]});
                }
                
            }     
        }

        function onPointerDown( event ) {
            const intersects = raycaster.intersectObjects( scene.children, true);
            if( intersects.length > 0) {
                console.log("intersect",intersects,scene.children);
                for(let i =0; i<intersects.length; i++){
                    console.log(intersects[i].object);
                    if(intersects[i].object.name.indexOf("focus.x+") >= 0) return TfT.pickVolumes[0].dispatchEvent({type: 'click',test:'tt'});
                    else if (intersects[i].object.name.indexOf("focus.x-") >= 0) return TfT.pickVolumes[1].dispatchEvent({type: 'click',test:'tt'});
                    else if (intersects[i].object.name.indexOf("focus.y+") >= 0) return TfT.pickVolumes[2].dispatchEvent({type: 'click',test:'tt'});
                    else if (intersects[i].object.name.indexOf("focus.y-") >= 0) return TfT.pickVolumes[3].dispatchEvent({type: 'click',test:'tt'});
                    else if (intersects[i].object.name.indexOf("focus.z+") >= 0) return TfT.pickVolumes[4].dispatchEvent({type: 'click',test:'tt'});
                    else if (intersects[i].object.name.indexOf("focus.z-") >= 0) return TfT.pickVolumes[5].dispatchEvent({type: 'click',test:'tt'});
                }
                
            }      
        }

        raycaster = new THREE.Raycaster();

        const loaderPng = new THREE.TextureLoader();
        // load a resource
        loaderPng.load(
            // resource URL
            'https://i.imgur.com/hxKtgYA.png',
            // `/img/test.jpg`,

            // onLoad callback
            function ( texture ) {
                // in this example we create the material when the texture is loaded
                var geometry = new THREE.BoxGeometry( 3, 3, 3 );
                // var material = new THREE.MeshBasicMaterial( { color: 0x00ff00, opacity: 0.1 } );
                var material = new THREE.MeshBasicMaterial( { map : texture, opacity : 0.5, transparent: true} );
                cube = new THREE.Mesh( geometry, material );
                // cube.scale.set(5,5,5);
                scene.add( cube );
                cube.name = "mainframe"
                console.log("cube", cube);
                ready = true;
            },

            // onProgress callback currently not supported
            undefined,

            // onError callback
            function ( err ) {
                console.error( 'An error happened.',err );
            }
        );
        // let texture = new THREE.TextureLoader().load(`./eye_2.png`);


        camera.position.set( 0, 50, 0 );
        // camera.position.z = ;
        controls = new OrbitControls( camera, renderer.domElement );
        // const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
        // hemiLight.position.set( 0, 10000, 0 );
        // scene.add( hemiLight );
    
        // const dirLight = new THREE.DirectionalLight( 0xffffff );
        // dirLight.position.set( 0, 10000, 2000 );
        // scene.add( dirLight );


        const AL = new THREE.AmbientLight(0xffffff, 1);
        scene.add(AL);

        //controls.update() must be called after any manual changes to the camera's transform
        // camera.position.set( 0, 20, 100 );

        // let fbxURL = require("../../public/myvill.fbx");
        // let fbxURL2 = require("../../public/cube.fbx");


        // const loader = new FBXLoader();
        // let fbxPath_test = `./myvill.fbx`;
        // // let fbxPath_test = `./1_100_Modeling_High_for_test.fbx`;
        // loader.load(fbxPath_test,function (object) {
        //     const box = new THREE.Box3().setFromObject( object );
        //     const center = box.getCenter( new THREE.Vector3() );
    
        //     object.position.x += ( object.position.x - center.x );
        //     object.position.y += ( object.position.y - center.y );
        //     object.position.z += ( object.position.z - center.z );
        //     console.log("성공",object, cube)
        //     object.scale.set(0.5,0.5,0.5);
        //     scene.add(object);
        //     //camera.position.set(gltf.position.x+5,gltf.position.y+5,gltf.position.z+5);
        //     // camera.lookAt(gltf.position);
        // },undefined, function(error) {
        //     console.error(error);
        // });
        // controls.update();
    }


    var animate = function () {
        requestAnimationFrame( animate );

        if(ready) {
            TfT.update();
            // cube.rotation.x += 0.05;
            // cube.rotation.y += 0.05;
        }

  




        controls.update();
        TWEEN.update();
        renderer.render( scene, camera );
        raycaster.setFromCamera( pointer, camera);


    };


export {animate,init,scene,cube,camera,renderer,raycaster};