'use strict';
/* ═══════════════════════════════════════════════════════════════════════
   FAQ.JS — Comprehensive FAQ for the DGTP e-Services Strategy Meeting
   Categories: Programme, Technical, Security, Registries, Timeline, Cost
═══════════════════════════════════════════════════════════════════════ */

const FAQ_DATA = [
  // ── PROGRAMME & GOVERNANCE ────────────────────────────────────────────
  {
    cat: 'Programme & Governance',
    icon: '🏛️',
    catColor: '#003087',
    items: [
      {
        q: 'What exactly is the scope of the DGTP e-Services programme?',
        a: 'The programme covers the design and development of selected e-government services delivered via multiple channels — including an online citizen portal accessible via web browser and mobile app. It also includes the implementation of an interoperability platform that integrates six key Sint Maarten government registries: Civil, Business, Address, TaxPayer, Business License, and Land. The entire platform is deployed exclusively on Microsoft Azure.',
        tags: ['Programme Scope', 'Six Registries', 'Online Portal', 'Azure-Only']
      },
      {
        q: 'Who owns and governs this programme?',
        a: 'The programme is governed by the eSXM Digital Leadership Team in partnership with NRPB (National Recovery Programme Bureau). Day-to-day delivery is overseen by the Programme Management Office (PMO) using Azure DevOps Boards. A monthly Steering Committee reviews progress via automated Azure DevOps Analytics dashboards. The Architecture Review Board meets monthly to approve significant technical decisions.',
        tags: ['eSXM DLT', 'NRPB', 'PMO', 'ARB', 'Steering Committee']
      },
      {
        q: 'Why was Microsoft Azure selected as the sole cloud provider?',
        a: 'Azure was selected as the exclusive platform to eliminate multi-cloud integration overhead, provide a single audit trail from code to production, enforce data sovereignty via Azure Policy, and maximize return on investment in a unified toolchain. Azure API Management, Azure Pipelines, Defender for Cloud, Sentinel, and Entra ID all integrate natively — eliminating the custom connector work required when mixing cloud vendors. This single-platform decision is one of the primary sources of the 30–40% delivery acceleration.',
        tags: ['Azure-Only', 'Single Platform', 'Data Sovereignty', 'Delivery Acceleration']
      },
      {
        q: 'How does the programme handle Sint Maarten data sovereignty requirements?',
        a: 'All DGTP Azure resources are deployed exclusively in approved Azure regions with data residency enforced via Azure Policy deny effects — non-compliant deployments are automatically blocked. Data at rest is encrypted with AES-256 using Customer-Managed Keys stored in Azure Key Vault HSM (FIPS 140-2 Level 3). Data in transit is protected by TLS 1.3 minimum. Azure Purview provides automated data classification and lineage tracking. A 2-year immutable audit log is maintained in Azure Log Analytics.',
        tags: ['Data Sovereignty', 'Azure Policy', 'CMK Encryption', 'FIPS 140-2', 'Azure Purview']
      },
      {
        q: 'What is the Change Advisory Board (CAB) and how often does it meet?',
        a: 'The Change Advisory Board is the Steering Committee body responsible for approving every production deployment. CAB approval is captured as a formal Azure Pipelines environment gate — no production deployment can proceed without recorded CAB sign-off. The CAB meets on demand for emergency changes and reviews routine releases as part of the weekly deployment batch. All decisions are immutably logged in Azure DevOps.',
        tags: ['CAB', 'Change Control', 'Azure Pipelines Gate', 'Audit Trail']
      },
    ]
  },
  // ── DELIVERY & TIMELINE ───────────────────────────────────────────────
  {
    cat: 'Delivery & Timeline',
    icon: '📅',
    catColor: '#0078D4',
    items: [
      {
        q: 'How does the parallel delivery approach compress the traditional 18–24 month timeline?',
        a: 'Five acceleration multipliers operate simultaneously: (1) Automation — CI/CD pipelines require zero manual intervention from commit to production. (2) Parallelization — six delivery streams work concurrently from Day 1 using Azure API Management mock contracts. (3) Standardization — Bicep IaC templates, Helm charts, and OpenAPI contracts eliminate per-service rework. (4) Reuse — shared services built once, consumed by all six registries. (5) Continuous integration — defects found and fixed in hours, not at the end of a phase. Together these compound into a 30–40% schedule compression.',
        tags: ['30–40% Acceleration', 'Parallel Streams', 'CI/CD', 'Azure API Management Mocks']
      },
      {
        q: 'What happens if one of the six streams falls behind schedule?',
        a: 'Because streams are decoupled via Azure API Management mock contracts, a delay in one stream does not cascade to others. The Frontend stream continues working against stable mock APIs regardless. Azure DevOps Analytics provides daily velocity tracking with automated alerts if a stream velocity drops below 90% of its 3-sprint rolling average. The Orange bd Project Manager is notified within 24 hours, and a risk item is automatically created in Azure DevOps Boards.',
        tags: ['Risk Management', 'Stream Decoupling', 'Azure DevOps Analytics', 'Velocity Tracking']
      },
      {
        q: 'What is the Definition of Done for a User Story to be considered complete?',
        a: 'A User Story is not closed until: code passes peer review (≥2 reviewers in Azure Repos), SAST scan passes in Defender for DevOps, minimum 80% code coverage is achieved (measured in Azure Test Plans), all acceptance criteria are met with passing automated tests, the feature is deployed to QA environment, API documentation is updated in Azure API Management Developer Portal, and all Azure DevOps work item links are resolved.',
        tags: ['Definition of Done', 'Code Coverage', '80% Gate', 'Azure Test Plans', 'Peer Review']
      },
      {
        q: 'When do the API mocks activate and why does it matter?',
        a: 'Azure API Management Mock Response Policies are activated in Month 2 (Sprint 3), as soon as the API contracts are defined in OpenAPI 3.0 format. This single event unlocks parallel development across all streams: the Frontend team can build and test the citizen portal against realistic API responses without waiting for backend services to be complete. QA can write and execute automated tests. Integration teams can validate contract compliance. This alone eliminates the traditional 6–8 week sequential dependency and is one of the biggest single contributors to schedule compression.',
        tags: ['API Mocks', 'Month 2', 'OpenAPI 3.0', 'Parallel Development', 'Sprint 3']
      },
      {
        q: 'What is the production deployment strategy and how are rollbacks handled?',
        a: 'DGTP uses Blue/Green deployment on Azure Kubernetes Service. The new version is deployed to the "Green" environment while the existing "Blue" version continues serving citizen traffic. Azure Monitor watches error rate and P99 latency in real time. If either metric exceeds thresholds within 15 minutes of traffic being shifted to Green, Azure Monitor automatically triggers a rollback to Blue — no human intervention required. This ensures zero-downtime deployments and sub-minute recovery from bad releases.',
        tags: ['Blue/Green Deployment', 'AKS', 'Automated Rollback', 'Azure Monitor', 'Zero-Downtime']
      },
    ]
  },
  // ── REGISTRY INTEGRATION ─────────────────────────────────────────────
  {
    cat: 'Registry Integration',
    icon: '🔗',
    catColor: '#107C10',
    items: [
      {
        q: 'How will the six registries be integrated if they use different systems and formats?',
        a: 'Azure API Management handles protocol and format transformation transparently. Legacy SOAP/XML APIs from older registry systems are converted to REST/JSON at the gateway layer — no changes required to existing registry systems. Azure Logic Apps connectors handle common legacy protocols (SFTP, flat file, database queries). Azure Data Factory manages ETL pipelines for bulk data migration and ongoing synchronisation. Each registry receives a dedicated APIM product with registry-specific policies (rate limiting, auth, data masking).',
        tags: ['SOAP to REST', 'Azure API Management', 'Azure Logic Apps', 'Azure Data Factory', 'Legacy Transformation']
      },
      {
        q: 'Will the existing government registries need to be modified or upgraded?',
        a: 'No. Azure API Management acts as an abstraction layer between the citizen portal and existing registry systems. Existing registries continue operating exactly as they are today. The DGTP interoperability platform translates between the modern REST/JSON portal APIs and whatever protocol each registry currently uses. Only read-only queries are enabled initially; write-back to registries follows a phased approach with registry owners, with full data validation and rollback capability.',
        tags: ['Zero Registry Changes', 'Abstraction Layer', 'APIM Gateway', 'Read-Only Phase 1']
      },
      {
        q: 'How is sensitive TaxPayer data protected in the TaxPayer Registry integration?',
        a: 'TaxPayer Registry data receives the highest sensitivity tier in Azure Purview. Strict data minimisation means only the data required to deliver the specific service is ever accessed — no bulk tax record queries are permitted. Access requires Entra ID Privileged Identity Management just-in-time approval. All TaxPayer data is stored in a dedicated Cosmos DB collection with an independent Customer-Managed Key in Key Vault. NSG rules restrict the TaxPayer Service pods to a separate AKS namespace with stricter network policies.',
        tags: ['TaxPayer Registry', 'Azure Purview', 'Data Minimisation', 'PIM JIT Access', 'Separate Namespace']
      },
      {
        q: 'What happens if a registry system is unavailable — does the portal go down?',
        a: 'No. The DGTP architecture uses Azure Service Bus for asynchronous communication and Azure Cache for Redis for read-through caching of registry data. If a registry system is temporarily unavailable, the portal continues serving cached data with a staleness indicator shown to citizens. New transactions are queued in Azure Service Bus and processed when the registry recovers. Azure API Management circuit breaker policies prevent cascade failures from propagating to the citizen portal.',
        tags: ['Resilience', 'Azure Service Bus', 'Azure Cache for Redis', 'Circuit Breaker', 'Offline Tolerance']
      },
    ]
  },
  // ── TECHNICAL ARCHITECTURE ────────────────────────────────────────────
  {
    cat: 'Technical Architecture',
    icon: '⚙️',
    catColor: '#6B4FA8',
    items: [
      {
        q: 'What is AKS and why is it used instead of Azure App Service?',
        a: 'Azure Kubernetes Service (AKS) is a managed container orchestration platform. It was chosen over Azure App Service because DGTP requires: (1) independent scaling of individual microservices, (2) strict network isolation between services (e.g. Payment Service in its own namespace), (3) fine-grained resource allocation per service, (4) multi-zone high availability across availability zones, and (5) compatibility with the DevOps toolchain (Helm charts for declarative deployments). AKS is managed by Microsoft — no Kubernetes control plane to maintain.',
        tags: ['AKS', 'Kubernetes', 'Microservices', 'Multi-Zone HA', 'Helm Charts']
      },
      {
        q: 'What does "Infrastructure as Code" mean in practice for this programme?',
        a: 'Every Azure resource — virtual networks, AKS clusters, API Management instances, Key Vaults, databases, storage accounts — is defined in Azure Bicep or Terraform files stored in Azure Repos. No human ever creates a resource manually in the Azure Portal. This means: (1) any environment can be rebuilt identically in under 2 hours, (2) all infrastructure changes go through peer review via Pull Requests, (3) Azure Policy validates every deployment before resources are created, and (4) a complete audit trail of every infrastructure change exists in Azure DevOps.',
        tags: ['IaC', 'Azure Bicep', 'Terraform', 'Azure Repos', 'No Manual Portal']
      },
      {
        q: 'How does the citizen authentication work — do citizens need to create yet another account?',
        a: 'Microsoft Entra External ID (formerly Azure AD B2C) provides a standards-based identity platform for citizens. Citizens can authenticate using their existing email address (or optionally social identity providers). Single sign-on means one login grants access to all DGTP e-services. Multi-factor authentication (SMS OTP or authenticator app) is enforced for sensitive operations. No custom identity code is written — Entra External ID handles token issuance, MFA flows, password reset, and account lockout natively.',
        tags: ['Entra External ID', 'SSO', 'MFA', 'OIDC', 'No Custom Identity Code']
      },
      {
        q: 'What is CQRS and why is it used in the Citizen Service?',
        a: 'Command Query Responsibility Segregation (CQRS) is an architectural pattern that separates write operations (Commands — e.g. "Submit Application") from read operations (Queries — e.g. "View My Applications"). The Citizen Service uses CQRS because: write operations need strong consistency and validation, while read operations benefit from high performance via Azure Cache for Redis. This pattern enables the Citizen Service to handle high concurrent read traffic (citizens checking their application status) without impacting the consistency of write operations (submitting new applications).',
        tags: ['CQRS', 'Citizen Service', 'Azure Cache for Redis', 'Read/Write Separation', 'Performance']
      },
    ]
  },
  // ── SECURITY & COMPLIANCE ─────────────────────────────────────────────
  {
    cat: 'Security & Compliance',
    icon: '🛡️',
    catColor: '#A4262C',
    items: [
      {
        q: 'What is Zero-Trust security and how is it implemented in DGTP?',
        a: 'Zero-Trust means "never trust, always verify" — no implicit trust is granted to any user, service, or network location. In DGTP: (1) every API call is authenticated via JWT validated by Azure API Management, (2) no service has standing privileged access — Entra ID PIM enforces just-in-time approval, (3) all data services use Private Endpoints — no public internet access to any database or storage, (4) every container image is scanned by Trivy before storage, and (5) Microsoft Defender for Cloud continuously monitors the security posture with a Secure Score.',
        tags: ['Zero-Trust', 'Entra ID PIM', 'JWT Validation', 'Private Endpoints', 'Trivy Scanning']
      },
      {
        q: 'What is the Secure Score and what is the DGTP target?',
        a: 'Microsoft Defender for Cloud calculates a Secure Score (0–100%) by assessing all Azure resources against the Microsoft Cloud Security Benchmark. DGTP targets a Secure Score above 80% at all times, measured continuously. The score is reviewed at every Steering Committee session via an automated Power BI dashboard. Any finding that drops the score below 75% automatically creates a high-priority work item in Azure DevOps Boards with a 48-hour resolution SLA.',
        tags: ['Secure Score', 'Defender for Cloud', 'MCSB', 'Power BI Dashboard', '80% Target']
      },
      {
        q: 'What happens if a security vulnerability is found after the system goes live?',
        a: 'Microsoft Sentinel continuously monitors all DGTP Azure services for threats. Automated SOAR playbooks trigger within minutes of a confirmed incident — for example, automatically isolating a compromised AKS pod, blocking a suspicious IP at Azure Front Door WAF, or revoking a compromised credential. A Vulnerability Disclosure Policy ensures researchers can report issues securely. Critical CVEs in container images are patched via automated pipeline re-runs within 24 hours. The Orange bd security specialist is on-call 24/7 post-launch.',
        tags: ['Microsoft Sentinel', 'SOAR Playbooks', 'Automated Response', 'CVE Patching', 'Vulnerability Disclosure']
      },
      {
        q: 'Does the programme comply with GDPR-aligned privacy requirements?',
        a: 'Yes. While Sint Maarten is not directly subject to EU GDPR, the programme follows GDPR-aligned principles as best practice. Citizens can request data portability and deletion. Azure Purview maintains a complete data lineage catalogue. Data minimisation is enforced — only the minimum required fields are stored per service. Consent management is built into the citizen portal registration flow. All data processing purposes are documented in Azure Purview with retention policies enforced via Azure Blob Storage lifecycle management.',
        tags: ['GDPR-Aligned', 'Data Portability', 'Azure Purview', 'Data Minimisation', 'Consent Management']
      },
    ]
  },
  // ── TESTING & QUALITY ─────────────────────────────────────────────────
  {
    cat: 'Testing & Quality',
    icon: '🧪',
    catColor: '#107C10',
    items: [
      {
        q: 'What does "80% test automation coverage" mean and why is it a hard gate?',
        a: '80% automation coverage means that at least 80% of all code paths are exercised by automated tests (unit tests + integration tests). This is enforced as a hard pipeline gate in Azure Pipelines — a build cannot proceed to QA if coverage drops below this threshold. The 80% target is chosen as the optimal balance: above 80%, the marginal cost of writing tests for edge cases exceeds the benefit; below 80%, too many defects reach QA. Coverage is measured per-service and reported to Azure Test Plans for traceability.',
        tags: ['80% Coverage Gate', 'Azure Test Plans', 'Unit Tests', 'Integration Tests', 'Hard Gate']
      },
      {
        q: 'What is Playwright and why is it used for end-to-end testing?',
        a: 'Playwright is a modern browser automation framework developed by Microsoft that can test web applications across Chromium, Firefox, and WebKit with a single API. It was selected because: (1) it supports the same JavaScript/TypeScript stack as the DGTP React frontend, (2) it handles modern authentication flows (Entra ID redirects) natively, (3) it runs headlessly in Azure Pipelines without additional infrastructure, (4) it supports network request interception for testing against Azure API Management mocks, and (5) it produces detailed trace files that attach to Azure Test Plans test runs for debugging.',
        tags: ['Playwright', 'E2E Testing', 'Azure Pipelines', 'React Testing', 'Headless Browser']
      },
      {
        q: 'What is Azure Load Testing and what are the DGTP performance targets?',
        a: 'Azure Load Testing is a fully managed load testing service — no test infrastructure to provision or maintain. DGTP performance targets enforced as pipeline gates are: (1) sustain 200 concurrent users with no errors, (2) P95 response time under 2 seconds for all citizen-facing APIs, (3) P99 response time under 5 seconds, (4) error rate below 0.1% under load. Tests are executed against the UAT environment before every production release. Results are stored in Azure Pipelines and compared against the previous release baseline.',
        tags: ['Azure Load Testing', '200 Users', 'P95 < 2s', 'Performance Gate', 'Managed Service']
      },
    ]
  },
  // ── CITIZEN EXPERIENCE ────────────────────────────────────────────────
  {
    cat: 'Citizen Experience',
    icon: '👤',
    catColor: '#C55A00',
    items: [
      {
        q: 'What e-services will citizens be able to access through the portal?',
        a: 'The initial release includes digitised versions of the most frequently requested government services across the six registry domains: civil identity document requests (Civil Registry), business registration and renewals (Business Registry), address lookups and updates (Address Registry), taxpayer account services (TaxPayer Registry), business licence applications and renewals (Business License Registry), and property title searches (Land Registry). Each service is fully online — citizens can apply, track status, pay fees, and receive digital documents without visiting a government office.',
        tags: ['Citizen Services', 'Digital Documents', 'Online Payments', 'Status Tracking', 'No Office Visit']
      },
      {
        q: 'Is the citizen portal accessible on mobile devices?',
        a: 'Yes. The DGTP citizen portal is built as a Progressive Web App (PWA) using React, which means it works on any modern browser without requiring a separate app download. The portal is fully responsive for mobile, tablet, and desktop. An optional native mobile application (React Native) is planned for Phase 2. WCAG 2.1 Level AA accessibility compliance is a mandatory acceptance criterion — the portal is tested for screen readers, keyboard navigation, colour contrast, and cognitive accessibility.',
        tags: ['PWA', 'Mobile-First', 'WCAG 2.1 AA', 'React Native Phase 2', 'Accessibility']
      },
      {
        q: 'What languages does the citizen portal support?',
        a: 'The portal is internationalised (i18n) from the start, supporting Dutch, English, and Papiamentu — Sint Maarten\'s three official and commonly spoken languages. Internationalisation is implemented using React i18n libraries with language strings stored in Azure Blob Storage (not hard-coded in the application). This allows the content team to add or update translations without a code deployment. Language preference is stored in the citizen\'s Entra External ID profile and applied automatically on each login.',
        tags: ['Dutch', 'English', 'Papiamentu', 'i18n', 'React i18n', 'No Code Redeploy']
      },
    ]
  },
];

