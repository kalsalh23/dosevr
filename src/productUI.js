import * as THREE from 'three';

export function createProductUI() {
  const overlay = document.createElement('div');
  overlay.id = 'product-ui';
  overlay.innerHTML = '<div class=\"prod-box\"><h3 id=\"pname\"></h3><p id=\"pprice\"></p><button id=\"order\">طلب</button><button id=\"close\">إغلاق</button></div>';
  overlay.style.cssText = 'position:fixed;inset:0;display:none;align-items:center;justify-content:center;background:rgba(0,0,0,0.6);z-index:12;font-family:Tajawal,sans-serif;';
  document.body.appendChild(overlay);
  const style = document.createElement('style');
  style.textContent = '.prod-box{background:#15100b;color:#f7f4ef;padding:24px 32px;border-radius:12px;border:1px solid rgba(255,196,120,0.4);text-align:center;min-width:200px;}#order{background:rgba(255,196,120,0.2);color:#f7f4ef;border:1px solid rgba(255,196,120,0.4);padding:8px 16px;border-radius:8px;margin:8px;cursor:pointer;}#close{background:rgba(30,24,18,0.8);color:#f7f4ef;border:1px solid rgba(255,196,120,0.4);padding:8px 16px;border-radius:8px;margin:8px;cursor:pointer;}';
  document.head.appendChild(style);
  const pname = document.getElementById('pname');
  const pprice = document.getElementById('pprice');
  const order = document.getElementById('order');
  const close = document.getElementById('close');
  close.onclick = () => { overlay.style.display='none'; };
  order.onclick = () => { alert('تم إضافة الطلب'); overlay.style.display='none'; };
  return {
    show: (name, price) => { pname.textContent=name; pprice.textContent=price; overlay.style.display='flex'; }
  };
}