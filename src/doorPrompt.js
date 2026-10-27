import * as THREE from 'three';

export function createDoorPrompt(camera, domElement, onEnter) {
  const overlay = document.createElement('div');
  overlay.id = 'door-prompt';
  overlay.innerHTML = '<div class=\"prompt-box\"><h3>تسجيل الدخول / إنشاء حساب</h3><p>للدخول إلى مقهى DOSE Coffee</p><div class=\"actions\"><button id=\"confirm\">تأكيد</button><button id=\"cancel\">إلغاء</button></div></div>';
  overlay.style.cssText = 'position:fixed;inset:0;display:none;align-items:center;justify-content:center;background:rgba(0,0,0,0.6);z-index:10;font-family:Tajawal,sans-serif;';
  document.body.appendChild(overlay);
  const style = document.createElement('style');
  style.textContent = '.prompt-box{background:#15100b;color:#f7f4ef;padding:24px 32px;border-radius:12px;border:1px solid rgba(255,196,120,0.4);text-align:center;}.actions{display:flex;gap:12px;justify-content:center;margin-top:16px;}button{background:rgba(30,24,18,0.8);color:#f7f4ef;border:1px solid rgba(255,196,120,0.4);padding:8px 16px;border-radius:8px;cursor:pointer;}';
  document.head.appendChild(style);
  
  const box = document.querySelector('.prompt-box');
  box.style.pointerEvents = 'auto';
  const confirm = document.getElementById('confirm');
  const cancel = document.getElementById('cancel');
  
  confirm.onclick = () => {
    overlay.style.display = 'none';
    if (document.pointerLockElement) document.exitPointerLock();
    onEnter();
  };
  cancel.onclick = () => {
    overlay.style.display = 'none';
  };
  
  let shown = false;
  return {
    update: (pos) => {
      if (shown) return;
      if (pos.z < 0.8 && pos.z > -0.2 && Math.abs(pos.x) < 0.8) {
        shown = true;
        overlay.style.display = 'flex';
        if (document.pointerLockElement) document.exitPointerLock();
      }
    }
  };
}