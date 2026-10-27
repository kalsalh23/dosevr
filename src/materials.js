import * as THREE from 'three';

export function createMaterials() {
  return {
    stoneDark: new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.9, metalness: 0.05 }),
    stoneFrame: new THREE.MeshStandardMaterial({ color: 0x151515, roughness: 0.8, metalness: 0.1 }),
    metalDark: new THREE.MeshStandardMaterial({ color: 0x0f0f0f, roughness: 0.4, metalness: 0.8 }),
    metalWarm: new THREE.MeshStandardMaterial({ color: 0xb99a5d, roughness: 0.3, metalness: 0.6 }),
    glass: new THREE.MeshPhysicalMaterial({ color: 0xf7f4ee, roughness: 0.05, transmission: 0.8, thickness: 0.02, transparent: true, reflectivity: 0.6, ior: 1.45 }),
    concrete: new THREE.MeshStandardMaterial({ color: 0x2a2a2a, roughness: 0.95 }),
    tileGray: new THREE.MeshStandardMaterial({ color: 0x3a3a3a, roughness: 0.9 }),
    tileBeige: new THREE.MeshStandardMaterial({ color: 0x6b5d4a, roughness: 0.9 }),
    woodDark: new THREE.MeshStandardMaterial({ color: 0x3a2a1a, roughness: 0.6 }),
    leafGreen: new THREE.MeshStandardMaterial({ color: 0x6b7a2a, roughness: 0.9 }),
    leafDark: new THREE.MeshStandardMaterial({ color: 0x5a6622, roughness: 0.9 })
  };
}
