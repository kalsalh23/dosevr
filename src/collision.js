import * as THREE from 'three';

export function createColliders() {
  const colliders = [];
  const addBox = (x,y,z,w,h,d) => {
    const box = new THREE.Box3(
      new THREE.Vector3(x - w/2, y, z - d/2),
      new THREE.Vector3(x + w/2, y + h, z + d/2)
    );
    colliders.push(box);
  };
  // Facade walls
  addBox(0, 0, -0.3, 5.4, 5.0, 0.4);
  addBox(-2.8, 0, -2.0, 0.4, 5.0, 4.0);
  addBox(2.8, 0, -2.0, 0.4, 5.0, 4.0);
  // Counter
  addBox(0, 0, -6.6, 3.4, 1.2, 0.9);
  // Stools area
  addBox(0, 0, -5.7, 3.0, 1.0, 0.6);
  // Plant
  addBox(1.8, 0, -1.2, 0.6, 1.2, 0.6);
  return colliders;
}