/* ── BUILD FAQ HTML ───────────────────────────────────────────────── */
function buildFAQ() {
  const container = document.getElementById('faq-list');
  if (!container) return;

  // Summary stats bar
  const totalQ = FAQ_DATA.reduce((s, cat) => s + cat.items.length, 0);
  const catCount = FAQ_DATA.length;

  let html = `
    <div class="faq-stats">
      <div class="faq-stats-item"><span class="faq-stats-num">${totalQ}</span><span class="faq-stats-lbl">Questions Answered</span></div>
      <div class="faq-stats-sep"></div>
      <div class="faq-stats-item"><span class="faq-stats-num">${catCount}</span><span class="faq-stats-lbl">Topic Categories</span></div>
      <div class="faq-stats-sep"></div>
      <div class="faq-stats-item" style="flex:1;">
        <input id="faq-search" class="faq-search" type="text" placeholder="Search all ${totalQ} questions…" oninput="filterFAQ(this.value)" autocomplete="off"/>
      </div>
    </div>
    <div id="faq-no-match" style="display:none;text-align:center;padding:32px;color:var(--text-muted);font-size:14px;">No questions match your search. Try a different keyword.</div>
  `;

  FAQ_DATA.forEach((cat, ci) => {
    html += `
    <div class="faq-cat-block" id="faq-cat-${ci}">
      <div class="faq-cat-header">
        <span style="font-size:18px;">${cat.icon}</span>
        <span class="faq-cat-title" style="color:${cat.catColor};">${cat.cat}</span>
        <span class="faq-cat-count">${cat.items.length} questions</span>
      </div>
      <div class="faq-cat-items">
        ${cat.items.map((item, qi) => {
          const id = `faq-${ci}-${qi}`;
          const tagHTML = item.tags.map(t => `<span class="faq-tag">${t}</span>`).join('');
          return `
          <div class="faq-item" id="${id}" data-q="${item.q.toLowerCase()}" data-a="${item.a.toLowerCase()}" data-tags="${item.tags.join(' ').toLowerCase()}">
            <div class="faq-question" onclick="toggleFAQ('${id}')">
              <span class="faq-q-num" style="background:${cat.catColor};">${String(qi + 1).padStart(2,'0')}</span>
              <span class="faq-q-text">${item.q}</span>
              <span class="faq-q-chev" id="${id}-chev">▼</span>
            </div>
            <div class="faq-answer" id="${id}-ans">
              <div class="faq-answer-body">${item.a}</div>
              <div class="faq-tags">${tagHTML}</div>
            </div>
          </div>`;
        }).join('')}
      </div>
    </div>`;
  });

  container.innerHTML = html;
}

