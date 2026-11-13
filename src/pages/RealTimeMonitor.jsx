import React, { useState, useEffect } from 'react';
import {
  Radio,
  Play,
  Pause,
  FastForward,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Zap,
  Activity,
  Locate,
  Compass,
  Gauge,
  Wifi,
  Eye,
  Filter,
  CheckCircle2,
  XCircle,
  Sparkles,
  Award,
  GitBranch
} from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import DemonstrationBanner from '../components/common/DemonstrationBanner';
import { useSentinel } from '../context/SentinelContext';

// Simulated active vehicles on the road grid
const INITIAL_VEHICLES = [
  { id: '0x7F4B-92A1', x: 72, y: 35, speed: 78.4, heading: 90, status: 'NORMAL', accel: 0.2, rssi: -71.2, lane: 1, type: 'Sedan', rfScore: '0.02' },
  { id: '0x3E12-A88F', x: 28, y: 55, speed: 64.2, heading: 88, status: 'NORMAL', accel: -0.4, rssi: -65.4, lane: 2, type: 'SUV', rfScore: '0.05' },
  { id: '0x99C4-5100', x: 45, y: 40, speed: 118.5, heading: 92, status: 'MALICIOUS', attack: 'Speed Anomaly', accel: -24.8, rssi: -68.0, lane: 1, type: 'Sports', rfScore: '0.97' },
  { id: '0x18B2-CC40', x: 85, y: 62, speed: 72.0, heading: 90, status: 'NORMAL', accel: 0.1, rssi: -79.1, lane: 3, type: 'Truck', rfScore: '0.04' },
  { id: '0x5D39-01FA', x: 18, y: 38, speed: 70.5, heading: 91, status: 'MALICIOUS', attack: 'Position Spoofing', accel: 1.2, rssi: -58.2, lane: 1, type: 'Sedan', rfScore: '0.99' },
  { id: '0x44A1-2299', x: 60, y: 58, speed: 68.0, heading: 89, status: 'NORMAL', accel: -0.1, rssi: -74.0, lane: 2, type: 'Van', rfScore: '0.01' },
  { id: '0x6B19-EE80', x: 92, y: 36, speed: 82.1, heading: 90, status: 'NORMAL', accel: 0.3, rssi: -82.4, lane: 1, type: 'Sedan', rfScore: '0.03' },
  { id: '0xBB33-1100', x: 38, y: 64, speed: 65.0, heading: 89, status: 'SUSPECT', attack: 'Sybil Suspect', accel: 0.0, rssi: -64.1, lane: 3, type: 'Sedan', rfScore: '0.68' },
];

