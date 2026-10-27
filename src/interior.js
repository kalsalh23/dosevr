import * as THREE from 'three';
import { CONFIG } from './config.js';

export function createInterior(scene, materials) {
  const group = new THREE.Group();
  group.name = 'interior';
  group.userData.products = [];

  const floor = new THREE.Mesh(new THREE.PlaneGeometry(CONFIG.interiorWidth, CONFIG.interiorDepth), new THREE.MeshStandardMaterial({ color: 0xb99d6a, roughness: 0.7, metalness: 0.05 }));
  floor.rotation.x = -Math.PI / 2;
  floor.position.set(0, 0.01, - (CONFIG.interiorDepth / 2 + 0.15));
  floor.receiveShadow = true;
  group.add(floor);

  const wallBack = new THREE.Mesh(new THREE.PlaneGeometry(CONFIG.interiorWidth, CONFIG.interiorHeight), new THREE.MeshStandardMaterial({ color: 0x15110c, roughness: 0.9 }));
  wallBack.position.set(0, CONFIG.interiorHeight / 2, - (CONFIG.interiorDepth + 0.15));
  wallBack.receiveShadow = true;
  group.add(wallBack);

  const wallLeft = new THREE.Mesh(new THREE.PlaneGeometry(CONFIG.interiorDepth + 0.3, CONFIG.interiorHeight), new THREE.MeshStandardMaterial({ color: 0x1a1611, roughness: 0.9 }));
  wallLeft.rotation.y = Math.PI / 2;
  wallLeft.position.set(-CONFIG.interiorWidth / 2, CONFIG.interiorHeight / 2, - (CONFIG.interiorDepth / 2 + 0.15));
  wallLeft.receiveShadow = true;
  group.add(wallLeft);

  const wallRight = wallLeft.clone();
  wallRight.rotation.y = -Math.PI / 2;
  wallRight.position.set(CONFIG.interiorWidth / 2, CONFIG.interiorHeight / 2, - (CONFIG.interiorDepth / 2 + 0.15));
  group.add(wallRight);

  const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(CONFIG.interiorWidth, CONFIG.interiorDepth + 0.3), new THREE.MeshStandardMaterial({ color: 0x18120d, roughness: 1 }));
  ceiling.rotation.x = Math.PI / 2;
  ceiling.position.set(0, CONFIG.interiorHeight, - (CONFIG.interiorDepth / 2 + 0.15));
  group.add(ceiling);

  function pendant(x, z) {
    const g = new THREE.Group();
    const cord = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.8, 10), new THREE.MeshStandardMaterial({ color: 0x312419 }));
    cord.position.y = CONFIG.interiorHeight - 0.4;
    g.add(cord);
    const shade = new THREE.Mesh(new THREE.ConeGeometry(0.24, 0.16, 24), new THREE.MeshStandardMaterial({ color: 0x2e261d, roughness: 0.46 }));
    shade.position.y = CONFIG.interiorHeight - 0.48;
    shade.rotation.x = Math.PI;
    g.add(shade);
    const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.05, 16, 16), new THREE.MeshBasicMaterial({ color: 0xffb75e }));
    bulb.position.y = CONFIG.interiorHeight - 0.54;
    g.add(bulb);
    const light = new THREE.PointLight(0xffb75e, 5.2, 5.4, 2);
    light.position.y = CONFIG.interiorHeight - 0.56;
    light.castShadow = true;
    g.add(light);
    g.position.set(x, 0, z);
    group.add(g);
  }
  pendant(-1.5, -1.2); pendant(0, -1.8); pendant(1.5, -1.2);

  const barGroup = new THREE.Group();
  const barBase = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.98, 0.92), new THREE.MeshStandardMaterial({ color: 0x6a4d2a, roughness: 0.36 }));
  barBase.position.set(0, 0.49, -CONFIG.interiorDepth + 0.38);
  barBase.castShadow = true;
  barBase.receiveShadow = true;
  barGroup.add(barBase);

  const barTop = new THREE.Mesh(new THREE.BoxGeometry(3.88, 0.1, 1.0), new THREE.MeshStandardMaterial({ color: 0xb99a5d, roughness: 0.25, metalness: 0.6 }));
  barTop.position.set(0, 1.03, -CONFIG.interiorDepth + 0.38);
  barTop.castShadow = true;
  barGroup.add(barTop);

  const esp = new THREE.Group();
  const eb = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.74, 0.54), new THREE.MeshStandardMaterial({ color: 0x1f1913, roughness: 0.36, metalness: 0.3 }));
  eb.position.set(-1.5, 1.41, -CONFIG.interiorDepth + 0.36);
  eb.castShadow = true;
  esp.add(eb);
  const et = new THREE.Mesh(new THREE.BoxGeometry(0.96, 0.08, 0.58), new THREE.MeshStandardMaterial({ color: 0xb99a5d, roughness: 0.25, metalness: 0.6 }));
  et.position.set(-1.5, 1.82, -CONFIG.interiorDepth + 0.36);
  esp.add(et);
  barGroup.add(esp);

  const grinder = new THREE.Group();
  const gbase = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.11, 0.28, 16), new THREE.MeshStandardMaterial({ color: 0x15110c, roughness: 0.4, metalness: 0.3 }));
  gbase.position.set(-0.8, 1.16, -CONFIG.interiorDepth + 0.36);
  grinder.add(gbase);
  barGroup.add(grinder);

  const backShelf = new THREE.Group();
  const sb = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.06, 0.26), new THREE.MeshStandardMaterial({ color: 0x8f6a3a, roughness: 0.34 }));
  sb.position.set(0, 2.0, -CONFIG.interiorDepth + 0.08);
  backShelf.add(sb);
  const sb2 = sb.clone(); sb2.position.y = 1.6; backShelf.add(sb2);
  const sb3 = sb.clone(); sb3.position.y = 1.2; backShelf.add(sb3);
  function cup(x,y){ const c=new THREE.Mesh(new THREE.CylinderGeometry(0.07,0.08,0.11,18), new THREE.MeshStandardMaterial({color:0xf5f3f0,roughness:0.4})); c.position.set(x,y,-CONFIG.interiorDepth+0.12); backShelf.add(c); }
  cup(-1.4,2.06); cup(-1.0,2.06); cup(-0.6,2.06);
  cup(-1.2,1.66); cup(-0.8,1.66);
  cup(-1.0,1.26); cup(-0.6,1.26);
  group.add(backShelf);

  const sideRackLeft = new THREE.Group();
  const srLBack = new THREE.Mesh(new THREE.BoxGeometry(0.18, 2.6, 2.6), new THREE.MeshStandardMaterial({ color: 0x1a1611, roughness: 0.9 }));
  srLBack.position.set(-CONFIG.interiorWidth/2 + 0.09, 1.3, -1.2);
  sideRackLeft.add(srLBack);
  const productsLeft = [
    {name:'إسبريسو', price:'12 ر.س', color:0x6b4f36},
    {name:'لاتيه', price:'18 ر.س', color:0xb99a5d},
    {name:'كابتشينو', price:'18 ر.س', color:0xa08968},
    {name:'موكا', price:'21 ر.س', color:0x6c5ce7},
    {name:'آيس لاتيه', price:'20 ر.س', color:0x74b9ff},
    {name:'تشيز كيك', price:'24 ر.س', color:0xffd93b},
    {name:'تيراميسو', price:'26 ر.س', color:0xb98a4a},
    {name:'كرواسون', price:'16 ر.س', color:0xd35400}
  ];
  for (let i = 0; i < productsLeft.length; i++) {
    const y = 0.5 + Math.floor(i/4)*0.5;
    const x = (i%4)*0.42;
    const brd = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.06, 2.5), new THREE.MeshStandardMaterial({ color: 0x8f6a3a, roughness: 0.34 }));
    brd.position.set(-CONFIG.interiorWidth/2 + 0.2, y, -1.2);
    sideRackLeft.add(brd);
    const p = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.08, 16), new THREE.MeshStandardMaterial({ color: productsLeft[i].color, roughness: 0.7 }));
    p.position.set(-CONFIG.interiorWidth/2 + 0.34, y + 0.07, -1.6 + x);
    p.userData = {type:'product', name: productsLeft[i].name, price: productsLeft[i].price};
    sideRackLeft.add(p);
    group.userData.products.push(p);
  }
  group.add(sideRackLeft);

  const sideRackRight = new THREE.Group();
  const srRBack = new THREE.Mesh(new THREE.BoxGeometry(0.18, 2.6, 2.6), new THREE.MeshStandardMaterial({ color: 0x1a1611, roughness: 0.9 }));
  srRBack.position.set(CONFIG.interiorWidth/2 - 0.09, 1.3, -1.2);
  sideRackRight.add(srRBack);
  const productsRight = [
    {name:'أمريكانو', price:'14 ر.س', color:0x8d7352},
    {name:'فلات وايت', price:'19 ر.س', color:0xc9b08a},
    {name:'آيس أمريكانو', price:'16 ر.س', color:0x74b9ff},
    {name:'آيس موكا', price:'22 ر.س', color:0x6c5ce7},
    {name:'كروسان بالشوكولاتة', price:'18 ر.س', color:0xd35400},
    {name:'مافن', price:'17 ر.س', color:0xf39c12},
    {name:'كوكيز', price:'14 ر.س', color:0xe67e22},
    {name:'بسكويت', price:'12 ر.س', color:0x8e44ad}
  ];
  for (let i = 0; i < productsRight.length; i++) {
    const y = 0.5 + Math.floor(i/4)*0.5;
    const x = (i%4)*0.42;
    const brd = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.06, 2.5), new THREE.MeshStandardMaterial({ color: 0x8f6a3a, roughness: 0.34 }));
    brd.position.set(CONFIG.interiorWidth/2 - 0.2, y, -1.2);
    sideRackRight.add(brd);
    const p = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.08, 16), new THREE.MeshStandardMaterial({ color: productsRight[i].color, roughness: 0.7 }));
    p.position.set(CONFIG.interiorWidth/2 - 0.34, y + 0.07, -1.6 + x);
    p.userData = {type:'product', name: productsRight[i].name, price: productsRight[i].price};
    sideRackRight.add(p);
    group.userData.products.push(p);
  }
  group.add(sideRackRight);

  function table(x, z) {
    const g = new THREE.Group();
    const top = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.8, 0.05, 44), new THREE.MeshStandardMaterial({ color: 0xc9a05f, roughness: 0.28 }));
    top.position.y = 0.75;
    top.castShadow = true;
    g.add(top);
    const col = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 0.7, 22), new THREE.MeshStandardMaterial({ color: 0x6a4d2a, roughness: 0.4 }));
    col.position.y = 0.35;
    col.castShadow = true;
    g.add(col);
    g.position.set(x, 0, z);
    group.add(g);
  }

  function chair(x, z, rot) {
    const g = new THREE.Group();
    const seat = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.08, 0.48), new THREE.MeshStandardMaterial({ color: 0x7a6042, roughness: 0.9 }));
    seat.position.y = 0.44;
    seat.castShadow = true;
    g.add(seat);
    const cush = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.02, 0.46), new THREE.MeshStandardMaterial({ color: 0x8a7047, roughness: 0.9 }));
    cush.position.y = 0.485;
    g.add(cush);
    const back = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.52, 0.08), new THREE.MeshStandardMaterial({ color: 0x7a6042, roughness: 0.9 }));
    back.position.set(0, 0.74, -0.2);
    back.castShadow = true;
    g.add(back);
    const lm = new THREE.MeshStandardMaterial({ color: 0x15110c, roughness: 0.7, metalness: 0.4 });
    const lg = new THREE.CylinderGeometry(0.018, 0.022, 0.42, 12);
    [[-0.18,-0.18],[0.18,-0.18],[-0.18,0.18],[0.18,0.18]].forEach(([lx,lz]) => {
      const leg = new THREE.Mesh(lg, lm);
      leg.position.set(lx, 0.21, lz);
      leg.castShadow = true;
      g.add(leg);
    });
    g.position.set(x, 0, z);
    g.rotation.y = rot;
    group.add(g);
  }

  table(-1.8, -2.2); table(1.6, -2.0); table(-0.4, -1.0);
  chair(-1.8, -3.0, 0); chair(-2.6, -2.2, Math.PI/2); chair(1.6, -2.8, Math.PI); chair(-0.4, -1.8, Math.PI);

  const flowers = new THREE.Group();
  for (let i = -1.0; i <= 1.0; i += 0.6) {
    const v = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.012, 0.4, 8), new THREE.MeshStandardMaterial({ color: 0x7a6742 }));
    v.position.set(i, 0.2, -2.9);
    flowers.add(v);
    const f = new THREE.Mesh(new THREE.SphereGeometry(0.05, 12, 12), new THREE.MeshStandardMaterial({ color: 0xb99a5d, roughness: 0.8 }));
    f.position.set(i, 0.42, -2.9);
    flowers.add(f);
  }
  group.add(flowers);

  const mirror = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 1.8), new THREE.MeshPhysicalMaterial({ color: 0xf7f7f7, roughness: 0, metalness: 1, reflectivity: 1 }));
  mirror.position.set(0, 1.7, -CONFIG.interiorDepth - 0.149);
  group.add(mirror);

  const doorFrameInner = new THREE.Group();
  const df1 = new THREE.Mesh(new THREE.BoxGeometry(0.08, 2.4, 0.1), new THREE.MeshStandardMaterial({ color: 0x15110c }));
  df1.position.set(-0.74, 1.2, 0.05);
  doorFrameInner.add(df1);
  const df2 = df1.clone(); df2.position.set(0.74, 1.2, 0.05); doorFrameInner.add(df2);
  const df3 = new THREE.Mesh(new THREE.BoxGeometry(1.56, 0.08, 0.1), new THREE.MeshStandardMaterial({ color: 0x15110c }));
  df3.position.set(0, 2.36, 0.05); doorFrameInner.add(df3);
  const doorGlassInner = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 2.24), new THREE.MeshPhysicalMaterial({ color: 0xfff1dc, roughness: 0.1, transmission: 0.7, thickness: 0.01, transparent: true }));
  doorGlassInner.position.set(0, 1.14, 0.101);
  doorFrameInner.add(doorGlassInner);
  group.add(doorFrameInner);

  scene.add(group);
  return group;
}