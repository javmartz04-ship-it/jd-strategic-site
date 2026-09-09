(function(){
  'use strict';
  var RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* arrival is sequenced off the webfonts so a mask reveal never plays against a fallback face */
  function ready(){ document.body.classList.add('ready'); }
  if (RM) { ready(); }
  else if (document.fonts && document.fonts.ready) { document.fonts.ready.then(function(){ requestAnimationFrame(ready); }); setTimeout(ready, 1800); }
  else { requestAnimationFrame(ready); }

  /* reading-progress hairline on the bar */
  var prog=document.getElementById('navProg'), tick=false;
  function onScroll(){
    var y=window.pageYOffset||document.documentElement.scrollTop;
    if(prog){ var h=document.documentElement.scrollHeight-window.innerHeight; prog.style.transform='scaleX('+(h>0?Math.min(y/h,1):0)+')'; }
    tick=false;
  }
  window.addEventListener('scroll',function(){ if(!tick){tick=true;requestAnimationFrame(onScroll);} },{passive:true});
  onScroll();

  /* mobile menu */
  var bg=document.getElementById('burger'), mm=document.getElementById('mmenu');
  if(bg&&mm){
    bg.addEventListener('click',function(){ var o=mm.classList.toggle('open'); bg.setAttribute('aria-expanded',o?'true':'false'); bg.setAttribute('aria-label',o?'Close menu':'Open menu'); document.documentElement.style.overflow=o?'hidden':''; });
    mm.addEventListener('click',function(e){ if(e.target.closest('a')){ mm.classList.remove('open'); bg.setAttribute('aria-expanded','false'); document.documentElement.style.overflow=''; } });
  }

  /* spotlight: dark chapters answer the pointer */
  if(window.matchMedia('(pointer:fine)').matches && !RM){
    var ptick=false, lastEv=null;
    document.addEventListener('pointermove',function(ev){ lastEv=ev; if(!ptick){ ptick=true; requestAnimationFrame(function(){
      var el=lastEv.target.closest && lastEv.target.closest('.dark'); if(el){ var r=el.getBoundingClientRect();
        el.style.setProperty('--mx',((lastEv.clientX-r.left)/r.width*100).toFixed(1)+'%'); el.style.setProperty('--my',((lastEv.clientY-r.top)/r.height*100).toFixed(1)+'%'); }
      ptick=false; }); } },{passive:true});
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
    var d=1500,t0=null;
    function step(ts){ if(t0===null)t0=ts; var p=Math.min((ts-t0)/d,1), e=1-Math.pow(1-p,3), v=Math.round(t*e); el.textContent=comma?v.toLocaleString('en-US'):String(v); if(p<1) requestAnimationFrame(step); }
    requestAnimationFrame(step);
  }
  if('IntersectionObserver' in window){ var cio=new IntersectionObserver(function(en){ en.forEach(function(e){ if(e.isIntersecting){ run(e.target); cio.unobserve(e.target); } }); },{threshold:.4}); cs.forEach(function(el){ cio.observe(el); }); setTimeout(function(){ cs.forEach(run); },3500); } else { cs.forEach(run); }

  /* the guest belt on the podcast page */
  var GUESTS=[['Doc Cohen','First franchisee, Great American Cookies. Former IFA chairman'],['Eric Martin','SVP of franchise development, Happinest Brands'],['Sandler’s Executive Chairman','Sales success strategies'],['Andy Fuller','Founder and CEO, Mosquito Hunters'],['Jolita Brilliant','Founder, Brilliant Massage and Skin'],['A Franchise Hall of Famer','250+ franchisees, scaled'],['Multi-unit operators','On what year five actually looks like']];
  function guestHTML(){ return GUESTS.map(function(g){ return '<span class="gitem">'+g[0]+'<span>'+g[1]+'</span></span>'; }).join(''); }
  function fill(aId,bId,html,minW){
    var a=document.getElementById(aId), b=document.getElementById(bId); if(!a||!b) return;
    var pass=html, g=0; a.innerHTML=pass;
    while(a.getBoundingClientRect().width<minW && g<6){ pass+=html; a.innerHTML=pass; g++; }
    b.innerHTML=pass;
  }
  fill('gA','gB',guestHTML(),3600);

  /* fit finder: one real question from the questionnaire, answered here, carried into it.
     The questionnaire stores answers under KEY as {field: value, __i: screenIndex}; the
     value must match its own option text exactly, so the stored string keeps the dash. */
  var KEY='jds_questionnaire_v3';
  var fit=document.getElementById('fit');
  if(fit){
    var opts=[].slice.call(fit.querySelectorAll('.fitopt')), goBtn=document.getElementById('fitGo'), leaving=false;
    function stored(){ var d={}; try{ d=JSON.parse(localStorage.getItem(KEY)||'{}')||{}; }catch(e){ d={}; } return d; }
    function commit(val){
      var d=stored();
      if(val) d.describe=val; else delete d.describe;
      if(typeof d.__i!=='number' || d.__i<1) d.__i=1;
      try{ localStorage.setItem(KEY,JSON.stringify(d)); }catch(e){}
    }
    (function restore(){ var d=stored(); if(!d.describe) return; opts.forEach(function(o){ var on=o.getAttribute('data-v')===d.describe; o.classList.toggle('sel',on); o.setAttribute('aria-checked',on?'true':'false'); }); })();
    opts.forEach(function(o){
      o.addEventListener('click',function(){
        if(leaving) return;
        opts.forEach(function(x){ x.classList.remove('sel'); x.setAttribute('aria-checked','false'); });
        o.classList.add('sel'); o.setAttribute('aria-checked','true');
        commit(o.getAttribute('data-v'));
        leaving=true;
        setTimeout(function(){ window.location.href='questionnaire.html'; }, RM?0:420);
      });
    });
    if(goBtn){ goBtn.addEventListener('click',function(){ var s=fit.querySelector('.fitopt.sel'); commit(s?s.getAttribute('data-v'):null); }); }
  }

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
