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

  // Simple reveal on scroll with staggered delays
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(en=>{
      if(en.isIntersecting){
        const delay = en.target.dataset.delay ? Number(en.target.dataset.delay) : 0;
        setTimeout(()=> en.target.classList.add('visible'), delay);
      }
    });
  },{threshold:0.12});
  document.querySelectorAll('.reveal, .project, .section').forEach((el,i)=>{
    // assign small stagger for projects
    if(el.classList.contains('project')) el.dataset.delay = i * 80;
    io.observe(el);
  });

  // Back to top button
  const backBtn = document.getElementById('back-to-top');
  if(backBtn){
    const toggleBack = ()=>{ if(window.scrollY > 300){ backBtn.classList.add('show'); backBtn.setAttribute('aria-hidden','false'); } else { backBtn.classList.remove('show'); backBtn.setAttribute('aria-hidden','true'); } };
    toggleBack();
    window.addEventListener('scroll', toggleBack, {passive:true});
    backBtn.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));
  }

  // Mobile nav toggle
  const navToggle = document.getElementById('nav-toggle');
  if(navToggle){
    const nav = navToggle.closest('.nav');
    navToggle.addEventListener('click', ()=>{
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('nav-open');
    });
    document.addEventListener('keydown', e=>{
      if(e.key === 'Escape' && nav.classList.contains('nav-open')){
        navToggle.setAttribute('aria-expanded','false'); nav.classList.remove('nav-open');
      }
    });

    // Close mobile nav when a link is clicked (improves mobile UX)
    document.querySelectorAll('.nav-links a').forEach(link=>{
      link.addEventListener('click', ()=>{
        if(nav.classList.contains('nav-open')){
          nav.classList.remove('nav-open');
          navToggle.setAttribute('aria-expanded','false');
        }
      });
    });
  }

  // Project filters
  document.querySelectorAll('.filter-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('#projects-preview .project').forEach(p=>{
        const cat = p.dataset.category || '';
        if(filter==='all' || cat.includes(filter)) p.style.display='block'; else p.style.display='none';
      });
    });
  });

  // Project modal with accessible focus management
  const modal = document.getElementById('project-modal');
  if(modal){
    let lastFocused = null;
    const openEls = document.querySelectorAll('.project-open');
    const pageRegions = [document.querySelector('main'), document.querySelector('header'), document.querySelector('footer')];

    openEls.forEach(el=>{
      el.addEventListener('click', e=>{
        e.preventDefault();
        lastFocused = e.currentTarget;
        const title = el.dataset.title || '';
        const desc = el.dataset.desc || '';
        modal.querySelector('#modal-title').textContent = title;
        modal.querySelector('#modal-desc').textContent = desc;
        modal.setAttribute('aria-hidden','false');
        modal.classList.add('open');
        // hide background from assistive tech
        pageRegions.forEach(r=>{ if(r) r.setAttribute('aria-hidden','true'); });
        // prevent background scroll
        document.body.style.overflow = 'hidden';
        // focus management
        const closeBtn = modal.querySelector('.project-modal-close');
        closeBtn?.focus();
        // collect focusable elements for simple trap
        const focusable = modal.querySelectorAll('a, button, textarea, input, select, [tabindex]:not([tabindex="-1"])');
        modal._focusable = Array.from(focusable);
      });
    });

    const restoreBackground = ()=>{
      pageRegions.forEach(r=>{ if(r) r.removeAttribute('aria-hidden'); });
      document.body.style.overflow = '';
    };

    const closeModal = ()=>{
      modal.setAttribute('aria-hidden','true');
      modal.classList.remove('open');
      restoreBackground();
      if(lastFocused) lastFocused.focus();
    };

    modal.querySelector('.project-modal-close')?.addEventListener('click', closeModal);
    modal.addEventListener('click', e=>{
      if(e.target === modal) closeModal();
    });
    document.addEventListener('keydown', e=>{
      if(e.key === 'Escape' && modal.classList.contains('open')){
        closeModal();
      }
      if(e.key === 'Tab' && modal.classList.contains('open')){
        const focusable = modal._focusable || [];
        if(focusable.length === 0){ e.preventDefault(); return; }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if(e.shiftKey){
          if(document.activeElement === first){ e.preventDefault(); last.focus(); }
        } else {
          if(document.activeElement === last){ e.preventDefault(); first.focus(); }
        }
      }
    });
  }
});
