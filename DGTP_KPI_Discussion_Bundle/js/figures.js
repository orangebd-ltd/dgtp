'use strict';
/* ═══════════════════════════════════════════════════════════════════════
   FIGURES.JS — Three fully-built interactive SVG figures
   Figure 1: CI/CD Pipeline (10 clickable stages + envs + IaC strip)
   Figure 2: Azure Microservices Architecture (5 layers, 30+ nodes)
   Figure 3: Gantt Timeline (6 streams, milestone diamonds)
═══════════════════════════════════════════════════════════════════════ */

/* ── SHARED MODAL ─────────────────────────────────────────────────── */
let _mo = null;
function createModal() {
  if (_mo) return;
  _mo = document.createElement('div');
  _mo.className = 'detail-modal-overlay';
  _mo.innerHTML = `<div class="detail-modal" id="dm-modal">
    <div class="detail-modal-header">
      <div style="display:flex;align-items:center;gap:12px;flex:1;min-width:0;">
        <div class="detail-modal-icon" id="dm-icon"></div>
        <div style="min-width:0;"><div class="detail-modal-title" id="dm-title"></div><div class="detail-modal-sub" id="dm-sub"></div></div>
      </div>
      <div style="display:flex;align-items:center;gap:6px;flex-shrink:0;">
        <div class="modal-width-controls">
          <button class="modal-w-btn" onclick="setModalWidth('S')" title="Narrow">S</button>
          <button class="modal-w-btn active" onclick="setModalWidth('M')" title="Default" id="mw-M">M</button>
          <button class="modal-w-btn" onclick="setModalWidth('L')" title="Wide">L</button>
          <button class="modal-w-btn" onclick="setModalWidth('XL')" title="Extra Wide">XL</button>
        </div>
        <button class="detail-modal-close" onclick="closeModal()">✕</button>
      </div>
    </div>
    <div class="detail-modal-body" id="dm-body"></div>
  </div>`;
  document.body.appendChild(_mo);
  _mo.addEventListener('click', e => { if (e.target === _mo) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key==='Escape') closeModal(); });
}
function openModal(icon, title, sub, body) {
  createModal();
  document.getElementById('dm-icon').textContent = icon;
  document.getElementById('dm-title').textContent = title;
  document.getElementById('dm-sub').textContent = sub;
  document.getElementById('dm-body').innerHTML = body;
  _mo.style.display = 'flex';
  requestAnimationFrame(() => _mo.classList.add('visible'));
}
window.closeModal = function() {
  if (!_mo) return;
  _mo.classList.remove('visible');
  setTimeout(() => { if (_mo) _mo.style.display='none'; }, 220);
};

const MODAL_WIDTHS = { S:'480px', M:'728px', L:'960px', XL:'min(1200px,94vw)' };
window.setModalWidth = function(size) {
  // Target the .detail-modal inside the overlay
  const modal = _mo ? _mo.querySelector('.detail-modal') : null;
  if (!modal) return;
  modal.style.maxWidth = MODAL_WIDTHS[size] || MODAL_WIDTHS.M;
  modal.style.width    = '100%';
  // Update active state on all width buttons
  _mo.querySelectorAll('.modal-w-btn').forEach(btn => {
    btn.classList.toggle('active', btn.textContent.trim() === size);
  });
};
const mdesc = t => `<div class="detail-modal-desc">${t}</div>`;
const mkpi = items => `<div class="detail-kpi-grid">${items.map(k=>`<div class="detail-kpi"><div class="detail-kpi-label">${k.l}</div><div class="detail-kpi-value">${k.v}</div></div>`).join('')}</div>`;
const mtags = arr => `<div style="margin-top:10px;">${arr.map(t=>`<span class="detail-tag">${t}</span>`).join('')}</div>`;

