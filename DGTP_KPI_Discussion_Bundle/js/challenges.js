/* ═══════════════════════════════════════════════════════════════════════
   CHALLENGES.JS — Double circular / D-shaped interactive SVG figure
   Six challenge nodes on the outer ring, connecting to solution rings
═══════════════════════════════════════════════════════════════════════ */

const CHALLENGES = [
  {
    id: 'c1', angle: -90,
    icon: '🗂️', label: 'Fragmented\nLegacy Systems',
    color: '#A4262C', colorLight: '#FDE7E9',
    impact: 'High', effort: 'Extreme',
    problem: 'Government data exists in isolated silos across six registries (Civil, Business, Address, TaxPayer, Business License, Land), each using proprietary formats, aged APIs, or paper-based records. No single view of a citizen exists across departments.',
    consequence: 'Average integration effort: 3–4 months per registry using traditional sequential methods. Citizens must visit multiple offices, submit duplicate paperwork, and wait weeks for cross-departmental data validation.',
    solution: 'Azure API Management acts as the unified interoperability gateway. OpenAPI 3.0 contracts defined for all six registries before a single line of code is written. Azure Service Bus decouples registry updates from portal services.',
    azureTools: ['Azure API Management', 'Azure Service Bus', 'Azure Logic Apps', 'Azure Data Factory'],
    kpis: [{ l: 'Traditional Time', v: '3–4 mo/registry' }, { l: 'DGTP Time', v: '4–6 weeks' }, { l: 'Saving', v: '~60%' }]
  },
  {
    id: 'c2', angle: -30,
    icon: '📝', label: 'Manual\nValidation',
    color: '#C55A00', colorLight: '#FFF4CE',
    impact: 'High', effort: 'High',
    problem: 'Current government workflows are entirely paper-based: citizens complete forms → staff manually enter data → supervisors sign off → documents filed physically. Zero automation in place.',
    consequence: 'Service delivery times average 6–12 weeks for common transactions. Error rates from manual entry reach 12–15%. Rework absorbs 30% of staff capacity. Citizens must return for corrections.',
    solution: 'Azure Logic Apps automates multi-step approval workflows. Government documents are generated as structured digital outputs (certificates, licences, receipts) via a shared Document Generation Service. Azure AI eliminates manual data entry for common service types.',
    azureTools: ['Azure Logic Apps', 'Document Generation Service', 'Azure Automation', 'Azure App Configuration'],
    kpis: [{ l: 'Current Delivery', v: '6–12 weeks' }, { l: 'Target Delivery', v: '< 2 days' }, { l: 'Error Reduction', v: '95%' }]
  },
  {
    id: 'c3', angle: 30,
    icon: '🤝', label: 'Multi-Stakeholder\nCoordination',
    color: '#856404', colorLight: '#FFF3CD',
    impact: 'Medium', effort: 'High',
    problem: 'Six government agencies, three oversight bodies, two funding organisations, and multiple vendor teams must all align on decisions. Sequential approval chains create weeks of waiting between each party.',
    consequence: 'Decision latency averages 3–4 weeks per major decision. Change requests cycle through 5–7 approval layers. Steering Committee meetings are infrequent and lack real-time data to inform decisions.',
    solution: 'Azure DevOps Delivery Plans provide cross-team visibility. Azure DevOps Analytics auto-publishes live KPI dashboards to Steering Committee. Digital Change Request work items replace email chains — full audit trail.',
    azureTools: ['Azure DevOps Boards', 'Azure DevOps Analytics', 'Power BI', 'Microsoft Teams Integration'],
    kpis: [{ l: 'Decision Latency', v: '3–4 weeks → 48h' }, { l: 'Approval Layers', v: '7 → 2' }, { l: 'Audit Coverage', v: '100%' }]
  },
  {
    id: 'c4', angle: 90,
    icon: '⏩', label: 'Sequential\nDevelopment',
    color: '#003087', colorLight: '#E8ECF4',
    impact: 'Critical', effort: 'High',
    problem: 'Traditional waterfall: Requirements phase → Design phase → Build phase → Test phase → Deploy. Each phase must complete before the next begins. No parallel execution permitted.',
    consequence: 'A single blocked phase halts the entire programme. Backend APIs must be 100% complete before frontend development can begin — adding 6–8 weeks of serialised delay. Testing only starts after full build.',
    solution: 'Azure API Management Mock Response Policies activated from Sprint 2. Six parallel workstreams operate simultaneously. Shift-Left testing begins at requirement stage. CI/CD pipelines enable daily deployments.',
    azureTools: ['Azure API Management Mocks', 'Azure Pipelines YAML', 'Azure Test Plans', 'Azure DevOps Boards'],
    kpis: [{ l: 'Sequential Timeline', v: '18–24 months' }, { l: 'DGTP Approach', v: 'Parallel' }, { l: 'Acceleration', v: '30–40%' }]
  },
  {
    id: 'c5', angle: 150,
    icon: '⚖️', label: 'Regulatory\nComplexity',
    color: '#6B4FA8', colorLight: '#F3EFF9',
    impact: 'High', effort: 'Medium',
    problem: 'Sint Maarten must comply with Kingdom of the Netherlands legal framework, local privacy ordinances, international GDPR-aligned standards, and sector-specific regulations for health and financial data.',
    consequence: 'Legal review cycles absorb 4–6 weeks per major feature. Compliance requirements are discovered late in development, causing costly rework. No automated compliance verification exists.',
    solution: 'Azure Policy enforces compliance at subscription level via Deny effects — no non-compliant resource can be deployed. Legal review sprint checkpoints every 4 weeks. Azure Purview for automated data classification.',
    azureTools: ['Azure Policy', 'Microsoft Purview', 'Defender for Cloud Compliance', 'Azure Key Vault CMK'],
    kpis: [{ l: 'Legal Review Cycle', v: '6 weeks → 4 weeks' }, { l: 'Policy Violations', v: 'Blocked at deploy' }, { l: 'Data Classified', v: '100% automated' }]
  },
  {
    id: 'c6', angle: 210,
    icon: '🔌', label: 'Legacy\nIntegration',
    color: '#5A6B7A', colorLight: '#F3F5F7',
    impact: 'High', effort: 'Extreme',
    problem: 'Existing government systems use SOAP/XML APIs from the 1990s–2000s, proprietary database schemas, on-premises servers with no cloud connectivity, and undocumented data formats.',
    consequence: 'Legacy integration typically absorbs 40% of total project timeline. Custom adapters must be written for each system. No vendor support for legacy APIs. Integration failures cascade across dependent services.',
    solution: 'Azure API Management transforms legacy SOAP/XML to REST/JSON transparently. Azure Logic Apps connectors for common legacy protocols. Azure Data Factory handles ETL from any source format. Hybrid connectivity via Azure VPN Gateway.',
    azureTools: ['Azure API Management (SOAP/REST)', 'Azure Logic Apps Connectors', 'Azure Data Factory', 'Azure VPN Gateway'],
    kpis: [{ l: 'Legacy Integration', v: '40% of timeline' }, { l: 'DGTP Integration', v: '< 15%' }, { l: 'Protocols Supported', v: 'SOAP, REST, SFTP, DB' }]
  },
];

const PRINCIPLES_BRIEF = [
  { icon:'⬅️', lbl:'Shift Left',          col:'#0078D4', solves:'c1,c2,c5' },
  { icon:'⚙️', lbl:'Automate Everything', col:'#005A9E', solves:'c2,c4' },
  { icon:'📐', lbl:'Standardize Patterns', col:'#003087', solves:'c1,c6' },
  { icon:'♻️', lbl:'Reuse Before Build',  col:'#107C10', solves:'c1,c6' },
  { icon:'⚡', lbl:'Parallel Execution',  col:'#6B4FA8', solves:'c3,c4' },
  { icon:'🔄', lbl:'Incremental Delivery', col:'#0078D4', solves:'c4' },
  { icon:'🏛️', lbl:'Governance by Design', col:'#C55A00', solves:'c3,c5' },
  { icon:'🛡️', lbl:'Zero-Trust Security',  col:'#107C10', solves:'c5,c6' },
  { icon:'🤖', lbl:'AI-Accelerated Delivery', col:'#8A2BE2', solves:'c2,c3,c4,c5,c6' },
];

