// Mock Data & Benchmarks for V2X SENTINEL
// Phase 1 Demonstration & Evaluation Dataset
// Primary Planned Algorithm: Random Forest Classifier (VeReMi Extension Benchmark)

export const SYSTEM_METRICS = {
  totalAnalyzed: 1482920,
  normalMessages: 1389450,
  anomalousMessages: 93470,
  detectionRate: 98.64,
  falsePositiveRate: 0.78,
  averageLatencyMs: 3.8, // Random Forest Edge Inference latency
  primaryModel: 'Random Forest Classifier',
  activeRSUNodes: 48,
  totalRSUNodes: 48,
  activeVehiclesInZone: 342,
  flaggedVehiclesCount: 19,
  lastUpdated: new Date().toISOString(),
};

export const ATTACK_CATEGORIES = [
  { name: 'Position Spoofing', count: 35518, percentage: 38.0, color: '#00F0FF', description: 'Fabricated GPS coordinates or unrealistic spatial teleportation violating kinematic laws.' },
  { name: 'Speed Anomaly', count: 24302, percentage: 26.0, color: '#38BDF8', description: 'Physically impossible acceleration/deceleration exceeding vehicle kinematic thresholds.' },
  { name: 'Sybil Attack', count: 14955, percentage: 16.0, color: '#F59E0B', description: 'Single physical vehicle broadcasting hundreds of distinct pseudo-identities with matching RF RSSI footprints.' },
  { name: 'Message Replay', count: 11216, percentage: 12.0, color: '#8B5CF6', description: 'Old or delayed BSM packets re-transmitted with valid cryptographic signatures.' },
  { name: 'DoS / Channel Flooding', count: 7479, percentage: 8.0, color: '#EF4444', description: 'Overwhelming 5.9 GHz DSRC/C-V2X channels with excessive broadcast rates (>100 Hz).' },
];

export const HOURLY_ACTIVITY_DATA = [
  { time: '00:00', total: 42000, normal: 39900, anomalous: 2100 },
  { time: '02:00', total: 28000, normal: 26700, anomalous: 1300 },
  { time: '04:00', total: 19000, normal: 18200, anomalous: 800 },
  { time: '06:00', total: 65000, normal: 61200, anomalous: 3800 },
  { time: '08:00', total: 142000, normal: 132500, anomalous: 9500 },
  { time: '10:00', total: 118000, normal: 110500, anomalous: 7500 },
  { time: '12:00', total: 125000, normal: 117000, anomalous: 8000 },
  { time: '14:00', total: 131000, normal: 122800, anomalous: 8200 },
  { time: '16:00', total: 158000, normal: 147100, anomalous: 10900 },
  { time: '18:00', total: 164000, normal: 152800, anomalous: 11200 },
  { time: '20:00', total: 105000, normal: 98700, anomalous: 6300 },
  { time: '22:00', total: 68000, normal: 63700, anomalous: 4300 },
];

export const RSU_DISTRIBUTION_DATA = [
  { rsu: 'RSU-01 Downtown Hub', traffic: 320000, anomalies: 24500, status: 'Online', signalHealth: '99.4%', model: 'Random Forest v1.4' },
  { rsu: 'RSU-02 Highway I-95 N', traffic: 410000, anomalies: 31200, status: 'Online', signalHealth: '98.9%', model: 'Random Forest v1.4' },
  { rsu: 'RSU-03 Airport Expressway', traffic: 285000, anomalies: 14800, status: 'Online', signalHealth: '99.8%', model: 'Random Forest v1.4' },
  { rsu: 'RSU-04 Tech Corridor Ave', traffic: 260000, anomalies: 12600, status: 'Online', signalHealth: '99.1%', model: 'Random Forest v1.4' },
  { rsu: 'RSU-05 Harbour Bridge Approach', traffic: 207920, anomalies: 10370, status: 'Online', signalHealth: '97.8%', model: 'Random Forest v1.4' },
];