/* ══════════════════════════════════════════════════════════════════════
   FIGURE 1 — CI/CD PIPELINE
══════════════════════════════════════════════════════════════════════ */
const STAGES = [
  {id:'s1',emoji:'💻',lbl:'Code\nCommit',tool:'Azure Repos',type:'auto',col:'#0078D4',
   title:'Code Commit & Branch Policy',sub:'Azure Repos — Git with Branch Policies',
   body:mdesc('Every code change committed to Azure Repos. Branch policies enforce mandatory peer review and linked work items before any merge is allowed to the main branch. All merges via Pull Requests only.')+mkpi([{l:'Min Reviewers',v:'2'},{l:'Work Item',v:'Required'},{l:'Branch Policy',v:'Enforced'}])+mtags(['Azure Repos','Git Branch Policies','PR Required','Linked Work Item','Commit Signing'])},
  {id:'s2',emoji:'🔍',lbl:'SAST\n& Scan',tool:'Defender DevOps',type:'sec',col:'#856404',
   title:'Static Analysis & Secret Scanning',sub:'Microsoft Defender for DevOps',
   body:mdesc('Every PR triggers SAST scanning, dependency vulnerability analysis (SCA), and secret detection. Pipeline blocks automatically on Critical or High severity findings. No human bypass permitted.')+mkpi([{l:'SAST',v:'Defender DevOps'},{l:'Secret Scan',v:'Every Commit'},{l:'SCA',v:'NuGet/npm/Maven'}])+mtags(['SAST','Secret Detection','SCA','CVE Scanning','Pre-Merge Gate','No Bypass'])},
  {id:'s3',emoji:'🔨',lbl:'Build\n& Package',tool:'Azure Pipelines',type:'auto',col:'#0078D4',
   title:'Build & Artefact Packaging',sub:'Azure Pipelines — Multi-Stage YAML',
   body:mdesc('YAML pipeline compiles code via Maven, Gradle, or npm depending on service. Artefacts versioned with immutable build IDs and stored in Azure Artefacts feed. Build cache reduces compilation time ~40%.')+mkpi([{l:'Build Time',v:'< 8 min'},{l:'Cache Saving',v:'~40%'},{l:'Artefact Store',v:'Azure Artefacts'}])+mtags(['Azure Pipelines YAML','Maven/npm/Gradle','Azure Artefacts','Build Cache','Immutable Versioning'])},
  {id:'s4',emoji:'📦',lbl:'Container\nBuild',tool:'Docker + ACR',type:'auto',col:'#0078D4',
   title:'Containerization & Image Scan',sub:'Docker → Azure Container Registry',
   body:mdesc('Docker image built, tagged with immutable build ID, pushed to Azure Container Registry. Trivy scans image for OS-level and application CVEs before storage. Failed scans block pipeline.')+mkpi([{l:'Registry',v:'Azure ACR'},{l:'Image Scan',v:'Trivy'},{l:'Tags',v:'Immutable Build ID'}])+mtags(['Docker','Azure Container Registry','Trivy CVE Scan','Immutable Tags','Private Endpoint ACR'])},
  {id:'s5',emoji:'🌱',lbl:'Deploy\nDev',tool:'AKS + Helm',type:'auto',col:'#107C10',
   title:'Deploy to Development Environment',sub:'Azure Kubernetes Service — Helm Chart',
   body:mdesc('Helm chart deploys to AKS Dev namespace automatically post-build. Azure App Configuration injects environment settings. Azure Key Vault secrets mounted as Kubernetes secrets. Smoke tests run immediately.')+mkpi([{l:'Orchestrator',v:'AKS'},{l:'Deployment',v:'Helm Chart'},{l:'Config',v:'App Config + KV'}])+mtags(['AKS','Helm Charts','Azure App Configuration','Key Vault Secrets','Smoke Tests','Auto Deploy'])},
  {id:'s6',emoji:'🧪',lbl:'Quality\nGate',tool:'Azure Test Plans',type:'gate',col:'#107C10',
   title:'Quality Gate — Full Regression Suite',sub:'Azure Test Plans + Playwright E2E',
   body:mdesc('Full regression suite against QA environment. 80% minimum code coverage enforced as hard pipeline gate. Integration tests run against Azure API Management. Playwright automates critical citizen journeys.')+mkpi([{l:'Coverage',v:'≥ 80%'},{l:'Test Tool',v:'Azure Test Plans'},{l:'E2E',v:'Playwright'}])+mtags(['Azure Test Plans','80% Coverage Gate','Playwright E2E','Postman Newman','Integration Tests','API Contract Validation'])},
  {id:'s7',emoji:'⚡',lbl:'Load\nTest',tool:'Azure Load Testing',type:'gate',col:'#107C10',
   title:'Performance Gate — Azure Load Testing',sub:'Managed Load Testing Service',
   body:mdesc('Azure Load Testing (fully managed, no infrastructure) runs against UAT. Pipeline gate enforces: 200 concurrent users sustained, P95 response time under 2 seconds. Auto-scales test infrastructure.')+mkpi([{l:'Concurrent Users',v:'200'},{l:'P95 Target',v:'< 2 seconds'},{l:'Service',v:'Azure Load Testing'}])+mtags(['Azure Load Testing','200 Concurrent Users','P95 < 2s','Performance Gate','Managed Service','Auto-Scale'])},
  {id:'s8',emoji:'👥',lbl:'UAT\nApproval',tool:'Business Owner',type:'human',col:'#C55A00',
   title:'UAT — Human Approval Gate',sub:'Business Owner Sign-Off via Azure Pipelines',
   body:mdesc('Business owner formally approves the release via Azure Pipelines environment gate. Full audit trail captured in Azure DevOps. 48-hour SLA for response. Gate expires if not actioned within SLA.')+mkpi([{l:'Gate Type',v:'Human Approval'},{l:'Approver',v:'Business Owner'},{l:'SLA',v:'48 hours'}])+mtags(['Human Approval','Azure Pipelines Gate','Audit Trail','48h SLA','Business Sign-Off','Environment Gate'])},
  {id:'s9',emoji:'🛡️',lbl:'Security\nGate',tool:'Defender + ZAP',type:'sec',col:'#856404',
   title:'Security Gate — Pre-Production',sub:'Defender for Cloud + OWASP ZAP DAST',
   body:mdesc('Pre-production Defender for Cloud posture scan and DAST via OWASP ZAP headless mode. Technical Lead AND Security Officer must both approve in Azure Pipelines before any production deployment.')+mkpi([{l:'DAST',v:'OWASP ZAP'},{l:'Posture',v:'Defender for Cloud'},{l:'Approvers',v:'2 Required'}])+mtags(['Defender for Cloud','OWASP ZAP DAST','Tech Lead Approval','Security Officer Sign-Off','Dual Approval Gate'])},
  {id:'s10',emoji:'🚀',lbl:'Production\nBlue/Green',tool:'AKS Blue/Green',type:'cab',col:'#003087',
   title:'Production — Blue/Green Deployment',sub:'CAB Approval → AKS Blue/Green via Helm',
   body:mdesc('Steering Committee Change Advisory Board approves via Azure Pipelines gate. Blue/Green deployment to AKS production. Azure Monitor triggers automated rollback if error rate or latency exceeds thresholds within 15 minutes.')+mkpi([{l:'Strategy',v:'Blue/Green'},{l:'Rollback',v:'Automated'},{l:'CAB',v:'Steering Comm.'}])+mtags(['CAB Approval','Blue/Green AKS','Azure Monitor','Automated Rollback','Zero-Downtime','Traffic Manager DR'])},
];

