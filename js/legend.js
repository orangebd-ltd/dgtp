'use strict';
/* ═══════════════════════════════════════════════════════════════════════
   LEGEND.JS — Floating circular FAB with expandable glossary card
   50% opacity at rest → full on hover/open
   Drag to reposition · Expand/Collapse · Search · Auto-highlight
═══════════════════════════════════════════════════════════════════════ */

/* ── GLOSSARY DATA ────────────────────────────────────────────────── */
const GLOSSARY = [
  // Azure Services
  { c:'Azure Services', a:'KV',         f:'<strong>Key Vault</strong> — Azure Key Vault. HSM-backed vault storing secrets, keys, and certificates. DGTP microservices fetch secrets at runtime via Managed Identity — no stored credentials in code.' },
  { c:'Azure Services', a:'APIM',       f:'<strong>API Management</strong> — Azure API Management. Centralised gateway enforcing JWT validation, rate limiting, versioning, mock responses, and OpenAPI documentation for all DGTP APIs.' },
  { c:'Azure Services', a:'AKS',        f:'<strong>Azure Kubernetes Service</strong> — Managed Kubernetes. Hosts all DGTP microservices across multiple availability zones for high availability.' },
  { c:'Azure Services', a:'ACR',        f:'<strong>Azure Container Registry</strong> — Private Docker image registry. All images stored with immutable build-ID tags and Trivy CVE scanning on push.' },
  { c:'Azure Services', a:'AFD',        f:'<strong>Azure Front Door</strong> — Global CDN and WAF. Routes citizen traffic to nearest edge PoP and enforces OWASP Top 10 Web Application Firewall rules at the edge.' },
  { c:'Azure Services', a:'ASB',        f:'<strong>Azure Service Bus</strong> — Async messaging backbone. Topics and subscriptions route domain events (e.g. CitizenRegistered) between microservices with retry and dead-lettering.' },
  { c:'Azure Services', a:'ADF',        f:'<strong>Azure Data Factory</strong> — ETL orchestration. Used for legacy data migration and ongoing synchronisation with existing Sint Maarten government systems.' },
  { c:'Azure Services', a:'App Config', f:'<strong>Azure App Configuration</strong> — Centralised store for application settings and feature flags. Values injected into AKS pods at runtime, decoupling config from code.' },
  { c:'Azure Services', a:'MI',         f:'<strong>Managed Identity</strong> — Azure-assigned identity for services. Eliminates stored credentials; pods authenticate to Key Vault and other Azure resources without passwords.' },
  { c:'Azure Services', a:'SQL MI',     f:'<strong>SQL Managed Instance</strong> — Azure SQL Managed Instance. Fully managed relational database with Always-On HA, automated geo-redundant backups, and Always Encrypted for PII columns.' },
  { c:'Azure Services', a:'EG',         f:'<strong>Azure Event Grid</strong> — Event routing service. Distributes domain events from publishers to subscriber microservices with retry policies and dead-lettering support.' },
  { c:'Azure Services', a:'LA',         f:'<strong>Azure Log Analytics</strong> — Centralised log store in Azure Monitor. All service logs, AKS audit logs, and NSG flow logs stored and queryable via KQL with 2-year retention.' },
  { c:'Azure Services', a:'AI Search',  f:'<strong>Azure AI Search</strong> (formerly Cognitive Search) — Full-text search across all government services and documents with AI-enhanced relevance ranking and cognitive skills.' },
  { c:'Azure Services', a:'Cosmos DB',  f:'<strong>Azure Cosmos DB</strong> — Multi-region NoSQL document database. Used for citizen portal state and case data. Region-lock enforced by Azure Policy for Sint Maarten data sovereignty.' },
  // Security
  { c:'Security', a:'Entra ID',  f:'<strong>Microsoft Entra ID</strong> (formerly Azure Active Directory / Azure AD) — Identity platform. Provides SSO, MFA, Conditional Access, and Privileged Identity Management for all DGTP users.' },
  { c:'Security', a:'PIM',       f:'<strong>Privileged Identity Management</strong> — Entra ID feature enforcing just-in-time admin access. No permanent privileged roles. All admin actions require approval and are audit-logged.' },
  { c:'Security', a:'SAST',      f:'<strong>Static Application Security Testing</strong> — Analyses source code for vulnerabilities (SQL injection, XSS, hardcoded secrets) before compiling or deploying. Runs on every PR in DGTP.' },
  { c:'Security', a:'DAST',      f:'<strong>Dynamic Application Security Testing</strong> — Tests a running application for vulnerabilities. DGTP uses OWASP ZAP in headless mode in the pre-production pipeline stage.' },
  { c:'Security', a:'SCA',       f:'<strong>Software Composition Analysis</strong> — Scans third-party dependencies (NuGet, npm, Maven) for known CVEs. Performed by Microsoft Defender for DevOps on every build.' },
  { c:'Security', a:'WAF',       f:'<strong>Web Application Firewall</strong> — Enforces OWASP Top 10 rules at the network edge (Azure Front Door / API Management). Blocks SQL injection, XSS, and bot traffic before reaching origin.' },
  { c:'Security', a:'CSPM',      f:'<strong>Cloud Security Posture Management</strong> — Defender for Cloud capability. Continuously assesses Azure resources against security benchmarks and generates a Secure Score with prioritised remediations.' },
  { c:'Security', a:'SOAR',      f:'<strong>Security Orchestration, Automation and Response</strong> — Microsoft Sentinel feature. Automated playbooks respond to incidents (e.g. isolate a compromised pod) without manual intervention.' },
  { c:'Security', a:'SIEM',      f:'<strong>Security Information and Event Management</strong> — Microsoft Sentinel. Aggregates logs from all Azure services and uses AI to detect threats and correlate incidents in real time.' },
  { c:'Security', a:'HSM',       f:'<strong>Hardware Security Module</strong> — Tamper-resistant hardware for cryptographic operations. Azure Key Vault Premium uses FIPS 140-2 Level 3 HSMs to store all DGTP encryption keys.' },
  { c:'Security', a:'CMK',       f:'<strong>Customer-Managed Key</strong> — Encryption key owned and rotated by DGTP (not Microsoft). All Blob Storage and SQL MI data encrypted with CMKs stored in Key Vault HSM.' },
  { c:'Security', a:'CVE',       f:'<strong>Common Vulnerabilities and Exposures</strong> — Public database of known security vulnerabilities. Trivy and Defender for DevOps scan DGTP images and packages against the CVE database.' },
  { c:'Security', a:'ZAP',       f:'<strong>OWASP Zed Attack Proxy</strong> — Open-source DAST scanner. Runs headless in the DGTP pre-production pipeline stage to detect OWASP Top 10 vulnerabilities in running services.' },
  { c:'Security', a:'mTLS',      f:'<strong>Mutual TLS</strong> — Both client and server authenticate via X.509 certificates. Used for machine-to-machine B2G/G2G integrations via Azure API Management policies.' },
  // DevOps & Pipeline
  { c:'DevOps & Pipeline', a:'CI/CD', f:'<strong>Continuous Integration / Continuous Deployment</strong> — Automated pipeline: every code commit triggers build, security scan, test, and deployment stages without manual intervention.' },
  { c:'DevOps & Pipeline', a:'IaC',   f:'<strong>Infrastructure as Code</strong> — All Azure resources defined in Azure Bicep or Terraform. No manual portal provisioning permitted. Version-controlled and peer-reviewed via PR.' },
  { c:'DevOps & Pipeline', a:'YAML',  f:'<strong>YAML Ain\'t Markup Language</strong> — Pipeline definition format used by Azure Pipelines. All DGTP pipelines are YAML files in Azure Repos alongside application code.' },
  { c:'DevOps & Pipeline', a:'PR',    f:'<strong>Pull Request</strong> — Code review in Azure Repos. All merges require a PR with ≥2 reviewer approvals, a linked Azure DevOps work item, and passing SAST gates.' },
  { c:'DevOps & Pipeline', a:'CAB',   f:'<strong>Change Advisory Board</strong> — Steering Committee body that must approve every production deployment. Approval captured as an Azure Pipelines environment gate with full audit trail.' },
  { c:'DevOps & Pipeline', a:'DoD',   f:'<strong>Definition of Done</strong> — Sprint checklist all stories must satisfy before closure: code reviewed, ≥80% test coverage, documentation updated, deployed to QA.' },
  { c:'DevOps & Pipeline', a:'DoR',   f:'<strong>Definition of Ready</strong> — Criteria a user story must meet before entering a sprint: acceptance criteria defined, design approved, dependencies identified.' },
  { c:'DevOps & Pipeline', a:'ADR',   f:'<strong>Architecture Decision Record</strong> — Markdown document recording a significant architectural decision, its context, and consequences. Stored in Azure Repos /docs/decisions.' },
  // Architecture
  { c:'Architecture', a:'CQRS',  f:'<strong>Command Query Responsibility Segregation</strong> — Pattern separating writes (Commands) from reads (Queries). Used in the Citizen Service for performance and horizontal scalability.' },
  { c:'Architecture', a:'HA',    f:'<strong>High Availability</strong> — Design ensuring minimal downtime. AKS multi-zone deployment provides HA; Azure Traffic Manager provides regional failover for a 99.9% SLA.' },
  { c:'Architecture', a:'DR',    f:'<strong>Disaster Recovery</strong> — Plans to restore service after a major failure. DGTP targets RTO &lt; 4 hours and RPO &lt; 1 hour via Azure Site Recovery and Traffic Manager failover.' },
  { c:'Architecture', a:'RTO',   f:'<strong>Recovery Time Objective</strong> — Maximum acceptable time to restore service after failure. DGTP target: &lt; 4 hours for a full Azure region outage.' },
  { c:'Architecture', a:'RPO',   f:'<strong>Recovery Point Objective</strong> — Maximum acceptable data loss period. DGTP target: &lt; 1 hour. Achieved via continuous SQL MI backups and Cosmos DB multi-region replication.' },
  { c:'Architecture', a:'PoP',   f:'<strong>Point of Presence</strong> — Azure CDN edge location geographically close to end users. Azure Front Door has 120+ PoPs worldwide delivering &lt; 50ms latency for Sint Maarten citizens globally.' },
  { c:'Architecture', a:'PWA',   f:'<strong>Progressive Web App</strong> — Web app with offline capability and native-app-like experience. The DGTP citizen portal is built as a PWA using React.' },
  { c:'Architecture', a:'VNet',  f:'<strong>Virtual Network</strong> — Isolated Azure network. All DGTP services run inside a VNet. Private Endpoints bind PaaS services to VNet IPs, blocking any public internet access to data.' },
  { c:'Architecture', a:'NSG',   f:'<strong>Network Security Group</strong> — Azure firewall rules controlling inbound/outbound traffic at subnet and NIC level. NSG flow logs captured in Log Analytics for compliance audit.' },
  // Testing
  { c:'Testing', a:'E2E',   f:'<strong>End-to-End Testing</strong> — Tests complete citizen journeys through the real UI. DGTP uses Playwright to automate flows: registration, application submission, payment, status tracking.' },
  { c:'Testing', a:'P95',   f:'<strong>95th Percentile Response Time</strong> — The response time that 95% of requests complete within. DGTP performance gate: P95 &lt; 2 seconds under 200 concurrent users in Azure Load Testing.' },
  { c:'Testing', a:'WCAG',  f:'<strong>Web Content Accessibility Guidelines</strong> — International accessibility standard. DGTP citizen portal targets WCAG 2.1 Level AA compliance for Sint Maarten\'s multilingual population.' },
  { c:'Testing', a:'SLA',   f:'<strong>Service Level Agreement</strong> — Contractual uptime/performance commitment. DGTP production SLA: 99.9% uptime. UAT sign-off SLA: 48-hour response from business owner.' },
  // Programme
  { c:'Programme', a:'DGTP',    f:'<strong>Digital Government Transformation Project</strong> — The Sint Maarten programme to modernise public service delivery through secure, interoperable, Azure-native digital platforms.' },
  { c:'Programme', a:'PMO',     f:'<strong>Programme Management Office</strong> — DGTP governance team responsible for delivery oversight, risk, reporting, and stakeholder coordination using Azure DevOps Boards.' },
  { c:'Programme', a:'ARB',     f:'<strong>Architecture Review Board</strong> — Monthly checkpoint where technical leads review and approve architectural decisions before they enter the development sprint.' },
  { c:'Programme', a:'RACI',    f:'<strong>Responsible, Accountable, Consulted, Informed</strong> — Responsibility matrix defining who owns, approves, advises on, and is informed about each DGTP deliverable.' },
  { c:'Programme', a:'MTTR',    f:'<strong>Mean Time to Recovery</strong> — Average time to restore service after an incident. DGTP target: &lt; 1 hour for P1 incidents, tracked via Azure Monitor and Sentinel incident records.' },
  { c:'Programme', a:'KPI',     f:'<strong>Key Performance Indicator</strong> — Measurable target auto-reported by Azure DevOps Analytics and Azure Monitor. Examples: deployment frequency (daily), coverage (≥80%), fail rate (&lt;5%).' },
  { c:'Programme', a:'UAT',     f:'<strong>User Acceptance Testing</strong> — Formal testing by business owners confirming the software meets requirements before production. Managed via Azure Test Plans environments.' },
  { c:'Programme', a:'B2G',     f:'<strong>Business to Government</strong> — API integration where businesses connect to government systems. Authenticated via Client Credentials (OIDC) through Azure API Management.' },
  { c:'Programme', a:'G2G',     f:'<strong>Government to Government</strong> — Integration between Sint Maarten agencies. Machine-to-machine authentication via Managed Identity or client certificates through APIM.' },
  { c:'Programme', a:'PCI DSS', f:'<strong>Payment Card Industry Data Security Standard</strong> — Security standard for payment data. DGTP Payment Service runs in an isolated AKS namespace with stricter NetworkPolicy rules.' },
  { c:'Programme', a:'i18n',    f:'<strong>Internationalisation</strong> (i = 18 letters = n) — Making the citizen portal available in multiple languages. Required for Sint Maarten\'s Dutch, English, and Papiamentu-speaking population.' },
  { c:'Programme', a:'A11y',    f:'<strong>Accessibility</strong> (A = 11 letters = y) — Making the citizen portal usable by people with disabilities. DGTP targets WCAG 2.1 AA, validated by automated Playwright accessibility scans.' },
  // Protocols
  { c:'Protocols', a:'OIDC',    f:'<strong>OpenID Connect</strong> — Identity layer on OAuth 2.0. Used by Entra External ID to issue signed JWT tokens for citizen authentication across DGTP services.' },
  { c:'Protocols', a:'JWT',     f:'<strong>JSON Web Token</strong> — Signed token carrying identity claims. Azure API Management validates JWTs on every API call, blocking invalid or expired tokens before requests reach microservices.' },
  { c:'Protocols', a:'OAuth2',  f:'<strong>OAuth 2.0</strong> — Authorisation framework. Citizens use Auth Code + PKCE; agency systems use Client Credentials; service-to-service uses Managed Identity (no token exchange needed).' },
  { c:'Protocols', a:'TLS',     f:'<strong>Transport Layer Security</strong> — Encryption for data in transit. DGTP enforces TLS 1.3 minimum via Azure Policy deny effect on all citizen-facing and internal endpoints.' },
  { c:'Protocols', a:'OpenAPI', f:'<strong>OpenAPI 3.0</strong> — Standard YAML format for REST API contracts. All DGTP APIs defined in OpenAPI 3.0 before coding begins — enabling APIM mock servers from day one.' },
  { c:'Protocols', a:'KQL',     f:'<strong>Kusto Query Language</strong> — Query language for Azure Log Analytics, Application Insights, and Azure Data Explorer. Used to query all DGTP telemetry, security, and audit logs.' },
  { c:'Protocols', a:'AES-256', f:'<strong>Advanced Encryption Standard 256-bit</strong> — Symmetric encryption algorithm. All DGTP data at rest (Blob Storage, SQL MI, Cosmos DB) encrypted with AES-256 using CMKs.' },
  { c:'Protocols', a:'FIPS',    f:'<strong>Federal Information Processing Standard</strong> — US cryptography certification. Azure Key Vault Premium uses FIPS 140-2 Level 3 HSMs — highest standard for DGTP key storage.' },
];

