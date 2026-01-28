
import React, { useState } from 'react';
import { generateDesign, editDesign, analyzePrintingIssue } from '../services/gemini';
import { Icons } from '../constants';

const AIDesigner: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [imageSize, setImageSize] = useState('1K');
  const [isGenerating, setIsGenerating] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [editPrompt, setEditPrompt] = useState('');
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt) return;
    setIsGenerating(true);
    try {
      const img = await generateDesign(prompt, { aspectRatio, imageSize });
      setResultImage(img);
    } catch (error) {
      console.error(error);
      alert("Generation failed. Please check your API key.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleEdit = async () => {
    if (!resultImage || !editPrompt) return;
    setIsGenerating(true);
    try {
      const edited = await editDesign(resultImage, editPrompt);
      setResultImage(edited);
      setEditPrompt('');
    } catch (error) {
      console.error(error);
      alert("Edit failed.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAnalyze = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64 = event.target?.result as string;
      setIsGenerating(true);
      try {
        const analysis = await analyzePrintingIssue(base64);
        setAnalysisResult(analysis || "Analysis complete.");
      } catch (error) {
        console.error(error);
        alert("Analysis failed.");
      } finally {
        setIsGenerating(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-6xl mx-auto py-16 px-4 animate-fade-in">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-heading font-bold text-slate-900 mb-4 flex items-center justify-center gap-3">
          <Icons.Sparkles className="text-indigo-600 w-8 h-8" />
          AI Print Design Lab
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Transform your ideas into print-ready masterpieces using our cutting-edge AI engine.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-3xl border shadow-sm space-y-4">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <Icons.Image className="w-5 h-5 text-indigo-600" />
              Generator
            </h3>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Design Prompt</label>
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g. Modern business card for a cafe, minimalist, pastel green theme..."
                className="w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none text-sm h-32"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Ratio</label>
                <select 
                  value={aspectRatio}
                  onChange={(e) => setAspectRatio(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border text-sm outline-none"
                >
                  {['1:1', '2:3', '3:2', '3:4', '4:3', '9:16', '16:9', '21:9'].map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Size</label>
                <select 
                  value={imageSize}
                  onChange={(e) => setImageSize(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border text-sm outline-none"
                >
                  {['1K', '2K', '4K'].map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <button 
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all disabled:bg-slate-300"
            >
              {isGenerating ? "Processing..." : "Generate Design"}
            </button>
          </div>

          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 shadow-sm space-y-4 text-white">
            <h3 className="font-bold flex items-center gap-2">
              <Icons.Printer className="w-5 h-5 text-indigo-400" />
              Printability Analyzer
            </h3>
            <p className="text-xs text-slate-400">Upload your existing design to check for potential printing errors or resolution issues.</p>
            <label className="block w-full py-3 px-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-center cursor-pointer transition-colors text-sm font-medium">
              Upload Design
              <input type="file" className="hidden" accept="image/*" onChange={handleAnalyze} />
            </label>
            {analysisResult && (
              <div className="p-4 bg-white/5 rounded-xl text-xs leading-relaxed text-slate-300 border border-white/5">
                {analysisResult}
              </div>
            )}
          </div>
        </div>

        {/* Workspace */}
        <div className="lg:col-span-2">
          <div className="bg-slate-100 rounded-3xl border-2 border-dashed border-slate-300 min-h-[500px] flex flex-col items-center justify-center p-8 overflow-hidden">
            {isGenerating && !resultImage ? (
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-slate-500 font-medium animate-pulse">Our AI is drafting your masterpiece...</p>
              </div>
            ) : resultImage ? (
              <div className="w-full space-y-6">
                <div className="relative group rounded-2xl overflow-hidden shadow-2xl bg-white p-2">
                  <img src={resultImage} alt="AI Result" className="w-full rounded-xl object-contain max-h-[600px]" />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button className="p-2 bg-white/90 backdrop-blur rounded-lg shadow-lg hover:bg-white transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                    </button>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-4">
                  <h4 className="font-bold text-slate-800">Fine-tune Design</h4>
                  <div className="flex gap-2">
                    <input 
                      value={editPrompt}
                      onChange={(e) => setEditPrompt(e.target.value)}
                      placeholder="e.g. 'Add more blue', 'Make font larger'..."
                      className="flex-1 px-4 py-2 rounded-lg border text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button 
                      onClick={handleEdit}
                      disabled={isGenerating || !editPrompt}
                      className="px-6 py-2 bg-slate-800 text-white font-bold rounded-lg hover:bg-slate-900 transition-colors disabled:bg-slate-300"
                    >
                      Apply Edit
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-slate-400 space-y-4">
                <Icons.Sparkles className="w-16 h-16 mx-auto opacity-20" />
                <p className="font-medium">Enter a prompt to start designing</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIDesigner;
