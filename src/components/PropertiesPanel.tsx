import { useEditorStore } from '../store/editorStore';
import { Settings2, X, Trash2 } from 'lucide-react';

export const PropertiesPanel = () => {
    const { nodes, selectedNodeId, selectNode, updateNodeData } = useEditorStore();
    const selectedNode = nodes.find((n) => n.id === selectedNodeId);

    if (!selectedNode) {
        return (
            <aside className="w-80 bg-slate-50 border-l border-slate-200 p-8 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mb-4">
                    <Settings2 className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-slate-900 font-medium mb-1">No Selection</h3>
                <p className="text-sm text-slate-500">Select a module on the canvas to configure its properties.</p>
            </aside>
        );
    }

    const handleInputChange = (key: string, value: string | number | boolean) => {
        updateNodeData(selectedNode.id, { [key]: value });
    };

    return (
        <aside className="w-80 bg-white border-l border-slate-200 flex flex-col h-full shadow-xl z-10">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                <div>
                    <h2 className="font-bold text-slate-800">Properties</h2>
                    <p className="text-xs text-slate-500 font-mono">{selectedNode.data.type}</p>
                </div>
                <button
                    onClick={() => selectNode(null)}
                    className="p-1 hover:bg-slate-200 rounded-md transition-colors"
                >
                    <X className="w-4 h-4 text-slate-500" />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                <div className="space-y-4">
                    <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
                        Configurações do Bloco (Terraform ID)
                    </h3>
                    <div className="space-y-1.5">
                        <label className="block text-xs font-medium text-slate-700">
                            Nome do Bloco
                        </label>
                        <input
                            type="text"
                            placeholder="Automático (ex: resource_...)"
                            value={selectedNode.data.variables.__block_label__ as string || ''}
                            onChange={(e) => {
                                const value = e.target.value;
                                // Basic validation or just allow it and show error
                                handleInputChange('__block_label__', value);
                            }}
                            className={`w-full px-3 py-2 bg-slate-50 border ${(selectedNode.data.variables.__block_label__ === selectedNode.data.variables.name && selectedNode.data.variables.name && selectedNode.data.variables.__block_label__)
                                ? 'border-red-500'
                                : 'border-slate-300'
                                } rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all`}
                        />
                        {(selectedNode.data.variables.__block_label__ === selectedNode.data.variables.name && selectedNode.data.variables.name && selectedNode.data.variables.__block_label__) && (
                            <p className="text-[10px] text-red-500">Nome do bloco e do recurso não podem ser iguais.</p>
                        )}
                        <p className="text-[10px] text-slate-400">
                            Identificador único do recurso no HCL.
                        </p>
                    </div>
                </div>



                <div className="space-y-4">
                    <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
                        Variables
                    </h3>

                    {Object.entries(selectedNode.data.variables)
                        .filter(([key]) => key !== '__block_label__')
                        .map(([key, value]) => (
                            <div key={key} className="space-y-1.5">
                                <label className="block text-xs font-medium text-slate-700">
                                    {key}
                                </label>
                                {typeof value === 'boolean' ? (
                                    <select
                                        value={value.toString()}
                                        onChange={(e) => handleInputChange(key, e.target.value === 'true')}
                                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    >
                                        <option value="true">true</option>
                                        <option value="false">false</option>
                                    </select>
                                ) : (
                                    <input
                                        type={typeof value === 'number' ? 'number' : 'text'}
                                        value={value}
                                        onChange={(e) => handleInputChange(key, e.target.type === 'number' ? Number(e.target.value) : e.target.value)}
                                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    />
                                )}
                            </div>
                        ))}
                </div>

                <div className="space-y-4">
                    <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
                        Info
                    </h3>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="text-slate-500">ID</div>
                        <div className="font-mono text-slate-700 truncate" title={selectedNode.id}>{selectedNode.id}</div>
                        <div className="text-slate-500">Inputs</div>
                        <div className="text-slate-700">{selectedNode.data.inputs.length}</div>
                        <div className="text-slate-500">Outputs</div>
                        <div className="text-slate-700">{selectedNode.data.outputs.length}</div>
                    </div>
                </div>
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50">
                <button
                    onClick={() => {
                        if (confirm('Are you sure you want to delete this module?')) {
                            useEditorStore.getState().removeNode(selectedNode.id);
                        }
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-md hover:bg-red-100 hover:border-red-300 transition-colors text-sm font-medium"
                >
                    <Trash2 className="w-4 h-4" />
                    Delete Module
                </button>
            </div>
        </aside>
    );
};
