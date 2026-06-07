import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  FileCode, 
  Monitor, 
  Smartphone, 
  Terminal, 
  Play, 
  RotateCcw, 
  Sparkles, 
  Lock,
  Cpu,
  ExternalLink,
  Flame,
  Globe,
  Settings
} from "lucide-react";

export default function AIStudioConsole() {
  const [activeFile, setActiveFile] = useState<"ts" | "kt" | "xml">("ts");
  const [previewMode, setPreviewMode] = useState<"web" | "app">("web");
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(100);
  const [promptText, setPromptText] = useState(
    "Generate a high-performance interactive map explorer for historical coordinates."
  );
  const [generatedCount, setGeneratedCount] = useState(24);

  // Simulated codebases
  const codeTemplates = {
    ts: `// src/App.tsx - React Web Client
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';

export default function TelemetryDashboard() {
  const [metrics, setMetrics] = useState({ latency: 12, uptime: 99.99 });
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  return (
    <div className="p-8 bg-zinc-950 text-white min-h-screen font-sans border border-rose-500/20">
      <div className="flex justify-between border-b pb-4 border-zinc-800">
        <h1 className="text-xl tracking-wider font-bold">STELLA_DASHBOARD</h1>
        <span className="text-emerald-400 font-mono">● LIVE</span>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-zinc-900 p-4 rounded border border-zinc-800">
          <span className="text-[10px] text-zinc-500 font-mono">LATENCY</span>
          <p className="text-3xl font-display font-bold font-mono">{metrics.latency} ms</p>
        </div>
        <div className="bg-zinc-900 p-4 rounded border border-zinc-800">
          <span className="text-[10px] text-zinc-500 font-mono">SYS_STATUS</span>
          <p className="text-3xl font-display font-bold font-mono text-emerald-400">ACTIVE</p>
        </div>
      </div>
    </div>
  );
 }`,
    kt: `// app/src/main/java/com/stella/app/MainActivity.kt - Android SDK
package com.stella.app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            StellaMaterialTheme {
                Surface(modifier = Modifier.fillMaxSize()) {
                    TelemetryScreen()
                }
            }
        }
    }
}

@Composable
fun TelemetryScreen() {
    Column(modifier = Modifier.padding(16.dp)) {
        Text("STELLA NATIVE MOBILE", style = MaterialTheme.typography.titleMedium)
        Button(onClick = { /* Trigger AI Sync */ }) {
            Text("Launch API Core")
        }
    }
}`,
    xml: `<!-- app/src/main/AndroidManifest.xml -->
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.stella.app">

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:theme="@style/Theme.Stella">
        
        <activity
            android:name=".MainActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>`
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setProgress(0);
    const existingPrompt = promptText;
    
    // Auto toggle preview types based on words in prompt
    if (existingPrompt.toLowerCase().includes("app") || existingPrompt.toLowerCase().includes("android") || existingPrompt.toLowerCase().includes("mobile")) {
      setPreviewMode("app");
    } else {
      setPreviewMode("web");
    }
  };

  useEffect(() => {
    if (isGenerating) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsGenerating(false);
            setGeneratedCount((c) => c + 1);
            return 100;
          }
          return prev + 5;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isGenerating]);

  // Pre-configured list of sample prompts for the users
  const samplePrompts = [
    "Generate a high-performance interactive map explorer for historical coordinates.",
    "Build a native Android application to capture coordinate telemetry.",
    "Design a responsive landing page layout utilizing brutalist UI modules."
  ];

  return (
    <div className="relative border-2 border-nt-black bg-nt-white rounded-xl shadow-lg overflow-hidden font-mono text-xs text-nt-black">
      {/* Console Header */}
      <div className="bg-nt-black text-nt-white px-4 py-3 flex items-center justify-between border-b border-nt-light-gray select-none">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-nt-red animate-led-blink" />
          <span className="text-[10px] tracking-wider font-bold">GOOGLE_AI_STUDIO // STELLA_ENGINE</span>
        </div>
        <div className="flex items-center gap-3 text-[9px] text-nt-gray">
          <span>COMPILES: {generatedCount}</span>
          <span>•</span>
          <span>STATUS: ONLINE</span>
        </div>
      </div>

      {/* Main Workspace split */}
      <div className="grid grid-cols-1 md:grid-cols-12 min-h-[460px] bg-nt-bg">
        {/* Left Sidebar: File Tree */}
        <div className="md:col-span-3 border-r border-nt-light-gray bg-nt-white p-3 flex flex-col justify-between">
          <div>
            <span className="text-[9px] text-nt-gray uppercase tracking-widest block mb-3">// WORKSPACE_FILES</span>
            
            <div className="space-y-1.5">
              <button 
                onClick={() => { setActiveFile("ts"); setPreviewMode("web"); }}
                className={`w-full flex items-center gap-2 px-2.5 py-2 rounded text-left transition-colors ${activeFile === "ts" ? "bg-nt-black text-nt-white font-bold" : "hover:bg-nt-bg text-nt-charcoal"}`}
              >
                <FileCode size={14} className={activeFile === "ts" ? "text-nt-red" : "text-nt-gray"} />
                <span className="truncate">App.tsx</span>
              </button>
              
              <button 
                onClick={() => { setActiveFile("kt"); setPreviewMode("app"); }}
                className={`w-full flex items-center gap-2 px-2.5 py-2 rounded text-left transition-colors ${activeFile === "kt" ? "bg-nt-black text-nt-white font-bold" : "hover:bg-nt-bg text-nt-charcoal"}`}
              >
                <FileCode size={14} className={activeFile === "kt" ? "text-nt-red" : "text-nt-gray"} />
                <span className="truncate">MainActivity.kt</span>
              </button>
              
              <button 
                onClick={() => { setActiveFile("xml"); setPreviewMode("app"); }}
                className={`w-full flex items-center gap-2 px-2.5 py-2 rounded text-left transition-colors ${activeFile === "xml" ? "bg-nt-black text-nt-white font-bold" : "hover:bg-nt-bg text-nt-charcoal"}`}
              >
                <Terminal size={14} className={activeFile === "xml" ? "text-nt-red" : "text-nt-gray"} />
                <span className="truncate">Manifest.xml</span>
              </button>
            </div>
          </div>

          {/* Quick controls info */}
          <div className="border-t border-nt-light-gray pt-3 mt-4 text-[9px] text-nt-gray space-y-1 select-none">
            <div className="flex justify-between">
              <span>SDK Version</span>
              <span>genai-v1.2</span>
            </div>
            <div className="flex justify-between">
              <span>Runtime</span>
              <span>Cloud Run</span>
            </div>
          </div>
        </div>

        {/* Middle Area: Interactive Code Editor */}
        <div className="md:col-span-5 flex flex-col justify-between bg-nt-black text-nt-white border-r border-nt-light-gray">
          {/* Editor Header / Tabs */}
          <div className="bg-nt-dark border-b border-nt-charcoal px-3 py-2 flex items-center gap-2 select-none justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-nt-red" />
              <div className="w-2 h-2 rounded-full bg-nt-gray/40" />
              <div className="w-2 h-2 rounded-full bg-nt-gray/20" />
            </div>
            <span className="text-[9px] text-nt-gray tracking-wider uppercase">Active_Buffer: editor_window</span>
          </div>

          {/* Code text block */}
          <div className="flex-1 p-3.5 overflow-auto max-h-[300px] font-mono text-[10px] whitespace-pre select-none text-zinc-300 leading-normal scrollbar-thin">
            {codeTemplates[activeFile]}
          </div>

          {/* Prompt Engine Interface */}
          <div className="bg-nt-dark border-t border-nt-charcoal p-3 space-y-2">
            <div className="flex items-center justify-between text-[8px] text-nt-gray tracking-wider uppercase select-none">
              <span>System Prompt Loop</span>
              <span className="text-nt-red font-bold">ACTIEVE_TRIGGER</span>
            </div>
            
            <div className="flex gap-2">
              <input 
                type="text" 
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                disabled={isGenerating}
                placeholder="Give instructions to the Gemini API..." 
                className="flex-1 bg-nt-black border border-nt-charcoal rounded px-3 py-2 text-[10px] text-nt-white focus:outline-none focus:border-nt-red tracking-wide normal-case disabled:opacity-50"
              />
              <button 
                onClick={handleGenerate}
                disabled={isGenerating}
                className="bg-nt-white hover:bg-nt-red text-nt-black hover:text-nt-white px-3 rounded flex items-center justify-center transition-colors disabled:opacity-50 font-bold tracking-widest uppercase text-[9px]"
              >
                {isGenerating ? "BUILDING..." : <Sparkles size={14} />}
              </button>
            </div>

            {/* Simulated progress slider bar */}
            {isGenerating && (
              <div className="w-full bg-nt-black h-1 rounded overflow-hidden mt-1">
                <motion.div 
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  className="bg-nt-red h-full"
                />
              </div>
            )}
          </div>
        </div>

        {/* Right Area: Simulated App / Site Live View */}
        <div className="md:col-span-4 p-4 flex flex-col justify-between bg-nt-bg select-none">
          <div>
            {/* View Mode Switches */}
            <div className="flex justify-between items-center mb-4 border-b border-nt-light-gray pb-2.5">
              <span className="text-[10px] text-nt-gray uppercase tracking-widest font-bold">// LOCAL_OUTPUT</span>
              <div className="flex gap-1.5 bg-nt-white p-0.5 rounded border border-nt-light-gray">
                <button 
                  onClick={() => setPreviewMode("web")}
                  className={`p-1 rounded transition-colors ${previewMode === "web" ? "bg-nt-black text-nt-white" : "text-nt-gray hover:text-nt-black"}`}
                  title="Web View"
                >
                  <Monitor size={12} />
                </button>
                <button 
                  onClick={() => setPreviewMode("app")}
                  className={`p-1 rounded transition-colors ${previewMode === "app" ? "bg-nt-black text-nt-white" : "text-nt-gray hover:text-nt-black"}`}
                  title="Mobile Android App View"
                >
                  <Smartphone size={12} />
                </button>
              </div>
            </div>

            {/* Output device wrapper screens */}
            <div className="flex items-center justify-center min-h-[240px]">
              <AnimatePresence mode="wait">
                {previewMode === "web" ? (
                  /* Web Browser Wireframe Mock */
                  <motion.div 
                    key="web-preview"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="w-full bg-nt-white border border-nt-light-gray rounded-md overflow-hidden shadow-sm"
                  >
                    {/* Top Browser bar mock */}
                    <div className="bg-nt-bg border-b border-nt-light-gray px-3 py-1.5 flex items-center justify-between">
                      <div className="flex gap-1.5">
                        <span className="w-1.5 h-1.5 bg-red-400 rounded-full inline-block" />
                        <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full inline-block" />
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full inline-block" />
                      </div>
                      <span className="text-[8px] text-nt-gray truncate max-w-[120px]">https://stella-map-explorer.dev</span>
                      <RotateCcw size={8} className="text-nt-gray" />
                    </div>
                    {/* Simulated Content inside web */}
                    <div className="p-3.5 space-y-3 font-sans text-left">
                      <p className="text-[10px] font-bold text-nt-black uppercase tracking-wider">// LOCAL TELEMETRY MAP</p>
                      
                      {/* Visual grid simulating map elements */}
                      <div className="bg-nt-bg border border-nt-light-gray p-2 rounded relative flex flex-col justify-between overflow-hidden">
                        <div className="grid grid-cols-4 gap-1.5 text-center font-mono opacity-80 mb-4 text-[8px] text-nt-gray">
                          <span className="border border-zinc-200 py-1 bg-white">10.02</span>
                          <span className="border border-zinc-200 py-1 bg-white">14.92</span>
                          <span className="border border-zinc-200 py-1 bg-white">88.54</span>
                          <span className="border border-zinc-200 py-1 bg-zinc-100 font-bold border-dashed border-zinc-400">92/0</span>
                        </div>
                        
                        {/* Interactive dynamic slider simulation */}
                        <div className="h-16 w-full rounded relative overflow-hidden bg-zinc-950 border border-zinc-800 flex flex-col justify-end p-2 select-none">
                          <div className="absolute inset-0 opacity-40 flex items-center justify-center">
                            {/* Visual grid lines */}
                            <div className="w-full h-px bg-zinc-800" />
                            <div className="h-full w-px bg-zinc-800 absolute" />
                            <div className="w-8 h-8 rounded-full border border-zinc-800 absolute" />
                          </div>
                          
                          <div className="flex justify-between items-center relative z-10 text-[8px] font-mono text-emerald-400 leading-none">
                            <span>GRID_MAP_ACTIVE</span>
                            <span className="animate-led-blink text-rose-500 font-bold">RECORD</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between text-[8px] font-mono text-zinc-400">
                        <span>LATITUDE: 52° 07' 57" N</span>
                        <span>LONGITUDE: 05° 17' 28" E</span>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  /* Mobile Android Handset Mock */
                  <motion.div 
                    key="app-preview"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="w-[160px] bg-zinc-900 border-4 border-zinc-950 rounded-2xl overflow-hidden shadow-md relative pb-2.5 antialiased"
                  >
                    {/* Top notch mockup */}
                    <div className="w-16 h-4 bg-zinc-950 mx-auto rounded-b-md mb-2 flex items-center justify-center">
                      <span className="w-1.5 h-1.5 bg-zinc-800 rounded-full" />
                    </div>
                    {/* Handset screen internals */}
                    <div className="px-2.5 font-sans text-left">
                      <div className="flex justify-between text-[8px] font-bold text-zinc-500 mb-2 font-mono">
                        <span>STELLA_OS</span>
                        <span>08:14</span>
                      </div>
                      
                      <div className="bg-zinc-800/80 p-2 rounded-lg border border-zinc-700 space-y-2 mb-2">
                        <span className="text-[7px] text-zinc-400 font-mono block tracking-widest uppercase mb-1">LOCALIZED CONTROLLER</span>
                        <div className="h-10 rounded bg-zinc-950 flex items-center justify-center text-zinc-400 text-[9px] font-mono border border-zinc-800 font-bold">
                          [ SYNC_ACTIVE ]
                        </div>
                        <button className="w-full bg-rose-500 hover:bg-rose-600 text-[8px] font-bold tracking-widest text-white py-1 rounded text-center transition-colors font-mono uppercase">
                          IMPLEMENT CORE
                        </button>
                      </div>

                      <div className="bg-zinc-800/40 p-2 rounded border border-zinc-700/50 space-y-1">
                        <span className="text-[6px] text-zinc-500 font-mono block">DEVICE_TELEMETRY</span>
                        <p className="text-[9px] font-bold text-zinc-300 font-mono">BATTERY VOLTAGE 98%</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="text-[9px] text-nt-gray/80 pt-3 border-t border-nt-light-gray flex justify-between select-none">
            <span>SAVED_PROMPTS: {samplePrompts.length}</span>
            <span>GOOGLE_CLOUD: STABLE</span>
          </div>
        </div>
      </div>

      {/* Quick Prompts Helper */}
      <div className="bg-nt-bg p-3 border-t border-nt-light-gray block select-none">
        <span className="text-[9px] text-nt-gray uppercase tracking-widest block mb-1.5">// REGISTERED PRESET SHORTCUTS</span>
        <div className="flex flex-wrap gap-1.5">
          {samplePrompts.map((p, i) => (
            <button 
              key={i} 
              onClick={() => setPromptText(p)}
              className="bg-nt-white border border-nt-light-gray px-2 py-1 rounded hover:bg-nt-black hover:text-nt-white transition-colors text-[9px] text-nt-charcoal truncate max-w-sm"
              title={p}
            >
              Pro_{i+1}: {p}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
