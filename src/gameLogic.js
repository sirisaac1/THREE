import * as THREE from 'three';

//define game objects

export class Player {
    constructor( scene ) {
      this.geometry = new THREE.SphereGeometry( 14, 32, 16 );
      const textureLoader = new THREE.TextureLoader();
      const joshDoob = textureLoader.load('../textures/joshDoob.jpg')
      this.material = new THREE.MeshLambertMaterial({ map: joshDoob });
      this.mesh = new THREE.Mesh( this.geometry, this.material );
      joshDoob.wrapS = THREE.RepeatWrapping; // Repeat horizontally
      joshDoob.wrapT = THREE.RepeatWrapping; // Repeat vertically
      joshDoob.repeat.set( 10, 10 ); // Repeat the texture 10 times in each direction
      scene.add( this.mesh );
    }
  
    update( window ) {
      // Update player logic, e.g., movement
      // Handle controls
      
    }

    //TODO WRITE COLLISION HANDLING
  }
  
  

  

