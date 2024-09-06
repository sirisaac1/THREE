import * as THREE from 'three';

function addGeometry( scene ) {
  // squidward hedron
  const hedron = new THREE.IcosahedronGeometry( 10 );
  const textureLoader = new THREE.TextureLoader();
  const squidTexture = textureLoader.load( '../textures/squid.jpg' );
  const squidMaterial = new THREE.MeshLambertMaterial({ map: squidTexture });
  const squidHedron = new THREE.Mesh( hedron, squidMaterial );
  squidHedron.position.set( 40, 40, -40 );
  // Set texture repetition
  squidTexture.wrapS = THREE.RepeatWrapping; // Repeat horizontally
  squidTexture.wrapT = THREE.RepeatWrapping; // Repeat vertically
  squidTexture.repeat.set( 10, 10 ); // Repeat the texture 10 times in each direction
  

  scene.add( squidHedron );

  const plane = new THREE.PlaneGeometry( 500, 500, 10, 10 );
  const stageTexture = textureLoader.load( '../textures/ground.jpg' );
  const stageMaterial = new THREE.MeshLambertMaterial({ map: stageTexture });
  const stage = new THREE.Mesh( plane, stageMaterial )
  stage.rotation.x = -Math.PI / 2; // Rotate 90 degrees around the X axis, planes are XY by default
  stageTexture.wrapS = THREE.RepeatWrapping;
  stageTexture.wrapT = THREE.RepeatWrapping;
  stageTexture.repeat.set( 9, 9 );

  scene.add( stage );

  // Grass instancing
  const grassBladeGeometry = new THREE.PlaneGeometry( 0.1, 0.5 );
  const grassBladeMaterial = new THREE.MeshBasicMaterial({ color: 0x006400, side: THREE.DoubleSide });
  const grassBladesCount = 100000;
  const grass = new THREE.InstancedMesh( grassBladeGeometry, grassBladeMaterial, grassBladesCount );
  const dummy = new THREE.Object3D();

  for ( let i = 0; i < grassBladesCount; i++ ) {
    dummy.position.set( ( Math.random() - 0.5 ) * 500, 0, ( Math.random() - 0.5 ) * 500 );
    dummy.rotation.y = Math.random() * Math.PI;
    dummy.updateMatrix();
    grass.setMatrixAt( i, dummy.matrix );
  }

  scene.add( grass );
}

export { addGeometry };