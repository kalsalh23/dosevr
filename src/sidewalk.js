import * as THREE from 'three';
import { CONFIG } from './config.js';

export function createSidewalk(scene, materials) {
  const group = new THREE.Group();
  
  const base = new THREE.Mesh(new THREE.PlaneGeometry(CONFIG.facadeWidth + 2, CONFIG.sidewalkDepth), materials.tileGray);
  base.rotation.x = -Math.PI / 2;
  base.position.z = CONFIG.sidewalkDepth / 2 + 0.15;
  base.receiveShadow = true;
  group.add(base);
  
  for (let i = -2.5; i <= 2.5; i += 0.5) {
    const line = new THREE.Mesh(new THREE.PlaneGeometry(0.1, CONFIG.sidewalkDepth - 0.2), materials.tileBeige);
    line.rotation.x = -Math.PI / 2;
    line.position.set(i, 0.002, CONFIG.sidewalkDepth / 2 + 0.15);
    group.add(line);
  }
  
  for (let j = 0.5; j <= CONFIG.sidewalkDepth; j += 0.6) {
    const line2 = new THREE.Mesh(new THREE.PlaneGeometry(CONFIG.facadeWidth + 1.8, 0.08), materials.tileBeige);
    line2.rotation.x = -Math.PI / 2;
    line2.position.set(0, 0.003, j + 0.15);
    group.add(line2);
  }
  
  scene.add(group);
  return group;
}
