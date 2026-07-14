'use strict';
// ═══════════════════════════════════════════════════════════════════════════
//  PIPELINE.JS — Interactive CI/CD Stage Explorer
// ═══════════════════════════════════════════════════════════════════════════
const PIPELINE_DATA = [
  { id:'commit', icon:'💻', label:'Code Commit', badge:'Auto', tool:'Azure Repos',          gate:'Branch Policy',     purpose:'Every commit triggers Azure Repos branch policy — 2 reviewers required, linked work item mandatory. PR required for all merges.',                                     kpis:[{l:'Min Reviewers',v:'2'},{l:'Work Item',v:'Required'},{l:'Branch Policy',v:'Enforced'}] },
  { id:'build',  icon:'🔨', label:'Build',       badge:'Auto', tool:'Azure Pipelines',       gate:'Compilation Gate',  purpose:'YAML multi-stage pipeline compiles artefacts via Maven / npm / Gradle. Artefacts versioned and published to Azure Artefacts feed. Build cache reduces time 40%.',kpis:[{l:'Build Tool',v:'Maven/npm'},{l:'Artefact Store',v:'Azure Artefacts'},{l:'Cache Saving',v:'~40%'}] },
  { id:'sast',   icon:'🔍', label:'SAST & Scan', badge:'Sec',  tool:'Defender for DevOps',   gate:'Security Gate',     purpose:'Microsoft Defender for DevOps performs SAST, secret detection, and SCA dependency scanning. Pipeline automatically fails on Critical/High severity findings.',         kpis:[{l:'SAST',v:'Defender DevOps'},{l:'Secret Scan',v:'Every Commit'},{l:'SCA',v:'NuGet/npm/Maven'}] },
  { id:'contaienr',icon:'📦',label:'Containerize',badge:'Auto',tool:'Docker + Azure ACR',   gate:'Image Gate',        purpose:'Docker image built, tagged with immutable build ID, pushed to Azure Container Registry. Trivy scans image for OS-level and application CVEs before storage.',       kpis:[{l:'Registry',v:'Azure ACR'},{l:'Image Scan',v:'Trivy'},{l:'Tagging',v:'Immutable ID'}] },
  { id:'dev',    icon:'🌱', label:'Deploy Dev',  badge:'Auto', tool:'AKS + Helm',            gate:'Smoke Test Gate',   purpose:'Helm chart deploys to AKS Dev namespace automatically. Azure App Configuration injects environment-specific settings. Smoke tests and API contract validation run.',   kpis:[{l:'Orchestrator',v:'AKS'},{l:'Deployment',v:'Helm Chart'},{l:'Config',v:'App Config + KV'}] },
  { id:'qa',     icon:'🧪', label:'QA Gate',     badge:'Gate', tool:'Azure Test Plans',       gate:'Quality Gate',      purpose:'Full regression suite executed. 80% minimum test coverage enforced as pipeline gate. Integration tests run against Azure API Management. Playwright E2E automation.', kpis:[{l:'Coverage',v:'≥ 80%'},{l:'Test Tool',v:'Azure Test Plans'},{l:'E2E',v:'Playwright'}] },
  { id:'perf',   icon:'⚡', label:'Load Test',   badge:'Gate', tool:'Azure Load Testing',    gate:'Performance Gate',  purpose:'Azure Load Testing (native managed service) runs against UAT. Must sustain 200 concurrent users with P95 response time under 2 seconds to pass gate.',               kpis:[{l:'Concurrent Users',v:'200'},{l:'P95 Target',v:'< 2 seconds'},{l:'Service',v:'Azure Load Testing'}] },
  { id:'uat',    icon:'👥', label:'UAT Approval',badge:'Human',tool:'Business Owner',         gate:'Human Approval',    purpose:'Business owner formal sign-off required via Azure Pipelines environment gate. Full audit trail captured in Azure DevOps. 48-hour SLA for sign-off.',                kpis:[{l:'Gate Type',v:'Human Approval'},{l:'Approver',v:'Business Owner'},{l:'Sign-Off SLA',v:'48 hours'}] },
  { id:'security',icon:'🛡️',label:'Security Gate',badge:'Sec', tool:'Defender for Cloud',    gate:'Security Posture',  purpose:'Pre-production Defender for Cloud posture scan. DAST via OWASP ZAP headless mode. Technical Lead and Security Officer sign-off required in Azure Pipelines.',        kpis:[{l:'DAST',v:'OWASP ZAP'},{l:'Posture',v:'Defender for Cloud'},{l:'Approvers',v:'Tech Lead + SecOff'}] },
  { id:'prod',   icon:'🚀', label:'Production',  badge:'CAB',  tool:'AKS Blue/Green',        gate:'CAB Approval',      purpose:'Steering Committee CAB approval via Azure Pipelines gate. Blue/Green deployment to AKS production with automated rollback triggered by Azure Monitor failure metrics.',kpis:[{l:'Strategy',v:'Blue/Green AKS'},{l:'Rollback',v:'Automated'},{l:'Approval',v:'Steering Committee'}] },
];
function renderPipelineDetail(id) {
  const s = PIPELINE_DATA.find(x => x.id === id);
  const d = document.getElementById('pipeline-detail-content');
  if (!s || !d) return;
  d.innerHTML = `
    <div style="display:flex;align-items:flex-start;gap:16px;margin-bottom:16px;">
      <div style="font-size:32px;line-height:1;flex-shrink:0;">${s.icon}</div>
      <div>
        <div style="font-size:17px;font-weight:700;color:var(--navy);margin-bottom:4px;">${s.label}</div>
        <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
          <span class="rub-type rt-technical" style="font-size:10px;">${s.tool}</span>
          <span class="rub-type rt-governance" style="font-size:10px;">${s.gate}</span>
          <span class="sb-${s.badge === 'Auto' ? 'auto' : s.badge === 'Gate' ? 'gate' : s.badge === 'Human' || s.badge === 'CAB' ? 'human' : 'sec'} stage-badge" style="font-size:9px;">${s.badge}</span>
        </div>
      </div>
    </div>
    <div style="font-size:13px;color:var(--text-secondary);line-height:1.7;margin-bottom:16px;">${s.purpose}</div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;">
      ${s.kpis.map(k => `
        <div style="background:var(--gray-50);border:1px solid var(--border);border-radius:6px;padding:10px 12px;">
          <div style="font-size:10px;font-weight:700;color:var(--text-muted);letter-spacing:0.08em;text-transform:uppercase;margin-bottom:3px;">${k.l}</div>
          <div style="font-size:14px;font-weight:700;color:var(--navy);">${k.v}</div>
        </div>`).join('')}
    </div>`;
}
function initPipeline() {
  const stages = document.querySelectorAll('.pipeline-stage');
  if (!stages.length) return;
  stages.forEach(s => s.addEventListener('click', () => {
    stages.forEach(x => x.classList.remove('active'));
    s.classList.add('active');
    renderPipelineDetail(s.dataset.stage);
  }));
  stages[0]?.click();
}
document.addEventListener('DOMContentLoaded', initPipeline);

