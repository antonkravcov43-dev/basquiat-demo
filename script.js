// Шапка
const header = document.getElementById('header');
window.addEventListener('scroll', () => header.classList.toggle('is-scrolled', window.scrollY > 30), { passive: true });

// Мобильное меню
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
burger.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  burger.setAttribute('aria-expanded', open);
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('is-open');
  burger.setAttribute('aria-expanded', 'false');
}));

// Появление блоков
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('is-visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = `${(i % 3) * 80}ms`;
  io.observe(el);
});

// Лайтбокс для галереи и керамики
const photos = [...document.querySelectorAll('#gallery-grid img, .ceramics img')];
const lightbox = document.getElementById('lightbox');
const lbImg = lightbox.querySelector('img');
let idx = 0;
function show(i) {
  idx = (i + photos.length) % photos.length;
  lbImg.src = photos[idx].src;
  lbImg.alt = photos[idx].alt;
}
function closeLightbox() {
  lightbox.hidden = true;
  document.body.style.overflow = '';
}
photos.forEach((img, i) => {
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', () => {
    show(i);
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
  });
});
lightbox.querySelector('.lightbox__prev').addEventListener('click', () => show(idx - 1));
lightbox.querySelector('.lightbox__next').addEventListener('click', () => show(idx + 1));
lightbox.querySelector('.lightbox__close').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => {
  if (lightbox.hidden) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') show(idx - 1);
  if (e.key === 'ArrowRight') show(idx + 1);
});
