import * as THREE from 'three';

export function createFirstPerson(camera, domElement) {
  const velocity = new THREE.Vector3();
  const direction = new THREE.Vector3();
  const keys = {};
  const euler = new THREE.Euler(0,0,0,'YXZ');
  const PI_2 = Math.PI/2;
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  document.addEventListener('keydown', (e)=>{ keys[e.code]=true; });
  document.addEventListener('keyup', (e)=>{ keys[e.code]=false; });

  if (!isMobile) {
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
  } else {
    const joystick = document.createElement('div');
    joystick.style.cssText = 'position:fixed;bottom:40px;left:40px;width:100px;height:100px;border-radius:50%;background:rgba(255,255,255,0.2);z-index:20;';
    const knob = document.createElement('div');
    knob.style.cssText = 'position:absolute;left:35px;top:35px;width:30px;height:30px;border-radius:50%;background:rgba(255,196,120,0.8);';
    joystick.appendChild(knob);
    document.body.appendChild(joystick);
    
    const lookPad = document.createElement('div');
    lookPad.style.cssText = 'position:fixed;bottom:40px;right:40px;width:120px;height:120px;border-radius:50%;background:rgba(255,255,255,0.1);z-index:20;';
    document.body.appendChild(lookPad);
    
    let joyX=0, joyY=0, lookX=0, lookY=0;
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
    
    lookPad.addEventListener('touchmove', (e)=>{
      e.preventDefault();
      const t = e.touches[0];
      const rect = lookPad.getBoundingClientRect();
      const cx = rect.left + 60, cy = rect.top + 60;
      lookX = (t.clientX - cx)/60;
      lookY = (t.clientY - cy)/60;
      lookX = Math.max(-1,Math.min(1,lookX));
      lookY = Math.max(-1,Math.min(1,lookY));
    });
    lookPad.addEventListener('touchend', ()=>{ lookX=0; lookY=0; });
    
    return {
      update: (delta) => {
        velocity.x -= velocity.x * 10 * delta;
        velocity.z -= velocity.z * 10 * delta;
        if (Math.abs(joyY)>0.1) velocity.z -= joyY * 350 * delta;
        if (Math.abs(joyX)>0.1) velocity.x -= -joyX * 250 * delta;
        euler.setFromQuaternion(camera.quaternion);
        euler.y -= lookX * 0.05;
        euler.x -= lookY * 0.03;
        euler.x = Math.max(-PI_2, Math.min(PI_2, euler.x));
        camera.quaternion.setFromEuler(euler);
        camera.translateX(-velocity.x * delta);
        camera.translateZ(velocity.z * delta);
      }
    };
  }

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