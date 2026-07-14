'use strict';
/* ═══════════════════════════════════════════════════════════════════════
   PLAYGROUND.JS  — Strategy Playground
   White, professional, full-width layout.
   Tutorial autoplay (3 simulations) before user plays.
═══════════════════════════════════════════════════════════════════════ */

const PG = {
  principles: [
    { id:'p1', icon:'⬅️', name:'Shift Left',            col:'#1A6FBE', bg:'#EAF3FD',
      desc:'Catch security & compliance at requirement stage — not after build.',
      effects:{ deploy:8, lead:-12, fail:-22, mttr:-18, coverage:15 },
      requires:[], enables:['p7'],
      tip:'Moving checks to the start catches 80% of issues before any code is written.' },
    { id:'p2', icon:'⚙️', name:'Automate Everything',   col:'#0F6B50', bg:'#E4F5F0',
      desc:'Zero manual steps from commit to production.',
      effects:{ deploy:28, lead:-42, fail:-16, mttr:-22, coverage:12 },
      requires:[], enables:['p5','p6','p9'],
      tip:'The single biggest lever for deploy frequency and lead time reduction.' },
    { id:'p3', icon:'📐', name:'Standardize Patterns',  col:'#856404', bg:'#FFF8E0',
      desc:'One API template, one Bicep module, one Helm chart — for all six registries.',
      effects:{ deploy:10, lead:-16, fail:-10, mttr:-10, coverage:8 },
      requires:[], enables:['p4'],
      tip:'Fix one template and all six registries benefit simultaneously.' },
    { id:'p4', icon:'♻️', name:'Reuse Before Build',    col:'#107C10', bg:'#DFF6DD',
      desc:'Five shared services built once and consumed by all six registries.',
      effects:{ deploy:6, lead:-20, fail:-9, mttr:-6, coverage:6 },
      requires:['p3'], enables:[],
      tip:'Eliminates duplication. Needs standardisation (p3) to function at full effect.' },
    { id:'p5', icon:'⚡', name:'Parallel Execution',    col:'#6B4FA8', bg:'#F0EBF9',
      desc:'All six delivery streams working simultaneously from day one.',
      effects:{ deploy:16, lead:-38, fail:-6, mttr:-9, coverage:5 },
      requires:['p2'], enables:['p6'],
      tip:'The biggest schedule compressor. Requires automation (p2) to prevent team conflicts.' },
    { id:'p6', icon:'🔄', name:'Incremental Delivery',  col:'#1A6FBE', bg:'#EAF3FD',
      desc:'Working features released every two weeks — not after 18 months.',
      effects:{ deploy:20, lead:-26, fail:-13, mttr:-12, coverage:9 },
      requires:['p2','p5'], enables:[],
      tip:'Two-week sprints need automation (p2) and parallel teams (p5) to be sustainable.' },
    { id:'p7', icon:'🏛️', name:'Governance by Design',  col:'#C55A00', bg:'#FFF4CE',
      desc:'Audit trails, approvals and compliance reports generated automatically.',
      effects:{ deploy:5, lead:-6, fail:-9, mttr:-14, coverage:3 },
      requires:[], enables:[],
      tip:'Steering Committee sees real-time data, not monthly PDFs.' },
    { id:'p8', icon:'🛡️', name:'Zero-Trust Security',   col:'#0F6B50', bg:'#E4F5F0',
      desc:'Verify explicitly, assume breach, least-privilege access everywhere.',
      effects:{ deploy:-4, lead:4, fail:-26, mttr:-32, coverage:5 },
      requires:[], enables:[],
      tip:'Slight deploy overhead but massively reduces incidents and recovery time.' },
    { id:'p9', icon:'🤖', name:'AI-Accelerated Delivery',col:'#6B4FA8', bg:'#F0EBF9',
      desc:'Claude CLI + GitHub Copilot + Azure OpenAI with Human-in-the-Loop gate.',
      effects:{ deploy:18, lead:-32, fail:-20, mttr:-11, coverage:22 },
      requires:['p2'], enables:[],
      tip:'Every AI output requires explicit human approval before proceeding.' },
  ],

  kpis: [
    { id:'deploy',   icon:'🚀', name:'Deploy Frequency',  low:30, high:70,
      lo:'Monthly', hi:'Daily',   target:'Daily',
      desc:'0 = monthly (traditional).  100 = daily (DGTP target).' },
    { id:'lead',     icon:'⏱️', name:'Lead Time',          low:30, high:70,
      lo:'8 weeks', hi:'< 24 h',  target:'< 24 hours',
      desc:'0 = 8-week release cycle.  100 = code-complete to live in under 24 hours.' },
    { id:'fail',     icon:'🛡️', name:'Change Fail Rate',   low:30, high:70,
      lo:'25% fail',hi:'< 5%',    target:'< 5%',
      desc:'0 = 1-in-4 deployments break something.  100 = fewer than 1-in-20.' },
    { id:'mttr',     icon:'🔧', name:'Recovery Time',      low:30, high:70,
      lo:'Days',    hi:'< 1 hr',  target:'< 1 hour',
      desc:'0 = days to restore service.  100 = automated recovery in under one hour.' },
    { id:'coverage', icon:'🧪', name:'Test Coverage',      low:30, high:70,
      lo:'Manual',  hi:'≥ 80%',   target:'≥ 80%',
      desc:'0 = manual spot-check only.  100 = 80%+ lines covered by automated tests.' },
  ],

  stageMap: {
    'plan':   ['p1','p3','p7'],
    'dev':    ['p2','p4','p9'],
    'sec':    ['p1','p8'],
    'test':   ['p2','p6'],
    'deploy': ['p5','p6'],
    'monitor':['p7','p8'],
  },

  presets: [
    { key:'full',     label:'Full Orange bd Strategy',  ids:['p1','p2','p3','p4','p5','p6','p7','p8','p9'] },
    { key:'mvp',      label:'Minimum Viable',           ids:['p2','p5','p8'] },
    { key:'security', label:'Security First',           ids:['p1','p7','p8','p3'] },
    { key:'speed',    label:'Speed First',              ids:['p2','p5','p6','p9'] },
    { key:'clear',    label:'Clear All',                ids:[] },
  ],

  tutorial: [
    {
      title: 'Simulation 1 — Speed Only',
      steps: [
        { label:'Activate Automate Everything', ids:['p2'], delay:800 },
        { label:'Activate Parallel Execution',  ids:['p2','p5'], delay:1400 },
        { label:'Activate Incremental Delivery',ids:['p2','p5','p6'], delay:2000 },
      ],
      note:'Speed-first approach. Deploy Frequency and Lead Time score high — but Change Fail Rate and Recovery Time remain low because there are no quality or security controls.'
    },
    {
      title: 'Simulation 2 — Security Only',
      steps: [
        { label:'Activate Shift Left',           ids:['p1'], delay:800 },
        { label:'Activate Zero-Trust Security',  ids:['p1','p8'], delay:1400 },
        { label:'Activate Governance by Design', ids:['p1','p8','p7'], delay:2000 },
      ],
      note:'Quality-first approach. Change Fail Rate and Recovery Time improve significantly — but Deploy Frequency and Lead Time stay low because there is no automation.'
    },
    {
      title: 'Simulation 3 — Full Strategy',
      steps: [
        { label:'Activate Automate Everything',  ids:['p2'], delay:600 },
        { label:'Add Parallel Execution',        ids:['p2','p5'], delay:1200 },
        { label:'Add Security controls',         ids:['p2','p5','p1','p8'], delay:1800 },
        { label:'Add remaining principles',      ids:['p1','p2','p3','p4','p5','p6','p7','p8','p9'], delay:2500 },
      ],
      note:'All nine principles active — the full Orange bd strategy. Every KPI reaches the On Target zone because speed, quality, and governance compound together.'
    }
  ]
};

