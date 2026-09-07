/* ==========================================================================
   TAT:VM — SHARED COMPONENTS (header + footer injected into every page)
   Keeps footer/header identical site-wide per brief.
   ========================================================================== */
(function(){
  'use strict';

  const script = document.currentScript || document.querySelector('script[src*="components.js"]');
  const LOGO_SRC = script ? new URL('../../tatvm_logo.png', script.src).href : 'tatvm_logo.png';

  const HEADER = `
  <a href="#main" class="skip-link">Skip to content</a>
  <header class="site-header" id="header">
    <div class="header-inner">
      <a href="index.html" class="brand" aria-label="Tat:vm home">
        <img class="brand-logo" src="${LOGO_SRC}" alt="Tat:vm">
      </a>
      <nav class="primary-nav desktop-only" aria-label="Primary">
        <div class="nav-item">
          <a href="about.html" class="nav-link">About <span class="chev">▾</span></a>
          <div class="mega">
            <div class="mega-list">
              <a class="mega-link" href="about.html"><strong>About Tat:vm</strong><span>Who we are and why we build</span></a>
              <a class="mega-link" href="our-approach.html"><strong>Our Approach</strong><span>Understand, design, plan, build, stay</span></a>
              <a class="mega-link" href="vision-mission.html"><strong>Vision &amp; Mission</strong><span>Purpose and what customers can expect</span></a>
              <a class="mega-link" href="brand-story.html"><strong>Brand Story</strong><span>What Tat:vm means</span></a>
              <a class="mega-link" href="leadership.html"><strong>Leadership</strong><span>Raahul Maroo, Founder &amp; MD</span></a>
            </div>
          </div>
        </div>
        <div class="nav-item">
          <a href="projects.html" class="nav-link">Projects <span class="chev">▾</span></a>
          <div class="mega">
            <div class="mega-list">
              <a class="mega-link" href="projects.html"><strong>All Projects</strong><span>Residential, commercial &amp; mixed-use</span></a>
              <a class="mega-link" href="projects.html#upcoming"><strong>Upcoming Projects</strong><span>In the pipeline</span></a>
              <a class="mega-link" href="projects.html#residential"><strong>Residential</strong><span>Homes designed around living</span></a>
              <a class="mega-link" href="projects.html#commercial"><strong>Commercial</strong><span>Workspaces &amp; retail</span></a>
              <a class="mega-link" href="projects.html#redevelopment"><strong>Redevelopment</strong><span>Society &amp; SRA projects</span></a>
            </div>
          </div>
        </div>
        <div class="nav-item">
          <a href="redevelopment.html" class="nav-link">Opportunities <span class="chev">▾</span></a>
          <div class="mega">
            <div class="mega-list">
              <a class="mega-link" href="redevelopment.html"><strong>Redevelopment</strong><span>Housing society &amp; SRA</span></a>
              <a class="mega-link" href="nri.html"><strong>NRI Services</strong><span>Property support for owners abroad</span></a>
              <a class="mega-link" href="network-partners.html"><strong>Network Partners</strong><span>The professional ecosystem</span></a>
              <a class="mega-link" href="work-with-us.html"><strong>Work With Us</strong><span>Professionals, partners &amp; vendors</span></a>
              <a class="mega-link" href="csr.html"><strong>CSR</strong><span>Verified initiatives</span></a>
            </div>
          </div>
        </div>
        <div class="nav-item">
          <a href="insights.html" class="nav-link">Insights <span class="chev">▾</span></a>
          <div class="mega">
            <div class="mega-list">
              <a class="mega-link" href="insights.html"><strong>Perspectives / Blog</strong><span>Mumbai development &amp; living</span></a>
              <a class="mega-link" href="insights.html#gallery"><strong>Gallery</strong><span>Visual journey, in motion</span></a>
              <a class="mega-link" href="faqs.html"><strong>FAQs</strong><span>Direct answers</span></a>
              <a class="mega-link" href="insights.html#news"><strong>News / Media</strong><span>Latest updates</span></a>
            </div>
          </div>
        </div>
        <div class="nav-item"><a href="contact.html" class="nav-link">Contact</a></div>
      </nav>
      <div class="header-cta">
        <a href="contact.html" class="btn btn-primary btn-sm desktop-only">Let's Transform With Us <span class="arrow">→</span></a>
        <button class="hamburger mobile-only" aria-label="Open menu" aria-controls="mobileMenu"><span></span><span></span><span></span></button>
      </div>
    </div>
  </header>

  <div class="mobile-menu" id="mobileMenu" aria-label="Mobile navigation">
    <div class="mm-head">
      <img class="brand-logo" src="${LOGO_SRC}" alt="Tat:vm">
      <button class="mm-close" aria-label="Close menu">✕</button>
    </div>
    <div class="mm-body">
      <div class="mm-group">
        <div class="mm-group-title">About <span class="plus">+</span></div>
        <div class="mm-sub">
          <a href="about.html">About Tat:vm</a>
          <a href="our-approach.html">Our Approach</a>
          <a href="vision-mission.html">Vision &amp; Mission</a>
          <a href="brand-story.html">Brand Story</a>
          <a href="leadership.html">Leadership</a>
        </div>
      </div>
      <div class="mm-group">
        <div class="mm-group-title">Projects <span class="plus">+</span></div>
        <div class="mm-sub">
          <a href="projects.html">All Projects</a>
          <a href="projects.html#upcoming">Upcoming</a>
          <a href="projects.html#residential">Residential</a>
          <a href="projects.html#commercial">Commercial</a>
          <a href="projects.html#redevelopment">Redevelopment</a>
        </div>
      </div>
      <div class="mm-group">
        <div class="mm-group-title">Opportunities <span class="plus">+</span></div>
        <div class="mm-sub">
          <a href="redevelopment.html">Redevelopment</a>
          <a href="nri.html">NRI Services</a>
          <a href="network-partners.html">Network Partners</a>
          <a href="work-with-us.html">Work With Us</a>
          <a href="csr.html">CSR</a>
        </div>
      </div>
      <div class="mm-group">
        <div class="mm-group-title">Insights <span class="plus">+</span></div>
        <div class="mm-sub">
          <a href="insights.html">Perspectives / Blog</a>
          <a href="insights.html#gallery">Gallery</a>
          <a href="faqs.html">FAQs</a>
          <a href="insights.html#news">News / Media</a>
        </div>
      </div>
      <div class="mm-group">
        <div class="mm-group-title"><a href="contact.html" style="color:#fff;text-decoration:none">Contact</a></div>
      </div>
    </div>
    <div class="mm-cta">
      <a href="contact.html" class="btn">Let's Transform With Us <span class="arrow">→</span></a>
    </div>
  </div>`;

  const FOOTER = `
  <footer class="site-footer">
    <div class="container foot-top">
      <div class="foot-cta-band reveal">
        <h2>Let's build places that feel right for the people who live in them.</h2>
        <div class="btns">
          <a href="projects.html" class="btn btn-light">Explore Projects <span class="arrow">→</span></a>
          <a href="contact.html" class="btn btn-light">Let's Transform With Us <span class="arrow">→</span></a>
        </div>
      </div>

      <div class="foot-grid">
        <div class="foot-brand">
          <img class="brand-logo" src="${LOGO_SRC}" alt="Tat:vm">
          <p class="brand-tag" style="margin-top:.4rem">Rooted in you</p>
          <p>A Mumbai-based real estate development company focused on residential, commercial and mixed-use spaces — designed around how people live.</p>
          <div class="foot-social">
            <a href="https://wa.me/919152000425" aria-label="WhatsApp" target="_blank" rel="noopener"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5 4.5.7.3 1.2.5 1.7.6.7.2 1.3.2 1.8.1.6-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3-.1-.2-.3-.2-.6-.4z"/><path d="M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.4c1.4.8 3 1.2 4.8 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3.1.8.8-3-.2-.3C3.9 15 3.5 13.5 3.5 12c0-4.7 3.8-8.5 8.5-8.5s8.5 3.8 8.5 8.5-3.8 8-8.5 8z"/></svg></a>
            <a href="https://in.linkedin.com/company/tatvm-group" aria-label="LinkedIn" target="_blank" rel="noopener"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zM8.3 18.3H5.7V9.7h2.6v8.6zM7 8.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm11.3 9.8h-2.6v-4.2c0-1 0-2.3-1.4-2.3s-1.6 1.1-1.6 2.2v4.3h-2.6V9.7h2.5v1.2h.1c.4-.7 1.3-1.4 2.6-1.4 2.8 0 3.3 1.8 3.3 4.2v4.6z"/></svg></a>
            <a href="https://www.instagram.com/tatvmgroup/" aria-label="Instagram" target="_blank" rel="noopener"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.5.3 1.1.4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.5.2-1.1.3-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.5-.3-1.1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.5-.2 1.1-.3 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.1 0-3.5 0-4.7.1-.9 0-1.4.2-1.7.3-.4.2-.7.4-1 .7-.3.3-.5.6-.7 1-.1.3-.3.8-.3 1.7-.1 1.2-.1 1.6-.1 4.7s0 3.5.1 4.7c0 .9.2 1.4.3 1.7.2.4.4.7.7 1 .3.3.6.5 1 .7.3.1.8.3 1.7.3 1.2.1 1.6.1 4.7.1s3.5 0 4.7-.1c.9 0 1.4-.2 1.7-.3.4-.2.7-.4 1-.7.3-.3.5-.6.7-1 .1-.3.3-.8.3-1.7.1-1.2.1-1.6.1-4.7s0-3.5-.1-4.7c0-.9-.2-1.4-.3-1.7-.2-.4-.4-.7-.7-1-.3-.3-.6-.5-1-.7-.3-.1-.8-.3-1.7-.3-1.2-.1-1.6-.1-4.7-.1zm0 3.1a4.9 4.9 0 100 9.8 4.9 4.9 0 000-9.8zm0 8.1a3.2 3.2 0 110-6.4 3.2 3.2 0 010 6.4zm6.3-8.3a1.1 1.1 0 11-2.3 0 1.1 1.1 0 012.3 0z"/></svg></a>
            <a href="https://youtube.com/@tatvmgroup" aria-label="YouTube" target="_blank" rel="noopener"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23 7.5c-.3-1-1-1.8-2-2-1.8-.5-9-.5-9-.5s-7.2 0-9 .5c-1 .3-1.8 1-2 2C.5 9.3.5 12 .5 12s0 2.7.5 4.5c.3 1 1 1.8 2 2 1.8.5 9 .5 9 .5s7.2 0 9-.5c1-.3 1.8-1 2-2 .5-1.8.5-4.5.5-4.5s0-2.7-.5-4.5zM9.7 15.4V8.6l6 3.4-6 3.4z"/></svg></a>
          </div>
        </div>

        <div class="foot-col">
          <h4>About</h4>
          <a href="about.html">About Tat:vm</a>
          <a href="our-approach.html">Our Approach</a>
          <a href="leadership.html">Leadership</a>
          <a href="brand-story.html">Brand Story</a>
          <a href="vision-mission.html">Vision &amp; Mission</a>
        </div>

        <div class="foot-col">
          <h4>Projects</h4>
          <a href="projects.html#upcoming">Upcoming Projects</a>
          <a href="projects.html#residential">Residential</a>
          <a href="projects.html#commercial">Commercial</a>
          <a href="projects.html#redevelopment">Redevelopment</a>
          <a href="projects/ghatkopar-mixed-use.html">Ghatkopar Mixed-Use</a>
        </div>

        <div class="foot-col">
          <h4>Insights</h4>
          <a href="insights.html">Perspectives / Blog</a>
          <a href="insights.html#gallery">Gallery</a>
          <a href="faqs.html">FAQs</a>
          <a href="insights.html#news">News</a>
          <a href="insights.html#founder">Founder Perspective</a>
        </div>

        <div class="foot-col">
          <h4>Connect</h4>
          <a href="contact.html">Contact</a>
          <a href="work-with-us.html">Work With Us</a>
          <a href="network-partners.html">Network Partners</a>
          <a href="nri.html">NRI</a>
          <a href="csr.html">CSR</a>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="foot-contact" style="padding-bottom:1.6rem;border-bottom:1px solid rgba(255,255,255,.14)">
        <p style="color:#fff;font-weight:600;margin-bottom:.4rem">Tat:vm Builders &amp; Developers Private Limited</p>
        <p>Unit No. 607, 6th Floor, Lodha Supremus, Senapati Bapat Marg, Opp. Kamala Mills, Railway Colony, Lower Parel, Mumbai, Maharashtra 400013, India</p>
        <p style="margin-top:.6rem"><a href="tel:+912235006800">+91 22 3500 6800</a> &nbsp;·&nbsp; <a href="mailto:info@tatvmgroup.com">info@tatvmgroup.com</a> &nbsp;·&nbsp; CIN: U43299MH2025PTC455088</p>
      </div>
    </div>

    <div class="container">
      <div class="foot-bottom">
        <div>© 2026 <span class="foot-legal-name">Tat:vm Builders &amp; Developers Private Limited.</span> All rights reserved.</div>
        <div>
          <a href="privacy-policy.html">Privacy Policy</a> &nbsp;·&nbsp;
          <a href="terms-and-conditions.html">Terms &amp; Conditions</a> &nbsp;·&nbsp;
          <a href="cookie-policy.html">Cookie Policy</a>
        </div>
      </div>
    </div>
  </footer>

  <div class="mobile-sticky-cta">
    <a href="contact.html" class="btn btn-primary btn-block">Let's Transform With Us <span class="arrow">→</span></a>
  </div>`;

  function inject(){
    const hSlot = document.getElementById('header-slot');
    const fSlot = document.getElementById('footer-slot');
    if(hSlot) hSlot.outerHTML = HEADER;
    if(fSlot) fSlot.outerHTML = FOOTER;

    const projectToggle = document.querySelector('.project-menu-toggle');
    if(projectToggle && !document.getElementById('mobileMenu')){
      document.body.insertAdjacentHTML('beforeend', `
        <div class="mobile-menu" id="mobileMenu" aria-label="Mobile navigation">
          <div class="mm-head"><img class="brand-logo" src="${LOGO_SRC}" alt="Tat:vm"><button class="mm-close" aria-label="Close menu">✕</button></div>
          <div class="mm-body">
            <div class="mm-group"><div class="mm-group-title"><a href="../about.html">About</a></div></div>
            <div class="mm-group"><div class="mm-group-title"><a href="../projects.html">Projects</a></div></div>
            <div class="mm-group"><div class="mm-group-title"><a href="../redevelopment.html">Opportunities</a></div></div>
            <div class="mm-group"><div class="mm-group-title"><a href="../insights.html">Insights</a></div></div>
            <div class="mm-group"><div class="mm-group-title"><a href="../contact.html">Contact</a></div></div>
          </div>
          <div class="mm-cta"><a href="../contact.html" class="btn">Let's Transform With Us <span class="arrow">→</span></a></div>
        </div>`);
    }
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', inject);
  else inject();
})();
