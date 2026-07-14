'use strict';
/* ═══════════════════════════════════════════════════════════════════════
   PIPELINE.JS — Animated SVG CI/CD pipeline
   Hover any element for plain-English tooltip
   Click any element for full detail modal
═══════════════════════════════════════════════════════════════════════ */

/* ── STAGE DATA ──────────────────────────────────────────────────────── */
const PIPELINE_STAGES = [
  {
    id:'commit', emoji:'💻', label:'Code\nCommit', badge:'Auto', badgeClass:'sb-auto', col:'#0078D4',
    title:'Code Commit & Branch Policy',
    sub:'Azure Repos — Git with enforced branch policies',
    tip:'A developer finishes writing a feature and saves it to the shared codebase in Azure Repos. The moment they open a Pull Request, the system enforces rules: at least 2 colleagues must review and approve the code, and a work item (task ticket) must be linked. Nobody can bypass these rules — not even the project manager.',
    flow: [
      { label:'Developer writes\na feature',         fill:'#E8F3FC', stroke:'#0078D4', tip:'The developer writes code on their own branch — a private copy that doesn\'t affect anyone else until they\'re ready.' },
      { label:'Pull Request\nopened',                fill:'#0078D4', stroke:'#0078D4', white:true, tip:'A Pull Request is a formal request to merge the code into the shared codebase. It starts the review and automation process.' },
      { label:'2 reviewers\nmust approve',           fill:'#E8F3FC', stroke:'#0078D4', tip:'Two colleagues must read the code and approve it. This catches bugs, enforces standards, and ensures no single person can push bad code alone.' },
      { label:'Work item linked\n(mandatory)',       fill:'#E8F3FC', stroke:'#0078D4', tip:'Every code change must be linked to a tracked requirement or bug in Azure DevOps Boards. This creates a complete trail from business requirement to deployed code.' },
      { label:'Merge allowed\n✓',                    fill:'#DFF6DD', stroke:'#107C10', tip:'Only when all conditions are satisfied does the system permit the merge. The code now enters the automated pipeline.' },
    ],
    kpis:[{l:'Min Reviewers',v:'2'},{l:'Work Item',v:'Required'},{l:'Policy',v:'Enforced'}],
    tools:['Azure Repos','Git Branch Policies','PR Required','Linked Work Item']
  },
  {
    id:'build', emoji:'🔨', label:'Build', badge:'Auto', badgeClass:'sb-auto', col:'#0078D4',
    title:'Build & Artefact Packaging',
    sub:'Azure Pipelines — Multi-Stage YAML',
    tip:'The system automatically compiles (assembles) the application code into a working program. Think of it like baking a cake from a recipe — the ingredients (code) are combined and cooked (compiled) into a finished product (artefact) that can be deployed. This takes under 8 minutes and requires no human involvement.',
    flow: [
      { label:'YAML pipeline\ntriggers',            fill:'#E8ECF4', stroke:'#005A9E', tip:'The pipeline.yaml file — a set of instructions stored alongside the code — triggers automatically. No one needs to press a button.' },
      { label:'Maven / npm /\nGradle compiles',     fill:'#005A9E', stroke:'#005A9E', white:true, tip:'The appropriate build tool compiles the source code. Maven for Java services, npm for JavaScript, Gradle for Android. The tool pulls only approved packages from the Azure Artefacts feed.' },
      { label:'Build cache\nsaves ~40%',            fill:'#FFF4CE', stroke:'#C55A00', tip:'Previously compiled components are reused from cache. This saves approximately 40% of build time — a 12-minute build becomes 7 minutes.' },
      { label:'Versioned artefact\npushed to feed', fill:'#005A9E', stroke:'#005A9E', white:true, tip:'The compiled application is packaged and given a unique immutable version number (e.g. v2.3.1-build.847). It is stored in Azure Artefacts — the official source of truth for what gets deployed.' },
      { label:'Build ✓\n< 8 minutes',              fill:'#DFF6DD', stroke:'#107C10', tip:'The entire build completes in under 8 minutes. Any failure sends an instant notification to the developer, who can fix and resubmit.' },
    ],
    kpis:[{l:'Build Time',v:'< 8 min'},{l:'Cache Saving',v:'~40%'},{l:'Artefact Store',v:'Azure Artefacts'}],
    tools:['Azure Pipelines YAML','Maven / npm / Gradle','Azure Artefacts','Build Cache']
  },
  {
    id:'sast', emoji:'🔍', label:'SAST &\nScan', badge:'Security', badgeClass:'sb-sec', col:'#856404',
    title:'Static Analysis & Secret Scanning',
    sub:'Microsoft Defender for DevOps — runs on every PR',
    tip:'Before any code reaches a test environment, the computer reads every line looking for security problems — without running the code. It\'s like a spell-checker for security issues. If it finds a serious problem, the pipeline stops completely and no further steps happen until the developer fixes it.',
    flow: [
      { label:'SAST: code\nread for flaws',        fill:'#FFF3CD', stroke:'#856404', tip:'Static Application Security Testing reads the source code looking for patterns that indicate security vulnerabilities — SQL injection (tricking the database), cross-site scripting (inserting malicious code into web pages), insecure data storage.' },
      { label:'Secret detection:\nno passwords',   fill:'#FFF3CD', stroke:'#856404', tip:'Every line is scanned for accidentally committed secrets — Azure connection keys, database passwords, API credentials, certificates. Any detected secret blocks the pipeline immediately. The developer must remove it and rotate (change) the exposed credential.' },
      { label:'SCA: packages\nchecked for CVEs',   fill:'#FFF3CD', stroke:'#856404', tip:'Software Composition Analysis checks all third-party packages (pre-built code libraries) against the CVE (Common Vulnerabilities and Exposures) database. If a known vulnerable library is used, the pipeline flags it.' },
      { label:'Critical / High?\nPIPELINE BLOCKS', fill:'#FDE7E9', stroke:'#A4262C', tip:'If any Critical or High severity issue is found, the entire pipeline stops. The developer receives an immediate notification. No deployment — to any environment — can proceed until the issue is resolved.' },
      { label:'All clear?\nPipeline continues ✓',  fill:'#DFF6DD', stroke:'#107C10', tip:'If no critical security issues are found, the pipeline continues to the next stage. The developer is notified of any low-severity findings to address in the next sprint.' },
    ],
    kpis:[{l:'SAST',v:'Defender DevOps'},{l:'Secret Scan',v:'Every PR'},{l:'SCA',v:'NuGet/npm/Maven'}],
    tools:['Defender for DevOps','SAST','Secret Detection','SCA Dependency Check']
  },
  {
    id:'container', emoji:'📦', label:'Container\nBuild', badge:'Auto', badgeClass:'sb-auto', col:'#0078D4',
    title:'Containerization & Image Scanning',
    sub:'Docker → Azure Container Registry with Trivy scan',
    tip:'The application is packed into a "container" — a self-contained box that includes the app and everything it needs to run, so it behaves identically on any computer. Think of a shipping container: the goods inside are always the same regardless of which ship carries them. The container is then scanned for security vulnerabilities before being stored.',
    flow: [
      { label:'Dockerfile\nexecuted',             fill:'#E8F3FC', stroke:'#0078D4', tip:'A Dockerfile is a recipe that describes exactly how to build the container. It specifies the operating system, the application code, and any dependencies. Every container built from the same Dockerfile is identical.' },
      { label:'Image tagged\nwith build ID',      fill:'#0078D4', stroke:'#0078D4', white:true, tip:'The container image is given an immutable tag — a unique identifier tied to this specific build (e.g. v2.3.1-build.847). This tag can never be reused. If you deploy build 847, you always get exactly the same container.' },
      { label:'Trivy scans\nfor CVEs',            fill:'#FFF3CD', stroke:'#856404', tip:'Trivy is an open-source security scanner that checks the container image for known vulnerabilities in the operating system and application packages. It checks against the same CVE database as the SAST stage.' },
      { label:'Image pushed\nto Azure ACR',       fill:'#0078D4', stroke:'#0078D4', white:true, tip:'The scanned and approved image is pushed to Azure Container Registry — DGTP\'s private image store. ACR is accessible only through a private network endpoint; no public internet access.' },
      { label:'Image stored ✓\nImmutable',        fill:'#DFF6DD', stroke:'#107C10', tip:'The image is now safely stored and ready to be deployed to any environment. The same image used in Dev will be promoted through QA, UAT, and eventually to Production — ensuring no code changes happen between environments.' },
    ],
    kpis:[{l:'Registry',v:'Azure ACR'},{l:'Image Scan',v:'Trivy'},{l:'Tags',v:'Immutable Build ID'}],
    tools:['Docker','Azure Container Registry','Trivy CVE Scan','Immutable Tags','Private Endpoint']
  },
  {
    id:'dev', emoji:'🌱', label:'Deploy\nDev', badge:'Auto', badgeClass:'sb-auto', col:'#107C10',
    title:'Deploy to Development Environment',
    sub:'Azure Kubernetes Service — Helm Chart — automatic',
    tip:'The container is automatically deployed to the development environment — a safe playground where developers can test their feature without affecting anyone else. Configuration and secrets are automatically injected by Azure services; no developer manually configures anything. Smoke tests run immediately to confirm the service started correctly.',
    flow: [
      { label:'Helm chart\ntemplates deploy',     fill:'#E8F3FC', stroke:'#107C10', tip:'A Helm chart is a deployment recipe for Kubernetes — it describes how many copies of the service to run, how much memory to give it, how it connects to other services, and what health checks to perform. Every service uses the same standardised chart structure.' },
      { label:'AKS Dev\nnamespace target',        fill:'#107C10', stroke:'#107C10', white:true, tip:'The service is deployed to the "Dev" namespace — an isolated section of the Kubernetes cluster. Changes here cannot affect the QA, UAT, or Production namespaces, which are all isolated from each other.' },
      { label:'App Config + KV\nconfig injected', fill:'#FFF4CE', stroke:'#C55A00', tip:'Azure App Configuration injects environment-specific settings (database URLs, API endpoints, feature flags). Azure Key Vault injects secrets (passwords, certificates). The application code never contains configuration — it is always injected at deployment time.' },
      { label:'Smoke tests\nauto-run',            fill:'#107C10', stroke:'#107C10', white:true, tip:'Automated smoke tests immediately confirm that the service started correctly and its health check endpoints respond. If the service crashes on startup, the pipeline fails here and the developer is notified before wasting tester time.' },
      { label:'Dev deployment ✓\nService healthy', fill:'#DFF6DD', stroke:'#107C10', tip:'The service is running in the Dev environment. Developers can now manually test their feature, and the automated test suite begins running in the next pipeline stage.' },
    ],
    kpis:[{l:'Orchestrator',v:'AKS'},{l:'Deployment',v:'Helm Chart'},{l:'Config',v:'App Config + KV'}],
    tools:['Azure Kubernetes Service','Helm Charts','Azure App Configuration','Key Vault','Smoke Tests']
  },
  {
    id:'qa', emoji:'🧪', label:'QA Gate', badge:'Gate', badgeClass:'sb-gate', col:'#107C10',
    title:'Quality Gate — Full Regression Suite',
    sub:'Azure Test Plans + Playwright — 80% coverage enforced',
    tip:'A comprehensive automated test suite runs against the QA environment. "Regression" means checking that everything that worked before still works — even the parts the developer didn\'t touch. If the test coverage drops below 80%, the pipeline stops automatically — this is a hard rule that cannot be overridden.',
    flow: [
      { label:'2,000+ unit tests\nrun in 8 min',   fill:'#E8F3FC', stroke:'#107C10', tip:'Unit tests check individual functions and methods in isolation. Each test verifies that a small piece of logic produces the correct output for a given input. Over 2,000 of these run automatically in about 8 minutes.' },
      { label:'80% coverage\ngate enforced',       fill:'#107C10', stroke:'#107C10', white:true, tip:'Code coverage measures what percentage of code lines are exercised by tests. If less than 80% of code is tested, the gate blocks automatically. This ensures most of the application is validated before any human reviews it.' },
      { label:'Integration tests\nvs APIM mocks',  fill:'#E8F3FC', stroke:'#107C10', tip:'Integration tests check that different services talk to each other correctly. In DGTP, these run against Azure API Management mock responses — so they work even before the real backend registry APIs are live.' },
      { label:'Playwright E2E\ncitizen journeys',  fill:'#107C10', stroke:'#107C10', white:true, tip:'Playwright automates a real browser to simulate complete citizen journeys — register an account, submit an application, check status, receive a notification. If any of these journeys breaks, the pipeline fails.' },
      { label:'Quality Gate ✓\nAll tests pass',   fill:'#DFF6DD', stroke:'#107C10', tip:'When all tests pass and coverage exceeds 80%, the quality gate opens and the pipeline moves to performance testing.' },
    ],
    kpis:[{l:'Coverage Gate',v:'≥ 80%'},{l:'Test Tool',v:'Azure Test Plans'},{l:'E2E',v:'Playwright'}],
    tools:['Azure Test Plans','80% Coverage Gate','Playwright E2E','Postman Newman','Integration Tests']
  },
  {
    id:'perf', emoji:'⚡', label:'Load\nTest', badge:'Gate', badgeClass:'sb-gate', col:'#107C10',
    title:'Performance Gate — Azure Load Testing',
    sub:'Managed load testing — 200 users, P95 < 2 seconds',
    tip:'This stage checks whether the system can cope with real-world citizen demand. 200 virtual citizens simultaneously use the portal, and the system must respond to 95% of requests within 2 seconds. If it fails, the pipeline stops — you cannot release a slow government service to the public.',
    flow: [
      { label:'200 virtual users\nsimultaneously',   fill:'#E8F3FC', stroke:'#107C10', tip:'Azure Load Testing spins up 200 simulated citizen users who all use the portal at the same time. This simulates a busy morning when many citizens are submitting applications or renewing registrations.' },
      { label:'All citizen\njourney paths hit',      fill:'#107C10', stroke:'#107C10', white:true, tip:'The test doesn\'t just hammer one endpoint — it simulates realistic citizen behaviour: browsing services, searching, submitting forms, uploading documents, checking status. All critical paths are covered.' },
      { label:'P95 < 2s\nmeasured',                  fill:'#FFF4CE', stroke:'#C55A00', tip:'P95 means the 95th percentile — 95% of all requests must complete within 2 seconds. This allows for occasional slower responses without failing the gate, while still ensuring the vast majority of citizen interactions are fast.' },
      { label:'Error rate\n< 0.1% checked',          fill:'#107C10', stroke:'#107C10', white:true, tip:'Less than 1 in 1,000 requests should result in an error. Any higher error rate indicates a stability problem that would be experienced by real citizens.' },
      { label:'Performance ✓\nGate passes',          fill:'#DFF6DD', stroke:'#107C10', tip:'The system has proven it can handle real citizen load at acceptable speed. Results are stored in Azure Pipelines and compared against the previous release to detect performance regressions.' },
    ],
    kpis:[{l:'Concurrent Users',v:'200'},{l:'P95 Target',v:'< 2 seconds'},{l:'Error Rate',v:'< 0.1%'}],
    tools:['Azure Load Testing','200 Concurrent Users','P95 < 2s Gate','Managed Infra','Baseline Comparison']
  },
  {
    id:'uat', emoji:'👥', label:'UAT\nApproval', badge:'Human', badgeClass:'sb-human', col:'#C55A00',
    title:'UAT — Business Owner Approval Gate',
    sub:'Human approval required — 48-hour SLA',
    tip:'This is one of the two points in the pipeline where a human must make a decision. The business owner — the government representative who requested the feature — reviews the working feature in the UAT environment and formally approves it for production deployment. No technical team member can approve on their behalf.',
    flow: [
      { label:'UAT environment\nprovisioned',       fill:'#FFF4CE', stroke:'#C55A00', tip:'A UAT (User Acceptance Testing) environment is provisioned on-demand via Bicep IaC — an identical copy of production. It is created fresh for each release cycle and torn down after sign-off to control costs.' },
      { label:'Business owner\nreviews feature',    fill:'#C55A00', stroke:'#C55A00', white:true, tip:'The business owner — for example, the head of the Civil Registry or the Director of Business Licensing — uses the real feature in a production-like environment. They confirm it matches what they asked for.' },
      { label:'Azure Pipelines\nenvironment gate',  fill:'#FFF4CE', stroke:'#C55A00', tip:'The approval is recorded in Azure Pipelines as a formal environment gate — not an email or a verbal confirmation. This creates an immutable audit record showing exactly who approved what and when.' },
      { label:'48-hour SLA\nfor response',          fill:'#FFF4CE', stroke:'#C55A00', tip:'The business owner has 48 hours to respond. If they do not respond within 48 hours, the gate expires and the feature waits for the next release cycle. This SLA prevents the pipeline from being blocked indefinitely.' },
      { label:'UAT Approved ✓\nProceeds to Sec',   fill:'#DFF6DD', stroke:'#107C10', tip:'With business owner approval recorded, the pipeline proceeds to the Security Gate. The approval is logged in the immutable Azure DevOps audit trail.' },
    ],
    kpis:[{l:'Gate Type',v:'Human Approval'},{l:'Approver',v:'Business Owner'},{l:'Response SLA',v:'48 hours'}],
    tools:['Azure Pipelines Environment Gate','Business Owner Approval','Audit Trail','48h SLA','UAT Environment']
  },
  {
    id:'security', emoji:'🛡️', label:'Security\nGate', badge:'Security', badgeClass:'sb-sec', col:'#856404',
    title:'Pre-Production Security Gate',
    sub:'Defender for Cloud + OWASP ZAP DAST — dual sign-off',
    tip:'Before touching production, the entire system is scanned dynamically — actually running the application and probing it for vulnerabilities. Two people must sign off: the Technical Lead (who confirms the code is production-ready) and the Security Officer (who confirms the security posture is acceptable). Both approvals are required.',
    flow: [
      { label:'Defender for Cloud\nposture scan',    fill:'#FFF3CD', stroke:'#856404', tip:'Microsoft Defender for Cloud assesses all Azure resources against the Microsoft Cloud Security Benchmark. It checks for open firewall rules, unencrypted storage, insecure Kubernetes configurations, and missing security controls.' },
      { label:'OWASP ZAP DAST\nheadless scan',       fill:'#FFF3CD', stroke:'#856404', tip:'OWASP ZAP (Zed Attack Proxy) runs in headless mode — it automatically attacks the running application looking for OWASP Top 10 vulnerabilities: SQL injection, broken authentication, sensitive data exposure, etc. It finds problems that can only be seen in a running application.' },
      { label:'Secure Score\nthreshold checked',    fill:'#FFF3CD', stroke:'#856404', tip:'The Defender for Cloud Secure Score must be above the programme threshold. Any critical findings block the gate. The score is automatically calculated from the posture scan results.' },
      { label:'Tech Lead +\nSec Officer sign-off',  fill:'#856404', stroke:'#856404', white:true, tip:'Two named individuals must approve in Azure Pipelines: the Technical Lead confirms the code architecture and implementation is production-ready; the Security Officer confirms the security posture, DAST results, and Secure Score are all acceptable.' },
      { label:'Security Gate ✓\nReady for Prod',    fill:'#DFF6DD', stroke:'#107C10', tip:'With both approvals recorded, the system is cleared for production deployment. All security gate results are logged permanently in the programme audit trail.' },
    ],
    kpis:[{l:'DAST',v:'OWASP ZAP'},{l:'Posture',v:'Defender for Cloud'},{l:'Approvers',v:'2 required'}],
    tools:['Defender for Cloud','OWASP ZAP DAST','Secure Score Gate','Tech Lead + SecOff Approval','Dual Sign-Off']
  },
  {
    id:'prod', emoji:'🚀', label:'Production\nBlue/Green', badge:'CAB', badgeClass:'sb-human', col:'#003087',
    title:'Production — Blue/Green Deployment',
    sub:'CAB approval → zero-downtime deploy → auto-rollback',
    tip:'The Steering Committee Change Advisory Board must formally approve this deployment. The release then uses Blue/Green deployment — the new version runs alongside the old one and traffic is gradually shifted. If anything goes wrong within 15 minutes, Azure Monitor automatically switches all traffic back to the old version. Citizens never experience an outage.',
    flow: [
      { label:'CAB: Steering\nCommittee approves',  fill:'#E8ECF4', stroke:'#003087', tip:'The Change Advisory Board — senior representatives from all stakeholder groups — reviews and approves the production deployment in Azure Pipelines. This is the highest-level governance gate. Without CAB approval, no production deployment can proceed.' },
      { label:'Blue environment\nstays live',        fill:'#0078D4', stroke:'#0078D4', white:true, tip:'The current production system (Blue) continues serving all citizen traffic normally during the deployment. Citizens see no interruption while the new version is being deployed.' },
      { label:'Green: new version\ndeployed to AKS', fill:'#107C10', stroke:'#107C10', white:true, tip:'The new version (Green) is deployed to a parallel set of Kubernetes pods. It is fully running and connected to production databases, but not yet serving citizen traffic.' },
      { label:'Azure Monitor\nwatches 15 min',      fill:'#FFF4CE', stroke:'#C55A00', tip:'For 15 minutes, Azure Monitor measures the error rate and P99 response time of the Green environment. If either metric exceeds thresholds (e.g. error rate > 1%), it triggers an automatic rollback — switching all traffic back to Blue.' },
      { label:'✓ Green live\nor auto-rollback',     fill:'#DFF6DD', stroke:'#107C10', tip:'If all metrics stay within bounds, Azure Traffic Manager shifts all citizen traffic to Green. Blue is kept warm for 24 hours in case a rollback is needed. If problems are detected, Blue resumes automatically — zero citizen impact.' },
    ],
    kpis:[{l:'Strategy',v:'Blue/Green AKS'},{l:'Rollback',v:'Automated'},{l:'Downtime',v:'Zero'}],
    tools:['CAB Approval Gate','Blue/Green AKS','Azure Monitor Rollback','Zero-Downtime','Traffic Manager DR']
  },
];

