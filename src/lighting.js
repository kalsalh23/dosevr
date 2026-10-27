import * as THREE from 'three';

export function createLighting(scene) {
  const group = new THREE.Group();
  
  const hemi = new THREE.HemisphereLight(0xfff3e6, 0x1a1a1a, 4);
  scene.add(hemi);
  
  const dir = new THREE.DirectionalLight(0xffb87a, 2.5);
  dir.position.set(8, 10, 6);
  dir.castShadow = true;
  dir.shadow.mapSize.set(2048, 2048);
  dir.shadow.camera.near = 1;
  dir.shadow.camera.far = 20;
  dir.shadow.camera.left = -6;
  dir.shadow.camera.right = 6;
  dir.shadow.camera.top = 6;
  dir.shadow.camera.bottom = -4;
  scene.add(dir);
  
  const warm1 = new THREE.PointLight(0xff9f40, 4, 4, 2);
  warm1.position.set(-2, 3, 1.2);
  warm1.castShadow = true;
  scene.add(warm1);
  
  const warm2 = new THREE.PointLight(0xff9f40, 4, 4, 2);
  warm2.position.set(2, 3, 1.2);
  warm2.castShadow = true;
  scene.add(warm2);
  
  const warm3 = new THREE.PointLight(0xffb87a, 3, 3, 2);
  warm3.position.set(0, 2.6, 1.4);
  scene.add(warm3);
  
  return group;
}
