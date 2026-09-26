const b=document.querySelector('.menu'),n=document.querySelector('.site-header nav');b.addEventListener('click',()=>n.classList.toggle('open'));n.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>n.classList.remove('open')));

async function loadCmsContent(){
 try{
  const r=await fetch('/content/site.json',{cache:'no-store'}); if(!r.ok) throw new Error('content');
  const d=await r.json();
  const news=document.getElementById('news-list');
  if(news){const items=[...(d.notices||[])].sort((a,b)=>String(b.date).localeCompare(String(a.date)));news.innerHTML=items.length?items.map(x=>'<article class="news-item"><time>'+esc(x.date||'')+'</time><div><h3>'+esc(x.title||'')+'</h3><p>'+esc(x.body||'')+'</p></div></article>').join(''):'<p class="cms-loading">現在、お知らせはありません。</p>';}
  const gal=document.getElementById('gallery-grid');
  if(gal){gal.innerHTML=(d.gallery||[]).length?d.gallery.map(x=>'<figure class="gallery-card"><img loading="lazy" src="'+attr(x.image||'')+'" alt="'+attr(x.title||'地蔵寺の写真')+'"><figcaption><strong>'+esc(x.title||'')+'</strong><span>'+esc(x.description||'')+'</span></figcaption></figure>').join(''):'<p class="cms-loading">写真は順次追加いたします。</p>';}
 }catch(e){document.querySelectorAll('.cms-loading').forEach(x=>x.textContent='内容を読み込めませんでした。');}
}
function esc(v){return String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function attr(v){return esc(v)}
loadCmsContent();
