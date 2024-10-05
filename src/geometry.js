import * as THREE from 'three';

const textureLoader = new THREE.TextureLoader();
const stageTexture = textureLoader.load( '../textures/ground.jpg' );
const textureFront = textureLoader.load( '../textures/front.jpg' );
const textureBack = textureLoader.load( '../textures/back.jpg' );
const textureLeft = textureLoader.load( '../textures/left.jpg' );
const textureRight = textureLoader.load( '../textures/right.jpg' );
const squidTexture = textureLoader.load( '../textures/squid.jpg' );
const devinTexture = textureLoader.load( '../textures/devin.jpg')
const tristanTexture = textureLoader.load( '../textures/tristanFourtyHands.jpg' );
const rylanTexture = textureLoader.load( '../textures/rylanChocolate.jpg' );
const gabeTexture = textureLoader.load( '../textures/gabeHead.jpg' );
const chanTexture = textureLoader.load( '../textures/chanWoke.jpg' );

// GabeLathe
const points = [];
for ( let i = 0; i < 10; i ++ ) {
	points.push( new THREE.Vector2( Math.sin( i * 0.2 ) * 10 + 5, ( i - 5 ) * 2 ) );
}
const lathe = new THREE.LatheGeometry( points );
const gabeMaterial = new THREE.MeshLambertMaterial( { map: gabeTexture } );
export const gabeLathe = new THREE.Mesh( lathe, gabeMaterial );
gabeLathe.position.set( 50, 30, 20 ) ;
gabeLathe.rotation.y = 90;

// ChanPrism
const prism = new THREE.IcosahedronGeometry( 40 );
const chanMaterial = new THREE.MeshLambertMaterial( { map: chanTexture } );
export const chanPrism = new THREE.Mesh( prism, chanMaterial );
chanPrism.position.set( -50, 40, 70 );
chanPrism.rotation.y = 280;

// Squidward Hedron
const hedron = new THREE.IcosahedronGeometry( 20 );
const squidMaterial = new THREE.MeshLambertMaterial( { map: squidTexture } );
export const squidHedron = new THREE.Mesh( hedron, squidMaterial ); 
squidTexture.wrapS = THREE.RepeatWrapping; // Repeat horizontally
squidTexture.wrapT = THREE.RepeatWrapping; // Repeat vertically
squidTexture.repeat.set( 8, 8 ); // Repeat the texture 10 times in each direction
squidHedron.position.set( 50, 30, -50 );

//Rylan Cube
const cube = new THREE.BoxGeometry( 10, 10, 10 );
const rylanMaterial = new THREE.MeshLambertMaterial( { map: rylanTexture } );
export const rylanCube = new THREE.Mesh( cube, rylanMaterial );

// Devin Torus
const torusGeometry = new THREE.TorusGeometry( 10, 10, 16, 100 ); 
const torusMaterial = new THREE.MeshLambertMaterial( { map: devinTexture  } ); 
export const devinTorus = new THREE.Mesh( torusGeometry, torusMaterial );
devinTexture.wrapS = THREE.RepeatWrapping;
devinTexture.wrapT = THREE.RepeatWrapping;
devinTexture.repeat.set( 2, 2 );
devinTorus.position.set( 0, 50, -75 ) ;

// Tristan Capsule
const tristanGeometry = new THREE.CapsuleGeometry( 15, 15, 10, 20 );
const tristanMaterial = new THREE.MeshLambertMaterial( { map: tristanTexture } );
export const tristanTweakin = new THREE.Mesh( tristanGeometry, tristanMaterial );
tristanTexture.wrapS = THREE.RepeatWrapping;
tristanTexture.wrapT = THREE.RepeatWrapping;
tristanTexture.repeat.set( 2, 1 );
tristanTweakin.position.set( -60, 20, -60 );
tristanTweakin.rotation.y = 90;

// Ground Plane
const plane = new THREE.PlaneGeometry( 700, 500, 10, 10 );
const stageMaterial = new THREE.MeshLambertMaterial( { map: stageTexture } );
const stage = new THREE.Mesh( plane, stageMaterial )
stageTexture.wrapS = THREE.RepeatWrapping;
stageTexture.wrapT = THREE.RepeatWrapping;
stageTexture.repeat.set( 9, 9 );
stage.rotation.x = -Math.PI / 2; // Rotate 90 degrees around the X axis, planes are XY by default

// Create the walls
const planeSize = 500; // Adjust this for the size of the walls

// Front wall
const frontGeometry = new THREE.PlaneGeometry( planeSize, planeSize );
const frontMaterial = new THREE.MeshBasicMaterial( { map: textureFront } );
const frontPlane = new THREE.Mesh( frontGeometry, frontMaterial );
frontPlane.position.set( 0, planeSize / 2, -planeSize / 2 );

// Back wall
const backGeometry = new THREE.PlaneGeometry( planeSize, planeSize );
const backMaterial = new THREE.MeshBasicMaterial( { map: textureBack } );
const backPlane = new THREE.Mesh( backGeometry, backMaterial );
backPlane.position.set( 0, planeSize / 2, planeSize / 2 );
backPlane.rotation.y = Math.PI; // Rotate the back wall

// Left wall
const leftGeometry = new THREE.PlaneGeometry( planeSize, planeSize );
const leftMaterial = new THREE.MeshBasicMaterial( { map: textureLeft } );
const leftPlane = new THREE.Mesh( leftGeometry, leftMaterial );
leftPlane.position.set( -planeSize / 2, planeSize / 2, 0 );
leftPlane.rotation.y = Math.PI / 2; // Rotate left wall

// Right wall
const rightGeometry = new THREE.PlaneGeometry( planeSize, planeSize );
const rightMaterial = new THREE.MeshBasicMaterial( { map: textureRight } );
const rightPlane = new THREE.Mesh( rightGeometry, rightMaterial );
rightPlane.position.set( planeSize / 2, planeSize / 2, 0 );
rightPlane.rotation.y = -Math.PI / 2; // Rotate right wall

export function addGeometry( scene ) {
  scene.add( stage );
  scene.add( squidHedron );
  scene.add( devinTorus );
  scene.add( tristanTweakin );
  scene.add( chanPrism );
  scene.add( gabeLathe );
  scene.add( frontPlane );
  scene.add( backPlane );
  scene.add( leftPlane );
  scene.add( rightPlane );
}