/* ─── STATE ──────────────────────────────────────────────────────────── */
let pgActive  = new Set();
let pgPrev    = { deploy:0, lead:0, fail:0, mttr:0, coverage:0 };
let pgDragging = null;
let pgTutorialActive = false;
let pgTutorialTimer  = null;

/* ─── SCORE ENGINE ───────────────────────────────────────────────────── */
function calcScores() {
  const s = { deploy:0, lead:0, fail:0, mttr:0, coverage:0 };
  // For lead/fail/mttr: effects are negative (reductions) — flip to positive score contribution
  const flipKeys = { lead:true, fail:true, mttr:true };
  pgActive.forEach(id => {
    const p = PG.principles.find(x => x.id === id);
    if (!p) return;
    const depPenalty = p.requires.some(r => !pgActive.has(r));
    const m = depPenalty ? 0.4 : 1;
    Object.keys(p.effects).forEach(k => {
      const v = p.effects[k] * m;
      s[k] += flipKeys[k] ? -v : v;  // flip negatives to positives for improvement metrics
    });
  });
  Object.keys(s).forEach(k => { s[k] = Math.max(0, Math.min(100, Math.round(s[k]))); });
  return s;
}
function overall(s) {
  return Math.round(Object.values(s).reduce((a,b)=>a+b,0)/5);
}

