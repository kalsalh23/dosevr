import * as THREE from 'three';

export function createDayNightUI(scene) {
  const overlay = document.createElement('div');
  overlay.innerHTML = '<button id=\"daynight\">وضع ليلي / نهاري</button>';
  overlay.style.cssText = 'position:fixed;top:20px;right:20px;z-index:15;font-family:Tajawal,sans-serif;';
  document.body.appendChild(overlay);
  const btn = document.getElementById('daynight');
  btn.style.cssText = 'background:rgba(30,24,18,0.8);color:#f7f4ef;border:1px solid rgba(255,196,120,0.4);padding:8px 16px;border-radius:8px;cursor:pointer;';
  
  btn.onclick = () => {
    const dn = scene.userData.dayNight;
    if (!dn) return;
    dn.night = !dn.night;
    if (dn.night) {
      dn.sky.material.color.set(0x0a0a14);
      dn.sun.material.color.set(0xdddddd);
      dn.sunLight.intensity = 0.4;
      scene.fog.color.set(0x0a0a14);
      scene.background = new THREE.Color(0x0a0a14);
    } else {
      dn.sky.material.color.set(0x8fa3b8);
      dn.sun.material.color.set(0xfff3b0);
      dn.sunLight.intensity = 3;
      scene.fog.color.set(0x8fa3b8);
      scene.background = new THREE.Color(0x8fa3b8);
    }
  };
}