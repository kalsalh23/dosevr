import * as THREE from 'three';

export function createCity(scene, materials) {
  const group = new THREE.Group();
  group.name = 'city';

  const skyGeo = new THREE.SphereGeometry(90, 32, 32);
  const skyMat = new THREE.MeshBasicMaterial({ color: 0x8fa3b8, side: THREE.BackSide });
  const sky = new THREE.Mesh(skyGeo, skyMat);
  group.add(sky);

  const sun = new THREE.Mesh(new THREE.SphereGeometry(2, 32, 32), new THREE.MeshBasicMaterial({ color: 0xfff3b0 }));
  sun.position.set(20, 40, -30);
  group.add(sun);
  
  const sunLight = new THREE.DirectionalLight(0xfff3dc, 3);
  sunLight.position.set(20, 40, -30);
  sunLight.castShadow = true;
  scene.add(sunLight);

  const clouds = new THREE.Group();
  for (let i = 0; i < 10; i++) {
    const cloud = new THREE.Group();
    const c1 = new THREE.Mesh(new THREE.SphereGeometry(2, 16, 16), new THREE.MeshBasicMaterial({ color: 0xffffff }));
    const c2 = new THREE.Mesh(new THREE.SphereGeometry(1.6, 16, 16), new THREE.MeshBasicMaterial({ color: 0xffffff }));
    const c3 = new THREE.Mesh(new THREE.SphereGeometry(1.8, 16, 16), new THREE.MeshBasicMaterial({ color: 0xffffff }));
    c2.position.x = 1.5; c3.position.x = -1.2;
    cloud.add(c1); cloud.add(c2); cloud.add(c3);
    cloud.position.set((Math.random()-0.5)*60, 30 + Math.random()*4, (Math.random()-0.5)*60);
    clouds.add(cloud);
  }
  group.add(clouds);

  const road = new THREE.Mesh(new THREE.PlaneGeometry(20, 14), new THREE.MeshStandardMaterial({ color: 0x151515, roughness: 0.98 }));
  road.rotation.x = -Math.PI / 2;
  road.position.set(0, -0.001, 17);
  road.receiveShadow = true;
  group.add(road);

  for (let i = -8; i <= 8; i += 4) {
    const line = new THREE.Mesh(new THREE.PlaneGeometry(2, 0.18), new THREE.MeshBasicMaterial({ color: 0xf5d16e }));
    line.rotation.x = -Math.PI / 2;
    line.position.set(i, 0.002, 17);
    group.add(line);
  }

  const sidewalk = new THREE.Mesh(new THREE.PlaneGeometry(20, 3), new THREE.MeshStandardMaterial({ color: 0xbcb7af, roughness: 0.94 }));
  sidewalk.rotation.x = -Math.PI / 2;
  sidewalk.position.set(0, 0.001, 12.8);
  sidewalk.receiveShadow = true;
  group.add(sidewalk);

  const curb = new THREE.Mesh(new THREE.PlaneGeometry(20, 0.2), new THREE.MeshStandardMaterial({ color: 0x9a9185, roughness: 0.95 }));
  curb.rotation.x = -Math.PI / 2;
  curb.position.set(0, 0.002, 14.3);
  group.add(curb);

  function building(x, z, w, h, d, color) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), new THREE.MeshStandardMaterial({ color, roughness: 0.9 }));
    m.position.set(x, h / 2, z);
    m.castShadow = true;
    m.receiveShadow = true;
    group.add(m);
    const frame = new THREE.Mesh(new THREE.BoxGeometry(w + 0.02, h + 0.02, d + 0.02), new THREE.MeshStandardMaterial({ color: 0x151515, roughness: 0.8 }));
    frame.position.set(x, h/2, z);
    group.add(frame);
    const door = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 1.6), new THREE.MeshStandardMaterial({ color: 0x1a1611, roughness: 0.8 }));
    door.position.set(x, 0.8, z + d/2 + 0.011);
    group.add(door);
    const winMat = new THREE.MeshBasicMaterial({ color: 0xfff3dc });
    for (let iy = 1.6; iy < h - 0.5; iy += 1.8) {
      for (let ix = -w/2 + 0.6; ix < w/2 - 0.6; ix += 1.2) {
        const wwin = new THREE.Mesh(new THREE.PlaneGeometry(0.7, 0.9), winMat);
        wwin.position.set(x + ix, iy, z + d/2 + 0.012);
        group.add(wwin);
        const wback = wwin.clone();
        wback.position.z = z - d/2 - 0.012;
        wback.rotation.y = Math.PI;
        group.add(wback);
      }
    }
    const sign = new THREE.Mesh(new THREE.PlaneGeometry(w * 0.6, 0.4), new THREE.MeshBasicMaterial({ color: 0x15110c }));
    sign.position.set(x, h - 0.3, z + d/2 + 0.013);
    group.add(sign);
  }

  building(-14, 14, 7, 12, 6, 0xc9c3b5);
  building(14, 12, 8, 14, 6, 0xcac5b7);
  building(-22, 10, 6, 10, 6, 0xbfbaac);
  building(22, 10, 6, 11, 6, 0xbdb7aa);

  function tree(x,z){
    const g = new THREE.Group();
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.18, 1.4, 12), new THREE.MeshStandardMaterial({ color: 0x7a6742, roughness: 0.8 }));
    trunk.position.y = 0.7;
    g.add(trunk);
    const leaves = new THREE.Mesh(new THREE.SphereGeometry(0.9, 16, 16), new THREE.MeshStandardMaterial({ color: 0x7f8b3b, roughness: 0.9 }));
    leaves.position.y = 1.6;
    g.add(leaves);
    g.position.set(x,0,z);
    group.add(g);
  }
  tree(-10, 12); tree(10, 12); tree(-18, 8); tree(18, 8);

  scene.userData.dayNight = { sky, sun, sunLight, night: false };

  scene.add(group);
  return group;
}