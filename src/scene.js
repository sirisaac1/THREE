import * as THREE from 'three';
import { Player } from './gameLogic.js';

const scene = new THREE.Scene();

// Create the camera with a fixed initial position
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set( 0, 40, 50 );


const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector( '#bg' )
});
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );

// Function to keep camera's y-position fixed relative to a mesh (e.g., `josh.mesh`)
function updateCameraPosition( mesh ) {
  camera.position.y = mesh.position.y + 20; // Adjust the offset here if needed
  camera.position.z = mesh.position.z;
  camera.position.x = mesh.position.x;

}

export { scene, camera, renderer, updateCameraPosition };