export const RECENT_DETECTION_EVENTS = [
  {
    id: 'EVT-8921',
    timestamp: 'Just now (12s ago)',
    vehicleId: '0x7F4B-92A1',
    rsuLocation: 'RSU-02 Highway I-95 N',
    attackType: 'Position Spoofing',
    severity: 'CRITICAL',
    confidence: 99.4,
    anomalyScore: 0.942,
    decisionTreesVotingMalicious: '198 / 200 Trees (99.0%)',
    details: 'Vehicle reported +42m instantaneous position leap within 100ms interval. Violates kinematic limit (max theoretical speed 1512 km/h).',
    action: 'Vehicle Isolated / Misbehavior Report Dispatched'
  },
  {
    id: 'EVT-8920',
    timestamp: '48s ago',
    vehicleId: '0x3E12-A88F',
    rsuLocation: 'RSU-01 Downtown Hub',
    attackType: 'Speed Anomaly',
    severity: 'HIGH',
    confidence: 97.8,
    anomalyScore: 0.885,
    decisionTreesVotingMalicious: '194 / 200 Trees (97.0%)',
    details: 'Instantaneous deceleration of -28.4 m/s² reported without anti-lock brake telemetry activation.',
    action: 'Alert Flagged to Adjacent Connected Nodes'
  },
  {
    id: 'EVT-8919',
    timestamp: '2m 14s ago',
    vehicleId: '0x99C4-5100',
    rsuLocation: 'RSU-03 Airport Expressway',
    attackType: 'Sybil Attack',
    severity: 'CRITICAL',
    confidence: 98.7,
    anomalyScore: 0.963,
    decisionTreesVotingMalicious: '196 / 200 Trees (98.0%)',
    details: '14 distinct temporary pseudo-MAC identities originating from identical physical RF antenna footprint (RSSI variance < 0.2 dBm).',
    action: 'Spectrum Quarantine & Pseudonym Blacklisted'
  },
  {
    id: 'EVT-8918',
    timestamp: '5m 02s ago',
    vehicleId: '0x18B2-CC40',
    rsuLocation: 'RSU-04 Tech Corridor Ave',
    attackType: 'Message Replay',
    severity: 'MEDIUM',
    confidence: 94.2,
    anomalyScore: 0.741,
    decisionTreesVotingMalicious: '185 / 200 Trees (92.5%)',
    details: 'Re-broadcasting cryptographically valid BSM packets with timestamp offset of +84.2 seconds.',
    action: 'Replay Dropped / Audit Logged'
  },
  {
    id: 'EVT-8917',
    timestamp: '8m 33s ago',
    vehicleId: '0x5D39-01FA',
    rsuLocation: 'RSU-05 Harbour Bridge Approach',
    attackType: 'DoS / Channel Flooding',
    severity: 'HIGH',
    confidence: 98.1,
    anomalyScore: 0.899,
    decisionTreesVotingMalicious: '195 / 200 Trees (97.5%)',
    details: 'Broadcast rate exceeded 185 Hz on 5.89 GHz safety channel (Standard SAE J2735 nominal rate is 10 Hz).',
    action: 'Rate Limiter Applied / Mac Throttle Engaged'
  },
];

// Machine Learning Algorithms Comparison
// Random Forest Classifier is the PRIMARY PLANNED MODEL for VeReMi Extension
export const ML_MODELS = [
  {
    id: 'random_forest',
    name: 'Random Forest Ensemble Classifier',
    type: 'Bagging Decision Trees (Primary Model)',
    accuracy: 98.64,
    precision: 97.90,
    recall: 98.20,
    f1Score: 98.05,
    aucRoc: 0.994,
    oobScore: 98.71,
    inferenceLatency: '3.8 ms',
    trainingTime: '52.4 s',
    parameters: '200 Trees, Max Depth 16, Gini Impurity, max_features="sqrt", Bootstrap=True',
    status: 'Primary Planned Model (VeReMi Champion)',
    recommended: true,
    whySelected: 'Exceptional stability on tabular BSM kinematic features, high resistance to sensor noise, fast sub-4ms inference on edge RSUs, and transparent Gini feature interpretability required for automotive safety certification.'
  },
  {
    id: 'xgboost',
    name: 'XGBoost Gradient Boosting',
    type: 'Gradient Boosted Decision Trees',
    accuracy: 99.12,
    precision: 98.94,
    recall: 99.05,
    f1Score: 98.99,
    aucRoc: 0.998,
    oobScore: 98.95,
    inferenceLatency: '2.1 ms',
    trainingTime: '64.8 s',
    parameters: '500 Trees, Max Depth 8, Learning Rate 0.05, Subsample 0.8',
    status: 'High Performance Alternative',
    recommended: false,
    whySelected: 'Excellent inference throughput, used as secondary benchmark for gradient boosting comparison.'
  },
  {
    id: 'bilstm',
    name: 'Bidirectional LSTM Network',
    type: 'Recurrent Neural Network (Deep Learning)',
    accuracy: 97.85,
    precision: 97.20,
    recall: 97.45,
    f1Score: 97.32,
    aucRoc: 0.989,
    oobScore: 97.50,
    inferenceLatency: '11.8 ms',
    trainingTime: '240.5 s',
    parameters: '2x 128 Hidden Units, Dropout 0.3, Sequence Window 20 frames',
    status: 'Temporal Trajectory Baseline',
    recommended: false,
    whySelected: 'Captures sequential trajectory anomalies but incurs higher edge latency (>10ms) on embedded RSUs.'
  },
  {
    id: 'autoencoder',
    name: 'Deep Kinematic Autoencoder',
    type: 'Unsupervised Reconstruction Anomaly Detection',
    accuracy: 96.48,
    precision: 95.80,
    recall: 96.10,
    f1Score: 95.95,
    aucRoc: 0.982,
    oobScore: 96.20,
    inferenceLatency: '5.4 ms',
    trainingTime: '185.0 s',
    parameters: 'Encoder [64, 32, 16], Latent 8, Decoder [16, 32, 64], MSE Loss',
    status: 'Zero-Day Unsupervised Baseline',
    recommended: false,
    whySelected: 'Unsupervised reconstruction baseline for detecting previously unobserved zero-day attack vectors.'
  },
];

