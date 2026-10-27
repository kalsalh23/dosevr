import * as THREE from 'three';
import { CONFIG } from './config.js';

export function createFacade(scene, materials) {
  const group = new THREE.Group();
  
  const wall = new THREE.Mesh(new THREE.BoxGeometry(CONFIG.facadeWidth, CONFIG.facadeHeight, 0.3), materials.stoneDark);
  wall.position.y = CONFIG.facadeHeight / 2;
  wall.castShadow = true;
  wall.receiveShadow = true;
  group.add(wall);
  
  const frame = new THREE.Mesh(new THREE.BoxGeometry(CONFIG.entranceWidth + 0.2, CONFIG.entranceHeight + 0.1, 0.32), materials.stoneFrame);
  frame.position.set(0, CONFIG.entranceHeight / 2, 0.01);
  frame.castShadow = true;
  group.add(frame);
  
  const reveal = new THREE.Mesh(new THREE.BoxGeometry(CONFIG.entranceWidth, CONFIG.entranceHeight, 0.34), materials.stoneDark);
  reveal.position.set(0, CONFIG.entranceHeight / 2, 0.02);
  group.add(reveal);
  
  const doorFrameL = new THREE.Mesh(new THREE.BoxGeometry(0.04, CONFIG.entranceHeight, 0.36), materials.metalDark);
  doorFrameL.position.set(-CONFIG.entranceWidth/2 + 0.02, CONFIG.entranceHeight/2, 0.03);
  group.add(doorFrameL);
  
  const doorFrameR = doorFrameL.clone();
  doorFrameR.position.set(CONFIG.entranceWidth/2 - 0.02, CONFIG.entranceHeight/2, 0.03);
  group.add(doorFrameR);
  
  const doorFrameT = new THREE.Mesh(new THREE.BoxGeometry(CONFIG.entranceWidth - 0.08, 0.04, 0.36), materials.metalDark);
  doorFrameT.position.set(0, CONFIG.entranceHeight - 0.02, 0.03);
  group.add(doorFrameT);
  
  const glassDoor = new THREE.Mesh(new THREE.PlaneGeometry(CONFIG.entranceWidth - 0.08, CONFIG.entranceHeight - 0.08), materials.glass);
  glassDoor.position.set(0, CONFIG.entranceHeight/2, 0.181);
  group.add(glassDoor);
  
  const sidelightL = new THREE.Mesh(new THREE.PlaneGeometry(0.8, CONFIG.entranceHeight - 0.1), materials.glass);
  sidelightL.position.set(-CONFIG.entranceWidth/2 - 0.5, CONFIG.entranceHeight/2, 0.151);
  group.add(sidelightL);
  
  const sidelightR = sidelightL.clone();
  sidelightR.position.set(CONFIG.entranceWidth/2 + 0.5, CONFIG.entranceHeight/2, 0.151);
  group.add(sidelightR);
  
  const canopy = new THREE.Group();
  const canopyBase = new THREE.Mesh(new THREE.BoxGeometry(CONFIG.facadeWidth + 0.4, 0.08, 1.2), materials.metalDark);
  canopyBase.position.set(0, CONFIG.entranceHeight + 0.4, 0.6);
  canopyBase.castShadow = true;
  canopy.add(canopyBase);
  
  const canopyFrame = new THREE.Mesh(new THREE.BoxGeometry(CONFIG.facadeWidth + 0.3, 0.12, 0.08), materials.metalDark);
  canopyFrame.position.set(0, CONFIG.entranceHeight + 0.34, 1.16);
  canopy.add(canopyFrame);
  
  group.add(canopy);
  
  const base = new THREE.Mesh(new THREE.BoxGeometry(CONFIG.facadeWidth + 0.4, 0.15, 0.4), materials.stoneFrame);
  base.position.set(0, 0.075, 0.05);
  group.add(base);
  
  scene.add(group);
  return group;
}
