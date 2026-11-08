import './style.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initScene } from './scene.js';

gsap.registerPlugin(ScrollTrigger);

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  var hero = document.getElementById('hero');

  /* ---------- headline: split into letters ---------- */
  var chars = [];
  document.querySelectorAll('#h1 .line').forEach(function(line){
    var t = line.getAttribute('data-t');
    line.setAttribute('aria-hidden','true');
    for (var i=0;i<t.length;i++){
      var s = document.createElement('span');
      s.className = 'ch'; s.textContent = t[i];
      line.appendChild(s); chars.push(s);
    }
  });

  /* ---------- marquee clone ---------- */
  var mq = document.getElementById('mq'); mq.innerHTML += mq.innerHTML;
  ['r1','r2'].forEach(function(id){ var r=document.getElementById(id); r.innerHTML += r.innerHTML; });


/* ---------- 3D scene ---------- */
  try { initScene(hero, reduce); } catch (err) { console.error(err); hero.classList.add('no-gl'); }

  /* ---------- variable-font headline interaction ---------- */
  if (fine && !reduce){
    var px=-9999, py=-9999, on=false;
    hero.addEventListener('pointermove', function(e){ px=e.clientX; py=e.clientY; on=true; });
    hero.addEventListener('pointerleave', function(){ on=false; });
    var boxes=[], measured=false;
    function measure(){ boxes = chars.map(function(c){ var r=c.getBoundingClientRect(); return {x:r.left+r.width/2,y:r.top+r.height/2}; }); measured=true; }
    window.addEventListener('resize', function(){ measured=false; });
    window.addEventListener('scroll', function(){ measured=false; }, {passive:true});
    var cur = chars.map(function(){return 0;});
    (function loop(){
      requestAnimationFrame(loop);
      if (!on && cur.every(function(v){return v<0.01;})) return;
      if (!measured) measure();
      for (var i=0;i<chars.length;i++){
        var d = on ? Math.hypot(px-boxes[i].x, py-boxes[i].y) : 9999;
        cur[i] += (Math.max(0, 1 - d/280)-cur[i])*0.12;
        chars[i].style.fontVariationSettings = '"wght" '+Math.round(700-380*cur[i])+',"wdth" '+Math.round(86+14*cur[i]);
      }
    })();
  }

  /* ---------- GSAP: intro + scroll ---------- */
  {
    if (!reduce){
      gsap.from(chars,{yPercent:115,duration:1.1,ease:'power4.out',stagger:0.04,delay:.15});
      gsap.from('.hero-row',{y:36,duration:1,ease:'power3.out',delay:.7});
      gsap.utils.toArray('[data-reveal]').forEach(function(el){
        gsap.from(el,{y:48,duration:1,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 90%',once:true}});
      });
      gsap.fromTo('#railfill',{scaleX:.08},{scaleX:1,ease:'none',scrollTrigger:{trigger:'#steps',start:'top 75%',end:'bottom 55%',scrub:true}});
      document.querySelectorAll('#stats b').forEach(function(b){
        var n = +b.getAttribute('data-n'), o={v:n};
        ScrollTrigger.create({trigger:b,start:'top 92%',once:true,onEnter:function(){
          o.v=0; b.textContent='0';
          gsap.to(o,{v:n,duration:1.6,ease:'power2.out',onUpdate:function(){b.textContent=Math.round(o.v);},onComplete:function(){b.textContent=n;}});
        }});
      });
    }
  }

  /* ---------- services: cursor-following swatch ---------- */
  var peek = document.getElementById('peek');
  if (fine){
    var pxx=0,pyy=0,cx=0,cy=0;
    document.querySelectorAll('.svc').forEach(function(a){
      a.addEventListener('pointerenter', function(){
        peek.style.setProperty('--c1', a.getAttribute('data-c1'));
        peek.style.setProperty('--c2', a.getAttribute('data-c2'));
        peek.classList.add('on'); peek.style.transform='translate(-50%,-50%) scale(1) rotate(-6deg)';
      });
      a.addEventListener('pointerleave', function(){ peek.classList.remove('on'); peek.style.transform='translate(-50%,-50%) scale(.6) rotate(-6deg)'; });
    });
    document.getElementById('svcs').addEventListener('pointermove', function(e){ pxx=e.clientX+150; pyy=e.clientY; });
    (function pl(){ requestAnimationFrame(pl); cx+=(pxx-cx)*0.14; cy+=(pyy-cy)*0.14; peek.style.left=cx+'px'; peek.style.top=cy+'px'; })();
  }

  /* ---------- project cards: 3D tilt ---------- */
  if (fine && !reduce){
    document.querySelectorAll('.card').forEach(function(card){
      var shot = card.querySelector('.shot');
      card.addEventListener('pointermove', function(e){
        var r = shot.getBoundingClientRect();
        var x = (e.clientX-r.left)/r.width-0.5, y = (e.clientY-r.top)/r.height-0.5;
        shot.style.transform = 'rotateY('+(x*14)+'deg) rotateX('+(-y*14)+'deg) translateZ(10px)';
      });
      card.addEventListener('pointerleave', function(){ shot.style.transform=''; });
    });
  }

  /* ---------- cursor ring ---------- */
  if (fine){
    var ring = document.getElementById('ring'), rx=0, ry=0, tx=0, ty=0;
    window.addEventListener('pointermove', function(e){ tx=e.clientX; ty=e.clientY; ring.style.opacity=1; });
    document.addEventListener('pointerover', function(e){ ring.classList.toggle('big', !!e.target.closest('a,button,.chip')); });
    (function rl(){ requestAnimationFrame(rl); rx+=(tx-rx)*0.2; ry+=(ty-ry)*0.2; ring.style.transform='translate('+(rx-ring.offsetWidth/2)+'px,'+(ry-ring.offsetHeight/2)+'px)'; })();
  }

  /* ---------- mobile drawer ---------- */
  var menuBtn = document.getElementById('menuBtn'), drawer = document.getElementById('drawer');
  function setMenu(open){
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    menuBtn.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    drawer.hidden = !open;
    document.body.style.overflow = open ? 'hidden' : '';
  }
  menuBtn.addEventListener('click', function(){ setMenu(drawer.hidden); });
  drawer.addEventListener('click', function(e){ if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape' && !drawer.hidden) { setMenu(false); menuBtn.focus(); } });
  window.matchMedia('(min-width:981px)').addEventListener('change', function(e){ if (e.matches) setMenu(false); });

  /* ---------- quote form (preview only) ---------- */
  document.getElementById('qf').addEventListener('submit', function(e){
    e.preventDefault();
    var tel = document.getElementById('tel').value.trim(), nom = document.getElementById('nom').value.trim();
    var note = document.getElementById('note');
    if (!nom || !tel){ note.textContent = 'Indiquez votre nom et un numéro de téléphone.'; return; }
    note.textContent = 'Merci ' + nom + '. Ceci est un aperçu de design : la demande n’est pas encore envoyée.';
  });
