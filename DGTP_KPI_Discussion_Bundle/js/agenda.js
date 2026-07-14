'use strict';
/* ═══════════════════════════════════════════════════════════════════════
   AGENDA.JS — Meeting agenda matching actual HTML sections
   Pure non-technical language throughout
   60-minute meeting: 45 min presentation + 15 min Q&A
═══════════════════════════════════════════════════════════════════════ */

const AGENDA_ITEMS = [
  {
    time: '09:00 – 09:05',
    num: '01',
    title: 'Welcome &amp; What We Are Here to Decide', sectionId: 'hero', sectionLabel: 'Project Overview',
    duration: '5 min',
    color: '#003087',
    icon: '👋',
    summary: 'A quick welcome and a clear statement of what this meeting is for — not a technical briefing, but a decision about how we deliver faster.',
    details: 'The Application Integration Expert opens the meeting, introduces all attendees, and frames the single question this session needs to answer: "Do we agree on the approach that will allow Sint Maarten\'s e-government services to be delivered in months rather than years?" No technical jargon — just a clear statement of the opportunity.',
    sub: [
      { t: 'Why we are here', d: 'Sint Maarten needs digital government services — online portals, connected registries, faster citizen experience. This meeting agrees on the smartest way to build them without wasting time or budget.' },
      { t: 'What success looks like today', d: 'By the end of this meeting, all attendees understand how Orange bd proposes to deliver the programme, have seen the approach demonstrated visually, and have formally signed off on the strategy document.' },
      { t: 'How the session works', d: 'The Application Integration Expert presents the full strategy. Attendees ask questions at any point. A 15-minute Q&A is reserved at the end. Sign-off happens in the final 5 minutes.' },
    ]
  },
  {
    time: '09:05 – 09:11',
    num: '02',
    title: 'Why Government Digital Projects Usually Take Too Long', sectionId: 'challenges', sectionLabel: 'Delivery Challenges',
    duration: '6 min',
    color: '#A4262C',
    icon: '⚠️',
    summary: 'An honest look at why government digital programmes historically run over time and over budget — and confirmation that Sint Maarten faces the same barriers today.',
    details: 'Six common problems are presented using the interactive diagram in this section. Each problem is shown in plain language with its real-world consequence for Sint Maarten citizens and government staff. No blame — just a shared understanding of the starting point.',
    sub: [
      { t: 'Six challenges, shown visually', d: 'The interactive diagram on screen shows the six most common barriers: systems that don\'t talk to each other, manual paperwork, teams waiting on each other, building everything from scratch, legal complexity, and outdated technology. Click any one to see its impact on Sint Maarten.' },
      { t: 'What happens if we don\'t change', d: 'Without a new approach, a project of this size would take 18 to 24 months and cost significantly more than budgeted — based on comparable Caribbean and international government programmes.' },
      { t: 'Why this meeting matters', d: 'The strategy presented today directly solves each of these six challenges. The connection between problem and solution is shown throughout the presentation.' },
    ]
  },
  {
    time: '09:11 – 09:21',
    num: '03',
    title: 'Our Nine Commitments to Deliver Faster', sectionId: 'principles', sectionLabel: 'Nine Principles',
    duration: '10 min',
    color: '#0078D4',
    icon: '🎯',
    summary: 'Nine clear commitments that govern every decision in this programme — including AI-assisted delivery at the core. Each is presented in plain language with the specific time-saving benefit it brings.',
    details: 'Each of the nine principles is shown as an animated card on screen. Click any card to see a simple flowchart and the measurable benefit it delivers. These are not technical rules — they are delivery commitments that every stakeholder can hold the team accountable to.',
    sub: [
      { t: 'Find problems early, not late', d: 'Catching an issue at the planning stage costs a fraction of what it costs to fix after the system is built. Every week of early checking saves weeks of late-stage rework.' },
      { t: 'Let computers do the repetitive work', d: 'Everything that can be automated — testing, checking, deploying — is handled by the system. Human time is spent on decisions, not manual tasks.' },
      { t: 'Build once, use everywhere', d: 'Common functions like sending notifications, verifying identity, and reading documents are built once and shared across all six government registries — not rebuilt six times.' },
      { t: 'Our six specialist streams work at the same time', d: 'The Orange bd delivery team is structured into six specialist streams — Core Platform, Integration, Frontend, Security, DevOps, and Data. Instead of one stream finishing before the next begins, all six work in parallel from day one. This is the single biggest source of time savings.' },
      { t: 'Citizens see progress every two weeks', d: 'Working features are delivered every two weeks and shown to stakeholders for feedback — not hidden away for 18 months and revealed at the end.' },
      { t: 'Every decision has an automatic paper trail', d: 'Every approval, every change, every test result is automatically recorded. No manual report preparation is ever needed for an audit or review.' },
    ]
  },
  {
    time: '09:21 – 09:29',
    num: '04',
    title: 'How a Feature Goes from Idea to Live — Step by Step', sectionId: 'pipeline', sectionLabel: 'CI/CD Pipeline',
    duration: '8 min',
    color: '#005A9E',
    icon: '🔄',
    summary: 'A visual walkthrough of the ten-step journey every new feature takes — from the moment a developer writes code to the moment a citizen can use it.',
    details: 'The interactive pipeline diagram on screen shows each step in plain language. Hover any step to read a one-sentence explanation of what it does and why it matters. Click for more detail. This section answers the question: "How do we know the system is safe and working before it reaches the public?"',
    sub: [
      { t: 'The ten checkpoints every feature must pass', d: 'Code review, security scan, automated testing, performance check, business owner approval, security sign-off, and final approval before going live. No step can be skipped.' },
      { t: 'Two points where a human must say yes', d: 'Two of the ten steps require a real person to review and approve: the business owner confirms the feature meets their needs, and the oversight committee approves the go-live. All other steps are automated.' },
      { t: 'What happens if something goes wrong', d: 'If the new version causes problems after going live, the system automatically switches back to the previous working version within seconds — citizens never notice a problem.' },
    ]
  },
  {
    time: '09:29 – 09:43',
    num: '05',
    title: 'Measures of Success', sectionId: 'kpis', sectionLabel: 'Measures of Success',
    duration: '14 min',
    color: '#107C10',
    icon: '📊',
    summary: 'The specific numbers and outcomes that define a successful delivery — each one is measurable, automated, and visible to all stakeholders throughout the programme.',
    details: 'This section covers the KPI dashboard (what success looks like in numbers), the Security & Architecture overview for those who need it, and a walkthrough of the Review Rubric where formal sign-off is captured. The FAQ section addresses questions before the live Q&A.',
    sub: [
      { t: 'What success looks like in numbers', d: 'Features deployed daily. Every citizen request responded to in under 2 seconds. Less than 5% of releases cause any issue. The system recovers from any problem within one hour. At least 80% of testing done automatically.' },
      { t: 'How citizen data is kept safe', d: 'All government data stays in approved regions — never leaves Sint Maarten\'s approved cloud boundary. Everything is encrypted. No one has permanent admin access. The system is monitored 24 hours a day.' },
      { t: 'Formal review and sign-off', d: 'Each section of this presentation is assigned to the responsible role for review. Click any status badge in the Review Rubric to record your approval. This creates the official meeting record.' },
    ]
  },
  {
    time: '09:43 – 10:00',
    num: '06',
    title: 'Open Questions &amp; Answers', sectionId: 'faq', sectionLabel: 'FAQ',
    duration: '15 min',
    color: '#003087',
    icon: '💬',
    summary: '15 minutes for attendees to ask any question about the approach, the technology, the timeline, or the governance — answered in plain language.',
    details: 'All questions are welcomed. The FAQ section on screen already covers the most common questions from government stakeholders — if your question is already there, the answer is immediately visible. New questions raised today will be recorded as action items in the project system and answered formally within 48 hours.',
    sub: [
      { t: 'Questions already answered in the FAQ', d: 'The FAQ section covers 27 questions across seven topics: programme scope, how we deliver faster, how the six registries connect, the technology, security and privacy, testing, and citizen experience. Browse it before the Q&A to see if your question is already answered.' },
      { t: 'Questions raised today', d: 'Any question that cannot be fully answered in the session is recorded as an action item with a named owner and a 48-hour response commitment. No question is left unanswered.' },
      { t: 'Next steps after this meeting', d: 'Once sign-off is complete, the programme team begins mobilisation. All attendees receive the meeting notes and action log within 24 hours.' },
    ]
  },
];

