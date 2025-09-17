
// Reveal on scroll
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.15});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// Active nav by pathname
const path=(location.pathname.split('/').pop()||'index.html');
document.querySelectorAll('nav a').forEach(a=>{const href=a.getAttribute('href');if((path==''&&href==='index.html')||href===path)a.classList.add('active')});

// Mouse glow on primary buttons
document.querySelectorAll('.btn.primary').forEach(b=>b.addEventListener('mousemove',e=>{
  const r=b.getBoundingClientRect();const x=((e.clientX-r.left)/r.width)*100;b.style.setProperty('--mx',x+'%')
}));

// Lightbox (for grafika if images present)
document.addEventListener('click', (e) => {
  const t = e.target.closest('[data-lightbox]');
  if (!t) return;
  e.preventDefault();
  const src = t.getAttribute('href') || t.querySelector('img')?.src;
  if (!src) return;
  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.9);display:grid;place-items:center;z-index:9999';
  const img = document.createElement('img');
  img.src = src; img.style.maxWidth='90vw'; img.style.maxHeight='85vh'; img.style.border='1px solid #2a2a36'; img.style.borderRadius='12px';
  overlay.appendChild(img);
  overlay.addEventListener('click', ()=> overlay.remove());
  document.body.appendChild(overlay);
});


// Page fade-in/out transitions
document.documentElement.classList.add('page-fade');
window.addEventListener('DOMContentLoaded',()=>document.documentElement.classList.add('visible'));
document.addEventListener('click',(e)=>{
  const a=e.target.closest('a[href]');
  if(!a) return;
  const url=new URL(a.href, location.href);
  if(url.origin===location.origin){ // internal link
    e.preventDefault();
    document.documentElement.classList.remove('visible');
    setTimeout(()=>{ location.href = a.href; }, 200);
  }
});


// --- Hero parallax (subtle) ---
(function(){
  const hero = document.querySelector('.hero-pro');
  if(!hero) return;
  const apply = (x,y)=>{
    hero.querySelectorAll('[data-parallax]').forEach(el=>{
      const depth = Number(el.getAttribute('data-parallax')||5);
      const tx = (x-0.5) * depth;
      const ty = (y-0.5) * depth;
      el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
    });
  };
  hero.addEventListener('mousemove',(e)=>{
    const r = hero.getBoundingClientRect();
    apply((e.clientX-r.left)/r.width,(e.clientY-r.top)/r.height);
  });
  hero.addEventListener('mouseleave',()=>apply(.5,.5));
  apply(.5,.5);
})();
