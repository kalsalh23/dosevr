import * as THREE from 'three';
import { createColliders } from './collision.js';
import { CONFIG } from './config.js';

export function createFirstPerson(camera, domElement) {
  const velocity = new THREE.Vector3();
  const direction = new THREE.Vector3();
  const keys = {};
  const euler = new THREE.Euler(0, 0, 0, 'YXZ');
  const PI_2 = Math.PI / 2;
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const colliders = createColliders();
  const playerRadius = 0.35;
  const eyeHeight = CONFIG.eyeHeight || 1.65;

  camera.position.set(0, eyeHeight, 4.0);
  camera.rotation.set(0, 0, 0);

  function checkCollision(newPos) {
    if (newPos.y < eyeHeight - 0.1) newPos.y = eyeHeight;
    const playerBox = new THREE.Box3(
      new THREE.Vector3(newPos.x - playerRadius, 0.0, newPos.z - playerRadius),
      new THREE.Vector3(newPos.x + playerRadius, eyeHeight + 0.4, newPos.z + playerRadius)
    );
    for (let i = 0; i < colliders.length; i++) {
      if (colliders[i].intersectsBox(playerBox)) return true;
    }
    if (Math.abs(newPos.x) > 6 || newPos.z > 6 || newPos.z < -9) return true;
    return false;
  }

  document.addEventListener('keydown', (e) => { keys[e.code] = true; });
  document.addEventListener('keyup', (e) => { keys[e.code] = false; });

  if (!isMobile) {
    domElement.addEventListener('click', () => {
      if (domElement.requestPointerLock) domElement.requestPointerLock();
    });
    document.addEventListener('mousemove', (e) => {
      if (document.pointerLockElement !== domElement) return;
      const movementX = e.movementX || 0;
      const movementY = e.movementY || 0;
      euler.setFromQuaternion(camera.quaternion);
      euler.y -= movementX * 0.002;
      euler.x -= movementY * 0.002;
      euler.x = Math.max(-PI_2 * 0.8, Math.min(PI_2 * 0.75, euler.x));
      camera.quaternion.setFromEuler(euler);
    });

    return {
      update: (delta) => {
        velocity.x -= velocity.x * 10 * delta;
        velocity.z -= velocity.z * 10 * delta;
        direction.z = (keys['KeyW'] ? 1 : 0) - (keys['KeyS'] ? 1 : 0);
        direction.x = (keys['KeyA'] ? 1 : 0) - (keys['KeyD'] ? 1 : 0);
        direction.normalize();
        const speed = keys['ShiftLeft'] || keys['ShiftRight'] ? 420 : 320;
        if (keys['KeyW'] || keys['KeyS']) velocity.z -= direction.z * speed * delta;
        if (keys['KeyA'] || keys['KeyD']) velocity.x -= direction.x * speed * delta;
        const oldPos = camera.position.clone();
        camera.translateX(-velocity.x * delta);
        camera.translateZ(velocity.z * delta);
        camera.position.y = eyeHeight;
        if (checkCollision(camera.position)) {
          camera.position.copy(oldPos);
          camera.position.y = eyeHeight;
          velocity.set(0, 0, 0);
        }
      }
    };
  } else {
    const joystick = document.createElement('div');
    joystick.style.cssText = 'position:fixed;bottom:40px;left:40px;width:110px;height:110px;border-radius:50%;background:rgba(255,255,255,0.15);z-index:100;';
    const knob = document.createElement('div');
    knob.style.cssText = 'position:absolute;left:40px;top:40px;width:30px;height:30px;border-radius:50%;background:rgba(255,196,120,0.9);';
    joystick.appendChild(knob);
    document.body.appendChild(joystick);

    const lookPad = document.createElement('div');
    lookPad.style.cssText = 'position:fixed;bottom:40px;right:40px;width:130px;height:130px;border-radius:50%;background:rgba(255,255,255,0.1);z-index:100;';
    document.body.appendChild(lookPad);

    let joyX = 0, joyY = 0, lookX = 0, lookY = 0;
    joystick.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const t = e.touches[0];
      const rect = joystick.getBoundingClientRect();
      const cx = rect.left + 55, cy = rect.top + 55;
      joyX = (t.clientX - cx) / 55;
      joyY = (t.clientY - cy) / 55;
      joyX = Math.max(-1, Math.min(1, joyX));
      joyY = Math.max(-1, Math.min(1, joyY));
      knob.style.left = (40 + joyX * 25) + 'px';
      knob.style.top = (40 + joyY * 25) + 'px';
    });
    joystick.addEventListener('touchend', () => { joyX = 0; joyY = 0; knob.style.left = '40px'; knob.style.top = '40px'; });

    lookPad.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const t = e.touches[0];
      const rect = lookPad.getBoundingClientRect();
      const cx = rect.left + 65, cy = rect.top + 65;
      lookX = (t.clientX - cx) / 65;
      lookY = (t.clientY - cy) / 65;
      lookX = Math.max(-1, Math.min(1, lookX));
      lookY = Math.max(-1, Math.min(1, lookY));
    });
    lookPad.addEventListener('touchend', () => { lookX = 0; lookY = 0; });

    return {
      update: (delta) => {
        velocity.x -= velocity.x * 10 * delta;
        velocity.z -= velocity.z * 10 * delta;
        if (Math.abs(joyY) > 0.1) velocity.z -= joyY * 280 * delta;
        if (Math.abs(joyX) > 0.1) velocity.x -= -joyX * 240 * delta;
        euler.setFromQuaternion(camera.quaternion);
        euler.y -= lookX * 0.04;
        euler.x -= lookY * 0.025;
        euler.x = Math.max(-PI_2 * 0.8, Math.min(PI_2 * 0.75, euler.x));
        camera.quaternion.setFromEuler(euler);
        const oldPos = camera.position.clone();
        camera.translateX(-velocity.x * delta);
        camera.translateZ(velocity.z * delta);
        camera.position.y = eyeHeight;
        if (checkCollision(camera.position)) {
          camera.position.copy(oldPos);
          camera.position.y = eyeHeight;
          velocity.set(0, 0, 0);
        }
      }
    };
  }
}
