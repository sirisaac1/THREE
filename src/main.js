import './style.css';
import * as THREE from 'three';
import * as dat from 'dat.gui';

import {Howl, Howler} from 'howler';

import { scene, camera, renderer, lockControls } from './scene.js';
import { addLights } from './lights.js';
import { addGeometry } from './geometry.js';
import { controls, updateControls, toggleOrbitCamera } from './controls.js';
import { Player } from './gameLogic.js';

// Set up lights, geometry, and controls
addLights( scene );
addGeometry( scene );

// Make window resize properly
window.addEventListener( 'resize', () => {
  renderer.setSize( window.innerWidth, window.innerHeight );
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

const josh = new Player( scene );
const howler = new HowlerGlobal();

const keys = {
    KeyW: false,
    KeyS: false,
    KeyA: false,
    KeyD: false,
    Space: false,
    ShiftLeft: false,
    ShiftRight: false
};

// Register keydown events to set keys as "pressed"
window.addEventListener( 'keydown', ( event ) => {
  if ( event.code in keys ) {
    keys[ event.code ] = true;
  }
});
  
// Register keyup events to set keys as "released"
window.addEventListener( 'keyup', ( event ) => {
  if ( event.code in keys ) {
    keys[ event.code ] = false;
  }
});

var movementEnabled = false;
var orbitCameraEnabled = false;

// Function to handle movement based on keys pressed
function handleMovement() {
    if ( !movementEnabled ) return;
    if ( keys.KeyW ) {
      josh.mesh.position.z += 0.5;
    }
    if ( keys.KeyS ) {
      josh.mesh.position.z -= 0.5;
    }
    if ( keys.KeyD ) {
      josh.mesh.position.x -= 0.5;
    }
    if ( keys.KeyA ) {
      josh.mesh.position.x += 0.5;
    }
    if ( keys.Space ) {
      josh.mesh.position.y += 0.5;
    }
    if ( keys.ShiftLeft ) {
      josh.mesh.position.y -= 0.5;
    }
}

// Function to be called when the button is pressed
function buttonClicked() {
  movementEnabled = true;
  console.log('Unstoppable agony has commenced');
  const music = new Howl({
    src: ['../sounds/cake.mp3'],
    html5: true,
    volume: 0.1,
  });
  
  music.play();
}



// INIT GUI
const gui = new dat.GUI();

// Customize CSS to center the GUI panel
const guiContainer = gui.domElement.parentElement;

// Apply CSS styles to center the GUI
guiContainer.style.position = 'absolute';
guiContainer.style.top = '50%';
guiContainer.style.left = '50%';
guiContainer.style.transform = 'translate( -50%, -50% )';
guiContainer.style.width = '300px'; //initial
// ensure consistent position of middle button
setTimeout(() => {
    const guiWidth = guiContainer.offsetWidth;
    guiContainer.style.transform = `translate(-${guiWidth / 2}px, -50%)`;
  }, 100);

// Add button to dat.GUI
const startButton = {
  button: () => buttonClicked()
};

gui.add( startButton, 'button' ).name( 'Ready to die bitch?' );  

const devModeButton = {
  button: () => toggleOrbitCamera()
};

gui.add( devModeButton, 'button' ).name( 'Free Camera Toggle' );  

// TODO
// Use physics engines like Cannon.js, Ammo.js, or Oimo.js
// For realistic physics and collisions.

// Continuously animates the page
function animate() {
  requestAnimationFrame( animate );

  while ( orbitCameraEnabled == true ) {
    updateControls();
  };

  handleMovement();

  if ( orbitCameraEnabled == false ) {
    lockControls();
  }
  
  josh.update( window );

  renderer.render( scene, camera );
}
animate();
