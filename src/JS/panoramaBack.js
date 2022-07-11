import * as THREE from "three";

// "use strict";
var camera,
        scene,
        renderer,
        onPointerDownPointerX,
        onPointerDownPointerY,
        onPointerDownLon,
        onPointerDownLat,
        fov = 70, // Field of View
        isUserInteracting = false,
        lon = 0,
        lat = 0,
        phi = 0,
        theta = 0,
        onMouseDownMouseX = 0,
        onMouseDownMouseY = 0,
        onMouseDownLon = 0,
        onMouseDownLat = 0,
        width = 1440, // int || window.innerWidth
        height = 650, // int || window.innerHeight
        ratio = width / height;


        const loaderPng = new THREE.TextureLoader();
        function test() {
        // load a resource
        loaderPng.load(
            // resource URL
            `/img/test.jpg`,
      
            // onLoad callback
            function (texture) {
              // in this example we create the material when the texture is loaded
              init(texture);
              animate();
            },
      
            // onProgress callback currently not supported
            undefined,
      
            // onError callback
            function (err) {
              console.error("An error happened.", err);
            }
          );
        }


// var texture = THREE.ImageUtils.loadTexture(`/img/test.jpg`, new THREE.UVMapping(), function() {
//     init();
//     animate();
// });

function init(texture) {
    let element = document.getElementById('demo') // Inject scene into this
    camera = new THREE.PerspectiveCamera(fov, ratio, 1, 1000);
    scene = new THREE.Scene();
    var mesh = new THREE.Mesh(new THREE.SphereGeometry(500, 60, 40), new THREE.MeshBasicMaterial({map: texture}));
    mesh.scale.x = -1;
    scene.add(mesh);
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(width, height);
    element.appendChild(renderer.domElement);
    element.addEventListener('mousedown', onDocumentMouseDown, false);
    element.addEventListener('mousewheel', onDocumentMouseWheel, false);
    element.addEventListener('DOMMouseScroll', onDocumentMouseWheel, false);
    window.addEventListener('resize', onWindowResized, false);
    onWindowResized(null);
}
function onWindowResized(event) {
//    renderer.setSize(window.innerWidth, window.innerHeight);
//    camera.projectionMatrix.makePerspective(fov, window.innerWidth / window.innerHeight, 1, 1100);
    renderer.setSize(width, height);
    camera.projectionMatrix.makePerspective(fov, ratio, 1, 1100);
}
function onDocumentMouseDown(event) {
    
    event.preventDefault();
    onPointerDownPointerX = event.clientX;
    onPointerDownPointerY = event.clientY;
    onPointerDownLon = lon;
    onPointerDownLat = lat;
    isUserInteracting = true;
    let element = document.getElementById('demo') // Inject scene into this
    element.addEventListener('mousemove', onDocumentMouseMove, false);
    element.addEventListener('mouseup', onDocumentMouseUp, false);
}
function onDocumentMouseMove(event) {
    lon = (event.clientX - onPointerDownPointerX) * -0.175 + onPointerDownLon;
    lat = (event.clientY - onPointerDownPointerY) * -0.175 + onPointerDownLat;
}
function onDocumentMouseUp(event) {
    isUserInteracting = false;
    let element = document.getElementById('demo') // Inject scene into this
    element.removeEventListener('mousemove', onDocumentMouseMove, false);
    element.removeEventListener('mouseup', onDocumentMouseUp, false);
}
function onDocumentMouseWheel(event) {
    // WebKit
    if (event.wheelDeltaY) {
        fov -= event.wheelDeltaY * 0.05;
        // Opera / Explorer 9
    } else if (event.wheelDelta) {
        fov -= event.wheelDelta * 0.05;
        // Firefox
    } else if (event.detail) {
        fov += event.detail * 1.0;
    }
    if (fov < 45 || fov > 90) {
        fov = (fov < 45) ? 45 : 90;
    }
    camera.projectionMatrix.makePerspective(fov, ratio, 1, 1100);
}
function animate() {
    requestAnimationFrame(animate);
    render();
}
function render() {
    if (isUserInteracting === false) {
        lon += .05;
    }
    lat = Math.max(-85, Math.min(85, lat));
    phi = THREE.Math.degToRad(90 - lat);
    theta = THREE.Math.degToRad(lon);
    camera.position.x = 100 * Math.sin(phi) * Math.cos(theta);
    camera.position.y = 100 * Math.cos(phi);
    camera.position.z = 100 * Math.sin(phi) * Math.sin(theta);
    var log = ("x: " + camera.position.x);
    log = log + ("<br/>y: " + camera.position.y);
    log = log + ("<br/>z: " + camera.position.z);
    log = log + ("<br/>fov: " + fov);
    // document.getElementById('log').innerHTML = log;
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
}

export {test}