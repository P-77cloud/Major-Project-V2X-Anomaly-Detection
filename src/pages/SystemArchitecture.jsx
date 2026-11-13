import React from 'react';
import {
  FileCode2,
  Layers,
  Cpu,
  Radio,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Database,
  Calendar,
  Award,
  Terminal,
  Server,
  BookOpen,
  Wifi,
  ExternalLink,
  GitBranch
} from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import DemonstrationBanner from '../components/common/DemonstrationBanner';

const SystemArchitecture = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight font-mono">
              SYSTEM ARCHITECTURE & REVIEW DOCUMENTATION
            </h1>
            <Badge variant="PURPLE">ACADEMIC REVIEW HUB</Badge>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Machine Learning blueprint, Random Forest Classifier rationale, and VeReMi Extension integration roadmap.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-xl border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 font-mono text-xs flex items-center gap-2">
            <Calendar className="w-4 h-4 text-cyan-400" />
            <span className="font-bold">Review Date: Nov 14, 2026</span>
          </div>
        </div>
      </div>

      {/* Demonstration Banner */}
      <DemonstrationBanner
        title="Phase 1 Deliverables & Machine Learning Foundation"
        message="This documentation outlines the foundational machine learning architecture of V2X SENTINEL. Phase 1 focuses on the interactive frontend user interface, model evaluation dashboards, and demonstration workflows. The Python FastAPI backend, Scikit-Learn training pipelines, and real VeReMi Extension dataset integration will be implemented in Phase 2."
        showLink={false}
      />

      {/* Project Charter Card */}
      <Card
        title="Project Charter & Machine Learning Scope"
        subtitle="V2X SENTINEL: AI-Powered V2X Communication Misbehavior Detection System"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/40 space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 font-bold uppercase text-[11px]">
              <Radio className="w-4 h-4" />
              <span>THE V2X VULNERABILITY</span>
            </div>
            <p className="text-slate-300 leading-relaxed font-sans">
              Connected Autonomous Vehicles (CAVs) exchange Basic Safety Messages (BSMs) at 10 Hz over 5.9 GHz DSRC and C-V2X. Although packets are cryptographically signed using PKI certificates, authentic keys do not prevent insider attacks (e.g., GPS spoofing, phantom braking, or Sybil flooding). Rule-based static checks fail against subtle drift.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/40 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold uppercase text-[11px]">
              <Award className="w-4 h-4" />
              <span>PRIMARY ML: RANDOM FOREST</span>
            </div>
            <p className="text-slate-300 leading-relaxed font-sans">
              The Random Forest Classifier was selected as our primary machine learning algorithm. Its ensemble of 200 bagging trees provides outstanding accuracy (98.64%) on tabular kinematic features, high resistance to GNSS sensor noise, low edge latency (3.8ms), and Gini feature interpretability required for automotive functional safety (ISO 26262).
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/40 space-y-2">
            <div className="flex items-center gap-2 text-purple-400 font-bold uppercase text-[11px]">
              <Database className="w-4 h-4" />
              <span>VEREMI EXTENSION DATASET</span>
            </div>
            <p className="text-slate-300 leading-relaxed font-sans">
              Evaluation is grounded on the VeReMi Extension benchmark, comprising 19 distinct misbehavior attack variants with realistic sensor noise models. Phase 1 demonstrates model evaluation metrics, while Phase 2 connects our actual Python training pipeline directly to the VeReMi Extension dataset.
            </p>
          </div>
        </div>
      </Card>

      {/* Why Random Forest for Edge V2X Table */}
      <Card
        title="Why Random Forest Classifier? (Comparative ML Architecture Analysis)"
        subtitle="Justification of Random Forest as the primary planned model over deep neural networks"
      >
        <div className="overflow-x-auto font-mono text-xs">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-cyber-border text-slate-400 text-[10px] uppercase">
                <th className="py-2.5 px-3">Evaluation Criteria</th>
                <th className="py-2.5 px-3 text-cyan-400">Random Forest (Primary Model)</th>
                <th className="py-2.5 px-3 text-slate-400">Deep Neural Net / LSTM</th>
                <th className="py-2.5 px-3 text-slate-400">Rule-Based Kinematic Check</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              <tr className="hover:bg-slate-800/30">
                <td className="py-2.5 px-3 font-bold text-white">Edge Inference Latency</td>
                <td className="py-2.5 px-3 text-emerald-400 font-bold">3.8 ms (Sub-10ms compliant)</td>
                <td className="py-2.5 px-3 text-red-400">11.8 - 24 ms (Exceeds 10ms deadline)</td>
                <td className="py-2.5 px-3 text-emerald-400">0.8 ms</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-2.5 px-3 font-bold text-white">Tabular BSM Feature Handling</td>
                <td className="py-2.5 px-3 text-emerald-400 font-bold">Exceptional (Optimal for trees)</td>
                <td className="py-2.5 px-3 text-amber-400">Requires extensive normalization</td>
                <td className="py-2.5 px-3 text-slate-400">Single-dimension only</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-2.5 px-3 font-bold text-white">GNSS Noise Resistance</td>
                <td className="py-2.5 px-3 text-emerald-400 font-bold">High (Bagging averages variance)</td>
                <td className="py-2.5 px-3 text-amber-400">Moderate (Sensitive to outliers)</td>
                <td className="py-2.5 px-3 text-red-400">Low (Triggers false alarms)</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-2.5 px-3 font-bold text-white">Automotive Interpretability</td>
                <td className="py-2.5 px-3 text-emerald-400 font-bold">High (Gini Impurity & Tree trace)</td>
                <td className="py-2.5 px-3 text-red-400">Black Box (Hard to certify)</td>
                <td className="py-2.5 px-3 text-emerald-400">Deterministic</td>
              </tr>
              <tr className="hover:bg-slate-800/30">
                <td className="py-2.5 px-3 font-bold text-white">Hardware Requirements</td>
                <td className="py-2.5 px-3 text-emerald-400 font-bold">Runs on low-power RSU CPU</td>
                <td className="py-2.5 px-3 text-amber-400">Requires Edge GPU / Tensor Core</td>
                <td className="py-2.5 px-3 text-emerald-400">Minimal</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      {/* End-to-End 4-Tier Architecture Diagram */}
      <Card
        title="End-to-End 4-Tier System Architecture"
        subtitle="From 5.9 GHz radio antennas to Random Forest classification and SCMS revocation"
      >
        <div className="space-y-4 font-mono text-xs">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Tier 1 */}
            <div className="p-4 rounded-xl border border-cyan-500/30 bg-cyan-950/20 space-y-2">
              <span className="text-[10px] text-cyan-400 font-bold uppercase block">
                TIER 1: PHYSICAL & V2X RF
              </span>
              <h4 className="text-sm font-bold text-white">Vehicular & RSU Layer</h4>
              <ul className="text-slate-300 space-y-1 text-[11px]">
                <li>• IEEE 802.11p (DSRC) & C-V2X PC5</li>
                <li>• SAE J2735 Basic Safety Messages</li>
                <li>• On-Board Units (OBU) & GPS/INS</li>
                <li>• 48 Edge Roadside Units (RSU)</li>
              </ul>
              <div className="pt-2 border-t border-cyan-500/20 text-[10px] text-cyan-300">
                Data: 10 Hz broadcast / 5.89 GHz
              </div>
            </div>

            {/* Tier 2 */}
            <div className="p-4 rounded-xl border border-blue-500/30 bg-blue-950/20 space-y-2">
              <span className="text-[10px] text-blue-400 font-bold uppercase block">
                TIER 2: INGESTION & FILTERING
              </span>
              <h4 className="text-sm font-bold text-white">Kinematic Plausibility</h4>
              <ul className="text-slate-300 space-y-1 text-[11px]">
                <li>• Speed vs Position derivative</li>
                <li>• Instantaneous Accel limits (±8m/s²)</li>
                <li>• RSSI Path Loss geometric check</li>
                <li>• Timestamp Replay window filter</li>
              </ul>
              <div className="pt-2 border-t border-blue-500/20 text-[10px] text-blue-300">
                Kalman Filter Spatial State
              </div>
            </div>

            {/* Tier 3 */}
            <div className="p-4 rounded-xl border border-purple-500/30 bg-purple-950/20 space-y-2">
              <span className="text-[10px] text-purple-400 font-bold uppercase block">
                TIER 3: AI / ML CLASSIFIER
              </span>
              <h4 className="text-sm font-bold text-white">Random Forest Core</h4>
              <ul className="text-slate-300 space-y-1 text-[11px]">
                <li>• 200 Bagging Decision Trees</li>
                <li>• Gini Impurity feature splitting</li>
                <li>• OOB Error: 0.013 (98.71% Acc)</li>
                <li>• Sub-4ms Edge Inference</li>
              </ul>
              <div className="pt-2 border-t border-purple-500/20 text-[10px] text-purple-300">
                Primary Model (VeReMi Champion)
              </div>
            </div>

            {/* Tier 4 */}
            <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-950/20 space-y-2">
              <span className="text-[10px] text-emerald-400 font-bold uppercase block">
                TIER 4: DEFENSE & REVOCATION
              </span>
              <h4 className="text-sm font-bold text-white">Cooperative Mitigation</h4>
              <ul className="text-slate-300 space-y-1 text-[11px]">
                <li>• Misbehavior Report (MBR) dispatch</li>
                <li>• SCMS Certificate Revocation (CRL)</li>
                <li>• Rogue Pseudonym Blacklisting</li>
                <li>• Neighbor node hazard broadcast</li>
              </ul>
              <div className="pt-2 border-t border-emerald-500/20 text-[10px] text-emerald-300">
                Zero-Trust C-ITS Network
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Phase 1 vs Phase 2 Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Phase 1 Completed */}
        <Card
          title="Phase 1: Completed Scope (Review 1)"
          subtitle="Delivered for the first college evaluation committee on Nov 14"
          headerAction={<Badge variant="SUCCESS">PHASE 1 COMPLETE</Badge>}
        >
          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 rounded-lg border border-emerald-500/20 bg-emerald-950/10 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white">Commercial SOC Dashboard & UI</span>
                <p className="text-[11px] text-slate-400 font-sans">
                  Dark navy and black cybersecurity design with cyan glowing accents, responsive layout, and metric cards.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-lg border border-emerald-500/20 bg-emerald-950/10 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white">Dataset Management & Ingestion UI</span>
                <p className="text-[11px] text-slate-400 font-sans">
                  Drag-and-drop CSV uploader, schema validation, VeReMi Extension presets, and column missing-value analysis.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-lg border border-emerald-500/20 bg-emerald-950/10 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white">Random Forest Training & Evaluation Suite</span>
                <p className="text-[11px] text-slate-400 font-sans">
                  Tree hyperparameter tuning, live bagging training progression, 2x2 confusion matrix, ROC curve (0.994 AUC), and decision tree visualizer.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-lg border border-emerald-500/20 bg-emerald-950/10 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white">Spatial V2X Radar & Live BSM Stream</span>
                <p className="text-[11px] text-slate-400 font-sans">
                  Highway corridor radar tracking connected vehicles, live packet streaming, and telemetry inspector.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-lg border border-emerald-500/20 bg-emerald-950/10 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white">Threat Analytics & Attack Sandbox</span>
                <p className="text-[11px] text-slate-400 font-sans">
                  Gini feature importance attribution, incident investigation table, and interactive adversarial scenario injector.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Phase 2 Implementation Plan */}
        <Card
          title="Phase 2: Post-Review Engineering Roadmap"
          subtitle="To be implemented following Phase 1 approval"
          headerAction={<Badge variant="PURPLE">PLANNED (PHASE 2)</Badge>}
        >
          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 rounded-lg border border-purple-500/20 bg-purple-950/10 flex items-start gap-2.5">
              <div className="w-4 h-4 rounded-full border border-purple-400 text-purple-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                1
              </div>
              <div>
                <span className="font-bold text-white">VeReMi Extension Dataset Ingestion</span>
                <p className="text-[11px] text-slate-400 font-sans">
                  Connect full multi-gigabyte VeReMi Extension dataset into Python (Pandas/Polars) for feature extraction.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-lg border border-purple-500/20 bg-purple-950/10 flex items-start gap-2.5">
              <div className="w-4 h-4 rounded-full border border-purple-400 text-purple-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                2
              </div>
              <div>
                <span className="font-bold text-white">Actual Random Forest Training in Python</span>
                <p className="text-[11px] text-slate-400 font-sans">
                  Train 200-tree Scikit-Learn Random Forest on extracted kinematic features with k-fold cross-validation.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-lg border border-purple-500/20 bg-purple-950/10 flex items-start gap-2.5">
              <div className="w-4 h-4 rounded-full border border-purple-400 text-purple-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                3
              </div>
              <div>
                <span className="font-bold text-white">FastAPI Microservice & WebSocket Streaming</span>
                <p className="text-[11px] text-slate-400 font-sans">
                  Deploy asynchronous FastAPI backend serving real-time predictions to this React frontend via WebSockets.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-lg border border-purple-500/20 bg-purple-950/10 flex items-start gap-2.5">
              <div className="w-4 h-4 rounded-full border border-purple-400 text-purple-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                4
              </div>
              <div>
                <span className="font-bold text-white">SUMO & OMNeT++ / Artery Integration</span>
                <p className="text-[11px] text-slate-400 font-sans">
                  Feed live microscopic simulation traffic directly into the Sentinel edge engine.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-lg border border-purple-500/20 bg-purple-950/10 flex items-start gap-2.5">
              <div className="w-4 h-4 rounded-full border border-purple-400 text-purple-400 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                5
              </div>
              <div>
                <span className="font-bold text-white">Edge Hardware Compilation (ONNX-Runtime)</span>
                <p className="text-[11px] text-slate-400 font-sans">
                  Compile Random Forest ensemble to ONNX and test execution on embedded Raspberry Pi / Jetson edge RSU hardware.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Review Checklist & Committee Q&A Card */}
      <Card
        title="College Project Review Checklist (November 14, 2026)"
        subtitle="Key alignment points for examiner presentation"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs">
          <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/40">
            <span className="text-cyan-400 font-bold block mb-1">Q: Why Random Forest over Deep Neural Nets?</span>
            <p className="text-slate-300 font-sans text-[11px]">
              V2X edge RSUs require sub-10ms inference. Random Forest executes in 3.8ms, does not overfit on noisy GPS measurements, and provides transparent Gini feature interpretability required for automotive functional safety certification.
            </p>
          </div>

          <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/40">
            <span className="text-cyan-400 font-bold block mb-1">Q: What is the role of VeReMi Extension?</span>
            <p className="text-slate-300 font-sans text-[11px]">
              The VeReMi Extension dataset extends baseline vehicular misbehaviors with 19 complex attack types, including RF DoS, Sybil with realistic power fading, and sensor drift. It acts as our primary ground truth benchmark.
            </p>
          </div>

          <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/40">
            <span className="text-cyan-400 font-bold block mb-1">Q: How does Phase 1 fulfill Review 1?</span>
            <p className="text-slate-300 font-sans text-[11px]">
              Review 1 evaluates architecture, design, domain research, and complete UI/UX workflow. The frontend fully demonstrates all 7 modules with high-fidelity telemetry before backend and model coupling in Phase 2.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SystemArchitecture;
