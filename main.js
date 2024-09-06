import './style.css';

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Every three project requires a scene, camera and renderer.
const scene = new THREE.Scene();

// Perspective Camera args (fov, window aspect ratio in width/height, frustrum near, frustrum far)
// View Frustrum controls what objects are visible relative to camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// renderer leverages WebGL. neat stuff
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector( '#bg' )
});

// Just so it matches with window
renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight);

// Make it resize properly
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

camera.position.setZ( 50 ); //this changes POV in browser

// Now you need geometry, materials/textures, and to mesh them together
// Geometry uses vectors xyz to make up a shape
// Create dodecahedron
const hedron = new THREE.IcosahedronGeometry( 30 );

// Load the texture using THREE.TextureLoader
const textureLoader = new THREE.TextureLoader();
const squidTexture = textureLoader.load( 'textures/squid.jpg' ); 

// Create a material using the loaded texture
const squidMaterial = new THREE.MeshStandardMaterial({ map: squidTexture, });

// Create the mesh with the texture material
const squidHedron = new THREE.Mesh( hedron, squidMaterial );
scene.add( squidHedron );

// Now add single point light and ambient light to see squidHedron!
const pointLight = new THREE.PointLight( 0xffffff );
pointLight.position.set( 5, 5, 5 );
const ambientLight = new THREE.AmbientLight( 0xffffff );
scene.add( pointLight, ambientLight );

// Add light and grid helpers, controls. listens to dom events on mouse, update camera accordingly
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper( 200, 50);
const controls = new OrbitControls( camera, renderer.domElement ); //update in animate function
scene.add( lightHelper, gridHelper );

// THIS SECTION IS FOR GRASS

const grassBladeGeometry = new THREE.PlaneGeometry(0.1, 0.5); // small plane for a grass blade
const grassBladeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide });

// Create an InstancedMesh
const grassBladesCount = 100000; // Number of grass blades
const grass = new THREE.InstancedMesh(grassBladeGeometry, grassBladeMaterial, grassBladesCount);

const dummy = new THREE.Object3D(); // Helper object for positioning

for (let i = 0; i < grassBladesCount; i++) {
  // Randomly place each blade in the scene
  dummy.position.set(
    (Math.random() - 0.5) * 500,
    0,
    (Math.random() - 0.5) * 500
  );
  dummy.rotation.y = Math.random() * Math.PI; // Random rotation for each blade
  dummy.updateMatrix();

  grass.setMatrixAt(i, dummy.matrix);
}

scene.add(grass);

// Continuously animates the page
function animate() {
  requestAnimationFrame( animate );

  squidHedron.rotation.x += 0.001;
  squidHedron.rotation.y += 0.0005;
  squidHedron.rotation.z += 0.0001;

  controls.update();

  renderer.render( scene, camera );
}
animate();