/* ── ENVIRONMENT LANES ───────────────────────────────────────────────── */
const PIPELINE_ENVS = [
  { id:'env-dev',     label:'DEV',      sublabel:'Auto-deploy on merge',       col:'#0078D4', bg:'#E8F3FC',
    tip:'The Development environment is always running in AKS. Every successful pipeline run automatically deploys here. Developers can test their features immediately after merging code.',
    detail:'Developers see their changes live within 15 minutes of merging. Azure App Configuration and Key Vault inject environment-specific settings automatically — no manual configuration.' },
  { id:'env-qa',      label:'QA',       sublabel:'Quality Gate + Regression',  col:'#107C10', bg:'#DFF6DD',
    tip:'The QA environment runs the full test suite — over 2,000 automated tests including end-to-end citizen journeys via Playwright. It resets weekly via an automated pipeline and costs are minimized using Azure Dev/Test pricing.',
    detail:'80% code coverage enforced. Playwright E2E tests simulate real citizen journeys. Postman/Newman validates API contracts. Environment resets weekly.' },
  { id:'env-uat',     label:'UAT',      sublabel:'Business Owner sign-off',    col:'#C55A00', bg:'#FFF4CE',
    tip:'The UAT environment is provisioned on-demand for each release cycle — an exact copy of production built from the same Bicep IaC templates. Data is anonymized from production for realistic testing. The environment is torn down after business owner sign-off.',
    detail:'Provisioned on-demand via Bicep IaC. Production parity guaranteed. Business owner accesses via Azure Test Plans portal. Auto-teardown after sign-off.' },
  { id:'env-preprod', label:'PRE-PROD', sublabel:'Security scan + DAST',      col:'#856404', bg:'#FFF3CD',
    tip:'The Pre-Production environment is a production clone where security scanning happens. OWASP ZAP DAST actively attacks the running application. Maximum 72-hour lifetime with automated teardown to control costs.',
    detail:'72-hour max lifetime. Data anonymized via Azure Data Factory. OWASP ZAP DAST runs here. Defender for Cloud posture scan. Technical Lead + Security Officer must both approve.' },
  { id:'env-prod',    label:'PROD',     sublabel:'Blue/Green + Auto-Rollback', col:'#003087', bg:'#E8ECF4',
    tip:'The Production environment serves real Sint Maarten citizens. Multi-zone Azure Kubernetes Service ensures high availability across data centre zones. Azure Traffic Manager provides failover to a disaster recovery region if needed.',
    detail:'Multi-zone AKS for 99.9% SLA. Blue/Green deployment with automated rollback. Azure Front Door CDN. Private Link to all data services. Citizen data never on public internet.' },
];

