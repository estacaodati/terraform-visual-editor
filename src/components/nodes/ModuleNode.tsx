import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import type { NodeProps } from 'reactflow';
import type { ModuleNodeData } from '../../store/editorStore';
import { Box, Database, Server, Globe, HardDrive } from 'lucide-react';
import clsx from 'clsx';

const iconMap = {
    compute: Server,
    network: Globe,
    storage: HardDrive,
    database: Database,
    local: Box,
};

const ModuleNode = ({ data, selected }: NodeProps<ModuleNodeData>) => {
    const Icon = iconMap[data.category] || Box;

    return (
        <div
            className={clsx(
                "min-w-[200px] rounded-lg border-2 bg-white shadow-md transition-all",
                selected ? "border-blue-500 shadow-lg ring-2 ring-blue-200" : "border-slate-200 hover:border-slate-300"
            )}
        >
            {/* Header */}
            <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-4 py-2 rounded-t-lg">
                <Icon className="h-4 w-4 text-slate-500" />
                <span className="font-semibold text-slate-700 text-sm">{data.label}</span>
            </div>

            {/* Body */}
            <div className="p-3 flex justify-between gap-4">
                {/* Inputs */}
                <div className="flex flex-col gap-2">
                    {data.inputs.map((input) => (
                        <div key={input} className="relative flex items-center">
                            <Handle
                                type="target"
                                position={Position.Left}
                                id={input}
                                className="!bg-slate-400 !w-3 !h-3 !-left-[19px]"
                            />
                            <span className="text-xs text-slate-600">{input}</span>
                        </div>
                    ))}
                </div>

                {/* Outputs */}
                <div className="flex flex-col gap-2 items-end">
                    {data.outputs.map((output) => (
                        <div key={output} className="relative flex items-center">
                            <span className="text-xs text-slate-600">{output}</span>
                            <Handle
                                type="source"
                                position={Position.Right}
                                id={output}
                                className="!bg-blue-400 !w-3 !h-3 !-right-[19px]"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer / Type info */}
            <div className="px-3 py-1 bg-slate-50 rounded-b-lg border-t border-slate-100">
                <div className="text-[10px] text-slate-400 font-mono">{data.type}</div>
            </div>
        </div>
    );
};

export default memo(ModuleNode);
