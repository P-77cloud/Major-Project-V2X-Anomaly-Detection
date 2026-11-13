import React, { useState } from 'react';
import {
  BrainCircuit,
  Cpu,
  Play,
  RotateCcw,
  CheckCircle2,
  TrendingUp,
  Sliders,
  Sparkles,
  Zap,
  Download,
  Server,
  Layers,
  Activity,
  GitBranch,
  ShieldCheck,
  Award,
  BarChart3
} from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import MetricCard from '../components/common/MetricCard';
import DemonstrationBanner from '../components/common/DemonstrationBanner';
import TrainingLossChart from '../components/charts/TrainingLossChart';
import ConfusionMatrix from '../components/charts/ConfusionMatrix';
import FeatureImportanceBar from '../components/charts/FeatureImportanceBar';
import ROCCurveChart from '../components/charts/ROCCurveChart';
import RandomForestTreeDiagram from '../components/charts/RandomForestTreeDiagram';
import { useSentinel } from '../context/SentinelContext';
import { ML_MODELS, CLASSIFICATION_REPORT } from '../data/mockV2XData';

const ModelTraining = () => {
  const {
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
    addToast
  } = useSentinel();

  const [activeEvalTab, setActiveEvalTab] = useState('confusion'); // 'confusion' | 'report' | 'roc' | 'tree'

  const selectedModel = ML_MODELS.find((m) => m.id === selectedModelId) || ML_MODELS[0];

  const handleDeployEdge = () => {
    addToast('success', 'Model Deployed to Edge RSUs', `Random Forest ensemble (200 trees) compiled via ONNX-Runtime and deployed across all 48 edge RSUs. Latency: ${selectedModel.inferenceLatency}`);
  };

  const handleExportONNX = () => {
    addToast('info', 'Model Pipeline Exported', `Generated "random_forest_sentinel_veremi_v1.onnx" and scikit-learn pipeline pickle for Phase 2 integration.`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight font-mono">
              MACHINE LEARNING MODEL TRAINING & EVALUATION
            </h1>
            <Badge variant="PURPLE">ML PIPELINE</Badge>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Configure decision tree hyperparameters, evaluate bagging ensembles, and inspect kinematic misbehavior classification for VeReMi Extension.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            icon={Download}
            size="sm"
            onClick={handleExportONNX}
          >
            Export ONNX / Scikit
          </Button>
          <Button
            variant="primary"
            icon={Server}
            size="sm"
            onClick={handleDeployEdge}
          >
            Deploy to Edge RSU
          </Button>
        </div>
      </div>

      {/* Prominent Demonstration Banner */}
      <DemonstrationBanner
        title="Machine Learning Model Evaluation & Demonstration"
        message="For the upcoming Nov 14 college review, all hyperparameter forms, bagging tree visualizations, confusion matrices, and ROC curves operate interactively with high-fidelity VeReMi Extension sample benchmarks. Full Python backend training (Scikit-Learn, Joblib, CUDA) will be connected in Phase 2."
      />

      {/* Primary Model Highlight Banner */}
      <div className="p-4 rounded-xl border border-cyan-500/40 bg-gradient-to-r from-cyan-950/40 via-blue-950/30 to-slate-900/60 shadow-lg font-mono text-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/40 text-cyan-400 shrink-0">
              <Award className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  Primary Planned Model
                </span>
                <span className="text-white font-bold text-sm">
                  Random Forest Classifier (Ensemble Bagging)
                </span>
              </div>
              <p className="text-slate-300 font-sans text-xs mt-1 leading-relaxed max-w-3xl">
                Random Forest is our chosen primary machine learning architecture for the VeReMi Extension dataset due to its superior handling of non-linear tabular kinematic features, resistance to GNSS sensor noise, low edge latency (<span className="text-emerald-400 font-mono font-bold">3.8 ms</span>), and transparent Gini feature interpretability required for automotive safety standards.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 shrink-0 border-t md:border-t-0 md:border-l border-slate-800 pt-3 md:pt-0 md:pl-4">
            <div>
              <span className="text-[10px] text-slate-400 block uppercase">OOB ACCURACY</span>
              <span className="text-base font-bold text-cyan-300">98.71%</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block uppercase">TEST F1-SCORE</span>
              <span className="text-base font-bold text-emerald-400">98.05%</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block uppercase">EDGE LATENCY</span>
              <span className="text-base font-bold text-purple-400">3.8 ms</span>
            </div>
          </div>
        </div>
      </div>

      {/* Algorithm Selection Row */}
      <div>
        <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
          <Cpu className="w-4 h-4 text-cyan-400" />
          <span>Select Model Architecture</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {ML_MODELS.map((model) => {
            const isSelected = model.id === selectedModelId;
            return (
              <div
                key={model.id}
                onClick={() => setSelectedModelId(model.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer relative ${isSelected
                    ? 'border-cyan-400/80 bg-gradient-to-b from-cyan-950/40 to-slate-900/90 shadow-glow-cyan'
                    : 'border-slate-800 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/70'
                  }`}
              >
                {model.recommended && (
                  <span className="absolute -top-2.5 right-3 text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-500 text-slate-950 uppercase shadow-md">
                    PRIMARY PLANNED MODEL
                  </span>
                )}

                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white">
                    {model.name}
                  </h4>
                  <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${isSelected ? 'border-cyan-400 bg-cyan-400' : 'border-slate-600'
                    }`}>
                    {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                  {model.type}
                </p>

                <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-mono pt-2 border-t border-slate-800/80">
                  <div>
                    <span className="text-[10px] text-slate-400 block">ACCURACY</span>
                    <span className="text-cyan-400 font-bold text-sm">
                      {model.accuracy}%
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">LATENCY</span>
                    <span className="text-emerald-400 font-bold text-sm">
                      {model.inferenceLatency}
                    </span>
                  </div>
                </div>

                <div className="mt-2 text-[10px] text-slate-400 font-mono truncate">
                  {model.status}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Row 2: Hyperparameters & Training Simulation Control */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 5 Cols: Hyperparameter Configuration for Random Forest */}
        <div className="lg:col-span-5">
          <Card
            title="Random Forest Hyperparameter Tuning"
            subtitle={`Optimizing ensemble parameters for ${selectedModel.name}`}
            headerAction={<Sliders className="w-4 h-4 text-cyan-400" />}
          >
            <div className="space-y-4 font-mono text-xs">
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Number of Estimators (n_estimators)</span>
                  <span className="text-cyan-400 font-bold">{hyperparameters.nEstimators} Trees</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="500"
                  step="25"
                  value={hyperparameters.nEstimators}
                  onChange={(e) =>
                    setHyperparameters({ ...hyperparameters, nEstimators: parseInt(e.target.value) })
                  }
                  className="w-full accent-cyan-400 bg-slate-800 cursor-pointer"
                />
                <span className="text-[10px] text-slate-400">Total decision trees in the bootstrap aggregation ensemble</span>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Max Tree Depth (max_depth)</span>
                  <span className="text-cyan-400 font-bold">{hyperparameters.maxDepth}</span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="32"
                  step="2"
                  value={hyperparameters.maxDepth}
                  onChange={(e) =>
                    setHyperparameters({ ...hyperparameters, maxDepth: parseInt(e.target.value) })
                  }
                  className="w-full accent-cyan-400 bg-slate-800 cursor-pointer"
                />
                <span className="text-[10px] text-slate-400">Controls maximum tree depth to prevent overfitting on noisy GNSS</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 block mb-1">Splitting Criterion</label>
                  <select
                    value={hyperparameters.criterion}
                    onChange={(e) =>
                      setHyperparameters({ ...hyperparameters, criterion: e.target.value })
                    }
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-500/50 cursor-pointer"
                  >
                    <option value="gini">Gini Impurity</option>
                    <option value="entropy">Entropy (Info Gain)</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">Max Features Split</label>
                  <select
                    value={hyperparameters.maxFeatures}
                    onChange={(e) =>
                      setHyperparameters({ ...hyperparameters, maxFeatures: e.target.value })
                    }
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-500/50 cursor-pointer"
                  >
                    <option value="sqrt">sqrt (default)</option>
                    <option value="log2">log2</option>
                    <option value="all">all features</option>
                  </select>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Anomaly Threshold Cutoff</span>
                  <span className="text-cyan-400 font-bold">{hyperparameters.threshold}</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="0.95"
                  step="0.05"
                  value={hyperparameters.threshold}
                  onChange={(e) =>
                    setHyperparameters({ ...hyperparameters, threshold: parseFloat(e.target.value) })
                  }
                  className="w-full accent-cyan-400 bg-slate-800 cursor-pointer"
                />
                <span className="text-[10px] text-slate-400">Ensemble consensus threshold required to flag malicious BSM</span>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <Button
                  variant="primary"
                  className="w-full"
                  icon={Play}
                  loading={isTraining}
                  onClick={startTrainingSimulation}
                >
                  {isTraining ? 'Constructing Random Forest Ensemble...' : 'Start Model Training Simulation'}
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Right 7 Cols: Live Training & Tree Construction Progression */}
        <div className="lg:col-span-7">
          <Card
            title="Ensemble Convergence & Out-of-Bag (OOB) Curve"
            subtitle="Validation accuracy and Out-of-Bag error as decision trees are added to the forest"
            headerAction={
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-cyan-400 font-bold">
                  {isTraining ? `Constructing Tree ${currentTrees} / ${hyperparameters.nEstimators}` : `${hyperparameters.nEstimators} Trees Converged`}
                </span>
                {isTraining && (
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                )}
              </div>
            }
          >
            {/* Training Progress Bar */}
            {isTraining && (
              <div className="mb-4 p-3 rounded-xl border border-cyan-500/30 bg-cyan-950/20 font-mono text-xs">
                <div className="flex justify-between text-cyan-300 mb-1">
                  <span>Bagging Bootstrap Sample Step {currentEpoch} of 30...</span>
                  <span className="font-bold">{trainingProgress}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-cyan-400 transition-all duration-200"
                    style={{ width: `${trainingProgress}%` }}
                  />
                </div>
              </div>
            )}

            <TrainingLossChart currentEpoch={isTraining ? currentEpoch : 30} height={260} />
          </Card>
        </div>
      </div>

      {/* Row 3: Decision Tree Visualizer & Ensemble Anatomy */}
      <Card
        title="Random Forest Decision Tree Architecture & Splitting Logic"
        subtitle="Visual inspection of individual decision trees within the 200-estimator ensemble"
        headerAction={
          <Badge variant="PURPLE">INTERACTIVE TREE INSPECTION</Badge>
        }
      >
        <RandomForestTreeDiagram />
      </Card>

      {/* Row 4: Comprehensive Model Evaluation Suite */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 6 Cols: Confusion Matrix & Classification Report */}
        <div className="lg:col-span-6 space-y-4">
          <Card
            title="Confusion Matrix & Classification Metrics"
            subtitle="Validation on 1,482,920 test V2X safety frames (VeReMi Extension)"
            headerAction={
              <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800 text-xs font-mono">
                <button
                  onClick={() => setActiveEvalTab('confusion')}
                  className={`px-2 py-0.5 rounded text-[10px] ${activeEvalTab === 'confusion'
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                    }`}
                >
                  2x2 Matrix
                </button>
                <button
                  onClick={() => setActiveEvalTab('report')}
                  className={`px-2 py-0.5 rounded text-[10px] ${activeEvalTab === 'report'
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                    }`}
                >
                  Per-Class Report
                </button>
              </div>
            }
          >
            {activeEvalTab === 'confusion' ? (
              <ConfusionMatrix />
            ) : (
              <div className="overflow-x-auto font-mono text-xs">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-cyber-border text-slate-400 text-[10px] uppercase">
                      <th className="py-2.5 px-3">Class</th>
                      <th className="py-2.5 px-3">Precision</th>
                      <th className="py-2.5 px-3">Recall</th>
                      <th className="py-2.5 px-3">F1-Score</th>
                      <th className="py-2.5 px-3 text-right">Support</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {CLASSIFICATION_REPORT.map((row) => (
                      <tr key={row.class} className="hover:bg-slate-800/30">
                        <td className="py-2 px-3 font-bold text-white">{row.class}</td>
                        <td className="py-2 px-3 text-emerald-400">{(row.precision * 100).toFixed(1)}%</td>
                        <td className="py-2 px-3 text-cyan-400">{(row.recall * 100).toFixed(1)}%</td>
                        <td className="py-2 px-3 text-purple-400 font-bold">{(row.f1 * 100).toFixed(1)}%</td>
                        <td className="py-2 px-3 text-right text-slate-400">{row.support.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        </div>

        {/* Right 6 Cols: ROC Curve & Feature Importance */}
        <div className="lg:col-span-6 space-y-4">
          <Card
            title="ROC Curve & Gini Feature Importance"
            subtitle="Discrimination threshold performance and feature contribution"
            headerAction={
              <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800 text-xs font-mono">
                <button
                  onClick={() => setActiveEvalTab('roc')}
                  className={`px-2 py-0.5 rounded text-[10px] ${activeEvalTab === 'roc'
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                    }`}
                >
                  ROC Curve
                </button>
                <button
                  onClick={() => setActiveEvalTab('features')}
                  className={`px-2 py-0.5 rounded text-[10px] ${activeEvalTab === 'features'
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                    }`}
                >
                  Feature Weights
                </button>
              </div>
            }
          >
            {activeEvalTab === 'features' ? (
              <div>
                <FeatureImportanceBar height={240} />
                <p className="mt-2 text-[10px] font-mono text-slate-400 border-t border-slate-800 pt-2">
                  Gini Impurity Reduction: Kinematic Spatial Delta and Instantaneous Accel contribute 59.0% to Random Forest branch splits.
                </p>
              </div>
            ) : (
              <div>
                <ROCCurveChart height={240} />
                <div className="mt-2 flex items-center justify-between text-[11px] font-mono border-t border-slate-800 pt-2">
                  <span className="text-slate-400">Area Under Curve (AUC-ROC):</span>
                  <span className="text-cyan-400 font-bold">0.994 (VeReMi Extension)</span>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ModelTraining;
