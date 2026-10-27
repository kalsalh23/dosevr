import * as THREE from 'three';
import { createMaterials } from './materials.js';
import { createFacade } from './facade.js';
import { createDecorations } from './decorations.js';
import { createSignage } from './signage.js';
import { createSidewalk } from './sidewalk.js';
import { createLighting } from './lighting.js';
import { createInterior } from './interior.js';
import { createColliders } from './collision.js';
import { createFirstPerson } from './controlsFirstPerson.js';
import { createCity } from './city.js';
import { createDoorPrompt } from './doorPrompt.js';
import { createProductUI } from './productUI.js';
import { createDayNightUI } from './dayNightUI.js';
import { CONFIG } from './config.js';

const canvas = document.getElementById('webgl');
const resetBtn = document.getElementById('resetCam');

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x8fa3b8);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.12;
renderer.outputColorSpace = THREE.SRGBColorSpace;

const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x8fa3b8, 10, 18);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 40);
camera.position.set(0, CONFIG.eyeHeight, 3.5);

const materials = createMaterials();
createFacade(scene, materials);
createDecorations(scene, materials);
createSignage(scene, materials);
createSidewalk(scene, materials);
createLighting(scene);
createCity(scene, materials);
createDayNightUI(scene);

const interiorGroup = createInterior(scene, materials);
interiorGroup.visible = false;

const colliders = [];
const addBox = (x,y,z,w,h,d) => {
  const box = new THREE.Box3(new THREE.Vector3(x-w/2,y-h/2,z-d/2), new THREE.Vector3(x+w/2,y+h/2,z+d/2));
  colliders.push(box);
};
addBox(0,1.6,-0.15,5.0,3.2,0.1);
addBox(-2.5,1.6,-3.65,0.1,3.2,7.0);
addBox(2.5,1.6,-3.65,0.1,3.2,7.0);
addBox(0,1.6,-7.0,5.0,3.2,0.1);
addBox(0,0.6,-5.9,3.8,1.2,1.0);
addBox(-1.8,0.5,-1.6,1.0,1.0,1.0);
addBox(1.6,0.5,-1.4,1.0,1.0,1.0);
addBox(-0.4,0.5,-0.6,1.0,1.0,1.0);
addBox(-2.0,0.3,-0.4,0.5,0.6,0.5);
addBox(-CONFIG.interiorWidth/2+0.2,1.3,-1.2,0.4,2.6,2.6);
addBox(CONFIG.interiorWidth/2-0.2,1.3,-1.2,0.4,2.6,2.6);

const controlsFP = createFirstPerson(camera, renderer.domElement);
const prevPos = camera.position.clone();
const productUI = createProductUI();

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

let inInterior = false;
const doorPrompt = createDoorPrompt(camera, renderer.domElement, () => {
  inInterior = true;
  interiorGroup.visible = true;
  camera.position.set(0, CONFIG.eyeHeight, -1.5);
  camera.rotation.set(0, Math.PI, 0);
  prevPos.copy(camera.position);
  scene.fog.color.set(0x15100b);
  renderer.setClearColor(0x15100b);
});

resetBtn.addEventListener('click', () => {
  inInterior = false;
  interiorGroup.visible = false;
  camera.position.set(0, CONFIG.eyeHeight, 3.5);
  camera.rotation.set(0,0,0);
  prevPos.copy(camera.position);
  scene.fog.color.set(0x8fa3b8);
  renderer.setClearColor(0x8fa3b8);
});

canvas.addEventListener('click', (e) => {
  if (!inInterior) return;
  if (document.pointerLockElement) return;
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = - (e.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const products = interiorGroup.userData.products || [];
  const intersects = raycaster.intersectObjects(products);
  if (intersects.length > 0) {
    const p = intersects[0].object;
    if (p.userData.type === 'product') {
      productUI.show(p.userData.name, p.userData.price);
    }
  }
});

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onResize);

const clock = new THREE.Clock();
function animate() {
  const delta = clock.getDelta();
  prevPos.copy(camera.position);
  controlsFP.update(delta);
  const box = new THREE.Box3(
    new THREE.Vector3(camera.position.x-0.4, camera.position.y-0.9, camera.position.z-0.4),
    new THREE.Vector3(camera.position.x+0.4, camera.position.y-0.2, camera.position.z+0.4)
  );
  for (let i=0;i<colliders.length;i++) {
    if (box.intersectsBox(colliders[i])) {
      camera.position.copy(prevPos);
      break;
    }
  }
  if (!inInterior) {
    doorPrompt.update(camera.position);
    if (camera.position.z < -0.5) camera.position.copy(prevPos);
    if (camera.position.z > 4.2) camera.position.copy(prevPos);
    if (Math.abs(camera.position.x) > 3.2) camera.position.copy(prevPos);
  }
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();