const RealTimeMonitor = () => {
  const {
    isLiveStreaming,
    setIsLiveStreaming,
    streamSpeed,
    setStreamSpeed,
    addToast
  } = useSentinel();

  const [vehicles, setVehicles] = useState(INITIAL_VEHICLES);
  const [selectedVehicle, setSelectedVehicle] = useState(INITIAL_VEHICLES[2]); // Default to malicious one
  const [livePackets, setLivePackets] = useState([]);
  const [filterMode, setFilterMode] = useState('ALL'); // 'ALL' | 'MALICIOUS'

  // Animate vehicles moving across the highway grid
  useEffect(() => {
    if (!isLiveStreaming) return;

    const interval = setInterval(() => {
      setVehicles((prev) =>
        prev.map((v) => {
          let newX = v.x + (v.speed / 120) * streamSpeed;
          if (newX > 98) newX = 2; // Wrap around highway loop
          return { ...v, x: parseFloat(newX.toFixed(1)) };
        })
      );

      // Generate a new rolling BSM packet
      const randomVeh = vehicles[Math.floor(Math.random() * vehicles.length)];
      const isMalicious = randomVeh.status === 'MALICIOUS';
      const newPacket = {
        id: 'BSM-' + Math.floor(100000 + Math.random() * 900000),
        timestamp: new Date().toLocaleTimeString() + '.' + Math.floor(Math.random() * 900 + 100),
        senderId: randomVeh.id,
        speed: (randomVeh.speed + (Math.random() * 2 - 1)).toFixed(1),
        accel: randomVeh.accel,
        rssi: randomVeh.rssi,
        status: randomVeh.status,
        attack: randomVeh.attack || 'None',
        rfConfidence: isMalicious ? '98.5%' : '99.8%',
        latency: (3.1 + Math.random() * 1.2).toFixed(1) + 'ms'
      };

      setLivePackets((prev) => [newPacket, ...prev.slice(0, 11)]);
    }, 1200 / streamSpeed);

    return () => clearInterval(interval);
  }, [isLiveStreaming, streamSpeed, vehicles]);

  const handleQuarantine = (veh) => {
    addToast('danger', 'Vehicle Quarantined', `Revoked pseudonym certificate for ${veh.id}. Misbehavior Report (MBR) broadcast to adjacent RSU nodes.`);
    setVehicles(prev => prev.map(v => v.id === veh.id ? { ...v, status: 'QUARANTINED' } : v));
  };

  const handleInjectRogue = () => {
    const rogueId = '0xROGU-' + Math.floor(1000 + Math.random() * 9000);
    const rogueVeh = {
      id: rogueId,
      x: 10,
      y: 42,
      speed: 135.2,
      heading: 95,
      status: 'MALICIOUS',
      attack: 'Ghost Vehicle Injection',
      accel: 18.5,
      rssi: -52.0,
      lane: 1,
      type: 'Ghost Node',
      rfScore: '0.99'
    };
    setVehicles(prev => [rogueVeh, ...prev]);
    setSelectedVehicle(rogueVeh);
    addToast('danger', 'Rogue Node Injected!', `Random Forest: Ghost vehicle ${rogueId} flagged via kinematic spatial violation.`);
  };

  const filteredVehicles = filterMode === 'MALICIOUS'
    ? vehicles.filter(v => v.status === 'MALICIOUS' || v.status === 'SUSPECT')
    : vehicles;

  return (
    <div className="space-y-6">
      {/* Title & Stream Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight font-mono">
              REAL-TIME V2X TRAFFIC MONITOR
            </h1>
            <Badge variant="LOW">5.9 GHz DSRC / C-V2X</Badge>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Spatial kinematic radar tracking connected vehicles and evaluating real-time Random Forest misbehavior classifications.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="danger"
            size="sm"
            icon={Zap}
            onClick={handleInjectRogue}
          >
            Inject Rogue Node
          </Button>

          <Button
            variant={isLiveStreaming ? 'secondary' : 'primary'}
            size="sm"
            icon={isLiveStreaming ? Pause : Play}
            onClick={() => setIsLiveStreaming(!isLiveStreaming)}
          >
            {isLiveStreaming ? 'Pause Radar' : 'Resume Radar'}
          </Button>
        </div>
      </div>

      {/* Demonstration Banner */}
      <DemonstrationBanner
        title="Phase 1 Live Spatial Radar Prototype"
        message="This radar visualizes connected vehicles along Highway I-95 corridor RSU-02, evaluating each 100ms BSM using the Random Forest Classifier. In Phase 2, this radar will bind to live WebSocket feeds streaming SAE J2735 messages from real SUMO traffic simulations and onboard units (OBUs)."
      />

      {/* Top Metric Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-3.5 rounded-xl border border-cyber-border bg-slate-900/60 font-mono">
          <span className="text-[10px] text-slate-400 block uppercase">TRACKED VEHICLES</span>
          <span className="text-xl font-bold text-white font-mono-numbers">
            {vehicles.length} Nodes
          </span>
          <span className="text-[10px] text-cyan-400 block mt-0.5">Active in RSU-02 range</span>
        </div>

        <div className="p-3.5 rounded-xl border border-red-500/30 bg-red-950/20 font-mono">
          <span className="text-[10px] text-red-400 block uppercase">FLAGGED THREATS</span>
          <span className="text-xl font-bold text-red-400 font-mono-numbers">
            {vehicles.filter(v => v.status === 'MALICIOUS').length} Active
          </span>
          <span className="text-[10px] text-red-300/80 block mt-0.5">RF classified anomalies</span>
        </div>

        <div className="p-3.5 rounded-xl border border-cyber-border bg-slate-900/60 font-mono">
          <span className="text-[10px] text-slate-400 block uppercase">RANDOM FOREST LATENCY</span>
          <span className="text-xl font-bold text-emerald-400 font-mono-numbers">
            3.8 ms
          </span>
          <span className="text-[10px] text-slate-400 block mt-0.5">Sub-10ms safety limit</span>
        </div>

        <div className="p-3.5 rounded-xl border border-cyber-border bg-slate-900/60 font-mono">
          <span className="text-[10px] text-slate-400 block uppercase">DSRC FREQUENCY</span>
          <span className="text-xl font-bold text-cyan-300 font-mono-numbers">
            5.890 GHz
          </span>
          <span className="text-[10px] text-cyan-400 block mt-0.5">Channel 178 (Control)</span>
        </div>
      </div>

      {/* Main Grid: Radar Screen (8 Cols) & Vehicle Telemetry Inspector (4 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 Cols: Spatial Radar Simulation */}
        <div className="lg:col-span-8 space-y-4">
          <Card
            title="Spatial Highway Radar (RSU-02 Sector A)"
            subtitle="Click any vehicle to inspect its live kinematic BSM packet and Random Forest score"
            headerAction={
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setFilterMode('ALL')}
                  className={`px-2 py-0.5 rounded text-[11px] font-mono ${filterMode === 'ALL'
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                    }`}
                >
                  All ({vehicles.length})
                </button>
                <button
                  onClick={() => setFilterMode('MALICIOUS')}
                  className={`px-2 py-0.5 rounded text-[11px] font-mono ${filterMode === 'MALICIOUS'
                      ? 'bg-red-500 text-white font-bold'
                      : 'text-slate-400 hover:text-white'
                    }`}
                >
                  Threats Only
                </button>
              </div>
            }
          >
            {/* Visual Radar Screen */}
            <div className="relative w-full h-80 sm:h-96 rounded-2xl border border-cyan-500/30 bg-[#060A12] overflow-hidden cyber-grid-dense flex items-center justify-center">
              {/* Radar concentric circular rings */}
              <div className="absolute w-72 h-72 sm:w-80 sm:h-80 rounded-full border border-cyan-500/20 pointer-events-none" />
              <div className="absolute w-48 h-48 sm:w-56 sm:h-56 rounded-full border border-cyan-500/25 pointer-events-none" />
              <div className="absolute w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-cyan-500/30 pointer-events-none" />

              {/* Crosshair axes */}
              <div className="absolute inset-x-0 top-1/2 h-px bg-cyan-500/20 pointer-events-none" />
              <div className="absolute inset-y-0 left-1/2 w-px bg-cyan-500/20 pointer-events-none" />

              {/* Radar sweep animation */}
              <div className="absolute w-80 h-80 rounded-full radar-sweep animate-radar pointer-events-none opacity-40" />

              {/* Highway Road Lanes */}
              <div className="absolute inset-x-0 h-32 top-1/2 -translate-y-1/2 border-y-2 border-slate-700/80 bg-slate-900/30 pointer-events-none">
                {/* Lane dashed lines */}
                <div className="absolute inset-x-0 top-1/3 border-b border-dashed border-cyan-500/20" />
                <div className="absolute inset-x-0 top-2/3 border-b border-dashed border-cyan-500/20" />
                <span className="absolute left-3 top-2 text-[10px] font-mono text-slate-400">
                  LANE 1 (EXPRESS)
                </span>
                <span className="absolute left-3 top-1/3 pt-1 text-[10px] font-mono text-slate-400">
                  LANE 2 (CRUISE)
                </span>
                <span className="absolute left-3 top-2/3 pt-1 text-[10px] font-mono text-slate-400">
                  LANE 3 (MERGE)
                </span>
              </div>

              {/* Roadside Unit (RSU) Antenna in center */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center pointer-events-none">
                <div className="w-5 h-5 rounded-full bg-cyan-400/20 border-2 border-cyan-400 flex items-center justify-center animate-pulse">
                  <div className="w-2 h-2 rounded-full bg-cyan-300 shadow-glow-cyan" />
                </div>
                <span className="text-[9px] font-mono text-cyan-300 font-bold bg-slate-950/80 px-1 rounded mt-0.5">
                  RSU-02
                </span>
              </div>

              {/* Vehicle Nodes on Radar */}
              {filteredVehicles.map((veh) => {
                const isSelected = selectedVehicle?.id === veh.id;
                let colorClasses = 'border-cyan-400 bg-cyan-500/20 text-cyan-300 shadow-glow-cyan';
                let pingClass = 'bg-cyan-400';

                if (veh.status === 'MALICIOUS') {
                  colorClasses = 'border-red-500 bg-red-500/30 text-red-300 shadow-glow-danger animate-pulse';
                  pingClass = 'bg-red-500';
                } else if (veh.status === 'SUSPECT') {
                  colorClasses = 'border-amber-400 bg-amber-500/30 text-amber-300 shadow-amber-500/30';
                  pingClass = 'bg-amber-400';
                } else if (veh.status === 'QUARANTINED') {
                  colorClasses = 'border-slate-500 bg-slate-700/50 text-slate-400 opacity-60';
                  pingClass = 'bg-slate-400';
                }

                return (
                  <button
                    key={veh.id}
                    onClick={() => setSelectedVehicle(veh)}
                    style={{ left: `${veh.x}%`, top: `${veh.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 z-30 transition-all duration-300 cursor-pointer group`}
                  >
                    <div className="relative">
                      {isSelected && (
                        <div className="absolute -inset-2 rounded-full border border-cyan-400/80 animate-ping pointer-events-none" />
                      )}
                      <div
                        className={`w-7 h-7 rounded-xl border flex items-center justify-center text-[10px] font-mono font-bold transition-transform group-hover:scale-125 ${colorClasses} ${isSelected ? 'ring-2 ring-white scale-110' : ''
                          }`}
                      >
                        🚗
                      </div>
                    </div>
                    {/* Hover tooltip */}
                    <div className="opacity-0 group-hover:opacity-100 absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px] font-mono text-white whitespace-nowrap pointer-events-none shadow-lg z-40">
                      {veh.id} • {veh.speed} km/h {veh.attack && `[${veh.attack}]`}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Radar Legend & Status Footer */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-400 pt-3 border-t border-slate-800">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-glow-cyan" />
                  Normal Vehicle
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-glow-danger" />
                  Flagged Misbehavior
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  Suspect Drift
                </span>
              </div>
              <span className="text-cyan-400">
                Model: Random Forest Ensemble (200 Trees)
              </span>
            </div>
          </Card>

          {/* Real-time BSM Packet Feed Stream */}
          <Card
            title="Real-Time BSM Packet Interception Stream"
            subtitle="Live rolling stream of 100ms basic safety message packets evaluated by Random Forest"
            noPadding
          >
            <div className="overflow-x-auto max-h-56">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="border-b border-cyber-border bg-slate-900/80 text-slate-400 text-[10px] uppercase sticky top-0">
                    <th className="py-2.5 px-3">Packet ID</th>
                    <th className="py-2.5 px-3">Timestamp</th>
                    <th className="py-2.5 px-3">Sender Pseudonym</th>
                    <th className="py-2.5 px-3">Velocity</th>
                    <th className="py-2.5 px-3">RSSI</th>
                    <th className="py-2.5 px-3">Classification</th>
                    <th className="py-2.5 px-3 text-right">Inference</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {livePackets.map((pkt) => (
                    <tr
                      key={pkt.id}
                      className={`hover:bg-slate-800/40 transition-colors ${pkt.status === 'MALICIOUS' ? 'bg-red-950/20 text-red-200' : 'text-slate-300'
                        }`}
                    >
                      <td className="py-2 px-3 text-cyan-400 text-[11px]">{pkt.id}</td>
                      <td className="py-2 px-3 text-slate-400 text-[11px]">{pkt.timestamp}</td>
                      <td className="py-2 px-3 font-bold text-white">{pkt.senderId}</td>
                      <td className="py-2 px-3">{pkt.speed} km/h</td>
                      <td className="py-2 px-3 text-slate-400">{pkt.rssi} dBm</td>
                      <td className="py-2 px-3">
                        <Badge variant={pkt.status === 'MALICIOUS' ? 'DANGER' : 'SUCCESS'} size="xs">
                          {pkt.status === 'MALICIOUS' ? pkt.attack : 'VERIFIED'}
                        </Badge>
                      </td>
                      <td className="py-2 px-3 text-right text-emerald-400 font-bold text-[11px]">
                        {pkt.latency}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Right 4 Cols: Vehicle Telemetry Inspector */}
        <div className="lg:col-span-4">
          <Card
            title="Vehicle Telemetry Inspector"
            subtitle="Kinematic profile and Random Forest consensus check"
            headerAction={
              selectedVehicle && (
                <Badge variant={selectedVehicle.status === 'MALICIOUS' ? 'DANGER' : selectedVehicle.status === 'SUSPECT' ? 'WARNING' : 'SUCCESS'}>
                  {selectedVehicle.status}
                </Badge>
              )
            }
          >
            {selectedVehicle ? (
              <div className="space-y-4 font-mono text-xs">
                {/* Vehicle Header Card */}
                <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/60 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">
                      PSEUDO-MAC IDENTITY
                    </span>
                    <h3 className="text-base font-bold text-cyan-300">
                      {selectedVehicle.id}
                    </h3>
                    <span className="text-[10px] text-slate-400">
                      Class: {selectedVehicle.type} • Lane {selectedVehicle.lane}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block uppercase">
                      RF ANOMALY SCORE
                    </span>
                    <span className={`text-sm font-bold ${selectedVehicle.status === 'MALICIOUS' ? 'text-red-400' : 'text-emerald-400'
                      }`}>
                      {selectedVehicle.rfScore || (selectedVehicle.status === 'MALICIOUS' ? '0.94' : '0.02')} / 1.00
                    </span>
                  </div>
                </div>

                {/* Telemetry Grid */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/40">
                    <div className="flex items-center gap-1.5 text-slate-400 text-[10px] mb-1">
                      <Gauge className="w-3.5 h-3.5 text-cyan-400" />
                      <span>VELOCITY</span>
                    </div>
                    <span className="text-white font-bold text-sm">
                      {selectedVehicle.speed} km/h
                    </span>
                    <span className="text-[10px] text-slate-400 block">Speed limit: 80 km/h</span>
                  </div>

                  <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/40">
                    <div className="flex items-center gap-1.5 text-slate-400 text-[10px] mb-1">
                      <Activity className="w-3.5 h-3.5 text-amber-400" />
                      <span>ACCELERATION</span>
                    </div>
                    <span className={`font-bold text-sm ${Math.abs(selectedVehicle.accel) > 10 ? 'text-red-400' : 'text-white'
                      }`}>
                      {selectedVehicle.accel} m/s²
                    </span>
                    <span className="text-[10px] text-slate-400 block">Max limit: ±8.0 m/s²</span>
                  </div>

                  <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/40">
                    <div className="flex items-center gap-1.5 text-slate-400 text-[10px] mb-1">
                      <Compass className="w-3.5 h-3.5 text-blue-400" />
                      <span>HEADING YAW</span>
                    </div>
                    <span className="text-white font-bold text-sm">
                      {selectedVehicle.heading}° East
                    </span>
                    <span className="text-[10px] text-slate-400 block">Road azimuth: 90°</span>
                  </div>

                  <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/40">
                    <div className="flex items-center gap-1.5 text-slate-400 text-[10px] mb-1">
                      <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                      <span>RSSI POWER</span>
                    </div>
                    <span className="text-white font-bold text-sm">
                      {selectedVehicle.rssi} dBm
                    </span>
                    <span className="text-[10px] text-slate-400 block">Antenna S/N: 24.2 dB</span>
                  </div>
                </div>

                {/* Misbehavior Diagnosis Box */}
                {selectedVehicle.status === 'MALICIOUS' ? (
                  <div className="p-3.5 rounded-xl border border-red-500/40 bg-red-950/30 text-slate-200 space-y-2">
                    <div className="flex items-center gap-2 text-red-400 font-bold uppercase text-[11px]">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <span>MISBEHAVIOR CLASSIFICATION: {selectedVehicle.attack}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      Random Forest Ensemble flagged kinematic plausibility violation. Instantaneous deceleration exceeds theoretical tire adhesion limit on asphalt.
                    </p>
                    <div className="pt-2 border-t border-red-500/30 flex items-center justify-between text-[10px]">
                      <span className="text-slate-400">Random Forest Consensus:</span>
                      <span className="text-red-400 font-bold">198 / 200 Trees (99.0%)</span>
                    </div>
                  </div>
                ) : (
                  <div className="p-3.5 rounded-xl border border-emerald-500/30 bg-emerald-950/20 text-slate-300 space-y-1">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold uppercase text-[11px]">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>KINEMATIC PLAUSIBILITY VERIFIED</span>
                    </div>
                    <p className="text-xs text-slate-400 font-sans">
                      Random Forest trees classify telemetry as Normal BSM with 99.8% consensus.
                    </p>
                  </div>
                )}

                {/* Mitigation Actions */}
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <Button
                    variant="danger"
                    size="sm"
                    className="w-full"
                    disabled={selectedVehicle.status === 'QUARANTINED'}
                    onClick={() => handleQuarantine(selectedVehicle)}
                  >
                    {selectedVehicle.status === 'QUARANTINED' ? 'Pseudonym Blacklisted' : 'Quarantine & Revoke Pseudonym'}
                  </Button>

                  <p className="text-[10px] text-slate-500 text-center font-mono">
                    SAE J2735 Cooperative Misbehavior Report (MBR)
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-slate-500 font-mono text-xs">
                Click any vehicle node on the radar to inspect telemetry.
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RealTimeMonitor;
