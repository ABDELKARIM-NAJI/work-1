// Small interactions: year, smooth scroll, theme toggle, reveal
document.addEventListener('DOMContentLoaded', function(){
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // Smooth internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if(href && href.startsWith('#')){
        const target = document.querySelector(href);
        if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth', block:'start'}); }
      }
    });
  });

  // Theme toggle
  const themeToggle = document.getElementById('theme-toggle');
  const stored = localStorage.getItem('theme');
  if(stored) document.documentElement.setAttribute('data-theme', stored);
  if(themeToggle){
    themeToggle.textContent = document.documentElement.getAttribute('data-theme') === 'dark' ? '☀️' : '🌙';
    themeToggle.addEventListener('click', ()=>{
      const cur = document.documentElement.getAttribute('data-theme');
      const next = cur === 'dark' ? '' : 'dark';
      if(next) document.documentElement.setAttribute('data-theme', next); else document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', next);
      themeToggle.textContent = next === 'dark' ? '☀️' : '🌙';
    });
  }

  // Simple reveal on scroll
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(en=>{ if(en.isIntersecting) en.target.classList.add('visible'); });
  },{threshold:0.12});
  document.querySelectorAll('.reveal, .project, .section').forEach(el=>io.observe(el));

  // Back to top button
  const backBtn = document.getElementById('back-to-top');
  if(backBtn){
    const toggleBack = ()=>{
      if(window.scrollY > 300){
        backBtn.classList.add('show');
        backBtn.setAttribute('aria-hidden','false');
      } else {
        backBtn.classList.remove('show');
        backBtn.setAttribute('aria-hidden','true');
      }
    };
    toggleBack();
    window.addEventListener('scroll', toggleBack, {passive:true});
    backBtn.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));
  }
});
