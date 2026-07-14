'use strict';
/* ═══════════════════════════════════════════════════════════════════════
   KPI.JS — Measures of Success
   Main flow: 5 circular metric nodes
   Each click opens a dedicated animated flowchart (same pattern as Principles)
   Every flow node has a plain-English hover tooltip
═══════════════════════════════════════════════════════════════════════ */

/* ── SUCCESS METRICS + their individual flowcharts ──────────────────── */
const SUCCESS_METRICS = [
  {
    id:'deploy', icon:'🚀', label:'Deploy\nFrequency', value:'Daily',
    color:'#1A6FBE', colorPale:'#E8F2FC',
    tip:`How often new improvements reach the live portal. In DGTP, at least one validated change is delivered to citizens every single day — automatically, with no manual release process.`,
    title:'Deployment Frequency — Daily Releases',
    sub:'Every day, the pipeline delivers at least one validated change to citizens',
    flow:{
      nodes:[
        {x:10,  y:12,  w:130, h:40, label:'Developer\nmerges code',          fill:'#E8F2FC', stroke:'#1A6FBE', tip:`A developer finishes a feature and merges it into the shared codebase. This single action automatically starts the pipeline — no one presses a button or sends an email to request a release.`},
        {x:155, y:12,  w:130, h:40, label:'Pipeline runs\nautomatically',     fill:'#1A6FBE', stroke:'#1A6FBE', white:true, tip:`Azure Pipelines detects the merge and immediately begins the automated sequence: compile the code, scan for security issues, run all tests, build the container image. This takes under 15 minutes.`},
        {x:300, y:12,  w:130, h:40, label:'All gates\npass ✓',                fill:'#E8F2FC', stroke:'#1A6FBE', tip:`Every automated gate must pass: security scan clean, 80% test coverage met, container image scanned, smoke tests pass in Dev environment. If any gate fails, the pipeline stops and the developer is notified instantly.`},
        {x:10,  y:88,  w:130, h:40, label:'Human approval\n(UAT + CAB)',      fill:'#FFF4CE', stroke:'#C55A00', tip:`Two human checkpoints exist in the pipeline: the business owner confirms the feature meets their needs, and the Change Advisory Board approves the production release. These are the only intentional manual steps.`},
        {x:155, y:88,  w:130, h:40, label:'Blue/Green\ndeployment',           fill:'#1A6FBE', stroke:'#1A6FBE', white:true, tip:`The new version is deployed alongside the current live version. Citizens continue using the current version while Azure Monitor watches the new version. If everything looks good after a safety window, traffic is switched.`},
        {x:300, y:88,  w:130, h:40, label:'Citizens access\nnew feature ✓',   fill:'#DFF6DD', stroke:'#107C10', tip:`The new feature is live. Citizens can use it immediately. If Azure Monitor detects any problem in the first 15 minutes, the system automatically switches back to the previous version — citizens never see an error.`},
        {x:10,  y:164, w:130, h:40, label:'Azure DevOps\ntracks frequency',  fill:'#E8F2FC', stroke:'#1A6FBE', tip:`Azure DevOps Analytics automatically records every deployment: when it happened, what changed, who approved it, and whether it succeeded. No manual tracking spreadsheet. The frequency metric is always current.`},
        {x:155, y:164, w:130, h:40, label:'Dashboard\nupdated instantly',    fill:'#E8F2FC', stroke:'#1A6FBE', tip:`The Steering Committee Power BI dashboard updates in real time. Leadership can see today's deployment count, this week's velocity, and any incidents — without waiting for a monthly report.`},
        {x:300, y:164, w:130, h:40, label:'Target: ≥ 1\nper day ✓',          fill:'#DFF6DD', stroke:'#107C10', tip:`The success target is at least one deployment per working day. Elite digital teams achieve this consistently. It means citizens always have access to the latest, most reliable version of every government service.`},
      ],
      arrows:[
        {x1:140,y1:32, x2:155,y2:32},
        {x1:285,y1:32, x2:300,y2:32},
        {x1:365,y1:52, x2:365,y2:88, curve:true},
        {x1:140,y1:108,x2:155,y2:108},
        {x1:285,y1:108,x2:300,y2:108},
        {x1:75, y1:52, x2:75, y2:88, color:'#C55A00',dashed:true},
        {x1:75, y1:128,x2:75, y2:164},
        {x1:140,y1:184,x2:155,y2:184},
        {x1:285,y1:184,x2:300,y2:184},
      ],
      labels:[{x:10,y:82,text:'Human gates ↓ (only 2 in the whole pipeline)',color:'#C55A00'}]
    },
    metrics:[
      {label:'Target\nfrequency',   value:'Daily',  color:'#1A6FBE'},
      {label:'Pipeline\nduration',  value:'<15min', color:'#1A6FBE'},
      {label:'Human\nsteps',        value:'2 only',  color:'#C55A00'},
      {label:'Auto\nrollback',      value:'Yes',    color:'#107C10'},
    ]
  },
  {
    id:'lead', icon:'⏱️', label:'Lead\nTime', value:'< 24h',
    color:'#0F6B50', colorPale:'#E4F5F0',
    tip:`From the moment a developer finishes writing a feature to when a citizen can use it — under 24 hours. Traditional government IT projects take 2–8 weeks for the same journey.`,
    title:'Lead Time — Idea to Live in Under 24 Hours',
    sub:'Time from a completed code change to that change being available to citizens',
    flow:{
      nodes:[
        {x:10,  y:12,  w:125, h:40, label:'Code change\ncompleted',          fill:'#E4F5F0', stroke:'#0F6B50', tip:`A developer finishes writing a feature or fix. The clock starts. In traditional government projects, this moment begins a weeks-long journey of manual handoffs. In DGTP, the automated pipeline takes over immediately.`},
        {x:150, y:12,  w:125, h:40, label:'Pipeline starts\n< 1 minute',     fill:'#0F6B50', stroke:'#0F6B50', white:true, tip:`Within 60 seconds of the code being merged, Azure Pipelines automatically starts the build. No one needs to schedule a release, send an approval email, or fill in a change request form to begin.`},
        {x:290, y:12,  w:125, h:40, label:'Build + scan\n< 15 minutes',      fill:'#0F6B50', stroke:'#0F6B50', white:true, tip:`The entire automated sequence — compile, security scan, 2,000+ tests, container build, container scan, smoke test — completes in under 15 minutes. A developer knows within 15 minutes whether their change is safe.`},
        {x:10,  y:88,  w:125, h:40, label:'UAT review\n≤ 48 hours',          fill:'#FFF4CE', stroke:'#C55A00', tip:`The business owner has a maximum of 48 hours to review and approve the feature in the UAT environment. In practice, straightforward features are approved within hours. This is the intentional human quality checkpoint.`},
        {x:150, y:88,  w:125, h:40, label:'CAB approval\nsame day',           fill:'#FFF4CE', stroke:'#C55A00', tip:`For standard low-risk changes, the Change Advisory Board approval is processed the same day. The CAB has access to the full automated test results, security scan report, and load test results — so their review is informed, not blind.`},
        {x:290, y:88,  w:125, h:40, label:'Production\ndeployment',           fill:'#0F6B50', stroke:'#0F6B50', white:true, tip:`Once both human approvals are recorded in Azure Pipelines, the Blue/Green deployment to production runs automatically. No manual deployment steps. The change is live within minutes of CAB approval.`},
        {x:150, y:164, w:125, h:40, label:'Total: < 24h\nvs 2–8 weeks ✓',    fill:'#DFF6DD', stroke:'#107C10', tip:`The total lead time — from code complete to citizens using the feature — is under 24 hours. This compares to 2–8 weeks in traditional government IT. The 95% reduction comes from eliminating manual handoffs and waiting time, not from rushing quality checks.`},
      ],
      arrows:[
        {x1:135,y1:32, x2:150,y2:32},
        {x1:275,y1:32, x2:290,y2:32},
        {x1:352,y1:52, x2:352,y2:88, curve:true},
        {x1:135,y1:108,x2:150,y2:108},
        {x1:275,y1:108,x2:290,y2:108},
        {x1:352,y1:128,x2:212,y2:164, curve:true},
        {x1:72, y1:52, x2:72, y2:88, color:'#C55A00',dashed:true},
        {x1:72, y1:128,x2:212,y2:164,curve:true},
      ],
      labels:[{x:8,y:82,text:'Human checkpoints (only intentional waits) ↓',color:'#C55A00'}]
    },
    metrics:[
      {label:'DGTP\nlead time',     value:'< 24h',    color:'#0F6B50'},
      {label:'Traditional\nIT',     value:'2–8 weeks', color:'#A4262C'},
      {label:'Improvement',         value:'~95%',      color:'#107C10'},
      {label:'Human\nwaits',        value:'2 gates',   color:'#C55A00'},
    ]
  },
  {
    id:'fail', icon:'🛡️', label:'Change\nFail Rate', value:'< 5%',
    color:'#856404', colorPale:'#FFF8E0',
    tip:`Fewer than 5 in every 100 deployments cause any issue that needs fixing. This is achieved by running automated quality checks at every stage before anything reaches citizens.`,
    title:'Change Failure Rate — Quality Confidence',
    sub:'Percentage of deployments that cause a problem requiring rollback or hotfix',
    flow:{
      nodes:[
        {x:10,  y:12,  w:120, h:40, label:'Code written\nby developer',       fill:'#FFF8E0', stroke:'#856404', tip:`Every line of code the developer writes is immediately reviewable by Claude CLI via OpenRouter — the AI catches common mistakes, security antipatterns, and style inconsistencies before the code ever reaches a reviewer.`},
        {x:145, y:12,  w:120, h:40, label:'AI + peer\ncode review',           fill:'#856404', stroke:'#856404', white:true, tip:`Claude CLI reviews the code first (catching ~60% of issues automatically), then two human colleagues review the remainder. This dual-layer review means very few defects survive to the test stage.`},
        {x:280, y:12,  w:120, h:40, label:'SAST + secret\nscan blocks issues',fill:'#856404', stroke:'#856404', white:true, tip:`Static Application Security Testing reads every line of code for SQL injection, cross-site scripting, hardcoded secrets, and vulnerable dependency versions. If a Critical or High issue is found, the pipeline stops. The developer must fix it before proceeding.`},
        {x:10,  y:88,  w:120, h:40, label:'80% test\ncoverage gate',          fill:'#FFF8E0', stroke:'#856404', tip:`Azure Pipelines enforces a hard gate: if fewer than 80% of code lines are tested by automated tests, the build cannot proceed to QA. This is not a recommendation — it is a technical block that no person can override.`},
        {x:145, y:88,  w:120, h:40, label:'Load test:\n200 users P95<2s',     fill:'#856404', stroke:'#856404', white:true, tip:`Azure Load Testing runs 200 simulated citizens against the pre-production environment. Every deployment must sustain this load with 95% of requests completing in under 2 seconds. A slow release is blocked before citizens experience it.`},
        {x:280, y:88,  w:120, h:40, label:'Post-deploy\nAzure Monitor',       fill:'#DFF6DD', stroke:'#107C10', tip:`For 15 minutes after every deployment, Azure Monitor watches the error rate and response times of the new version. If anything looks wrong, the traffic switches back to the previous version automatically — before the Steering Committee even receives an alert.`},
        {x:145, y:164, w:120, h:40, label:'< 5% failure\nrate achieved ✓',    fill:'#DFF6DD', stroke:'#107C10', tip:`By catching issues at the code stage, the review stage, the gate stage, and the monitoring stage, fewer than 5 in every 100 deployments cause any citizen-visible problem. When a rare failure does occur, it is reversed automatically within seconds.`},
      ],
      arrows:[
        {x1:130,y1:32, x2:145,y2:32},
        {x1:265,y1:32, x2:280,y2:32},
        {x1:340,y1:52, x2:340,y2:88, curve:true},
        {x1:130,y1:108,x2:145,y2:108},
        {x1:265,y1:108,x2:280,y2:108},
        {x1:340,y1:128,x2:205,y2:164,curve:true},
        {x1:70, y1:52, x2:70, y2:88},
        {x1:70, y1:128,x2:205,y2:164,curve:true},
      ],
      labels:[]
    },
    metrics:[
      {label:'Change failure\nrate target',value:'< 5%',   color:'#856404'},
      {label:'Test coverage\nhard gate',   value:'≥ 80%',  color:'#107C10'},
      {label:'Rollback\nif triggered',     value:'Instant',color:'#107C10'},
      {label:'AI code\nreview catches',    value:'~60%',   color:'#8A2BE2'},
    ]
  },
  {
    id:'mttr', icon:'🔧', label:'Recovery\nTime', value:'< 1 hour',
    color:'#6B4FA8', colorPale:'#F0EBF9',
    tip:`If something does go wrong after a deployment, the system detects it within seconds and either automatically restores service or alerts the team — service is back within one hour.`,
    title:'Mean Time to Recovery — System Resilience',
    sub:'Average time to restore full service after any incident',
    flow:{
      nodes:[
        {x:10,  y:12,  w:130, h:40, label:'Incident\noccurs',                 fill:'#FDE7E9', stroke:'#A4262C', tip:`Something goes wrong — an unexpected error, a slow response, a security alert, or a service becoming unavailable. The clock starts the moment the first symptom is detectable.`},
        {x:155, y:12,  w:130, h:40, label:'Azure Monitor\ndetects < 60s',     fill:'#6B4FA8', stroke:'#6B4FA8', white:true, tip:`Azure Monitor continuously checks error rates, response times, and service health. Within 60 seconds of an anomaly appearing, it generates an alert and begins the automated response process — no human needs to be watching a screen.`},
        {x:300, y:12,  w:130, h:40, label:'Auto-rollback\nor SOAR playbook',  fill:'#6B4FA8', stroke:'#6B4FA8', white:true, tip:`For deployment-related incidents: Azure Monitor automatically switches traffic back to the previous Blue environment. For security incidents: Microsoft Sentinel SOAR playbooks execute automatically — isolating affected resources, blocking suspicious IPs, revoking compromised credentials.`},
        {x:10,  y:88,  w:130, h:40, label:'Team notified\nvia Azure Alerts',  fill:'#F0EBF9', stroke:'#6B4FA8', tip:`Simultaneously with the automated response, the on-call team receives an alert through Azure Monitor with the full diagnostic context: which service, what error, what changed recently, what the automated response did. No hunting for information.`},
        {x:155, y:88,  w:130, h:40, label:'Runbook\nfollowed (if needed)',    fill:'#F0EBF9', stroke:'#6B4FA8', tip:`If the automated response did not fully resolve the incident, the team follows a documented runbook stored in Azure DevOps Wiki. Every known incident type has a step-by-step guide. New team members can follow it without prior experience of the specific problem.`},
        {x:300, y:88,  w:130, h:40, label:'Service\nfully restored ✓',        fill:'#DFF6DD', stroke:'#107C10', tip:`Full service is restored. Citizens have been protected from seeing an error for the majority of the incident window by the automated rollback. The on-call team confirms service health via Azure Monitor dashboards.`},
        {x:10,  y:164, w:130, h:40, label:'Post-incident\nreview created',    fill:'#F0EBF9', stroke:'#6B4FA8', tip:`Azure DevOps automatically creates a post-incident review work item linking the incident, the automated response actions, and the team's resolution steps. This is reviewed in the next sprint retrospective to prevent recurrence.`},
        {x:155, y:164, w:130, h:40, label:'Target: < 1hr\nfrom detection ✓', fill:'#DFF6DD', stroke:'#107C10', tip:`From the moment Azure Monitor detects the incident to full service restoration: under one hour. For the majority of incidents, automated rollback resolves the issue in under 5 minutes. The 1-hour target covers the most complex recovery scenarios.`},
      ],
      arrows:[
        {x1:140,y1:32, x2:155,y2:32},
        {x1:285,y1:32, x2:300,y2:32},
        {x1:365,y1:52, x2:365,y2:88, curve:true},
        {x1:140,y1:108,x2:155,y2:108},
        {x1:285,y1:108,x2:300,y2:108},
        {x1:365,y1:128,x2:220,y2:164,curve:true},
        {x1:75, y1:52, x2:75, y2:88},
        {x1:75, y1:128,x2:75, y2:164},
        {x1:140,y1:184,x2:155,y2:184},
      ],
      labels:[{x:10,y:80,text:'Automated response fires before team wakes up ↓',color:'#6B4FA8'}]
    },
    metrics:[
      {label:'Recovery\ntime target',   value:'< 1hr',   color:'#6B4FA8'},
      {label:'Auto detection\ntime',    value:'< 60s',   color:'#6B4FA8'},
      {label:'Rollback\nmethod',        value:'Auto',    color:'#107C10'},
      {label:'SOAR\nplaybooks',         value:'Active',  color:'#8A2BE2'},
    ]
  },
  {
    id:'test', icon:'🧪', label:'Test\nCoverage', value:'≥ 80%',
    color:'#107C10', colorPale:'#DFF6DD',
    tip:`At least 80% of every line of code is tested by automated checks before it can reach citizens. This is a hard rule enforced by the pipeline — no human can override it.`,
    title:'Test Automation Coverage — Quality Gate',
    sub:'Percentage of code validated by automated tests before every deployment',
    flow:{
      nodes:[
        {x:10,  y:12,  w:130, h:40, label:'Developer writes\ncode + tests',   fill:'#DFF6DD', stroke:'#107C10', tip:`Developers write automated tests alongside the code they create. This is part of the Definition of Done — a story cannot be closed unless tests are written for it. Azure OpenAI helps generate draft tests, which developers then review and refine.`},
        {x:155, y:12,  w:130, h:40, label:'Unit tests\n~70% of suite',        fill:'#107C10', stroke:'#107C10', white:true, tip:`Unit tests check individual functions and methods in isolation — does this specific piece of logic produce the correct output for a given input? Over 2,000 unit tests run in under 2 minutes, giving developers immediate feedback on their change.`},
        {x:300, y:12,  w:130, h:40, label:'Integration tests\n~20% of suite', fill:'#107C10', stroke:'#107C10', white:true, tip:`Integration tests check that different services and components work correctly together — does the Citizen Service correctly call the Civil Registry API? Do the authentication tokens flow correctly through Azure API Management? These run against mock responses so they work even before real registry connections are live.`},
        {x:10,  y:88,  w:130, h:40, label:'E2E tests\nPlaywright ~10%',       fill:'#107C10', stroke:'#107C10', white:true, tip:`End-to-end tests automate a real browser to simulate complete citizen journeys: register an account, search for a service, submit an application, receive a confirmation. If any citizen-facing flow breaks, Playwright catches it before deployment.`},
        {x:155, y:88,  w:130, h:40, label:'Coverage measured\nautomatically', fill:'#DFF6DD', stroke:'#107C10', tip:`After every test run, Azure Test Plans measures what percentage of code lines were executed by the tests. This percentage is the coverage score. It is calculated automatically — no human manually counts which code was tested.`},
        {x:300, y:88,  w:130, h:40, label:'< 80%? Pipeline\nblocked ✗',       fill:'#FDE7E9', stroke:'#A4262C', tip:`If the coverage score is below 80%, the Azure Pipelines gate closes. The build cannot proceed to QA, UAT, or Production. The developer must write more tests before the pipeline will continue. This gate cannot be bypassed by anyone.`},
        {x:10,  y:164, w:130, h:40, label:'≥ 80%? Gate\npasses ✓',            fill:'#DFF6DD', stroke:'#107C10', tip:`With 80% or more of code lines covered by tests, the quality gate opens and the pipeline advances to the next stage. The coverage report is attached to the build record in Azure DevOps for permanent audit trail.`},
        {x:155, y:164, w:130, h:40, label:'Reported in\nAzure Test Plans',    fill:'#DFF6DD', stroke:'#107C10', tip:`Every test run result, coverage percentage, and individual test pass/fail is stored in Azure Test Plans. The Steering Committee can see the programme's test quality at any time — and the trend over time shows whether quality is improving.`},
        {x:300, y:164, w:130, h:40, label:'Protects all\nprevious features', fill:'#DFF6DD', stroke:'#107C10', tip:`Automated regression testing means every new deployment also re-validates everything that worked before. If a new feature accidentally breaks an existing one, the test suite catches it immediately — before citizens experience a previously working service stopping to function.`},
      ],
      arrows:[
        {x1:140,y1:32, x2:155,y2:32},
        {x1:285,y1:32, x2:300,y2:32},
        {x1:365,y1:52, x2:365,y2:88, curve:true},
        {x1:140,y1:108,x2:155,y2:108},
        {x1:285,y1:108,x2:300,y2:108},
        {x1:75, y1:52, x2:75, y2:88},
        {x1:75, y1:128,x2:75, y2:164},
        {x1:140,y1:184,x2:155,y2:184},
        {x1:285,y1:184,x2:300,y2:184},
        {x1:340,y1:128,x2:340,y2:164,color:'#A4262C',dashed:true},
      ],
      labels:[{x:295,y:158,text:'blocked ↓',color:'#A4262C'}]
    },
    metrics:[
      {label:'Coverage\nhard gate',    value:'≥ 80%',  color:'#107C10'},
      {label:'Unit tests\ncount',      value:'2,000+', color:'#107C10'},
      {label:'E2E citizen\njourneys',  value:'Playwright',color:'#0F6B50'},
      {label:'AI generates\ndraft tests',value:'Yes',  color:'#8A2BE2'},
    ]
  },
];

