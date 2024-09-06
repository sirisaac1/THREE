import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { camera, renderer } from './scene.js';

const controls = new OrbitControls( camera, renderer.domElement );

function updateControls() {
  controls.update();
}

function toggleOrbitCamera() {
  orbitCameraEnabled = !orbitCameraEnabled;
}
export { controls, updateControls, toggleOrbitCamera };