/* ── LAYER STRIP CARDS ───────────────────────────────────────────────── */
const PIPELINE_STRIPS = [
  { label:'Infrastructure\nas Code',    sublabel:'Azure Bicep + Terraform', col:'#6B4FA8', bg:'#F3EFF9',
    tip:'Every Azure resource is defined as code — no one ever clicks "Create" in the Azure Portal. Azure Bicep files in Azure Repos describe every server, database, and network rule. Changes go through peer review. Any environment can be rebuilt identically from these files in under 2 hours.',
    tools:['Azure Bicep','Terraform','Azure Repos IaC','PR-Gated Deploy'] },
  { label:'Azure Container\nRegistry', sublabel:'Immutable images + Trivy', col:'#0078D4', bg:'#E8F3FC',
    tip:'Azure Container Registry stores every Docker image ever built by the DGTP pipeline. Images are tagged with immutable build IDs — the same image deployed to Dev will be the identical image promoted to Production. No code changes between environments. Trivy scans every image on push.',
    tools:['Azure Container Registry','Immutable Build Tags','Trivy Scan','Geo-Replication','Private Endpoint'] },
  { label:'Observability\nStack',       sublabel:'Azure Monitor + App Insights', col:'#107C10', bg:'#DFF6DD',
    tip:'Complete visibility from citizen browser click to database query. Application Insights traces every request across all microservices. Azure Log Analytics stores all logs for 2 years with immutable retention. Power BI dashboards give the Steering Committee live programme metrics.',
    tools:['Azure Monitor','Application Insights','Log Analytics 2yr','Power BI Dashboards','KQL Queries'] },
  { label:'Security\nPosture',         sublabel:'Defender for Cloud — Sentinel', col:'#856404', bg:'#FFF3CD',
    tip:'Microsoft Defender for Cloud continuously calculates a Secure Score for all DGTP Azure resources. Microsoft Sentinel watches all activity 24/7 using AI to detect threats. Automated SOAR playbooks respond to incidents in seconds — no human needs to be awake at 3am.',
    tools:['Defender for Cloud','Secure Score','Microsoft Sentinel SIEM','SOAR Playbooks','24/7 Monitoring'] },
];