// ═══════════════════════════════════════════════════════════════════════════
//  RUBRIC.JS — Interactive Review Status
// ═══════════════════════════════════════════════════════════════════════════
const STATUS_CYCLE = ['pending','review','changes','approved'];
const STATUS_CFG = {
  pending:  { label:'PENDING',      cls:'sp-pending',  dot:'var(--amber)' },
  review:   { label:'IN REVIEW',    cls:'sp-review',   dot:'var(--azure)' },
  changes:  { label:'CHANGES REQ.', cls:'sp-changes',  dot:'var(--red)' },
  approved: { label:'APPROVED',     cls:'sp-approved', dot:'var(--green)' },
};
const RUBRIC_ROWS = [
  { id:1,  section:'Project Scope & e-Services Overview',    team:'Project Manager',             type:'strategic',   target:'Session' },
  { id:2,  section:'Time-Saving Strategy Principles',        team:'App Integration Expert',      type:'strategic',   target:'Session' },
  { id:3,  section:'Traditional Delivery Challenges',        team:'App Integration Expert',      type:'strategic',   target:'Session' },
  { id:4,  section:'Azure CI/CD Pipeline Architecture',      team:'DevOps',                      type:'technical',   target:'Session' },
  { id:5,  section:'Six Key Registry Integrations',          team:'Integration Expert',          type:'technical',   target:'Session' },
  { id:6,  section:'Interoperability Platform Design',       team:'App Integration Expert',      type:'technical',   target:'Session' },
  { id:7,  section:'Cloud Architecture & Azure Services',    team:'Cloud Architect',             type:'arch',        target:'Session' },
  { id:8,  section:'DevSecOps & Security Controls',          team:'Cloud Architect',             type:'security',    target:'Session' },
  { id:9,  section:'Parallel Execution & Stream Model',      team:'App Integration Expert',      type:'delivery',    target:'Session' },
  { id:10, section:'Testing & QA Strategy',                  team:'Development Team',            type:'technical',   target:'Session' },
  { id:11, section:'KPI Framework & Success Metrics',        team:'Project Manager',             type:'performance', target:'Session' },
  { id:12, section:'Risk Register & Mitigations',            team:'Project Manager',             type:'risk',        target:'Session' },
];
const TYPE_LBL = { strategic:'Strategic Review', governance:'Governance Review', technical:'Technical Review', security:'Security Review', arch:'Architecture Review', delivery:'Delivery Review', risk:'Risk Review', performance:'Performance Review' };
function loadRS() { try { return JSON.parse(sessionStorage.getItem('dgtp_r') || '{}'); } catch { return {}; } }
function saveRS(s) { try { sessionStorage.setItem('dgtp_r', JSON.stringify(s)); } catch {} }
let RS = loadRS();
function cycleStatus(rowId) {
  const cur = RS[rowId] || 'pending';
  RS[rowId] = STATUS_CYCLE[(STATUS_CYCLE.indexOf(cur) + 1) % STATUS_CYCLE.length];
  saveRS(RS);
  updateBadge(rowId);
  updateSignOff(rowId);
  updateRubricSummary();
}
window.cycleStatus = cycleStatus;
function updateBadge(rowId) {
  const el = document.querySelector(`[data-rubric-id="${rowId}"]`);
  if (!el) return;
  const s = RS[rowId] || 'pending';
  const c = STATUS_CFG[s];
  el.className = `status-pill ${c.cls}`;
  el.innerHTML = `<span class="sp-dot" style="background:${c.dot};"></span>${c.label}`;
}
function updateSignOff(rowId) {
  const el = document.getElementById(`so-${rowId}`);
  if (!el) return;
  if ((RS[rowId] || 'pending') === 'approved') {
    const d = new Date();
    el.textContent = `✓ ${d.getDate()} ${d.toLocaleString('en',{month:'short'})}`;
    el.style.color = 'var(--green)'; el.style.fontWeight = '700'; el.style.fontStyle = 'normal';
  } else { el.textContent = '—'; el.style.color = ''; el.style.fontWeight = ''; el.style.fontStyle = ''; }
}
function updateRubricSummary() {
  const counts = { pending:0, review:0, changes:0, approved:0 };
  RUBRIC_ROWS.forEach(r => { counts[RS[`r${r.id}`] || 'pending']++; });
  ['pending','review','changes','approved'].forEach(k => {
    const el = document.getElementById(`rc-${k}`);
    if (el) el.textContent = counts[k];
  });
  const total = RUBRIC_ROWS.length;
  const pct = Math.round((counts.approved / total) * 100);
  const pctEl = document.getElementById('ring-pct');
  if (pctEl) pctEl.textContent = pct + '%';
  const ring = document.querySelector('#rubric-ring .ring-fill');
  if (ring) {
    const c = 2 * Math.PI * 48;
    ring.style.strokeDasharray = c;
    ring.style.strokeDashoffset = c - (pct / 100) * c;
  }
}
function renderRubricTable() {
  const tbody = document.getElementById('rub-tbody');
  if (!tbody) return;
  tbody.innerHTML = RUBRIC_ROWS.map(r => {
    const rid = `r${r.id}`;
    const s = RS[rid] || 'pending';
    const c = STATUS_CFG[s];
    return `<tr>
      <td style="width:34px;"><span class="rub-num">${r.id}</span></td>
      <td><div class="rub-name">${r.section}</div></td>
      <td style="width:180px;"><div class="rub-team">${r.team}</div></td>
      <td style="width:160px;"><span class="rub-type rt-${r.type}">${TYPE_LBL[r.type]}</span></td>
      <td style="width:145px;">
        <button class="status-pill ${c.cls}" data-rubric-id="${rid}" onclick="cycleStatus('${rid}')" data-tooltip="Click to cycle status">
          <span class="sp-dot" style="background:${c.dot};"></span>${c.label}
        </button>
      </td>
      <td style="width:90px;"><span class="sign-off-txt" id="so-${rid}">—</span></td>
    </tr>`;
  }).join('');
  RUBRIC_ROWS.forEach(r => updateSignOff(`r${r.id}`));
  updateRubricSummary();
  window.attachTooltips && window.attachTooltips(tbody);
}
window.approveAll = () => { RUBRIC_ROWS.forEach(r => { RS[`r${r.id}`] = 'approved'; }); saveRS(RS); renderRubricTable(); };
window.resetRubric = () => { RS = {}; saveRS(RS); renderRubricTable(); };
document.addEventListener('DOMContentLoaded', renderRubricTable);

