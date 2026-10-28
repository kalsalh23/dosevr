import * as THREE from 'three';

export function createCity(scene, materials) {
  const group = new THREE.Group();
  group.name = 'city';

  const skyGeo = new THREE.SphereGeometry(150, 32, 32);
  const skyMat = new THREE.MeshBasicMaterial({ color: 0x87a6c0, side: THREE.BackSide });
  const sky = new THREE.Mesh(skyGeo, skyMat);
  group.add(sky);

  const sun = new THREE.Mesh(new THREE.SphereGeometry(3, 32, 32), new THREE.MeshBasicMaterial({ color: 0xfff4d6 }));
  sun.position.set(40, 60, -50);
  group.add(sun);
  
  const sunLight = new THREE.DirectionalLight(0xfff3dc, 4);
  sunLight.position.set(40, 60, -50);
  sunLight.castShadow = true;
  scene.add(sunLight);

  const clouds = new THREE.Group();
  for (let i = 0; i < 12; i++) {
    const cloud = new THREE.Group();
    const mat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    for (let j = 0; j < 3; j++) {
      const c = new THREE.Mesh(new THREE.SphereGeometry(3, 16, 16), mat);
      c.position.set((Math.random()-0.5)*6, 0, (Math.random()-0.5)*3);
      cloud.add(c);
    }
    cloud.position.set((Math.random()-0.5)*80, 35 + Math.random()*6, (Math.random()-0.5)*60);
    clouds.add(cloud);
  }
  group.add(clouds);

  const road = new THREE.Mesh(new THREE.PlaneGeometry(24, 50), new THREE.MeshStandardMaterial({ color: 0x151515, roughness: 0.98 }));
  road.rotation.x = -Math.PI / 2;
  road.position.set(0, -0.001, 35);
  road.receiveShadow = true;
  group.add(road);

  for (let i = -10; i <= 10; i += 4) {
    const line = new THREE.Mesh(new THREE.PlaneGeometry(2, 0.18), new THREE.MeshBasicMaterial({ color: 0xf5d16e }));
    line.rotation.x = -Math.PI / 2;
    line.position.set(i, 0.002, 35);
    group.add(line);
  }

  const sidewalk = new THREE.Mesh(new THREE.PlaneGeometry(24, 4), new THREE.MeshStandardMaterial({ color: 0xbcb7af, roughness: 0.94 }));
  sidewalk.rotation.x = -Math.PI / 2;
  sidewalk.position.set(0, 0.001, 13);
  sidewalk.receiveShadow = true;
  group.add(sidewalk);

  const curb = new THREE.Mesh(new THREE.PlaneGeometry(24, 0.25), new THREE.MeshStandardMaterial({ color: 0x9a9185, roughness: 0.95 }));
  curb.rotation.x = -Math.PI / 2;
  curb.position.set(0, 0.002, 15);
  group.add(curb);

  function building(x, z, w, h, d, color) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), new THREE.MeshStandardMaterial({ color, roughness: 0.9 }));
    m.position.set(x, h / 2, z);
    m.castShadow = true;
    m.receiveShadow = true;
    group.add(m);
    const frame = new THREE.Mesh(new THREE.BoxGeometry(w + 0.04, h + 0.04, d + 0.04), new THREE.MeshStandardMaterial({ color: 0x121212, roughness: 0.8 }));
    frame.position.set(x, h/2, z);
    group.add(frame);
    const door = new THREE.Mesh(new THREE.PlaneGeometry(1.0, 2.0), new THREE.MeshStandardMaterial({ color: 0x1a1611, roughness: 0.8 }));
    door.position.set(x, 1.0, z + d/2 + 0.012);
    group.add(door);
    const winMat = new THREE.MeshBasicMaterial({ color: 0xfff3dc });
    for (let iy = 1.8; iy < h - 1; iy += 2.0) {
      for (let ix = -w/2 + 0.8; ix < w/2 - 0.8; ix += 1.4) {
        const wwin = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 1.0), winMat);
        wwin.position.set(x + ix, iy, z + d/2 + 0.013);
        group.add(wwin);
      }
    }
  }

  for (let i = -4; i <= 4; i++) {
    building(-18 + i*0.5, 22, 9, 18 + Math.abs(i)*2, 7, 0xc9c3b5);
    building(20 - i*0.5, 26, 10, 20 + Math.abs(i)*2, 8, 0xcac5b7);
  }

  function tree(x,z){
    const g = new THREE.Group();
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.2, 1.6, 12), new THREE.MeshStandardMaterial({ color: 0x7a6742, roughness: 0.8 }));
    trunk.position.y = 0.8;
    g.add(trunk);
    const leaves = new THREE.Mesh(new THREE.SphereGeometry(1.0, 16, 16), new THREE.MeshStandardMaterial({ color: 0x7f8b3b, roughness: 0.9 }));
    leaves.position.y = 1.9;
    g.add(leaves);
    g.position.set(x,0,z);
    group.add(g);
  }
  for (let i = -10; i <= 10; i += 6) {
    tree(i, 14);
  }

  scene.userData.dayNight = { sky, sun, sunLight, night: false };
  scene.add(group);
  return group;
}