/* ── BUILD PIPELINE SVG ──────────────────────────────────────────────── */
function buildPipelineSVG() {
  const container = document.getElementById('pipeline-svg-container');
  if (!container) return;

  const W = 1160, STAGE_H = 520;
  const n = PIPELINE_STAGES.length;
  const stageR = 36;                   // circle radius
  const stageGap = (W - 40) / n;
  const cy = 80;                       // circle centre Y
  const badgeY = cy - stageR - 20;
  const labelY = cy + stageR + 14;

  // Environment lane geometry
  const ENV_Y = 185, ENV_H = 58, envW = (W - 40) / PIPELINE_ENVS.length;
  // Strip cards
  const STRIP_Y = 272, STRIP_H = 58, stripW = (W - 40) / PIPELINE_STRIPS.length;
  // Flow arrows section
  const FLOW_Y = 355, FLOW_H = 140;

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${STAGE_H}" width="100%" height="${STAGE_H}" font-family="Arial,Helvetica,sans-serif" id="pipeline-main-svg">
<defs>
  <marker id="pip-arr" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#0078D4"/></marker>
  <marker id="pip-arr-grn" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#107C10"/></marker>
  <filter id="pip-shd"><feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.12"/></filter>
</defs>

<!-- Section labels -->
<text x="20" y="16" font-size="9" font-weight="700" fill="#7A8C9A" letter-spacing="0.12em">PIPELINE STAGES — hover for explanation · click for full details</text>
<text x="20" y="${ENV_Y - 6}" font-size="9" font-weight="700" fill="#7A8C9A" letter-spacing="0.1em">DEPLOYMENT ENVIRONMENTS</text>
<text x="20" y="${STRIP_Y - 6}" font-size="9" font-weight="700" fill="#7A8C9A" letter-spacing="0.1em">PLATFORM FOUNDATIONS</text>
<text x="20" y="${FLOW_Y - 6}" font-size="9" font-weight="700" fill="#7A8C9A" letter-spacing="0.1em">ANIMATED FLOW — hover each step for plain-English explanation</text>

<!-- Pipeline connector line -->
<line x1="${20 + stageGap * 0.5}" y1="${cy}" x2="${20 + stageGap * (n - 0.5)}" y2="${cy}" stroke="#D0D7DE" stroke-width="2"/>
`;

  /* ── Stage circles ── */
  PIPELINE_STAGES.forEach((s, i) => {
    const cx = 20 + stageGap * i + stageGap / 2;
    // Arrow to next
    if (i < n - 1) {
      const x1 = cx + stageR + 2, x2 = cx + stageGap - stageR - 2;
      svg += `<line x1="${x1}" y1="${cy}" x2="${x2}" y2="${cy}" stroke="#0078D4" stroke-width="1.5" marker-end="url(#pip-arr)" class="pf-arrow" style="animation-delay:${(i*0.1).toFixed(2)}s"/>`;
    }
    // Badge
    const badge = s.badgeClass;
    const badgeBg = badge==='sb-auto'?'#E8F3FC':badge==='sb-gate'?'#DFF6DD':badge==='sb-human'?'#FFF4CE':'#FFF3CD';
    const badgeFg = badge==='sb-auto'?'#0078D4':badge==='sb-gate'?'#107C10':badge==='sb-human'?'#C55A00':'#856404';
    svg += `<rect x="${cx-28}" y="${badgeY}" width="56" height="14" rx="7" fill="${badgeBg}"/>
<text x="${cx}" y="${badgeY+10}" text-anchor="middle" font-size="7.5" font-weight="700" fill="${badgeFg}">${s.badge.toUpperCase()}</text>`;

    // Circle + tooltip overlay
    const lns = s.label.split('\n');
    const ty  = cy - (lns.length - 1) * 7;
    svg += `<g class="pf-node pf-node-hover" style="animation-delay:${(i*0.07).toFixed(2)}s; cursor:pointer;" onclick="openPipelineStage('${s.id}')">
  <circle cx="${cx}" cy="${cy}" r="${stageR}" fill="white" stroke="${s.col}" stroke-width="2" class="pf-node-rect" filter="url(#pip-shd)"/>
  <text x="${cx}" y="${cy-6}" text-anchor="middle" font-size="19">${s.emoji}</text>
  ${lns.map((l,li)=>`<text x="${cx}" y="${labelY+li*13}" text-anchor="middle" font-size="9" font-weight="700" fill="#1A2332">${l}</text>`).join('')}
  <rect x="${cx-stageR}" y="${cy-stageR}" width="${stageR*2}" height="${stageR*2}" rx="50%" fill="transparent"
    data-tip="${s.tip.replace(/"/g,'&quot;')}"
    onmouseenter="showFlowTip(event,this)" onmouseleave="hideFlowTip()" class="pf-tip-overlay"/>
