import * as THREE from 'three';

export function createFirstPerson(camera, domElement) {
  const velocity = new THREE.Vector3();
  const direction = new THREE.Vector3();
  const keys = {};
  const euler = new THREE.Euler(0,0,0,'YXZ');
  const PI_2 = Math.PI/2;

  document.addEventListener('keydown', (e)=>{ keys[e.code]=true; });
  document.addEventListener('keyup', (e)=>{ keys[e.code]=false; });

  domElement.addEventListener('click', ()=>{
    if (domElement.requestPointerLock) domElement.requestPointerLock();
  });

  document.addEventListener('mousemove', (e)=>{
    if (document.pointerLockElement !== domElement) return;
    const movementX = e.movementX || 0;
    const movementY = e.movementY || 0;
    euler.setFromQuaternion(camera.quaternion);
    euler.y -= movementX * 0.002;
    euler.x -= movementY * 0.002;
    euler.x = Math.max(-PI_2, Math.min(PI_2, euler.x));
    camera.quaternion.setFromEuler(euler);
  });

  function update(delta) {
    velocity.x -= velocity.x * 10 * delta;
    velocity.z -= velocity.z * 10 * delta;
    direction.z = (keys['KeyW']?1:0) - (keys['KeyS']?1:0);
    direction.x = (keys['KeyA']?1:0) - (keys['KeyD']?1:0);
    direction.normalize();
    if (keys['KeyW']||keys['KeyS']) velocity.z -= direction.z * 350 * delta;
    if (keys['KeyA']||keys['KeyD']) velocity.x -= direction.x * 350 * delta;
    camera.translateX(-velocity.x * delta);
    camera.translateZ(velocity.z * delta);
  }

  return { update };
}