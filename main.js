import './style.css';
import './cards.css';
import './dice.css';
import './contact-form.css';

import * as THREE from '/node_modules/three/build/three.module.js';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

// Make sure the project is responsive based on window resizing
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth,window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();
})

var bgcolor = 0xffffff;

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);

renderer.render( scene, camera );
// Torus
const geometry = new THREE.TorusGeometry( 10, 2, 16, 50 )
const material = new THREE.MeshStandardMaterial( { color: 0xffffff,  wireframe: true } );
const torus = new THREE.Mesh( geometry, material );

// Pentagon
const geometry2 = new THREE.TorusGeometry( 5, 1, 10, 5 )
const material2 = new THREE.MeshStandardMaterial( { color: 0x0095DD, wireframe: true } );
const torus2 = new THREE.Mesh( geometry2, material2 );
torus2.position.z = 0;
torus2.position.x = 40;
torus2.position.y = 10;

scene.add(torus, torus2)

// UW logo
const UWTexture = new THREE.TextureLoader().load('mars.png', (texture) => {
  texture.wrapS = THREE.RepeatWrapping; // Optional: Adjust texture wrapping
  texture.wrapT = THREE.RepeatWrapping;
});

const UWSeal = new THREE.Mesh(
  new THREE.CylinderGeometry(4, 4, .5, 64),
  new THREE.MeshBasicMaterial({ map: UWTexture }) // Assign the texture to the material
);

// Set position
UWSeal.rotation.x = Math.PI / 3.5; // Rotate 90 degrees along the X-axis
UWSeal.rotation.y = Math.PI / 3;
UWSeal.position.set(20, -5, -10);
scene.add(UWSeal);





const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5,5,5)

const ambientLight = new THREE.AmbientLight(bgcolor);
scene.add(pointLight, ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);

const geo = new THREE.SphereGeometry(0.25, 24, 24);
const mat = new THREE.MeshStandardMaterial( { color: 0xffffff } )

function addStar() {
  const geometry = geo
  const material = mat
  const star = new THREE.Mesh( geometry, material );

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ) );

  star.position.set(x, y, z);
  scene.add(star)
}

Array(200).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('s.png');
scene.background = spaceTexture;

//cube

const nigTexture = new THREE.TextureLoader().load('Headshot.PNG');

const nig = new THREE.Mesh(
  new THREE.BoxBufferGeometry(3, 3, 3, 10, 10, 10),
  new THREE.MeshBasicMaterial( { map: nigTexture } )
);
nig.name = "nig";

// My logo
const circleTexture = new THREE.TextureLoader().load('Icon.svg');

const circle = new THREE.Mesh(
  new THREE.CircleGeometry(8,100),
  new THREE.MeshBasicMaterial( { map: circleTexture } )
);
circle.position.z = -20;
circle.position.x = -60;
circle.position.y = 30;

// Microscope Orthographic
const orthTexture = new THREE.TextureLoader().load('microortho.png');

const orth = new THREE.Mesh(
  new THREE.PlaneGeometry(4,4),
  new THREE.MeshBasicMaterial( { map: orthTexture } )
);
orth.position.z = 20;
orth.position.x = 7;
orth.position.y = 0;


scene.add(nig, circle);

// World

const worldTexture = new THREE.TextureLoader().load('map2.jpg');
const normalTexture = new THREE.TextureLoader().load('mars.png');


const world = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial( { 
    map: worldTexture,
    normalMap: normalTexture
  } )
);

scene.add(world);

world.position.z = 40;
world.position.setX(-10);


// Air BALL

// Create a wireframe sphere
const sphereGeometry = new THREE.SphereGeometry(3, 8, 8);
const wireframeGeometry = new THREE.WireframeGeometry(sphereGeometry);
const wireframeMaterial = new THREE.LineBasicMaterial({ color: 0xffffff }); // White color for wireframe
const ABall = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);

// Add the wireframe sphere to the scene
scene.add(ABall);