</g>`;
  });

  /* ── Environment lanes ── */
  PIPELINE_ENVS.forEach((env, i) => {
    const ex = 20 + envW * i;
    const ecx = ex + envW / 2 - 2;
    // Arrow between envs
    if (i < PIPELINE_ENVS.length - 1) {
      svg += `<line x1="${ex + envW - 10}" y1="${ENV_Y + ENV_H/2}" x2="${ex + envW - 2}" y2="${ENV_Y + ENV_H/2}" stroke="${env.col}" stroke-width="1.5" marker-end="url(#pip-arr)" class="pf-arrow" style="animation-delay:${(0.8+i*0.12).toFixed(2)}s"/>`;
    }
    svg += `<g class="pf-node pf-node-hover" style="animation-delay:${(0.6+i*0.09).toFixed(2)}s; cursor:pointer;" onclick="openPipelineEnv('${env.id}')">
  <rect x="${ex+2}" y="${ENV_Y}" width="${envW-16}" height="${ENV_H}" rx="8" fill="${env.bg}" stroke="${env.col}" stroke-width="1.5" class="pf-node-rect" filter="url(#pip-shd)"/>
  <text x="${ecx}" y="${ENV_Y+20}" text-anchor="middle" font-size="12" font-weight="700" fill="${env.col}">${env.label}</text>
  <text x="${ecx}" y="${ENV_Y+35}" text-anchor="middle" font-size="9" fill="#5A6B7A">${env.sublabel}</text>
  <text x="${ecx}" y="${ENV_Y+50}" text-anchor="middle" font-size="8" fill="${env.col}" font-style="italic">▼ click for details</text>
  <rect x="${ex+2}" y="${ENV_Y}" width="${envW-16}" height="${ENV_H}" rx="8" fill="transparent"
    data-tip="${env.tip.replace(/"/g,'&quot;')}"
    onmouseenter="showFlowTip(event,this)" onmouseleave="hideFlowTip()" class="pf-tip-overlay"/>