/* ── BUILD HTML ──────────────────────────────────────────────────────── */
function buildAgenda() {
  const container = document.getElementById('agenda-list');
  if (!container) return;

  container.innerHTML = AGENDA_ITEMS.map((item, i) => `
    <div class="ag-item ${item.sub.length ? 'ag-expandable' : ''}" id="ag-${i}"
      onclick="${item.sub.length ? `toggleAgenda(${i})` : ''}">
      <div class="ag-main">
        <div class="ag-left">
          <div class="ag-num" style="background:${item.color};">${item.num}</div>
          <div class="ag-icon">${item.icon}</div>
        </div>
        <div class="ag-center">
          <div class="ag-title-row">
            <div class="ag-title">${item.title}</div>
            ${item.sectionId ? `<a class="ag-section-link" href="#${item.sectionId}" onclick="event.stopPropagation()" title="Jump to this section">
              ↗ ${item.sectionLabel}
            </a>` : ''}
          </div>
          <div class="ag-meta">
            <span class="ag-dur" style="border-color:${item.color};color:${item.color};">&#9200; ${item.duration}</span>
            <span class="ag-time">&#128336; ${item.time}</span>
          </div>
          <div class="ag-summary">${item.summary}</div>
        </div>
        ${item.sub.length ? `<div class="ag-chevron" id="ag-chev-${i}">&#9660;</div>` : '<div style="width:20px;"></div>'}
      </div>
      ${item.sub.length ? `
      <div class="ag-expanded" id="ag-exp-${i}">
        <div class="ag-detail-text">${item.details}</div>
        <div class="ag-sub-list">
          ${item.sub.map((s, si) => `
            <div class="ag-sub-item" onclick="event.stopPropagation();openAgendaSub('${i}-${si}')">
              <div class="ag-sub-dot" style="background:${item.color};"></div>
              <div>
                <div class="ag-sub-title">${s.t}</div>
                <div class="ag-sub-body">${s.d}</div>
              </div>
            </div>`).join('')}
        </div>
      </div>` : ''}
    </div>
  `).join('');
}

const agExpanded = {};
window.toggleAgenda = function(i) {
  agExpanded[i] = !agExpanded[i];
  const exp  = document.getElementById(`ag-exp-${i}`);
  const chev = document.getElementById(`ag-chev-${i}`);
  const item = document.getElementById(`ag-${i}`);
  if (!exp) return;
  if (agExpanded[i]) {
    exp.style.maxHeight = exp.scrollHeight + 'px';
    exp.style.opacity   = '1';
    if (chev) chev.innerHTML = '&#9650;';
    if (item) item.classList.add('ag-open');
  } else {
    exp.style.maxHeight = '0';
    exp.style.opacity   = '0';
    if (chev) chev.innerHTML = '&#9660;';
    if (item) item.classList.remove('ag-open');
  }
};

window.openAgendaSub = function(key) {
  const [i, si] = key.split('-').map(Number);
  const item = AGENDA_ITEMS[i];
  const sub  = item.sub[si];
  if (!sub || typeof openModal !== 'function') return;
  openModal(item.icon, sub.t, `Agenda Item ${item.num} — ${item.title}`,
    `<div class="detail-modal-desc">${sub.d}</div>
     <div class="detail-kpi-grid">
       <div class="detail-kpi"><div class="detail-kpi-label">Agenda Item</div><div class="detail-kpi-value">${item.num}</div></div>
       <div class="detail-kpi"><div class="detail-kpi-label">Time Slot</div><div class="detail-kpi-value">${item.time}</div></div>
       <div class="detail-kpi"><div class="detail-kpi-label">Duration</div><div class="detail-kpi-value">${item.duration}</div></div>
     </div>`
  );
};

document.addEventListener('DOMContentLoaded', buildAgenda);