const BADGE = {auto:{lbl:'Automated',bg:'#E8F3FC',c:'#0078D4'},sec:{lbl:'Security Gate',bg:'#FFF3CD',c:'#856404'},gate:{lbl:'Quality Gate',bg:'#DFF6DD',c:'#107C10'},human:{lbl:'Human Approval',bg:'#FFF4CE',c:'#C55A00'},cab:{lbl:'CAB Approval',bg:'#E8ECF0',c:'#003087'}};

const ENV_DATA = {
  'env-dev':{icon:'🌱',title:'Development Environment',sub:'Auto-deploy on every build pass',body:mdesc('Deploys automatically on every successful build merge. Azure App Configuration + Key Vault inject environment settings. Smoke tests and API contract validation run immediately.')+mkpi([{l:'Trigger',v:'Auto on Merge'},{l:'Lifetime',v:'Always-On'},{l:'Cost Model',v:'Reserved Instances'}])+mtags(['AKS Dev Namespace','Helm Auto-Deploy','App Configuration','Key Vault','Smoke Tests'])},
  'env-qa':{icon:'🧪',title:'QA Environment',sub:'Quality Gate — Full Regression',body:mdesc('QA resets weekly via automated pipeline. 80% coverage enforced. Playwright E2E, Postman/Newman API tests, and integration tests against APIM mocks.')+mkpi([{l:'Coverage Gate',v:'≥ 80%'},{l:'Reset',v:'Weekly Auto'},{l:'Pricing',v:'Dev/Test Rates'}])+mtags(['Azure Test Plans','80% Gate','Playwright E2E','Postman Newman','Integration Tests'])},
  'env-uat':{icon:'👥',title:'UAT Environment',sub:'On-Demand — Business Owner Approval',body:mdesc('Provisioned on-demand via Bicep IaC with full production parity. Data anonymized from production copy. Torn down automatically after business owner sign-off.')+mkpi([{l:'Provisioning',v:'On-Demand IaC'},{l:'Parity',v:'Full Production'},{l:'Lifetime',v:'Sign-off → Teardown'}])+mtags(['On-Demand Bicep','Production Parity','Business Owner Portal','Azure Test Plans','Auto Teardown'])},
  'env-preprod':{icon:'🛡️',title:'Pre-Production Environment',sub:'Security Gate — 72-Hour Max Lifetime',body:mdesc('Production clone provisioned via Bicep. Data anonymized by Azure Data Factory. OWASP ZAP DAST executes here. 72-hour maximum lifetime with automated teardown via Azure Automation.')+mkpi([{l:'Lifetime',v:'72 hours max'},{l:'Data',v:'Anonymized via ADF'},{l:'DAST',v:'OWASP ZAP'}])+mtags(['72h Auto-Teardown','ADF Data Anonymize','OWASP ZAP','Defender Scan','2× Sign-Off Required'])},
  'env-prod':{icon:'🚀',title:'Production Environment',sub:'Blue/Green AKS — Zero-Downtime',body:mdesc('Blue/Green deployment on AKS. Azure Monitor triggers automated rollback if error rate or P99 latency exceeds thresholds within 15 minutes. Multi-zone HA with Azure Traffic Manager DR.')+mkpi([{l:'Strategy',v:'Blue/Green'},{l:'Rollback',v:'Automated'},{l:'Uptime SLA',v:'99.9%'}])+mtags(['Blue/Green AKS','Azure Monitor Rollback','Multi-Zone HA','Azure Front Door','Traffic Manager DR'])},
};

const STRIP_DATA = {
  'IaC':{icon:'🏗️',title:'Infrastructure as Code',sub:'Azure Bicep + Terraform with Azure Backend',body:mdesc('All Azure resources provisioned programmatically — no manual portal provisioning permitted. Azure Bicep for native resources; Terraform for complex modules. State in Azure Blob Storage. Azure Policy blocks non-compliant deployments.')+mkpi([{l:'Bicep',v:'Native Azure'},{l:'Terraform',v:'Complex Modules'},{l:'State',v:'Azure Blob Storage'}])+mtags(['Azure Bicep','Terraform','Azure Policy Compliance','No Manual Provisioning','PR-gated IaC'])},
  'ACR':{icon:'📦',title:'Azure Container Registry',sub:'Immutable Image Storage with Geo-Replication',body:mdesc('All Docker images in Azure Container Registry with immutable build-ID tags. Trivy scans every pushed image. Geo-replication ensures low-latency pulls across all AKS regions. Private endpoint — no public access.')+mkpi([{l:'Tags',v:'Immutable Build ID'},{l:'Scan',v:'Trivy on Push'},{l:'Access',v:'Private Endpoint Only'}])+mtags(['Azure Container Registry','Immutable Tags','Trivy CVE Scan','Geo-Replication','Private Endpoints'])},
  'Observability':{icon:'📊',title:'Full-Stack Azure Observability',sub:'Azure Monitor + App Insights + Log Analytics',body:mdesc('Complete telemetry from citizen click to database query. Application Insights for distributed APM tracing. Log Analytics for centralized logs with 2-year immutable retention. Power BI for leadership dashboards.')+mkpi([{l:'APM',v:'App Insights'},{l:'Logs',v:'Log Analytics'},{l:'Retention',v:'2 Years Immutable'}])+mtags(['Azure Monitor','Application Insights','Log Analytics','Power BI Dashboards','KQL Queries','Availability Tests'])},
  'Security Posture':{icon:'🛡️',title:'Microsoft Defender for Cloud',sub:'Continuous Security Posture Management',body:mdesc('Unified Secure Score across all DGTP subscriptions. Regulatory compliance dashboard tracks Sint Maarten data sovereignty requirements. Recommendations prioritized by risk impact. Integrated with Microsoft Sentinel SIEM.')+mkpi([{l:'Secure Score',v:'Continuous'},{l:'CSPM',v:'Defender CSPM'},{l:'SIEM',v:'Sentinel Integrated'}])+mtags(['Defender for Cloud','Secure Score','CSPM','Azure Policy','Regulatory Compliance','Sentinel SIEM'])},
};