/* ─── ANIMATE NUMBER ─────────────────────────────────────────────────── */
function animN(el, from, to, ms) {
  if (!el) return;
  const t0 = performance.now();
  (function tick(now) {
    const p = Math.min(1,(now-t0)/ms), e = 1-Math.pow(1-p,3);
    el.textContent = Math.round(from+(to-from)*e);
    if (p<1) requestAnimationFrame(tick);
  })(t0);
}

/* ─── RENDER SCORES ──────────────────────────────────────────────────── */
function renderScores(s, instant) {
  PG.kpis.forEach(kpi => {
    const bar  = document.getElementById('pgbar-'+kpi.id);
    const num  = document.getElementById('pgnum-'+kpi.id);
    const stat = document.getElementById('pgstat-'+kpi.id);
    if (!bar || !num) return;
    const v = s[kpi.id]||0, pv = pgPrev[kpi.id]||0;
    const col = v>=kpi.high ? '#107C10' : v>=kpi.low ? '#C55A00' : '#A4262C';
    const bg  = v>=kpi.high ? '#DFF6DD' : v>=kpi.low ? '#FFF4CE' : '#FDE7E9';
    bar.style.width = v+'%';
    bar.style.background = col;
    if (stat) {
      stat.textContent = v>=kpi.high ? 'On Target' : v>=kpi.low ? 'Partial' : 'At Risk';
      stat.style.background = bg;
      stat.style.color = col;
    }
    if (instant) { num.textContent = v; } else animN(num, pv, v, 550);
  });

  const ov = overall(s), opv = overall(pgPrev);
  const c  = ov>=70?'#107C10':ov>=40?'#C55A00':'#A4262C';
  const circ = 2*Math.PI*46;
  const rp = document.getElementById('pg-ring-path');
  const rn = document.getElementById('pg-ring-num');
  const rl = document.getElementById('pg-ring-lbl');
  if (rp) { rp.style.strokeDashoffset=(circ*(1-ov/100)).toFixed(2); rp.style.stroke=c; }
  if (rn) { if(instant) rn.textContent=ov; else animN(rn,opv,ov,650); }
  if (rl) { rl.style.color=c; rl.textContent = ov>=80?'Elite strategy':ov>=60?'Strong strategy':ov>=40?'Needs work':'High risk'; }

  const ac = document.getElementById('pg-active-count');
  if (ac) ac.textContent = pgActive.size+' of 9 active';
  pgPrev = {...s};
}