</g>`;
  });

  /* ── Strip cards ── */
  PIPELINE_STRIPS.forEach((strip, i) => {
    const sx = 20 + stripW * i;
    const scx = sx + stripW / 2 - 2;
    const lns = strip.label.split('\n');
    svg += `<g class="pf-node pf-node-hover" style="animation-delay:${(1.0+i*0.1).toFixed(2)}s; cursor:pointer;" onclick="openPipelineStrip(${i})">
  <rect x="${sx+2}" y="${STRIP_Y}" width="${stripW-16}" height="${STRIP_H}" rx="7" fill="${strip.bg}" stroke="${strip.col}" stroke-width="1.5" class="pf-node-rect" filter="url(#pip-shd)"/>
  ${lns.map((l,li)=>`<text x="${scx}" y="${STRIP_Y+16+li*13}" text-anchor="middle" font-size="10" font-weight="700" fill="${strip.col}">${l}</text>`).join('')}
  <text x="${scx}" y="${STRIP_Y+45}" text-anchor="middle" font-size="9" fill="#5A6B7A">${strip.sublabel}</text>
  <rect x="${sx+2}" y="${STRIP_Y}" width="${stripW-16}" height="${STRIP_H}" rx="7" fill="transparent"
    data-tip="${strip.tip.replace(/"/g,'&quot;')}"
    onmouseenter="showFlowTip(event,this)" onmouseleave="hideFlowTip()" class="pf-tip-overlay"/>