// ═══════════════════════════════════════════════════════════════════════════
//  CHARTS.JS — Professional canvas charts (no dependencies)
// ═══════════════════════════════════════════════════════════════════════════
const CC = { azure:'#0078D4', navy:'#003087', cyan:'#005A9E', green:'#107C10', amber:'#C55A00', grid:'rgba(0,48,135,0.07)', text:'#7A8C9A' };
function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

function drawBar(cid, labels, values, color, dur=1400) {
  const canvas = document.getElementById(cid); if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  const pL=44,pB=28,pT=16,pR=16;
  const cW=W-pL-pR, cH=H-pT-pB;
  const maxV = Math.max(...values)*1.2;
  const gap = cW/values.length;
  const bw = gap*0.55;
  const t0 = performance.now();
  (function frame(now) {
    const prog = Math.min((now-t0)/dur,1), e=easeOut(prog);
    ctx.clearRect(0,0,W,H);
    // grid
    for(let i=0;i<=4;i++){
      const y=pT+(cH/4)*i;
      ctx.strokeStyle=CC.grid;ctx.lineWidth=1;
      ctx.beginPath();ctx.moveTo(pL,y);ctx.lineTo(W-pR,y);ctx.stroke();
      ctx.fillStyle=CC.text;ctx.font=`9px Arial`;ctx.textAlign='right';
      ctx.fillText(Math.round(maxV*(1-i/4)),pL-5,y+3);
    }
    values.forEach((v,i) => {
      const bh=(v/maxV)*cH*e, x=pL+gap*i+(gap-bw)/2, y=pT+cH-bh;
      const g=ctx.createLinearGradient(0,y,0,y+bh);
      g.addColorStop(0,color); g.addColorStop(1,color+'99');
      ctx.fillStyle=g;
      if(ctx.roundRect){ctx.beginPath();ctx.roundRect(x,y,bw,bh,[3,3,0,0]);ctx.fill();}
      else{ctx.fillRect(x,y,bw,bh);}
      if(prog>0.7){ctx.fillStyle='#1A2332';ctx.font=`bold 10px Arial`;ctx.textAlign='center';ctx.fillText(v,x+bw/2,y-5);}
      ctx.fillStyle=CC.text;ctx.font=`9px Arial`;ctx.textAlign='center';
      ctx.fillText(labels[i],x+bw/2,H-8);
    });
    if(prog<1) requestAnimationFrame(frame);
  })(t0);
}

