
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
  function renderMath(){
    if(!window.katex) return;
    document.querySelectorAll('math').forEach(el => {
      const tex = el.textContent || '';
      const displayMode = el.getAttribute('display') === 'block';
      const span = document.createElement(displayMode ? 'div' : 'span');
      span.className = displayMode ? 'katex-display math-rendered' : 'math-rendered';
      try{ window.katex.render(tex, span, { displayMode, throwOnError:false }); el.replaceWith(span); }catch(e){}
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
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    document.getElementById('theme-toggle')?.addEventListener('click', () => applyTheme(document.body.classList.contains('theme-dark') ? 'light' : 'dark'));
    document.getElementById('mobile-menu-toggle')?.addEventListener('click', () => setMobileMenu(true));
    document.getElementById('mobile-menu-close')?.addEventListener('click', () => setMobileMenu(false));
    document.getElementById('mobile-panel-backdrop')?.addEventListener('click', () => setMobileMenu(false));
    setupSearch();
    renderMath();
  });
})();
