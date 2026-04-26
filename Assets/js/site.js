
(function(){
  const pages = window.METOPEDIA_PAGES || [];
  function legacyPath(slug){
    if(!slug || slug === 'Main_Page') return '/';
    if(slug.startsWith('Special:')) return '/' + slug.replace(/^Special:/,'Special/') + '/';
    if(slug.includes(':')){ const parts = slug.split(':'); return '/' + parts[0] + '/' + parts.slice(1).join(':').replace(/^\//,'') + '/'; }
    return '/' + slug + '/';
  }
  if(location.hash && location.hash.startsWith('#/')){
    const slug = decodeURIComponent(location.hash.slice(2));
    location.replace(legacyPath(slug));
    return;
  }
  function applyTheme(theme){
    const next = theme === 'dark' ? 'dark' : 'light';
    document.body.classList.toggle('theme-dark', next === 'dark');
    const btn = document.getElementById('theme-toggle');
    if(btn){ btn.textContent = next === 'dark' ? '☀' : '☾'; btn.title = next === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'; btn.setAttribute('aria-label', btn.title); }
    try{ localStorage.setItem('metopedia-theme', next); }catch(e){}
  }
  function initTheme(){
    let stored = null; try{ stored = localStorage.getItem('metopedia-theme'); }catch(e){}
    if(!stored && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) stored = 'dark';
    applyTheme(stored || 'light');
  }
  function setMobileMenu(open){
    document.body.classList.toggle('menu-open', open);
    const overlay = document.getElementById('mobile-panel-overlay');
    if(overlay){ overlay.classList.toggle('open', open); overlay.setAttribute('aria-hidden', String(!open)); }
  }
  function renderMath(attempt){
    attempt = attempt || 0;
    const sourceNodes = Array.from(document.querySelectorAll('.tex-math, math')).filter(el => el.getAttribute('data-rendered') !== '1');
    if(!sourceNodes.length) return;
    if(!(window.MathJax && window.MathJax.startup && window.MathJax.startup.promise)){
      if(attempt < 80) setTimeout(() => renderMath(attempt + 1), 50);
      return;
    }
    window.MathJax.startup.promise.then(() => {
      sourceNodes.forEach(el => {
        if(el.getAttribute('data-rendering') === '1') return;
        const tex = (el.getAttribute('data-tex') || el.textContent || '').trim();
        if(!tex) return;
        el.setAttribute('data-rendering', '1');
        const displayMode = el.getAttribute('data-display') === 'block' || el.getAttribute('display') === 'block' || el.classList.contains('math-display-source');
        const parent = el.parentElement;
        const replaceTarget = (displayMode && parent && parent.tagName === 'P' && parent.textContent.trim() === el.textContent.trim()) ? parent : el;

        const renderPromise = window.MathJax.tex2svgPromise
          ? window.MathJax.tex2svgPromise(tex, { display: displayMode })
          : Promise.resolve(null);

        renderPromise
          .then(node => {
            const rendered = document.createElement(displayMode ? 'div' : 'span');
            rendered.className = displayMode ? 'math-display math-rendered' : 'math-inline math-rendered';
            rendered.setAttribute('data-rendered', '1');
            if(node){
              rendered.appendChild(node);
            }else{
              rendered.textContent = displayMode ? '\\[' + tex + '\\]' : '\\(' + tex + '\\)';
              const fallbackTypeset = window.MathJax.typesetPromise ? window.MathJax.typesetPromise([rendered]) : Promise.resolve();
              return fallbackTypeset.then(() => rendered);
            }
            return rendered;
          })
          .then(rendered => {
            if(!rendered) return;
            replaceTarget.replaceWith(rendered);
          })
          .catch(() => {
            const rendered = document.createElement(displayMode ? 'div' : 'span');
            rendered.className = (displayMode ? 'math-display math-rendered' : 'math-inline math-rendered') + ' math-failed';
            rendered.setAttribute('data-rendered', '1');
            rendered.classList.add('math-failed');
            rendered.textContent = tex;
            replaceTarget.replaceWith(rendered);
          });
      });
    });
  }
  function setupSearch(){
    const form = document.getElementById('search-form');
    const input = document.getElementById('searchInput');
    if(form && input){
      form.addEventListener('submit', e => {
        e.preventDefault();
        const q = input.value.trim();
        if(!q) return;
        const n = q.toLowerCase().replace(/\s+/g,'_');
        const exact = pages.find(p => p.slug.toLowerCase() === n || p.title.toLowerCase() === q.toLowerCase());
        if(exact) location.href = exact.url;
        else location.href = '/Special/Search/?q=' + encodeURIComponent(q);
      });
    }
    const searchPageInput = document.getElementById('search-page-input');
    const results = document.getElementById('search-page-results');
    if(searchPageInput && results){
      const params = new URLSearchParams(location.search);
      searchPageInput.value = params.get('q') || '';
      const render = () => {
        const q = searchPageInput.value.trim().toLowerCase();
        const matches = pages.filter(p => !q || (p.title+' '+p.slug+' '+(p.description||'')).toLowerCase().includes(q)).slice(0,80);
        results.innerHTML = matches.map(p => '<li><a href="'+p.url+'">'+p.title+'</a><div class="search-hit-meta">'+(p.description||'')+'</div></li>').join('') || '<li>No matching pages found.</li>';
      };
      searchPageInput.addEventListener('input', render); render();
    }
  }
  function applyCookieConsent(consent){
    const status = consent === 'accept' ? 'granted' : 'denied';
    if(typeof window.gtag === 'function'){
      window.gtag('consent', 'update', {
        analytics_storage: status,
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied'
      });
    }
  }
  function setupCookieConsent(){
    const banner = document.getElementById('cookie-consent-banner');
    if(!banner) return;
    let stored = null;
    try{ stored = localStorage.getItem('metopedia-cookie-consent'); }catch(e){}
    if(stored === 'accept' || stored === 'reject'){
      applyCookieConsent(stored);
      return;
    }
    banner.hidden = false;
    const accept = document.getElementById('cookie-accept');
    const reject = document.getElementById('cookie-reject');
    accept?.addEventListener('click', () => {
      try{ localStorage.setItem('metopedia-cookie-consent', 'accept'); }catch(e){}
      applyCookieConsent('accept');
      banner.hidden = true;
    });
    reject?.addEventListener('click', () => {
      try{ localStorage.setItem('metopedia-cookie-consent', 'reject'); }catch(e){}
      applyCookieConsent('reject');
      banner.hidden = true;
    });
  }
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    document.getElementById('theme-toggle')?.addEventListener('click', () => applyTheme(document.body.classList.contains('theme-dark') ? 'light' : 'dark'));
    document.getElementById('mobile-menu-toggle')?.addEventListener('click', () => setMobileMenu(true));
    document.getElementById('mobile-menu-close')?.addEventListener('click', () => setMobileMenu(false));
    document.getElementById('mobile-panel-backdrop')?.addEventListener('click', () => setMobileMenu(false));
    setupSearch();
    setupCookieConsent();
    renderMath();
  });
})();
