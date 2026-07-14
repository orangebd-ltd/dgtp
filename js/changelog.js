'use strict';
/* ═══════════════════════════════════════════════════════════════════════
   CHANGELOG.JS — Customer Feedback Addressed
   Progressive log of all changes made based on stakeholder feedback
   Each entry: category, what was said, what changed, section affected
═══════════════════════════════════════════════════════════════════════ */

const CHANGELOG = [
  /* ── CONTENT & SCOPE ─────────────────────────────────────────────── */
  {
    id: 'cl-01',
    date: 'Session Review',
    category: 'Scope Accuracy',
    icon: '🏛️',
    color: '#003087',
    feedback: `"The six registries listed are wrong — they should be Civil, Business, Address, TaxPayer, Business License, and Land Registry."`,
    change: `All six registry names corrected throughout the entire presentation — hero card, Standardize Patterns flowchart, Reuse Before Build flowchart, FAQ, agenda, and challenge descriptions. Vehicle Registry, Health Registry, and Education Registry removed entirely.`,
    section: 'All sections',
    impact: 'Critical'
  },
  {
    id: 'cl-02',
    date: 'Session Review',
    category: 'Scope Accuracy',
    icon: '📄',
    color: '#003087',
    feedback: `"Documents OCR + extraction is not in scope. We have document generation as the output of a service, not input scanning."`,
    change: `All references to "Document Intelligence", "Form Recognizer", and "OCR + extraction" replaced with "Document Generation Service" — reflecting that documents are outputs (certificates, licences, receipts) not inputs being scanned.`,
    section: 'Reuse Before Build, FAQ, Challenge flows',
    impact: 'Critical'
  },
  {
    id: 'cl-03',
    date: 'Session Review',
    category: 'Architecture',
    icon: '💳',
    color: '#107C10',
    feedback: `"Payment Service should be included as a shared service in Reuse Before Build — it is the fifth shared service."`,
    change: `Payment Service (💳) added as the fifth shared platform service in the Reuse Before Build principle flowchart and principle card. The Azure Service Bus backbone visualisation was redesigned to show all 5 services connecting to all 6 registries through a shared integration backbone.`,
    section: 'Reuse Before Build (Principle 4)',
    impact: 'High'
  },
  {
    id: 'cl-04',
    date: 'Session Review',
    category: 'Clarity',
    icon: '🔢',
    color: '#6B4FA8',
    feedback: `"Saying 'Solves: Challenge 1, Challenge 2' in the principles panel is confusing — write the actual challenge names."`,
    change: `The Nine Governing Principles right panel now shows full challenge names (e.g. "Fragmented Legacy Systems, Manual Validation") instead of "Challenge 1, Challenge 2". Names pulled dynamically from the CHALLENGES data.`,
    section: 'Traditional Delivery Challenges figure',
    impact: 'Medium'
  },
  {
    id: 'cl-05',
    date: 'Session Review',
    category: 'Accuracy',
    icon: '⏱️',
    color: '#A4262C',
    feedback: `"Do not mention 8 months as the delivery timeline — this has not been decided yet and would create confusion."`,
    change: `All references to '8 months', '8-month target', and 'Month 1 to Month 8' removed throughout. References now say 'parallel delivery approach' or 'significantly compresses the traditional 18–24 month sequential timeline' without committing to a specific duration.`,
    section: 'Hero, Principles, Challenge flows, FAQ, KPI modals',
    impact: 'Critical'
  },

  /* ── PRESENTATION STRUCTURE ──────────────────────────────────────── */
  {
    id: 'cl-06',
    date: 'Session Review',
    category: 'Structure',
    icon: '📋',
    color: '#0078D4',
    feedback: `"The agenda mentioned sections that don't exist in the presentation. Align the agenda to only what is actually shown."`,
    change: `Agenda completely rebuilt — 6 items only, each with a clickable ↗ hyperlink badge pointing directly to its corresponding section in the HTML. Removed all agenda items for sections that were deleted (Timeline, Streams, Figures). Timings redistributed to fit 60 minutes.`,
    section: 'Agenda section',
    impact: 'High'
  },
  {
    id: 'cl-07',
    date: 'Session Review',
    category: 'Redundancy',
    icon: '🗑️',
    color: '#5A6B7A',
    feedback: `"Figure 1 (CI/CD Pipeline) is already shown in the Multi-Stage CI/CD section — no need to repeat it. Figure 2 (Microservices Architecture) is not needed. The Delivery Streams section repeats Parallel Execution."`,
    change: `Figures section removed entirely (Figure 1, Figure 2, Figure 3). Six Concurrent Delivery Streams section removed — the six streams are now shown as coloured tag chips inside the Parallel Execution principle card where they belong. Figure 3 timeline removed (delivery dates TBD).`,
    section: 'Figures section, Streams section',
    impact: 'High'
  },
  {
    id: 'cl-08',
    date: 'Session Review',
    category: 'Ownership',
    icon: '🏢',
    color: '#C55A00',
    feedback: `"It is unclear that the delivery team mentioned throughout is Orange bd's team — stakeholders might think these are government staff."`,
    change: `Team ownership clarified throughout. Rubric now states "These roles are all part of the Orange bd delivery team." Hero description updated to say "delivered by the Orange bd team for Sint Maarten government." Agenda and FAQ updated to say "our team" or reference Orange bd explicitly.`,
    section: 'Hero, Rubric, Agenda, FAQ',
    impact: 'High'
  },
  {
    id: 'cl-09',
    date: 'Session Review',
    category: 'Roles',
    icon: '👤',
    color: '#003087',
    feedback: `"The review rubric had wrong team names — it should only list: DevOps, Cloud Architect, Application Integration Expert, Integration Expert, Project Manager, Development Team."`,
    change: `Rubric completely rebuilt with correct Orange bd team roles. Removed fabricated roles (Programme Director, Security Lead, QA Lead, Risk Manager, Solution Architect, Platform Lead). Reduced from 14 rows to 12 focused sections. Reviewer and Target columns removed — simplified to 5 columns.`,
    section: 'Review & Sign-Off Rubric',
    impact: 'High'
  },
  {
    id: 'cl-10',
    date: 'Session Review',
    category: 'Clarity',
    icon: '🎤',
    color: '#0078D4',
    feedback: `"There should be no individual presenter names on agenda items — the Application Integration Expert presents the whole thing."`,
    change: `All "Lead:" fields removed from every agenda item. Agenda description updated to state the single presenter. Sign-off rubric note updated to state the presentation is delivered entirely by the Application Integration Expert.`,
    section: 'Agenda section',
    impact: 'Medium'
  },

  /* ── VISUALS & INTERACTION ───────────────────────────────────────── */
  {
    id: 'cl-11',
    date: 'Session Review',
    category: 'Visual Design',
    icon: '🎨',
    color: '#8A2BE2',
    feedback: `"The presentation needs to be more engaging and eye-catching — add animations to the hero banner."`,
    change: `Hero section now has: (1) typewriter effect cycling through words in 'Design & Development of [word] e-Services' — faster, smarter, citizen-first, AI-powered, secure, etc. (2) Floating particle network canvas with connecting lines. (3) Three drifting glowing orbs behind the content. (4) Staggered fade-up entrance animations on all hero elements.`,
    section: 'Hero section',
    impact: 'Medium'
  },
  {
    id: 'cl-12',
    date: 'Session Review',
    category: 'Visual Design',
    icon: '🎯',
    color: '#8A2BE2',
    feedback: `"The clickable windows that open when you click principles are too text-heavy. Replace with animated flowcharts."`,
    change: `All nine principle detail windows replaced with animated SVG flowcharts — each with 6-9 nodes, entrance animations, connecting arrows, and hover tooltips on every node in plain English. Success metrics strip below each flowchart. No paragraph text in the modal.`,
    section: 'Nine Governing Principles',
    impact: 'High'
  },
  {
    id: 'cl-13',
    date: 'Session Review',
    category: 'Visual Design',
    icon: '⚠️',
    color: '#A4262C',
    feedback: `"In the Traditional Delivery Challenges flowcharts, the DGTP solution nodes incorrectly had red arrows with break badges — those should be green since they represent success not failure."`,
    change: `Red arrows leading to DGTP solution nodes changed to green arrows throughout all six challenge flowcharts. Only arrows showing traditional system breaking points retain red colouring and the ✕ break badge with beep sound.`,
    section: 'Traditional Delivery Challenges',
    impact: 'Medium'
  },
  {
    id: 'cl-14',
    date: 'Session Review',
    category: 'Interaction',
    icon: '🔊',
    color: '#A4262C',
    feedback: `"Add a clickable warning sign on the red break arrows in the challenges flowchart so the audience knows that is a failure point."`,
    change: `Red ✕ break badges added at the midpoint of every red failure arrow. Each badge pulses with a glow ring. Clicking plays a two-tone descending warning beep (Web Audio API) and the badge shakes. No external audio files — synthesised in the browser.`,
    section: 'Traditional Delivery Challenges',
    impact: 'Medium'
  },
  {
    id: 'cl-15',
    date: 'Session Review',
    category: 'Interaction',
    icon: '↔️',
    color: '#0078D4',
    feedback: `"The clickable detail windows need to be wider — especially for the principle flowcharts. Also need a way to resize them."`,
    change: `All modal windows widened by 30% (560px → 728px default, 884px for principle modals). S/M/L/XL width control buttons added to every modal header. Flowchart boxes now scroll horizontally and vertically so content is never cut off.`,
    section: 'All clickable detail windows',
    impact: 'Medium'
  },
  {
    id: 'cl-16',
    date: 'Session Review',
    category: 'Feature',
    icon: '🔒',
    color: '#003087',
    feedback: `"The FAQ section should be password protected — only show it to the right audience."`,
    change: `FAQ section now behind a login gate with username: 'orange' and password: 'faq'. Animated lock card shown until authenticated. Correct credentials play a success tone and slide in the FAQ. Wrong credentials play an error buzz and shake the error message.`,
    section: 'FAQ section',
    impact: 'Medium'
  },
  {
    id: 'cl-17',
    date: 'Session Review',
    category: 'Content',
    icon: '🤖',
    color: '#8A2BE2',
    feedback: `"The AI delivery approach is missing — Claude CLI via OpenRouter, GitHub Copilot, Azure AI are core to the strategy and should be in the principles."`,
    change: `Ninth principle added: AI-Accelerated Delivery. Shows Claude CLI via OpenRouter, GitHub Copilot, Azure OpenAI, and Azure AI Services in the flow. Human-in-the-Loop gate (amber) enforced at every AI output. Full animated flowchart with 4 AI gates in the CI/CD pipeline. 30–55% productivity gain metric.`,
    section: 'Nine Governing Principles (Principle 9)',
    impact: 'High'
  },
  {
    id: 'cl-18',
    date: 'Session Review',
    category: 'Content',
    icon: '📊',
    color: '#107C10',
    feedback: `"There is no dedicated Measures of Success section — it was mixed in with other content."`,
    change: `Dedicated Measures of Success section added with 5 animated circular metric nodes (Deploy Frequency, Lead Time, Change Fail Rate, Recovery Time, Test Coverage). Each node clickable for its own dedicated animated flowchart showing how that metric is achieved. All five metrics tracked automatically via Azure DevOps Analytics.`,
    section: 'New: Measures of Success section',
    impact: 'High'
  },
  {
    id: 'cl-19',
    date: 'Session Review',
    category: 'Content',
    icon: '📝',
    color: '#003087',
    feedback: `"I need a presenter script to follow during the meeting."`,
    change: `Complete presenter script written in LaTeX (.tex) and compiled to PDF. Script covers all 6 agenda items with word-for-word speaking notes, action cues (what to click), pause notes, transition signals, Q&A management guide, and a key messages table for handling common stakeholder pushback.`,
    section: 'Presenter Script (separate PDF)',
    impact: 'High'
  },
  {
    id: 'cl-20',
    date: 'Session Review',
    category: 'Reuse Before Build',
    icon: '🔄',
    color: '#107C10',
    feedback: `"The Reuse Before Build flowchart used '+ 3 more' and '+ 2 more' shortcuts instead of naming all registries. Show all six clearly."`,
    change: `Reuse Before Build flowchart completely redesigned. All 6 registries named individually (Civil, Business, Address, TaxPayer, Business License, Land). Azure Service Bus added as a visible shared backbone connecting all 5 services to all 6 registries through a single wide architecture node.`,
    section: 'Reuse Before Build (Principle 4)',
    impact: 'Medium'
  },
];

