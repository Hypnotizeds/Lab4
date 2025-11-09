
// Burger
const burgerBtn = document.getElementById('burgerBtn');
const navList = document.getElementById('navList');
burgerBtn && burgerBtn.addEventListener('click', ()=>{
  navList.classList.toggle('is-open');
});

// PWA SW
if('serviceWorker' in navigator){
  window.addEventListener('load', ()=>navigator.serviceWorker.register('./sw.js'));
}

// Install prompt
let deferredPrompt;
const btnInstall = document.getElementById('btnInstall');
window.addEventListener('beforeinstallprompt', (e)=>{
  e.preventDefault(); deferredPrompt = e;
  btnInstall && btnInstall.classList.add('install--show');
});
btnInstall && btnInstall.addEventListener('click', async ()=>{
  deferredPrompt?.prompt();
  await deferredPrompt?.userChoice;
  deferredPrompt = null;
  btnInstall.classList.remove('install--show');
});