function buildChallengesFigure() {
  const container = document.getElementById('challenges-figure');
  if (!container) return;

  const W = 1100, H = 610;
  const cx = 340, cy = H / 2;         // centre of the D-shape
  const outerR = 230, innerR = 130;    // double ring radii
  const nodeR = 46;                    // challenge node circle radius

  // Convert angle (degrees, 0=right) to x,y on a circle
  function pt(angle, r) {
    const rad = (angle - 90) * Math.PI / 180; // -90 so 0deg = top
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  }

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="100%" height="${H}" font-family="Arial,Helvetica,sans-serif" id="challenges-svg">
<defs>
  <filter id="cf1"><feDropShadow dx="0" dy="3" stdDeviation="5" flood-opacity="0.13"/></filter>
  <filter id="cf2"><feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.18"/></filter>
  <radialGradient id="outerGrad" cx="50%" cy="50%" r="50%">
    <stop offset="0%" stop-color="#E8ECF4"/>
    <stop offset="100%" stop-color="#F3F5F7"/>
  </radialGradient>
  <radialGradient id="innerGrad" cx="50%" cy="50%" r="50%">
    <stop offset="0%" stop-color="#FFFFFF"/>
    <stop offset="100%" stop-color="#F0F4F8"/>
  </radialGradient>
</defs>

<!-- Background -->
<rect width="${W}" height="${H}" fill="#F8FAFB" rx="14"/>

<!-- ── OUTER RING (challenge belt) ── -->
<circle cx="${cx}" cy="${cy}" r="${outerR}" fill="url(#outerGrad)" stroke="#D0D7DE" stroke-width="1.5" filter="url(#cf1)"/>
<!-- Ring label arc guideline (decorative dashes) -->
<circle cx="${cx}" cy="${cy}" r="${outerR - 4}" fill="none" stroke="#C8D8E8" stroke-width="1" stroke-dasharray="6,4" opacity="0.5"/>

<!-- ── INNER RING (solution hub) ── -->
<circle cx="${cx}" cy="${cy}" r="${innerR}" fill="url(#innerGrad)" stroke="#0078D4" stroke-width="1.5" filter="url(#cf1)"/>
<circle cx="${cx}" cy="${cy}" r="${innerR - 8}" fill="none" stroke="#0078D4" stroke-width="0.5" stroke-dasharray="4,3" opacity="0.4"/>

<!-- Inner hub label -->
<text x="${cx}" y="${cy - 22}" text-anchor="middle" font-size="13" font-weight="700" fill="#003087">DGTP</text>
<text x="${cx}" y="${cy - 7}" text-anchor="middle" font-size="10" fill="#0078D4">Azure-Native</text>
<text x="${cx}" y="${cy + 8}" text-anchor="middle" font-size="10" fill="#0078D4">Solutions</text>
<text x="${cx}" y="${cy + 24}" text-anchor="middle" font-size="9" fill="#7A8C9A" font-style="italic">Click challenges</text>
<text x="${cx}" y="${cy + 37}" text-anchor="middle" font-size="9" fill="#7A8C9A" font-style="italic">for details →</text>

<!-- Spoke lines from inner ring to outer ring edge -->
`;

  // Draw spokes
  CHALLENGES.forEach(ch => {
    const inner = pt(ch.angle, innerR);
    const outer = pt(ch.angle, outerR - nodeR - 4);
    svg += `<line x1="${inner.x.toFixed(1)}" y1="${inner.y.toFixed(1)}" x2="${outer.x.toFixed(1)}" y2="${outer.y.toFixed(1)}" stroke="${ch.color}" stroke-width="1.5" stroke-dasharray="5,3" opacity="0.5"/>`;
  });

  // Draw challenge nodes
  CHALLENGES.forEach((ch, i) => {
    const pos = pt(ch.angle, outerR + nodeR + 10);
    const lines = ch.label.split('\n');

    svg += `
<g class="challenge-node" id="chn-${ch.id}" onclick="openChallenge('${ch.id}')" style="cursor:pointer;" filter="url(#cf2)">
  <!-- Outer glow ring -->
  <circle cx="${pos.x.toFixed(1)}" cy="${pos.y.toFixed(1)}" r="${nodeR + 6}" fill="${ch.colorLight}" stroke="${ch.color}" stroke-width="1" opacity="0.5"/>
  <!-- Main node circle -->
  <circle cx="${pos.x.toFixed(1)}" cy="${pos.y.toFixed(1)}" r="${nodeR}" fill="white" stroke="${ch.color}" stroke-width="2.5"/>
  <!-- Icon -->
  <text x="${pos.x.toFixed(1)}" y="${(pos.y - 10).toFixed(1)}" text-anchor="middle" font-size="20">${ch.icon}</text>
  <!-- Label lines -->
  ${lines.map((l, li) => `<text x="${pos.x.toFixed(1)}" y="${(pos.y + 7 + li * 13).toFixed(1)}" text-anchor="middle" font-size="9" font-weight="700" fill="${ch.color}">${l}</text>`).join('')}
  <!-- Impact badge -->
  <rect x="${(pos.x - 24).toFixed(1)}" y="${(pos.y + nodeR - 2).toFixed(1)}" width="48" height="14" rx="7" fill="${ch.color}"/>
  <text x="${pos.x.toFixed(1)}" y="${(pos.y + nodeR + 9).toFixed(1)}" text-anchor="middle" font-size="8" font-weight="700" fill="white">${ch.impact}</text>
</g>`;
  });

  // ── RIGHT SIDE: Solution connection panel ──
  const panelX = cx + outerR + nodeR * 2 + 40;
  const panelW = W - panelX - 20;

  svg += `
<!-- Connection arrow from D-shape to solution panel -->
<line x1="${cx + outerR + nodeR*2 + 8}" y1="${cy}" x2="${panelX - 8}" y2="${cy}" stroke="#0078D4" stroke-width="2" stroke-dasharray="6,3"/>
<polygon points="${panelX - 8},${cy - 5} ${panelX + 2},${cy} ${panelX - 8},${cy + 5}" fill="#0078D4"/>

<!-- Solution panel -->
<rect x="${panelX}" y="28" width="${panelW}" height="${H - 56}" rx="10" fill="white" stroke="#D0D7DE" stroke-width="1.5" filter="url(#cf1)"/>
<rect x="${panelX}" y="28" width="${panelW}" height="40" rx="10" fill="#003087"/>
<rect x="${panelX}" y="48" width="${panelW}" height="20" fill="#003087"/>
<text x="${panelX + panelW/2}" y="54" text-anchor="middle" font-size="12" font-weight="700" fill="white">Nine Governing Principles</text>
<text x="${panelX + panelW/2}" y="67" text-anchor="middle" font-size="9" fill="rgba(255,255,255,0.7)">Solutions to every challenge above</text>
`;

  // Draw principle blocks in the solution panel
  const bW = panelW - 20, bH = 48;
  const bStartY = 80;
  PRINCIPLES_BRIEF.forEach((p, i) => {
    const by = bStartY + i * (bH + 4) + 28;
    svg += `
<g class="principle-sol-block" id="psb-${i}" onclick="openPrincipleDetail(${i})" style="cursor:pointer;">
  <rect x="${panelX + 10}" y="${by}" width="${bW}" height="${bH - 6}" rx="6" fill="#F8FAFB" stroke="${p.col}" stroke-width="1.5"/>
  <rect x="${panelX + 10}" y="${by}" width="4" height="${bH - 6}" rx="2" fill="${p.col}"/>
  <text x="${panelX + 24}" y="${by + 16}" font-size="13">${p.icon}</text>
  <text x="${panelX + 42}" y="${by + 16}" font-size="11" font-weight="700" fill="#1A2332">${p.lbl}</text>
  <text x="${panelX + 42}" y="${by + 30}" font-size="9" fill="#7A8C9A">Solves: ${p.solves.split(',').map(s=>{ const ch=CHALLENGES.find(c=>c.id===s); return ch?ch.label.replace('\\n',' '):s; }).join(', ')}</text>
  <text x="${panelX + bW + 4}" y="${by + 24}" text-anchor="end" font-size="10" fill="${p.col}">▶</text>
</g>`;
  });

  svg += `</svg>`;

  container.innerHTML = `
    <div style="background:white;border:1px solid var(--border);border-radius:12px;overflow:hidden;box-shadow:var(--shadow-md);">
      <div style="padding:10px 16px;background:var(--gray-50);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
        <div style="font-size:13px;font-weight:700;color:var(--navy);">Traditional Government Delivery Challenges — Interactive Figure</div>
        <div style="font-size:11px;color:var(--text-muted);font-style:italic;">🖱 Click any challenge node (outer ring) or principle block (right panel)</div>
      </div>
      <div style="padding:16px 20px;">${svg}</div>
      <div style="padding:8px 16px;font-size:11px;color:var(--text-muted);font-style:italic;border-top:1px solid var(--border);background:white;">
        Outer ring = Six systemic delivery challenges · Inner hub = Azure-native solution platform · Right panel = Eight governing principles addressing each challenge
      </div>
    </div>`;

  // Attach hover highlight
  CHALLENGES.forEach(ch => {
    const node = document.getElementById(`chn-${ch.id}`);
    if (!node) return;
    node.addEventListener('mouseenter', () => {
      node.querySelector('circle:nth-child(2)').setAttribute('r', (nodeR + 2).toString());
      node.style.filter = 'drop-shadow(0 6px 12px rgba(0,0,0,0.2))';
    });
    node.addEventListener('mouseleave', () => {
      node.querySelector('circle:nth-child(2)').setAttribute('r', nodeR.toString());
      node.style.filter = 'drop-shadow(0 2px 3px rgba(0,0,0,0.18))';
    });
  });
}

/* ── CHALLENGE FLOWCHARTS: traditional failure paths ─────────────────── */
const CHALLENGE_FLOWS = {
  c1: { // Fragmented Legacy Systems
    nodes:[
      {x:10, y:8,  w:140,h:38,label:'Citizen needs\na government service',fill:'#F8F8F8',stroke:'#888',tip:`A citizen needs something simple — a birth certificate, a business licence renewal, or a land title check. In the traditional system, this is the beginning of a long frustrating journey across multiple government offices.`},
      {x:170,y:8,  w:140,h:38,label:'Visits Office A\n(Civil Registry)',fill:'#FDE7E9',stroke:'#A4262C',tip:`The citizen visits the Civil Registry office in person, takes a number, waits in a queue, and submits a paper form. Office A has no idea what information Office B already holds about this citizen — they cannot look it up.`},
      {x:330,y:8,  w:130,h:38,label:'Told to also\nvisit Office B',fill:'#FDE7E9',stroke:'#A4262C',tip:`Office A cannot complete the request without a document from Office B (Business Registry). The citizen must now travel to a second office, join a second queue, and submit more paper forms — often with overlapping information they already provided.`},
      {x:10, y:76, w:140,h:38,label:'Office B has\ndifferent format',fill:'#FFF0CC',stroke:'#C55A00',tip:`Office B stores citizen data in a completely different system — different field names, different ID numbers, different file formats. The two offices cannot share data electronically. Everything must be done manually, on paper.`},
      {x:170,y:76, w:140,h:38,label:'Manual data\nentry required',fill:'#FFF0CC',stroke:'#C55A00',tip:`A government clerk manually re-types information from the paper form into their computer system. This takes time and introduces errors. Studies show manual data entry has a 12-15% error rate — meaning roughly 1 in 7 entries has a mistake.`},
      {x:330,y:76, w:130,h:38,label:'Error found\nweeks later',fill:'#FDE7E9',stroke:'#A4262C',tip:`The error is discovered weeks later when the citizen returns to collect their document. The process must start again from scratch. The citizen has wasted two visits. The clerk has wasted time. The error rate compounds across all six registries.`},
      {x:10, y:144,w:140,h:38,label:'Back to start\n3–4 months later',fill:'#FDE7E9',stroke:'#A4262C',tip:`The total journey for a single cross-registry request in the current system: 3-4 months, multiple office visits, paper forms, manual re-entry, error correction cycles. Citizens often give up.`},
      {x:170,y:144,w:140,h:38,label:'No single view\nof citizen exists',fill:'#FFF0CC',stroke:'#C55A00',tip:`At no point does any system have a complete picture of the citizen. Civil, Business, Land, Vehicle, Health, and Education registries each hold a fragment. No one can see the whole person. This makes service personalisation, fraud detection, and accurate reporting impossible.`},
      {x:330,y:144,w:130,h:38,label:'DGTP fixes this\nwith APIM ✓',fill:'#DFF6DD',stroke:'#107C10',tip:`Azure API Management creates a single unified gateway. Every registry exposes the same standardised interface. A citizen logs in once and the portal retrieves data from all six registries simultaneously — in seconds, not months.`},
    ],
    arrows:[
      {x1:150,y1:27,  x2:170,y2:27},
      {x1:310,y1:27,  x2:330,y2:27},
      {x1:395,y1:46,  x2:395,y2:76,  curve:true,color:'#A4262C'},
      {x1:150,y1:95,  x2:170,y2:95},
      {x1:310,y1:95,  x2:330,y2:95},
      {x1:395,y1:114, x2:395,y2:144, curve:true,color:'#107C10'},
      {x1:80, y1:46,  x2:80, y2:76,  color:'#C55A00',dashed:true},
      {x1:150,y1:163, x2:170,y2:163},
      {x1:310,y1:163, x2:330,y2:163},
    ],
    labels:[{x:8,y:70,text:'No digital link between offices — everything on paper ↓',color:'#A4262C'}]
  },
  c2: { // Manual Validation
    nodes:[
      {x:10, y:8,  w:140,h:38,label:'Citizen submits\npaper form',fill:'#FDE7E9',stroke:'#A4262C',tip:`A citizen fills in a paper form by hand. They must visit a government office during business hours, collect the form, complete it, and return it in person. There is no online option. If they make a mistake on the form, they start again.`},
      {x:165,y:8,  w:140,h:38,label:'Clerk manually\nenters data',fill:'#FFF0CC',stroke:'#C55A00',tip:`A government clerk manually types every field from the paper form into a computer. This takes 15-30 minutes per form. With 12-15% error rates, roughly 1 in 7 forms has at least one mistake that will cause problems later.`},
      {x:320,y:8,  w:140,h:38,label:'Supervisor\nsigns off (days)',fill:'#FFF0CC',stroke:'#C55A00',tip:`The completed entry must be approved by a supervisor. The supervisor reviews paperwork in batches — often once or twice a week. A form submitted on a Monday may not be reviewed until Thursday. This queuing delay alone adds days to every transaction.`},
      {x:10, y:78, w:140,h:38,label:'Error discovered:\nback to citizen',fill:'#FDE7E9',stroke:'#A4262C',tip:`When a mistake is found — wrong ID number, missing field, incorrect date — a letter is posted to the citizen asking them to return. The citizen must visit the office again, join the queue again, and resubmit. Average correction cycle: 2-3 weeks.`},
      {x:165,y:78, w:140,h:38,label:'Physical filing\nin cabinet',fill:'#FFF0CC',stroke:'#C55A00',tip:`Approved documents are physically filed in a filing cabinet. Retrieving them requires a clerk to search manually. Documents can be misfiled, damaged, or simply impossible to find. There is no search function.`},
      {x:320,y:78, w:140,h:38,label:'6–12 weeks\nfor simple service',fill:'#FDE7E9',stroke:'#A4262C',tip:`The total journey from form submission to service delivery: 6-12 weeks for a straightforward transaction. Internationally, comparable digital services take 2-3 days. Sint Maarten citizens wait 20-40 times longer than necessary.`},
      {x:10, y:148,w:140,h:38,label:'30% of staff\ntime on rework',fill:'#FFF0CC',stroke:'#C55A00',tip:`Because of error rates and correction cycles, approximately 30% of government staff capacity is absorbed by rework — correcting mistakes, chasing missing documents, re-entering data. This is wasted capacity that could serve citizens instead.`},
      {x:165,y:148,w:140,h:38,label:'No audit trail\nor tracking',fill:'#FFF0CC',stroke:'#C55A00',tip:`Citizens have no way to check the status of their application. Staff have no automated reminder system. Documents sit in queues with no visibility. When something goes wrong, there is no record of what happened or who handled it.`},
      {x:320,y:148,w:140,h:38,label:'DGTP automates\nthe whole flow ✓',fill:'#DFF6DD',stroke:'#107C10',tip:`Azure Logic Apps automates every approval workflow. Azure Document Intelligence reads paper forms with OCR. Citizens track their application status online in real time. Service delivery drops from weeks to hours.`},
    ],
    arrows:[
      {x1:150,y1:27,  x2:165,y2:27},
      {x1:305,y1:27,  x2:320,y2:27},
      {x1:390,y1:46,  x2:390,y2:78, curve:true,color:'#C55A00'},
      {x1:80, y1:46,  x2:80, y2:78, color:'#A4262C',dashed:true},
      {x1:150,y1:97,  x2:165,y2:97},
      {x1:305,y1:97,  x2:320,y2:97},
      {x1:390,y1:116, x2:390,y2:148,curve:true,color:'#107C10'},
      {x1:150,y1:167, x2:165,y2:167},
      {x1:305,y1:167, x2:320,y2:167},
    ],
    labels:[{x:8,y:72,text:'Error → correction cycle adds weeks → ↓',color:'#A4262C'}]
  },
  c3: { // Multi-Stakeholder Coordination
    nodes:[
      {x:10, y:8,  w:130,h:38,label:'Change request\nraised',fill:'#F8F8F8',stroke:'#888',tip:`Any change to a government digital system — a new feature, a bug fix, a policy update — must be formally requested. In the traditional process, this begins a sequential journey through multiple approval layers.`},
      {x:155,y:8,  w:130,h:38,label:'Email sent to\nAgency 1',fill:'#FFF0CC',stroke:'#C55A00',tip:`The request is sent to the first agency by email. There is no tracking system. The email sits in an inbox until someone reads it — which could be days or weeks depending on how busy the recipient is.`},
      {x:300,y:8,  w:140,h:38,label:'Agency 1 responds\n(1–2 weeks)',fill:'#FFF0CC',stroke:'#C55A00',tip:`Agency 1 reviews the request, discusses it internally, and responds by email 1-2 weeks later. Their response may partially approve, request changes, or ask clarifying questions — starting another email cycle.`},
      {x:10, y:76, w:130,h:38,label:'Forward to\nAgency 2, wait',fill:'#FDE7E9',stroke:'#A4262C',tip:`The (partially) approved request is forwarded to Agency 2. The sequential process continues: wait for Agency 2 to read the email, discuss it, respond. Each agency adds 1-2 weeks. With 5-7 agencies in the chain, this adds 2-4 months.`},
      {x:155,y:76, w:130,h:38,label:'Steering Committee\nmeeting monthly',fill:'#FFF0CC',stroke:'#C55A00',tip:`The Steering Committee only meets monthly. Any decision that requires their input must wait for the next meeting. A decision needed on day 1 might not be made until day 30. This creates a 30-day artificial delay on every major decision.`},
      {x:300,y:76, w:140,h:38,label:'No real-time\nprogramme data',fill:'#FDE7E9',stroke:'#A4262C',tip:`When the Steering Committee does meet, they are reviewing data that is weeks old — manually compiled reports, status updates prepared by staff, progress assessments that nobody fully trusts. They cannot make confident decisions without current information.`},
      {x:10, y:144,w:130,h:38,label:'3–4 week\ndecision latency',fill:'#FDE7E9',stroke:'#A4262C',tip:`The average time from raising a decision to getting a final answer: 3-4 weeks. In a programme where every week of delay costs money and postpones citizen benefits, this decision latency compounds into months of lost time.`},
      {x:155,y:144,w:130,h:38,label:'7 approval\nlayers standard',fill:'#FDE7E9',stroke:'#A4262C',tip:`A typical change request passes through 7 approval layers before it can be implemented. Each layer is a potential veto, a request for more information, or simply a queue. The more layers, the longer the wait.`},
      {x:300,y:144,w:140,h:38,label:'DGTP: 48h\ndecisions via DevOps ✓',fill:'#DFF6DD',stroke:'#107C10',tip:`Azure DevOps Boards replace email chains. Steering Committee see live programme data via Power BI dashboards. Approval layers reduced from 7 to 2. Decision latency: 3-4 weeks → 48 hours.`},
    ],
    arrows:[
      {x1:140,y1:27,  x2:155,y2:27},
      {x1:285,y1:27,  x2:300,y2:27},
      {x1:370,y1:46,  x2:370,y2:76, curve:true,color:'#C55A00'},
      {x1:75, y1:46,  x2:75, y2:76, color:'#A4262C',dashed:true},
      {x1:140,y1:95,  x2:155,y2:95},
      {x1:285,y1:95,  x2:300,y2:95},
      {x1:370,y1:114, x2:370,y2:144,curve:true,color:'#107C10'},
      {x1:140,y1:163, x2:155,y2:163},
      {x1:285,y1:163, x2:300,y2:163},
    ],
    labels:[{x:8,y:70,text:'Sequential approvals — each agency waits for the previous ↓',color:'#C55A00'}]
  },
  c4: { // Sequential Development
    nodes:[
      {x:10, y:8,  w:130,h:38,label:'Phase 1:\nRequirements\n(3 months)',fill:'#FFF0CC',stroke:'#C55A00',tip:`The traditional waterfall starts with a requirements phase. Every possible requirement must be written down, reviewed, and signed off before anything else can begin. This phase alone typically takes 3 months — and requirements always change by the time the system is built.`},
      {x:155,y:8,  w:130,h:38,label:'Phase 2:\nDesign\n(2 months)',fill:'#FFF0CC',stroke:'#C55A00',tip:`Only after requirements are complete does design begin. 2 months of architecture and UI design, again requiring sign-off before anything can be built. The total wait before a developer writes a single line of code: 5 months.`},
      {x:300,y:8,  w:150,h:38,label:'Phase 3:\nBuild\n(6–9 months)',fill:'#FDE7E9',stroke:'#A4262C',tip:`Building begins. Frontend developers cannot start their work until backend APIs are complete — often 3-4 months into the build phase. The entire team waits in sequence. 6-9 months of development, but much of the team is idle waiting for the previous sub-phase.`},
      {x:10, y:76, w:130,h:38,label:'Frontend blocked:\nwaits for APIs',fill:'#FDE7E9',stroke:'#A4262C',tip:`The frontend team cannot build a single screen until every backend API is complete. They sit idle for 3-4 months. This serialised dependency is the single biggest source of unnecessary delay in traditional government IT projects.`},
      {x:155,y:76, w:130,h:38,label:'Phase 4:\nTest\n(2–3 months)',fill:'#FFF0CC',stroke:'#C55A00',tip:`Testing only begins after the build phase is complete. Testers have been idle throughout development. When they finally start testing, they find issues that require the development team to rework code they wrote months ago — doubling the cost of fixing each defect.`},
      {x:300,y:76, w:150,h:38,label:'Bugs found late:\ncostly rework',fill:'#FDE7E9',stroke:'#A4262C',tip:`A bug found in testing (after build) costs 10x more to fix than a bug found during development. A bug found in production costs 30x more. The waterfall approach guarantees most bugs are found late — because testing only happens after everything is built.`},
      {x:10, y:144,w:130,h:38,label:'Phase 5:\nDeploy\n(month 18–24)',fill:'#FDE7E9',stroke:'#A4262C',tip:`Deployment finally happens 18-24 months after the project began. By this point, requirements have changed. Stakeholders have new expectations. Technology has moved on. The system being deployed may already be partially obsolete.`},
      {x:155,y:144,w:130,h:38,label:'Requirements\nalready changed',fill:'#FDE7E9',stroke:'#A4262C',tip:`18 months is a long time. Government priorities shift. New regulations come into force. Citizens' expectations change. The system built to the original specification may not address today's needs — but it is too late and too expensive to change course.`},
      {x:300,y:144,w:150,h:38,label:'DGTP: parallel\ndelivery ✓',fill:'#DFF6DD',stroke:'#107C10',tip:`DGTP removes sequential dependency entirely. All six streams run in parallel from Day 1. API mocks allow frontend to start immediately. Testing starts at requirement stage. Citizens see working features every 2 weeks — dramatically faster than the traditional 18–24 month sequential approach.`},
    ],
    arrows:[
      {x1:140,y1:27,  x2:155,y2:27},
      {x1:285,y1:27,  x2:300,y2:27},
      {x1:375,y1:46,  x2:375,y2:76, color:'#A4262C'},
      {x1:75, y1:46,  x2:75, y2:76, color:'#A4262C',dashed:true},
      {x1:140,y1:95,  x2:155,y2:95},
      {x1:285,y1:95,  x2:300,y2:95},
      {x1:375,y1:114, x2:375,y2:144,color:'#107C10'},
      {x1:140,y1:163, x2:155,y2:163},
      {x1:285,y1:163, x2:300,y2:163},
    ],
    labels:[{x:8,y:70,text:'Each phase completely blocks the next — total: 18-24 months ↓',color:'#A4262C'}]
  },
  c5: { // Regulatory Complexity
    nodes:[
      {x:10, y:8,  w:140,h:38,label:'Feature\ndevelopment starts',fill:'#F8F8F8',stroke:'#888',tip:`Development begins on a new government service feature. At this point, nobody has checked whether it complies with Sint Maarten's legal framework, the Kingdom of the Netherlands requirements, or international privacy standards.`},
      {x:165,y:8,  w:140,h:38,label:'Build completes\nafter months',fill:'#FFF0CC',stroke:'#C55A00',tip:`The feature is fully built. Months of development time invested. Only now does anyone think about regulatory compliance — at the end, when the cost of changes is highest.`},
      {x:320,y:8,  w:130,h:38,label:'Legal review\nrequested',fill:'#FFF0CC',stroke:'#C55A00',tip:`A formal legal review is requested from the programme's legal advisor. The legal team is busy. This review is scheduled 2-4 weeks out. All development on related features stops while waiting.`},
      {x:10, y:76, w:140,h:38,label:'Review takes\n4–6 weeks',fill:'#FDE7E9',stroke:'#A4262C',tip:`The legal review process takes 4-6 weeks. The reviewer reads the specification, identifies legal risks, drafts recommendations, shares them for internal approval, then communicates findings. This is not bureaucratic obstruction — it is genuinely complex regulation that takes time to interpret.`},
      {x:165,y:76, w:140,h:38,label:'Non-compliance\ndiscovered',fill:'#FDE7E9',stroke:'#A4262C',tip:`The review finds that the feature violates a data retention requirement, or stores citizen data in an unapproved location, or lacks required consent mechanisms. The feature cannot go live. Development must be undone and redone.`},
      {x:320,y:76, w:130,h:38,label:'Costly rework\n(weeks to months)',fill:'#FDE7E9',stroke:'#A4262C',tip:`The rework required to bring the feature into compliance can take weeks or months — often approaching the original development time. The cost of compliance discovered late is 10-15x the cost of compliance designed in from the start.`},
      {x:10, y:144,w:140,h:38,label:'No automated\ncompliance checks',fill:'#FFF0CC',stroke:'#C55A00',tip:`Throughout the whole process, compliance is entirely manual — a human reads documents and makes judgements. There is no automated system that checks whether cloud resources meet legal requirements, whether data is classified correctly, or whether encryption standards are met.`},
      {x:165,y:144,w:140,h:38,label:'Data sovereignty\nat risk',fill:'#FDE7E9',stroke:'#A4262C',tip:`Without automated controls, citizen data may be stored in cloud regions outside Sint Maarten's approved boundaries, violating data sovereignty requirements. Manual checks are too slow and too infrequent to catch configuration drift.`},
      {x:320,y:144,w:130,h:38,label:'DGTP: Azure\nPolicy blocks this ✓',fill:'#DFF6DD',stroke:'#107C10',tip:`Azure Policy enforces compliance automatically — non-compliant resources are blocked at deployment time, not discovered months later. Data sovereignty, encryption standards, and network rules are enforced continuously, not checked periodically.`},
    ],
    arrows:[
      {x1:150,y1:27,  x2:165,y2:27},
      {x1:305,y1:27,  x2:320,y2:27},
      {x1:385,y1:46,  x2:385,y2:76, curve:true,color:'#C55A00'},
      {x1:80, y1:46,  x2:80, y2:76, color:'#6B4FA8',dashed:true},
      {x1:150,y1:95,  x2:165,y2:95},
      {x1:305,y1:95,  x2:320,y2:95},
      {x1:385,y1:114, x2:385,y2:144,curve:true,color:'#107C10'},
      {x1:150,y1:163, x2:165,y2:163},
      {x1:305,y1:163, x2:320,y2:163},
    ],
    labels:[{x:8,y:70,text:'Compliance found late = expensive rework ↓',color:'#6B4FA8'}]
  },
  c6: { // Legacy Integration
    nodes:[
      {x:10, y:8,  w:140,h:38,label:'Integration\nwork begins',fill:'#F8F8F8',stroke:'#888',tip:`The team attempts to connect the new portal to an existing government registry. They request the API documentation. They discover there is none, or it is outdated. The real investigation begins.`},
      {x:165,y:8,  w:140,h:38,label:'System uses\nSOAP/XML (1990s)',fill:'#FFF0CC',stroke:'#C55A00',tip:`The registry runs on a SOAP/XML protocol from the late 1990s or early 2000s. Modern web applications use REST/JSON. A custom adapter must be written to translate between the two formats — this is weeks of specialist work per system.`},
      {x:320,y:8,  w:130,h:38,label:'No documentation\nexists',fill:'#FDE7E9',stroke:'#A4262C',tip:`The integration team asks for API documentation. The answer: there isn't any, or what exists is years out of date, or the original developers are no longer with the government. The team must reverse-engineer the system by trial and error.`},
      {x:10, y:76, w:140,h:38,label:'Custom adapter\nbuilt per system',fill:'#FFF0CC',stroke:'#C55A00',tip:`A bespoke integration adapter is built from scratch for each legacy system. This is not reusable — the Civil Registry adapter works only for the Civil Registry. The Business Registry requires an entirely different adapter. Multiplied across six registries: months of unique development work.`},
      {x:165,y:76, w:140,h:38,label:'Adapter breaks on\nsystem update',fill:'#FDE7E9',stroke:'#A4262C',tip:`The legacy system is updated — even a minor maintenance patch. The custom adapter breaks. The portal loses access to the registry. Citizens see errors. An emergency fix is required. This cycle repeats every time the legacy system changes.`},
      {x:320,y:76, w:130,h:38,label:'Cascading failures\nacross services',fill:'#FDE7E9',stroke:'#A4262C',tip:`Because the adapters are tightly coupled to the legacy systems, a failure in one integration cascades. The Civil Registry being unavailable may prevent a Business Registry request from completing — because the request chain crosses both registries.`},
      {x:10, y:144,w:140,h:38,label:'40% of project\ntimeline absorbed',fill:'#FDE7E9',stroke:'#A4262C',tip:`Legacy integration work typically absorbs 40% of total project budget and timeline. This is not building new features for citizens — it is just connecting to systems that already exist. 40% of resources consumed before any citizen-visible work is done.`},
      {x:165,y:144,w:140,h:38,label:'No vendor\nsupport available',fill:'#FFF0CC',stroke:'#C55A00',tip:`The legacy systems are often no longer supported by their original vendors. Bug fixes, security patches, and documentation are unavailable commercially. The government team is entirely on their own when something breaks.`},
      {x:320,y:144,w:130,h:38,label:'DGTP: APIM wraps\nall legacy ✓',fill:'#DFF6DD',stroke:'#107C10',tip:`Azure API Management wraps every legacy system in a modern REST/JSON interface — SOAP/XML, flat files, databases, SFTP — all translated transparently at the gateway. The portal only talks to APIM; legacy systems can change without breaking the portal.`},
    ],
    arrows:[
      {x1:150,y1:27,  x2:165,y2:27},
      {x1:305,y1:27,  x2:320,y2:27},
      {x1:385,y1:46,  x2:385,y2:76, curve:true,color:'#A4262C'},
      {x1:80, y1:46,  x2:80, y2:76, color:'#C55A00',dashed:true},
      {x1:150,y1:95,  x2:165,y2:95},
      {x1:305,y1:95,  x2:320,y2:95},
      {x1:385,y1:114, x2:385,y2:144,curve:true,color:'#107C10'},
      {x1:150,y1:163, x2:165,y2:163},
      {x1:305,y1:163, x2:320,y2:163},
    ],
    labels:[{x:8,y:70,text:'Each legacy system needs a unique hand-built adapter ↓',color:'#C55A00'}]
  }
};

