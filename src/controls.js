import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { camera, renderer } from './scene.js';

const controls = new OrbitControls( camera, renderer.domElement );

function updateControls() {
  controls.enabled = true;
  controls.update();
}

function stopControls() {
  controls.enabled = false;
}

export { controls, updateControls,stopControls };