const TOTAL = GLOSSARY.length;

/* ── STATE ─────────────────────────────────────────────────────────── */
let gcOpen = false;

/* ── RENDER ─────────────────────────────────────────────────────────── */
function renderGlossary(filter) {
  const body = document.getElementById('gc-body');
  if (!body) return;
  const q = (filter || '').toLowerCase().trim();
  let html = '', lastCat = '', visible = 0;

  GLOSSARY.forEach(item => {
    const match = !q || item.a.toLowerCase().includes(q) || item.f.toLowerCase().includes(q);
    if (match) visible++;
    if (item.c !== lastCat) {
      lastCat = item.c;
      html += `<div class="gc-cat">${item.c}</div>`;
    }
    const safeId = 'gci-' + item.a.replace(/[^a-z0-9]/gi, '-');
    html += `<div class="gc-item${match ? '' : ' gc-hidden'}" id="${safeId}"
      onclick="gcHighlight('${safeId}')">${
      '<span class="gc-abbr">' + item.a + '</span>' +
      '<span class="gc-full">' + item.f + '</span>'
    }</div>`;
  });
  body.innerHTML = html;

  const footer = document.getElementById('gc-footer');
  if (footer) {
    footer.innerHTML = q
      ? `<strong>${visible}</strong> of ${TOTAL} terms match &ldquo;${q}&rdquo; &middot; <span style="opacity:0.6;">Ctrl+G to toggle</span>`
      : `${TOTAL} terms &middot; <span style="opacity:0.6;">Ctrl+G · / to search</span>`;
    if (q && visible === 0) footer.style.color = '#A4262C';
    else footer.style.color = '';
  }
}

