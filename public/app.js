'use strict';
const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const {cases, dimensions} = window.NAVFORGE;
const escape = value => String(value).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmt = sec => `${String(Math.floor(sec / 60)).padStart(2,'0')}:${String(Math.floor(sec % 60)).padStart(2,'0')}`;
let selected='ALL', expanded=false, query='', activeCase=null, activeImage=0, modalSequence=[], returnFocus=null;
const featured=['MP01','SP03','GE03','SG03','LH01','SE03','GE05','SP01','SG04'];
const ordered=[...cases].sort((a,b)=>{const x=featured.indexOf(a.id),y=featured.indexOf(b.id);return (x<0?999:x)-(y<0?999:y)||a.id.localeCompare(b.id)});
function filterCases(){return ordered.filter(c=>(selected==='ALL'||c.dimension===selected)&&(!query||`${c.id} ${c.title} ${c.asset} ${c.description} ${c.instruction} ${dimensions.find(d=>d.id===c.dimension).name}`.toLowerCase().includes(query.toLowerCase())))}
function renderFilters(){
 $('#filters').innerHTML=[{id:'ALL',name:'全部'},...dimensions].map(d=>`<button class="filter ${selected===d.id?'active':''}" data-filter="${d.id}" aria-pressed="${selected===d.id}" aria-label="${escape(d.name)}，${d.id==='ALL'?cases.length:cases.filter(c=>c.dimension===d.id).length}个样例">${d.id}<small>${String(d.id==='ALL'?cases.length:cases.filter(c=>c.dimension===d.id).length).padStart(2,'0')}</small></button>`).join('');
}
function renderCases(){
 const found=filterCases(),shown=expanded||selected!=='ALL'||query?found:found.slice(0,9);
 $('#case-grid').innerHTML=shown.map(c=>`<button class="case-card" data-case="${c.id}" aria-label="观看 ${c.id}：${escape(c.title)}"><div class="card-image"><img src="${c.poster}" alt="${escape(c.title)}的实际视频画面" loading="lazy" width="1280" height="720"><span class="card-id">${c.id}</span><span class="card-play" aria-hidden="true">▶</span><span class="card-duration">${fmt(c.duration)}</span></div><div class="card-meta"><span>${escape(c.modeShort)}</span>${c.images.length?'<span class="card-route">+ 场景预览</span>':''}</div><h3>${escape(c.title)}<span aria-hidden="true">↗</span></h3><p>${escape(c.asset)}</p></button>`).join('');
 $('#results-label').textContent=selected==='ALL'?'全部能力 / ALL CAPABILITIES':`${selected} / ${dimensions.find(d=>d.id===selected).name}`;
 $('#results-count').textContent=`${String(found.length).padStart(2,'0')} CASE${found.length===1?'':'S'}`;
 $('#empty-state').hidden=found.length>0;
 $('#load-more').hidden=shown.length===found.length;
 $('#load-more').innerHTML=`展开全部 ${found.length} 个样例 <span>↓</span>`;
}
function setFilter(id,scroll=false){selected=id;expanded=false;renderFilters();renderCases();if(scroll)$('#cases').scrollIntoView({behavior:'smooth'});}
$('#filters').addEventListener('click',e=>{const b=e.target.closest('[data-filter]');if(b)setFilter(b.dataset.filter)});
$('#load-more').addEventListener('click',()=>{expanded=true;renderCases()});
$('#search-toggle').addEventListener('click',()=>{const open=$('#search-row').hidden;$('#search-row').hidden=!open;$('#search-toggle').setAttribute('aria-expanded',String(open));if(open)$('#case-search').focus()});
$('#case-search').addEventListener('input',e=>{query=e.target.value;renderCases()});
$('#search-clear').addEventListener('click',()=>{query='';$('#case-search').value='';renderCases();$('#case-search').focus()});
$('#reset-search').addEventListener('click',()=>{query='';$('#case-search').value='';setFilter('ALL')});
$('#case-grid').addEventListener('click',e=>{const b=e.target.closest('[data-case]');if(b){modalSequence=filterCases();openCase(b.dataset.case,b)}});
function selectDimension(id,focus=false){
 const d=dimensions.find(x=>x.id===id);$$('.cap-tab').forEach(b=>{const on=b.dataset.dimension===id;b.classList.toggle('active',on);b.setAttribute('aria-selected',on);b.tabIndex=on?0:-1;if(on&&focus)b.focus()});
 $('#cap-panel').setAttribute('aria-labelledby',`cap-${id}`);$('#cap-image').src=`assets/poster/${d.cover}.jpg`;$('#cap-image').alt=`${d.name}：${d.scene}`;$('#cap-image-code').textContent=id;$('#cap-en').textContent=d.english;$('#cap-question').textContent=d.question;$('#cap-desc').textContent=d.description;$('#cap-explore').innerHTML=`探索 ${id} 样例 <span>↗</span>`;$('#cap-explore').onclick=()=>setFilter(id,true);
}
$('#cap-list').innerHTML=dimensions.map(d=>`<button id="cap-${d.id}" class="cap-tab" data-dimension="${d.id}" role="tab" aria-controls="cap-panel" aria-selected="false" tabindex="-1"><span class="cap-code">${d.id}</span><span class="cap-name"><strong>${d.name}</strong><small>${d.english}</small></span><span aria-hidden="true">↗</span></button>`).join('');
$('#cap-list').addEventListener('click',e=>{const b=e.target.closest('[data-dimension]');if(b)selectDimension(b.dataset.dimension)});
$('#cap-list').addEventListener('keydown',e=>{if(!['ArrowRight','ArrowLeft','ArrowDown','ArrowUp','Home','End'].includes(e.key))return;e.preventDefault();const i=dimensions.findIndex(d=>d.id===document.activeElement.dataset.dimension);const next=e.key==='Home'?0:e.key==='End'?5:(i+(['ArrowRight','ArrowDown'].includes(e.key)?1:-1)+6)%6;selectDimension(dimensions[next].id,true)});
const dialog=$('#case-dialog'),video=$('#case-video');
function openCase(id,trigger,initialTab='video'){
 const c=cases.find(x=>x.id===id);if(!c)return;
 if(trigger)returnFocus=trigger;
 if(!dialog.open){dialog.showModal();document.body.classList.add('modal-open');$('#hero-video').pause()}
 activeCase=c;activeImage=0;
 const dim=dimensions.find(x=>x.id===c.dimension);
 $('#modal-id').textContent=`${c.id} / ${dim.english.toUpperCase()}`;
 $('#modal-title').textContent=c.title;$('#modal-type').textContent=c.mode;$('#modal-desc').textContent=c.description;$('#modal-asset').textContent=c.asset;$('#modal-instruction').textContent=c.instruction;$('#modal-boundary').textContent=c.boundary;$('#modal-source').href=c.source;
 $('#video-time').textContent=`${fmt(c.duration)} · ${c.width} × ${c.height}`;
 video.pause();video.poster=c.poster;video.src=c.video;video.load();$('#media-error').hidden=true;
 $('#tab-images').hidden=!c.images.length;
 setTab(initialTab==='images'&&c.images.length?'images':'video');
 if(c.images.length)renderImage();
 if(!modalSequence.length||!modalSequence.some(x=>x.id===id))modalSequence=ordered;
 $('#modal-position').textContent=`${String(modalSequence.findIndex(x=>x.id===id)+1).padStart(2,'0')} / ${String(modalSequence.length).padStart(2,'0')} CASES`;
 dialog.scrollTop=0;history.replaceState(null,'',`#case=${id}`);
}
function setTab(tab){const isVideo=tab==='video';$('#video-panel').hidden=!isVideo;$('#images-panel').hidden=isVideo;$('#tab-video').classList.toggle('active',isVideo);$('#tab-images').classList.toggle('active',!isVideo);$('#tab-video').setAttribute('aria-pressed',isVideo);$('#tab-images').setAttribute('aria-pressed',!isVideo);if(!isVideo)video.pause();}
function renderImage(){const im=activeCase.images[activeImage];$('#modal-image').src=im.src;$('#modal-image').alt=im.caption||`${activeCase.id} 场景预览 ${activeImage+1}`;$('#image-caption').textContent=im.caption;$('#image-full').href=im.src;$('#image-index').textContent=`${activeImage+1} / ${activeCase.images.length}`;$('#image-thumbs').innerHTML=activeCase.images.map((im,i)=>`<button data-image="${i}" class="${i===activeImage?'active':''}" aria-label="第 ${i+1} 张场景图片" aria-pressed="${i===activeImage}"><img src="${im.src}" alt="" loading="lazy"></button>`).join('');}
$('#tab-video').onclick=()=>setTab('video');$('#tab-images').onclick=()=>setTab('images');
$('#prev-image').onclick=()=>{activeImage=(activeImage-1+activeCase.images.length)%activeCase.images.length;renderImage()};$('#next-image').onclick=()=>{activeImage=(activeImage+1)%activeCase.images.length;renderImage()};
$('#image-thumbs').onclick=e=>{const b=e.target.closest('[data-image]');if(b){activeImage=Number(b.dataset.image);renderImage()}};
function closeCase(){dialog.close()}
$('#modal-close').onclick=closeCase;
dialog.addEventListener('close',()=>{video.pause();video.removeAttribute('src');video.load();activeCase=null;document.body.classList.remove('modal-open');history.replaceState(null,'','#cases');if(returnFocus?.isConnected)returnFocus.focus({preventScroll:true});syncHero()});
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeCase()}});
function stepCase(delta){const i=modalSequence.findIndex(c=>c.id===activeCase.id);openCase(modalSequence[(i+delta+modalSequence.length)%modalSequence.length].id)}
$('#prev-case').onclick=()=>stepCase(-1);$('#next-case').onclick=()=>stepCase(1);
video.addEventListener('error',()=>{if(activeCase&&video.currentSrc)$('#media-error').hidden=false});$('#retry-video').onclick=()=>{$('#media-error').hidden=true;video.load()};
const routeChoices={SP03:{file:'assets/routes/SP03-3.jpg',tag:'SP03 · MULTI-FLOOR',alt:'商场中庭一层与二层的三维路线斜视图'},LH01:{file:'assets/routes/LH01-2.jpg',tag:'LH01 · LONG-HORIZON',alt:'NVIDIA 工厂完整巡检路线与任务站点'},GE02:{file:'assets/routes/GE02-3.jpg',tag:'GE02 · INDOOR / OUTDOOR',alt:'Bistro 餐馆室内外连通路线'}};
let routeSelected='SP03';$$('[data-route]').forEach(b=>b.onclick=()=>{routeSelected=b.dataset.route;const r=routeChoices[routeSelected];$('#route-image').src=r.file;$('#route-image').alt=r.alt;$('#route-tag').textContent=r.tag;$$('[data-route]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',x===b)});$('#route-stage').setAttribute('aria-label',`查看 ${routeSelected} 场景与三维轨迹`)});
$('#route-stage').onclick=()=>{modalSequence=ordered;openCase(routeSelected,$('#route-stage'),'images');activeImage=Math.max(0,activeCase.images.findIndex(im=>im.src===routeChoices[routeSelected].file));renderImage()};
const hero=$('#hero-video'),reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)');let heroInView=true,heroManualPause=reduceMotion.matches;
function syncHero(){if(!heroManualPause&&heroInView&&!document.hidden&&!dialog.open){hero.play().catch(()=>updateHeroButton())}else hero.pause()}
function updateHeroButton(){$('#hero-toggle').textContent=hero.paused?'▶':'Ⅱ';$('#hero-toggle').setAttribute('aria-label',hero.paused?'播放背景视频':'暂停背景视频')}
$('#hero-toggle').onclick=()=>{heroManualPause=!hero.paused;syncHero()};hero.addEventListener('play',updateHeroButton);hero.addEventListener('pause',updateHeroButton);
new IntersectionObserver(es=>{heroInView=es[0].isIntersecting;syncHero()},{threshold:.05}).observe($('.hero'));
document.addEventListener('visibilitychange',syncHero);reduceMotion.addEventListener('change',e=>{heroManualPause=e.matches;syncHero()});
$('.mobile-menu').onclick=()=>{const open=$('.site-header nav').classList.toggle('open');$('.mobile-menu').setAttribute('aria-expanded',open);$('.mobile-menu').setAttribute('aria-label',open?'关闭导航':'打开导航')};$$('.site-header nav a').forEach(a=>a.onclick=()=>{$('.site-header nav').classList.remove('open');$('.mobile-menu').setAttribute('aria-expanded','false')});
const credits=$('#credits-dialog');$('#credits-open').onclick=()=>{credits.showModal();document.body.classList.add('modal-open')};$('#credits-close').onclick=()=>credits.close();credits.addEventListener('close',()=>document.body.classList.remove('modal-open'));
$('#total-cases').innerHTML=`${cases.length}<span> /</span>`;$('.nav-count').textContent=cases.length;$('#library-count').textContent=`${cases.length} FILMS / 06 CAPABILITIES`;
renderFilters();renderCases();selectDimension('SG');
function openHash(){const m=location.hash.match(/^#case=((?:SG|SP|GE|LH|MP|SE)\d{2})$/);if(m){modalSequence=ordered;openCase(m[1])}}
window.addEventListener('hashchange',openHash);openHash();

