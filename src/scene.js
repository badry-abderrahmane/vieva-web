import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

  /* ---------- textures drawn with 2D canvas ---------- */
  function spaced(g, txt, cx, y, sp){
    var w = 0, i; for (i=0;i<txt.length;i++) w += g.measureText(txt[i]).width + sp; w -= sp;
    var x = cx - w/2; g.textAlign = 'left';
    for (i=0;i<txt.length;i++){ g.fillText(txt[i], x, y); x += g.measureText(txt[i]).width + sp; }
  }
  function bannerCanvas(o){
    var W=2048, H=1216, c=document.createElement('canvas'); c.width=W; c.height=H;
    var g=c.getContext('2d');
    function draw(){
      var gr=g.createLinearGradient(0,0,W,H); gr.addColorStop(0,'#0C2A1B'); gr.addColorStop(1,'#06110B');
      g.fillStyle=gr; g.fillRect(0,0,W,H);
      g.fillStyle='#00A857';
      var step=34, y, x;
      for (y=0;y<H+step;y+=step){ for (x=0;x<W+step;x+=step){
        var px = x + ((y/step)%2)*step/2, t = px/W*0.55 + y/H*0.45;
        var r = Math.max(0,(t-0.22))*step*0.9;
        if (r>0.6){ g.beginPath(); g.arc(px,y,r,0,6.2832); g.fill(); }
      }}
      /* logo */
      g.strokeStyle='#00A857'; g.lineWidth=20; g.strokeRect(190,250,900,500);
      g.fillStyle='#00A857'; g.font='700 250px Poppins, Arial, sans-serif'; g.textBaseline='alphabetic';
      spaced(g,'VIEVA',640,555,26);
      g.fillStyle='#00A857'; g.fillRect(350,708,580,86);
      g.fillStyle='#06110B'; g.font='600 54px Poppins, Arial, sans-serif';
      spaced(g,'SERVICES',640,771,14);
      /* ink band */
      g.fillStyle='#00A857'; g.fillRect(0,H-170,W,170);
      var face = o.rtl ? '"IBM Plex Sans Arabic", Poppins, Arial, sans-serif' : 'Poppins, Arial, sans-serif';
      g.fillStyle='#06110B'; g.font='600 74px '+face; g.textAlign=o.rtl?'right':'left';
      g.fillText(o.banner,o.rtl?W-150:150,H-65);
      g.fillStyle='#06110B'; g.font='500 44px '+face; g.textAlign=o.rtl?'left':'right';
      g.fillText(o.bannerRight,o.rtl?150:W-150,H-72);
      /* hem + grommets */
      g.strokeStyle='rgba(0,191,99,.35)'; g.lineWidth=12; g.strokeRect(24,24,W-48,H-48);
      [[84,84],[W-84,84],[84,H-84],[W-84,H-84]].forEach(function(p){
        g.fillStyle='#8C9993'; g.beginPath(); g.arc(p[0],p[1],42,0,6.2832); g.fill();
        g.fillStyle='#D9E0DC'; g.beginPath(); g.arc(p[0],p[1],36,0,6.2832); g.fill();
        g.fillStyle='#04170E'; g.beginPath(); g.arc(p[0],p[1],20,0,6.2832); g.fill();
      });
    }
    draw();
    return {canvas:c, redraw:draw};
  }
  function stripeCanvas(a,b,dot){
    var c=document.createElement('canvas'); c.width=512; c.height=512; var g=c.getContext('2d');
    g.fillStyle=a; g.fillRect(0,0,512,512); g.fillStyle=b;
    for (var y=0;y<512;y+=32) for (var x=0;x<512;x+=32){ g.beginPath(); g.arc(x+((y/32)%2)*16,y,dot*(0.4+0.6*y/512),0,6.2832); g.fill(); }
    return c;
  }

  /* ---------- WebGL print stand ---------- */
  var VERT = [
  'uniform float uTime; uniform vec2 uMouse; uniform float uPush;',
  'varying vec2 vUv; varying vec3 vN; varying vec3 vP;',
  'float h(vec2 uv){',
  '  float t=uTime;',
  '  float w=sin(uv.x*5.0-t*1.1+uv.y*2.0)*0.20+sin(uv.x*9.0+t*0.8-uv.y*3.0)*0.07+sin(uv.y*6.0+t*0.6+uv.x*2.0)*0.05;',
  '  float d=distance(uv,uMouse);',
  '  float bump=exp(-d*d*20.0)*uPush;',
  '  float dc=min(min(length(uv),length(uv-vec2(1.0,0.0))),min(length(uv-vec2(0.0,1.0)),length(uv-vec2(1.0))));',
  '  return (w+bump)*smoothstep(0.0,0.5,dc);',
  '}',
  'void main(){',
  '  vUv=uv; float e=0.004; vec3 p=position;',
  '  float H=h(uv); float hx=h(uv+vec2(e,0.0)); float hy=h(uv+vec2(0.0,e));',
  '  vec3 n=normalize(cross(vec3(e*6.4,0.0,hx-H),vec3(0.0,e*3.8,hy-H)));',
  '  p.z+=H;',
  '  vec4 mv=modelViewMatrix*vec4(p,1.0); vP=mv.xyz; vN=normalMatrix*n;',
  '  gl_Position=projectionMatrix*mv;',
  '}'].join('\n');
  var FRAG = [
  'precision highp float;',
  'uniform sampler2D uTex;',
  'varying vec2 vUv; varying vec3 vN; varying vec3 vP;',
  'void main(){',
  '  vec3 col=texture2D(uTex,vUv).rgb;',
  '  vec3 N=normalize(vN); if(!gl_FrontFacing) N=-N;',
  '  vec3 L=normalize(vec3(-0.4,0.6,0.8));',
  '  float diff=0.62+0.48*max(dot(N,L),0.0);',
  '  float spec=pow(max(dot(reflect(-L,N),normalize(-vP)),0.0),26.0)*0.28;',
  '  gl_FragColor=vec4(col*diff+spec,1.0);',
  '}'].join('\n');

