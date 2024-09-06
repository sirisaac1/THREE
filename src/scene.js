import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';

const scene = new THREE.Scene();

// Create the camera with a fixed initial position
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set( 0, 20, 0 ); // Set initial camera position

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector( '#bg' )
});
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );

// Create PointerLockControls to control the camera rotation with the mouse
 const controls = new PointerLockControls( camera, renderer.domElement );

// Set up event listeners to lock the pointer when clicking on the canvas
export function lockControls() {
  document.addEventListener('click', () => {
    controls.lock(); // Enter pointer lock mode on click
  });
}


// Function to keep camera's y-position fixed relative to a mesh (e.g., `josh.mesh`)
function updateCameraPosition( mesh ) {
  camera.position.y = mesh.position.y + 20; // Adjust the offset here if needed
}

// Animation loop to update the scene
function animate( mesh ) {
  requestAnimationFrame(() => animate( mesh ));

  // Update camera position relative to the mesh
  updateCameraPosition( mesh );

  // Update controls (for mouse rotation)
  controls.update();

  renderer.render( scene, camera );
}

export { scene, camera, renderer, animate };