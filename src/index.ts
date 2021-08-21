import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory.js';

const scene = new Scene();
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor('#e5e5e5');
document.body.appendChild(renderer.domElement);
document.body.appendChild( VRButton.createButton( renderer ) );
renderer.xr.enabled = true;


// function fillCubes() {
//   for (let i = 0; i < 20; i++) {
//     var randomColor = Math.floor(Math.random()*16777215);
//     const material = new MeshBasicMaterial({color: randomColor});
//     material.transparent = true;
//     material.opacity = 0.2;
//     const cube = new Mesh(geometry, material);
//     cube.position.x = Math.random() * 10 - 5;
//     cube.position.y = Math.random() * 10 - 5;
//     cube.position.z = Math.random() * 10;
//     cube.rotation.x = Math.random() * 2;
//     cube.rotation.y = Math.random() * 2;
//     scene.add(cube);
//   }
// }
// fillCubes();

// let isContracting = true;

// function contract(cube) {
//   cube.position.x = cube.position.x / 1.01;
//   cube.position.y = cube.position.y / 1.01;
//   cube.position.z = cube.position.y / 1.01;
//   cube.rotation.x = cube.rotation.x / 1.01;
//   cube.rotation.y = cube.rotation.y / 1.01;
// }

// function expand(cube) {
//   cube.position.x = cube.position.x * 1.01;
//   cube.position.y = cube.position.y * 1.01;
//   cube.position.z = cube.position.y * 1.01;
//   cube.rotation.x = cube.rotation.x * 1.01;
//   cube.rotation.y = cube.rotation.y * 1.01;
// }

// PC Controls
// window.addEventListener('mousemove', event => {
//   mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//   mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
// } , false);

// window.addEventListener('click', () => {
//   scene.clear();
//   fillCubes();
// }, false);

// setInterval(() => isContracting = !isContracting, 2000);

const controller1 = renderer.xr.getController(0);
const controller2 = renderer.xr.getController(1);
controller1.addEventListener('selectstart', onSelectStart);
controller2.addEventListener('selectstart', onSelectStart);

let controllerModelFactory = new XRControllerModelFactory();
const grip1 = renderer.xr.getControllerGrip(0);
const grip2 = renderer.xr.getControllerGrip(1);
grip1.add(controllerModelFactory.createControllerModel(grip1))
grip2.add(controllerModelFactory.createControllerModel(grip2))
scene.add( grip1, grip2 );

function onSelectStart(event) {
  let randomSize = 0.02 + (Math.random() / 20);
  const geometry = new BoxGeometry(randomSize, randomSize, randomSize);

  const randomColor = Math.floor(Math.random()*16777215);
  const material = new MeshBasicMaterial({color: randomColor});
  material.transparent = true;
  material.opacity = 0.5;

  const cube = new Mesh(geometry, material);
  cube.position.set(event.target.position.x, event.target.position.y, event.target.position.z)
  cube.rotation.set(Math.random(), Math.random(), Math.random());

  scene.add(cube);
  console.log(cube);
  console.log(event);
}

// Update

renderer.setAnimationLoop( function () {
  scene.children.forEach(cube => {
    cube.rotation.y += 0.005;
    cube.position.z -=0.005;
  })

	renderer.render( scene, camera );
});
