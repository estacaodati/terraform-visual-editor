import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import type { NodeProps } from 'reactflow';
import type { ModuleNodeData } from '../../store/editorStore';
import { ArrowRight } from 'lucide-react';
import clsx from 'clsx';
import { useEditorStore } from '../../store/editorStore';

const OutputNode = ({ data, selected, id }: NodeProps<ModuleNodeData>) => {
    const { nodes, edges } = useEditorStore();
    const blockName = data.variables.__block_label__ as string;
    const displayText = blockName && blockName.trim() !== '' 
        ? `Output (${blockName})` 
        : 'Output';

    // Get connected value in real time
    const incomingEdge = edges.find(edge => edge.target === id && edge.targetHandle === 'value');
    let currentValue = data.variables.value as string || '';
    
    if (incomingEdge) {
        const sourceNode = nodes.find(n => n.id === incomingEdge.source);
        if (sourceNode) {
            const sourceName = sourceNode.data.variables.__block_label__ as string || `resource_${sourceNode.id.slice(0, 8)}`;
            currentValue = `${sourceNode.data.type}.${sourceName}.${incomingEdge.sourceHandle || 'id'}`;
        }
    }

    return (
        <div
            className={clsx(
                "min-w-[200px] rounded-lg border-2 bg-white shadow-md transition-all",
                selected ? "border-blue-500 shadow-lg ring-2 ring-blue-200" : "border-slate-200 hover:border-slate-300"
            )}
        >
            {/* Header */}
            <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-4 py-2 rounded-t-lg">
                <ArrowRight className="h-4 w-4 text-slate-500" />
                <span className="font-semibold text-slate-700 text-sm" title={displayText}>
                    {displayText}
                </span>
            </div>

            {/* Body */}
            <div className="p-3 flex justify-between gap-4">
                {/* Input */}
                <div className="flex flex-col gap-2">
                    <div className="relative flex items-center">
                        <Handle
                            type="target"
                            position={Position.Left}
                            id="value"
                            className="!bg-slate-400 !w-3 !h-3 !-left-[19px] !border-0"
                        />
                        <span className="text-xs text-slate-600">value</span>
                    </div>
                </div>

                {/* Current Value Display */}
                <div className="flex flex-col gap-2 items-end">
                    <div className="text-xs text-slate-500 font-mono max-w-[120px] truncate" title={currentValue}>
                        {currentValue || 'not set'}
                    </div>
                </div>
            </div>

            {/* Footer / Type info */}
            <div className="px-3 py-1 bg-slate-50 rounded-b-lg border-t border-slate-100">
                <div className="text-[10px] text-slate-400 font-mono">output</div>
            </div>
        </div>
    );
};

export default memo(OutputNode);
