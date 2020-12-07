const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const mouse = new THREE.Vector2();
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor('#e5e5e5');
document.body.appendChild( renderer.domElement );


// Cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial( { color: 0x333333 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

// Update
function animate() {
	requestAnimationFrame( animate );
  renderer.render( scene, camera );

  cube.rotation.x -= mouse.y / 10;
  cube.rotation.y += mouse.x / 10;
}
animate();

// Controls
function onMouseMove( event ) {
	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}
window.addEventListener( 'mousemove', onMouseMove, false );