/* ── RENDER ──────────────────────────────────────────────────────────── */
function buildChangelog() {
  const container = document.getElementById('changelog-list');
  if (!container) return;

  // Stats bar
  const total = CHANGELOG.length;
  const critical = CHANGELOG.filter(c => c.impact === 'Critical').length;
  const high     = CHANGELOG.filter(c => c.impact === 'High').length;

  let html = `
    <div class="cl-stats">
      <div class="cl-stat"><span class="cl-stat-num">${total}</span><span class="cl-stat-lbl">Changes Made</span></div>
      <div class="cl-stat-sep"></div>
      <div class="cl-stat"><span class="cl-stat-num" style="color:#A4262C;">${critical}</span><span class="cl-stat-lbl">Critical Fixes</span></div>
      <div class="cl-stat-sep"></div>
      <div class="cl-stat"><span class="cl-stat-num" style="color:#C55A00;">${high}</span><span class="cl-stat-lbl">High Impact</span></div>
      <div class="cl-stat-sep"></div>
      <div class="cl-stat" style="flex:1;">
        <input id="cl-search" class="cl-search" type="text" placeholder="Search changes…"
          oninput="filterChangelog(this.value)" autocomplete="off"/>
      </div>
    </div>`;

  // Group by category
  const cats = [...new Set(CHANGELOG.map(c => c.category))];
  cats.forEach(cat => {
    const items = CHANGELOG.filter(c => c.category === cat);
    html += `<div class="cl-cat-block" id="clcat-${cat.replace(/\s/g,'-')}">
      <div class="cl-cat-header">
        <span style="font-size:15px;">${items[0].icon}</span>
        <span class="cl-cat-title">${cat}</span>
        <span class="cl-cat-count">${items.length} change${items.length > 1 ? 's' : ''}</span>
      </div>`;

    items.forEach((item, idx) => {
      const impactCol = item.impact === 'Critical' ? '#A4262C' : item.impact === 'High' ? '#C55A00' : '#856404';
      html += `
      <div class="cl-item" id="${item.id}" onclick="toggleChangelog('${item.id}')"
        data-search="${(item.feedback + item.change + item.section + item.category).toLowerCase()}">
        <div class="cl-item-main">
          <div class="cl-num" style="background:${item.color};">${CHANGELOG.indexOf(item)+1}</div>
          <div class="cl-body">
            <div class="cl-title-row">
              <div class="cl-feedback-quote">${item.feedback}</div>
              <span class="cl-impact" style="background:${impactCol}20;color:${impactCol};border:1px solid ${impactCol}40;">${item.impact}</span>
            </div>
            <div class="cl-section-tag">📍 ${item.section}</div>
          </div>
          <div class="cl-chev" id="clchev-${item.id}">▼</div>
        </div>
        <div class="cl-detail" id="cldet-${item.id}">
          <div class="cl-change-label">✅ What changed</div>
          <div class="cl-change-text">${item.change}</div>
        </div>
      </div>`;
    });
    html += `</div>`;
  });

  container.innerHTML = html;
}

