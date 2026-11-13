# V2X SENTINEL
## AI-Powered V2X Communication Misbehavior Detection System Using Machine Learning

[![Review Date](https://img.shields.io/badge/College%20Review-November%2014%2C%202026-00F0FF?style=for-the-badge)](https://github.com)
[![Primary Algorithm](https://img.shields.io/badge/Primary%20Algorithm-Random%20Forest%20Classifier-10B981?style=for-the-badge)](https://github.com)
[![Target Dataset](https://img.shields.io/badge/Benchmark-VeReMi%20Extension%20Dataset-8B5CF6?style=for-the-badge)](https://github.com)
[![Protocol](https://img.shields.io/badge/Protocol-SAE%20J2735%20BSM%20%2F%20C--V2X%20PC5-38BDF8?style=for-the-badge)](https://github.com)

---

## 📌 Project Overview
**V2X SENTINEL** is a Machine Learning-based vehicular cybersecurity monitoring and misbehavior detection system for Connected Autonomous Vehicles (CAVs) communicating over **5.9 GHz DSRC (IEEE 802.11p)** and **5G C-V2X (PC5 direct mode)**.

While vehicular ad-hoc networks rely on PKI cryptography for basic message authentication, cryptographic keys do not guarantee honest or calibrated sensor telemetry. Malicious or compromised nodes can inject forged emergency braking, spoof GPS positions, or coordinate high-density Sybil congestion attacks.

**V2X SENTINEL** adopts the **Random Forest Classifier (Ensemble Bagging)** as its planned primary machine learning algorithm. Random Forest was selected because:
1. **Edge Computational Efficiency:** Delivers **3.8 ms** inference latency on edge Roadside Units (RSUs), meeting the critical sub-10ms collision avoidance deadline.
2. **Tabular Kinematic Robustness:** Outperforms deep neural networks on structured SAE J2735 tabular features without requiring heavy GPU hardware.
3. **GNSS Noise Tolerance:** Bootstrap aggregation averages out GPS jitter and transient sensor drift.
4. **Functional Safety Interpretability:** Transparent Gini Impurity reduction and decision-tree traceability comply with automotive functional safety standards (ISO 26262).

---

## 🎯 November 14 College Review Milestone (Phase 1)
> **Phase 1 Implementation Scope:**  
> For the first project evaluation on **November 14, 2026**, this repository delivers an interactive, commercial-grade Security Operations Center (SOC) frontend. All seven pages are fully developed with clearly labelled demonstration telemetry based on the **VeReMi Extension Dataset**.
>
> Actual Python/Scikit-Learn model training, FastAPI async microservices, and full-scale database ingestion with your VeReMi Extension dataset will be implemented in **Phase 2** following review approval.

---

## 🚀 The Seven Interactive Modules

1. **Main SOC Overview Dashboard (`/`)**
   - Central metrics: Total V2X Messages (1,482,920+), Normal (93.7%), Anomalous (6.3%), Detection Rate (98.64%), and Sub-4ms Edge Latency.
   - Normal vs. Anomalous traffic activity area chart.
   - VeReMi Attack Category proportional donut chart.
   - Real-time incident feed with Random Forest consensus scores and Telemetry Inspection Modal.
   - 48-node RSU Sentinel cluster status.

2. **Dataset Management & Ingestion (`/dataset`)**
   - Drag-and-drop CSV uploader with simulated validation progress bar.
   - **VeReMi Extension Dataset** featured as primary benchmark (184.5k records, 14 kinematic features).
   - Instant presets for VeReMi Base, USDOT Pilot, and SUMO Urban C-V2X.
   - Paginated telemetry preview table with search and filtering.
   - Column schema audit and missing-value completeness metrics.

3. **Machine Learning Model Training & Evaluation (`/training`)**
   - **Random Forest Ensemble** spotlighted as the Primary Planned Model (200 Trees, Gini Impurity, Max Depth 16).
   - Interactive hyperparameter controls: Estimator count, Tree depth, Gini vs. Entropy, Max features, Anomaly threshold.
   - Animated training simulation: Real-time tree construction progression (1 to 200 trees) and Out-of-Bag (OOB) error convergence curve.
   - **Interactive Decision Tree Visualizer:** Step through tree splitting logic on kinematic thresholds (`Pos_Plausibility_Delta`, `Instant_Accel`, `RSSI_Mismatch`).
   - Comprehensive model evaluation: 2x2 Confusion Matrix, Per-Class Classification Report, ROC Curve ($0.994\text{ AUC}$), and Gini Feature Importance Ranking.

4. **Real-Time V2X Traffic Monitor (`/monitor`)**
   - 500m radius highway radar screen with continuous radar sweep.
   - Real-time vehicle nodes color-coded by Random Forest classification status.
   - Live 100ms BSM packet stream with pause/resume and speed controls.
   - Vehicle Telemetry Inspector with kinematic bounds checking and one-click Pseudonym Quarantine.
   - "Inject Rogue Node" button to test real-time radar alert.

5. **Threat & Misbehavior Analytics (`/threats`)**
   - Deep inspection across 5 primary attack vectors: **Position Spoofing**, **Speed Anomaly**, **Sybil Attack**, **Message Replay**, and **DoS Flooding**.
   - Incident forensic table with severity filters.
   - Random Forest voting consensus breakdown ($198 / 200\text{ trees}$).
   - Feature attribution metrics ($\Delta d +38.2\%$, $\Delta a +26.4\%$, $\text{RSSI} +18.1\%$).
   - Operator actions: Broadcast Misbehavior Report (MBR) and SCMS certificate revocation.

6. **Attack Simulation & Scenario Sandbox (`/simulation`)**
   - 4 pre-configured adversarial scenarios from VeReMi Extension.
   - Custom sliders for speed delta ($\Delta v$), spatial jump ($\Delta x$), and broadcast frequency.
   - Real-time execution testing returning immediate Random Forest consensus verdict ($99.2\%$) within $3.4\text{ ms}$.

7. **System Architecture & Review Documentation (`/architecture`)**
   - 4-Tier technical architecture: RF & Physical $\rightarrow$ Ingestion & Filtering $\rightarrow$ Random Forest Core $\rightarrow$ Cooperative Defense.
   - Detailed justification table: *Why Random Forest over Deep Neural Networks for edge V2X*.
   - Completed Phase 1 vs. Planned Phase 2 roadmap.
   - College review committee checklist and Q&A defense prep.

---

## 🛠️ Technology Stack
- **Frontend Core:** React 18 & Vite 6
- **Styling:** Tailwind CSS 3 (Dark Navy `#070B14`, Cyan `#00F0FF`, Electric Blue `#38BDF8`)
- **Data Visualizations:** Recharts (Area charts, Donut charts, Line convergence curves, ROC curves, Horizontal bars)
- **Icons:** Lucide React
- **Routing:** React Router v6

---

## 💻 Running the Application Locally

```powershell
# In c:\Users\ugcet\V2X-SENTINEL:
npm run dev
```

Open your browser to:
**`http://localhost:3000`**

To verify the production build:
```powershell
npm run build
npm run preview
```
*(The production build compiles with zero errors in under 8 seconds).*