function buildChallengeFlowSVG(flow, color, idx) {
  const W = 465, H = 210;
  let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" font-family="Arial,Helvetica,sans-serif" class="pf-svg">`;
  s += `<defs>
    <marker id="chfA${idx}" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="${color}"/></marker>
    <marker id="chfR${idx}" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#A4262C"/></marker>
    <marker id="chfO${idx}" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#C55A00"/></marker>
    <marker id="chfP${idx}" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#6B4FA8"/></marker>
    <marker id="chfG${idx}" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#107C10"/></marker>
  </defs>`;

  flow.arrows.forEach((a,ai) => {
    const isRed = a.color === '#A4262C';
    const mk = isRed ? `url(#chfR${idx})` : a.color==='#C55A00'?`url(#chfO${idx})`:a.color==='#6B4FA8'?`url(#chfP${idx})`:a.color==='#107C10'?`url(#chfG${idx})`:`url(#chfA${idx})`;
    const stroke = a.color || color;
    const dash = a.dashed ? 'stroke-dasharray="5,3"' : '';
    const delay = (ai*0.12).toFixed(2);

    // Midpoint for the ✕ badge
    let mx, my;
    if (a.curve) {
      mx = (a.x1+a.x2)/2;
      my = (a.y1+a.y2)/2 - 18;
      // quadratic bezier midpoint approximation
      const qx = mx, qy = my;
      mx = (a.x1/4 + qx/2 + a.x2/4);
      my = (a.y1/4 + qy/2 + a.y2/4);
      const bmx=(a.x1+a.x2)/2, bmy=(a.y1+a.y2)/2-18;
      s+=`<path d="M${a.x1},${a.y1} Q${bmx},${bmy} ${a.x2},${a.y2}" fill="none" stroke="${stroke}" stroke-width="1.5" ${dash} marker-end="${mk}" class="pf-arrow" style="animation-delay:${delay}s"/>`;
    } else {
      mx = (a.x1+a.x2)/2;
      my = (a.y1+a.y2)/2;
      s+=`<line x1="${a.x1}" y1="${a.y1}" x2="${a.x2}" y2="${a.y2}" stroke="${stroke}" stroke-width="1.5" ${dash} marker-end="${mk}" class="pf-arrow" style="animation-delay:${delay}s"/>`;
    }

    // Add ✕ break badge on RED arrows only
    if (isRed) {
      const br = 9; // badge radius
      const bdelay = (parseFloat(delay) + 0.3).toFixed(2);
      const badgeId = `chfbadge-${idx}-${ai}`;
      s += `
<g id="${badgeId}" class="chf-break-badge" style="cursor:pointer;animation-delay:${bdelay}s;"
   onclick="playBreakSound()" title="System failure / break point">
  <!-- Pulsing ring -->
  <circle cx="${mx.toFixed(1)}" cy="${my.toFixed(1)}" r="${br+5}" fill="rgba(164,38,44,0.12)" class="chf-pulse-ring"/>
  <!-- Badge circle -->
  <circle cx="${mx.toFixed(1)}" cy="${my.toFixed(1)}" r="${br}" fill="#A4262C" stroke="white" stroke-width="1.5"/>
  <!-- ✕ cross lines -->
  <line x1="${(mx-4).toFixed(1)}" y1="${(my-4).toFixed(1)}" x2="${(mx+4).toFixed(1)}" y2="${(my+4).toFixed(1)}" stroke="white" stroke-width="2" stroke-linecap="round"/>
  <line x1="${(mx+4).toFixed(1)}" y1="${(my-4).toFixed(1)}" x2="${(mx-4).toFixed(1)}" y2="${(my+4).toFixed(1)}" stroke="white" stroke-width="2" stroke-linecap="round"/>
</g>`;
    }
  });

  flow.nodes.forEach((n,ni) => {
    const delay=(ni*0.09).toFixed(2);
    const tc=n.white?'white':'#1A2332';
    const lines=n.label.split('\n');
    const ty=n.y+n.h/2-(lines.length-1)*7;
    const tipText=(n.tip||'').replace(/"/g,'&quot;');
    s+=`<g class="pf-node pf-node-hover" style="animation-delay:${delay}s;cursor:${n.tip?'pointer':'default'};">
  <rect x="${n.x}" y="${n.y}" width="${n.w}" height="${n.h}" rx="6" fill="${n.fill}" stroke="${n.stroke}" stroke-width="1.5" class="pf-node-rect"/>
  ${lines.map((l,li)=>`<text x="${n.x+n.w/2}" y="${ty+li*13}" text-anchor="middle" font-size="9" font-weight="700" fill="${tc}">${l}</text>`).join('')}
  ${n.tip?`<rect x="${n.x}" y="${n.y}" width="${n.w}" height="${n.h}" rx="6" fill="transparent" class="pf-tip-overlay" data-tip="${tipText}" onmouseenter="showFlowTip(event,this)" onmouseleave="hideFlowTip()"/>`:''}
</g>`;
  });

  (flow.labels||[]).forEach(l=>{
    s+=`<text x="${l.x}" y="${l.y}" font-size="8.5" fill="${l.color}" font-style="italic">${l.text}</text>`;
  });
  s+=`</svg>`;
  return s;
}

window.openChallenge = function(id) {
  const ch = CHALLENGES.find(c => c.id === id);
  if (!ch || typeof openModal !== 'function') return;

  const flow = CHALLENGE_FLOWS[id];
  const flowIdx = CHALLENGES.indexOf(ch);
  const flowSVG = flow ? buildChallengeFlowSVG(flow, ch.color, flowIdx) : '';

  openModal(ch.icon, ch.label.replace('\n',' '), `Traditional Delivery Challenge — Impact: ${ch.impact}`,
    `<div class="pf-wrap">
      ${flow ? `
      <div class="pf-chart-section">
        <div class="pf-chart-label">Traditional failure path — hover each step for plain-English explanation</div>
        <div class="pf-chart-box">${flowSVG}</div>
      </div>` : ''}
      <div class="pf-metrics-section">
        <div class="pf-chart-label">Impact at a glance</div>
        ${mkpi(ch.kpis)}
      </div>
      <div class="pf-tools-section">
        <div class="pf-chart-label">How Orange bd solves this</div>
        <div style="font-size:13px;color:var(--text-secondary);line-height:1.65;margin-bottom:10px;">${ch.solution}</div>
        ${mtags(ch.azureTools)}
      </div>
    </div>`
  );
};


/* ═══════════════════════════════════════════════════════════════════════
   EIGHT GOVERNING PRINCIPLES — Rich Detail Modal Content
   Structure per principle:
     plain    : plain-English explanation for any stakeholder
     why      : why it matters specifically for Sint Maarten / DGTP
     how      : how it is implemented technically
     deepDive : section-by-section deep dive (array of {heading, body})
     realWorld: a concrete real-world analogy
     kpis     : measurable targets
     tools    : Azure services / tools that enforce it
     challenges: which of the 6 delivery challenges it directly solves
═══════════════════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════════════════
   EIGHT GOVERNING PRINCIPLES — Animated flowchart + success metrics
   Each principle: one SVG flow + one metrics strip
═══════════════════════════════════════════════════════════════════════ */

const PRINCIPLES_VIZ = [
  /* 0 — SHIFT LEFT */
  {
    color: '#0078D4',
    flow: {
      nodes: [
        { id:'n1', x:60,  y:30,  w:130, h:40, label:'Requirements\nDefined',fill:'#E8F3FC', stroke:'#0078D4', tip:`The team writes down what the system needs to do. At this stage, changes cost almost nothing — just updating a document.`},
        { id:'n2', x:60,  y:100, w:130, h:40, label:'Security Review\nhappens here',fill:'#0078D4', stroke:'#0078D4', white:true, tip:`DGTP runs a security check on the requirements before any code is written. Issues found here are fixed in minutes, not months.`},
        { id:'n3', x:60,  y:170, w:130, h:40, label:'Code Written\n+ PR Opened',fill:'#E8F3FC', stroke:'#0078D4', tip:`Developers write the feature. A Pull Request is opened — this triggers automated scanning before any human can approve the merge.`},
        { id:'n4', x:60,  y:240, w:130, h:40, label:'SAST Gate\nAuto-Runs',fill:'#0078D4', stroke:'#0078D4', white:true, tip:`Static Application Security Testing. The computer reads every line of code looking for SQL injection, hardcoded passwords, and insecure patterns. Runs in under 2 minutes.`},
        { id:'n5', x:60,  y:315, w:130, h:40, label:'Issue found here?\nCosts 1×  ✓',fill:'#DFF6DD', stroke:'#107C10', tip:`Fixing a security issue at this stage costs roughly 1× — maybe an hour of developer time. This is the best possible outcome.`},
        { id:'n6', x:245, y:240, w:140, h:40, label:'Traditional approach:\nIssue found at launch',fill:'#FDE7E9', stroke:'#A4262C', tip:`In traditional projects, security is only checked at the end. By this point the code is deployed, citizens may have used it, and fixing it requires redevelopment, retesting, and redeployment.`},
        { id:'n7', x:245, y:315, w:140, h:40, label:'Fix costs 30× more\n+ reputation damage',fill:'#FDE7E9', stroke:'#A4262C', tip:`Studies show security issues found post-launch cost 30 times more to fix than issues caught at requirements stage. For a government portal, add legal liability and loss of citizen trust.`},
      ],
      arrows: [
        { x1:125, y1:70,  x2:125, y2:100 },
        { x1:125, y1:140, x2:125, y2:170 },
        { x1:125, y1:210, x2:125, y2:240 },
        { x1:125, y1:280, x2:125, y2:315 },
        { x1:190, y1:260, x2:245, y2:260, dashed:true, color:'#A4262C' },
        { x1:315, y1:280, x2:315, y2:315 },
      ],
      labels: [
        { x:205, y:248, text:'Traditional path →', color:'#A4262C' },
        { x:205, y:338, text:'30× more expensive', color:'#A4262C' },
      ]
    },
    metrics: [
      { label:'Cost to fix at\nrequirement stage', value:'1×',   color:'#107C10' },
      { label:'Cost to fix\npre-production', value:'10×',  color:'#C55A00' },
      { label:'Cost to fix\npost-launch', value:'30×',  color:'#A4262C' },
      { label:'Automated security\nchecks per PR', value:'4',    color:'#0078D4' },
    ]
  },
  /* 1 — AUTOMATE EVERYTHING */
  {
    color: '#005A9E',
    flow: {
      nodes: [
        { id:'a1', x:20,  y:20,  w:100, h:38, label:'Developer\ncommits code',fill:'#E8ECF4', stroke:'#005A9E', tip:`A developer finishes writing a feature and saves it to the shared codebase. This single action automatically starts the entire pipeline — no one needs to press a button.`},
        { id:'a2', x:140, y:20,  w:100, h:38, label:'Auto: Build\n& SAST Scan',fill:'#005A9E', stroke:'#005A9E', white:true, tip:`The computer automatically compiles the code and checks it for security vulnerabilities. If anything is wrong, the pipeline stops immediately and the developer is notified within minutes.`},
        { id:'a3', x:260, y:20,  w:100, h:38, label:'Auto: 2,000+\ntests run',fill:'#005A9E', stroke:'#005A9E', white:true, tip:`Over 2,000 automated tests check that the feature works correctly and that nothing previously working has broken. This takes about 8 minutes — a human doing the same testing would take days.`},
        { id:'a4', x:20,  y:110, w:100, h:38, label:'Auto: Docker\nimage built',fill:'#005A9E', stroke:'#005A9E', white:true, tip:`The code is packaged into a container — a self-contained box that includes everything the service needs to run. It is tagged with a unique ID so it can never be accidentally overwritten.`},
        { id:'a5', x:140, y:110, w:100, h:38, label:'Auto: Deploy\nto Dev env',fill:'#005A9E', stroke:'#005A9E', white:true, tip:`The packaged service is automatically deployed to the development environment on Azure Kubernetes Service. Configuration and secrets are injected from Azure App Configuration and Key Vault — no manual setup.`},
        { id:'a6', x:260, y:110, w:100, h:38, label:'Auto: QA Gate\n80% pass ✓',fill:'#DFF6DD', stroke:'#107C10', tip:`The pipeline checks that at least 80% of all code lines are covered by automated tests. If coverage drops below 80%, the build is blocked automatically — no human needs to make that decision.`},
        { id:'a7', x:140, y:200, w:100, h:38, label:'Human: UAT\nApproval 👤',fill:'#FFF4CE', stroke:'#C55A00', tip:`This is one of the only two points where a human is required. The business owner reviews the feature in the UAT environment and formally approves it in Azure Pipelines before production deployment.`},
        { id:'a8', x:260, y:200, w:100, h:38, label:'Auto: Production\nBlue/Green 🚀',fill:'#003087', stroke:'#003087', white:true, tip:`The new version is deployed alongside the old version. Traffic is gradually shifted. If Azure Monitor detects errors, the system automatically rolls back to the old version — no human needed.`},
        { id:'a9', x:20,  y:200, w:100, h:38, label:'Result:\n0 manual steps',fill:'#DFF6DD', stroke:'#107C10', tip:`From a developer committing code to a feature reaching production, every step except two human approval gates is fully automated. This eliminates human error and makes deployment repeatable and reliable.`},
      ],
      arrows: [
        { x1:120, y1:39,  x2:140, y2:39  },
        { x1:240, y1:39,  x2:260, y2:39  },
        { x1:70,  y1:58,  x2:70,  y2:110 },
        { x1:120, y1:129, x2:140, y2:129 },
        { x1:240, y1:129, x2:260, y2:129 },
        { x1:310, y1:148, x2:310, y2:200 },
        { x1:240, y1:219, x2:260, y2:219 },
      ],
      labels: [
        { x:135, y:175, text:'↓ automated', color:'#005A9E' },
      ]
    },
    metrics: [
      { label:'Manual steps\ncommit→production', value:'0',       color:'#107C10' },
      { label:'Full pipeline\nduration', value:'<15min', color:'#005A9E' },
      { label:'Environment\nsetup from IaC', value:'<2hrs',  color:'#005A9E' },
      { label:'Human errors\neliminated', value:'~100%',  color:'#107C10' },
    ]
  },
  /* 2 — STANDARDIZE PATTERNS */
  {
    color: '#003087',
    flow: {
      nodes: [
        { id:'s1', x:145, y:15,  w:150, h:40, label:'One OpenAPI 3.0\nContract Template',fill:'#003087', stroke:'#003087', white:true, tip:`Before writing any code, the team defines the API contract — the agreement about what each service will accept and return. This is done in a standard format (OpenAPI 3.0) so every team reads the same language.`},
        { id:'s2', x:20,  y:95,  w:110, h:38, label:'Civil Registry\nAPI (same pattern)',fill:'#E8ECF4', stroke:'#003087', tip:`The Civil Registry integration follows exactly the same API design pattern as every other registry. The authentication method, error format, and versioning approach are identical — only the business data differs.`},
        { id:'s3', x:148, y:95,  w:110, h:38, label:'Business Registry\nAPI (same pattern)',fill:'#E8ECF4', stroke:'#003087', tip:`The Business Registry API uses the same Bicep infrastructure template, the same Helm chart, the same logging format, and the same security policies as every other service. A developer who knows one knows all.`},
        { id:'s4', x:276, y:95,  w:110, h:38, label:'Land Registry\nAPI (same pattern)',fill:'#E8ECF4', stroke:'#003087', tip:`Same pattern. If a bug is found in the error-handling logic, it is fixed once in the shared template and automatically corrected for all six registries — not manually patched six times.`},
        { id:'s5', x:20,  y:180, w:110, h:38, label:'Bicep template:\nInfrastructure',fill:'#003087', stroke:'#003087', white:true, tip:`Azure Bicep template defines all cloud infrastructure — servers, databases, security rules — as code. Every service uses the same approved template, so every environment is identical and compliant from day one.`},
        { id:'s6', x:148, y:180, w:110, h:38, label:'Helm chart:\nDeployment',fill:'#003087', stroke:'#003087', white:true, tip:`Helm chart defines how the service is deployed to Kubernetes. Every microservice uses the same chart structure — health checks, scaling rules, resource limits — so no service is deployed in a non-standard way.`},
        { id:'s7', x:276, y:180, w:110, h:38, label:'Logging standard:\nJSON + Trace ID',fill:'#003087', stroke:'#003087', white:true, tip:`Every service logs in the same JSON format with a correlation ID that traces a request across all services. This means when something goes wrong, engineers find the cause in one query instead of digging through six different log formats.`},
        { id:'s8', x:145, y:260, w:150, h:40, label:'All 6 registries:\nsame pattern ✓',fill:'#DFF6DD', stroke:'#107C10', tip:`The result: all six government registry integrations look and behave the same way. A new developer joining the programme can be productive on any service within hours, not weeks of learning a unique approach.`},
      ],
      arrows: [
        { x1:220, y1:55,  x2:55,  y2:95,  curve:true },
        { x1:220, y1:55,  x2:153, y2:95  },
        { x1:220, y1:55,  x2:251, y2:95  },
        { x1:220, y1:55,  x2:349, y2:95,  curve:true },
        { x1:55,  y1:133, x2:55,  y2:160 },
        { x1:153, y1:133, x2:153, y2:160 },
        { x1:55,  y1:198, x2:220, y2:255, curve:true },
        { x1:153, y1:198, x2:220, y2:255 },
        { x1:251, y1:133, x2:220, y2:255, curve:true },
        { x1:349, y1:133, x2:220, y2:255, curve:true },
      ],
      labels: []
    },
    metrics: [
      { label:'Rework from\nnon-standard design', value:'~0%',   color:'#107C10' },
      { label:'New service\nonboarding time', value:'1 day', color:'#003087' },
      { label:'API contracts\nbefore coding', value:'100%',  color:'#003087' },
      { label:'Shared Bicep\nmodules', value:'12+',   color:'#003087' },
    ]
  },
  /* 3 — REUSE BEFORE BUILD */
  {
    color: '#107C10',
    flow: {
      nodes: [
        /* ── TOP ROW: 5 shared services ── */
        { id:'r1', x:10,  y:10,  w:82, h:40, label:'🔔 Notifications\nEmail / SMS',  fill:'#DFF6DD', stroke:'#107C10', tip:`Azure Communication Services sends all government notifications — application approved, document ready, payment confirmed — across all six registries. Built once, works for all.`},
        { id:'r2', x:100, y:10,  w:82, h:40, label:'🔑 Identity\nSingle Sign-On',    fill:'#DFF6DD', stroke:'#107C10', tip:`Microsoft Entra External ID. Citizens log in once and access all six registry services. MFA, password reset, and session management built once — used by all.`},
        { id:'r3', x:190, y:10,  w:82, h:40, label:'📄 Document\nGeneration',         fill:'#DFF6DD', stroke:'#107C10', tip:`Documents are outputs of services — certificates, licences, receipts, official letters. One shared service produces all output documents using approved government templates.`},
        { id:'r4', x:280, y:10,  w:82, h:40, label:'🔍 Search\nAll Registries',        fill:'#DFF6DD', stroke:'#107C10', tip:`Azure AI Search enables citizens to search across all six registries from one search box. Built once, connected to all registry data simultaneously.`},
        { id:'r5', x:370, y:10,  w:82, h:40, label:'💳 Payment\nService',              fill:'#DFF6DD', stroke:'#107C10', tip:`One Payment Service handles all government fee transactions — licence fees, registration fees, certificate fees — across all registries. One familiar, secure checkout interface.`},
        /* ── MIDDLE: Azure Service Bus backbone ── */
        { id:'bus', x:30, y:85,  w:400,h:38, label:'Azure Service Bus — Shared Integration Backbone',  fill:'#0078D4', stroke:'#0078D4', white:true, tip:`Azure Service Bus is the shared messaging backbone. Every registry integration and every shared service communicates through it. When a service sends a notification or triggers a document generation, it publishes a message to the bus — and the right service picks it up. This decoupling means no direct dependencies between registries and services.`},
        /* ── BOTTOM ROW: all 6 named registries ── */
        { id:'g1', x:5,   y:158, w:73, h:34, label:'🏛️ Civil\nRegistry',               fill:'#E8ECF4', stroke:'#003087', tip:`Civil Registry publishes citizen events (registration updates, document requests) to the Service Bus. The Notification, Document Generation, and Payment services pick them up and respond — no direct coupling.`},
        { id:'g2', x:83,  y:158, w:73, h:34, label:'💼 Business\nRegistry',             fill:'#E8ECF4', stroke:'#003087', tip:`Business Registry uses all five shared services: notifications for application updates, SSO for business owner login, document generation for licences, search for business lookup, and payment for registration fees.`},
        { id:'g3', x:161, y:158, w:73, h:34, label:'📍 Address\nRegistry',              fill:'#E8ECF4', stroke:'#003087', tip:`Address Registry publishes address validation events. The shared Search service indexes all address data. Citizens find any address through the one shared search interface.`},
        { id:'g4', x:239, y:158, w:73, h:34, label:'🧾 TaxPayer\nRegistry',             fill:'#E8ECF4', stroke:'#003087', tip:`TaxPayer Registry uses the shared Payment Service for tax fee collection and the shared Document Generation service for tax certificates and receipts.`},
        { id:'g5', x:317, y:158, w:79, h:34, label:'📋 Business\nLicense Reg',          fill:'#E8ECF4', stroke:'#003087', tip:`Business License Registry issues digital licences via the shared Document Generation service. Renewal notifications go through the shared Notification service. Fees collected via shared Payment service.`},
        { id:'g6', x:401, y:158, w:55, h:34, label:'🏠 Land\nRegistry',                 fill:'#E8ECF4', stroke:'#003087', tip:`Land Registry publishes title and ownership events to the Service Bus. Title documents are generated by the shared Document Generation service. Searches are handled by shared Search.`},
      ],
      arrows: [
        /* 5 services → Service Bus (down arrows) */
        { x1:51,  y1:50,  x2:130, y2:85  },
        { x1:141, y1:50,  x2:175, y2:85  },
        { x1:231, y1:50,  x2:230, y2:85  },
        { x1:321, y1:50,  x2:285, y2:85  },
        { x1:411, y1:50,  x2:340, y2:85  },
        /* Service Bus → 6 registries (down arrows) */
        { x1:110, y1:123, x2:41,  y2:158, curve:true },
        { x1:160, y1:123, x2:119, y2:158 },
        { x1:210, y1:123, x2:197, y2:158 },
        { x1:260, y1:123, x2:275, y2:158 },
        { x1:310, y1:123, x2:356, y2:158, curve:true },
        { x1:360, y1:123, x2:428, y2:158, curve:true },
      ],
      labels: [
        { x:5, y:80,  text:'5 shared services ↓ via Service Bus ↓ to all 6 registries', color:'#0078D4' },
      ]
    },
    metrics: [
      { label:'Shared services\nbuilt once', value:'5',    color:'#107C10' },
      { label:'All 6 registries\nfully named', value:'✓', color:'#107C10' },
      { label:'Duplicate code\neliminated',  value:'~60%', color:'#107C10' },
      { label:'Upgrade benefits\nall registries', value:'Auto', color:'#107C10' },
    ]
  },
    /* 4 — PARALLEL EXECUTION */
  {
    color: '#6B4FA8',
    flow: {
      nodes: [
        /* Hub */
        { id:'hub', x:155, y:140, w:170, h:44, label:'API Mocks Live\nAll 6 streams work independently',fill:'#6B4FA8', stroke:'#6B4FA8', white:true,
          tip:`Azure API Management activates mock (simulated) API responses early in the programme. From this moment, every team can work against realistic data without waiting for real backend systems to be built. This single action is what makes six teams working simultaneously possible.`},
        /* 6 stream nodes arranged around the hub */
        { id:'s1', x:10,  y:10,  w:132, h:42, label:'🏗️ Core Platform\nBuilds shared foundation',fill:'#E8F3FC', stroke:'#0078D4',
          tip:`The Core Platform team builds the shared infrastructure that all other streams depend on — cloud servers, the API gateway, security vault, and shared messaging. They start first and everything else is built on top of what they deliver.`},
        { id:'s2', x:338, y:10,  w:132, h:42, label:'🔗 Integration\nConnects 6 registries',fill:'#E8ECF4', stroke:'#003087',
          tip:`The Integration team designs how the six government registries (Civil, Business, Land, Vehicle, Health, Education) connect to the citizen portal. They define the API contracts first, then activate mock responses so all other teams can work without waiting for the real connections to be built.`},
        { id:'s3', x:10,  y:180, w:132, h:42, label:'🎨 Frontend / UX\nBuilds citizen portal',fill:'#EEF4FC', stroke:'#2B9BF4',
          tip:`The Frontend team builds what citizens actually see and use — the website and mobile app. They start from day one using the mock API responses, so they never wait for backend services. By the time real data is available, the portal is already built and tested.`},
        { id:'s4', x:338, y:180, w:132, h:42, label:'🛡️ Security\nProtects from day one',fill:'#DFF6DD', stroke:'#107C10',
          tip:`The Security team implements protections from the very first day — not as an afterthought at the end. Zero-trust access controls, continuous threat monitoring, and compliance checks are all active while other teams are still building features.`},
        { id:'s5', x:10,  y:310, w:132, h:42, label:'⚙️ DevOps\nAutomates delivery',fill:'#F3EFF9', stroke:'#6B4FA8',
          tip:`The DevOps team builds the automated production line that takes code from a developer's computer to the live portal. They set this up in the first week so every other team can deploy automatically from day one — no manual releases, no waiting.`},
        { id:'s6', x:338, y:310, w:132, h:42, label:'🗄️ Data & Migration\nMoves government data',fill:'#FBF3EE', stroke:'#C55A00',
          tip:`The Data team prepares existing government data for the new platform — cleaning it, transforming it, and migrating it safely. They work in parallel with all other streams, doing dry runs of the data migration well before go-live so there are no surprises.`},
        /* Result */
        { id:'result', x:80,  y:366, w:320, h:42, label:'6 teams × simultaneous work = 30–40% faster delivery',fill:'#DFF6DD', stroke:'#107C10',
          tip:`Because all six teams work at the same time instead of one after another, the total delivery time is compressed by 30–40%. Work that would take 18–24 months sequentially is completed in a fraction of the time.`},
      ],
      arrows: [
        /* Hub connects to all streams */
        { x1:200, y1:140, x2:76,  y2:52,  curve:true, color:'#6B4FA8' },
        { x1:280, y1:140, x2:404, y2:52,  curve:true, color:'#6B4FA8' },
        { x1:155, y1:162, x2:76,  y2:180 },
        { x1:325, y1:162, x2:338, y2:180 },
        { x1:155, y1:162, x2:76,  y2:310, curve:true, color:'#6B4FA8' },
        { x1:325, y1:162, x2:338, y2:310, curve:true, color:'#6B4FA8' },
        /* Streams feed into result */
        { x1:76,  y1:352, x2:200, y2:366, curve:true },
        { x1:240, y1:222, x2:240, y2:366, color:'#107C10' },
        { x1:404, y1:352, x2:280, y2:366, curve:true },
      ],
      labels: [
        { x:10, y:128, text:'← API mocks unlock all 6 streams simultaneously', color:'#6B4FA8' },
      ]
    },
    metrics: [
      { label:'Delivery\ncompression', value:'30–40%', color:'#6B4FA8' },
      { label:'Teams working\nsimultaneously', value:'6',      color:'#6B4FA8' },
      { label:'Wait time\neliminated', value:'~0',     color:'#107C10' },
      { label:'API mocks unlock\nparallel work', value:'Early',  color:'#0078D4' },
    ]
  },
  /* 5 — INCREMENTAL DELIVERY */
  {
    color: '#0078D4',
    flow: {
      nodes: [
        { id:'i1', x:15,  y:25,  w:85,  h:38, label:'Sprint\nPlanning',fill:'#E8F3FC', stroke:'#0078D4', tip:`At the start of every 2-week sprint, the team selects features from the backlog and commits to a specific goal. Nothing enters the sprint without an approved Definition of Ready — acceptance criteria defined, dependencies clear.`},
        { id:'i2', x:120, y:25,  w:85,  h:38, label:'Build &\nTest',fill:'#0078D4', stroke:'#0078D4', white:true, tip:`Developers build features, write automated tests, and review each other's code. The CI/CD pipeline runs on every commit — catching problems within minutes rather than at the end of the sprint.` },
        { id:'i3', x:225, y:25,  w:85,  h:38, label:'Sprint\nDemo ✓',fill:'#DFF6DD', stroke:'#107C10', tip:`At the end of every sprint (every 2 weeks), working software is demonstrated to stakeholders — government staff, business owners, and sometimes pilot citizens. Feedback is captured immediately.`},
        { id:'i4', x:330, y:25,  w:90,  h:38, label:'Feedback\ncaptured',fill:'#FFF4CE', stroke:'#C55A00', tip:`Stakeholder feedback from the sprint demo goes directly into the Azure DevOps backlog as new or updated user stories. The next sprint can incorporate this feedback — maximum 2 weeks between seeing a problem and having it fixed.`},
        { id:'i5', x:15,  y:120, w:85,  h:38, label:'Sprint 2\nPlanning',fill:'#E8F3FC', stroke:'#0078D4', tip:`Sprint 2 begins immediately, incorporating the feedback from Sprint 1. The team now has two weeks of real-world learning built into their plan.`},
        { id:'i6', x:120, y:120, w:85,  h:38, label:'Build &\nTest',fill:'#0078D4', stroke:'#0078D4', white:true, tip:`Build continues, now informed by Sprint 1 feedback. The automated test suite grows with every sprint — protecting all previously delivered features from accidental regression.`},
        { id:'i7', x:225, y:120, w:85,  h:38, label:'Feature Flag\nDeploy',fill:'#F3EFF9', stroke:'#6B4FA8', tip:`New features are deployed to the live production infrastructure but hidden behind a feature flag in Azure App Configuration. Government staff can test it in production without citizens seeing it. When ready, the flag is toggled on — no code redeploy needed.`},
        { id:'i8', x:330, y:120, w:90,  h:38, label:'Citizens see\nnew feature ✓',fill:'#DFF6DD', stroke:'#107C10', tip:`Once internal testing confirms the feature works correctly in production, the feature flag is switched on. Citizens see the new service. If any issue is detected, the flag switches off instantly — rollback in under 5 minutes.`},
        { id:'i9', x:105, y:215, w:240, h:38, label:'Repeat every 2 weeks\n→ progressive registry onboarding',fill:'#003087', stroke:'#003087', white:true, tip:`This 2-week sprint cycle repeats throughout the programme. Each registry is onboarded progressively — one at a time — so citizens start benefiting from individual services well before the full programme is complete.`},
        { id:'i10',x:15,  y:275, w:155, h:38, label:'Traditional: 18 months\nthen big-bang launch',fill:'#FDE7E9', stroke:'#A4262C', tip:`Traditional government digital projects build everything in secret for 18–24 months, then launch everything at once. If anything is wrong, the entire system must be taken down for emergency fixes.`},
        { id:'i11',x:285, y:275, w:155, h:38, label:'DGTP: working features\nevery 2 weeks',fill:'#DFF6DD', stroke:'#107C10', tip:`DGTP delivers working, tested, deployed features every two weeks. Stakeholders see real progress. Problems are caught early. Citizens start benefiting from individual services months before the full programme is complete.`},
      ],
      arrows: [
        { x1:100,  y1:44,  x2:120, y2:44  },
        { x1:205,  y1:44,  x2:225, y2:44  },
        { x1:310,  y1:44,  x2:330, y2:44  },
        { x1:375,  y1:63,  x2:375, y2:120, dashed:true, color:'#C55A00' },
        { x1:100,  y1:139, x2:120, y2:139 },
        { x1:205,  y1:139, x2:225, y2:139 },
        { x1:310,  y1:139, x2:330, y2:139 },
        { x1:225,  y1:158, x2:225, y2:215 },
      ],
      labels: [
        { x:350, y:100, text:'↓ feeds back', color:'#C55A00' },
      ]
    },
    metrics: [
      { label:'Sprint length', value:'2 wks',  color:'#0078D4' },
      { label:'Max wait for\nfeedback', value:'2 wks',  color:'#0078D4' },
      { label:'Feature flag\nrollback', value:'<5 min', color:'#107C10' },
      { label:'Sprint reviews\nper programme', value:'16+',   color:'#003087' },
    ]
  },
  /* 6 — GOVERNANCE BY DESIGN */
  {
    color: '#C55A00',
    flow: {
      nodes: [
        { id:'g1', x:145, y:15,  w:155, h:40, label:'Any change is\nrequested',fill:'#E8ECF4', stroke:'#5A6B7A', tip:`Any change to the system — a new feature, a bug fix, an infrastructure update, a configuration change — follows the same mandatory path. No change is made outside this process.`},
        { id:'g2', x:15,  y:95,  w:120, h:40, label:'Change Request\nwork item created ✍️',fill:'#FFF4CE', stroke:'#C55A00', tip:`A Change Request work item is created in Azure DevOps Boards — replacing email chains entirely. It captures: what is changing, why, the rollback plan, and who must approve it. This is the official record of every change in the programme.`},
        { id:'g3', x:155, y:95,  w:120, h:40, label:'Azure Policy\nauto-validates',fill:'#C55A00', stroke:'#C55A00', white:true, tip:`Azure Policy automatically checks whether the proposed change complies with all rules: data residency, encryption standards, network security, tagging requirements. Non-compliant changes are blocked before any human reviews them.`},
        { id:'g4', x:295, y:95,  w:120, h:40, label:'ARB gate if\narchitecture change',fill:'#C55A00', stroke:'#C55A00', white:true, tip:`If the change affects the system architecture, it must be reviewed and approved by the Architecture Review Board before it can enter development. This gate is enforced in Azure DevOps — the feature cannot enter a sprint without the ARB approval tag.`},
        { id:'g5', x:15,  y:195, w:120, h:40, label:'Pipeline runs\n→ auto audit record',fill:'#003087', stroke:'#003087', white:true, tip:`When the change is built and deployed, the Azure Pipelines run automatically creates an immutable audit record: who triggered it, what was deployed, which tests passed, which approvals were given, and what changed. This record cannot be altered or deleted.`},
        { id:'g6', x:155, y:195, w:120, h:40, label:'All actions logged\nimmutably 2 years',fill:'#003087', stroke:'#003087', white:true, tip:`Every action — every code commit, every approval, every deployment, every configuration change, every admin login — is logged in Azure Log Analytics with 2-year immutable retention. Auditors can inspect any action at any time without anyone preparing a report.`},
        { id:'g7', x:295, y:195, w:120, h:40, label:'Compliance report\nauto-generated ✓',fill:'#DFF6DD', stroke:'#107C10', tip:`Microsoft Defender for Cloud generates a daily compliance report showing how every DGTP resource maps against the relevant security benchmarks. This report is always current and available to NRPB and Steering Committee — no preparation required for any audit.`},
        { id:'g8', x:155, y:285, w:120, h:40, label:'Audit-ready\nat any moment ✓',fill:'#DFF6DD', stroke:'#107C10', tip:`Because every action is automatically logged and every compliance report is auto-generated, DGTP is ready for an audit on any day — without any preparation. There is no &quot;getting ready for the audit&quot; — the audit trail is always complete.`},
      ],
      arrows: [
        { x1:222, y1:55,  x2:75,  y2:95,  curve:true },
        { x1:222, y1:55,  x2:215, y2:95  },
        { x1:222, y1:55,  x2:355, y2:95,  curve:true },
        { x1:75,  y1:135, x2:75,  y2:195 },
        { x1:215, y1:135, x2:215, y2:195 },
        { x1:355, y1:135, x2:355, y2:195 },
        { x1:75,  y1:235, x2:215, y2:285, curve:true },
        { x1:215, y1:235, x2:215, y2:285 },
        { x1:355, y1:235, x2:215, y2:285, curve:true },
      ],
      labels: []
    },
    metrics: [
      { label:'Manual governance\nsteps', value:'0',     color:'#107C10' },
      { label:'Audit trail\ncompleteness', value:'100%',  color:'#107C10' },
      { label:'Compliance report\nprep time', value:'0 min', color:'#107C10' },
      { label:'Log retention\n(immutable)', value:'2 yrs', color:'#C55A00' },
    ]
  },
  /* 7 — ZERO-TRUST SECURITY */
  {
    color: '#107C10',
    flow: {
      nodes: [
        { id:'z1', x:150, y:15,  w:145, h:40, label:'Any request arrives\n(citizen or service)',fill:'#E8F3FC', stroke:'#0078D4', tip:`Every request to the DGTP platform — whether from a citizen on their phone, a government staff member, or an automated service — goes through exactly the same verification process. There is no &quot;trusted network&quot; or &quot;inside the firewall&quot; shortcut.`},
        { id:'z2', x:150, y:90,  w:145, h:40, label:'Step 1: Entra ID\nJWT verified',fill:'#107C10', stroke:'#107C10', white:true, tip:`The request must carry a valid JWT (JSON Web Token) — a short-lived digital credential issued by Microsoft Entra ID. Azure API Management checks this token on every single request. An expired token, a forged token, or a missing token means instant rejection — no exceptions.`},
        { id:'z3', x:150, y:165, w:145, h:40, label:'Step 2: APIM policy\nrate limit + rights',fill:'#107C10', stroke:'#107C10', white:true, tip:`Azure API Management checks that the identity in the token is allowed to call this specific endpoint, and that they haven't exceeded their request rate limit. A citizen account cannot call admin endpoints. An admin account cannot call another organisation's data.` },
        { id:'z4', x:150, y:240, w:145, h:40, label:'Step 3: Private Link\nno public internet',fill:'#107C10', stroke:'#107C10', white:true, tip:`When the request reaches a database or storage service, it travels through Azure Private Endpoint — a private network connection inside Azure. There is no public internet path to any citizen data. Even if an attacker breaches the API layer, they cannot reach the databases directly.`},
        { id:'z5', x:150, y:315, w:145, h:40, label:'Data returned\nmin. privilege only ✓',fill:'#DFF6DD', stroke:'#107C10', tip:`Only the minimum data required for the specific request is returned. A citizen can only see their own records. A government clerk can only see data their role permits. No bulk data extraction is possible through normal API calls.`},
        { id:'z6', x:10,  y:165, w:120, h:40, label:'❌ Invalid token?\nSentinel alert',fill:'#FDE7E9', stroke:'#A4262C', tip:`If a request arrives with an invalid, expired, or suspicious token, Microsoft Sentinel is alerted immediately. Automated SOAR playbooks can block the IP at Azure Front Door within seconds — no human needs to make that decision.`},
        { id:'z7', x:10,  y:240, w:120, h:40, label:'🤖 SOAR playbook\nblocks in seconds',fill:'#FDE7E9', stroke:'#A4262C', tip:`Security Orchestration, Automation, and Response. When Sentinel detects a threat pattern — too many failed logins, unusual data access, known malicious IP — it automatically executes a response: blocking IPs, revoking credentials, isolating containers. No human needs to be awake at 3am to respond.`},
        { id:'z8', x:315, y:240, w:120, h:40, label:'👤 Admin needed?\nPIM: JIT 4hrs max',fill:'#FFF3CD', stroke:'#856404', tip:`If a developer or administrator genuinely needs elevated access — for example, to investigate a production incident — they request it through Entra ID Privileged Identity Management. A second person approves it. Access is granted for a maximum of 4 hours, then automatically revoked. Every action taken during that window is logged. This is what JIT (Just-In-Time) admin access means.`},
      ],
      arrows: [
        { x1:222, y1:55,  x2:222, y2:90  },
        { x1:222, y1:130, x2:222, y2:165 },
        { x1:150, y1:185, x2:130, y2:185, color:'#A4262C', dashed:true },
        { x1:70,  y1:205, x2:70,  y2:240 },
        { x1:222, y1:205, x2:222, y2:240 },
        { x1:222, y1:280, x2:222, y2:315 },
        { x1:295, y1:260, x2:315, y2:260, dashed:true, color:'#856404' },
      ],
      labels: [
        { x:2,   y:153, text:'If invalid ←', color:'#A4262C' },
        { x:300, y:228, text:'If needed →',  color:'#856404' },
      ]
    },
    metrics: [
      { label:'Permanent admin\naccounts', value:'0',     color:'#107C10' },
      { label:'Public data\nendpoints', value:'0',     color:'#107C10' },
      { label:'Threat response\n(automated)', value:'<60s',  color:'#0078D4' },
      { label:'JIT admin\nmax window', value:'4 hrs', color:'#C55A00' },
    ]
  }
,
  /* 8 — AI-ACCELERATED DELIVERY */
  {
    color: '#8A2BE2',
    flow: {
      nodes: [
        { id:'ai1', x:10,  y:12,  w:108, h:38, label:'Claude CLI\n(via OpenRouter)',fill:'#F3EFF9', stroke:'#8A2BE2',
          tip:`Claude CLI is an AI assistant working in the developer terminal. Connected through OpenRouter, it reviews code as it is written, catches security issues before the pipeline runs, suggests improvements, and writes draft tests. Think of it as a highly experienced colleague available to every developer at all times.`},
        { id:'ai2', x:130, y:12,  w:108, h:38, label:'GitHub Copilot\nCode Generation',fill:'#F3EFF9', stroke:'#8A2BE2',
          tip:`GitHub Copilot watches what the developer is typing and predicts the next lines of code — like autocomplete for entire functions. Studies show developers write 30-55% more code per day with Copilot. For DGTP, features that would take a week are completed in 3 days.`},
        { id:'ai3', x:250, y:12,  w:108, h:38, label:'Azure OpenAI\nSpec to Code',fill:'#F3EFF9', stroke:'#8A2BE2',
          tip:`Azure OpenAI reads a plain-English requirement and generates a draft API implementation, test cases, and documentation automatically. A business analyst writes the requirement in plain language; the AI produces working draft code for the developer to review and refine.`},
        { id:'ai4', x:370, y:12,  w:108, h:38, label:'Azure AI Services\nDoc + Search',fill:'#F3EFF9', stroke:'#8A2BE2',
          tip:`Azure AI Services read government documents automatically — application forms, registry records, identity documents — and extract relevant fields. Citizens upload a document; the AI reads it and pre-fills the form. Manual data entry is eliminated entirely.`},
        { id:'pipe', x:100, y:90,  w:280, h:38, label:'Azure Pipelines — AI-Augmented CI/CD',fill:'#8A2BE2', stroke:'#8A2BE2', white:true,
          tip:`The CI/CD pipeline is the automated production line taking code from a developer to the live portal. Every stage has AI working alongside it — not replacing human judgement, but handling repetitive analysis so humans focus on decisions.`},
        { id:'g1', x:10,  y:164, w:100, h:38, label:'AI Code\nReview',fill:'#EDE3FF', stroke:'#8A2BE2',
          tip:`Before any human reviewer looks at new code, Claude CLI reviews it automatically: checking for mistakes, security vulnerabilities, coding standard violations, and missing tests. Human reviewers then focus on business logic and architecture — not spotting typos.`},
        { id:'g2', x:120, y:164, w:100, h:38, label:'AI Test\nGeneration',fill:'#EDE3FF', stroke:'#8A2BE2',
          tip:`Azure OpenAI generates draft automated tests based on the submitted code. Instead of a developer spending half a day writing test cases, the AI produces them in minutes. The developer reviews, adjusts, and approves. Coverage that took days now takes hours.`},
        { id:'g3', x:230, y:164, w:100, h:38, label:'AI Security\nAnalysis',fill:'#EDE3FF', stroke:'#8A2BE2',
          tip:`Microsoft Defender for DevOps, augmented by AI pattern recognition, scans every code change for security vulnerabilities. The AI explains in plain language what the problem is, why it matters, and how to fix it — making security accessible to every developer.`},
        { id:'g4', x:340, y:164, w:100, h:38, label:'AI Performance\nPrediction',fill:'#EDE3FF', stroke:'#8A2BE2',
          tip:`Azure Monitor AI analyses code changes and predicts performance impact before expensive load testing runs. This early warning lets developers address performance issues earlier, saving time and cloud costs.`},
        { id:'hitl', x:100, y:238, w:280, h:44, label:'Human-in-the-Loop Gate\n👤 Developer reviews · ✓ approves · or ✗ rejects AI output',fill:'#FFF4CE', stroke:'#C55A00',
          tip:`This is the most important element of the AI strategy. Every AI output passes through a human decision point before it can proceed. AI accelerates the work; humans remain accountable for every decision. No AI output ever reaches citizens without a human having reviewed and approved it.`},
        { id:'o1', x:10,  y:318, w:130, h:38, label:'30-55% faster\ncode delivery',fill:'#DFF6DD', stroke:'#107C10',
          tip:`Research across government and enterprise programmes shows AI-assisted developers deliver features 30-55% faster. For DGTP this significantly compresses the traditional 18–24 month government IT delivery timeline with the available team size.`},
        { id:'o2', x:155, y:318, w:130, h:38, label:'Fewer defects\nreaching citizens',fill:'#DFF6DD', stroke:'#107C10',
          tip:`AI catches issues at code stage — before testing, before deployment. The defect escape rate drops by an estimated 40% compared to programmes without AI-assisted review.`},
        { id:'o3', x:300, y:318, w:140, h:38, label:'Humans focus on\nbusiness value',fill:'#DFF6DD', stroke:'#107C10',
          tip:`When AI handles repetitive review, test writing, and documentation, developers and architects spend their time on what matters: business logic, citizen experience, and integration design.`},
      ],
      arrows: [
        { x1:64,  y1:50,  x2:170, y2:90,  curve:true, color:'#8A2BE2' },
        { x1:184, y1:50,  x2:220, y2:90,  curve:true, color:'#8A2BE2' },
        { x1:304, y1:50,  x2:270, y2:90,  curve:true, color:'#8A2BE2' },
        { x1:424, y1:50,  x2:320, y2:90,  curve:true, color:'#8A2BE2' },
        { x1:130, y1:128, x2:60,  y2:164 },
        { x1:200, y1:128, x2:170, y2:164 },
        { x1:270, y1:128, x2:280, y2:164 },
        { x1:340, y1:128, x2:390, y2:164 },
        { x1:60,  y1:202, x2:180, y2:238, curve:true, color:'#C55A00' },
        { x1:170, y1:202, x2:215, y2:238, color:'#C55A00' },
        { x1:280, y1:202, x2:255, y2:238, color:'#C55A00' },
        { x1:390, y1:202, x2:300, y2:238, curve:true, color:'#C55A00' },
        { x1:165, y1:282, x2:75,  y2:318, curve:true },
        { x1:240, y1:282, x2:220, y2:318 },
        { x1:310, y1:282, x2:370, y2:318, curve:true },
      ],
      labels: [
        { x:10, y:80,  text:'AI tools feed into every stage ↓', color:'#8A2BE2' },
        { x:10, y:156, text:'AI augments each pipeline gate ↓',  color:'#8A2BE2' },
        { x:10, y:230, text:'Human reviews every AI output ↓',   color:'#C55A00' },
        { x:10, y:310, text:'Outcomes ↓',                         color:'#107C10' },
      ]
    },
    metrics: [
      { label:'Developer\nproductivity gain', value:'30-55%', color:'#8A2BE2' },
      { label:'Defect escape\nrate reduction', value:'~40%',   color:'#107C10' },
      { label:'AI outputs with\nhuman approval', value:'100%',   color:'#C55A00' },
      { label:'AI tools\nin pipeline', value:'4+',     color:'#8A2BE2' },
    ]
  }
];


/* ── SVG FLOWCHART BUILDER ─────────────────────────────────────────── */
function buildFlowSVG(flow, color, principleIdx) {
  const W = 480, H = 430;
  let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" font-family="Arial,Helvetica,sans-serif" class="pf-svg" id="pfsvg-${principleIdx}">`;

  s += `<defs>
    <marker id="pfarr${principleIdx}" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="${color}"/></marker>
    <marker id="pfarrRed${principleIdx}" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#A4262C"/></marker>
    <marker id="pfarrAmber${principleIdx}" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#856404"/></marker>
  </defs>`;

  // Arrows (behind nodes)
  flow.arrows.forEach((a, ai) => {
    const markerUrl = a.color === '#A4262C' ? `url(#pfarrRed${principleIdx})` : a.color === '#856404' ? `url(#pfarrAmber${principleIdx})` : `url(#pfarr${principleIdx})`;
    const stroke = a.color || color;
    const dash   = a.dashed ? 'stroke-dasharray="5,3"' : '';
    const delay  = (ai * 0.12).toFixed(2);
    if (a.curve) {
      const mx = (a.x1 + a.x2) / 2, my = (a.y1 + a.y2) / 2 - 20;
      s += `<path d="M${a.x1},${a.y1} Q${mx},${my} ${a.x2},${a.y2}" fill="none" stroke="${stroke}" stroke-width="1.5" ${dash} marker-end="${markerUrl}" class="pf-arrow" style="animation-delay:${delay}s"/>`;
    } else {
      s += `<line x1="${a.x1}" y1="${a.y1}" x2="${a.x2}" y2="${a.y2}" stroke="${stroke}" stroke-width="1.5" ${dash} marker-end="${markerUrl}" class="pf-arrow" style="animation-delay:${delay}s"/>`;
    }
  });

  // Nodes + tooltip overlay
  flow.nodes.forEach((n, ni) => {
    const delay = (ni * 0.09).toFixed(2);
    const textColor = n.white ? 'white' : '#1A2332';
    const lines = n.label.split('\n');
    const ty = n.y + n.h / 2 - (lines.length - 1) * 7;
    const safeId = `pfn-${principleIdx}-${ni}`;
    const tipText = (n.tip || '').replace(/"/g, '&quot;');

    s += `<g class="pf-node pf-node-hover" id="${safeId}" style="animation-delay:${delay}s; cursor:${n.tip ? 'pointer' : 'default'};">
      <rect x="${n.x}" y="${n.y}" width="${n.w}" height="${n.h}" rx="6" fill="${n.fill}" stroke="${n.stroke}" stroke-width="1.5" class="pf-node-rect"/>
      ${lines.map((l, li) => `<text x="${n.x + n.w/2}" y="${ty + li * 14}" text-anchor="middle" font-size="9.5" font-weight="700" fill="${textColor}">${l}</text>`).join('')}
      ${n.tip ? `<rect x="${n.x}" y="${n.y}" width="${n.w}" height="${n.h}" rx="6" fill="transparent" stroke="transparent" stroke-width="0" class="pf-tip-overlay"
        data-tip="${tipText}" data-pid="${principleIdx}" data-nid="${ni}"
        onmouseenter="showFlowTip(event, this)" onmouseleave="hideFlowTip()"/>` : ''}
    </g>`;
  });

  // Extra labels
  (flow.labels || []).forEach(l => {
    s += `<text x="${l.x}" y="${l.y}" font-size="9" fill="${l.color}" font-style="italic">${l.text}</text>`;
  });

  s += `</svg>`;
  return s;
}

/* ── METRICS STRIP BUILDER ─────────────────────────────────────────── */
function buildMetricsStrip(metrics, color) {
  return `<div class="pf-metrics">
    ${metrics.map((m, i) => `
      <div class="pf-metric" style="animation-delay:${i * 0.15}s">
        <div class="pf-metric-value" style="color:${m.color}">${m.value}</div>
        <div class="pf-metric-label">${m.label.replace('\n','<br>')}</div>
      </div>`).join('')}
  </div>`;
}

/* ── OPEN PRINCIPLE MODAL ──────────────────────────────────────────── */
window.openPrincipleDetail = function(i) {
  const p  = PRINCIPLES_VIZ[i];
  const pd = PRINCIPLE_DETAILS_BRIEF[i];
  const pb = PRINCIPLES_BRIEF[i];
  if (!p || typeof openModal !== 'function') return;

  const flowSVG   = buildFlowSVG(p.flow, p.color, i);
  const metricsHTML = buildMetricsStrip(p.metrics, p.color);

  const body = `
    <div class="pf-wrap">
      <!-- Flowchart -->
      <div class="pf-chart-section">
        <div class="pf-chart-label">How it works</div>
        <div class="pf-chart-box">${flowSVG}</div>
      </div>
      <!-- Success metrics -->
      <div class="pf-metrics-section">
        <div class="pf-chart-label">Success metrics</div>
        ${metricsHTML}
      </div>
      <!-- Azure tools -->
      <div class="pf-tools-section">
        <div class="pf-chart-label">Azure services</div>
        ${mtags(pd.tools)}
      </div>
    </div>`;

  openModal(pb.icon, pd.title, pd.sub, body);
};

/* ── BRIEF METADATA (title, sub, tools per principle) ──────────────── */
const PRINCIPLE_DETAILS_BRIEF = [
  { title:'Shift Left',               sub:'Catch issues at the beginning — not the end',              tools:['Defender for DevOps','Azure Policy CI Gates','Azure Repos Branch Policy','Playwright Accessibility Scan'] },
  { title:'Automate Everything',      sub:'Zero manual steps from commit to production',               tools:['Azure Pipelines YAML','Azure Bicep IaC','Azure Test Plans','Azure Container Registry'] },
  { title:'Standardize Patterns',     sub:'Decide once, reuse everywhere',                             tools:['Azure API Management Developer Portal','Azure Bicep Module Library','Helm Charts','OpenAPI 3.0'] },
  { title:'Reuse Before Build',       sub:'Five shared services consumed by all six registries',        tools:['Azure Communication Services','Entra External ID','Document Generation Service','Azure AI Search','Payment Service'] },
  { title:'Parallel Execution',       sub:'Six teams working simultaneously from Day 1',               tools:['Azure API Management Mocks','Azure DevOps Delivery Plans','Azure DevOps Multi-Team','Postman Newman'] },
  { title:'Incremental Delivery',     sub:'Working software every two weeks — not once at the end',    tools:['Azure Pipelines Release Gates','Azure App Configuration Feature Flags','Azure DevOps Sprint Boards','Azure DevOps Analytics'] },
  { title:'Governance by Design',     sub:'Compliance and audit trails happen automatically',           tools:['Azure Policy Deny Effects','Azure DevOps Audit Log','Defender for Cloud Compliance','Azure Log Analytics 2yr'] },
  { title:'Zero-Trust Security',      sub:'Verify everyone, trust nobody, protect everything',         tools:['Microsoft Entra ID PIM','Azure Private Endpoints','Microsoft Sentinel SOAR','Defender for Cloud Secure Score'] },
  { title:'AI-Accelerated Delivery',  sub:'AI writes, reviews, tests and monitors code — humans decide',  tools:['Claude CLI via OpenRouter','GitHub Copilot','Azure OpenAI','Azure AI Services','Human-in-the-Loop Gates'] },
];


/* ── BREAK SOUND — Web Audio API beep ────────────────────────────── */
window.playBreakSound = function() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();

    // Short warning beep sequence: two descending tones
    const tones = [
      { freq: 880, start: 0,    dur: 0.12 },
      { freq: 660, start: 0.14, dur: 0.18 },
    ];

    tones.forEach(({ freq, start, dur }) => {
      const osc   = ctx.createOscillator();
      const gain  = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + start);

      gain.gain.setValueAtTime(0, ctx.currentTime + start);
      gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + start + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + dur);

      osc.start(ctx.currentTime + start);
      osc.stop(ctx.currentTime + start + dur + 0.05);
    });

    // Visual feedback: briefly shake the clicked badge
    const badge = event && event.currentTarget;
    if (badge) {
      badge.classList.add('chf-shake');
      setTimeout(() => badge && badge.classList.remove('chf-shake'), 400);
    }
  } catch(e) {
    // AudioContext not available — silently ignore
  }
};

