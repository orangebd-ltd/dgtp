# DGTP D2.2D — Interoperability Platform: Workshops, Architecture & KPI Framework

**Government of Sint Maarten · Digital Government Transformation Project (DGTP) · Deliverable D2.2D**

A single landing page for the D2.2D engagement — the **three interactive workshops**, the **six architecture references** they produced, and the **KPI framework** (the *KPI Discussion* deck plus the interactive *KPI Atlas* calculator) that proves the platform delivers.

> **Keep every file in the same folder.** The KPI Atlas calculator loads the architecture decks by filename to embed them, so they must sit alongside it. All decks in this bundle are **password-free**.

---

## The platform in one paragraph

The D2.2D Interoperability Platform lets a citizen or business prove a fact **once** and reuse it everywhere. Six government registries speak one **Common Message Format (CMF)**; a **national eID** signs the user in; **eight security gates** check every request; a **BPMN workflow engine** runs each case through an eight-state lifecycle on **Microsoft Azure**; and an immutable **seven-year audit trail** records it all. Three workshops designed and pressure-tested that architecture. The KPI framework then answers the only question that matters to the World Bank and the Government: *is it actually working?* Throughout every session and every KPI we follow one recurring persona — **Marcus**, a sole proprietor — so that each number has a human face.

---

## 1 · The three workshops

The engagement was delivered as three interactive working sessions. Each built on the last: architecture → detailed design → security hardening.

### Session 1 — Interoperability Platform & Architecture *(foundation)*
The kickoff sessions that turned strategy into a concrete architecture: the high-level design, the six binding architecture decisions, the Azure cloud shape, and the CI/CD + measurement approach for the selected e-services.

- **[Interoperability Platform — Executive Briefing / High-Level Design](./archi4wb.html)** — the 7-layer HLD: six registries, one CMF hub, eID sign-in, eight gates.
- **[Six Architecture Decisions](./govmap.html)** — six open questions (data bus, appointments, notifications, traceability, application lifecycle, citizen happiness) resolved into six concrete Azure choices.
- **[Azure Cloud Architecture (Part 2)](./dgtp_cloud_architecture.html)** — three environments (dev/staging/prod) across seven layers, with autoscale, Service Bus, Cosmos DB, App Insights.
- **[Selected e-Services — Time-Saving Strategy](./index.html)** — the multi-stage CI/CD & DevSecOps pipeline and the *“How We Know It Is Working”* measurement layer.

**Insight:** this session fixed the two ideas everything else depends on — *once-only* (read a verified fact a single time, never re-collect it) and *straight-through processing* (registries + adapters + BPMN handle the routine case with no human in the loop). Those two ideas are exactly what the outcome KPIs later measure.

### Session 2 — Design Workshop · Low-Level Design Deep Dive
- **[DGTP Design Workshop — LLD Deep Dive](./dgtp_workshop_v2.html)** *(Session 2)*

**Insight:** where Session 1 drew the boxes, Session 2 opened them. It works through the **interoperability stack that normalises every registry into the CMF**, the adapter engine, the portal’s e-service flows, the message/queue design, and the payment path. This is the session that makes the *Vendor-Enabled Tracking* KPIs credible — you can only promise observability once the low-level design says exactly what is logged where.

### Session 3 — Security · Interactive Workshop *(Low-Level Design)*
- **[D2.2D Security — Interactive Workshop](./workshop3_security.html)** *(Session 3)*

**Insight:** the security LLD — a threat model, three perimeter defences, sealed network zones over HTTPS, the eight API gates, eID/Entra identity checks, document encryption, *no card data ever handled*, an append-only seven-year audit trail, secure CI/CD, and continuous monitoring with Sentinel and Defender. This session is the source of the audit-trail-completeness, unauthorised-access-monitoring, security-compliance and security-backlog KPIs.

---

## 2 · The six architecture references

The KPI framework doesn’t float in the air — every KPI is measured at a real component of one of these six architectures. This is the same mapping the KPI Atlas calculator uses in its in-app *architecture recall*.

| # | Architecture | Deck | What it anchors in the KPIs |
|---|---|---|---|
| 1 | Interoperability Platform (HLD) | [archi4wb.html](./archi4wb.html) | Integration coverage · registry reuse (once-only) · real-time validation · first-time approval |
| 2 | Six Architecture Decisions | [govmap.html](./govmap.html) | Appointment attendance · satisfaction & the citizen-experience (CXI) score · service-standard timeliness · backlog |
| 3 | Azure Cloud — 7-layer, 3 environments | [dgtp_cloud_architecture.html](./dgtp_cloud_architecture.html) | Uptime · latency · CPU/memory · queue & message health · alerting |
| 4 | CI/CD & DevSecOps | [index.html](./index.html) | Deployment frequency · lead time · change-failure rate · restore time · test coverage *(the DORA metrics)* |
| 5 | Measurement & Reporting layer | [index.html](./index.html) | Digital take-up · completion · drop-off · reporting availability · reconciliation |
| 6 | Security Architecture (LLD) | [workshop3_security.html](./workshop3_security.html) | Audit-trail completeness · security & governance compliance · unauthorised-access monitoring · security backlog |

