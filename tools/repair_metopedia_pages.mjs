import fs from 'fs';
import path from 'path';

const root = process.cwd();
const pageDataPath = path.join(root, '_data', 'pages.json');
const pageData = fs.existsSync(pageDataPath) ? JSON.parse(fs.readFileSync(pageDataPath, 'utf8')) : [];
const titles = new Map(pageData.map(p => [p.slug || p.slug_name || String(p.title || '').replace(/\s+/g, '_'), p.title || '']));

function esc(s){
  return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function unesc(s){
  return String(s ?? '').replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
}

function titleFromSlug(slug){
  const clean = String(slug || '').split('#')[0].replace(/^:/, '').replace(/^Category:/, '');
  return titles.get(clean) || clean.replace(/[_-]+/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

function slugify(s){
  return String(s || '').toLowerCase().replace(/<[^>]+>/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'section';
}

function urlFor(slug){
  slug = String(slug || '').trim();
  if(!slug || slug === 'Main_Page') return '/';
  if(slug.startsWith(':')) slug = slug.slice(1);
  if(slug.startsWith('#')) return '#' + slugify(slug.slice(1));
  if(slug.startsWith('Special:')) return '/' + slug.replace(/^Special:/, 'Special/') + '/';
  if(slug.startsWith('Category:')) return '/Special/Categories/#' + slugify(slug.slice(9));
  if(slug.includes(':')){
    const [ns, ...rest] = slug.split(':');
    return '/' + ns + '/' + rest.join(':').replace(/^\/+/, '').replace(/\/+/g, '/') + '/';
  }
  return '/' + slug + '/';
}

function link(slug, label = ''){
  return `<a href="${esc(urlFor(slug))}">${esc(label || titleFromSlug(slug))}</a>`;
}

function protect(text){
  const blocks = [];
  const out = text.replace(/<(pre|code|kbd|script|style)\b[\s\S]*?<\/\1>/gi, m => {
    const key = `@@METOPEDIA_PROTECTED_${blocks.length}@@`;
    blocks.push(m);
    return key;
  });
  return [out, blocks];
}

function restore(text, blocks){
  for(let i = 0; i < blocks.length; i++) text = text.replaceAll(`@@METOPEDIA_PROTECTED_${i}@@`, blocks[i]);
  return text;
}

function convertTemplates(text){
  text = text.replace(/\{\{short description\|[^{}]*\}\}\s*/gi, '');
  text = text.replace(/\{\{Clear\}\}/gi, '<div style="clear:both"></div>');
  text = text.replace(/\{\{Main\|([^{}]+)\}\}/g, (_, raw) => {
    const parts = raw.split('|').map(x => x.trim()).filter(Boolean);
    const label = parts.length === 1 ? 'Main article' : 'Main articles';
    return `<div class="hatnote"><i>${label}:</i> ${parts.map(p => link(p)).join(', ')}</div>`;
  });
  text = text.replace(/\{\{See also\|([^{}]+)\}\}/g, (_, raw) => {
    const parts = raw.split('|').map(x => x.trim()).filter(Boolean);
    return `<div class="hatnote"><i>See also:</i> ${parts.map(p => link(p)).join(', ')}</div>`;
  });
  text = text.replace(/\{\{About\|([^{}]+)\}\}/g, (_, raw) => `<div class="hatnote"><i>About:</i> ${esc(raw)}</div>`);
  return text;
}

function convertLinks(text){
  const [body, blocks] = protect(text);
  let out = body;
  out = out.replace(/\[\[([^\]|#]+)#([^\]|]+)\|([^\]]+)\]\]/g, (_, slug, anchor, label) => `<a href="${esc(urlFor(slug))}#${slugify(anchor)}">${esc(label)}</a>`);
  out = out.replace(/\[\[#([^\]|]+)\|([^\]]+)\]\]/g, (_, anchor, label) => `<a href="#${slugify(anchor)}">${esc(label)}</a>`);
  out = out.replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, (_, slug, label) => String(slug).startsWith('Category:') ? '' : link(slug, label));
  out = out.replace(/\[\[([^\]]+)\]\]/g, (_, slug) => String(slug).startsWith('Category:') ? '' : link(slug));
  return restore(out, blocks);
}

function firstTopLevelSlash(s){
  let depth = 0;
  for(let i = 0; i < s.length; i++){
    const ch = s[i];
    if(ch === '\\'){
      i++;
      continue;
    }
    if('{[('.includes(ch)) depth++;
    else if('}])'.includes(ch) && depth > 0) depth--;
    else if(ch === '/' && depth === 0) return i;
  }
  return -1;
}

function splitTopLevel(s, separator){
  const out = [];
  let buf = '';
  let depth = 0;
  for(let i = 0; i < s.length; i++){
    const ch = s[i];
    if(ch === '\\'){
      buf += ch;
      if(i + 1 < s.length) buf += s[++i];
      continue;
    }
    if('{[('.includes(ch)) depth++;
    else if('}])'.includes(ch) && depth > 0) depth--;
    if(ch === separator && depth === 0){
      out.push(buf);
      buf = '';
    }else{
      buf += ch;
    }
  }
  out.push(buf);
  return out;
}

function bracedFraction(s){
  s = s.trim();
  if(!s || /\\[dt]?frac/.test(s)) return s;
  let prefix = '';
  if(s.startsWith('-')){
    prefix = '-';
    s = s.slice(1).trim();
  }
  const i = firstTopLevelSlash(s);
  if(i < 1) return prefix + s;
  const left = s.slice(0, i).trim();
  const right = s.slice(i + 1).trim();
  if(!left || !right) return prefix + s;
  return `${prefix}\\dfrac{${left}}{${right}}`;
}

function normalizeExponentFractions(tex){
  let out = '';
  for(let i = 0; i < tex.length; i++){
    if(tex[i] !== '^' || tex[i + 1] !== '{'){
      out += tex[i];
      continue;
    }
    let j = i + 2;
    let depth = 1;
    let inner = '';
    for(; j < tex.length; j++){
      const ch = tex[j];
      if(ch === '\\'){
        inner += ch;
        if(j + 1 < tex.length) inner += tex[++j];
        continue;
      }
      if(ch === '{') depth++;
      else if(ch === '}'){
        depth--;
        if(depth === 0) break;
      }
      inner += ch;
    }
    if(depth !== 0){
      out += tex.slice(i);
      break;
    }
    out += `^{${bracedFraction(normalizeExponentFractions(inner))}}`;
    i = j;
  }
  return out;
}

function normalizeTex(tex){
  tex = unesc(tex).trim().replace(/\s+/g, ' ').replace(/\\frac/g, '\\dfrac');
  const parts = splitTopLevel(tex, '=');
  return parts.map(part => normalizeExponentFractions(bracedFraction(part))).join('=');
}

function texNode(tex, display = false){
  tex = normalizeTex(tex);
  const tag = display ? 'div' : 'span';
  const cls = display ? 'tex-math math-display-source' : 'tex-math math-inline-source';
  const mode = display ? 'block' : 'inline';
  return `<${tag} class="${cls}" data-display="${mode}" data-tex="${esc(tex)}">${esc(tex)}</${tag}>`;
}

function convertMath(text){
  text = text.replace(/&lt;(\/?math(?:\s+display=(?:&quot;|"|')block(?:&quot;|"|'))?)&gt;/g, (_, tag) => `<${tag.replace(/&quot;/g, '"')}>`);
  return text.replace(/<math([^>]*)>([\s\S]*?)<\/math>/g, (_, attrs, tex) => texNode(tex, /display\s*=\s*["']block["']/.test(attrs || '')));
}

function normalizeExistingTexNodes(text){
  return text.split('\n').map(line => line.replace(/<(span|div)\b([^>]*\bclass="[^"]*tex-math[^"]*"[^>]*)\bdata-tex="([^"]*)"([^>]*)>([^<]*)<\/\1>/g, (match, tag, before, tex) => {
    const display = /data-display="block"|math-display-source/.test(match);
    const cls = (match.match(/\bclass="([^"]*)"/) || [,''])[1] || (display ? 'tex-math math-display-source' : 'tex-math math-inline-source');
    const mode = (match.match(/\bdata-display="([^"]*)"/) || [, display ? 'block' : 'inline'])[1];
    const normalized = normalizeTex(tex);
    return `<${tag} class="${esc(cls)}" data-display="${esc(mode)}" data-tex="${esc(normalized)}">${esc(normalized)}</${tag}>`;
  })).join('\n');
}

function files(dir){
  if(!fs.existsSync(dir)) return [];
  const out = [];
  for(const ent of fs.readdirSync(dir, {withFileTypes:true})){
    const full = path.join(dir, ent.name);
    if(ent.isDirectory()) out.push(...files(full));
    else if(/\.(md|html)$/i.test(ent.name)) out.push(full);
  }
  return out;
}

const targets = [...files(path.join(root, 'pages')), path.join(root, 'index.md'), path.join(root, '404.html')].filter(fs.existsSync);
let changed = 0;
for(const file of targets){
  const before = fs.readFileSync(file, 'utf8');
  const repaired = convertMath(convertLinks(convertTemplates(before))).replace(/\{% raw %\}\s*/g, '').replace(/\s*\{% endraw %\}/g, '');
  const after = /tex-math|data-tex=/.test(repaired) ? normalizeExistingTexNodes(repaired) : repaired;
  if(after !== before){
    fs.writeFileSync(file, after);
    changed++;
    console.log(`repaired ${path.relative(root, file)}`);
  }
}

const bad = [];
for(const file of targets){
  const text = fs.readFileSync(file, 'utf8');
  if(/&lt;\/?math|<math\b|\{\{Main\||\{\{See also\||\{\{About\|/.test(text)) bad.push(path.relative(root, file));
}
if(bad.length){
  console.error('Unrepaired wiki/math syntax remains in:');
  for(const file of bad) console.error(' - ' + file);
  process.exit(1);
}
console.log(`Metopedia page repair complete. Files changed: ${changed}`);
process.exit(0);
