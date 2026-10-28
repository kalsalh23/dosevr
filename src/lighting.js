import * as THREE from 'three';
import { CONFIG } from './config.js';

export function createLighting() {
  const group = new THREE.Group();
  group.name = 'Lighting';

  const ambient = new THREE.AmbientLight(0xfff4e6, 0.6);
  group.add(ambient);

  const interior = new THREE.PointLight(0xffb87a, 4.5, 12);
  interior.position.set(0, CONFIG.interiorHeight - 0.6, -3);
  interior.castShadow = true;
  group.add(interior);

  const entranceWarm = new THREE.PointLight(0xffa94d, 3.5, 6);
  entranceWarm.position.set(0, 2.4, -0.4);
  group.add(entranceWarm);

  const signCyan = new THREE.PointLight(0x4fc3f7, 2.0, 4);
  signCyan.position.set(CONFIG.facadeWidth/2 - 0.6, CONFIG.entranceHeight + 0.3, 0.5);
  group.add(signCyan);

  return group;
}