document.addEventListener('DOMContentLoaded', buildChallengesFigure);

/* ── FLOW NODE TOOLTIP ──────────────────────────────────────────────── */
(function() {
  let tipEl = null;

  function ensureTip() {
    if (tipEl) return;
    tipEl = document.createElement('div');
    tipEl.id = 'flow-tip';
    tipEl.className = 'flow-tip';
    document.body.appendChild(tipEl);
  }

  window.showFlowTip = function(e, el) {
    ensureTip();
    const text = el.getAttribute('data-tip');
    if (!text) return;
    tipEl.textContent = text;
    tipEl.classList.add('visible');
    positionTip(e);
    // Highlight the node rect
    const nodeG = el.closest('g.pf-node-hover');
    if (nodeG) nodeG.classList.add('pf-node-active');
  };

  window.hideFlowTip = function() {
    if (tipEl) tipEl.classList.remove('visible');
    document.querySelectorAll('.pf-node-active').forEach(g => g.classList.remove('pf-node-active'));
  };

  function positionTip(e) {
    if (!tipEl) return;
    const x = e.clientX, y = e.clientY;
    const tw = tipEl.offsetWidth  || 260;
    const th = tipEl.offsetHeight || 80;
    const vw = window.innerWidth, vh = window.innerHeight;
    let left = x + 14;
    let top  = y - 10;
    if (left + tw + 16 > vw) left = x - tw - 14;
    if (top + th + 16 > vh) top  = y - th - 10;
    if (top < 8) top = 8;
    tipEl.style.left = left + 'px';
    tipEl.style.top  = top  + 'px';
  }

  document.addEventListener('mousemove', e => {
    if (tipEl && tipEl.classList.contains('visible')) positionTip(e);
  });
})();