// Position the wireframe sphere
ABall.position.z = 60;
ABall.position.setX(10);


const gltfLoader = new GLTFLoader();

const objectsDistance = 2

// Hovercraft 
/*
gltfLoader.load('siteHover.gltf', (gltfScene)=>{
  Object3D.matrixAutoUpdate = false 

  gltfScene.scene.position.y = 0;
  gltfScene.scene.position.x = 0;
  gltfScene.scene.position.z = 0;

  gltfScene.scene.rotation.x = 0;
  gltfScene.scene.rotation.y = 10;
  gltfScene.scene.rotation.z = 0;

  gltfScene.scene.scale.set(3, 3, 3);
  gltfScene.scene.updateMatrix();
  scene.add(gltfScene.scene);
});
*/
// Microscope

/*gltfLoader.load('microscope.gltf', (gltfScene)=>{
  //loadedModel = gltfScene;
  //gltfScene.scene.rotation.y = Math.PI / 8;
  gltfScene.scene.position.y = 0;
  gltfScene.scene.position.x = 10;
  gltfScene.scene.position.z = 10;

  gltfScene.scene.rotation.x = 5;
  gltfScene.scene.rotation.y = 25;
  gltfScene.scene.rotation.z = 30;

  gltfScene.scene.scale.set(0.025, 0.025, 0.025);
  scene.add(gltfScene.scene);
});*/


//Hovercraft
/*
var modelGroup = new THREE.Group();

gltfLoader.load('siteHover.gltf', (gltfScene)=>{
  gltfScene.scene.position.y = -100;
  gltfScene.scene.position.x = 0;
  gltfScene.scene.position.z = 0;

  gltfScene.scene.rotation.x = 5;
  gltfScene.scene.rotation.y = 60;
  gltfScene.scene.rotation.z = 30;

  gltfScene.scene.scale.set(0.1, 0.1, 0.1);
  modelGroup.add(gltfScene.scene);
  scene.add(modelGroup, pointLight);
});

window.addEventListener("scroll", function(){
  modelGroup.position.y = window.pageYOffset/10;
});*/

/*
//Rocket
gltfLoader.load('rocky.gltf', (gltfScene)=>{
  //loadedModel = gltfScene;
  //gltfScene.scene.rotation.y = Math.PI / 8;
  gltfScene.scene.position.y = 0;
  gltfScene.scene.position.x = 0;
  gltfScene.scene.position.z = 0;

  gltfScene.scene.rotation.x = 5;
  gltfScene.scene.rotation.y = 25;
  gltfScene.scene.rotation.z = 30;

  gltfScene.scene.scale.set(10, 10, 10);

  scene.add(gltfScene.scene, pointLight);
});*/

// Scroll Animation
function moveCamera() {
  
  const t = document.body.getBoundingClientRect().top;
  world.rotation.x += 0.05;
  world.rotation.y += 0.075;
  world.rotation.z += 0.05;

  ABall.rotation.x -= 0.05;


  torus2.rotation.x += -0.02;
  torus2.rotation.y += -0.01;
  torus2.rotation.z += -0.02;

  nig.rotation.x += 0.01;
  nig.rotation.z += 0.01;

  //UWSeal.rotation.y += 0.01;
  //UWSeal.rotation.x += 0.01;
  UWSeal.rotation.z += 0.01;


  //orth.position.x += -0.5;
  
  // circle.rotation.x += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
}

document.body.onscroll = moveCamera

// Animation Loop
function animate() {
  requestAnimationFrame( animate );

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  torus2.rotation.x += -0.01;
  torus2.rotation.y += -0.005;
  torus2.rotation.z += -0.01;
  
  controls.update();

  renderer.render( scene, camera );
}

animate();

var scrollToTopBtn = document.querySelector(".scrollToTopBtn");
var rootElement = document.documentElement;

