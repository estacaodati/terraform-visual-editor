import React from 'react';
import { Box, Database, Server, Globe, HardDrive, GripVertical, Folder, Hexagon } from 'lucide-react';
import { useEditorStore } from '../store/editorStore';
import { LocalModuleImporter } from './LocalModuleImporter';

const iconMap = {
    compute: Server,
    network: Globe,
    storage: HardDrive,
    database: Database,
    local: Folder,
};

export const Sidebar = () => {
    const availableModules = useEditorStore((state) => state.availableModules);

    const onDragStart = (event: React.DragEvent, moduleType: string) => {
        event.dataTransfer.setData('application/reactflow', moduleType);
        event.dataTransfer.effectAllowed = 'move';
    };

    // Group modules by provider
    const providers = Array.from(new Set(availableModules.map(m => m.provider)));

    return (
        <aside className="w-64 bg-slate-50 border-r border-slate-200 flex flex-col h-full font-sans">
            <div className="p-4 border-b border-slate-200 bg-white">
                <h2 className="font-bold text-slate-800 flex items-center gap-2 text-xl tracking-tight">
                    <Hexagon className="w-6 h-6 text-terraform-600 fill-terraform-100" />
                    <span className="bg-gradient-to-r from-terraform-700 to-terraform-500 bg-clip-text text-transparent">
                        Terraform Visual
                    </span>
                </h2>
                <p className="text-xs text-slate-500 mt-1 pl-8">Infrastructure as Code Editor</p>
            </div>

            <LocalModuleImporter />

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {providers.map((provider) => (
                    <div key={provider}>
                        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                            {provider}
                        </h3>
                        <div className="space-y-2">
                            {availableModules.filter(m => m.provider === provider).map((module) => {
                                const Icon = iconMap[module.category as keyof typeof iconMap] || Box;
                                return (
                                    <div
                                        key={module.type}
                                        onDragStart={(event) => onDragStart(event, module.type)}
                                        draggable
                                        className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-lg cursor-grab hover:border-terraform-400 hover:shadow-md hover:shadow-terraform-100 transition-all active:cursor-grabbing"
                                    >
                                        <GripVertical className="w-4 h-4 text-slate-300" />
                                        <Icon className="w-4 h-4 text-slate-600" />
                                        <div className="flex-1">
                                            <div className="text-sm font-medium text-slate-700">{module.label}</div>
                                            <div className="text-[10px] text-slate-400 font-mono">{module.type}</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </aside>
    );
};