export function initScene(hero, reduce, opts){
    opts = opts || {}; var sgn = opts.rtl ? -1 : 1;
    var mobile = window.matchMedia('(max-width:760px)').matches;
    var cv = document.getElementById('gl'), renderer;
    try { renderer = new THREE.WebGLRenderer({canvas:cv, antialias:!mobile, alpha:true}); }
    catch(e){ hero.classList.add('no-gl'); return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio||1, mobile ? 1.5 : 2));
    var scene = new THREE.Scene();
    var cam = new THREE.PerspectiveCamera(32,1,0.1,60); cam.position.set(0,0,10);
    scene.add(new THREE.HemisphereLight(0xffffff,0x00552e,0.95));
    var dl = new THREE.DirectionalLight(0xffffff,0.85); dl.position.set(-3,4,6); scene.add(dl);
    var pl = new THREE.PointLight(0x7dffc0,0.9,30); pl.position.set(4,-1,5); scene.add(pl);

    var group = new THREE.Group(); scene.add(group);
    var bc = bannerCanvas({rtl:!!opts.rtl, banner:opts.banner||'Votre marque, en grand.', bannerRight:opts.bannerRight||'Bâche · Vinyle · Forex'});
    var tex = new THREE.CanvasTexture(bc.canvas);
    tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
    if (document.fonts && document.fonts.load){
      Promise.all([document.fonts.load('700 100px Poppins'),document.fonts.load('600 60px Poppins'),document.fonts.load('500 40px Poppins')].concat(opts.rtl ? [document.fonts.load('600 60px "IBM Plex Sans Arabic"')] : []))
        .then(function(){ bc.redraw(); tex.needsUpdate = true; }).catch(function(){});
    }
    var U = { uTime:{value:0}, uMouse:{value:new THREE.Vector2(-5,-5)}, uPush:{value:0}, uTex:{value:tex} };
    var tarp = new THREE.Mesh(new THREE.PlaneGeometry(6.4,3.8,mobile?100:150,mobile?60:88),
      new THREE.ShaderMaterial({uniforms:U, vertexShader:VERT, fragmentShader:FRAG, side:THREE.DoubleSide}));
    tarp.position.set(0.3,0.2,0);
    group.add(tarp);

    /* vinyl roll */
    var rollWrap = new THREE.Group(), roll = new THREE.Group();
    var rt = new THREE.CanvasTexture(stripeCanvas('#F2F7F3','#00A857',9)); rt.wrapS = rt.wrapT = THREE.RepeatWrapping; rt.repeat.set(2,1);
    roll.add(new THREE.Mesh(new THREE.CylinderGeometry(0.44,0.44,2.5,56), new THREE.MeshPhongMaterial({map:rt,shininess:40,specular:0x99ffcc})));
    var core = new THREE.Mesh(new THREE.CylinderGeometry(0.17,0.17,2.8,32), new THREE.MeshPhongMaterial({color:0x06110b,shininess:60}));
    roll.add(core);
    rollWrap.add(roll); rollWrap.rotation.z = 0.95; rollWrap.rotation.x = 0.25;
    rollWrap.position.set(-2.9,-1.35,1.5);
    group.add(rollWrap);

    /* trophy */
    var tro = new THREE.Group();
    var prof = [[0.0,0.0],[0.62,0.0],[0.66,0.1],[0.56,0.2],[0.2,0.32],[0.13,0.5],[0.14,0.85],[0.3,0.98],[0.62,1.35],[0.7,1.85],[0.6,1.9],[0.52,1.78],[0.0,1.78]].map(function(p){return new THREE.Vector2(p[0],p[1]);});
    tro.add(new THREE.Mesh(new THREE.LatheGeometry(prof,48), new THREE.MeshPhongMaterial({color:0xf2f7f3,shininess:110,specular:0xaaffdd,side:THREE.DoubleSide})));
    var base = new THREE.Mesh(new THREE.CylinderGeometry(0.72,0.78,0.22,40), new THREE.MeshPhongMaterial({color:0x00a857,shininess:80,specular:0xffffff}));
    base.position.y = -0.1; tro.add(base);
    [-1,1].forEach(function(s){
      var h = new THREE.Mesh(new THREE.TorusGeometry(0.34,0.05,12,32,Math.PI), new THREE.MeshPhongMaterial({color:0xf2f7f3,shininess:110}));
      h.rotation.z = s>0 ? -Math.PI/2 : Math.PI/2; h.position.set(0.72*s,1.4,0); tro.add(h);
    });
    tro.scale.setScalar(0.95); tro.position.set(3.35,-1.9,1.2);
    group.add(tro);

    /* forex panels */
    function panel(colA,colB,x,y,z,ry,rz){
      var m = new THREE.Mesh(new THREE.BoxGeometry(1.7,1.15,0.07),
        [0,1,2,3,4,5].map(function(i){ return new THREE.MeshPhongMaterial(i===4?{map:new THREE.CanvasTexture(stripeCanvas(colA,colB,12)),shininess:40}:{color:0xf2f7f3,shininess:20}); }));
      m.position.set(x,y,z); m.rotation.y = ry; m.rotation.z = rz; group.add(m); return m;
    }
    var p1 = panel('#06110B','#00A857',-3.2,1.55,0.7,0.45,0.12);
    var p2 = panel('#00A857','#064A2C',3.7,1.7,0.4,-0.4,-0.1);

    var st = {tx:0,ty:0,mx:0,my:0,push:0,tpush:0,intro:reduce?1:0,scroll:0,visible:true,w:1,h:1,visW:1,visH:1,sc:1,px:0,py:0};
    function resize(){
      var r = hero.getBoundingClientRect(); st.w=r.width; st.h=r.height;
      renderer.setSize(st.w, st.h, false);
      cam.aspect = st.w/st.h; cam.updateProjectionMatrix();
      st.visH = 2*Math.tan(cam.fov*Math.PI/360)*cam.position.z; st.visW = st.visH*cam.aspect;
      if (cam.aspect > 1.15){ st.sc = st.visW*0.55/9; st.px = st.visW*0.17*sgn; st.py = st.visH*0.02; }
      else { st.sc = st.visW*0.9/9; st.px = 0; st.py = st.visH*0.24; }
    }
    resize(); window.addEventListener('resize', resize);
    hero.addEventListener('pointermove', function(e){
      var r = hero.getBoundingClientRect();
      st.tx = ((e.clientX-r.left)/r.width)*2-1; st.ty = -(((e.clientY-r.top)/r.height)*2-1);
      var wx = st.tx*st.visW/2, wy = st.ty*st.visH/2;
      U.uMouse.value.set((wx-st.px)/(6.4*st.sc)-0.3/6.4+0.5, (wy-st.py)/(3.8*st.sc)-0.2/3.8+0.5); st.tpush = 0.45;
    });
    hero.addEventListener('pointerleave', function(){ st.tpush = 0; st.tx = 0; st.ty = 0; });
    new IntersectionObserver(function(es){ st.visible = es[0].isIntersecting; }).observe(hero);
    if (!reduce) gsap.to(st,{intro:1,duration:1.8,ease:'power3.out',delay:.1});
    ScrollTrigger.create({trigger:hero,start:'top top',end:'bottom top',scrub:true,onUpdate:function(s){st.scroll=s.progress;}});
    var clock = new THREE.Clock();
    (function frame(){
      requestAnimationFrame(frame);
      if (!st.visible) return;
      var dt = Math.min(clock.getDelta(),0.05);
      if (!reduce) U.uTime.value += dt; else U.uTime.value = 3.0;
      var t = U.uTime.value;
      st.mx += (st.tx-st.mx)*0.06; st.my += (st.ty-st.my)*0.06;
      st.push += ((reduce?0:st.tpush)-st.push)*0.08; U.uPush.value = st.push;
      var e = 1-Math.pow(1-st.intro,3);
      var s = st.sc*(0.8+0.2*e);
      group.scale.set(s,s,s);
      group.position.set(st.px + sgn*(1-e)*1.4, st.py + st.scroll*1.4, 0);
      group.rotation.y = sgn*(-0.30 + st.scroll*0.4 + (1-e)*0.6) + st.mx*0.18;
      group.rotation.x = 0.05 - st.my*0.10;
      if (!reduce){
        roll.rotation.y += dt*0.7;
        rollWrap.position.y = -1.35 + Math.sin(t*0.9)*0.1 - (1-e)*2;
        tro.rotation.y += dt*0.6; tro.position.y = -1.9 + Math.sin(t*0.8+1.0)*0.09 - (1-e)*2;
        p1.position.y = 1.55 + Math.sin(t*0.7+2.0)*0.12 + (1-e)*2; p1.rotation.y = 0.45 + Math.sin(t*0.5)*0.12;
        p2.position.y = 1.7 + Math.sin(t*0.6+0.5)*0.12 + (1-e)*2; p2.rotation.y = -0.4 + Math.sin(t*0.55+1.0)*0.12;
      }
      renderer.render(scene, cam);
    })();
  }