/* ─── RENDER CARDS ───────────────────────────────────────────────────── */
function renderCards() {
  PG.principles.forEach(p => {
    const card = document.getElementById('pgcard-'+p.id);
    if (!card) return;
    const act = pgActive.has(p.id);
    const brk = act && p.requires.some(r=>!pgActive.has(r));
    card.classList.toggle('pgc-active', act);
    card.classList.toggle('pgc-broken', brk);
    const ef = document.getElementById('pgeff-'+p.id);
    if (ef) {
      const flipK = { lead:true, fail:true, mttr:true };
      const top = Object.entries(p.effects).sort((a,b)=>Math.abs(b[1])-Math.abs(a[1])).slice(0,3);
      ef.innerHTML = top.map(([k,v])=>{
        const kn = PG.kpis.find(x=>x.id===k);
        // For improvement metrics, negative value = positive outcome — show as green +
        const displayV = flipK[k] ? -v : v;
        return `<span class="pgeff-v" style="color:${displayV>0?'#107C10':'#A4262C'}">${displayV>0?'+':''}${Math.abs(v)}</span><span class="pgeff-k">${kn?kn.name.split(' ')[0]:k}</span>`;
      }).join('<span class="pgeff-sep">·</span>');
    }
  });
}

/* ─── RENDER DROP ZONE CHIPS ─────────────────────────────────────────── */
function renderZones() {
  Object.keys(PG.stageMap).forEach(stId => {
    const el = document.getElementById('pgchips-'+stId);
    if (!el) return;
    const active = PG.stageMap[stId].filter(id=>pgActive.has(id));
    el.innerHTML = active.map(id=>{
      const p=PG.principles.find(x=>x.id===id);
      return p?`<span class="pgchip" style="background:${p.bg};color:${p.col};border:1px solid ${p.col}30;">${p.icon} ${p.name}</span>`:'';
    }).join('');
    // Show/hide hint
    const hint = document.getElementById('pghint-'+stId);
    if (hint) hint.style.display = active.length ? 'none' : '';
  });
}

/* ─── RENDER WARNINGS ────────────────────────────────────────────────── */
function renderWarns() {
  const box = document.getElementById('pg-warns');
  if (!box) return;
  const w = [];
  pgActive.forEach(id=>{
    const p=PG.principles.find(x=>x.id===id);
    if(!p) return;
    p.requires.forEach(r=>{
      if(!pgActive.has(r)){
        const rp=PG.principles.find(x=>x.id===r);
        w.push({t:'dep',m:`<strong>${p.name}</strong> needs <strong>${rp?rp.name:r}</strong> — running at 40% effect`});
      }
    });
  });
  if (!pgActive.has('p2')&&(pgActive.has('p5')||pgActive.has('p9')))
    w.push({t:'brk',m:'<strong>Parallel Execution</strong> or <strong>AI Delivery</strong> without <strong>Automate Everything</strong> — teams will conflict and block each other'});
  if (!pgActive.has('p1')&&!pgActive.has('p8')&&pgActive.size>3)
    w.push({t:'brk',m:'No security controls active — Shift Left and Zero-Trust are both missing'});
  if (pgActive.size===0)
    w.push({t:'tip',m:'Click any principle card, or drag it onto a pipeline stage, to activate it and watch your KPI scores update'});
  if (pgActive.size===9)
    w.push({t:'ok',m:'All nine principles active — this is the full Orange bd DGTP strategy'});
  box.innerHTML = w.length
    ? w.map(x=>`<div class="pgwarn pgwarn-${x.t}">${x.m}</div>`).join('')
    : '<div class="pgwarn pgwarn-ok">No dependency conflicts — strategy is internally consistent</div>';
}

/* ─── TOGGLE ─────────────────────────────────────────────────────────── */
function pgToggle(id, silent) {
  const was = pgActive.has(id);
  if (was) {
    pgActive.delete(id);
    PG.principles.forEach(p=>{
      if(p.requires.includes(id)&&pgActive.has(p.id)){
        pgActive.delete(p.id);
        const c=document.getElementById('pgcard-'+p.id);
        if(c){c.classList.add('pgc-flash-off');setTimeout(()=>c.classList.remove('pgc-flash-off'),500);}
      }
    });
  } else { pgActive.add(id); }
  const card=document.getElementById('pgcard-'+id);
  if(card){card.classList.add(was?'pgc-flash-off':'pgc-flash-on');setTimeout(()=>card.classList.remove('pgc-flash-on','pgc-flash-off'),500);}
  renderCards(); renderScores(calcScores(),false); renderWarns(); renderZones();
  if (!silent) playPgSound(!was);
}

