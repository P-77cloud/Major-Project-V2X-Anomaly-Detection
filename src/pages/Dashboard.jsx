import React, { useState } from 'react';
import {
  ShieldAlert,
  Activity,
  CheckCircle2,
  AlertOctagon,
  Cpu,
  Radio,
  Wifi,
  ExternalLink,
  ChevronRight,
  Filter,
  Eye,
  Zap,
  Server,
  Award,
  GitBranch
} from 'lucide-react';
import MetricCard from '../components/common/MetricCard';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import DemonstrationBanner from '../components/common/DemonstrationBanner';
import MisbehaviorTrendChart from '../components/charts/MisbehaviorTrendChart';
import AttackDistributionChart from '../components/charts/AttackDistributionChart';
import { useSentinel } from '../context/SentinelContext';
import { RSU_DISTRIBUTION_DATA } from '../data/mockV2XData';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { 
    metrics, 
    threatEvents, 
    isLiveStreaming, 
    selectedEventForModal, 
    setSelectedEventForModal 
  } = useSentinel();

  return (
    <div className="space-y-6">
      {/* Page Title & Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight font-mono">
              V2X SECURITY OPERATIONS CENTER
            </h1>
            <Badge variant="DEMO">ML DEMONSTRATION</Badge>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Machine Learning-powered misbehavior detection for Connected Autonomous Vehicles (V2X / SAE J2735).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/training">
            <Button variant="secondary" icon={GitBranch} size="sm">
              ML Model Tuning
            </Button>
          </Link>
          <Link to="/monitor">
            <Button variant="primary" icon={Radio} size="sm">
              Live V2X Radar
            </Button>
          </Link>
        </div>
      </div>

      {/* Prominent Demonstration & Academic Review Banner */}
      <DemonstrationBanner 
        title="Phase 1 Machine Learning Architecture & SOC Demonstration"
        message="All telemetry counters, kinematic streams, and attack classifications are simulated using the standard VeReMi Extension benchmark for the upcoming college project review on Nov 14. The Random Forest Classifier serves as the primary planned machine learning model, with production training and FastAPI microservices planned for Phase 2."
      />

      {/* Primary KPI Metric Cards (6 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <MetricCard
          title="Total V2X Messages"
          value={metrics.totalAnalyzed.toLocaleString()}
          subtitle="Processed frames"
          icon={Activity}
          trend="+8.4%"
          trendPositive={true}
          accent="cyan"
          badgeText="SAE J2735"
        />

        <MetricCard
          title="Normal Messages"
          value={metrics.normalMessages.toLocaleString()}
          subtitle="93.7% compliant"
          icon={CheckCircle2}
          trend="+99.2%"
          trendPositive={true}
          accent="emerald"
          badgeText="Verified"
        />

        <MetricCard
          title="Anomalous Messages"
          value={metrics.anomalousMessages.toLocaleString()}
          subtitle="6.3% flagged"
          icon={AlertOctagon}
          trend="+1.2%"
          trendPositive={false}
          accent="danger"
          badgeText="Threats"
        />

        <MetricCard
          title="Detection Rate"
          value={`${metrics.detectionRate}%`}
          subtitle="0.78% false alarm"
          icon={ShieldAlert}
          trend="+0.4%"
          trendPositive={true}
          accent="purple"
          badgeText="Random Forest"
        />

        <MetricCard
          title="Edge Latency"
          value={`${metrics.averageLatencyMs} ms`}
          subtitle="Sub-4ms target"
          icon={Zap}
          trend="-0.2ms"
          trendPositive={true}
          accent="blue"
          badgeText="RSU Edge"
        />

        <MetricCard
          title="Primary ML Model"
          value="Random Forest"
          subtitle="200 Estimators"
          icon={Award}
          accent="warning"
          badgeText="VeReMi Base"
          footerNote="VeReMi Extension ready"
        />
      </div>

      {/* Charts Grid: Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Normal vs Anomalous Traffic Activity */}
        <div className="lg:col-span-2">
          <Card
            title="V2X Message Activity & ML Classification Ratio"
            subtitle="Comparing legitimate BSM safety broadcasts against anomalous injection attempts over time"
            headerAction={
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-slate-400">
                  WINDOW: LAST 24 HOURS
                </span>
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              </div>
            }
          >
            <MisbehaviorTrendChart height={300} />
          </Card>
        </div>

        {/* Right 1 Col: Attack Category Distribution */}
        <div className="lg:col-span-1">
          <Card
            title="VeReMi Attack Category Breakdown"
            subtitle="Distribution of intercepted misbehavior types"
            headerAction={
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                5 Vectors
              </span>
            }
          >
            <AttackDistributionChart height={300} />
          </Card>
        </div>
      </div>

      {/* Charts Grid: Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Recent Detection Events */}
        <div className="lg:col-span-2">
          <Card
            title="Recent ML Misbehavior Interceptions"
            subtitle="Classified by edge Random Forest Sentinel Nodes"
            headerAction={
              <Link to="/threats">
                <Button variant="ghost" size="sm" icon={ExternalLink}>
                  Investigate All
                </Button>
              </Link>
            }
            noPadding
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="border-b border-cyber-border bg-slate-900/60 text-slate-400 text-[11px] uppercase tracking-wider">
                    <th className="py-3 px-4">Event ID</th>
                    <th className="py-3 px-4">Vehicle Pseudonym</th>
                    <th className="py-3 px-4">Attack Vector</th>
                    <th className="py-3 px-4">Severity</th>
                    <th className="py-3 px-4">RF Consensus</th>
                    <th className="py-3 px-4">RSU Node</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {threatEvents.slice(0, 5).map((evt) => (
                    <tr
                      key={evt.id}
                      className="hover:bg-slate-800/40 transition-colors group cursor-pointer"
                      onClick={() => setSelectedEventForModal(evt)}
                    >
                      <td className="py-3 px-4 text-cyan-400 font-semibold">
                        {evt.id}
                      </td>
                      <td className="py-3 px-4 text-slate-200 font-bold">
                        {evt.vehicleId}
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-white font-medium">
                          {evt.attackType}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant={evt.severity}>{evt.severity}</Badge>
                      </td>
                      <td className="py-3 px-4 text-emerald-400 font-bold">
                        {evt.confidence}%
                      </td>
                      <td className="py-3 px-4 text-slate-400 text-[11px] truncate max-w-[140px]">
                        {evt.rsuLocation}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedEventForModal(evt);
                          }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors inline-flex items-center gap-1 text-[11px]"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Inspect</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Right 1 Col: Roadside Unit (RSU) Node Status & Model Deployment */}
        <div className="lg:col-span-1">
          <Card
            title="RSU Sentinel Cluster Status"
            subtitle="Edge deployment across metropolitan highway corridors"
            headerAction={
              <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                48/48 Synced
              </span>
            }
          >
            <div className="space-y-3 font-mono text-xs">
              {RSU_DISTRIBUTION_DATA.map((rsu) => (
                <div
                  key={rsu.rsu}
                  className="p-3 rounded-xl border border-slate-800 bg-slate-900/50 hover:border-cyan-500/30 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-200">
                      {rsu.rsu}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                      {rsu.status}
                    </span>
                  </div>

                  <div className="mt-2 grid grid-cols-2 gap-2 text-[11px] text-slate-400">
                    <div>
                      <span className="text-slate-400 block text-[10px]">TRAFFIC VOL</span>
                      <span className="text-white font-medium">
                        {(rsu.traffic / 1000).toFixed(0)}k msgs
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">FLAGGED</span>
                      <span className="text-red-400 font-medium">
                        {rsu.anomalies.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="mt-2 flex items-center justify-between text-[10px] pt-1.5 border-t border-slate-800">
                    <span className="text-slate-400">Deployed Model</span>
                    <span className="text-cyan-400 font-bold">{rsu.model}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Threat Inspection Modal */}
      <Modal
        isOpen={!!selectedEventForModal}
        onClose={() => setSelectedEventForModal(null)}
        title={
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-red-400" />
            <span>Machine Learning Incident Forensic: {selectedEventForModal?.id}</span>
          </div>
        }
      >
        {selectedEventForModal && (
          <div className="space-y-4 font-mono text-xs">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl border border-slate-800 bg-slate-900/60">
                <span className="text-slate-400 block text-[10px]">VEHICLE ID</span>
                <span className="text-sm font-bold text-cyan-300">
                  {selectedEventForModal.vehicleId}
                </span>
              </div>
              <div className="p-3 rounded-xl border border-slate-800 bg-slate-900/60">
                <span className="text-slate-400 block text-[10px]">ML CLASSIFICATION</span>
                <span className="text-sm font-bold text-red-400">
                  {selectedEventForModal.attackType}
                </span>
              </div>
              <div className="p-3 rounded-xl border border-slate-800 bg-slate-900/60">
                <span className="text-slate-400 block text-[10px]">RF ENSEMBLE VOTE</span>
                <span className="text-sm font-bold text-emerald-400">
                  {selectedEventForModal.decisionTreesVotingMalicious || '198 / 200 Trees'}
                </span>
              </div>
              <div className="p-3 rounded-xl border border-slate-800 bg-slate-900/60">
                <span className="text-slate-400 block text-[10px]">SEVERITY</span>
                <div className="mt-1">
                  <Badge variant={selectedEventForModal.severity}>
                    {selectedEventForModal.severity}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl border border-red-500/30 bg-red-950/20 text-slate-200">
              <span className="text-[10px] text-red-400 font-bold uppercase block mb-1">
                KINEMATIC ROOT CAUSE ANALYSIS
              </span>
              <p className="text-xs leading-relaxed text-slate-300">
                {selectedEventForModal.details}
              </p>
            </div>

            <div className="p-3 rounded-xl border border-slate-800 bg-slate-900/80 space-y-1.5 text-[11px]">
              <div className="flex justify-between">
                <span className="text-slate-400">Monitoring Station:</span>
                <span className="text-white">{selectedEventForModal.rsuLocation}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Classifier Algorithm:</span>
                <span className="text-cyan-400 font-bold">Random Forest Ensemble (Gini Criterion)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Mitigation Action:</span>
                <span className="text-emerald-400 font-bold">{selectedEventForModal.action}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Timestamp:</span>
                <span className="text-slate-300">{selectedEventForModal.timestamp}</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedEventForModal(null)}
              >
                Close Inspector
              </Button>
              <Link to="/threats">
                <Button variant="primary" size="sm">
                  Open Deep Threat Investigation
                </Button>
              </Link>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Dashboard;
