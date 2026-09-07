/* ==========================================================================
   TAT:VM — INTERACTION ENGINE
   Elegant, slow, intentional. Respects prefers-reduced-motion.
   ========================================================================== */
(function(){
  'use strict';
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(hover:none),(pointer:coarse)').matches;

  /* ---------- Loader ---------- */
  function initLoader(){
    const l = document.querySelector('.loader');
    if(!l) return;
    window.addEventListener('load', ()=> setTimeout(()=> l.classList.add('done'), 500));
    // safety
    setTimeout(()=> l.classList.add('done'), 2200);
  }

  /* Local previews do not reliably trigger native lazy loading off-screen. */
  function initImages(){
    document.querySelectorAll('img[loading="lazy"]').forEach(img=>{ img.loading='eager'; });
  }

  /* Shared hero media: video fallback on home, two-image motion on inner pages. */
  function initHeroMedia(){
    const homeHero = document.querySelector('.hero');
    if(homeHero && !homeHero.querySelector('.hero-video')){
      const fallback = homeHero.querySelector('img');
      const video = document.createElement('video');
      video.className = 'hero-video';
      video.autoplay = true;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.poster = fallback?.src || '';
      video.src = 'assets/video/home-hero.mp4';
      video.addEventListener('error', ()=> video.classList.add('hero-video-unavailable'), {once:true});
      homeHero.insertBefore(video, homeHero.firstChild);
    }

    const mediaHosts = document.querySelectorAll('.page-hero, main > section:first-of-type:not(.hero)');
    const nested = window.location.pathname.includes('/projects/');
    const prefix = nested ? '../' : '';
    const pairs = nested
      ? ['assets/img/project-residential.jpg','assets/img/interior-light.jpg']
      : ['assets/img/hero-mumbai.jpg','assets/img/mumbai-neighbourhood.jpg'];
    mediaHosts.forEach(host=>{
      if(host.classList.contains('hero') || host.querySelector('.hero-slider')) return;
      host.classList.add('hero-has-slider');
      const slider = document.createElement('div');
      slider.className = 'hero-slider';
      pairs.forEach((path,index)=>{
        const image = document.createElement('img');
        image.className = `hero-slide${index === 0 ? ' is-active' : ''}`;
        image.src = prefix + path;
        image.alt = '';
        image.setAttribute('aria-hidden','true');
        slider.appendChild(image);
      });
      host.insertBefore(slider, host.firstChild);
    });
  }

  /* ---------- Header scroll state ---------- */
  function initHeader(){
    const h = document.querySelector('.site-header');
    if(!h) return;
    const onScroll = ()=>{
      if(window.scrollY > 30) h.classList.add('scrolled');
      else h.classList.remove('scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, {passive:true});
  }

  /* ---------- Mobile menu ---------- */
  function initMobileMenu(){
    const burger = document.querySelector('.hamburger');
    const menu = document.querySelector('.mobile-menu');
    const close = document.querySelector('.mm-close');
    if(!burger || !menu) return;
    const open = ()=>{ menu.classList.add('open'); burger.classList.add('open'); document.body.style.overflow='hidden'; };
    const shut = ()=>{ menu.classList.remove('open'); burger.classList.remove('open'); document.body.style.overflow=''; };
    burger.addEventListener('click', open);
    if(close) close.addEventListener('click', shut);
    menu.querySelectorAll('.mm-group-title').forEach(t=>{
      t.addEventListener('click', ()=> t.parentElement.classList.toggle('open'));
    });
    menu.querySelectorAll('.mm-sub a').forEach(a=> a.addEventListener('click', shut));
  }

  /* ---------- Scroll reveal ---------- */
  function initReveal(){
    const els = document.querySelectorAll('.reveal, .reveal-img');
    if(reduce){ els.forEach(e=> e.classList.add('in')); return; }
    if(!('IntersectionObserver' in window)){ els.forEach(e=> e.classList.add('in')); return; }
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(en=>{
        if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, {threshold:.12, rootMargin:'0px 0px -8% 0px'});
    els.forEach(e=> io.observe(e));
    requestAnimationFrame(()=>{
      els.forEach(e=>{
        const rect = e.getBoundingClientRect();
        if(rect.bottom > 0 && rect.top < window.innerHeight) e.classList.add('in');
      });
    });
  }

  /* ---------- Number counters ---------- */
  function initCounters(){
    const nums = document.querySelectorAll('[data-count]');
    if(reduce){ nums.forEach(n=> n.textContent = n.dataset.count); return; }
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(en=>{
        if(!en.isIntersecting) return;
        const el = en.target;
        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const dur = 1600; const start = performance.now();
        const tick = (now)=>{
          const p = Math.min((now-start)/dur, 1);
          const eased = 1 - Math.pow(1-p, 3);
          const val = Math.floor(eased * target);
          el.textContent = val + suffix;
          if(p < 1) requestAnimationFrame(tick);
          else el.textContent = target + suffix;
        };
        requestAnimationFrame(tick);
        io.unobserve(el);
      });
    }, {threshold:.5});
    nums.forEach(n=> io.observe(n));
  }

  /* ---------- Five Fundamentals interaction ---------- */
  function initFunda(){
    const tabs = document.querySelectorAll('.funda-tab');
    const panels = document.querySelectorAll('.funda-panel');
    if(!tabs.length) return;
    const activate = (i)=>{
      tabs.forEach((t,idx)=> t.classList.toggle('active', idx===i));
      panels.forEach((p,idx)=> p.classList.toggle('active', idx===i));
      // line draw
      const line = panels[i]?.querySelector('.funda-line');
      if(line){ line.style.width='0'; requestAnimationFrame(()=>{ setTimeout(()=> line.style.width='60px', 60); }); }
    };
    tabs.forEach((t,i)=> t.addEventListener('click', ()=> activate(i)));
    // auto cycle across desktop and touch layouts
    if(!reduce){
      let cur = 0; let timer;
      const wrap = document.querySelector('.funda-wrap');
      const start = ()=>{ timer = setInterval(()=>{ cur = (cur+1)%tabs.length; activate(cur); }, 4200); };
      const stop = ()=> clearInterval(timer);
      start();
      if(wrap && !isTouch){ wrap.addEventListener('mouseenter', stop); wrap.addEventListener('mouseleave', start); }
    }
    activate(0);
  }

  /* ---------- Custom cursor ---------- */
  function initCursor(){
    if(isTouch) return;
    const cursor = document.createElement('div'); cursor.className='cursor'; document.body.appendChild(cursor);
    const explore = document.createElement('div'); explore.className='cursor-explore'; explore.textContent='Explore'; document.body.appendChild(explore);
    let x=0,y=0,ex=0,ey=0;
    window.addEventListener('mousemove', e=>{ x=e.clientX; y=e.clientY; });
    const loop = ()=>{
      ex += (x-ex)*.2; ey += (y-ey)*.2;
      cursor.style.transform = `translate(${ex}px,${ey}px) translate(-50%,-50%)`;
      explore.style.transform = `translate(${ex}px,${ey}px) translate(-50%,-50%)`;
      requestAnimationFrame(loop);
    };
    loop();
    document.querySelectorAll('a, button, .btn, .funda-tab, summary').forEach(el=>{
      el.addEventListener('mouseenter', ()=> cursor.classList.add('big'));
      el.addEventListener('mouseleave', ()=> cursor.classList.remove('big'));
    });
    document.querySelectorAll('[data-explore]').forEach(el=>{
      el.addEventListener('mouseenter', ()=> explore.classList.add('show'));
      el.addEventListener('mouseleave', ()=> explore.classList.remove('show'));
    });
  }

  /* ---------- Sticky project nav active state ---------- */
  function initProjNav(){
    const links = document.querySelectorAll('.proj-nav-inner a');
    if(!links.length) return;
    const sections = [];
    links.forEach(l=>{ const id = l.getAttribute('href'); if(id && id.startsWith('#')){ const s = document.querySelector(id); if(s) sections.push({s, l}); } });
    if(!sections.length) return;
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(en=>{
        if(en.isIntersecting){
          sections.forEach(({l})=> l.classList.remove('active'));
          const match = sections.find(({s})=> s===en.target);
          if(match) match.l.classList.add('active');
        }
      });
    }, {rootMargin:'-45% 0px -50% 0px'});
    sections.forEach(({s})=> io.observe(s));
    links.forEach(l=> l.addEventListener('click', e=>{
      const id = l.getAttribute('href');
      if(id && id.startsWith('#')){
        e.preventDefault();
        const t = document.querySelector(id);
        if(t){ const y = t.getBoundingClientRect().top + window.scrollY - 140; window.scrollTo({top:y, behavior: reduce?'auto':'smooth'}); }
      }
    }));
  }

  /* ---------- Forms (named conversion events) ---------- */
  function initForms(){
    document.querySelectorAll('form[data-form]').forEach(form=>{
      form.addEventListener('submit', e=>{
        e.preventDefault();
        const type = form.dataset.form; // enquiry type / event name
        const success = form.parentElement.querySelector('.form-success') || form.querySelector('.form-success');
        // collect source_page + enquiry_type for analytics (GTM dataLayer push stub)
        try{
          window.dataLayer = window.dataLayer || [];
          const payload = {event: type || 'form_submit', source_page: form.dataset.source || window.location.pathname};
          new FormData(form).forEach((v,k)=>{ if(['name','phone','email','enquiry_type','project_name'].includes(k)) payload[k]=v; });
          window.dataLayer.push(payload);
        }catch(err){}
        form.style.display = 'none';
        if(success){ success.classList.add('show'); success.scrollIntoView({behavior: reduce?'auto':'smooth', block:'center'}); }
      });
      // set hidden source fields
      const sp = form.querySelector('[name="source_page"]'); if(sp && !sp.value) sp.value = window.location.pathname;
    });
  }

  /* ---------- Parallax (subtle, desktop, reduced-motion safe) ---------- */
  function initParallax(){
    if(reduce || isTouch) return;
    const els = document.querySelectorAll('[data-parallax]');
    if(!els.length) return;
    let ticking=false;
    const update = ()=>{
      const vh = window.innerHeight;
      els.forEach(el=>{
        const r = el.getBoundingClientRect();
        if(r.bottom < 0 || r.top > vh) return;
        const speed = parseFloat(el.dataset.parallax) || .15;
        const offset = (r.top + r.height/2 - vh/2) * speed * -1;
        el.style.transform = `translate3d(0,${offset.toFixed(1)}px,0)`;
      });
      ticking=false;
    };
    window.addEventListener('scroll', ()=>{ if(!ticking){ requestAnimationFrame(update); ticking=true; } }, {passive:true});
    update();
  }

  /* ---------- Set active nav by location ---------- */
  function initActiveNav(){
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link, .mm-sub a, .foot-col a').forEach(a=>{
      const href = a.getAttribute('href') || '';
      if(href === path || (path==='index.html' && href==='index.html')) a.classList.add('active-nav');
    });
  }

  /* ==========================================================================
     ENHANCED MOTION SYSTEM
     Scroll progress, page-transition wipe, 3D tilt cards, magnetic buttons,
     infinite marquee galleries, lightbox, floating quick-actions dock.
     ========================================================================== */

  /* ---------- Scroll progress bar ---------- */
  function initScrollProgress(){
    if(document.querySelector('.scroll-progress')) return;
    const bar = document.createElement('div');
    bar.className = 'scroll-progress';
    document.body.appendChild(bar);
    const update = ()=>{
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const height = h.scrollHeight - h.clientHeight;
      bar.style.width = height > 0 ? (scrolled / height * 100) + '%' : '0%';
    };
    update();
    window.addEventListener('scroll', update, {passive:true});
    window.addEventListener('resize', update);
  }

  /* ---------- Page transition wipe on internal navigation ---------- */
  function initPageTransition(){
    const overlay = document.createElement('div');
    overlay.className = 'page-transition';
    document.body.appendChild(overlay);
    if(reduce) return;
    document.addEventListener('click', e=>{
      const a = e.target.closest('a');
      if(!a) return;
      const href = a.getAttribute('href');
      if(!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
      if(a.target === '_blank' || a.hasAttribute('download')) return;
      if(e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      try{ if(a.origin && a.origin !== window.location.origin) return; }catch(err){}
      e.preventDefault();
      overlay.classList.add('active');
      setTimeout(()=>{ window.location.href = href; }, 460);
    });
  }

  /* ---------- 3D tilt on cards ---------- */
  function initTilt(){
    if(isTouch || reduce) return;
    document.querySelectorAll('.proj-card, .art-card, .org-tile').forEach(card=>{
      card.classList.add('tilt-card');
      card.addEventListener('mousemove', e=>{
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - .5;
        const py = (e.clientY - r.top) / r.height - .5;
        card.style.transform = `perspective(900px) rotateX(${(-py*5).toFixed(2)}deg) rotateY(${(px*6).toFixed(2)}deg) translateY(-4px)`;
      });
      card.addEventListener('mouseleave', ()=>{ card.style.transform = ''; });
    });
  }

  /* ---------- Magnetic buttons ---------- */
  function initMagnetic(){
    if(isTouch || reduce) return;
    document.querySelectorAll('.btn').forEach(btn=>{
      btn.addEventListener('mousemove', e=>{
        const r = btn.getBoundingClientRect();
        const mx = (e.clientX - r.left - r.width/2) * .22;
        const my = (e.clientY - r.top - r.height/2) * .32;
        btn.style.transform = `translate(${mx.toFixed(1)}px,${my.toFixed(1)}px)`;
      });
      btn.addEventListener('mouseleave', ()=>{ btn.style.transform = ''; });
    });
  }

  /* ---------- Infinite marquee galleries ---------- */
  function initMarquee(){
    document.querySelectorAll('.marquee-track').forEach(track=>{
      if(!track.dataset.dup){
        track.innerHTML += track.innerHTML; // duplicate once for a seamless loop
        track.dataset.dup = '1';
      }
    });
    document.querySelectorAll('.marquee-controls').forEach(ctrl=>{
      const section = ctrl.closest('.marquee-section');
      const track = section ? section.querySelector('.marquee-track') : null;
      if(!track) return;
      ctrl.querySelectorAll('[data-speed]').forEach(btn=>{
        btn.addEventListener('click', ()=>{
          ctrl.querySelectorAll('[data-speed]').forEach(b=> b.classList.remove('active'));
          btn.classList.add('active');
          if(btn.dataset.speed === 'pause'){ track.classList.add('paused'); }
          else{ track.classList.remove('paused'); track.style.animationDuration = btn.dataset.speed + 's'; }
        });
      });
    });
  }

  /* ---------- Lightbox for marquee gallery images ---------- */
  function initLightbox(){
    if(!document.querySelector('.marquee-item')) return;
    const lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.innerHTML = '<button class="lightbox-close" aria-label="Close">✕</button><img alt="">';
    document.body.appendChild(lb);
    const img = lb.querySelector('img');
    const close = ()=> lb.classList.remove('open');
    lb.addEventListener('click', e=>{ if(e.target === lb) close(); });
    lb.querySelector('.lightbox-close').addEventListener('click', close);
    document.addEventListener('keydown', e=>{ if(e.key === 'Escape') close(); });
    document.addEventListener('click', e=>{
      const item = e.target.closest('.marquee-item');
      if(!item) return;
      const im = item.querySelector('img');
      if(!im) return;
      img.src = im.src; img.alt = im.alt || '';
      lb.classList.add('open');
    });
  }

  /* ---------- Floating quick-actions dock + chat bubble ---------- */
  function initQuickDock(){
    if(document.querySelector('.quick-dock')) return;
    const dock = document.createElement('div');
    dock.className = 'quick-dock';
    dock.innerHTML =
      '<a href="https://wa.me/919152000425" target="_blank" rel="noopener" class="qd-btn qd-whatsapp" aria-label="WhatsApp Tat:vm"><span class="qd-ping"></span><svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5 4.5.7.3 1.2.5 1.7.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.2-.3-.2-.6-.4z"/><path d="M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.4c1.4.8 3 1.2 4.8 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3.1.8.8-3-.2-.3C3.9 15 3.5 13.5 3.5 12c0-4.7 3.8-8.5 8.5-8.5s8.5 3.8 8.5 8.5-3.8 8-8.5 8z"/></svg></a>' +
      '<a href="tel:+912235006800" class="qd-btn qd-call" aria-label="Call Tat:vm"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg></a>';
    document.body.appendChild(dock);

    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble';
    bubble.innerHTML = '<span class="cb-dot"></span><span>Questions about a project? Chat with us on WhatsApp.</span>';
    document.body.appendChild(bubble);
    bubble.addEventListener('click', ()=> window.open('https://wa.me/919152000425', '_blank'));
    setTimeout(()=> bubble.classList.add('show'), 3200);
    setTimeout(()=> bubble.classList.remove('show'), 11000);
    window.addEventListener('scroll', ()=> bubble.classList.remove('show'), {once:true, passive:true});
  }

  /* ---------- Boot ---------- */
  function boot(){
    initLoader(); initImages(); initHeroMedia(); initHeader(); initMobileMenu(); initReveal();
    initCounters(); initFunda(); initCursor(); initProjNav();
    initForms(); initParallax(); initActiveNav();
    initScrollProgress(); initPageTransition(); initTilt(); initMagnetic();
    initMarquee(); initLightbox(); initQuickDock();
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
