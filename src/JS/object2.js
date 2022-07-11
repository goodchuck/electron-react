import * as THREE from "three";
import { OrbitControls } from "../../node_modules/three/examples/jsm/controls/OrbitControls.js";
import { TWEEN } from "../../node_modules/three/examples/jsm/libs/tween.module.min";
import { TransformationTool } from "../JS/handle.js";
import { DragHandler } from "../JS/DragHandler.js";
// import eyepath from '../public/img/eye_2.png';
class Viewer {
  constructor() {
    this.scene = null;
    this.controls = null;
    this.camera = null;
    this.renderer = null;
    this.cube = null;
    this.raycaster = null;
    this.pointer = null;
    this.ready = false;

    this.dragHandler = null;
    this.TfT = null;
  }

  init = () => {
    console.log(
      "document.getElementById('testCanvas')",
      document.getElementById("testCanvas")
    );
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000000
    );
    this.scene.add(new THREE.AxesHelper(5));
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("testCanvas").appendChild(this.renderer.domElement);

    document
      .getElementById("testCanvas")
      .addEventListener("mousemove", onPointerMove.bind(this));
    document
      .getElementById("testCanvas")
      .addEventListener("mousedown", onPointerDown.bind(this));
    this.pointer = new THREE.Vector2();
    function onPointerMove(event) {
      this.pointer.x =
        (event.clientX / document.getElementById("testCanvas").clientWidth) *
          2 -
        1;
      this.pointer.y =
        -(event.clientY / document.getElementById("testCanvas").clientHeight) *
          2 +
        1;
      // console.log(pointer.x, pointer.y);

      const intersects = this.raycaster.intersectObjects(
        this.TfT.pickVolumes,
        true
      );

    }

    function onPointerDown(event) {
      const intersects = this.raycaster.intersectObjects(
        this.scene.children,
        true
      );
      if (intersects.length > 0) {
        console.log("intersect", intersects, this.scene.children);
        for (let i = 0; i < intersects.length; i++) {
          console.log(intersects[i].object);
          if (intersects[i].object.name.indexOf("focus.x+") >= 0)
            return this.TfT.pickVolumes[0].dispatchEvent({
              type: "click",
              test: "tt",
            });
          else if (intersects[i].object.name.indexOf("focus.x-") >= 0)
            return this.TfT.pickVolumes[1].dispatchEvent({
              type: "click",
              test: "tt",
            });
          else if (intersects[i].object.name.indexOf("focus.y+") >= 0)
            return this.TfT.pickVolumes[2].dispatchEvent({
              type: "click",
              test: "tt",
            });
          else if (intersects[i].object.name.indexOf("focus.y-") >= 0)
            return this.TfT.pickVolumes[3].dispatchEvent({
              type: "click",
              test: "tt",
            });
          else if (intersects[i].object.name.indexOf("focus.z+") >= 0)
            return this.TfT.pickVolumes[4].dispatchEvent({
              type: "click",
              test: "tt",
            });
          else if (intersects[i].object.name.indexOf("focus.z-") >= 0)
            return this.TfT.pickVolumes[5].dispatchEvent({
              type: "click",
              test: "tt",
            });
        }
      }
    }

    this.raycaster = new THREE.Raycaster();

    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      opacity: 0.1,
    });
    // var material = new THREE.MeshBasicMaterial( { map : texture, opacity : 0.5, transparent: true} );
    this.cube = new THREE.Mesh(geometry, material);
    this.cube.scale.set(10, 10, 10);
    this.scene.add(this.cube);
    this.cube.name = "mainframe";
    console.log("cube", this.cube);
    this.ready = true;

    const loaderPng = new THREE.TextureLoader();
    // load a resource
    loaderPng.load(
      // resource URL
      "https://i.imgur.com/hxKtgYA.png",
      // `/img/test.jpg`,

      // onLoad callback
      function (texture) {
        // in this example we create the material when the texture is loaded
      },

      // onProgress callback currently not supported
      undefined,

      // onError callback
      function (err) {
        console.error("An error happened.", err);
      }
    );
    // let texture = new THREE.TextureLoader().load(`./eye_2.png`);

    this.camera.position.set(0, 50, 0);
    // camera.position.z = ;
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    // const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
    // hemiLight.position.set( 0, 10000, 0 );
    // scene.add( hemiLight );

    // const dirLight = new THREE.DirectionalLight( 0xffffff );
    // dirLight.position.set( 0, 10000, 2000 );
    // scene.add( dirLight );

    const AL = new THREE.AmbientLight(0xffffff, 1);
    this.scene.add(AL);

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

    this.dragHandler = new DragHandler(this);
    this.TfT = new TransformationTool(this);
  };

  animate = () => {
    requestAnimationFrame(this.animate.bind(this));

    if (this.ready) {
      this.TfT.update();
      // cube.rotation.x += 0.05;
      // cube.rotation.y += 0.05;
    }

    this.controls.update();
    TWEEN.update();
    this.renderer.render(this.scene, this.camera);
    this.raycaster.setFromCamera(this.pointer, this.camera);
  };
}

var test3 = null;

export { Viewer, test3 };
