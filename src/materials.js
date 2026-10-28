import * as THREE from 'three';

export function createMaterials() {
  const stoneDark = new THREE.MeshStandardMaterial({ color: 0x141414, roughness: 0.92, metalness: 0.02 });
  const stoneFrame = new THREE.MeshStandardMaterial({ color: 0x0f0f0f, roughness: 0.88, metalness: 0.05 });
  const metalDark = new THREE.MeshStandardMaterial({ color: 0x0a0a0a, roughness: 0.35, metalness: 0.85 });
  const metalBrushed = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.4, metalness: 0.7 });
  const glass = new THREE.MeshPhysicalMaterial({ 
    color: 0xf8f7f3, 
    roughness: 0.02, 
    transmission: 0.88, 
    thickness: 0.015, 
    transparent: true, 
    reflectivity: 0.65, 
    ior: 1.52,
    specularIntensity: 1.0
  });
  const concrete = new THREE.MeshStandardMaterial({ color: 0x252525, roughness: 0.95, metalness: 0.0 });
  const tileFloor = new THREE.MeshStandardMaterial({ color: 0xb9b3a6, roughness: 0.75, metalness: 0.0 });
  const woodWalnut = new THREE.MeshStandardMaterial({ color: 0x5a3e26, roughness: 0.65, metalness: 0.0 });
  const woodSlat = new THREE.MeshStandardMaterial({ color: 0x6b4a2e, roughness: 0.62, metalness: 0.0 });
  const counterTop = new THREE.MeshStandardMaterial({ color: 0x151515, roughness: 0.3, metalness: 0.4 });
  const leafGreen = new THREE.MeshStandardMaterial({ color: 0x5f6b24, roughness: 0.88 });
  const plantPot = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, roughness: 0.9 });
  const screenBlue = new THREE.MeshBasicMaterial({ color: 0x1e3a8a });
  const screenLight = new THREE.MeshBasicMaterial({ color: 0xf8fafc });

  return {
    stoneDark,
    stoneFrame,
    metalDark,
    metalBrushed,
    glass,
    concrete,
    tileFloor,
    woodWalnut,
    woodSlat,
    counterTop,
    leafGreen,
    plantPot,
    screenBlue,
    screenLight
  };
}