/* ── TOGGLE ──────────────────────────────────────────────────────────── */
const _clOpen = {};
window.toggleChangelog = function(id) {
  _clOpen[id] = !_clOpen[id];
  const det  = document.getElementById(`cldet-${id}`);
  const chev = document.getElementById(`clchev-${id}`);
  const item = document.getElementById(id);
  if (!det) return;
  if (_clOpen[id]) {
    det.style.maxHeight  = det.scrollHeight + 'px';
    det.style.opacity    = '1';
    if (chev) chev.textContent = '▲';
    item.classList.add('cl-open');
  } else {
    det.style.maxHeight  = '0';
    det.style.opacity    = '0';
    if (chev) chev.textContent = '▼';
    item.classList.remove('cl-open');
  }
};

/* ── SEARCH ──────────────────────────────────────────────────────────── */
window.filterChangelog = function(val) {
  const q = val.trim().toLowerCase();
  let anyVisible = false;
  document.querySelectorAll('.cl-item').forEach(el => {
    const match = !q || el.dataset.search.includes(q);
    el.classList.toggle('cl-hidden', !match);
    if (match) anyVisible = true;
  });
  document.querySelectorAll('.cl-cat-block').forEach(block => {
    const hasVisible = [...block.querySelectorAll('.cl-item')].some(i => !i.classList.contains('cl-hidden'));
    block.style.display = hasVisible ? '' : 'none';
  });
};

/* ── INIT ────────────────────────────────────────────────────────────── */
// buildChangelog called by the changelog gate after authentication
window.buildChangelog = buildChangelog;