function drawLine(cid, labels, datasets, dur=1600) {
  const canvas = document.getElementById(cid); if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W=canvas.width,H=canvas.height;
  const pL=44,pB=28,pT=16,pR=16;
  const cW=W-pL-pR,cH=H-pT-pB;
  const allV=datasets.flatMap(d=>d.v);
  const maxV=Math.max(...allV)*1.1;
  const xStep=cW/(labels.length-1);
  const yS=v=>pT+cH-((v/maxV)*cH);
  const t0=performance.now();
  (function frame(now) {
    const prog=Math.min((now-t0)/dur,1),e=easeOut(prog);
    ctx.clearRect(0,0,W,H);
    for(let i=0;i<=4;i++){
      const y=pT+(cH/4)*i;
      ctx.strokeStyle=CC.grid;ctx.lineWidth=1;
      ctx.beginPath();ctx.moveTo(pL,y);ctx.lineTo(W-pR,y);ctx.stroke();
      ctx.fillStyle=CC.text;ctx.font=`9px Arial`;ctx.textAlign='right';
      ctx.fillText(Math.round(maxV*(1-i/4))+'%',pL-5,y+3);
    }
    labels.forEach((l,i)=>{
      ctx.fillStyle=CC.text;ctx.font=`9px Arial`;ctx.textAlign='center';
      ctx.fillText(l,pL+xStep*i,H-8);
    });
    datasets.forEach(ds=>{
      const pts=ds.v.map((v,i)=>({x:pL+xStep*i,y:yS(v)}));
      const vc=Math.ceil(pts.length*e);
      ctx.beginPath();ctx.moveTo(pts[0].x,pT+cH);
      pts.slice(0,vc).forEach(p=>ctx.lineTo(p.x,p.y));
      ctx.lineTo(pts[Math.min(vc-1,pts.length-1)].x,pT+cH);ctx.closePath();
      const ag=ctx.createLinearGradient(0,pT,0,pT+cH);
      ag.addColorStop(0,ds.c+'25');ag.addColorStop(1,'transparent');
      ctx.fillStyle=ag;ctx.fill();
      ctx.beginPath();ctx.strokeStyle=ds.c;ctx.lineWidth=2;ctx.lineJoin='round';
      pts.slice(0,vc).forEach((p,i)=>i===0?ctx.moveTo(p.x,p.y):ctx.lineTo(p.x,p.y));
      ctx.stroke();
      if(prog>0.6){pts.slice(0,vc).forEach(p=>{ctx.beginPath();ctx.arc(p.x,p.y,3,0,Math.PI*2);ctx.fillStyle=ds.c;ctx.fill();ctx.strokeStyle='white';ctx.lineWidth=1.5;ctx.stroke();});}
    });
    if(prog<1) requestAnimationFrame(frame);
  })(t0);
}

