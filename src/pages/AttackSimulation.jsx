import React, { useState } from 'react';
import {
  Crosshair,
  Zap,
  ShieldCheck,
  ShieldAlert,
  Sliders,
  Play,
  RotateCcw,
  Sparkles,
  AlertTriangle,
  Activity,
  Flame,
  Radio,
  Clock,
  ArrowRight,
  Award,
  GitBranch
} from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import DemonstrationBanner from '../components/common/DemonstrationBanner';
import { useSentinel } from '../context/SentinelContext';

const PRESET_SCENARIOS = [
  {
    id: 'phantom-braking',
    title: 'Phantom Braking Cascade',
    category: 'Speed Anomaly',
    severity: 'CRITICAL',
    description: 'Rogue vehicle broadcasts false -28.4 m/s² emergency deceleration on high-speed expressway, attempting to induce pile-up.',
    params: {
      attackType: 'Speed Anomaly',
      vehicleId: '0xROGUE-BRAKE-01',
      speedDelta: -75.0,
      posLeap: 0.0,
      frequency: 10.0,
      rssi: -68.0,
    }
  },
  {
    id: 'sybil-congestion',
    title: 'Sybil Congestion Fabricator',
    category: 'Sybil Attack',
    severity: 'HIGH',
    description: 'Single physical transmitter spams 16 distinct vehicle pseudonyms to trick autonomous routing algorithms into rerouting traffic.',
    params: {
      attackType: 'Sybil Attack',
      vehicleId: '0xSYBIL-CLUSTER',
      speedDelta: 0.0,
      posLeap: 0.0,
      frequency: 10.0,
      rssi: -64.2,
    }
  },
  {
    id: 'gps-teleport',
    title: 'GPS Position Leap / Teleportation',
    category: 'Position Spoofing',
    severity: 'CRITICAL',
    description: 'Vehicle injects instantaneous +48.5m coordinate jump across lanes within single 100ms interval (requires >1740 km/h speed).',
    params: {
      attackType: 'Position Spoofing',
      vehicleId: '0xSPOOF-TELEPORT',
      speedDelta: 0.0,
      posLeap: 48.5,
      frequency: 10.0,
      rssi: -72.0,
    }
  },
  {
    id: 'channel-flood',
    title: 'DSRC Channel 178 Flooding DoS',
    category: 'DoS / Flooding',
    severity: 'HIGH',
    description: 'Floods safety frequency with 220 Hz broadcast rate, attempting to drop adjacent collision avoidance warning packets.',
    params: {
      attackType: 'DoS / Channel Flooding',
      vehicleId: '0xFLOOD-JAMMER',
      speedDelta: 0.0,
      posLeap: 0.0,
      frequency: 220.0,
      rssi: -54.0,
    }
  }
];