function buildFig1(cid) {
  const wrap = document.getElementById(cid); if (!wrap) return;
  const W=1180, H=530, n=STAGES.length;
  const sW=90, sGap=26, totalW=n*sW+(n-1)*sGap;
  const sx=(W-totalW)/2, sY=68, lineY=sY+sW/2;

  let svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" font-family="Arial,Helvetica,sans-serif">
<defs>
  <marker id="ar1" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#0078D4"/></marker>
  <filter id="f1"><feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.12"/></filter>
</defs>
<rect width="${W}" height="${H}" fill="#F8FAFB" rx="12"/>
<text x="${W/2}" y="24" text-anchor="middle" font-size="14" font-weight="700" fill="#003087">DGTP — Azure CI/CD Multi-Stage Pipeline Architecture</text>
<text x="${W/2}" y="42" text-anchor="middle" font-size="11" fill="#7A8C9A" font-style="italic">Click any stage, environment, or layer card for detailed information</text>
<line x1="${sx+sW/2}" y1="${lineY}" x2="${sx+totalW-sW/2}" y2="${lineY}" stroke="#D0D7DE" stroke-width="2"/>`;

  // Arrows between stages
  STAGES.forEach((_,i)=>{
    if(i<n-1){
      const x1=sx+i*(sW+sGap)+sW, x2=sx+(i+1)*(sW+sGap);
      svg+=`<line x1="${x1+1}" y1="${lineY}" x2="${x2-1}" y2="${lineY}" stroke="#0078D4" stroke-width="1.5" marker-end="url(#ar1)"/>`;
    }
  });

  // Stage circles
  STAGES.forEach((s,i)=>{
    const x=sx+i*(sW+sGap), cx=x+sW/2;
    const b=BADGE[s.type], lines=s.lbl.split('\n');
    svg+=`<g style="cursor:pointer" onclick="openStageDet('${s.id}')" filter="url(#f1)">
  <rect x="${x+4}" y="${sY-22}" width="${sW-8}" height="16" rx="8" fill="${b.bg}"/>
  <text x="${cx}" y="${sY-10}" text-anchor="middle" font-size="8" font-weight="700" fill="${b.c}">${b.lbl.toUpperCase()}</text>
  <circle cx="${cx}" cy="${lineY}" r="${sW/2-5}" fill="white" stroke="${s.col}" stroke-width="2"/>
  <text x="${cx}" y="${lineY+8}" text-anchor="middle" font-size="22">${s.emoji}</text>
  ${lines.map((l,li)=>`<text x="${cx}" y="${sY+sW+12+li*14}" text-anchor="middle" font-size="10" font-weight="700" fill="#1A2332">${l}</text>`).join('')}
  <text x="${cx}" y="${sY+sW+42}" text-anchor="middle" font-size="9" fill="#7A8C9A">${s.tool}</text>
</g>`;
  });

  // Environment row
  const eY=310, eH=68, eColors=['#E8F3FC','#DFF6DD','#FFF4CE','#FFF3CD','#E8ECF0'];
  const eBd=['#0078D4','#107C10','#C55A00','#856404','#003087'];
  const eIds=['env-dev','env-qa','env-uat','env-preprod','env-prod'];
  const eLabels=['DEV\nAuto-Deploy','QA\nQuality Gate','UAT\nBiz Approval','PRE-PROD\nSecurity Gate','PRODUCTION\nCAB + Blue/Green'];
  const eSubLabels=['AKS + Helm + App Config','Azure Test Plans + Playwright','Business Owner Sign-Off','Defender + OWASP ZAP','Blue/Green + Auto Rollback'];
  const eW=(W-80)/5;
  svg+=`<text x="${W/2}" y="${eY-12}" text-anchor="middle" font-size="11" font-weight="700" fill="#7A8C9A" letter-spacing="0.08em">DEPLOYMENT ENVIRONMENTS — AUTOMATED PROMOTION →</text>`;
  for(let i=0;i<4;i++){
    const ex1=40+i*eW+eW-4;
    svg+=`<line x1="${ex1}" y1="${eY+eH/2}" x2="${ex1+14}" y2="${eY+eH/2}" stroke="#0078D4" stroke-width="1.5" marker-end="url(#ar1)"/>`;
  }
  for(let i=0;i<5;i++){
    const ex=40+i*eW, ecx=ex+(eW-16)/2;
    const eLines=eLabels[i].split('\n');
    svg+=`<g style="cursor:pointer" onclick="openEnvDet('${eIds[i]}')" filter="url(#f1)">
  <rect x="${ex}" y="${eY}" width="${eW-16}" height="${eH}" rx="8" fill="${eColors[i]}" stroke="${eBd[i]}" stroke-width="1.5"/>
  <text x="${ecx}" y="${eY+19}" text-anchor="middle" font-size="11" font-weight="700" fill="${eBd[i]}">${eLines[0]}</text>
  <text x="${ecx}" y="${eY+33}" text-anchor="middle" font-size="10" font-weight="700" fill="${eBd[i]}">${eLines[1]}</text>
  <text x="${ecx}" y="${eY+47}" text-anchor="middle" font-size="9" fill="#5A6B7A">${eSubLabels[i]}</text>
  <text x="${ecx}" y="${eY+61}" text-anchor="middle" font-size="9" fill="${eBd[i]}" font-style="italic">▼ click for details</text>
</g>`;
  }

  // Bottom strip
  const bY=408;
  const bItems=[
    {x:20, w:274, bg:'#F3EFF9',bd:'#6B4FA8',t1:'Infrastructure as Code',t2:'Azure Bicep + Terraform',t3:'State: Azure Blob · Secrets: Key Vault',id:'IaC'},
    {x:306, w:274, bg:'#E8F3FC',bd:'#0078D4',t1:'ACR',t2:'Azure Container Registry',t3:'Immutable tags · Geo-replication · Trivy',id:'ACR'},
    {x:592, w:274, bg:'#DFF6DD',bd:'#107C10',t1:'Observability',t2:'Azure Monitor + App Insights',t3:'Metrics · Logs · Traces · Alerts · Power BI',id:'Observability'},
    {x:878, w:274, bg:'#FFF3CD',bd:'#856404',t1:'Security Posture',t2:'Microsoft Defender for Cloud',t3:'Secure Score · Compliance · Sentinel SIEM',id:'Security Posture'},
  ];
  bItems.forEach(it=>{
    svg+=`<g style="cursor:pointer" onclick="openStripDet('${it.id}')" filter="url(#f1)">
  <rect x="${it.x}" y="${bY}" width="${it.w}" height="62" rx="6" fill="${it.bg}" stroke="${it.bd}" stroke-width="1.5"/>
  <text x="${it.x+it.w/2}" y="${bY+18}" text-anchor="middle" font-size="10" font-weight="700" fill="${it.bd}">${it.t1}</text>
  <text x="${it.x+it.w/2}" y="${bY+34}" text-anchor="middle" font-size="10" fill="#1A2332">${it.t2}</text>
  <text x="${it.x+it.w/2}" y="${bY+50}" text-anchor="middle" font-size="9" fill="#7A8C9A">${it.t3}</text>
</g>`;
  });

  svg+=`</svg>`;
  wrap.innerHTML=`<div class="interactive-fig">
  <div class="fig-header"><div class="fig-header-title">Figure 1 — Azure CI/CD Multi-Stage Pipeline Architecture</div><div class="fig-hint">🖱 Click any stage, environment, or layer for full details</div></div>
  <div class="fig-svg-wrap">${svg}</div>
  <div style="padding:10px 16px;font-size:11px;color:var(--text-muted);font-style:italic;border-top:1px solid var(--border);background:white;">10-stage pipeline from code commit to Blue/Green production. All stages defined in Azure Pipelines YAML. Orange = Human approval required. Green = Quality/security gate.</div>
</div>`;
}

window.openStageDet = s => { const d=STAGES.find(x=>x.id===s); if(d) openModal(d.emoji,d.title,d.sub,d.body); };
window.openEnvDet   = id => { const d=ENV_DATA[id]; if(d) openModal(d.icon,d.title,d.sub,d.body); };
window.openStripDet = id => { const d=STRIP_DATA[id]; if(d) openModal(d.icon,d.title,d.sub,d.body); };

/* ══════════════════════════════════════════════════════════════════════
   FIGURE 2 — AZURE MICROSERVICES ARCHITECTURE
══════════════════════════════════════════════════════════════════════ */
const LAYERS=[
  {lbl:'CITIZEN & AGENCY ACCESS LAYER',col:'#0078D4',bg:'#E8F3FC',y:60,h:66,nodes:[
    {x:20,w:170,lbl:'🌐 Citizen Browser',sub:'Web / PWA / React',id:'nb1',det:'Responsive web app served via Azure Static Web Apps. PWA for offline capability. Azure Front Door routes to nearest CDN edge globally. Traffic Manager provides multi-region failover.'},
    {x:206,w:170,lbl:'📱 Mobile App',sub:'React Native iOS/Android',id:'nb2',det:'Cross-platform mobile application via React Native. Connects to Azure API Management using same OAuth2/OIDC endpoints. Azure Communication Services for push notifications.'},
    {x:392,w:170,lbl:'🏛️ Admin Portal',sub:'Government Staff · Entra ID',id:'nb3',det:'Internal government staff portal for case management and workflow approval. Protected by Microsoft Entra ID with Conditional Access Policies. MFA enforced for all government staff.'},
    {x:578,w:170,lbl:'🔗 Agency APIs',sub:'B2G / G2G Machine-to-Machine',id:'nb4',det:'Machine-to-machine integration for other Sint Maarten agencies. OIDC Client Credentials flow via Azure API Management. Mutual TLS certificate-based authentication.'},
    {x:764,w:170,lbl:'🤝 Partner Systems',sub:'International Integrations',id:'nb5',det:'International partner integrations for cross-border government services. Certificate-based mTLS authentication. Separate APIM product with partner-specific rate limiting and policies.'},
  ]},
  {lbl:'AZURE EDGE & SECURITY LAYER',col:'#003087',bg:'#E8ECF4',y:144,h:66,nodes:[
    {x:20,w:216,lbl:'🚪 Azure Front Door',sub:'CDN + WAF + TLS 1.3',id:'nc1',det:'Global anycast CDN delivering sub-50ms latency worldwide. WAF enforces OWASP Top 10 at the edge before traffic reaches origin. TLS 1.3 minimum enforced by Azure Policy deny effect.'},
    {x:252,w:216,lbl:'🛡️ Azure DDoS Protection',sub:'Standard Plan — Always-On',id:'nc2',det:'DDoS Protection Standard provides always-on mitigation for all Sint Maarten public endpoints. SLA-backed mitigation during volumetric and protocol attacks. Real-time telemetry and alerts.'},
    {x:484,w:216,lbl:'🔑 Entra External ID',sub:'Citizen SSO · OIDC · MFA',id:'nc3',det:'Microsoft Entra External ID (formerly Azure AD B2C) provides OIDC/OAuth2 citizen identity. Social login optional. TOTP and SMS MFA enforced. Self-service password reset. No custom identity code required.'},
    {x:716,w:218,lbl:'📡 Azure CDN',sub:'Static Assets · 120+ Global PoPs',id:'nc4',det:'Azure CDN serves all static assets (React bundles, images, fonts) from 120+ global PoPs. Cache rules defined by content type and TTL headers. Integrated with Azure Front Door for optimal routing.'},
  ]},
  {lbl:'AZURE API MANAGEMENT GATEWAY — Centralized Policy Enforcement',col:'#005A9E',bg:'#EEF4FC',y:228,h:66,nodes:[
    {x:20,w:178,lbl:'⚡ Rate Limiting',sub:'Per-client throttling',id:'nd1',det:'APIM rate limiting policies enforce per-subscription and per-IP request limits. Returns 429 with Retry-After headers. Different limits for citizen, agency, and partner consumer groups.'},
    {x:214,w:178,lbl:'🔑 JWT Validation',sub:'Entra ID — Every Request',id:'nd2',det:'APIM validates JWT Bearer tokens issued by Entra ID on every API call. No authentication logic in microservices — enforced at gateway. Token caching for performance.'},
    {x:408,w:178,lbl:'📋 API Versioning',sub:'Version Sets + Mock Responses',id:'nd3',det:'API versions managed via APIM version sets. Mock Response policies return realistic payloads from day one — enabling parallel frontend/backend development from Sprint 2.'},
    {x:602,w:178,lbl:'🔍 Distributed Tracing',sub:'App Insights Correlation',id:'nd4',det:'Every APIM request emits a correlation ID to Azure Application Insights. Full distributed trace from citizen click through all downstream microservices visible in a single query.'},
    {x:796,w:138,lbl:'📖 Dev Portal',sub:'OpenAPI 3.0 Auto-Gen',id:'nd5',det:'Azure API Management Developer Portal auto-generates interactive documentation from OpenAPI 3.0 specs. Self-service API key management for internal and external API consumers.'},
  ]},
  {lbl:'AKS MICROSERVICES CLUSTER — Multi-Zone High Availability',col:'#0078D4',bg:'#F0F8FF',y:312,h:130,nodes:[
    {x:20,w:148,lbl:'👤 Citizen Service',sub:'.NET 8 · CQRS',id:'ne1',det:'Core citizen profile, registration, and case management. .NET 8 with CQRS pattern. Read replicas served from Azure Cache for Redis. Horizontal pod autoscaling on AKS.'},
    {x:184,w:148,lbl:'📄 Document Service',sub:'Azure Form Recognizer',id:'ne2',det:'Government document processing using Azure Document Intelligence. OCR, field extraction, and classification automated. Supports PDF, Word, and image formats.'},
    {x:348,w:148,lbl:'💳 Payment Service',sub:'PCI DSS Compliant',id:'ne3',det:'Citizen fee payment processing. PCI DSS compliant architecture with tokenization. Isolated AKS namespace with stricter NetworkPolicy rules. Dedicated Key Vault for payment secrets.'},
    {x:512,w:148,lbl:'📧 Notification',sub:'Azure Comm. Services',id:'ne4',det:'Azure Communication Services delivers Email, SMS, and WhatsApp notifications. Single shared notification service consumed by all government modules via Service Bus topics.'},
    {x:676,w:148,lbl:'🔄 Workflow',sub:'Azure Logic Apps',id:'ne5',det:'Cross-agency workflow orchestration via Azure Logic Apps. Multi-step approval workflows, SLA escalation timers, and integration with external agency systems.'},
    {x:840,w:148,lbl:'🔍 Search',sub:'Azure AI Search',id:'ne6',det:'Azure AI Search provides full-text search across all government services and documents. AI-enhanced relevance ranking. Cognitive Skills pipeline for metadata extraction.'},
    // Row 2
    {x:20,w:148,lbl:'🔐 Auth Service',sub:'Managed Identity',id:'ne7',row2:true,det:'Service-to-service authentication via Azure Managed Identities. No stored credentials in any service. Secrets fetched from Azure Key Vault via RBAC-controlled managed identity access.'},
    {x:184,w:148,lbl:'📊 Analytics',sub:'App Insights KPIs',id:'ne8',row2:true,det:'Custom business KPIs emitted as telemetry to Azure Application Insights. Power BI workspace for programme leadership dashboards. Citizen satisfaction and service usage metrics.'},
    {x:348,w:148,lbl:'🚌 Service Bus',sub:'Async Messaging',id:'ne9',row2:true,det:'Azure Service Bus provides reliable async messaging between microservices. Topics and subscriptions for event-driven architecture. Dead-letter queues for failed message handling.'},
    {x:512,w:148,lbl:'⚡ Event Grid',sub:'Domain Events',id:'ne10',row2:true,det:'Azure Event Grid routes domain events (CitizenRegistered, PaymentCompleted, DocumentApproved) to subscriber microservices. Retry with exponential backoff and dead-lettering.'},
    {x:676,w:148,lbl:'⚙️ Redis Cache',sub:'Session · API Cache',id:'ne11',row2:true,det:'Azure Cache for Redis caches API responses, manages citizen session state, and provides distributed locks for payment processing concurrency control.'},
    {x:840,w:148,lbl:'🤖 AI Services',sub:'Cognitive + Language',id:'ne12',row2:true,det:'Azure AI Services (OCR, language detection, translation, classification) consumed by Document Service. Azure OpenAI for internal programme assistant (data stays within DGTP Azure boundary).'},
  ]},
  {lbl:'AZURE DATA LAYER — Sovereign Storage (Region-Locked by Azure Policy)',col:'#6B4FA8',bg:'#F5F2FC',y:476,h:66,nodes:[
    {x:20,w:184,lbl:'🗃️ SQL Managed Instance',sub:'Relational · HA · Always Encrypted',id:'nf1',det:'Azure SQL Managed Instance for structured relational citizen data. Always-On Availability Groups. Automated geo-redundant backups. Always Encrypted for sensitive PII columns.'},
    {x:220,w:184,lbl:'🌍 Cosmos DB',sub:'Multi-Region Write',id:'nf2',det:'Azure Cosmos DB with multi-region write for document store. Citizen portal session state and case workflow data. Region lock enforced via Azure Policy to maintain Sint Maarten data sovereignty.'},
    {x:420,w:184,lbl:'📁 Blob Storage',sub:'CMK · Private Endpoint',id:'nf3',det:'All government documents in Azure Blob Storage with Customer-Managed Keys in Key Vault HSM. Private endpoints prevent any public internet exposure. Lifecycle management for archival.'},
    {x:620,w:184,lbl:'🔄 Data Factory',sub:'ETL · Legacy Migration',id:'nf4',det:'Azure Data Factory orchestrates all ETL for legacy data migration and ongoing sync with existing government systems. Self-hosted integration runtime for on-premises connectivity.'},
    {x:820,w:168,lbl:'🔎 Azure Purview',sub:'Data Governance Catalogue',id:'nf5',det:'Microsoft Purview provides unified data governance: automated data discovery, lineage tracking, sensitivity labeling, and classification for all DGTP citizen data assets.'},
  ]},
];

const SEC_PANELS=[
  {y:60,h:76,lbl:'Defender for Cloud',sub:'Posture · Secure Score',bg:'#DFF6DD',bd:'#107C10',icon:'🛡️',id:'sp1',det:'Continuous security posture management. Secure Score drives prioritized remediation. Regulatory compliance dashboard for Sint Maarten data sovereignty. Defender CWPP for workload protection.',kpis:[{l:'Secure Score',v:'Continuous'},{l:'CSPM',v:'Defender CSPM'},{l:'Compliance',v:'Policy Dashboard'}]},
  {y:144,h:76,lbl:'Microsoft Sentinel',sub:'SIEM/SOAR · AI Detection',bg:'#FFF3CD',bd:'#856404',icon:'🕵️',id:'sp2',det:'Cloud-native SIEM/SOAR with AI-driven threat detection. Automated incident response playbooks reduce MTTR 80%. Ingests all Azure activity, diagnostic, and application telemetry.',kpis:[{l:'Detection',v:'AI-Driven'},{l:'MTTR Reduction',v:'80%'},{l:'Playbooks',v:'Automated SOAR'}]},
  {y:228,h:76,lbl:'Azure Key Vault HSM',sub:'Secrets · Keys · Certs',bg:'#FFF4CE',bd:'#C55A00',icon:'🔑',id:'sp3',det:'FIPS 140-2 Level 3 HSM-backed key management. All secrets, certificates, and CMKs stored exclusively in Key Vault. Automated rotation policies. Managed Identity access — no stored credentials in code.',kpis:[{l:'HSM Level',v:'FIPS 140-2 L3'},{l:'Access',v:'RBAC + PIM'},{l:'Rotation',v:'Automated'}]},
  {y:312,h:76,lbl:'Azure Policy',sub:'Compliance · Deny Effects',bg:'#E8F3FC',bd:'#0078D4',icon:'📋',id:'sp4',det:'Azure Policy enforces compliance at subscription level. Deny effects prevent non-compliant resources from being deployed. Data residency enforced by denying deployment outside approved regions.',kpis:[{l:'Effect',v:'Deny + Audit'},{l:'Scope',v:'Subscription'},{l:'Data Residency',v:'Region-Locked'}]},
  {y:396,h:76,lbl:'Azure Private Link',sub:'Zero Public Exposure',bg:'#F3EFF9',bd:'#6B4FA8',icon:'🔒',id:'sp5',det:'All Azure PaaS services (SQL MI, Cosmos DB, Key Vault, Storage, ACR) accessible only via Private Endpoints within the DGTP VNet. No public internet exposure for any data service.',kpis:[{l:'Public Exposure',v:'None'},{l:'Private Endpoints',v:'All PaaS'},{l:'NSG Flow Logs',v:'Enabled'}]},
  {y:480,h:66,lbl:'Azure Monitor',sub:'Full-Stack Telemetry',bg:'#DFF6DD',bd:'#107C10',icon:'📊',id:'sp6',det:'Complete telemetry from citizen browser to database. Application Insights APM, Log Analytics centralized logs, Azure Monitor Metrics for infrastructure. 2-year immutable retention.',kpis:[{l:'APM',v:'App Insights'},{l:'Logs',v:'Log Analytics'},{l:'Retention',v:'2 Years'}]},
];

function buildFig2(cid) {
  const wrap=document.getElementById(cid); if(!wrap) return;
  const W=1200,H=600,mW=1048,sX=1064;

  let svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" font-family="Arial,Helvetica,sans-serif">
<defs><filter id="f2"><feDropShadow dx="0" dy="1" stdDeviation="2" flood-opacity="0.10"/></filter>
<marker id="ar2" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#0078D4"/></marker></defs>
<rect width="${W}" height="${H}" fill="#F8FAFB" rx="12"/>
<text x="${mW/2}" y="24" text-anchor="middle" font-size="14" font-weight="700" fill="#003087">DGTP — Azure Microservices Architecture &amp; Integration Layer</text>
<text x="${mW/2}" y="42" text-anchor="middle" font-size="11" fill="#7A8C9A" font-style="italic">Click any component to view service details · All services within approved Azure regions</text>
<rect x="${sX-8}" y="52" width="${W-sX+8}" height="510" rx="8" fill="none" stroke="#C8D8E8" stroke-width="1" stroke-dasharray="5,3"/>
<text x="${sX+(W-sX)/2}" y="68" text-anchor="middle" font-size="9" font-weight="700" fill="#7A8C9A" letter-spacing="0.06em">SECURITY &amp; OPS PANEL</text>`;

  // Layer backgrounds + labels + nodes
  LAYERS.forEach(layer=>{
    const hasR2=layer.nodes.some(n=>n.row2);
    const lh=hasR2?layer.h+68:layer.h;
    svg+=`<rect x="6" y="${layer.y}" width="${mW-12}" height="${lh}" rx="8" fill="${layer.bg}" stroke="${layer.col}" stroke-width="1.5"/>
<text x="16" y="${layer.y+16}" font-size="9" font-weight="700" fill="${layer.col}" letter-spacing="0.05em">${layer.lbl}</text>`;

    layer.nodes.forEach(nd=>{
      const ny=nd.row2?layer.y+layer.h-2:layer.y+22;
      const nh=42;
      svg+=`<g style="cursor:pointer" onclick="openN2('${nd.id}')" filter="url(#f2)">
  <rect x="${nd.x}" y="${ny}" width="${nd.w}" height="${nh}" rx="6" fill="white" stroke="${layer.col}" stroke-width="1.2"/>
  <text x="${nd.x+nd.w/2}" y="${ny+14}" text-anchor="middle" font-size="10" font-weight="700" fill="#1A2332">${nd.lbl}</text>
  <text x="${nd.x+nd.w/2}" y="${ny+27}" text-anchor="middle" font-size="9" fill="#7A8C9A">${nd.sub}</text>
  <text x="${nd.x+nd.w/2}" y="${ny+39}" text-anchor="middle" font-size="8" fill="${layer.col}">▼ click</text>
</g>`;
    });
  });

  // Layer arrows
  [[60+66+2,144],[144+66+2,228],[228+66+2,312],[312+130+2,476]].forEach(([y1,y2])=>{
    svg+=`<line x1="520" y1="${y1}" x2="520" y2="${y2-2}" stroke="#0078D4" stroke-width="1.5" stroke-dasharray="4,2" marker-end="url(#ar2)"/>`;
  });

  // Security panel
  SEC_PANELS.forEach(sp=>{
    svg+=`<g style="cursor:pointer" onclick="openSP('${sp.id}')" filter="url(#f2)">
  <rect x="${sX}" y="${sp.y}" width="${W-sX-8}" height="${sp.h}" rx="6" fill="${sp.bg}" stroke="${sp.bd}" stroke-width="1.5"/>
  <text x="${sX+(W-sX-8)/2}" y="${sp.y+18}" text-anchor="middle" font-size="13">${sp.icon}</text>
  <text x="${sX+(W-sX-8)/2}" y="${sp.y+33}" text-anchor="middle" font-size="9" font-weight="700" fill="${sp.bd}">${sp.lbl}</text>
  <text x="${sX+(W-sX-8)/2}" y="${sp.y+47}" text-anchor="middle" font-size="8" fill="#5A6B7A">${sp.sub}</text>
  <text x="${sX+(W-sX-8)/2}" y="${sp.y+60}" text-anchor="middle" font-size="8" fill="${sp.bd}">▼ details</text>
</g>`;
  });

  svg+=`</svg>`;

  // Store lookup
  window._n2={};
  LAYERS.forEach(l=>l.nodes.forEach(n=>{ window._n2[n.id]={lbl:n.lbl,det:n.det,col:l.col}; }));

  wrap.innerHTML=`<div class="interactive-fig">
<div class="fig-header"><div class="fig-header-title">Figure 2 — DGTP Azure Microservices Architecture &amp; Integration Layer</div><div class="fig-hint">🖱 Click any service box or security panel card for full details</div></div>
<div class="fig-svg-wrap">${svg}</div>
<div style="padding:10px 16px;font-size:11px;color:var(--text-muted);font-style:italic;border-top:1px solid var(--border);background:white;">Five-layer architecture: Citizen Access → Edge → API Management → AKS Microservices → Sovereign Data. Security &amp; Operations panel right side. All within approved Azure regions — sovereign data residency enforced.</div>
</div>`;
}

