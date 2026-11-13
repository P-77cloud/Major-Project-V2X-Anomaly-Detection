import React, { useState } from 'react';
import {
  ShieldAlert,
  Search,
  Filter,
  Download,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  FileText,
  Sliders,
  ChevronRight,
  TrendingDown,
  Activity,
  Layers,
  Radio,
  Share2,
  Trash2,
  Award,
  GitBranch
} from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Modal from '../components/common/Modal';
import DemonstrationBanner from '../components/common/DemonstrationBanner';
import { useSentinel } from '../context/SentinelContext';
import { ATTACK_CATEGORIES } from '../data/mockV2XData';

const ThreatAnalytics = () => {
  const { 
    threatEvents, 
    setThreatEvents,
    activeFilterSeverity, 
    setActiveFilterSeverity,
    addToast
  } = useSentinel();

  const [selectedAttackTab, setSelectedAttackTab] = useState(ATTACK_CATEGORIES[0].name);
  const [searchTerm, setSearchTerm] = useState('');
  const [inspectedEvent, setInspectedEvent] = useState(threatEvents[0]);

  // Filter threat events
  const filteredEvents = threatEvents.filter((evt) => {
    const matchesSearch =
      evt.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evt.vehicleId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evt.attackType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evt.rsuLocation.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeFilterSeverity === 'ALL') return matchesSearch;
    return matchesSearch && evt.severity === activeFilterSeverity;
  });

  const handleExportForensicReport = () => {
    addToast('info', 'Forensic Export Generated', 'Exported JSON incident investigation log and cryptographic audit trail.');
  };

  const handleRevokeCertificate = (evt) => {
    addToast('danger', 'SCMS Certificate Revoked', `Vehicle ${evt.vehicleId} added to Certificate Revocation List (CRL). Misbehavior Report MBR-2026-${evt.id} issued.`);
  };

  const handleFalsePositiveOverride = (evt) => {
    addToast('warning', 'False Positive Marked', `Incident ${evt.id} tagged for Random Forest active-learning retraining queue.`);
    setThreatEvents(prev => prev.filter(e => e.id !== evt.id));
  };

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight font-mono">
              THREAT & MISBEHAVIOR ANALYTICS
            </h1>
            <Badge variant="DANGER">INCIDENT INVESTIGATION</Badge>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Deep forensic analysis, Random Forest decision tree attribution, and SCMS revocation actions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            icon={Download}
            onClick={handleExportForensicReport}
          >
            Export PCAP / Forensic Log
          </Button>
        </div>
      </div>

      {/* Demonstration Banner */}
      <DemonstrationBanner
        title="Phase 1 Explainable AI & Incident Forensics"
        message="Incident logs and feature attribution scores are derived from the Random Forest Classifier on simulated VeReMi Extension attack traces. Phase 2 will link live explainability pipelines via TreeSHAP and real SCMS (Security Credential Management System) integration."
      />

      {/* Attack Taxonomy Cards (5 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {ATTACK_CATEGORIES.map((cat) => {
          const isSelected = selectedAttackTab === cat.name;
          return (
            <div
              key={cat.name}
              onClick={() => setSelectedAttackTab(cat.name)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                isSelected
                  ? 'border-cyan-400 bg-cyan-950/40 shadow-glow-cyan'
                  : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: cat.color }}
                />
                <span className="text-[10px] font-mono text-slate-400 font-bold">
                  {cat.percentage}%
                </span>
              </div>
              <h4 className="text-xs font-bold text-white mt-2 truncate">
                {cat.name}
              </h4>
              <p className="text-[10px] font-mono text-cyan-400 mt-0.5">
                {cat.count.toLocaleString()} cases
              </p>
            </div>
          );
        })}
      </div>

      {/* Main Grid: Incident Log Table (7 Cols) & Deep Forensic Inspector (5 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Cols: Incident Log Table */}
        <div className="lg:col-span-7">
          <Card
            title="Active Misbehavior Incidents"
            subtitle="Click an incident to open the Random Forest feature attribution inspector"
            headerAction={
              <div className="flex items-center gap-2">
                {/* Search */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search incident..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 pr-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-white placeholder-slate-500 w-36 sm:w-44 focus:outline-none focus:border-cyan-500/50"
                  />
                </div>

                {/* Severity Filter */}
                <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800 text-xs font-mono">
                  {['ALL', 'CRITICAL', 'HIGH'].map((sev) => (
                    <button
                      key={sev}
                      onClick={() => setActiveFilterSeverity(sev)}
                      className={`px-2 py-0.5 rounded text-[10px] transition-colors ${
                        activeFilterSeverity === sev
                          ? 'bg-cyan-500 text-slate-950 font-bold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {sev}
                    </button>
                  ))}
                </div>
              </div>
            }
            noPadding
          >
            <div className="overflow-x-auto max-h-[500px]">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="border-b border-cyber-border bg-slate-900/80 text-slate-400 text-[10px] uppercase sticky top-0 z-10">
                    <th className="py-3 px-3.5">ID</th>
                    <th className="py-3 px-3.5">Vehicle</th>
                    <th className="py-3 px-3.5">Attack Classification</th>
                    <th className="py-3 px-3.5">Severity</th>
                    <th className="py-3 px-3.5">RF Consensus</th>
                    <th className="py-3 px-3.5 text-right">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredEvents.map((evt) => {
                    const isSelected = inspectedEvent?.id === evt.id;
                    return (
                      <tr
                        key={evt.id}
                        onClick={() => setInspectedEvent(evt)}
                        className={`cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-cyan-950/30 border-l-2 border-cyan-400'
                            : 'hover:bg-slate-800/40'
                        }`}
                      >
                        <td className="py-3 px-3.5 font-bold text-cyan-300">
                          {evt.id}
                        </td>
                        <td className="py-3 px-3.5 text-white font-medium">
                          {evt.vehicleId}
                        </td>
                        <td className="py-3 px-3.5 text-slate-200">
                          {evt.attackType}
                        </td>
                        <td className="py-3 px-3.5">
                          <Badge variant={evt.severity} size="xs">
                            {evt.severity}
                          </Badge>
                        </td>
                        <td className="py-3 px-3.5 font-bold text-emerald-400">
                          {evt.confidence}%
                        </td>
                        <td className="py-3 px-3.5 text-right text-slate-400 text-[11px]">
                          {evt.timestamp}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Right 5 Cols: Deep Forensic Inspector & Feature Explainability */}
        <div className="lg:col-span-5">
          <Card
            title="Forensic Explainability & Random Forest Voting"
            subtitle={inspectedEvent ? `Target: ${inspectedEvent.id} (${inspectedEvent.vehicleId})` : 'Select an incident'}
            headerAction={
              inspectedEvent && (
                <Badge variant={inspectedEvent.severity}>
                  {inspectedEvent.severity}
                </Badge>
              )
            }
          >
            {inspectedEvent ? (
              <div className="space-y-4 font-mono text-xs">
                {/* Attack Banner */}
                <div className="p-3.5 rounded-xl border border-red-500/30 bg-red-950/20">
                  <span className="text-[10px] text-red-400 uppercase font-bold block mb-1">
                    CONFIRMED MISBEHAVIOR CLASSIFICATION
                  </span>
                  <h4 className="text-base font-bold text-white">
                    {inspectedEvent.attackType}
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 font-sans leading-relaxed">
                    {inspectedEvent.details}
                  </p>
                </div>

                {/* Quantitative Metric Scores */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg border border-slate-800 bg-slate-900/50">
                    <span className="text-[10px] text-slate-400 block">RANDOM FOREST VOTES</span>
                    <span className="text-emerald-400 font-bold text-sm">
                      {inspectedEvent.decisionTreesVotingMalicious || '198 / 200 Trees'}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg border border-slate-800 bg-slate-900/50">
                    <span className="text-[10px] text-slate-400 block">ANOMALY SCORE</span>
                    <span className="text-red-400 font-bold text-sm">
                      {inspectedEvent.anomalyScore || '0.942'} / 1.000
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg border border-slate-800 bg-slate-900/50">
                    <span className="text-[10px] text-slate-400 block">OBSERVING RSU</span>
                    <span className="text-white truncate block text-[11px]">
                      {inspectedEvent.rsuLocation}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg border border-slate-800 bg-slate-900/50">
                    <span className="text-[10px] text-slate-400 block">STATUS</span>
                    <span className="text-cyan-400 font-bold text-[11px]">
                      QUARANTINE READY
                    </span>
                  </div>
                </div>

                {/* Explainable AI (Random Forest Gini Feature Impact) */}
                <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/60 space-y-2.5">
                  <span className="text-[10px] text-cyan-400 uppercase font-bold block">
                    FEATURE ATTRIBUTION IN CLASSIFICATION DECISION
                  </span>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-300">Kinematic Spatial Delta (Δd)</span>
                      <span className="text-red-400 font-bold">+38.2%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                      <div className="h-full bg-red-400 rounded-full" style={{ width: '82%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-300">Instantaneous Accel Outlier (Δa)</span>
                      <span className="text-red-400 font-bold">+26.4%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full" style={{ width: '64%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-300">RSSI Distance Mismatch</span>
                      <span className="text-cyan-400 font-bold">+18.1%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                      <div className="h-full bg-cyan-400 rounded-full" style={{ width: '45%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-300">Heading Drift / Angular Delta</span>
                      <span className="text-slate-300 font-bold">+11.3%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: '28%' }} />
                    </div>
                  </div>
                </div>

                {/* Operator Actions */}
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <Button
                    variant="danger"
                    size="sm"
                    className="w-full"
                    icon={ShieldAlert}
                    onClick={() => handleRevokeCertificate(inspectedEvent)}
                  >
                    Broadcast Misbehavior Report (MBR) & Revoke SCMS
                  </Button>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-slate-400"
                    icon={CheckCircle2}
                    onClick={() => handleFalsePositiveOverride(inspectedEvent)}
                  >
                    Tag as Normal / Retraining Override
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-slate-500 font-mono text-xs">
                Select an incident from the log table.
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ThreatAnalytics;