/* ── SHARED HELPERS (same as challenges.js pattern) ─────────────────── */
function kpiBuildFlowSVG(flow, color, idx) {
  const W = 460, H = 230;
  let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" font-family="Arial,Helvetica,sans-serif" class="pf-svg">`;
  s += `<defs>
    <marker id="kparr${idx}" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="${color}"/></marker>
    <marker id="kparrR${idx}" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#A4262C"/></marker>
    <marker id="kparrA${idx}" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#C55A00"/></marker>
  </defs>`;

  // Arrows first
  flow.arrows.forEach((a, ai) => {
    const mk = a.color==='#A4262C' ? `url(#kparrR${idx})` : a.color==='#C55A00' ? `url(#kparrA${idx})` : `url(#kparr${idx})`;
    const stroke = a.color || color;
    const dash = a.dashed ? 'stroke-dasharray="5,3"' : '';
    const delay = (ai * 0.12).toFixed(2);
    if (a.curve) {
      const mx=(a.x1+a.x2)/2, my=(a.y1+a.y2)/2-18;
      s += `<path d="M${a.x1},${a.y1} Q${mx},${my} ${a.x2},${a.y2}" fill="none" stroke="${stroke}" stroke-width="1.5" ${dash} marker-end="${mk}" class="pf-arrow" style="animation-delay:${delay}s"/>`;
    } else {
      s += `<line x1="${a.x1}" y1="${a.y1}" x2="${a.x2}" y2="${a.y2}" stroke="${stroke}" stroke-width="1.5" ${dash} marker-end="${mk}" class="pf-arrow" style="animation-delay:${delay}s"/>`;
    }
  });

  // Nodes
  flow.nodes.forEach((n, ni) => {
    const delay = (ni * 0.09).toFixed(2);
    const textColor = n.white ? 'white' : '#1A2332';
    const lines = n.label.split('\n');
    const ty = n.y + n.h/2 - (lines.length-1)*7;
    const safeId = `kpn-${idx}-${ni}`;
    const tipText = (n.tip||'').replace(/"/g,'&quot;');
    s += `<g class="pf-node pf-node-hover" id="${safeId}" style="animation-delay:${delay}s;cursor:${n.tip?'pointer':'default'};">
  <rect x="${n.x}" y="${n.y}" width="${n.w}" height="${n.h}" rx="6" fill="${n.fill}" stroke="${n.stroke}" stroke-width="1.5" class="pf-node-rect"/>
  ${lines.map((l,li)=>`<text x="${n.x+n.w/2}" y="${ty+li*14}" text-anchor="middle" font-size="9.5" font-weight="700" fill="${textColor}">${l}</text>`).join('')}
  ${n.tip?`<rect x="${n.x}" y="${n.y}" width="${n.w}" height="${n.h}" rx="6" fill="transparent" class="pf-tip-overlay" data-tip="${tipText}" onmouseenter="showFlowTip(event,this)" onmouseleave="hideFlowTip()"/>`:''}
</g>`;
  });

  // Labels
  (flow.labels||[]).forEach(l => {
    s += `<text x="${l.x}" y="${l.y}" font-size="8.5" fill="${l.color}" font-style="italic">${l.text}</text>`;
  });

  s += `</svg>`;
  return s;
}

function kpiBuildMetrics(metrics) {
  return `<div class="pf-metrics">${metrics.map((m,i)=>`
    <div class="pf-metric" style="animation-delay:${i*0.15}s">
      <div class="pf-metric-value" style="color:${m.color}">${m.value}</div>
      <div class="pf-metric-label">${m.label.replace('\n','<br>')}</div>
    </div>`).join('')}</div>`;
}

/* ── CLICK HANDLER ───────────────────────────────────────────────────── */
window.openKPIDetail = function(id) {
  const m = SUCCESS_METRICS.find(x => x.id === id);
  if (!m || typeof openModal !== 'function') return;

  const flowSVG = kpiBuildFlowSVG(m.flow, m.color, SUCCESS_METRICS.indexOf(m));
  const metricsHTML = kpiBuildMetrics(m.metrics);

  openModal(m.icon, m.title, m.sub, `
    <div class="pf-wrap">
      <div class="pf-chart-section">
        <div class="pf-chart-label">How this is achieved — step by step</div>
        <div class="pf-chart-box">${flowSVG}</div>
      </div>
      <div class="pf-metrics-section">
        <div class="pf-chart-label">Key numbers</div>
        ${metricsHTML}
      </div>
    </div>`
  );
};

/* ── MAIN OVERVIEW FLOW ──────────────────────────────────────────────── */
function buildKPISection() {
  const container = document.getElementById('kpi-flow-container');
  if (!container) return;

  const W = 1120, H = 420;
  const n = SUCCESS_METRICS.length;
  const nodeR = 52;
  const gap = (W - 40) / n;
  const nodeY = 105;

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" font-family="Arial,Helvetica,sans-serif" id="kpi-svg">
<defs>
  <marker id="kpiarr" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#1A6FBE"/></marker>
  <filter id="kshd"><feDropShadow dx="0" dy="3" stdDeviation="5" flood-opacity="0.13"/></filter>
  <filter id="kshd2"><feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.15"/></filter>
</defs>
<rect width="${W}" height="${H}" fill="#F4F8FD" rx="14"/>
<text x="${W/2}" y="18" text-anchor="middle" font-size="14" font-weight="700" fill="#0A2744">Five Measures That Define Programme Success</text>
<text x="${W/2}" y="34" text-anchor="middle" font-size="11" fill="#5080A0" font-style="italic">Tracked automatically · Hover for plain-English explanation · Click to see the full flow</text>
<line x1="${20+gap*0.5}" y1="${nodeY}" x2="${20+gap*(n-0.5)}" y2="${nodeY}" stroke="#C0D8EE" stroke-width="2" stroke-dasharray="5,3"/>`;

  // Arrows between circles
  SUCCESS_METRICS.forEach((_,i) => {
    if (i < n-1) {
      const x1 = 20 + gap*i + gap/2 + nodeR + 2;
      const x2 = 20 + gap*(i+1) + gap/2 - nodeR - 2;
      svg += `<line x1="${x1}" y1="${nodeY}" x2="${x2}" y2="${nodeY}" stroke="#1A6FBE" stroke-width="1.5" marker-end="url(#kpiarr)" class="pf-arrow" style="animation-delay:${(i*0.15).toFixed(2)}s"/>`;
    }
  });

  SUCCESS_METRICS.forEach((m, i) => {
    const cx = 20 + gap*i + gap/2;
    const delay = (i*0.12).toFixed(2);
    const lines = m.label.split('\n');

    svg += `
<g class="pf-node pf-node-hover" style="animation-delay:${delay}s;cursor:pointer;" onclick="openKPIDetail('${m.id}')">
  <circle cx="${cx}" cy="${nodeY}" r="${nodeR+6}" fill="${m.colorPale}" stroke="${m.color}" stroke-width="1" opacity="0.5"/>
  <circle cx="${cx}" cy="${nodeY}" r="${nodeR}" fill="white" stroke="${m.color}" stroke-width="2.5" class="pf-node-rect" filter="url(#kshd2)"/>
  <text x="${cx}" y="${nodeY - 14}" text-anchor="middle" font-size="24">${m.icon}</text>
  <text x="${cx}" y="${nodeY + 8}" text-anchor="middle" font-size="13" font-weight="700" fill="${m.color}">${m.value}</text>
  ${lines.map((l,li)=>`<text x="${cx}" y="${nodeY+nodeR+16+li*14}" text-anchor="middle" font-size="10" font-weight="700" fill="#0A2744">${l}</text>`).join('')}
  <circle cx="${cx}" cy="${nodeY}" r="${nodeR}" fill="transparent"
    data-tip="${m.tip.replace(/"/g,'&quot;')}"
    onmouseenter="showFlowTip(event,this)" onmouseleave="hideFlowTip()" class="pf-tip-overlay"/>
