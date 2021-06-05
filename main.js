import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

let scene, camera, renderer, controls;

window.onload = init;

// function increase(objectMesh){
//   console.log('here')
//   console.log(objectMesh.position.x)
//   if(objectMesh.position.x <= 50){
//     console.log(objectMesh.position.x)
//     objectMesh.position.x += 1
//     setTimeout(function(){increase(objectMesh)}, 1000)
//   }
// }


function init(){
 scene = new THREE.Scene();

 camera =  new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

 let canvas = document.getElementById('bg')

  // canvas.width = innerWidth
  // canvas.height = innerHeight

  // canvas.style.width = innerWidth
  // canvas.style.height = innerHeight


 renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg')
  });

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.position.setZ(30);

  console.log(renderer)

  renderer.render(scene, camera);

  const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
  const material = new THREE.MeshStandardMaterial({color: 0xFF6347})
  const torus = new THREE.Mesh(geometry, material)

  // scene.add(torus);

  const pointLight = new THREE.PointLight(0xffffff);
  pointLight.position.set(5,5,5)

  const ambientLight = new THREE.AmbientLight(0xffffff)


  scene.add(pointLight, ambientLight)

  const lightHelper = new THREE.PointLightHelper(pointLight)
  const gridHelper = new THREE.GridHelper(200, 50)
  scene.add(lightHelper, gridHelper)

 controls = new OrbitControls(camera, renderer.domElement)

  function addStar(){
    const geometry = new THREE.SphereGeometry(0.2, 24, 24)
    const material = new THREE.MeshStandardMaterial({color: 0xffffff})

    const star = new THREE.Mesh(geometry, material);

    const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))

    star.position.set(x,y,z);
    scene.add(star);
  }

  Array(200).fill().forEach(addStar)

  const spaceTexture = new THREE.TextureLoader().load('space.jpg');
  scene.background = spaceTexture;


  //JUPITER
  // let x = window.screenX;
  console.log(canvas)
  var ctx = canvas.getContext('2d');
  console.log(ctx)


const objects = [
   {
    'x': -55,
    'y': 0,
    'z': -10,
    'image': 'sun.png',
    'name': 'sun',
    'radius': 10,
    'rotationTime': 3000,
    'revolve': false
  },
   {
    'x': 0,
    'y': 0,
    'z': -10,
    'image': 'jupiter.jpeg',
    'name': 'jupiter',
    'radius': 4,
    'rotationTime': 1000,
    'revolve': true
  }
]
objects.forEach(addObjects)

for(let i = 0; i < objectMeshs.length; i++){

  setInterval(function(){
    rotate(objectMeshs[i])
  }, objectMeshs[i].rotationTime) 

  // if(objectMeshs[i].revolve){
  //   setInterval(function(){
  //     revolve(objectMeshs[i])
  //   }, objectMeshs[i].rotationTime) 
    
  // }
}





animate();

}

let body = document.getElementsByTagName('body')[0]
let canvas = document.getElementById('bg');
let main = document.getElementsByTagName('main')[0]

function revolve(objectMesh){
    // console.log(document.body)
    
    let scrollTop =  main.offsetTop;
    // console.log(scrollTop)

    var x = window.scrollX
    console.log(x)

    if(scrollTop == 0){
      objectMesh.position.x = objectMesh.originalX
      objectMesh.position.y = objectMesh.originalY
    }else{
      let length = objectMesh.points.length;

      let points = objectMesh.points;
      
      let per = scrollTop/innerHeight *100;

      let pos = Math.ceil(per/100 *length);

      // console.log(scrollTop, pos, points[pos])

      objectMesh.position.x = points[pos].x
      objectMesh.position.y = points[pos].y



    }
}

function rotate(objectMesh){
    objectMesh.rotation.x +=0.05
    objectMesh.rotation.y +=0.075
    objectMesh.rotation.z += 0.05
}



// var cW = ctx.canvas.width;
// var cH = ctx.canvas.height;

// console.log(cW, cH)



// let cord = canvasPosition.x - canvasPosition.width/2 - 10



// objects.forEach(addObjects)

let objectMeshs = [];

function addObjects(object){
  let img = object.image;
  console.log(object)
  const objectTexture = new THREE.TextureLoader().load(img)
  const normal = new THREE.TextureLoader().load('normal.jpeg')

  const objectMesh = new THREE.Mesh(
    new THREE.SphereGeometry(object.radius, 32, 32),
    new THREE.MeshStandardMaterial({
      map: objectTexture,
      normalMap: normal
    })
  )

  objectMesh.position.x = object.x;
  objectMesh.position.y = object.y;
  objectMesh.position.z = object.z;
  objectMesh.name = object.name
  objectMesh.rotationTime =object.rotationTime
  objectMesh.revolve  = object.revolve;
  objectMesh.radius = object.radius

  objectMesh.originalX = object.x
  objectMesh.originalY = object.y
  objectMesh.originalZ = object.z


  if(objectMesh.revolve){

    let xRadius = Math.abs(-55 + object.x);
    let yRadius = 0

    const curve = new THREE.EllipseCurve(
      -55,  0,            // ax, aY
      xRadius, yRadius,           // xRadius, yRadius
      0,  2 * Math.PI,  // aStartAngle, aEndAngle
      false,            // aClockwise
      0                 // aRotation
    );

    const points = curve.getPoints( 50 );

    objectMesh.points = points
  }

  console.log(objectMesh)

  objectMeshs.push(objectMesh)

  scene.add(objectMesh)
}


function moveCamera(){
  const t =  document.body.getBoundingClientRect().top;
  // console.log(t)

  // jupiter.rotation.x += 0.05;
  // jupiter.rotation.y += 0.075;
  // jupiter.rotation.z += 0.05;

  // camera.position.z = t * -0.01;
  // camera.position.y = t * -0.0002;
  // camera.position.x = t * -0.0002;


for(let i = 0; i < objectMeshs.length; i++){
  if(objectMeshs[i].revolve){
    revolve(objectMeshs[i])
  }
}




}

document.body.onscroll = moveCamera;

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  // init();

  //controls.handleResize();

}

window.addEventListener('resize', onWindowResize, false);


function animate(){
  requestAnimationFrame(animate);

  // torus.rotation.x += 0.01;
  // torus.rotation.y += 0.005;
  // torus.rotation.z += 0.01;

  controls.update

  renderer.render(scene, camera)
}