function playPgSound(add) {
  try {
    const ctx=new(window.AudioContext||window.webkitAudioContext)();
    const o=ctx.createOscillator(),g=ctx.createGain();
    o.connect(g);g.connect(ctx.destination);o.type='sine';
    o.frequency.setValueAtTime(add?440:330,ctx.currentTime);
    o.frequency.linearRampToValueAtTime(add?660:220,ctx.currentTime+0.12);
    g.gain.setValueAtTime(0.08,ctx.currentTime);g.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+0.25);
    o.start(ctx.currentTime);o.stop(ctx.currentTime+0.3);
  } catch(e){}
}

/* ─── PRESETS ────────────────────────────────────────────────────────── */
window.pgPreset = function(key) {
  const pr=PG.presets.find(p=>p.key===key);
  if(!pr) return;
  pgActive=new Set(pr.ids);
  renderCards(); renderScores(calcScores(),false); renderWarns(); renderZones();
};

/* ─── TUTORIAL ───────────────────────────────────────────────────────── */
window.runTutorial = function runTutorial() {
  if (pgTutorialActive) return;
  pgTutorialActive = true;
  let simIdx = 0;

  const overlay = document.getElementById('pg-tutorial-overlay');
  const titleEl = document.getElementById('pg-tut-title');
  const noteEl  = document.getElementById('pg-tut-note');
  const stepEl  = document.getElementById('pg-tut-step');
  const skipBtn = document.getElementById('pg-tut-skip');
  const progEl  = document.getElementById('pg-tut-prog');
  if (!overlay) return;

  overlay.style.display = 'block';

  function runSim(sim) {
    if (titleEl) titleEl.textContent = sim.title;
    if (noteEl) noteEl.textContent = '';
    if (stepEl) stepEl.textContent = sim.steps[0].label;
    if (progEl) progEl.textContent = `Simulation ${simIdx+1} of 3`;

    // Reset
    pgActive = new Set();
    renderCards(); renderScores({deploy:0,lead:0,fail:0,mttr:0,coverage:0},false); renderWarns(); renderZones();

    let stepIdx = 0;
    function doStep() {
      if (stepIdx >= sim.steps.length) {
        // All steps done — show note, then after 2.5s move to next sim
        if (noteEl) noteEl.textContent = sim.note;
        pgTutorialTimer = setTimeout(() => {
          simIdx++;
          if (simIdx < PG.tutorial.length) runSim(PG.tutorial[simIdx]);
          else endTutorial();
        }, 3200);
        return;
      }
      const step = sim.steps[stepIdx];
      if (stepEl) stepEl.textContent = step.label;
      // Animate to new active set
      pgActive = new Set(step.ids);
      renderCards(); renderScores(calcScores(),false); renderWarns(); renderZones();
      stepIdx++;
      pgTutorialTimer = setTimeout(doStep, step.delay || 1400);
    }

    pgTutorialTimer = setTimeout(doStep, 600);
  }

  function endTutorial() {
    if (pgTutorialTimer) { clearTimeout(pgTutorialTimer); pgTutorialTimer = null; }
    overlay.style.display = 'none';
    pgTutorialActive = false;
    pgActive = new Set();
    renderCards(); renderScores({deploy:0,lead:0,fail:0,mttr:0,coverage:0},true); renderWarns(); renderZones();
  }

  // Re-wire skip button every time runTutorial is called
  const skipBtnEl = document.getElementById('pg-tut-skip');
  if (skipBtnEl) {
    skipBtnEl.onclick = () => endTutorial();
  }

  runSim(PG.tutorial[0]);
}