// Feature Importance Ranking derived from Random Forest Gini Impurity Reduction
export const FEATURE_IMPORTANCE = [
  { feature: 'Pos_Plausibility_Delta', importance: 0.342, label: 'Kinematic Spatial Delta (Δd in meters)' },
  { feature: 'Instant_Accel_Variance', importance: 0.248, label: 'Instantaneous Acceleration Outlier (Δa in m/s²)' },
  { feature: 'RSSI_Distance_Mismatch', importance: 0.168, label: 'RSSI vs Free-Space Path Loss Mismatch' },
  { feature: 'Heading_Yaw_Deviation', importance: 0.132, label: 'Heading / Yaw Rate Deviation (Δθ in °/s)' },
  { feature: 'BSM_Transmission_Rate', importance: 0.072, label: 'Message Transmission Frequency (Hz)' },
  { feature: 'Speed_Delta_Consecutive', importance: 0.038, label: 'Velocity Drift across 100ms frames' },
];

export const CONFUSION_MATRIX_DATA = {
  truePositive: 92140, // Correctly detected attack frames
  falsePositive: 730,  // Normal frames flagged as attack
  falseNegative: 1330, // Attack frames missed
  trueNegative: 1388720, // Correctly identified normal frames
};

// Classification Report for Random Forest on VeReMi Extension Benchmark
export const CLASSIFICATION_REPORT = [
  { class: 'Normal BSM', precision: 0.999, recall: 0.999, f1: 0.999, support: 1389450 },
  { class: 'Position Spoofing', precision: 0.988, recall: 0.989, f1: 0.988, support: 35518 },
  { class: 'Speed Anomaly', precision: 0.982, recall: 0.984, f1: 0.983, support: 24302 },
  { class: 'Sybil Attack', precision: 0.976, recall: 0.980, f1: 0.978, support: 14955 },
  { class: 'Message Replay', precision: 0.965, recall: 0.968, f1: 0.966, support: 11216 },
  { class: 'DoS / Flooding', precision: 0.991, recall: 0.994, f1: 0.992, support: 7479 },
];

// Dynamic Training Progression for Random Forest (Tree Ensemble Construction)
export const TRAINING_CURVE_DATA = [
  { epoch: 1, trees: 10, oobError: 0.142, trainAcc: 88.5, valAcc: 87.2, f1: 86.8 },
  { epoch: 5, trees: 40, oobError: 0.068, trainAcc: 94.6, valAcc: 93.8, f1: 93.4 },
  { epoch: 10, trees: 80, oobError: 0.038, trainAcc: 97.2, valAcc: 96.5, f1: 96.1 },
  { epoch: 15, trees: 120, oobError: 0.024, trainAcc: 98.1, valAcc: 97.6, f1: 97.3 },
  { epoch: 20, trees: 150, oobError: 0.018, trainAcc: 98.5, valAcc: 98.1, f1: 97.8 },
  { epoch: 25, trees: 180, oobError: 0.015, trainAcc: 98.7, valAcc: 98.4, f1: 98.1 },
  { epoch: 30, trees: 200, oobError: 0.013, trainAcc: 98.9, valAcc: 98.6, f1: 98.4 },
];

// ROC Curve Points for Random Forest Classifier
export const ROC_CURVE_DATA = [
  { fpr: 0.00, tpr: 0.00 },
  { fpr: 0.001, tpr: 0.82 },
  { fpr: 0.003, tpr: 0.92 },
  { fpr: 0.005, tpr: 0.96 },
  { fpr: 0.008, tpr: 0.982 }, // Operating Point: FPR 0.78%, TPR 98.20%
  { fpr: 0.015, tpr: 0.991 },
  { fpr: 0.030, tpr: 0.996 },
  { fpr: 0.060, tpr: 0.998 },
  { fpr: 0.100, tpr: 0.999 },
  { fpr: 1.000, tpr: 1.000 },
];