window.filterGlossary = function(val) { renderGlossary(val); };

window.gcHighlight = function(id) {
  document.querySelectorAll('.gc-item.gc-highlighted').forEach(e => e.classList.remove('gc-highlighted', 'gc-pulse'));
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.add('gc-highlighted', 'gc-pulse');
  el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  setTimeout(() => el.classList.remove('gc-pulse'), 1300);
};

/* ── TOGGLE OPEN/CLOSE ───────────────────────────────────────────────── */
window.toggleGlossary = function() {
  gcOpen = !gcOpen;
  const card = document.getElementById('glossary-card');
  const fab  = document.getElementById('glossary-fab');
  if (!card || !fab) return;
  if (gcOpen) {
    card.classList.remove('glossary-collapsed');
    card.classList.add('glossary-open');
    fab.classList.add('open');
    // Focus search
    setTimeout(() => { document.getElementById('gc-search')?.focus(); }, 320);
  } else {
    card.classList.remove('glossary-open');
    card.classList.add('glossary-collapsed');
    fab.classList.remove('open');
  }
};

/* ── DRAG TO REPOSITION ──────────────────────────────────────────────── */
function initDrag() {
  const wrap = document.getElementById('glossary-fab-wrap');
  const fab  = document.getElementById('glossary-fab');
  if (!wrap || !fab) return;

  let dragging = false, startX, startY, origRight, origBottom;

  fab.addEventListener('mousedown', e => {
    // Only start drag on the FAB itself, not a click
    dragging = true;
    startX = e.clientX;
    startY = e.clientY;
    const rect = wrap.getBoundingClientRect();
    origRight  = window.innerWidth  - rect.right;
    origBottom = window.innerHeight - rect.bottom;
    wrap.classList.add('dragging');
    // Switch from right/bottom to left/top positioning for free drag
    wrap.style.right  = 'auto';
    wrap.style.bottom = 'auto';
    wrap.style.left   = rect.left + 'px';
    wrap.style.top    = rect.top  + 'px';
    e.preventDefault();
  });

  window.addEventListener('mousemove', e => {
    if (!dragging) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    const rect = wrap.getBoundingClientRect();
    const newLeft = rect.left + dx;
    const newTop  = rect.top  + dy;
    // Clamp to viewport
    const clampedLeft = Math.max(0, Math.min(newLeft, window.innerWidth  - rect.width));
    const clampedTop  = Math.max(0, Math.min(newTop,  window.innerHeight - rect.height));
    wrap.style.left = clampedLeft + 'px';
    wrap.style.top  = clampedTop  + 'px';
    startX = e.clientX;
    startY = e.clientY;
  });

  window.addEventListener('mouseup', () => {
    if (!dragging) return;
    dragging = false;
    wrap.classList.remove('dragging');
  });

  // Touch drag
  fab.addEventListener('touchstart', e => {
    const t = e.touches[0];
    dragging = true;
    startX = t.clientX; startY = t.clientY;
    const rect = wrap.getBoundingClientRect();
    wrap.style.right  = 'auto';
    wrap.style.bottom = 'auto';
    wrap.style.left   = rect.left + 'px';
    wrap.style.top    = rect.top  + 'px';
  }, { passive: true });

  window.addEventListener('touchmove', e => {
    if (!dragging) return;
    const t = e.touches[0];
    const dx = t.clientX - startX, dy = t.clientY - startY;
    const rect = wrap.getBoundingClientRect();
    wrap.style.left = Math.max(0, Math.min(rect.left + dx, window.innerWidth  - rect.width))  + 'px';
    wrap.style.top  = Math.max(0, Math.min(rect.top  + dy, window.innerHeight - rect.height)) + 'px';
    startX = t.clientX; startY = t.clientY;
  }, { passive: true });

  window.addEventListener('touchend', () => { dragging = false; });
}

