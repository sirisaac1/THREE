import './style.css';
import * as THREE from 'three';
import * as dat from 'dat.gui';
import * as cannon from 'cannon';
import {Howl, Howler} from 'howler';

import { scene, camera, renderer, updateCameraPosition } from './scene.js';
import { addLights } from './lights.js';
import { addGeometry, tristanTweakin, devinTorus, squidHedron } from './geometry.js';
import { updateControls, stopControls } from './controls.js';
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

// Create a Howl instance
const sound = new Howl({
  src: ['../sounds/welcome.mp3'], // Replace with the path to your sound file
  volume: 1.0,
});

// Function to play the sound
function playSound() {
  sound.play();
}

// Set a timeout to play the sound 2 seconds after the page loads
window.addEventListener('load', () => {
  setTimeout(playSound, 1000); // 2000 milliseconds = 2 seconds
});

const keys = {
    KeyW: false,
    KeyA: false,  
    KeyS: false,
    KeyD: false,
    Space: false,
    ShiftLeft: false,
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

// Function to be called when the button is pressed
export function buttonClicked() {
  movementEnabled = true;
  const music = new Howl({
    src: ['../sounds/cake.mp3'],
    html5: true,
    volume: 1,
  });
  console.log('Unstoppable agony has commenced');
  music.play();
}

export function handleMovement() {
  if ( !movementEnabled ) return;
  if ( keys.KeyW ) {
    josh.mesh.position.z -= 0.5;
  }
  if ( keys.KeyS ) {
    josh.mesh.position.z += 0.5;
  }
  if ( keys.KeyA ) {
    josh.mesh.position.x -= 0.5;
  }
  if ( keys.KeyD ) {
    josh.mesh.position.x += 0.5;
  }
  if ( keys.Space ) {
    josh.mesh.position.y += 0.5;
  }
  if ( keys.ShiftLeft ) {
    josh.mesh.position.y -= 0.5;
  }
}

// INIT GUI
const gui = new dat.GUI();

const guiContainer = gui.domElement.parentElement;
guiContainer.classList.add('dat-gui-container');

function moveGUIToTopLeft() {
  guiContainer.style.transform = 'translate(0, 0)'; // Move to top-left
  guiContainer.style.opacity = '1';
}

const closeButton = document.querySelector('.close-button'); // Adjust selector based on your close button
if (closeButton) {
  closeButton.addEventListener('click', moveGUIToTopLeft);
}

const openButton = document.querySelector('.open-button');
if (openButton) {
  openButton.addEventListener('click', moveGUItoMiddle)
}
// Ensure the positioning is adjusted after resizing
setTimeout(() => {
    const guiWidth = guiContainer.offsetWidth;
    const guiHeight = guiContainer.offsetHeight;
    guiContainer.style.transform = `translate(-50%, -50%) scale(1.5)`; // Ensure proper centering and scaling
}, 100);


// Add button to dat.GUI
const startButton = {
  button: () => buttonClicked()
};

gui.add( startButton, 'button' ).name( 'Click to start' );  

let orbitCameraEnabled = true;

function toggleOrbitCamera() {
  orbitCameraEnabled = !orbitCameraEnabled;
  console.log(orbitCameraEnabled)
} 

const devModeButton = {
  button: () => toggleOrbitCamera()
};

gui.add( devModeButton, 'button' ).name( 'Toggle Orbit Camera' );  

// TODO
// Use physics engines like Cannon.js, Ammo.js, or Oimo.js
// For realistic physics and collisions.

// Continuously animates the page
function animate() {
  requestAnimationFrame( animate );

  if ( orbitCameraEnabled ) {
    updateControls();
  }
  else {
    updateCameraPosition( josh.mesh );
    stopControls();
  };

  handleMovement(); 

  squidHedron.rotation.y += 0.001;
  squidHedron.rotation.x -= 0.002;
  squidHedron.rotation.z += 0.001;
  devinTorus.rotation.z += 0.01;
  tristanTweakin.rotation.y -= 0.005;
  
  josh.update( window );

  renderer.render( scene, camera );
}

animate();
