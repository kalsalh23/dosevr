import * as THREE from 'three';

export function createColliders() {
  const colliders = [];
  const addBox = (x,y,z,w,h,d) => {
    const box = new THREE.Box3(new THREE.Vector3(x-w/2,y-h/2,z-d/2), new THREE.Vector3(x+w/2,y+h/2,z+d/2));
    colliders.push(box);
  };
  addBox(0,1.6,-0.15,5.0,3.2,0.1);
  addBox(-2.5,1.6,-3.65,0.1,3.2,7.0);
  addBox(2.5,1.6,-3.65,0.1,3.2,7.0);
  addBox(0,1.6,-7.0,5.0,3.2,0.1);
  addBox(0,0.6,-5.9,3.8,1.2,1.0);
  addBox(-1.8,0.5,-1.6,1.0,1.0,1.0);
  addBox(1.6,0.5,-1.4,1.0,1.0,1.0);
  addBox(-0.4,0.5,-0.6,1.0,1.0,1.0);
  addBox(-2.0,0.3,-0.4,0.5,0.6,0.5);
  return colliders;
}