import * as THREE from 'three';

export function createAvatar() {
  const group = new THREE.Group();
  
  const skin = new THREE.MeshStandardMaterial({ color: 0xc9a07a, roughness: 0.6 });
  const shirt = new THREE.MeshStandardMaterial({ color: 0x8f6b3a, roughness: 0.8 });
  const pants = new THREE.MeshStandardMaterial({ color: 0x5a4630, roughness: 0.85 });
  const shoes = new THREE.MeshStandardMaterial({ color: 0x2b2218, roughness: 0.7 });
  const hair = new THREE.MeshStandardMaterial({ color: 0x2a1f16, roughness: 0.9 });
  
  const hips = new THREE.Group();
  group.add(hips);
  
  const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.19, 0.6, 20), shirt);
  torso.position.y = 1.0;
  torso.castShadow = true;
  hips.add(torso);
  
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.062, 0.09, 16), skin);
  neck.position.y = 1.34;
  hips.add(neck);
  
  const head = new THREE.Group();
  head.position.y = 1.44;
  hips.add(head);
  
  const skull = new THREE.Mesh(new THREE.SphereGeometry(0.118, 24, 24), skin);
  skull.scale.set(1, 1.08, 0.98);
  skull.castShadow = true;
  head.add(skull);
  
  const nose = new THREE.Mesh(new THREE.ConeGeometry(0.016, 0.05, 14), skin);
  nose.rotation.x = Math.PI/2;
  nose.position.set(0, 0, -0.12);
  head.add(nose);
  
  const eyeL = new THREE.Mesh(new THREE.SphereGeometry(0.012, 16, 16), new THREE.MeshBasicMaterial({ color: 0x15110c }));
  eyeL.position.set(0.038, 0, -0.108);
  head.add(eyeL);
  const eyeR = eyeL.clone();
  eyeR.position.set(-0.038, 0, -0.108);
  head.add(eyeR);
  
  const browL = new THREE.Mesh(new THREE.BoxGeometry(0.028, 0.01, 0.01), new THREE.MeshStandardMaterial({ color: 0x241b14 }));
  browL.position.set(0.03, 0.012, -0.114);
  head.add(browL);
  const browR = browL.clone();
  browR.position.set(-0.03, 0.012, -0.114);
  head.add(browR);
  
  const hairMesh = new THREE.Mesh(new THREE.SphereGeometry(0.126, 22, 22), hair);
  hairMesh.scale.set(1, 0.9, 0.88);
  hairMesh.position.y = 0.012;
  hairMesh.position.z = 0.014;
  head.add(hairMesh);
  
  const armL = new THREE.Group();
  armL.position.set(0.24, 1.18, 0);
  hips.add(armL);
  const uaL = new THREE.Mesh(new THREE.CylinderGeometry(0.048, 0.052, 0.42, 16), shirt);
  uaL.rotation.z = Math.PI/2;
  uaL.position.x = 0.21;
  armL.add(uaL);
  const laL = new THREE.Mesh(new THREE.CylinderGeometry(0.042, 0.046, 0.38, 16), skin);
  laL.rotation.z = Math.PI/2;
  laL.position.x = 0.58;
  armL.add(laL);
  
  const armR = armL.clone();
  armR.position.set(-0.24, 1.18, 0);
  armR.rotation.y = Math.PI;
  hips.add(armR);
  
  const legL = new THREE.Group();
  legL.position.set(0.09, 0.72, 0);
  hips.add(legL);
  const ulL = new THREE.Mesh(new THREE.CylinderGeometry(0.056, 0.062, 0.52, 18), pants);
  ulL.position.y = -0.26;
  legL.add(ulL);
  const llL = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.056, 0.48, 18), pants);
  llL.position.y = -0.74;
  legL.add(llL);
  const shoeL = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.05, 0.14), shoes);
  shoeL.position.set(0, -1.0, 0.02);
  legL.add(shoeL);
  
  const legR = legL.clone();
  legR.position.set(-0.09, 0.72, 0);
  hips.add(legR);
  
  group.position.y = 0;
  group.traverse((obj) => { if (obj.isMesh) obj.castShadow = true; });
  return group;
}