import * as THREE from 'three';

function addLights( scene ) {

  const pointLight = new THREE.PointLight( 0xffffff, 1 );

  pointLight.position.set( 35, 25, -30 );

  const ambientLight = new THREE.AmbientLight( 0xffffff, 1 );

  scene.add( pointLight, ambientLight );
  
  const lightHelper = new THREE.PointLightHelper( pointLight );

  scene.add( lightHelper );
}

export { addLights };