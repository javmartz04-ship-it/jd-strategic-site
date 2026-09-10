(function(){
  'use strict';
  var RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* arrival is sequenced off the webfonts so a mask reveal never plays against a fallback face */
  function ready(){ document.body.classList.add('ready'); }
  if (RM) { ready(); }
  else if (document.fonts && document.fonts.ready) { document.fonts.ready.then(function(){ requestAnimationFrame(ready); }); setTimeout(ready, 1800); }
  else { requestAnimationFrame(ready); }

  /* nav: transparent island over the page, condenses on scroll, reads the ground under it (the real element, never a blend mode) */
  var nav=document.getElementById('nav'), prog=document.getElementById('navProg'), tick=false;
  function groundAt(y){
    var els=document.elementsFromPoint(Math.round(window.innerWidth/2), Math.round(y));
    for(var i=0;i<els.length;i++){
      var e=els[i];
      if(e.closest('.nav')||e.closest('.mmenu')) continue;
      return !!e.closest('.dark,.page-head,.cred');
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

  /* fit finder: Josh's abbreviated questionnaire ("Find My Franchise Fit"), one step per screen, on the page.
     FIT_ENDPOINT stays empty until the GHL inbound webhook is chosen: with it empty the form validates,
     saves the submission locally and shows the thank-you, and nothing leaves the browser. */
  var FIT_ENDPOINT='';
  var FIT_KEY='jds_fit_v1';
  var fit=document.getElementById('fit'), stage=document.getElementById('fitStage');
  if(fit && stage){
    var ARROW='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
    var BACK='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>';
    var OPEN='Open: show me what fits';
    var STEPS=[
      {id:'describe',t:'single',q:'What best describes you?',h:'I tailor your matches to your specific situation.',
       o:[['Corporate executive','considering a transition out of corporate'],['Business owner','expanding or adding a second income stream'],['Recently exited','redeploying capital from a business sale'],['New entrepreneur','recently left a job or looking to start something']]},
      {id:'categories',t:'multi',q:'Which categories interest you?',h:'Select all that apply, or choose "show me what fits" and I will lead with the match.',cols:3,
       o:['Health, Wellness & Beauty','Senior Care','Home Improvement & Services','Cleaning Services','B2B & Business Services','Pet Services','Food & Beverage','Child Services & Education','Fitness & Sports','Automotive','Real Estate & Property','Restoration & Repair',OPEN]},
      {id:'timeline',t:'single',q:'What is your investment timeline?',h:'No wrong answer. This helps me calibrate the approach.',
       o:[['Ready now','let’s move'],['1 to 3 months','almost there'],['3 to 6 months','still evaluating'],['6 to 12 months','long-range planning']]},
      {id:'capital',t:'single',q:'How much liquid capital do you have available to invest?',h:'Liquid capital is money you can access quickly without selling long-term investments or major assets: cash, savings, money market. Not home equity or retirement funds.',cols:3,
       o:['$50K to $75K','$75K to $100K','$100K to $150K','$150K to $200K','$200K to $250K','$250K to $500K','$500K to $1M','$1M to $2M','$2M+'],foot:'Most opportunities I work with start around $50K liquid.'},
      {id:'tailor',t:'group',q:'A few last things to tailor your matches.',h:'Optional. The more I know, the sharper your matches.',skip:true,
       groups:[{id:'role',l:'What role do you picture?',o:['Owner-operator, hands-on day to day','Executive, managing a team while you focus on growth','Not sure yet']},
               {id:'scale',l:'Do you want to scale?',o:['A single unit is fine','Grow into multiple units or territories','Not sure yet']},
               {id:'setting',l:'What kind of setting do you picture?',o:['Home-based','Office-based','Brick-and-mortar or retail','No preference']},
               {id:'matters',l:'What matters most to you?',o:['Recession-resistant, stable demand','Recurring revenue','Being able to scale and build something bigger']}],
       texts:[{id:'background',l:'Your current or most recent role, and the skills you want to bring into a business',ph:'A sentence or two'},{id:'notes',l:'Anything else that would help me tailor your options?',ph:'Optional'}]},
      {id:'contact',t:'contact',q:'Almost done. Where should I reach you?',h:'I review your answers personally and follow up within one business day.'}
    ];
    var A={}, idx=0;
    try{ A=JSON.parse(localStorage.getItem(FIT_KEY)||'{}')||{}; }catch(e){ A={}; }
    if(A.__done){ A={}; }
    function save(){ try{ localStorage.setItem(FIT_KEY,JSON.stringify(A)); }catch(e){} }
    function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
    function answered(s){
      if(s.t==='single') return !!A[s.id];
      if(s.t==='multi') return Array.isArray(A[s.id]) && A[s.id].length>0;
      return true;
    }
    var stepEl=fit.querySelector('.fitstep'), bar=fit.querySelector('.fitbar');
    function head(){
      if(stepEl) stepEl.textContent='Step '+(idx+1)+' of '+STEPS.length;
      if(bar) [].slice.call(bar.children).forEach(function(i,k){ i.classList.toggle('on',k<=idx); });
    }
    function opt(s,label,sub,on,multi){
      return '<button type="button" class="fitopt'+(multi?' multi':'')+'" data-v="'+esc(label)+'" '+(multi?'aria-pressed="'+on+'"':'role="radio" aria-checked="'+on+'"')+'><b>'+esc(label)+'</b>'+(sub?'<span>'+esc(sub)+'</span>':'')+'</button>';
    }
    function chips(){
      var out=[];
      if(A.describe) out.push(A.describe);
      if(Array.isArray(A.categories)&&A.categories.length){ var c=A.categories.slice(0,2).join(' · '); if(A.categories.length>2) c+=' +'+(A.categories.length-2); out.push(c); }
      if(A.timeline) out.push(A.timeline);
      if(A.capital) out.push(A.capital);
      return out.length?'<div class="chips" aria-label="Your answers so far">'+out.map(function(x){ return '<span>'+esc(x)+'</span>'; }).join('')+'</div>':'';
    }
    function field(id,label,req,opts){
      opts=opts||{};
      var v=A[id]?esc(A[id]):'';
      var inner;
      if(opts.select){ inner='<select name="'+id+'"><option value="">Select a range</option>'+opts.select.map(function(o){ return '<option value="'+esc(o)+'"'+(A[id]===o?' selected':'')+'>'+esc(o)+'</option>'; }).join('')+'</select>'; }
      else if(opts.area){ inner='<textarea name="'+id+'" placeholder="'+esc(opts.ph||'')+'">'+v+'</textarea>'; }
      else { inner='<input name="'+id+'" type="'+(opts.type||'text')+'" value="'+v+'" placeholder="'+esc(opts.ph||'')+'" autocomplete="'+(opts.ac||'off')+'"'+(opts.im?' inputmode="'+opts.im+'"':'')+'>'; }
      return '<label class="fitfield'+(opts.wide?' wide':'')+'"><span class="fl">'+esc(label)+(req?' <em aria-hidden="true">*</em>':'')+'</span>'+inner+'<span class="fiterr">'+esc(opts.err||'Please fill this in.')+'</span></label>';
    }
    function nav(s){
      var h='<div class="fitnav">';
      if(idx>0) h+='<button type="button" class="btn btn-ghost" data-act="back">'+BACK+'Back</button>';
      if(s.t==='multi'||s.t==='group') h+='<button type="button" class="btn btn-accent" data-act="next">Continue'+ARROW+'</button>';
      if(s.t==='contact') h+='<button type="button" class="btn btn-accent" data-act="submit">Get My Matches'+ARROW+'</button>';
      if(s.skip) h+='<button type="button" class="fitskip" data-act="skip">Skip to contact</button>';
      if(s.t==='single') h+='<p class="reassure">Pick one to continue. About two minutes, and it saves as you go.</p>';
      if(s.t==='contact') h+='<p class="reassure">Confidential. Josh only, never a franchisor.</p>';
      return h+'</div>';
    }
    function render(){
      var s=STEPS[idx], h='<h3 class="fitq" id="fitQ">'+esc(s.q)+'</h3>'+(s.h?'<p class="fithint">'+esc(s.h)+'</p>':'');
      if(s.t==='single'){
        h+='<div class="fitopts'+(s.cols===3?' cols-3':'')+'" role="radiogroup" aria-labelledby="fitQ">'+s.o.map(function(o){ var l=Array.isArray(o)?o[0]:o, sub=Array.isArray(o)?o[1]:''; return opt(s,l,sub,A[s.id]===l,false); }).join('')+'</div>';
        if(s.foot) h+='<p class="fitfoot">'+esc(s.foot)+'</p>';
      } else if(s.t==='multi'){
        var cur=A[s.id]||[];
        h+='<div class="fitopts'+(s.cols===3?' cols-3':'')+'" aria-labelledby="fitQ">'+s.o.map(function(o){ return opt(s,o,'',cur.indexOf(o)>-1,true); }).join('')+'</div>';
      } else if(s.t==='group'){
        h+='<div class="fitgroups">'+s.groups.map(function(g){ return '<div class="fitgroup"><span class="gl">'+esc(g.l)+'</span><div class="fitrow" role="radiogroup" aria-label="'+esc(g.l)+'" data-g="'+g.id+'">'+g.o.map(function(o){ return opt(s,o,'',A[g.id]===o,false).replace('class="fitopt"','class="fitopt" data-g="'+g.id+'"'); }).join('')+'</div></div>'; }).join('')+
           '<div class="fitgroup"><div class="fitfields">'+s.texts.map(function(t){ return field(t.id,t.l,false,{area:true,wide:true,ph:t.ph}); }).join('')+'</div></div></div>';
      } else if(s.t==='contact'){
        h+=chips()+'<div class="fitfields">'+
          field('first','First name',true,{ac:'given-name',ph:'First'})+field('last','Last name',true,{ac:'family-name',ph:'Last'})+
          field('email','Email',true,{type:'email',ac:'email',ph:'you@company.com',err:'Enter a valid email address.'})+field('phone','Phone',true,{type:'tel',ac:'tel',im:'tel',ph:'(555) 000-0000',err:'Enter a 10-digit phone number.'})+
          field('markets','Target markets',true,{wide:true,ph:'Town or city and zip code(s), e.g. Naples, FL 34102, open to nearby'})+
          field('networth','Net worth (approximate)',false,{wide:true,select:['Under $250K','$250K to $500K','$500K to $1M','$1M to $2M','$2M to $5M','$5M+']})+
          '</div><label class="consent"><input type="checkbox" name="consent"'+(A.consent?' checked':'')+'><span>I agree to be contacted by JD Strategic Franchising. By providing my phone number, I agree to receive text messages from the business.</span></label>';
      }
      h+=nav(s);
      stage.innerHTML=h; head();
    }
    function go(n){
      if(RM){ idx=n; render(); return; }
      stage.classList.add('out');
      setTimeout(function(){ idx=n; render(); stage.classList.remove('out'); var top=fit.querySelector('.fitbox').getBoundingClientRect().top; if(top<70) window.scrollBy({top:top-100,behavior:'smooth'}); },220);
    }
    function done(){
      A.__done=true; save();
      stage.innerHTML='<div class="fitdone"><div class="mark"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></div><h3>Thanks, '+esc(A.first||'')+'. Your answers are in.</h3><p>I’ll review them and reach out within one business day with your top matches. If you would rather talk first, book a call and we will start there.</p><a class="btn btn-ghost" href="contact.html">Book a Call'+ARROW+'</a></div>';
      if(stepEl) stepEl.textContent='Done'; if(bar) [].slice.call(bar.children).forEach(function(i){ i.classList.add('on'); });
      try{ localStorage.removeItem(FIT_KEY); }catch(e){}
    }
    function submit(){
      var ok=true, box=stage;
      var req={first:/\S/,last:/\S/,email:/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,phone:/^\d{10}$/,markets:/\S/};
      Object.keys(req).forEach(function(k){
        var el=box.querySelector('[name="'+k+'"]'), wrap=el.closest('.fitfield'); var v=el.value.trim(); if(k==='phone') v=v.replace(/\D/g,'');
        var good=req[k].test(v); wrap.classList.toggle('err',!good); if(!good) ok=false; else A[k]=(k==='phone')?v:el.value.trim();
      });
      var nw=box.querySelector('[name="networth"]'); if(nw&&nw.value) A.networth=nw.value;
      var c=box.querySelector('[name="consent"]'); var cl=c.closest('.consent'); cl.classList.toggle('err',!c.checked); if(!c.checked) ok=false; else A.consent=true;
      if(!ok){ var f=box.querySelector('.err'); if(f) f.scrollIntoView({block:'center',behavior:RM?'auto':'smooth'}); return; }
      A.submitted_at=new Date().toISOString(); A.source='jdfranchising.com/#fit';
      var payload=JSON.stringify(A);
      try{ localStorage.setItem('jds_fit_last',payload); }catch(e){}
      if(FIT_ENDPOINT){
        var b=box.querySelector('[data-act="submit"]'); if(b){ b.disabled=true; b.style.opacity='.6'; }
        fetch(FIT_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json'},body:payload}).then(function(){ done(); }).catch(function(){ done(); });
      } else { done(); }
    }
    stage.addEventListener('click',function(e){
      var b=e.target.closest('button'); if(!b) return;
      var s=STEPS[idx], act=b.getAttribute('data-act');
      if(act==='back'){ go(idx-1); return; }
      if(act==='skip'){ go(idx+1); return; }
      if(act==='next'){ if(!answered(s)){ var first=stage.querySelector('.fitopts'); if(first){ first.style.outline='1px solid #FFB27A'; setTimeout(function(){ first.style.outline=''; },900); } return; } go(idx+1); return; }
      if(act==='submit'){ submit(); return; }
      if(!b.classList.contains('fitopt')) return;
      var v=b.getAttribute('data-v');
      if(s.t==='single'){
        [].slice.call(stage.querySelectorAll('.fitopt')).forEach(function(x){ x.setAttribute('aria-checked','false'); });
        b.setAttribute('aria-checked','true'); A[s.id]=v; save();
        setTimeout(function(){ go(idx+1); },RM?0:360);
      } else if(s.t==='multi'){
        var list=A[s.id]||[];
        if(v===OPEN){ list=(list.indexOf(OPEN)>-1)?[]:[OPEN]; }
        else { list=list.filter(function(x){ return x!==OPEN; }); var at=list.indexOf(v); if(at>-1) list.splice(at,1); else list.push(v); }
        A[s.id]=list; save();
        [].slice.call(stage.querySelectorAll('.fitopt')).forEach(function(x){ x.setAttribute('aria-pressed',String(list.indexOf(x.getAttribute('data-v'))>-1)); });
      } else if(s.t==='group'){
        var g=b.getAttribute('data-g'); if(!g) return;
        [].slice.call(stage.querySelectorAll('.fitopt[data-g="'+g+'"]')).forEach(function(x){ x.setAttribute('aria-checked','false'); });
        b.setAttribute('aria-checked','true'); A[g]=v; save();
      }
    });
    stage.addEventListener('input',function(e){ var el=e.target; if(el.name && (el.tagName==='INPUT'||el.tagName==='TEXTAREA'||el.tagName==='SELECT')){ if(el.type==='checkbox'){ A.consent=el.checked; } else { A[el.name]=el.value; } save(); var w=el.closest('.fitfield'); if(w) w.classList.remove('err'); var c=el.closest('.consent'); if(c) c.classList.remove('err'); } });
    stage.addEventListener('keydown',function(e){ if(e.key==='Enter' && e.target.tagName==='INPUT' && STEPS[idx].t==='contact'){ e.preventDefault(); submit(); } });
    /* resume where they left off */
    for(var i=0;i<STEPS.length;i++){ if(STEPS[i].t==='single'||STEPS[i].t==='multi'){ if(!answered(STEPS[i])){ idx=i; break; } } idx=i; }
    if(idx>=STEPS.length) idx=STEPS.length-1;
    render();
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
