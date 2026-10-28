import * as THREE from 'three';

export function createAvatar() {
  const group = new THREE.Group();
  const skin = new THREE.MeshStandardMaterial({ color: 0xc9a07a, roughness: 0.5 });
  const shirt = new THREE.MeshStandardMaterial({ color: 0x2b6cb0, roughness: 0.7 });
  const pants = new THREE.MeshStandardMaterial({ color: 0x1a202c, roughness: 0.85 });
  const shoes = new THREE.MeshStandardMaterial({ color: 0x111, roughness: 0.6 });
  const hair = new THREE.MeshStandardMaterial({ color: 0x2a1f16, roughness: 0.9 });

  const hips = new THREE.Group(); group.add(hips);

  const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.2, 0.62, 24), shirt);
  torso.position.y = 0.31; hips.add(torso);

  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.06, 0.1, 16), skin);
  neck.position.y = 0.68; hips.add(neck);

  const head = new THREE.Group(); head.position.y = 0.78; hips.add(head);
  const skull = new THREE.Mesh(new THREE.SphereGeometry(0.12, 32, 32), skin);
  skull.scale.set(1, 1.1, 1); head.add(skull);
  const nose = new THREE.Mesh(new THREE.ConeGeometry(0.014, 0.045, 12), skin);
  nose.rotation.x = Math.PI/2; nose.position.set(0, -0.01, -0.12); head.add(nose);
  const eyeL = new THREE.Mesh(new THREE.SphereGeometry(0.011, 16, 16), new THREE.MeshBasicMaterial({ color: 0x111 }));
  eyeL.position.set(0.038, 0.01, -0.11); head.add(eyeL);
  const eyeR = eyeL.clone(); eyeR.position.x = -0.038; head.add(eyeR);
  const hairM = new THREE.Mesh(new THREE.SphereGeometry(0.128, 24, 24), hair);
  hairM.scale.set(1, 0.85, 0.9); hairM.position.y = 0.02; head.add(hairM);

  function makeArm(side) {
    const shoulder = new THREE.Group(); shoulder.position.set(side*0.22, 0.55, 0); hips.add(shoulder);
    const ua = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.05, 0.4, 16), shirt);
    ua.position.y = -0.2; shoulder.add(ua);
    const elbow = new THREE.Group(); elbow.position.y = -0.4; shoulder.add(elbow);
    const la = new THREE.Mesh(new THREE.CylinderGeometry(0.038, 0.042, 0.38, 16), skin);
    la.position.y = -0.19; elbow.add(la);
    const hand = new THREE.Mesh(new THREE.SphereGeometry(0.04, 16, 16), skin);
    hand.position.y = -0.4; elbow.add(hand);
    return { shoulder, elbow };
  }
  const armL = makeArm(1);
  const armR = makeArm(-1);

  function makeLeg(side) {
    const hip = new THREE.Group(); hip.position.set(side*0.09, 0, 0); hips.add(hip);
    const ul = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.065, 0.5, 18), pants);
    ul.position.y = -0.25; hip.add(ul);
    const knee = new THREE.Group(); knee.position.y = -0.5; hip.add(knee);
    const ll = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.055, 0.48, 18), pants);
    ll.position.y = -0.24; knee.add(ll);
    const shoe = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.05, 0.16), shoes);
    shoe.position.set(0, -0.5, 0.03); knee.add(shoe);
    return { hip, knee };
  }
  const legL = makeLeg(1);
  const legR = makeLeg(-1);

  group.traverse(o => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });

  let t = 0;
  group.userData.animate = (delta, moving, gesture) => {
    t += delta;
    // idle sway
    hips.rotation.y = Math.sin(t*0.6)*0.05;
    head.rotation.y = Math.sin(t*0.8)*0.15;
    head.rotation.x = Math.sin(t*0.5)*0.05;
    if (moving) {
      const s = t*8;
      legL.hip.rotation.x = Math.sin(s)*0.6;
      legR.hip.rotation.x = Math.sin(s+Math.PI)*0.6;
      legL.knee.rotation.x = Math.max(0, Math.sin(s))*0.9;
      legR.knee.rotation.x = Math.max(0, Math.sin(s+Math.PI))*0.9;
      armL.shoulder.rotation.x = Math.sin(s+Math.PI)*0.5;
      armR.shoulder.rotation.x = Math.sin(s)*0.5;
      hips.position.y = Math.abs(Math.sin(s))*0.06;
    } else {
      legL.hip.rotation.x *= 0.85; legR.hip.rotation.x *= 0.85;
      legL.knee.rotation.x *= 0.85; legR.knee.rotation.x *= 0.85;
      armL.shoulder.rotation.x *= 0.85; armR.shoulder.rotation.x *= 0.85;
      hips.position.y *= 0.85;
    }
    // gesture: wave
    if (gesture === 'wave') {
      armR.shoulder.rotation.z = -1.4 + Math.sin(t*6)*0.3;
      armR.elbow.rotation.x = -0.6;
    } else {
      armR.shoulder.rotation.z *= 0.85;
      armR.elbow.rotation.x *= 0.85;
    }
  };
  return group;
}
