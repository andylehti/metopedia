
(function(){
  const pages = window.METOPEDIA_PAGES || [];
  const pageBySlug = new Map();
  const pageByTitle = new Map();
  const knownPaths = new Set(['/']);
  function normalizeSlug(value){
    return (value || '')
      .toString()
      .trim()
      .replace(/^\/+|\/+$/g, '')
      .replace(/\s+/g, '_')
      .replace(/%20/g, '_')
      .replace(/_/g, '_');
  }
  function normalizePath(path){
    if(!path) return '/';
    let next = path;
    try{
      next = new URL(path, location.origin).pathname;
    }catch(e){}
    next = next.replace(/\/+/g, '/');
    if(next.length > 1) next = next.replace(/\/+$/g, '');
    return next || '/';
  }
  pages.forEach(p => {
    const slug = normalizeSlug(p.slug).toLowerCase();
    const title = (p.title || '').trim().toLowerCase();
    if(slug) pageBySlug.set(slug, p);
    if(title) pageByTitle.set(title, p);
    knownPaths.add(normalizePath(p.url));
  });
  knownPaths.add('/Main_Page');
  knownPaths.add('/Special/Search');
  function legacyPath(slug){
    if(!slug || slug === 'Main_Page') return '/';
    if(slug.startsWith('Special:')) return '/' + slug.replace(/^Special:/,'Special/') + '/';
    if(slug.includes(':')){ const parts = slug.split(':'); return '/' + parts[0] + '/' + parts.slice(1).join(':').replace(/^\//,'') + '/'; }
    return '/' + slug + '/';
  }
  function resolveWikiTarget(target){
    const raw = (target || '').trim();
    if(!raw) return null;
    const normalized = normalizeSlug(raw);
    const bySlug = pageBySlug.get(normalized.toLowerCase());
    if(bySlug) return { exists: true, page: bySlug, href: bySlug.url };
    const byTitle = pageByTitle.get(raw.toLowerCase());
    if(byTitle) return { exists: true, page: byTitle, href: byTitle.url };
    return { exists: false, href: legacyPath(normalized), slug: normalized };
  }
  function convertWikiTextNode(node){
    const text = node.nodeValue;
    if(!text || text.indexOf('[[') === -1) return;
    const frag = document.createDocumentFragment();
    const re = /\[\[([^[\]]+?)\]\]/g;
    let last = 0;
    let changed = false;
    let match;
    while((match = re.exec(text))){
      const start = match.index;
      if(start > last) frag.appendChild(document.createTextNode(text.slice(last, start)));
      const token = (match[1] || '').trim();
      const parts = token.split('|');
      const target = (parts[0] || '').trim();
      const label = (parts[1] || parts[0] || '').trim();
      const resolved = resolveWikiTarget(target);
      if(resolved && label){
        const link = document.createElement('a');
        link.textContent = label;
        link.href = resolved.href;
        if(!resolved.exists){
          link.classList.add('redlink');
          link.dataset.missing = '1';
          link.title = `${label} (page does not exist)`;
          link.setAttribute('aria-label', `${label} (missing page)`);
        }
        frag.appendChild(link);
      }else{
        frag.appendChild(document.createTextNode(match[0]));
      }
      last = re.lastIndex;
      changed = true;
    }
    if(!changed) return;
    if(last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
    node.parentNode.replaceChild(frag, node);
  }
  function upgradeWikiLinks(){
    const root = document.getElementById('bodyContent');
    if(!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node){
        const parent = node.parentElement;
        if(!parent) return NodeFilter.FILTER_REJECT;
        const tag = parent.tagName;
        if(['A', 'SCRIPT', 'STYLE', 'CODE', 'PRE', 'TEXTAREA', 'NOSCRIPT'].includes(tag)) return NodeFilter.FILTER_REJECT;
        if(parent.closest('a, code, pre, textarea, script, style, noscript')) return NodeFilter.FILTER_REJECT;
        return node.nodeValue && node.nodeValue.includes('[[') ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    const nodes = [];
    while(walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(convertWikiTextNode);
  }
  function markDeadInternalLinks(){
    const root = document.getElementById('bodyContent');
    if(!root) return;
    root.querySelectorAll('a[href]').forEach(link => {
      let url;
      try{
        url = new URL(link.getAttribute('href'), location.origin);
      }catch(e){
        return;
      }
      if(url.origin !== location.origin) return;
      const path = normalizePath(url.pathname);
      const isKnown = knownPaths.has(path);
      if(!isKnown){
        link.classList.add('redlink');
        if(!link.title) link.title = `${(link.textContent || 'Link').trim()} (page does not exist)`;
      }
    });
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

  function slugifyHeading(text){
    return (text || '')
      .toString()
      .trim()
      .replace(/<[^>]+>/g, '')
      .replace(/&[^;]+;/g, '')
      .replace(/[^A-Za-z0-9\s_-]/g, '')
      .replace(/\s+/g, '_')
      .replace(/_+/g, '_')
      .replace(/^_+|_+$/g, '') || 'Section';
  }
  function enhanceWikiTables(){
    const root = document.getElementById('bodyContent');
    if(!root) return;
    root.querySelectorAll('table').forEach(table => {
      if(table.closest('.toc, .infobox, .navbox, .language-menu')) return;
      if(table.classList.contains('infobox') || table.classList.contains('navbox')) return;
      table.classList.add('wikitable');
      if(table.parentElement && table.parentElement.classList.contains('wikitable-wrap')) return;
      const wrap = document.createElement('div');
      wrap.className = 'wikitable-wrap';
      table.parentNode.insertBefore(wrap, table);
      wrap.appendChild(table);
    });
  }
  function buildAutoToc(){
    const root = document.getElementById('bodyContent');
    if(!root || root.querySelector('.toc')) return;
    const headings = Array.from(root.querySelectorAll('h2, h3')).filter(h => !h.closest('.infobox, .navbox, .toc, .footnotes'));
    if(headings.length < 4) return;
    const seen = new Map();
    headings.forEach(h => {
      if(!h.id){
        const base = slugifyHeading(h.textContent);
        const next = (seen.get(base) || 0) + 1;
        seen.set(base, next);
        h.id = next === 1 ? base : base + '_' + next;
      }
    });
    const toc = document.createElement('div');
    toc.className = 'toc';
    toc.setAttribute('role', 'navigation');
    toc.setAttribute('aria-label', 'Contents');
    const title = document.createElement('div');
    title.className = 'toc-title';
    title.innerHTML = '<h2>Contents</h2>';
    const list = document.createElement('ul');
    let n2 = 0;
    let n3 = 0;
    headings.forEach(h => {
      if(h.tagName === 'H2'){
        n2 += 1;
        n3 = 0;
      }else{
        n3 += 1;
      }
      const li = document.createElement('li');
      li.className = h.tagName === 'H2' ? 'toc-level-2' : 'toc-level-3';
      const a = document.createElement('a');
      a.href = '#' + encodeURIComponent(h.id).replace(/%20/g, '_');
      const number = h.tagName === 'H2' ? String(n2) : n2 + '.' + n3;
      const span = document.createElement('span');
      span.className = 'toc-number';
      span.textContent = number;
      a.appendChild(span);
      a.appendChild(document.createTextNode(h.textContent.trim()));
      li.appendChild(a);
      list.appendChild(li);
    });
    toc.appendChild(title);
    toc.appendChild(list);
    const firstH2 = root.querySelector('h2');
    if(firstH2) firstH2.parentNode.insertBefore(toc, firstH2);
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
    const status = 'denied';
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
    if(stored === 'ok'){
      applyCookieConsent(stored);
      return;
    }
    banner.hidden = false;
    const ok = document.getElementById('cookie-ok');
    ok?.addEventListener('click', () => {
      try{ localStorage.setItem('metopedia-cookie-consent', 'ok'); }catch(e){}
      applyCookieConsent('ok');
      banner.hidden = true;
    });
  }
  function setupLanguageMenu(){
    const toggle = document.getElementById('language-toggle');
    const menu = document.getElementById('language-menu');
    if(!toggle || !menu) return;
    const close = () => {
      menu.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
    };
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const nextOpen = menu.hidden;
      menu.hidden = !nextOpen;
      toggle.setAttribute('aria-expanded', String(nextOpen));
    });
    document.addEventListener('click', (e) => {
      if(menu.hidden) return;
      if(e.target === toggle || menu.contains(e.target)) return;
      close();
    });
    document.addEventListener('keydown', (e) => {
      if(e.key === 'Escape') close();
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
    setupLanguageMenu();
    upgradeWikiLinks();
    enhanceWikiTables();
    buildAutoToc();
    markDeadInternalLinks();
    renderMath();
  });
})();