**Insight:** architectures 4 and 5 share one deck (`index.html`) because delivery discipline and measurement discipline are two views of the same pipeline — you can only *report automatically* what the CI/CD pipeline already *measures automatically*.

---

## 3 · The KPI framework — the presentation

This is the deliverable for the D2.2D KPI meeting. It is built to be run **split-screen**: the *Discussion* deck to tell the story, the *KPI Atlas* calculator to prove every number.

- **[KPI Discussion — Presentation deck](./KPI_Discussion_Slides.html)**
  A 31-slide executive deck. Every KPI plays as a short **story on the real architecture**: tap a KPI and Marcus’s request lights up the components — Front Door → App Service → BPMN Workflow → … → the exact point the KPI is measured — with a plain-language, four-part explanation *(what it measures · where it’s measured · a worked example · what the result means)*. Includes a **building-blocks & standards primer** (with a BPMN lifecycle diagram), the four real architecture diagrams, and an **interactive architecture map** showing which of the 62 KPIs sit at which step. *(Open in a browser · ← → to move · **F** for fullscreen.)*

- **[KPI Atlas — Interactive calculator](./dgtp_kpi_calculator.html)**
  The reference tool behind the deck. All **62 KPIs** across four families — Operational (10), Programme Outcome (13), Vendor-Enabled Tracking (11), Vendor Operational (28) — each with a definition, formula, target, baseline, a **live calculator**, its architecture component, its **Azure SLA**, and the **international frameworks** that justify it. Also holds the **architecture playground**, the **resilience-mathematics** section (why chained services give a ~99.88% composite, so the uptime target is 99.5–99.9%, not 99.95%), the **KPI → Azure SLA → contractual SLO** mapping, and a searchable glossary with **hover-tooltips on every abbreviation** (BPMN, CMF, WORM, eIDAS, DORA…).

- **[KPI Discussion — Presenter script](./KPI_Discussion_Presentation_Speech.md)**
  A voice-ready, ~2-hour presenter script that runs the split screen. It answers the four points from the reschedule email up front, addresses the audience by both surfaces (*“on the Discussion deck… in KPI Atlas…”*), narrates all 62 KPIs as Marcus’s story, recalls the six architectures, and closes on the two decisions the Government needs to confirm.

**Two decisions flagged for the Government** (surfaced in both the deck and the calculator):
1. **SLA compliance** — the email cites **90%**, the framework says **95%**. Confirm one contractual figure.
2. **Change-failure rate** — the register says **under 5%**, the risk matrix says **5–10%** (DORA “elite” is ~5%). Confirm one.

---

## Split-screen setup for the meeting

| Half | Open | Role |
|---|---|---|
| Left | `KPI_Discussion_Slides.html` | The story — headlines, flows, decisions |
| Right | `dgtp_kpi_calculator.html` | The proof — live numbers, playground, SLA mapping |

Present from `KPI_Discussion_Presentation_Speech.md`, which moves you between the two halves.

---

## File manifest

| File | Type | Description |
|---|---|---|
| `README.md` | Markdown | This index |
| `KPI_Discussion_Slides.html` | Deck | KPI Discussion presentation (31 slides) |
| `dgtp_kpi_calculator.html` | Tool | KPI Atlas interactive calculator (62 KPIs) |
| `KPI_Discussion_Presentation_Speech.md` | Script | ~2-hour split-screen presenter script |
| `archi4wb.html` | Deck | Session 1 · Interoperability Platform HLD |
| `govmap.html` | Deck | Session 1 · Six Architecture Decisions |
| `dgtp_cloud_architecture.html` | Deck | Session 1 · Azure Cloud (7-layer) |
| `index.html` | Deck | Session 1 · CI/CD & Measurement |
| `dgtp_workshop_v2.html` | Deck | Session 2 · LLD Deep Dive |
| `workshop3_security.html` | Deck | Session 3 · Security LLD |

---

*Framework v1.5 · Values shown are as issued. The workshops and calculator are internal working artefacts for the World Bank / GovXSM / Government D2.2D review.*
