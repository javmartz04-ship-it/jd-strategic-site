(function(){
  'use strict';
  var RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function ready(){ document.body.classList.add('ready'); }
  if (RM) { ready(); }
  else if (document.fonts && document.fonts.ready) { document.fonts.ready.then(function(){ requestAnimationFrame(ready); }); setTimeout(ready, 1800); }
  else { requestAnimationFrame(ready); }

  var IC={
    shield:'<path d="M12 2 4 5.5v6c0 5 3.4 9.2 8 10.5 4.6-1.3 8-5.5 8-10.5v-6Z"/>',
    grid:'<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>',
    bank:'<path d="M3 10h18M5 10v8M19 10v8M9 10v8M15 10v8M2 21h20M12 3 2 8h20Z"/>',
    pin:'<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    users:'<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>',
    tag:'<path d="M20.6 13.4 12 22l-9-9V3h10l7.6 7.6a2 2 0 0 1 0 2.8Z"/><circle cx="7.5" cy="7.5" r="1.2"/>',
    doc:'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6M9 13h6M9 17h6"/>',
    phone:'<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/>'
  };
  var CREDS=[['shield','FranServe Certified Consultant'],['grid','Hundreds of Vetted Brands'],['bank','SBA and ROBS Financing Ready'],['pin','Nationwide Coverage'],['users','Second-Generation Franchise Family'],['tag','Always Free to Clients'],['doc','Guided FDD Review'],['phone','Franchisee Validation Calls']];
  function credHTML(){ return CREDS.map(function(c){ return '<span class="creditem"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+IC[c[0]]+'</svg>'+c[1]+'</span>'; }).join(''); }

  /* the guests are the show's real proof: subjects and titles taken from the episode art */
  var GUESTS=[['Doc Cohen','First franchisee, Great American Cookies. Former IFA chairman'],['Eric Martin','SVP of franchise development, Happinest Brands'],['Sandler’s Executive Chairman','Sales success strategies'],['Andy Fuller','Founder and CEO, Mosquito Hunters'],['Jolita Brilliant','Founder, Brilliant Massage and Skin'],['A Franchise Hall of Famer','250+ franchisees, scaled'],['Multi-unit operators','On what year five actually looks like']];
  function guestHTML(){ return GUESTS.map(function(g){ return '<span class="gitem">'+g[0]+'<span>'+g[1]+'</span></span>'; }).join(''); }


  function fill(aId,bId,html,minW){
    var a=document.getElementById(aId), b=document.getElementById(bId); if(!a||!b) return;
    var pass=html, g=0; a.innerHTML=pass;
    while(a.getBoundingClientRect().width<minW && g<6){ pass+=html; a.innerHTML=pass; g++; }
    b.innerHTML=pass;
  }
  fill('credA','credB',credHTML(),3600); fill('gA','gB',guestHTML(),3600);


  /* spotlight: dark chapters and the hero track the pointer */
  if(window.matchMedia('(pointer:fine)').matches && !RM){
    var lit=[].slice.call(document.querySelectorAll('.dark')), ptick=false, lastEv=null;
    document.addEventListener('pointermove',function(ev){ lastEv=ev; if(!ptick){ ptick=true; requestAnimationFrame(function(){
      var el=lastEv.target.closest && lastEv.target.closest('.dark'); if(el){ var r=el.getBoundingClientRect();
        el.style.setProperty('--mx',((lastEv.clientX-r.left)/r.width*100).toFixed(1)+'%'); el.style.setProperty('--my',((lastEv.clientY-r.top)/r.height*100).toFixed(1)+'%'); }
      ptick=false; }); } },{passive:true});
  }

  /* nav */
  var nav=document.getElementById('nav'), prog=document.getElementById('navProg'), tick=false;
  /* which ground is under the chrome right now? read the real element, never a blend mode */
  function groundAt(y){
    var els=document.elementsFromPoint(Math.round(window.innerWidth/2), Math.round(y));
    for(var i=0;i<els.length;i++){
      var e=els[i];
      if(e.closest('.nav')||e.closest('.mmenu')) continue;
      return !!e.closest('.dark,.page-head');
    }
    return false;
  }
  function onScroll(){
    var y=window.pageYOffset||document.documentElement.scrollTop;
    if(nav){
      nav.classList.toggle('stuck', y>10);
      var box=nav.firstElementChild.getBoundingClientRect();
      nav.classList.toggle('on-dark', groundAt(box.top+box.height/2));
    }
    if(prog){ var h=document.documentElement.scrollHeight-window.innerHeight; prog.style.transform='scaleX('+(h>0?Math.min(y/h,1):0)+')'; }
    tick=false;
  }
  window.addEventListener('scroll',function(){ if(!tick){tick=true;requestAnimationFrame(onScroll);} },{passive:true});
  window.addEventListener('resize',function(){ if(!tick){tick=true;requestAnimationFrame(onScroll);} },{passive:true});
  onScroll();

  /* the hero's light source drifts a few pixels with the pointer. depth, not parallax. */
  var heroEl=document.querySelector('.hero'), lightEl=document.getElementById('heroLight');
  if(heroEl&&lightEl&&!RM&&window.matchMedia('(hover:hover) and (pointer:fine)').matches){
    var lx=0,ly=0,lt=false;
    heroEl.addEventListener('pointermove',function(e){
      var r=heroEl.getBoundingClientRect();
      lx=((e.clientX-r.left)/r.width-.5)*34; ly=((e.clientY-r.top)/r.height-.5)*22;
      if(!lt){ lt=true; requestAnimationFrame(function(){ lightEl.style.setProperty('--mx',lx.toFixed(1)+'px'); lightEl.style.setProperty('--my',ly.toFixed(1)+'px'); lt=false; }); }
    },{passive:true});
    heroEl.addEventListener('pointerleave',function(){ lightEl.style.setProperty('--mx','0px'); lightEl.style.setProperty('--my','0px'); },{passive:true});
  }

  var bg=document.getElementById('burger'), mm=document.getElementById('mmenu');
  if(bg&&mm){
    bg.addEventListener('click',function(){ var o=mm.classList.toggle('open'); bg.setAttribute('aria-expanded',o?'true':'false'); bg.setAttribute('aria-label',o?'Close menu':'Open menu'); });
    mm.addEventListener('click',function(e){ if(e.target.closest('a')){ mm.classList.remove('open'); bg.setAttribute('aria-expanded','false'); } });
  }

  /* reveals: text blocks and the clip-veil photographs, with a failsafe */
  var rev=[].slice.call(document.querySelectorAll('[data-r],[data-bleed]'));
  function revealAll(){ rev.forEach(function(el){ el.classList.add('in'); }); }
  if(RM || !('IntersectionObserver' in window)){ revealAll(); }
  else {
    var io=new IntersectionObserver(function(en){ en.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } }); },{rootMargin:'0px 0px -8% 0px',threshold:.06});
    rev.forEach(function(el){ io.observe(el); });
    setTimeout(revealAll,3500);
  }

  /* count up */
  var cs=[].slice.call(document.querySelectorAll('[data-count]'));
  function run(el){
    var t=parseFloat(el.getAttribute('data-count'))||0, comma=el.getAttribute('data-fmt')==='comma';
    if(RM){ el.textContent=comma?t.toLocaleString('en-US'):String(t); return; }
    var d=1600,t0=null;
    function step(ts){ if(t0===null)t0=ts; var p=Math.min((ts-t0)/d,1), e=1-Math.pow(1-p,3), v=Math.round(t*e); el.textContent=comma?v.toLocaleString('en-US'):String(v); if(p<1) requestAnimationFrame(step); }
    requestAnimationFrame(step);
  }
  if('IntersectionObserver' in window){ var cio=new IntersectionObserver(function(en){ en.forEach(function(e){ if(e.isIntersecting){ run(e.target); cio.unobserve(e.target); } }); },{threshold:.4}); cs.forEach(function(el){ cio.observe(el); }); setTimeout(function(){ cs.forEach(run); },3500); } else { cs.forEach(run); }

  /* fit finder */
  var panels=[].slice.call(document.querySelectorAll('.fitpanel')), stepEl=document.getElementById('fitStep'), barEl=document.getElementById('fitBar');
  function go(n){
    panels.forEach(function(p){ p.classList.toggle('active', p.getAttribute('data-panel')===String(n)); });
    if(stepEl) stepEl.textContent = n>3 ? 'Your read' : 'Question '+n+' of 3';
    if(barEl) barEl.style.transform = 'scaleX(' + (n>3?1:n/3) + ')';
    var card=document.querySelector('.fitcard');
    if(card){ var top=card.getBoundingClientRect().top+window.pageYOffset-120; if(window.pageYOffset>top+40) window.scrollTo({top:top,behavior:RM?'auto':'smooth'}); }
  }
  document.addEventListener('click',function(e){ var n=e.target.closest('[data-next]'), b=e.target.closest('[data-back]'); if(n) go(parseInt(n.getAttribute('data-next'),10)); else if(b) go(parseInt(b.getAttribute('data-back'),10)); });

  /* category strip: native scroll-snap, arrows just nudge it */
  var strip=document.getElementById('strip');
  function nudge(dir){ if(!strip) return; var w=strip.querySelector('.cat'); var step=w?w.getBoundingClientRect().width+3:400; strip.scrollBy({left:dir*step,behavior:RM?'auto':'smooth'}); }
  var sp=document.getElementById('stripPrev'), sn=document.getElementById('stripNext');
  if(sp) sp.addEventListener('click',function(){ nudge(-1); });
  if(sn) sn.addEventListener('click',function(){ nudge(1); });

  /* faq */
  [].slice.call(document.querySelectorAll('.faq-q')).forEach(function(btn){
    var item=btn.parentNode, ans=item.querySelector('.faq-a');
    btn.addEventListener('click',function(){
      var open=item.classList.contains('open');
      [].slice.call(document.querySelectorAll('.faq-i.open')).forEach(function(o){ o.classList.remove('open'); o.querySelector('.faq-a').style.height='0px'; o.querySelector('.faq-q').setAttribute('aria-expanded','false'); });
      if(!open){ item.classList.add('open'); ans.style.height=ans.scrollHeight+'px'; btn.setAttribute('aria-expanded','true'); }
    });
  });
  window.addEventListener('resize',function(){ var o=document.querySelector('.faq-i.open'); if(o){ var a=o.querySelector('.faq-a'); a.style.height='auto'; a.style.height=a.scrollHeight+'px'; } });
})();