function drawDonut(cid, data, dur=1200) {
  const canvas=document.getElementById(cid); if(!canvas) return;
  const ctx=canvas.getContext('2d');
  const cx=canvas.width/2,cy=canvas.height/2;
  const oR=Math.min(cx,cy)-10,iR=oR*0.58;
  const total=data.reduce((s,d)=>s+d.v,0);
  const t0=performance.now();
  (function frame(now){
    const prog=Math.min((now-t0)/dur,1),e=easeOut(prog);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    let angle=-Math.PI/2;
    data.forEach(seg=>{
      const sw=(seg.v/total)*Math.PI*2*e;
      ctx.beginPath();ctx.moveTo(cx,cy);ctx.arc(cx,cy,oR,angle,angle+sw);ctx.arc(cx,cy,iR,angle+sw,angle,true);ctx.closePath();
      ctx.fillStyle=seg.c;ctx.fill();angle+=sw;
    });
    if(prog>0.5){
      const pct=Math.round(e*(data[0].v/total)*100);
      ctx.fillStyle='#1A2332';ctx.font=`bold 20px Arial`;ctx.textAlign='center';ctx.textBaseline='middle';
      ctx.fillText(pct+'%',cx,cy-8);
      ctx.font=`9px Arial`;ctx.fillStyle=CC.text;ctx.fillText(data[0].label,cx,cy+10);
    }
    if(prog<1) requestAnimationFrame(frame);
  })(t0);
}

const chartObs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(!e.isIntersecting) return;
    const id=e.target.id;
    if(id==='c-deploy')  drawBar('c-deploy',['M1','M2','M3','M4','M5','M6','M7','M8'],[2,4,8,14,20,26,31,35],CC.azure);
    if(id==='c-velocity')drawBar('c-velocity',['S1','S2','S3','S4','S5','S6','S7','S8'],[18,22,24,28,32,30,35,38],CC.navy);
    if(id==='c-coverage')drawDonut('c-coverage',[{label:'Automated',v:82,c:CC.green},{label:'Manual',v:18,c:'#E8ECEF'}]);
    if(id==='c-progress')drawLine('c-progress',['M1','M2','M3','M4','M5','M6','M7','M8'],[{c:CC.azure,v:[5,18,35,52,65,78,88,100]},{c:CC.green,v:[0,5,15,28,40,58,72,90]}]);
    if(id==='c-defects') drawBar('c-defects',['Q1','Q2','Q3','Q4','Q5','Q6','Q7','Q8'],[8,6,4,3,2,2,1,1],CC.amber);
    chartObs.unobserve(e.target);
  });
},{threshold:0.3});
document.addEventListener('DOMContentLoaded',()=>{
  ['c-deploy','c-velocity','c-coverage','c-progress','c-defects'].forEach(id=>{
    const el=document.getElementById(id);
    if(el) chartObs.observe(el);
  });
});