const AttackSimulation = () => {
  const { injectAttackSimulation, injectionResult, hyperparameters } = useSentinel();

  const [activeScenario, setActiveScenario] = useState(PRESET_SCENARIOS[0]);
  const [attackType, setAttackType] = useState('Speed Anomaly');
  const [vehicleId, setVehicleId] = useState('0xROGUE-BRAKE-01');
  const [speedDelta, setSpeedDelta] = useState(-75.0);
  const [posLeap, setPosLeap] = useState(0.0);
  const [frequency, setFrequency] = useState(10.0);
  const [rssi, setRssi] = useState(-68.0);
  const [isInjecting, setIsInjecting] = useState(false);

  const handleSelectScenario = (sc) => {
    setActiveScenario(sc);
    setAttackType(sc.params.attackType);
    setVehicleId(sc.params.vehicleId);
    setSpeedDelta(sc.params.speedDelta);
    setPosLeap(sc.params.posLeap);
    setFrequency(sc.params.frequency);
    setRssi(sc.params.rssi);
  };

  const handleRunInjection = () => {
    setIsInjecting(true);
    setTimeout(() => {
      injectAttackSimulation({
        attackType,
        vehicleId,
        speedDelta,
        posLeap,
        frequency,
        rssi,
        severity: Math.abs(speedDelta) > 50 || posLeap > 30 || frequency > 100 ? 'CRITICAL' : 'HIGH',
        description: `Injected ${attackType} on vehicle ${vehicleId}. Random Forest ensemble detected physical kinematic violation.`
      });
      setIsInjecting(false);
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight font-mono">
              ATTACK SIMULATION & SCENARIO INJECTOR
            </h1>
            <Badge variant="PURPLE">SECURITY SANDBOX</Badge>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Test and validate the primary Random Forest Classifier against adversarial VeReMi Extension misbehaviors in real time.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="danger"
            size="sm"
            icon={Flame}
            loading={isInjecting}
            onClick={handleRunInjection}
          >
            Execute Cyber Injection
          </Button>
        </div>
      </div>

      {/* Demonstration Banner */}
      <DemonstrationBanner
        title="Adversarial Sandbox & Random Forest Verification"
        message="This cyber-physical sandbox allows the review committee to trigger adversarial attack vectors and observe immediate real-time kinematic classification and pseudonym isolation by the Random Forest Classifier. In Phase 2, this will interface with CARLA / SUMO simulator injection sockets."
      />

      {/* Preset Scenarios Grid (4 Cards) */}
      <div>
        <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
          <Crosshair className="w-4 h-4 text-cyan-400" />
          <span>Preset Adversarial Scenarios (VeReMi Extension)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {PRESET_SCENARIOS.map((scenario) => {
            const isSelected = activeScenario.id === scenario.id;
            return (
              <div
                key={scenario.id}
                onClick={() => handleSelectScenario(scenario)}
                className={`p-4 rounded-xl border transition-all cursor-pointer relative ${
                  isSelected
                    ? 'border-cyan-400 bg-gradient-to-b from-cyan-950/40 to-slate-900/90 shadow-glow-cyan'
                    : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Badge variant={scenario.severity} size="xs">
                    {scenario.severity}
                  </Badge>
                  <span className="text-[10px] font-mono text-cyan-400">
                    {scenario.category}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white mt-2.5">
                  {scenario.title}
                </h4>

                <p className="text-xs text-slate-400 mt-1.5 font-sans leading-relaxed line-clamp-3">
                  {scenario.description}
                </p>

                <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Target:</span>
                  <span className="text-cyan-300 font-bold">{scenario.params.vehicleId}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Row 2: Injection Controls (6 Cols) & Real-Time Sentinel Interception Response (6 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 6 Cols: Custom Parameter Sliders */}
        <div className="lg:col-span-6">
          <Card
            title="Custom Attack Vector Parameters"
            subtitle="Fine-tune vehicular sensor spoofing and broadcast anomalies"
            headerAction={<Sliders className="w-4 h-4 text-cyan-400" />}
          >
            <div className="space-y-4 font-mono text-xs">
              <div>
                <label className="text-slate-300 block mb-1">Target Vehicle Pseudonym</label>
                <input
                  type="text"
                  value={vehicleId}
                  onChange={(e) => setVehicleId(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-cyan-300 font-bold focus:outline-none focus:border-cyan-500/50"
                />
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Attack Classification Vector</label>
                <select
                  value={attackType}
                  onChange={(e) => setAttackType(e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-500/50 cursor-pointer"
                >
                  <option value="Speed Anomaly">Speed Anomaly (Phantom Deceleration / Acceleration)</option>
                  <option value="Position Spoofing">Position Spoofing (Instant GPS Leap / Teleportation)</option>
                  <option value="Sybil Attack">Sybil Identity Forgery (Multi-MAC Broadcast)</option>
                  <option value="DoS / Channel Flooding">DoS / 5.9GHz Channel Frequency Flooding</option>
                  <option value="Message Replay">Message Replay (Stale Timestamp Injection)</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Speed Fabrication Delta (Δv)</span>
                  <span className={`font-bold ${speedDelta !== 0 ? 'text-red-400' : 'text-slate-400'}`}>
                    {speedDelta > 0 ? `+${speedDelta}` : speedDelta} km/h
                  </span>
                </div>
                <input
                  type="range"
                  min="-100"
                  max="120"
                  step="5"
                  value={speedDelta}
                  onChange={(e) => setSpeedDelta(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 bg-slate-800 cursor-pointer"
                />
                <span className="text-[10px] text-slate-400">Injects physically impossible speed jumps</span>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Spatial Coordinate Leap (Δx)</span>
                  <span className={`font-bold ${posLeap > 0 ? 'text-red-400' : 'text-slate-400'}`}>
                    +{posLeap} meters
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="2"
                  value={posLeap}
                  onChange={(e) => setPosLeap(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 bg-slate-800 cursor-pointer"
                />
                <span className="text-[10px] text-slate-400">Exceeds vehicle kinematic travel envelope (100ms window)</span>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Broadcast Rate / Channel Frequency</span>
                  <span className={`font-bold ${frequency > 20 ? 'text-red-400' : 'text-slate-400'}`}>
                    {frequency} Hz
                  </span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="250"
                  step="5"
                  value={frequency}
                  onChange={(e) => setFrequency(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 bg-slate-800 cursor-pointer"
                />
                <span className="text-[10px] text-slate-400">Nominal SAE J2735 safety rate is 10 Hz</span>
              </div>

              <div className="pt-2">
                <Button
                  variant="danger"
                  className="w-full"
                  icon={Play}
                  loading={isInjecting}
                  onClick={handleRunInjection}
                >
                  {isInjecting ? 'Broadcasting Rogue BSM Packet...' : 'Inject Rogue Telemetry into Sentinel'}
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Right 6 Cols: Sentinel Detection Verdict */}
        <div className="lg:col-span-6">
          <Card
            title="Random Forest Interception Response"
            subtitle="Ensemble decision consensus and edge classification"
            headerAction={
              injectionResult ? (
                <Badge variant="DANGER">ATTACK INTERCEPTED</Badge>
              ) : (
                <Badge variant="LOW">STANDBY FOR INJECTION</Badge>
              )
            }
          >
            {injectionResult ? (
              <div className="space-y-4 font-mono text-xs">
                {/* Interception Alert Header */}
                <div className="p-4 rounded-xl border border-red-500/50 bg-red-950/30 text-slate-200 space-y-2 shadow-glow-danger">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-red-400 font-bold text-sm">
                      <ShieldAlert className="w-5 h-5 animate-bounce" />
                      MISBEHAVIOR POSITIVELY IDENTIFIED
                    </span>
                    <span className="px-2 py-0.5 rounded bg-red-500 text-slate-950 font-bold text-[10px]">
                      {injectionResult.latency}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    The <span className="text-cyan-300 font-bold">Random Forest Classifier</span> detected a statistically significant kinematic violation from vehicle <span className="font-mono text-cyan-300 font-bold">{injectionResult.vehicleId}</span>. The anomalous BSM packet was prevented from propagating to nearby connected vehicles.
                  </p>
                </div>

                {/* Score breakdown */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/50">
                    <span className="text-[10px] text-slate-400 block">RF ENSEMBLE CONSENSUS</span>
                    <span className="text-xl font-bold text-emerald-400">
                      {injectionResult.decisionTreesVotingMalicious || `${injectionResult.confidence}%`}
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">Majority Voting</span>
                  </div>

                  <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/50">
                    <span className="text-[10px] text-slate-400 block">EDGE INFERENCE LATENCY</span>
                    <span className="text-xl font-bold text-cyan-400">
                      {injectionResult.latency}
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">RSU evaluation time</span>
                  </div>
                </div>

                {/* Mitigation summary */}
                <div className="p-3 rounded-xl border border-slate-800 bg-slate-900/70 space-y-2 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Primary Classifier:</span>
                    <span className="text-cyan-300 font-bold">Random Forest ({hyperparameters.nEstimators} Trees)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">SCMS Pseudonym Status:</span>
                    <span className="text-red-400 font-bold">Blacklisted on CRL</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Cooperative Action:</span>
                    <span className="text-white">Broadcast Misbehavior Report (MBR)</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl border border-emerald-500/30 bg-emerald-950/20 text-emerald-300 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span className="text-xs">
                    Adjacent autonomous vehicles safely shielded from phantom hazard.
                  </span>
                </div>
              </div>
            ) : (
              <div className="py-16 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto animate-pulse">
                  <Crosshair className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white font-mono">
                    Ready for Adversarial Injection
                  </h4>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
                    Select a scenario above or adjust the sliders, then click "Inject Rogue Telemetry into Sentinel" to test real-time Random Forest classification.
                  </p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AttackSimulation;