</g>`;
  });

  // Bullet cards below each node
  const bulletY = nodeY + nodeR + 50;
  const colW = W / n;

  SUCCESS_METRICS.forEach((m, i) => {
    const bx = i*colW + 6;
    const cx = i*colW + colW/2;
    // connector dot line
    svg += `<line x1="${20+gap*i+gap/2}" y1="${nodeY+nodeR+4}" x2="${cx}" y2="${bulletY-6}" stroke="${m.color}" stroke-width="1" stroke-dasharray="3,2" opacity="0.5"/>`;

    svg += `<rect x="${bx}" y="${bulletY}" width="${colW-12}" height="168" rx="8" fill="white" stroke="${m.color}" stroke-width="1.2" filter="url(#kshd)" opacity="0.97"/>`;
    svg += `<rect x="${bx}" y="${bulletY}" width="${colW-12}" height="24" rx="8" fill="${m.color}"/>`;
    svg += `<rect x="${bx}" y="${bulletY+16}" width="${colW-12}" height="8" fill="${m.color}"/>`;

    const titleShort = m.title.split(' — ')[0].replace('Mean Time to Recovery','Recovery').replace('Deployment Frequency','Deploy Frequency').replace('Change Failure Rate','Failure Rate').replace('Test Automation Coverage','Test Coverage');
    svg += `<text x="${cx-6}" y="${bulletY+16}" text-anchor="middle" font-size="9" font-weight="700" fill="white">${titleShort}</text>`;

    m.metrics.forEach((kp, ki) => {
      const ky = bulletY + 34 + ki*32;
      svg += `<rect x="${bx+8}" y="${ky}" width="${colW-28}" height="26" rx="4" fill="${m.colorPale}" stroke="${m.color}" stroke-width="0.8"/>`;
      svg += `<text x="${bx+16}" y="${ky+11}" font-size="11" font-weight="700" fill="${kp.color}">${kp.value}</text>`;
      svg += `<text x="${bx+16}" y="${ky+22}" font-size="8" fill="#5080A0">${kp.label.replace('\n',' ')}</text>`;
    });

    svg += `<text x="${cx-6}" y="${bulletY+162}" text-anchor="middle" font-size="8" fill="${m.color}" font-style="italic">▼ click circle for flow</text>`;
  });

  svg += `</svg>`;

  container.innerHTML = `
    <div style="background:white;border:1px solid var(--border);border-radius:12px;overflow:hidden;box-shadow:var(--shadow-md);">
      <div style="padding:10px 16px;background:var(--gray-50);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
        <div style="font-size:13px;font-weight:700;color:var(--navy);">Programme Success Metrics — Automated Tracking</div>
        <div style="font-size:11px;color:var(--text-muted);font-style:italic;">🖱 Hover any circle for plain-English explanation · Click to open the detailed flow</div>
      </div>
      <div style="padding:16px 18px;overflow-x:auto;">${svg}</div>
      <div style="padding:8px 16px;font-size:11px;color:var(--text-muted);font-style:italic;border-top:1px solid var(--border);background:white;">
        All five metrics reported automatically — no manual reporting required at any stage.
      </div>
    </div>`;
}

document.addEventListener('DOMContentLoaded', buildKPISection);