/* ── AUTO-HIGHLIGHT from modal opens ────────────────────────────────── */
(function patchOpenModal() {
  const orig = window.openModal;
  if (typeof orig !== 'function') return;
  window.openModal = function(icon, title, sub, body) {
    orig(icon, title, sub, body);
    const words = (title + ' ' + (sub||'')).match(/[A-Z][A-Z0-9\s\/]{1,14}[A-Z0-9]/g) || [];
    for (const w of words) {
      const key = w.trim();
      const match = GLOSSARY.find(g => g.a.toUpperCase() === key.toUpperCase());
      if (match) {
        const safeId = 'gci-' + match.a.replace(/[^a-z0-9]/gi, '-');
        setTimeout(() => gcHighlight(safeId), 350);
        break;
      }
    }
  };
})();

/* ── KEYBOARD ────────────────────────────────────────────────────────── */
document.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'g') {
    e.preventDefault();
    toggleGlossary();
  }
  if (e.key === '/' && gcOpen && document.activeElement?.id !== 'gc-search') {
    const inp = document.getElementById('gc-search');
    if (inp) { e.preventDefault(); inp.focus(); inp.select(); }
  }
  if (e.key === 'Escape' && gcOpen) toggleGlossary();
});

/* ── INIT ────────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  renderGlossary('');
  initDrag();
});
