import * as THREE from 'three';
import { CONFIG } from './config.js';

export function createSignage(scene, materials) {
  const group = new THREE.Group();
  
  function makeSign() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#0f0f0f';
    ctx.fillRect(0, 0, 1024, 256);
    ctx.font = 'bold 140px Tajawal';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffb87a';
    ctx.fillText('DOSE COFFEE', 512, 170);
    const tex = new THREE.CanvasTexture(canvas);
    const mat = new THREE.MeshBasicMaterial({ map: tex, transparent: true });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 0.6), mat);
    mesh.position.set(0, CONFIG.entranceHeight + 0.8, 1.21);
    return mesh;
  }
  
  group.add(makeSign());
  
  const glassTextCanvas = document.createElement('canvas');
  glassTextCanvas.width = 512;
  glassTextCanvas.height = 128;
  const gctx = glassTextCanvas.getContext('2d');
  gctx.font = 'bold 60px Tajawal';
  gctx.textAlign = 'center';
  gctx.fillStyle = '#f5f3f0';
  gctx.fillText('FRESH BREW & COZY', 256, 80);
  const gtex = new THREE.CanvasTexture(glassTextCanvas);
  const gmat = new THREE.MeshBasicMaterial({ map: gtex, transparent: true });
  const gmesh = new THREE.Mesh(new THREE.PlaneGeometry(1.2, 0.3), gmat);
  gmesh.position.set(0, CONFIG.entranceHeight - 0.3, 0.182);
  group.add(gmesh);
  
  scene.add(group);
  return group;
}