/* ── TOGGLE ──────────────────────────────────────────────────────── */
const _faqOpen = {};
window.toggleFAQ = function(id) {
  _faqOpen[id] = !_faqOpen[id];
  const ans  = document.getElementById(`${id}-ans`);
  const chev = document.getElementById(`${id}-chev`);
  const item = document.getElementById(id);
  if (!ans) return;
  if (_faqOpen[id]) {
    ans.style.maxHeight  = ans.scrollHeight + 200 + 'px';
    ans.style.opacity    = '1';
    if (chev) chev.textContent = '▲';
    item.classList.add('faq-open');
  } else {
    ans.style.maxHeight  = '0';
    ans.style.opacity    = '0';
    if (chev) chev.textContent = '▼';
    item.classList.remove('faq-open');
  }
};

/* ── SEARCH ──────────────────────────────────────────────────────── */
window.filterFAQ = function(val) {
  const q = val.trim().toLowerCase();
  let anyVisible = false;
  document.querySelectorAll('.faq-item').forEach(el => {
    const match = !q
      || el.dataset.q.includes(q)
      || el.dataset.a.includes(q)
      || el.dataset.tags.includes(q);
    el.classList.toggle('faq-filtered', !match);
    if (match) anyVisible = true;
  });
  // Show/hide category blocks if all their items are filtered
  document.querySelectorAll('.faq-cat-block').forEach(block => {
    const hasVisible = [...block.querySelectorAll('.faq-item')].some(i => !i.classList.contains('faq-filtered'));
    block.classList.toggle('faq-cat-hidden', !hasVisible);
  });
  const noMatch = document.getElementById('faq-no-match');
  if (noMatch) noMatch.style.display = anyVisible ? 'none' : 'block';
};

// buildFAQ is called by the FAQ gate script after successful authentication
window.buildFAQ = buildFAQ;