function handleScroll() {
  // Do something on scroll
  var scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
  if (rootElement.scrollTop / scrollTotal > 0.6) {
    // Show button
    scrollToTopBtn.classList.add("showBtn");
  } else {
    // Hide button
    scrollToTopBtn.classList.remove("showBtn");
  }
}

function scrollToTop() {
  // Scroll to top logic
  rootElement.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}
scrollToTopBtn.addEventListener("click", scrollToTop);
document.addEventListener("scroll", handleScroll);

// Night / Day Mode button 
const toggle = document.querySelector('.toggle input');

toggle.addEventListener('click', () => {

  if(bgcolor === 0xffffff) {
    bgcolor = 0x17202A;
    //nig.material.map = new THREE.TextureLoader().load('head_pro_night.png');
    ambientLight.color.setHex(bgcolor);

  }else{
    bgcolor = 0xffffff;
    //nig.material.map = new THREE.TextureLoader().load('head_pro.png');
    ambientLight.color.setHex(bgcolor);
  }
    //const onOff = toggle.parentNode.querySelector('.onoff')
    //onOff.textContent = toggle.checked ? 'ON' : 'OFF'
    //onOff.textContent = toggle.checked ? ambientLight = new THREE.AmbientLight(0xffffff) : ambientLight = new THREE.AmbientLight(0x17202A)
})

// Hovercraft Image changes
const hov_images = ["./hovpic.png", "./hovpic2.png", "./hovpic3.png"];
let hov_currentImage = 0;

function changeHImage() {
  const hov_image = document.getElementById("hov_Images");
  currentImage = (currentImage + 1) % hov_images.length;
  hov_image.src = hov_images[currentImage];
}

const hov_image = document.getElementById("hov_Images");
hov_image.addEventListener("click", changeHImage);


// Scratch Image changes
const simages = ["sp-game.png", "box-game.png", "2020-sf.PNG"];
let scurrentImage = 0;

function changeSImage() {
  const simage = document.getElementById("scratchImages");
  currentImage = (currentImage + 1) % simages.length;
  simage.src = simages[currentImage];
}

const simage = document.getElementById("scratchImages");
simage.addEventListener("click", changeSImage);

// Traffic Image changes
const images = ["traffic.png", "traffic2.PNG", "traffic3.PNG"];
let currentImage = 0;

function changeImage() {
  const image = document.getElementById("image");
  currentImage = (currentImage + 1) % images.length;
  image.src = images[currentImage];
}

const image = document.getElementById("image");
image.addEventListener("click", changeImage);




// Dice
let randomDiceNumber;
const dice =  document.getElementById("dice");

const randomDice = () => {
  randomDiceNumber = Math.floor(Math.random() * 6) + 1;
  rollDice(randomDiceNumber);
}

const rollDice = random => {
  dice.style.animation = 'rolling 4s';
  
  switch (random) {
    case 1:
      dice.style.transform = 'rotateX(0deg) rotateY(0deg)';
      break;
    case 6:
      dice.style.transform = 'rotateX(180deg) rotateY(0deg)';
      break;
    case 2:
      dice.style.transform = 'rotateX(-90deg) rotateY(0deg)';
      break;
    case 5:
      dice.style.transform = 'rotateX(90deg) rotateY(0deg)';
      break;
    case 3:
      dice.style.transform = 'rotateX(0deg) rotateY(90deg)';
      break;
    case 4:
      dice.style.transform = 'rotateX(0deg) rotateY(-90deg)';
      break;
    default:
        break;
  }
}

dice.addEventListener('click', randomDice);
dice.addEventListener('animationend', () => {
  dice.style.animation = '';
});


/*
// When the user scrolls down 80px from the top of the document, resize the navbar's padding and the logo's font size
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    document.getElementById("navbar").style.padding = "0px 5px";
    document.getElementById("logo").style.fontSize = "0px";
  } else {
    document.getElementById("navbar").style.padding = "20px 10px";
    document.getElementById("logo").style.fontSize = "35px";
  }
}*/

/*$(window).on('beforeunload', function() {
  $(window).scrollTop(0);
});*/

