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
  for (let i = 0; i < 12; i++) {
    const cloud = new THREE.Group();
    const c1 = new THREE.Mesh(new THREE.SphereGeometry(2, 16, 16), new THREE.MeshBasicMaterial({ color: 0xffffff }));
    const c2 = new THREE.Mesh(new THREE.SphereGeometry(1.6, 16, 16), new THREE.MeshBasicMaterial({ color: 0xffffff }));
    const c3 = new THREE.Mesh(new THREE.SphereGeometry(1.8, 16, 16), new THREE.MeshBasicMaterial({ color: 0xffffff }));
    c2.position.x = 1.5;
    c3.position.x = -1.2;
    cloud.add(c1); cloud.add(c2); cloud.add(c3);
    cloud.position.set((Math.random()-0.5)*60, 30 + Math.random()*5, (Math.random()-0.5)*60);
    clouds.add(cloud);
  }
  group.add(clouds);

  const road = new THREE.Mesh(new THREE.PlaneGeometry(16, 14), new THREE.MeshStandardMaterial({ color: 0x1f1f1f, roughness: 0.95 }));
  road.rotation.x = -Math.PI / 2;
  road.position.set(0, -0.001, 16);
  road.receiveShadow = true;
  group.add(road);

  for (let i = -6; i <= 6; i += 4) {
    const line = new THREE.Mesh(new THREE.PlaneGeometry(2, 0.18), new THREE.MeshBasicMaterial({ color: 0xf5d16e }));
    line.rotation.x = -Math.PI / 2;
    line.position.set(i, 0.002, 16);
    group.add(line);
  }

  const sidewalk = new THREE.Mesh(new THREE.PlaneGeometry(16, 5), new THREE.MeshStandardMaterial({ color: 0xbcb7af, roughness: 0.94 }));
  sidewalk.rotation.x = -Math.PI / 2;
  sidewalk.position.set(0, 0.001, 12.5);
  sidewalk.receiveShadow = true;
  group.add(sidewalk);

  function building(x, z, w, h, d, color) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), new THREE.MeshStandardMaterial({ color, roughness: 0.9 }));
    m.position.set(x, h / 2, z);
    m.castShadow = true;
    m.receiveShadow = true;
    group.add(m);
    const winMat = new THREE.MeshBasicMaterial({ color: 0xfff3dc });
    for (let iy = 2; iy < h - 1; iy += 2.2) {
      for (let ix = -w/2 + 0.8; ix < w/2 - 0.8; ix += 1.6) {
        const wwin = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 1.1), winMat);
        wwin.position.set(x + ix, iy, z + d/2 + 0.001);
        group.add(wwin);
      }
    }
  }

  building(-12, 14, 6, 12, 5, 0xc9c3b5);
  building(12, 12, 7, 14, 5, 0xcac5b7);
  building(-20, 10, 6, 10, 5, 0xbfbaac);

  scene.userData.dayNight = { sky, sun, sunLight, night: false };

  scene.add(group);
  return group;
}