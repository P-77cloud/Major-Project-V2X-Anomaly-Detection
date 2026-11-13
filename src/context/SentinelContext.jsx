import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  SYSTEM_METRICS,
  RECENT_DETECTION_EVENTS,
  ML_MODELS,
  ATTACK_CATEGORIES
} from '../data/mockV2XData';
import { BENCHMARK_DATASETS, SAMPLE_CSV_ROWS } from '../data/datasetSamples';

const SentinelContext = createContext();

export const SentinelProvider = ({ children }) => {
  // Navigation & System Status
  const [metrics, setMetrics] = useState(SYSTEM_METRICS);
  const [isLiveStreaming, setIsLiveStreaming] = useState(true);
  const [streamSpeed, setStreamSpeed] = useState(1); // 1x, 2x, 5x

  // Datasets State (Page 2) - Defaults to VeReMi Extension
  const [selectedDataset, setSelectedDataset] = useState(BENCHMARK_DATASETS[0]);
  const [datasetRows, setDatasetRows] = useState(SAMPLE_CSV_ROWS);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState(null);

  // Model Training State (Page 3) - Defaults to Random Forest Classifier (Primary Model)
  const [selectedModelId, setSelectedModelId] = useState('random_forest');
  const [isTraining, setIsTraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [currentEpoch, setCurrentEpoch] = useState(0);
  const [currentTrees, setCurrentTrees] = useState(200);
  const [trainingCompleted, setTrainingCompleted] = useState(true);
  const [hyperparameters, setHyperparameters] = useState({
    nEstimators: 200,
    maxDepth: 16,
    minSamplesSplit: 2,
    criterion: 'gini',
    maxFeatures: 'sqrt',
    bootstrap: true,
    threshold: 0.75,
  });

  // Recent Detection Events (Page 1 & 5)
  const [threatEvents, setThreatEvents] = useState(RECENT_DETECTION_EVENTS);
  const [activeFilterSeverity, setActiveFilterSeverity] = useState('ALL');
  const [selectedEventForModal, setSelectedEventForModal] = useState(null);

  // Attack Injection / Simulation (Page 6)
  const [injectionResult, setInjectionResult] = useState(null);

  // Toast Notifications
  const [toasts, setToasts] = useState([
    {
      id: 1,
      type: 'info',
      title: 'ML Sentinel Active (Random Forest)',
      message: 'Random Forest Ensemble active with 200 decision trees calibrated for VeReMi Extension.',
      time: 'Just now'
    }
  ]);

  const addToast = (type, title, message) => {
    const id = Date.now();
    setToasts(prev => [{ id, type, title, message, time: 'Just now' }, ...prev.slice(0, 4)]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 6000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Live Packet counter effect
  useEffect(() => {
    if (!isLiveStreaming) return;
    const interval = setInterval(() => {
      setMetrics(prev => {
        const added = Math.floor(Math.random() * 8 + 3) * streamSpeed;
        const isAnomaly = Math.random() < 0.06;
        return {
          ...prev,
          totalAnalyzed: prev.totalAnalyzed + added,
          normalMessages: prev.normalMessages + (isAnomaly ? added - 1 : added),
          anomalousMessages: prev.anomalousMessages + (isAnomaly ? 1 : 0),
          lastUpdated: new Date().toISOString()
        };
      });
    }, 1500 / streamSpeed);

    return () => clearInterval(interval);
  }, [isLiveStreaming, streamSpeed]);

  // Model Training Simulation Handler for Random Forest Ensemble
  const startTrainingSimulation = () => {
    setIsTraining(true);
    setTrainingCompleted(false);
    setTrainingProgress(0);
    setCurrentEpoch(0);
    setCurrentTrees(0);
    const model = ML_MODELS.find(m => m.id === selectedModelId);
    addToast('info', 'Tree Construction Initialized', `Building ${hyperparameters.nEstimators} Decision Trees via Bootstrap Aggregation (Bagging)...`);

    let step = 0;
    const totalSteps = 30;
    const targetTrees = hyperparameters.nEstimators;

    const interval = setInterval(() => {
      step += 1;
      setCurrentEpoch(step);
      const progress = Math.round((step / totalSteps) * 100);
      setTrainingProgress(progress);
      const builtTrees = Math.min(Math.round((step / totalSteps) * targetTrees), targetTrees);
      setCurrentTrees(builtTrees);

      if (step >= totalSteps) {
        clearInterval(interval);
        setIsTraining(false);
        setTrainingCompleted(true);
        addToast('success', 'Random Forest Converged!', `Constructed ${targetTrees} trees on VeReMi Extension. Out-of-Bag (OOB) accuracy: 98.71%, test F1: 98.05%.`);
      }
    }, 180);
  };

  // Simulate File Upload
  const simulateFileUpload = (file) => {
    setIsUploading(true);
    setUploadProgress(0);
    setUploadSuccessMessage(null);

    let p = 0;
    const interval = setInterval(() => {
      p += 15;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setIsUploading(false);
        setUploadProgress(100);
        setSelectedDataset({
          id: 'custom-' + Date.now(),
          name: file.name,
          filename: file.name,
          size: (file.size ? (file.size / (1024 * 1024)).toFixed(2) + ' MB' : '18.5 MB'),
          records: 142600,
          features: 14,
          anomalies: 11400,
          anomalyRate: '7.99%',
          missingValues: 0,
          source: 'Uploaded Custom V2X CSV Trace',
          description: 'Custom BSM telemetry stream uploaded by security operator for Phase 1 preview.'
        });
        setUploadSuccessMessage(`Dataset "${file.name}" validated successfully. 142,600 BSM frames parsed.`);
        addToast('success', 'Dataset Parsed', `Schema verified: 14 kinematic columns conforming to SAE J2735 & VeReMi format.`);
      } else {
        setUploadProgress(p);
      }
    }, 160);
  };

  // Attack Injection Action with Random Forest Voting Breakdown
  const injectAttackSimulation = (attackParams) => {
    const eventId = 'EVT-' + Math.floor(1000 + Math.random() * 9000);
    const votesMalicious = Math.floor(192 + Math.random() * 7); // e.g. 195/200 trees vote malicious
    const totalTrees = hyperparameters.nEstimators || 200;

    const newEvent = {
      id: eventId,
      timestamp: 'Just now (1s ago)',
      vehicleId: attackParams.vehicleId || '0xAA11-99FF',
      rsuLocation: attackParams.rsuLocation || 'RSU-02 Highway I-95 N',
      attackType: attackParams.attackType,
      severity: attackParams.severity || 'CRITICAL',
      confidence: ((votesMalicious / totalTrees) * 100).toFixed(1),
      anomalyScore: (votesMalicious / totalTrees).toFixed(3),
      decisionTreesVotingMalicious: `${votesMalicious} / ${totalTrees} Trees (${((votesMalicious / totalTrees) * 100).toFixed(1)}%)`,
      details: attackParams.description || `Injected kinematic anomaly: ${attackParams.attackType} flagged by Random Forest ensemble with high consensus.`,
      action: 'Automated Revocation & Quarantine Triggered'
    };

    setThreatEvents(prev => [newEvent, ...prev]);
    setInjectionResult({
      ...newEvent,
      latency: (3.2 + Math.random() * 1.2).toFixed(1) + ' ms',
      status: 'BLOCKED & ISOLATED'
    });

    addToast('danger', 'MISBEHAVIOR CLASSIFIED!', `Random Forest: ${newEvent.decisionTreesVotingMalicious} flagged ${attackParams.attackType} on ${newEvent.vehicleId} in 3.6ms!`);
  };

  return (
    <SentinelContext.Provider value={{
      metrics,
      isLiveStreaming,
      setIsLiveStreaming,
      streamSpeed,
      setStreamSpeed,
      selectedDataset,
      setSelectedDataset,
      datasetRows,
      uploadProgress,
      isUploading,
      uploadSuccessMessage,
      simulateFileUpload,
      selectedModelId,
      setSelectedModelId,
      isTraining,
      trainingProgress,
      currentEpoch,
      currentTrees,
      trainingCompleted,
      hyperparameters,
      setHyperparameters,
      startTrainingSimulation,
      threatEvents,
      setThreatEvents,
      activeFilterSeverity,
      setActiveFilterSeverity,
      selectedEventForModal,
      setSelectedEventForModal,
      injectionResult,
      injectAttackSimulation,
      toasts,
      addToast,
      removeToast,
    }}>
      {children}
    </SentinelContext.Provider>
  );
};

export const useSentinel = () => {
  const context = useContext(SentinelContext);
  if (!context) {
    throw new Error('useSentinel must be used within a SentinelProvider');
  }
  return context;
};