window.openN2=id=>{ const d=window._n2&&window._n2[id]; if(d) openModal('⚙️',d.lbl.replace(/^.+\s/,''),`Azure Service — Click to explore`,mdesc(d.det)+mtags([d.lbl.replace(/^[^ ]+ /,'')])); };
window.openSP=id=>{ const d=SEC_PANELS.find(x=>x.id===id); if(d) openModal(d.icon,d.lbl,'Azure Security &amp; Operations Layer',mdesc(d.det)+mkpi(d.kpis)+mtags([d.lbl])); };

/* ══════════════════════════════════════════════════════════════════════
   FIGURE 3 — GANTT TIMELINE
══════════════════════════════════════════════════════════════════════ */

/* ── TABS ─────────────────────────────────────────────────────────── */
function initFigTabs() {
  document.querySelectorAll('.fig-tab').forEach(tab=>{
    tab.addEventListener('click',()=>{
      document.querySelectorAll('.fig-tab').forEach(t=>t.classList.remove('active'));
      document.querySelectorAll('.fig-panel').forEach(p=>p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById('fp-'+tab.dataset.fig)?.classList.add('active');
    });
  });
  document.querySelector('.fig-tab')?.click();
}

document.addEventListener('DOMContentLoaded',()=>{
  initFigTabs();
  setTimeout(()=>{
    buildFig1('fig1-container');
    buildFig2('fig2-container');
    window.attachTooltips&&window.attachTooltips();
  },150);
});