</g>`;
  });

  /* ── Animated inner flow (5 steps per selected stage) ── */
  svg += `<rect x="20" y="${FLOW_Y}" width="${W-40}" height="${FLOW_H}" rx="10" fill="#F8FAFB" stroke="#D0D7DE" stroke-width="1"/>
<g id="pipeline-flow-group">
  <text id="pipeline-flow-title" x="${W/2}" y="${FLOW_Y+22}" text-anchor="middle" font-size="11" font-weight="700" fill="#003087">← Click any stage above to see its detailed flow here</text>
</g>`;

  /* ── Legend ── */
  const legY = FLOW_Y + FLOW_H + 12;
  svg += `
<text x="20" y="${legY+10}" font-size="10" font-weight="700" fill="#7A8C9A">LEGEND:</text>
<rect x="90" y="${legY+2}" width="48" height="13" rx="6" fill="#E8F3FC"/><text x="114" y="${legY+11}" text-anchor="middle" font-size="8" font-weight="700" fill="#0078D4">AUTO</text>
<text x="144" y="${legY+11}" font-size="9" fill="#5A6B7A">Fully automated</text>
<rect x="248" y="${legY+2}" width="48" height="13" rx="6" fill="#DFF6DD"/><text x="272" y="${legY+11}" text-anchor="middle" font-size="8" font-weight="700" fill="#107C10">GATE</text>
<text x="302" y="${legY+11}" font-size="9" fill="#5A6B7A">Quality/performance gate</text>
<rect x="435" y="${legY+2}" width="54" height="13" rx="6" fill="#FFF4CE"/><text x="462" y="${legY+11}" text-anchor="middle" font-size="8" font-weight="700" fill="#C55A00">HUMAN</text>
<text x="495" y="${legY+11}" font-size="9" fill="#5A6B7A">Human approval required</text>
<rect x="640" y="${legY+2}" width="58" height="13" rx="6" fill="#FFF3CD"/><text x="669" y="${legY+11}" text-anchor="middle" font-size="8" font-weight="700" fill="#856404">SECURITY</text>
<text x="704" y="${legY+11}" font-size="9" fill="#5A6B7A">Security validation gate</text>
`;

  svg += `</svg>`;

  container.innerHTML = `
    <div style="background:white;border:1px solid var(--border);border-radius:12px;overflow:hidden;box-shadow:var(--shadow-md);">
      <div style="padding:10px 16px;background:var(--gray-50);border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
        <div style="font-size:13px;font-weight:700;color:var(--navy);">Azure Pipelines — Multi-Stage CI/CD Architecture</div>
        <div style="font-size:11px;color:var(--text-muted);font-style:italic;">🖱 Hover any element for plain-English explanation · Click for full details</div>
      </div>
      <div style="padding:14px 18px;overflow-x:auto;">${svg}</div>
      <div style="padding:8px 16px;font-size:11px;color:var(--text-muted);font-style:italic;border-top:1px solid var(--border);background:white;">
        Ten stages from code commit to Blue/Green production. All stages defined in Azure Pipelines YAML. Orange = Human approval. Yellow = Security gate. Green = Quality gate.
      </div>
    </div>`;

  // Animate stage flow on click
  PIPELINE_STAGES.forEach(s => {
    container.querySelectorAll(`[onclick="openPipelineStage('${s.id}')"]`).forEach(el => {
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        renderInlineFlow(s);
      });
    });
  });
}

/* ── RENDER INLINE FLOW STRIP ────────────────────────────────────────── */
function renderInlineFlow(stage) {
  const group = document.getElementById('pipeline-flow-group');
  if (!group || !stage.flow) return;
  const W = 1160, FLOW_Y = 355, FLOW_H = 140;
  const n  = stage.flow.length;
  const fw = (W - 80) / n;
  const fy = FLOW_Y + 30;
  const fh = 70;

  let inner = `<text id="pipeline-flow-title" x="${W/2}" y="${FLOW_Y+17}" text-anchor="middle" font-size="11" font-weight="700" fill="${stage.col}">${stage.emoji} ${stage.title} — Step-by-Step Flow</text>`;

  stage.flow.forEach((step, i) => {
    const fx = 40 + fw * i;
    const fcx = fx + fw / 2 - 6;
    const lns = step.label.split('\n');
    const ty  = fy + fh / 2 - (lns.length - 1) * 7;
    const delay = (i * 0.12).toFixed(2);

    // Arrow to next
    if (i < n - 1) {
      const ax1 = fx + fw - 14, ax2 = fx + fw - 4;
      inner += `<line x1="${ax1}" y1="${fy + fh/2}" x2="${ax2}" y2="${fy + fh/2}" stroke="${stage.col}" stroke-width="1.5" marker-end="url(#pip-arr)" class="pf-arrow" style="animation-delay:${delay}s"/>`;
    }

    inner += `<g class="pf-node pf-node-hover" style="animation-delay:${delay}s; cursor:default;">
  <rect x="${fx}" y="${fy}" width="${fw-16}" height="${fh}" rx="7" fill="${step.fill}" stroke="${step.stroke}" stroke-width="1.5" class="pf-node-rect"/>
  ${lns.map((l,li)=>`<text x="${fcx}" y="${ty+li*14}" text-anchor="middle" font-size="9" font-weight="700" fill="${(step.white||(!step.fill.startsWith('#E')&&!step.fill.startsWith('#F')))?'white':'#1A2332'}">${l}</text>`).join('')}
  <rect x="${fx}" y="${fy}" width="${fw-16}" height="${fh}" rx="7" fill="transparent"
    data-tip="${(step.tip||'').replace(/"/g,'&quot;')}"
    onmouseenter="showFlowTip(event,this)" onmouseleave="hideFlowTip()" class="pf-tip-overlay"/>
