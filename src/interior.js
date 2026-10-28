import * as THREE from 'three';
import { CONFIG } from './config.js';

export function createInterior(materials) {
  const group = new THREE.Group();
  group.name = 'InteriorArchitecture';

  // Floor
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(CONFIG.interiorWidth, CONFIG.interiorDepth), materials.tileFloor);
  floor.rotation.x = -Math.PI/2;
  floor.position.z = -CONFIG.interiorDepth / 2 + 0.3;
  floor.receiveShadow = true;
  group.add(floor);

  // Walls
  const wallMat = new THREE.MeshStandardMaterial({ color: 0xe8e4dc, roughness: 0.85 });
  const backWall = new THREE.Mesh(new THREE.BoxGeometry(CONFIG.interiorWidth, CONFIG.interiorHeight, 0.12), wallMat);
  backWall.position.set(0, CONFIG.interiorHeight / 2, -CONFIG.interiorDepth + 0.36);
  backWall.receiveShadow = true;
  group.add(backWall);

  // Green moss wall panels
  const mossMat = new THREE.MeshStandardMaterial({ color: 0x4a5d23, roughness: 0.9 });
  const moss = new THREE.Mesh(new THREE.BoxGeometry(1.8, 2.0, 0.01), mossMat);
  moss.position.set(-1.2, 1.4, -CONFIG.interiorDepth + 0.42);
  group.add(moss);

  // Wooden slats wall
  const slatMat = materials.woodSlat;
  for (let i = 0; i < 12; i++) {
    const slat = new THREE.Mesh(new THREE.BoxGeometry(0.08, 2.2, 0.02), slatMat);
    slat.position.set(-0.1 + i * 0.16, 1.5, -CONFIG.interiorDepth + 0.43);
    group.add(slat);
  }

  // Ceiling
  const ceil = new THREE.Mesh(new THREE.PlaneGeometry(CONFIG.interiorWidth, CONFIG.interiorDepth), new THREE.MeshStandardMaterial({ color: 0xf5f3ef, roughness: 0.9 }));
  ceil.rotation.x = Math.PI/2;
  ceil.position.y = CONFIG.interiorHeight;
  ceil.position.z = -CONFIG.interiorDepth / 2 + 0.3;
  group.add(ceil);

  // Counter
  const counterGroup = new THREE.Group();
  counterGroup.name = 'CoffeeCounter';
  const counterBase = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.9, 0.7), materials.woodWalnut);
  counterBase.position.set(0, 0.45, -CONFIG.interiorDepth + 1.4);
  counterBase.castShadow = true;
  counterBase.receiveShadow = true;
  counterGroup.add(counterBase);
  const counterTop = new THREE.Mesh(new THREE.BoxGeometry(3.3, 0.05, 0.75), materials.counterTop);
  counterTop.position.set(0, 0.925, -CONFIG.interiorDepth + 1.4);
  counterTop.castShadow = true;
  counterGroup.add(counterTop);

  // Under-counter warm light
  const underLight = new THREE.PointLight(0xffb347, 2.2, 3.0);
  underLight.position.set(0, 0.5, -CONFIG.interiorDepth + 1.2);
  counterGroup.add(underLight);

  // Menu screens
  const screenGeo = new THREE.PlaneGeometry(0.9, 0.6);
  const screen1 = new THREE.Mesh(screenGeo, materials.screenBlue);
  screen1.position.set(-0.6, 1.8, -CONFIG.interiorDepth + 1.05);
  counterGroup.add(screen1);
  const screen2 = new THREE.Mesh(screenGeo, materials.screenLight);
  screen2.position.set(0.6, 1.8, -CONFIG.interiorDepth + 1.05);
  counterGroup.add(screen2);
  group.add(counterGroup);

  // Bar stools
  const stoolGroup = new THREE.Group();
  stoolGroup.name = 'Furniture';
  for (let i = -2; i <= 2; i++) {
    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.18, 0.05, 16), materials.metalDark);
    base.position.set(i * 0.55, 0.025, -CONFIG.interiorDepth + 2.0);
    base.castShadow = true;
    stoolGroup.add(base);
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.7, 12), materials.metalDark);
    post.position.set(i * 0.55, 0.4, -CONFIG.interiorDepth + 2.0);
    post.castShadow = true;
    stoolGroup.add(post);
    const seat = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.04, 20), materials.woodWalnut);
    seat.position.set(i * 0.55, 0.78, -CONFIG.interiorDepth + 2.0);
    seat.castShadow = true;
    stoolGroup.add(seat);
  }
  group.add(stoolGroup);

  // Tall plant
  const plantGroup = new THREE.Group();
  plantGroup.name = 'PlantsAndDecor';
  const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.24, 0.5, 24), materials.plantPot);
  pot.position.set(1.8, 0.25, -1.2);
  pot.castShadow = true;
  plantGroup.add(pot);
  const leaves = new THREE.Mesh(new THREE.SphereGeometry(0.6, 20, 20), materials.leafGreen);
  leaves.position.set(1.8, 0.9, -1.2);
  leaves.castShadow = true;
  plantGroup.add(leaves);
  group.add(plantGroup);

  return group;
}
