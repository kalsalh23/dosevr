import * as THREE from 'three';
import { CONFIG } from './config.js';

export function createDecorations(scene, materials) {
  const group = new THREE.Group();
  
  const canopy = group;
  
  function createBush(x, z, scale) {
    const bush = new THREE.Group();
    const geo = new THREE.IcosahedronGeometry(0.25 * scale, 0);
    const m1 = new THREE.Mesh(geo, materials.leafGreen);
    m1.position.y = 0.15;
    m1.castShadow = true;
    bush.add(m1);
    const m2 = new THREE.Mesh(new THREE.IcosahedronGeometry(0.18 * scale, 0), materials.leafDark);
    m2.position.set(0.1, 0.2, 0.05);
    bush.add(m2);
    const m3 = new THREE.Mesh(new THREE.IcosahedronGeometry(0.16 * scale, 0), materials.leafGreen);
    m3.position.set(-0.12, 0.22, -0.04);
    bush.add(m3);
    bush.position.set(x, CONFIG.entranceHeight + 0.46, z);
    canopy.add(bush);
  }
  
  for (let i = -2.2; i <= 2.2; i += 0.4) {
    createBush(i + (Math.random()-0.5)*0.1, 0.7 + Math.random()*0.2, 0.8 + Math.random()*0.4);
  }
  
  for (let i = -2.0; i <= 2.0; i += 0.6) {
    createBush(i, 0.9, 0.6);
  }
  
  const vine = new THREE.Group();
  for (let i = -2.3; i <= 2.3; i += 0.3) {
    const strand = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.8, 6), materials.woodDark);
    strand.position.set(i, CONFIG.entranceHeight + 0.2, 1.0);
    strand.rotation.x = Math.PI / 6;
    vine.add(strand);
  }
  canopy.add(vine);
  
  const lightStrip = new THREE.Group();
  for (let i = -2.4; i <= 2.4; i += 0.2) {
    const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.015, 12, 12), new THREE.MeshBasicMaterial({ color: 0xffb87a }));
    bulb.position.set(i, CONFIG.entranceHeight + 0.38, 1.18);
    lightStrip.add(bulb);
  }
  canopy.add(lightStrip);
  
  scene.add(group);
  return group;
}