/* ─── BUILD HTML ─────────────────────────────────────────────────────── */
function buildPlayground() {
  const container = document.getElementById('playground-inner');
  if (!container) return;
  const circ = (2*Math.PI*46).toFixed(2);

  const stages = [
    {id:'plan',    label:'Plan & Design',   icon:'📋', col:'#5A6B7A'},
    {id:'dev',     label:'Development',      icon:'💻', col:'#1A6FBE'},
    {id:'sec',     label:'Security',         icon:'🔐', col:'#856404'},
    {id:'test',    label:'Testing & QA',     icon:'🧪', col:'#107C10'},
    {id:'deploy',  label:'Deployment',       icon:'🚀', col:'#003087'},
    {id:'monitor', label:'Monitoring',       icon:'📊', col:'#6B4FA8'},
  ];

  container.innerHTML = `

  <!-- ── CONTROLS BAR ──────────────────────────────────────────────── -->
  <div class="pg-controls">
    <div class="pg-ctrl-left">
      <span class="pg-active-lbl">Active:</span>
      <span id="pg-active-count" class="pg-active-count">0 of 9 active</span>
    </div>
    <div class="pg-ctrl-presets">
      ${PG.presets.map(p=>`<button class="pg-pre" onclick="pgPreset('${p.key}')">${p.label}</button>`).join('')}
    </div>
    <div class="pg-ctrl-right">
      <button class="pg-pre pg-pre-tut" onclick="runTutorial()">▶ Run Tutorial Again</button>
    </div>
  </div>

  <!-- ── MAIN LAYOUT ───────────────────────────────────────────────── -->
  <div class="pg-main">

    <!-- LEFT: Principle palette 3 columns ─────────────────────────── -->
    <div class="pg-left">
      <div class="pg-panel-hd">
        <div class="pg-panel-title">Nine Governing Principles</div>
        <div class="pg-panel-sub">Click to toggle active · Drag onto a pipeline stage</div>
      </div>
      <div class="pg-grid-3">
        ${PG.principles.map(p=>`
          <div class="pg-card" id="pgcard-${p.id}" draggable="true"
            onclick="pgToggle('${p.id}')" title="${p.tip}"
            style="--pc:${p.col};--pb:${p.bg};">
            <div class="pg-chead">
              <span class="pg-cicon">${p.icon}</span>
              <span class="pg-ctick" id="pgtick-${p.id}">✓</span>
            </div>
            <div class="pg-cname">${p.name}</div>
            <div class="pg-cdesc">${p.desc}</div>
            <div class="pg-ceff" id="pgeff-${p.id}"></div>
            ${p.requires.length?`<div class="pg-creq">Needs: ${p.requires.map(r=>{const rp=PG.principles.find(x=>x.id===r);return rp?rp.name.split(' ')[0]:r;}).join(' + ')}</div>`:''}
          </div>`).join('')}
      </div>
    </div>

    <!-- RIGHT: Pipeline + KPI ─────────────────────────────────────── -->
    <div class="pg-right">

      <!-- Pipeline stages ─────────────────────────────────────────── -->
      <div class="pg-panel-hd">
        <div class="pg-panel-title">Delivery Pipeline</div>
        <div class="pg-panel-sub">Drag principles onto stages — chips appear where they belong</div>
      </div>
      <div class="pg-pipeline-row">
        ${stages.map((st,i)=>`
          <div class="pg-stagecol">
            <div class="pg-stage-lbl" style="color:${st.col};">${st.icon} ${st.label}</div>
            <div class="pg-dz" id="pgdz-${st.id}" data-st="${st.id}" style="--dc:${st.col};">
              <div class="pg-dz-chips" id="pgchips-${st.id}"></div>
              <div class="pg-dz-hint" id="pghint-${st.id}">Drop here</div>
            </div>
          </div>
          ${i<stages.length-1?'<div class="pg-stage-arrow">→</div>':''}`).join('')}
      </div>

      <!-- Warnings ────────────────────────────────────────────────── -->
      <div id="pg-warns" class="pg-warns"></div>

      <!-- KPI Rubric ──────────────────────────────────────────────── -->
      <div class="pg-kpi-panel">
        <div class="pg-kpi-left">
          <div class="pg-panel-hd" style="margin-bottom:12px;">
            <div class="pg-panel-title">Live KPI Rubric</div>
            <div class="pg-panel-sub">Auto-updates as you activate principles</div>
          </div>
          ${PG.kpis.map(kpi=>`
            <div class="pg-kpi">
              <div class="pg-kpi-top">
                <span class="pg-kpi-icon">${kpi.icon}</span>
                <span class="pg-kpi-name">${kpi.name}</span>
                <span class="pg-kpistat pgkstat-${kpi.id}" id="pgstat-${kpi.id}">At Risk</span>
                <span class="pg-kpi-num" id="pgnum-${kpi.id}">0</span>
              </div>
              <div class="pg-kpi-track" title="${kpi.desc}">
                <div class="pg-kpi-fill" id="pgbar-${kpi.id}"></div>
                <div class="pg-kpi-tick" style="left:${kpi.low}%;"></div>
                <div class="pg-kpi-tick pg-kpi-tick-hi" style="left:${kpi.high}%;"></div>
              </div>
              <div class="pg-kpi-lbls"><span>${kpi.lo}</span><span>Target: ${kpi.target}</span><span>${kpi.hi}</span></div>
            </div>`).join('')}
        </div>
        <div class="pg-kpi-right">
          <div class="pg-ring-wrap">
            <svg viewBox="0 0 100 100" width="130" height="130">
              <circle cx="50" cy="50" r="46" fill="none" stroke="#E8ECF0" stroke-width="7"/>
              <circle id="pg-ring-path" cx="50" cy="50" r="46" fill="none" stroke="#A4262C"
                stroke-width="7" stroke-linecap="round"
                stroke-dasharray="${circ}" stroke-dashoffset="${circ}"
                style="transform:rotate(-90deg);transform-origin:50px 50px;
                transition:stroke-dashoffset 0.65s cubic-bezier(.4,0,.2,1),stroke 0.4s;"/>
            </svg>
            <div class="pg-ring-center">
              <div class="pg-ring-num" id="pg-ring-num">0</div>
              <div class="pg-ring-pct">%</div>
            </div>
          </div>
          <div id="pg-ring-lbl" class="pg-ring-lbl" style="color:#A4262C;">High risk</div>
          <div class="pg-ring-legend">
            <div class="pg-rl-row"><span class="pg-rl-dot" style="background:#A4262C;"></span><span>At Risk (0–30)</span></div>
            <div class="pg-rl-row"><span class="pg-rl-dot" style="background:#C55A00;"></span><span>Partial (30–70)</span></div>
            <div class="pg-rl-row"><span class="pg-rl-dot" style="background:#107C10;"></span><span>On Target (70–100)</span></div>
          </div>
        </div>
      </div>

    </div>
  </div>`;

  // ── Wire drag & drop ───────────────────────────────────────────── //
  container.querySelectorAll('.pg-card').forEach(card => {
    card.addEventListener('dragstart', e => {
      pgDragging = card.id.replace('pgcard-','');
      e.dataTransfer.effectAllowed = 'copy';
      card.style.opacity = '0.55';
      container.querySelectorAll('.pg-dz').forEach(z=>z.classList.add('pg-dz-ready'));
    });
    card.addEventListener('dragend', () => {
      pgDragging = null; card.style.opacity = '';
      container.querySelectorAll('.pg-dz').forEach(z=>z.classList.remove('pg-dz-ready','pg-dz-over'));
    });
  });
  container.querySelectorAll('.pg-dz').forEach(zone => {
    zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('pg-dz-over'); });
    zone.addEventListener('dragleave', e => { if(!zone.contains(e.relatedTarget)) zone.classList.remove('pg-dz-over'); });
    zone.addEventListener('drop', e => {
      e.preventDefault(); zone.classList.remove('pg-dz-over');
      if (pgDragging) { pgToggle(pgDragging); pgDragging=null; }
    });
  });

  // ── Initial render ─────────────────────────────────────────────── //
  renderCards(); renderScores({deploy:0,lead:0,fail:0,mttr:0,coverage:0},true); renderWarns(); renderZones();

  // ── Auto-start tutorial after 400ms ────────────────────────────── //
  setTimeout(runTutorial, 400);
}

document.addEventListener('DOMContentLoaded', buildPlayground);
