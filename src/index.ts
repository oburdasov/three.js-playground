import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  Vector2,
  WebGLRenderer,
} from 'three';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';

const scene = new Scene();
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const mouse = new Vector2();
camera.position.z = 10;

const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor('#e5e5e5');
document.body.appendChild(renderer.domElement);
document.body.appendChild( VRButton.createButton( renderer ) );
renderer.xr.enabled = true;

// Cube
const geometry = new BoxGeometry();

function fillCubes() {
  for (let i = 0; i < 20; i++) {
    var randomColor = Math.floor(Math.random()*16777215);
    const material = new MeshBasicMaterial({color: randomColor});
    material.transparent = true;
    material.opacity = 0.2;
    const cube = new Mesh(geometry, material);
    cube.position.x = Math.random() * 10 - 5;
    cube.position.y = Math.random() * 10 - 5;
    cube.position.z = Math.random() * 10;
    cube.rotation.x = Math.random() * 2;
    cube.rotation.y = Math.random() * 2;
    scene.add(cube);
  }
}
fillCubes();

// Update
let isContracting = true;
renderer.setAnimationLoop( function () {
  scene.children.forEach(cube => {
    isContracting ?
      contract(cube) :
      expand(cube);
  })

	renderer.render( scene, camera );
});

function contract(cube) {
  cube.position.x = cube.position.x / 1.01;
  cube.position.y = cube.position.y / 1.01;
  cube.position.z = cube.position.y / 1.01;
  cube.rotation.x = cube.rotation.x / 1.01;
  cube.rotation.y = cube.rotation.y / 1.01;
}

function expand(cube) {
  cube.position.x = cube.position.x * 1.01;
  cube.position.y = cube.position.y * 1.01;
  cube.position.z = cube.position.y * 1.01;
  cube.rotation.x = cube.rotation.x * 1.01;
  cube.rotation.y = cube.rotation.y * 1.01;
}

// Controls
window.addEventListener('mousemove', event => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
} , false);

window.addEventListener('click', () => {
  scene.clear();
  fillCubes();
}, false);

setInterval(() => isContracting = !isContracting, 2000);
