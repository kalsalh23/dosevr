import * as THREE from 'three';
import { CONFIG } from './config.js';

export function createFacade(materials) {
  const group = new THREE.Group();
  group.name = 'ExteriorArchitecture';

  // Main facade wall
  const wall = new THREE.Mesh(new THREE.BoxGeometry(CONFIG.facadeWidth, CONFIG.facadeHeight, 0.32), materials.stoneDark);
  wall.position.y = CONFIG.facadeHeight / 2;
  wall.position.z = -0.16;
  wall.castShadow = true;
  wall.receiveShadow = true;
  group.add(wall);

  // Upper roller-shutter housing
  const shutter = new THREE.Mesh(new THREE.BoxGeometry(CONFIG.facadeWidth + 0.05, 0.8, 0.38), materials.stoneFrame);
  shutter.position.y = CONFIG.facadeHeight - 0.4;
  shutter.position.z = -0.19;
  shutter.castShadow = true;
  group.add(shutter);

  // Horizontal ridges
  for (let i = 0; i < 6; i++) {
    const ridge = new THREE.Mesh(new THREE.BoxGeometry(CONFIG.facadeWidth + 0.06, 0.02, 0.02), materials.metalDark);
    ridge.position.set(0, CONFIG.facadeHeight - 0.7 + i * 0.09, -0.0);
    group.add(ridge);
  }

  // Entrance frame
  const frame = new THREE.Mesh(new THREE.BoxGeometry(CONFIG.entranceWidth + 0.24, CONFIG.entranceHeight + 0.12, 0.36), materials.metalBrushed);
  frame.position.set(0, CONFIG.entranceHeight / 2 + 0.06, -0.02);
  frame.castShadow = true;
  group.add(frame);

  // Glass panel
  const glass = new THREE.Mesh(new THREE.PlaneGeometry(CONFIG.entranceWidth + 0.12, CONFIG.entranceHeight + 0.0), materials.glass);
  glass.position.set(0, CONFIG.entranceHeight / 2 + 0.06, -0.0);
  group.add(glass);

  // Storefront lettering - Coffee Culture Conversation
  const makeText = (txt, y) => {
    const c = document.createElement('canvas'); c.width = 1024; c.height = 256;
    const ctx = c.getContext('2d');
    ctx.clearRect(0,0,1024,256);
    ctx.fillStyle = 'white';
    ctx.font = 'bold 150px Arial, Helvetica, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(255,255,255,0.15)';
    ctx.shadowBlur = 2;
    ctx.fillText(txt, 512, 128);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    const m = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 0.65), new THREE.MeshBasicMaterial({ map: tex, transparent: true }));
    m.position.set(0, y, 0.01);
    group.add(m);
  };
  makeText('Coffee', CONFIG.entranceHeight + 0.9);
  makeText('Culture', CONFIG.entranceHeight + 0.2);
  makeText('Conversation', CONFIG.entranceHeight - 0.5);

  // Circular sign on right
  const sign = new THREE.Mesh(new THREE.CircleGeometry(0.42, 32), new THREE.MeshBasicMaterial({ color: 0x4fc3f7 }));
  sign.position.set(CONFIG.facadeWidth/2 - 0.6, CONFIG.entranceHeight + 0.3, 0.02);
  group.add(sign);

  // Canopy housing with foliage
  const canopy = new THREE.Group();
  const housing = new THREE.Mesh(new THREE.BoxGeometry(CONFIG.facadeWidth + 0.4, 0.32, 0.6), materials.metalDark);
  housing.position.set(0, CONFIG.facadeHeight - 0.5, 0.28);
  housing.castShadow = true;
  canopy.add(housing);

  const fol = new THREE.Mesh(new THREE.BoxGeometry(CONFIG.facadeWidth + 0.5, 0.38, 0.7), materials.leafGreen);
  fol.position.set(0, CONFIG.facadeHeight - 0.16, 0.28);
  fol.castShadow = true;
  canopy.add(fol);
  group.add(canopy);

  // Pavement
  const paveMat = new THREE.MeshStandardMaterial({ color: 0x353535, roughness: 0.92 });
  const pave = new THREE.Mesh(new THREE.PlaneGeometry(CONFIG.facadeWidth + 6, CONFIG.sidewalkDepth), paveMat);
  pave.rotation.x = -Math.PI/2;
  pave.position.set(0, -0.01, CONFIG.sidewalkDepth / 2 - 0.2);
  pave.receiveShadow = true;
  group.add(pave);
  for (let i = -3; i <= 3; i++) {
    const strip = new THREE.Mesh(new THREE.PlaneGeometry(CONFIG.facadeWidth + 6, 0.09), new THREE.MeshStandardMaterial({ color: 0x9b8a6a, roughness: 0.78 }));
    strip.rotation.x = -Math.PI/2;
    strip.position.set(0, 0.001, CONFIG.sidewalkDepth / 2 - 0.2 + i * 0.5);
    strip.receiveShadow = true;
    group.add(strip);
  }

  return group;
}
