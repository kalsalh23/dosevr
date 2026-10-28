import * as THREE from 'three';
import { createColliders } from './collision.js';

export function createThirdPersonCamera(camera, domElement) {
  const euler = new THREE.Euler(0, 0, 0, 'YXZ');
  const PI_2 = Math.PI/2;
  const keys = {};
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const colliders = createColliders();
  const playerRadius = 0.35;
  const avatarHeight = 1.8;
  const maxDist = 8;

  function checkCollision(newPos) {
    if (newPos.y < 0.9) newPos.y = 0.9;
    if (newPos.y > 2.2) newPos.y = 0.9;
    const playerBox = new THREE.Box3(
      new THREE.Vector3(newPos.x - playerRadius, 0.1, newPos.z - playerRadius),
      new THREE.Vector3(newPos.x + playerRadius, avatarHeight, newPos.z + playerRadius)
    );
    for (let i = 0; i < colliders.length; i++) {
      if (colliders[i].intersectsBox(playerBox)) return true;
    }
    if (Math.abs(newPos.x) > maxDist || Math.abs(newPos.z) > maxDist) return true;
    return false;
  }

  document.addEventListener('keydown', (e)=>{ keys[e.code]=true; });
  document.addEventListener('keyup', (e)=>{ keys[e.code]=false; });
  
  if (isMobile) {
    const joystick = document.createElement('div');
    joystick.style.cssText = 'position:fixed;bottom:40px;left:40px;width:100px;height:100px;border-radius:50%;background:rgba(255,255,255,0.2);z-index:20;';
    const knob = document.createElement('div');
    knob.style.cssText = 'position:absolute;left:35px;top:35px;width:30px;height:30px;border-radius:50%;background:rgba(255,196,120,0.8);';
    joystick.appendChild(knob);
    document.body.appendChild(joystick);
    
    let joyX=0, joyY=0;
    joystick.addEventListener('touchmove', (e)=>{
      e.preventDefault();
      const t = e.touches[0];
      const rect = joystick.getBoundingClientRect();
      const cx = rect.left + 50, cy = rect.top + 50;
      joyX = (t.clientX - cx)/50;
      joyY = (t.clientY - cy)/50;
      joyX = Math.max(-1,Math.min(1,joyX));
      joyY = Math.max(-1,Math.min(1,joyY));
      knob.style.left = (35 + joyX*25) + 'px';
      knob.style.top = (35 + joyY*25) + 'px';
    });
    joystick.addEventListener('touchend', ()=>{ joyX=0; joyY=0; knob.style.left='35px'; knob.style.top='35px'; });
    return { update: (avatar, delta) => {
      const speed = 2.8;
      const oldPos = avatar.position.clone();
      if (Math.abs(joyY)>0.1) avatar.translateZ(-joyY * speed * delta);
      if (Math.abs(joyX)>0.1) avatar.rotateY(-joyX * 1.8 * delta);
      avatar.position.y = 0.9;
      if (checkCollision(avatar.position)) {
        avatar.position.copy(oldPos);
        avatar.position.y = 0.9;
      }
      const offset = new THREE.Vector3(0, 2.0, 3.6);
      offset.applyMatrix4(avatar.matrixWorld);
      camera.position.lerp(offset, 0.12);
      camera.lookAt(avatar.position.x, avatar.position.y + 1.4, avatar.position.z);
    }};
  }
  
  document.addEventListener('mousemove', (e)=>{
    euler.y -= e.movementX * 0.002;
    euler.x -= e.movementY * 0.002;
    euler.x = Math.max(-0.25, Math.min(0.4, euler.x));
  });
  
  return { update: (avatar, delta) => {
    const speed = 3.0;
    const forward = new THREE.Vector3();
    avatar.getWorldDirection(forward);
    forward.y = 0;
    forward.normalize();
    const right = new THREE.Vector3();
    right.crossVectors(forward, new THREE.Vector3(0,1,0)).normalize();
    
    const oldPos = avatar.position.clone();
    if (keys['KeyW']) avatar.position.addScaledVector(forward, speed * delta);
    if (keys['KeyS']) avatar.position.addScaledVector(forward, -speed * delta);
    if (keys['KeyA']) avatar.position.addScaledVector(right, -speed * delta);
    if (keys['KeyD']) avatar.position.addScaledVector(right, speed * delta);
    
    avatar.position.y = 0.9;
    if (checkCollision(avatar.position)) {
      avatar.position.copy(oldPos);
      avatar.position.y = 0.9;
    }
    
    const offset = new THREE.Vector3(Math.sin(euler.y)*3.6, 2.0 + euler.x*1.6, Math.cos(euler.y)*3.6);
    camera.position.copy(avatar.position).add(offset);
    camera.lookAt(avatar.position.x, avatar.position.y + 1.4, avatar.position.z);
  }};
}