</g>`;
  });

  group.innerHTML = inner;
  // re-attach tooltip for the new rects
  window.attachTooltips && window.attachTooltips(group);
}

/* ── CLICK HANDLERS ──────────────────────────────────────────────────── */
window.openPipelineStage = function(id) {
  const s = PIPELINE_STAGES.find(x => x.id === id);
  if (!s || typeof openModal !== 'function') return;

  renderInlineFlow(s);

  const kpiHtml = `<div class="detail-kpi-grid">${s.kpis.map(k=>`<div class="detail-kpi"><div class="detail-kpi-label">${k.l}</div><div class="detail-kpi-value">${k.v}</div></div>`).join('')}</div>`;
  const tagHtml = `<div style="margin-top:10px;">${s.tools.map(t=>`<span class="detail-tag">${t}</span>`).join('')}</div>`;

  openModal(s.emoji, s.title, s.sub,
    `<div class="detail-modal-desc">${s.tip}</div>
     <div style="background:var(--gray-50);border:1px solid var(--border);border-radius:7px;padding:12px 14px;margin:12px 0;">
       <div style="font-size:10px;font-weight:700;color:var(--text-muted);letter-spacing:0.1em;text-transform:uppercase;margin-bottom:8px;">Step-by-step flow</div>
       <div style="display:flex;flex-direction:column;gap:5px;">
       ${s.flow.map((f,fi)=>`<div style="display:flex;align-items:flex-start;gap:8px;font-size:12px;">
         <span style="flex-shrink:0;width:20px;height:20px;border-radius:50%;background:${f.stroke};color:white;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;">${fi+1}</span>
         <div><strong>${f.label.replace('\n',' ')}</strong><br><span style="color:var(--text-muted);">${f.tip}</span></div>
       </div>`).join('')}
       </div>
     </div>
     ${kpiHtml}${tagHtml}`
  );
};

window.openPipelineEnv = function(id) {
  const e = PIPELINE_ENVS.find(x => x.id === id);
  if (!e || typeof openModal !== 'function') return;
  openModal('🌐', e.label + ' Environment', e.sublabel,
    `<div class="detail-modal-desc">${e.tip}</div>
     <div class="detail-modal-desc" style="margin-top:10px;background:var(--azure-tint);padding:10px 14px;border-radius:6px;border-left:3px solid var(--azure);">${e.detail}</div>`
  );
};

window.openPipelineStrip = function(i) {
  const s = PIPELINE_STRIPS[i];
  if (!s || typeof openModal !== 'function') return;
  const tagHtml = `<div style="margin-top:10px;">${s.tools.map(t=>`<span class="detail-tag">${t}</span>`).join('')}</div>`;
  openModal('⚙️', s.label.replace('\n',' '), s.sublabel,
    `<div class="detail-modal-desc">${s.tip}</div>${tagHtml}`
  );
};

/* ── INIT ────────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', buildPipelineSVG);
