import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { EditorCanvas } from './EditorCanvas';
import { PropertiesPanel } from './PropertiesPanel';
import { useEditorStore } from '../store/editorStore';
import { generateHCL } from '../utils/hclGenerator';
import { exportProject } from '../utils/exportUtils';
import { Code, Download, Layers } from 'lucide-react';

export const Layout = () => {
    const { nodes, edges } = useEditorStore();
    const [showCode, setShowCode] = useState(false);
    const [generatedCode, setGeneratedCode] = useState('');

    const handleGenerate = () => {
        const code = generateHCL(nodes, edges);
        setGeneratedCode(code);
        setShowCode(true);
    };

    const handleExport = () => {
        exportProject(nodes, edges);
    };

    return (
        <div className="flex flex-col h-screen bg-slate-100 overflow-hidden font-sans text-slate-900">
            {/* Header */}
            <header className="h-14 bg-slate-900 text-white flex items-center justify-between px-4 shadow-md z-20">
                <div className="flex items-center gap-2">
                    <Layers className="w-6 h-6 text-blue-400" />
                    <h1 className="font-bold text-lg tracking-tight">Terraform<span className="text-blue-400 font-light">Visual</span> - By Estação da TI</h1>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={handleGenerate}
                        className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 rounded text-sm font-medium transition-colors"
                    >
                        <Code className="w-4 h-4" />
                        Preview HCL
                    </button>
                    <button
                        onClick={handleExport}
                        className="flex items-center gap-2 px-3 py-1.5 bg-slate-700 hover:bg-slate-600 rounded text-sm font-medium transition-colors"
                    >
                        <Download className="w-4 h-4" />
                        Export
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex-1 flex overflow-hidden">
                <Sidebar />

                <main className="flex-1 relative">
                    <EditorCanvas />

                    {/* Code Preview Overlay */}
                    {showCode && (
                        <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-10">
                            <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl h-full max-h-[80vh] flex flex-col overflow-hidden">
                                <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-slate-50">
                                    <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                        <Code className="w-5 h-5 text-blue-600" />
                                        main.tf
                                    </h3>
                                    <button
                                        onClick={() => setShowCode(false)}
                                        className="text-slate-500 hover:text-slate-800"
                                    >
                                        Close
                                    </button>
                                </div>
                                <div className="flex-1 overflow-auto p-4 bg-slate-900">
                                    <pre className="font-mono text-sm text-green-400 whitespace-pre-wrap">
                                        {generatedCode}
                                    </pre>
                                </div>
                            </div>
                        </div>
                    )}
                </main>

                <PropertiesPanel />
            </div>
        </div>
    );
};
