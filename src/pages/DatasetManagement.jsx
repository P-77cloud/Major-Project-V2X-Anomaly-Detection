import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  Search,
  Filter,
  Layers,
  Database,
  ArrowRight,
  RefreshCw,
  Info,
  Download,
  FileCheck,
  Award
} from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import DemonstrationBanner from '../components/common/DemonstrationBanner';
import { useSentinel } from '../context/SentinelContext';
import { BENCHMARK_DATASETS, DATASET_SCHEMA_INFO } from '../data/datasetSamples';

const DatasetManagement = () => {
  const {
    selectedDataset,
    setSelectedDataset,
    datasetRows,
    uploadProgress,
    isUploading,
    uploadSuccessMessage,
    simulateFileUpload,
  } = useSentinel();

  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('ALL'); // 'ALL' | 'NORMAL' | 'ANOMALOUS'
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 6;

  // Handle Drag & Drop
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      simulateFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      simulateFileUpload(e.target.files[0]);
    }
  };

  // Filtered dataset rows
  const filteredRows = datasetRows.filter((row) => {
    const matchesSearch =
      row.senderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.attackType.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterType === 'NORMAL') return matchesSearch && row.label === 'Normal';
    if (filterType === 'ANOMALOUS') return matchesSearch && row.label === 'Anomalous';
    return matchesSearch;
  });

  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);
  const paginatedRows = filteredRows.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight font-mono">
              DATASET INGESTION & MANAGEMENT
            </h1>
            <Badge variant="PURPLE">VEREMI EXTENSION READY</Badge>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Ingest, parse, and validate SAE J2735 Basic Safety Message (BSM) telemetry and VeReMi Extension ground-truth benchmarks.
          </p>
        </div>

        {/* Quick Benchmark Preset Selectors */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-slate-400 font-mono hidden md:inline">
            Load Benchmark:
          </span>
          {BENCHMARK_DATASETS.map((ds) => (
            <button
              key={ds.id}
              onClick={() => setSelectedDataset(ds)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all border ${selectedDataset.id === ds.id
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-sm shadow-cyan-950 font-bold'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                }`}
            >
              {ds.id === 'veremi-extension' ? '★ VeReMi Extension' : ds.id === 'veremi-base' ? 'VeReMi Base 16' : ds.id === 'usdot-cv-pilot' ? 'USDOT Pilot' : 'SUMO C-V2X'}
            </button>
          ))}
        </div>
      </div>

      {/* Demonstration Banner */}
      <DemonstrationBanner
        title="Phase 1 Dataset Management & Ingestion Prototype"
        message="This interface simulates the ingestion of the VeReMi Extension dataset for the November 14 college review. In Phase 2, this module will directly feed your full multi-gigabyte VeReMi Extension dataset into Python (Pandas/Polars) to train the primary Random Forest Classifier."
      />

      {/* Row 1: Drag & Drop Zone and Dataset Information Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Upload Zone (7 Cols) */}
        <div className="lg:col-span-7">
          <Card
            title="Upload V2X Telemetry CSV / VeReMi Extension Data"
            subtitle="Drag & drop CSV files containing SAE J2735 kinematic telemetry"
            glow={isDragging}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".csv"
              className="hidden"
            />

            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 ${isDragging
                  ? 'border-cyan-400 bg-cyan-950/30 shadow-glow-cyan'
                  : 'border-slate-700/80 bg-slate-900/30 hover:border-cyan-500/50 hover:bg-slate-900/60'
                }`}
            >
              <div className="flex flex-col items-center justify-center space-y-3">
                <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                  <UploadCloud className="w-8 h-8 animate-bounce" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">
                    {isDragging ? 'Drop CSV file to initiate ingestion' : 'Drag & drop your VeReMi Extension CSV here'}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 max-w-sm">
                    Supports VeReMi Extension, baseline VeReMi, LuST traces, and raw SAE J2735 BSM streams. Maximum simulated size 500 MB.
                  </p>
                </div>

                <div className="pt-2">
                  <Button
                    variant="primary"
                    size="sm"
                    icon={FileSpreadsheet}
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                  >
                    Browse Files
                  </Button>
                </div>
              </div>

              {/* Upload Progress Simulation */}
              {isUploading && (
                <div className="mt-6 pt-4 border-t border-slate-800 text-left font-mono">
                  <div className="flex items-center justify-between text-xs text-cyan-300 mb-1.5">
                    <span className="flex items-center gap-1.5">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      Parsing Kinematics & Formatting for Random Forest...
                    </span>
                    <span className="font-bold">{uploadProgress}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-200"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {uploadSuccessMessage && !isUploading && (
                <div className="mt-4 p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{uploadSuccessMessage}</span>
                </div>
              )}
            </div>

            <div className="mt-4 flex items-center justify-between text-xs font-mono text-slate-400 px-1">
              <span>Required: Timestamp, SenderID, PosX, PosY, Speed, Heading, Accel, RSSI</span>
              <span className="text-cyan-400">SAE J2735 Validated</span>
            </div>
          </Card>
        </div>

        {/* Dataset Metadata Information Card (5 Cols) */}
        <div className="lg:col-span-5">
          <Card
            title="Active Dataset Summary"
            subtitle="Benchmark properties and target misbehavior distribution"
            headerAction={
              selectedDataset.id === 'veremi-extension' ? (
                <Badge variant="PURPLE">TARGET BENCHMARK</Badge>
              ) : (
                <Badge variant="SUCCESS">SCHEMA COMPLIANT</Badge>
              )
            }
          >
            <div className="space-y-4 font-mono text-xs">
              <div className="p-3.5 rounded-xl border border-cyan-500/20 bg-cyan-950/20">
                <span className="text-[10px] text-cyan-400 uppercase font-bold block mb-1">
                  BENCHMARK IDENTIFIER
                </span>
                <h4 className="text-sm font-bold text-white">
                  {selectedDataset.name}
                </h4>
                <p className="text-[11px] text-slate-300 mt-1 font-sans">
                  {selectedDataset.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/50">
                  <span className="text-[10px] text-slate-400 block">FILE NAME</span>
                  <span className="text-white font-bold truncate block">
                    {selectedDataset.filename}
                  </span>
                </div>
                <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/50">
                  <span className="text-[10px] text-slate-400 block">FILE SIZE</span>
                  <span className="text-cyan-400 font-bold">
                    {selectedDataset.size}
                  </span>
                </div>
                <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/50">
                  <span className="text-[10px] text-slate-400 block">TOTAL RECORDS</span>
                  <span className="text-white font-bold">
                    {selectedDataset.records.toLocaleString()} rows
                  </span>
                </div>
                <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/50">
                  <span className="text-[10px] text-slate-400 block">FEATURES</span>
                  <span className="text-emerald-400 font-bold">
                    {selectedDataset.features} columns
                  </span>
                </div>
                <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/50">
                  <span className="text-[10px] text-slate-400 block">ATTACK FRAMES</span>
                  <span className="text-red-400 font-bold">
                    {selectedDataset.anomalies.toLocaleString()} ({selectedDataset.anomalyRate})
                  </span>
                </div>
                <div className="p-3 rounded-lg border border-slate-800 bg-slate-900/50">
                  <span className="text-[10px] text-slate-400 block">NULL / MISSING</span>
                  <span className="text-emerald-400 font-bold">
                    {selectedDataset.missingValues} (0.0%)
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl border border-slate-800 bg-slate-900/60 text-[11px] text-slate-400">
                <span className="text-slate-300 font-bold block mb-0.5">Citation / Source:</span>
                <span>{selectedDataset.source}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Row 2: Dataset Preview Table */}
      <Card
        title="Dataset Telemetry Preview"
        subtitle="Sample kinematic rows demonstrating normal and injected vehicular misbehaviors"
        headerAction={
          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search ID or attack..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-1 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 w-44 sm:w-56"
              />
            </div>

            {/* Filter Buttons */}
            <div className="hidden sm:flex items-center gap-1 bg-slate-900 p-0.5 rounded-lg border border-slate-800 text-xs font-mono">
              {['ALL', 'NORMAL', 'ANOMALOUS'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-2 py-0.5 rounded text-[11px] transition-colors ${filterType === type
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                    }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        }
        noPadding
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-cyber-border bg-slate-900/70 text-slate-400 text-[11px] uppercase tracking-wider">
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Timestamp (UTC ms)</th>
                <th className="py-3 px-4">Sender ID</th>
                <th className="py-3 px-4">Pos X (m)</th>
                <th className="py-3 px-4">Pos Y (m)</th>
                <th className="py-3 px-4">Speed (km/h)</th>
                <th className="py-3 px-4">Heading</th>
                <th className="py-3 px-4">Accel X (m/s²)</th>
                <th className="py-3 px-4">RSSI (dBm)</th>
                <th className="py-3 px-4">Freq (Hz)</th>
                <th className="py-3 px-4">Label</th>
                <th className="py-3 px-4">VeReMi Attack</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {paginatedRows.map((row) => (
                <tr
                  key={row.id}
                  className={`hover:bg-slate-800/40 transition-colors ${row.label === 'Anomalous' ? 'bg-red-950/10' : ''
                    }`}
                >
                  <td className="py-3 px-4 text-slate-400">{row.id}</td>
                  <td className="py-3 px-4 text-slate-300 font-mono-numbers">
                    {row.timestamp}
                  </td>
                  <td className="py-3 px-4 font-bold text-cyan-300">
                    {row.senderId}
                  </td>
                  <td className="py-3 px-4 text-slate-200 font-mono-numbers">
                    {row.posX}
                  </td>
                  <td className="py-3 px-4 text-slate-200 font-mono-numbers">
                    {row.posY}
                  </td>
                  <td className="py-3 px-4 text-white font-mono-numbers font-medium">
                    {row.speedKmh}
                  </td>
                  <td className="py-3 px-4 text-slate-300 font-mono-numbers">
                    {row.headingDeg}°
                  </td>
                  <td className={`py-3 px-4 font-mono-numbers ${Math.abs(row.accelX) > 10 ? 'text-red-400 font-bold' : 'text-slate-300'
                    }`}>
                    {row.accelX}
                  </td>
                  <td className="py-3 px-4 text-slate-400 font-mono-numbers">
                    {row.rssiDbm}
                  </td>
                  <td className={`py-3 px-4 font-mono-numbers ${row.freqHz > 20 ? 'text-red-400 font-bold' : 'text-slate-300'
                    }`}>
                    {row.freqHz}
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant={row.label === 'Normal' ? 'SUCCESS' : 'DANGER'}>
                      {row.label}
                    </Badge>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-xs font-medium ${row.attackType === 'None' ? 'text-slate-400' : 'text-red-400 font-bold'
                      }`}>
                      {row.attackType}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Pagination */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-slate-800 bg-slate-900/40 text-xs font-mono text-slate-400">
          <span>
            Showing {(currentPage - 1) * rowsPerPage + 1} to{' '}
            {Math.min(currentPage * rowsPerPage, filteredRows.length)} of {filteredRows.length} sample records
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-2.5 py-1 rounded border border-slate-800 hover:bg-slate-800 disabled:opacity-40"
            >
              Previous
            </button>
            <span className="text-white px-2">
              Page {currentPage} of {totalPages || 1}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage >= totalPages}
              className="px-2.5 py-1 rounded border border-slate-800 hover:bg-slate-800 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </Card>

      {/* Row 3: Column Information & Missing-Value Summary */}
      <Card
        title="Column Schema & Missing-Value Analysis"
        subtitle="Verification of standard SAE J2735 message field data types and completeness"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-cyber-border text-slate-400 text-[11px] uppercase tracking-wider">
                <th className="py-2.5 px-3">Column Name</th>
                <th className="py-2.5 px-3">Data Type</th>
                <th className="py-2.5 px-3">Field Description</th>
                <th className="py-2.5 px-3">Missing Values</th>
                <th className="py-2.5 px-3 text-right">Integrity Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {DATASET_SCHEMA_INFO.map((col) => (
                <tr key={col.column} className="hover:bg-slate-800/30">
                  <td className="py-2.5 px-3 font-bold text-cyan-300">
                    {col.column}
                  </td>
                  <td className="py-2.5 px-3 text-slate-300">
                    {col.type}
                  </td>
                  <td className="py-2.5 px-3 text-slate-400 font-sans">
                    {col.description}
                  </td>
                  <td className="py-2.5 px-3 text-emerald-400">
                    {col.nullCount} nulls (0.0%)
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      {col.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default DatasetManagement;
