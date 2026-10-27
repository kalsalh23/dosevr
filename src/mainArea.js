import * as THREE from 'three';
import { CONFIG } from './config.js';

export function createMain() {
  const group = new THREE.Group();
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(20, 3), new THREE.MeshStandardMaterial({ color: 0xbcb7af, roughness: 0.94 }));
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(0, 0.001, 12.8);
  group.add(floor);
  return group;
}