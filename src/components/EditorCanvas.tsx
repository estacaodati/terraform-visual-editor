import React, { useCallback, useRef } from 'react';
import ReactFlow, {
    Background,
    Controls,
    ReactFlowProvider,
    MarkerType
} from 'reactflow';
import type {
    Node,
    Connection
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useEditorStore } from '../store/editorStore';
import type { ModuleNodeData } from '../store/editorStore';
import ModuleNode from './nodes/ModuleNode';
import OutputNode from './nodes/OutputNode';
import { AVAILABLE_MODULES } from '../data/modules';
import { v4 as uuidv4 } from 'uuid';

const nodeTypes = {
    module: ModuleNode,
    output: OutputNode,
};

const EditorCanvasContent = () => {
    const reactFlowWrapper = useRef<HTMLDivElement>(null);
    const {
        nodes,
        edges,
        onNodesChange,
        onEdgesChange,
        onConnect,
        addNode,
        selectNode
    } = useEditorStore();

    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event: React.DragEvent) => {
            event.preventDefault();

            const type = event.dataTransfer.getData('application/reactflow');
            const moduleDef = AVAILABLE_MODULES.find(m => m.type === type);

            if (typeof type === 'undefined' || !type || !moduleDef) {
                return;
            }

            const position = reactFlowWrapper.current?.getBoundingClientRect();
            const clientX = event.clientX - (position?.left || 0);
            const clientY = event.clientY - (position?.top || 0);

            const newNode: Node<ModuleNodeData> = {
                id: uuidv4(),
                type: moduleDef.type === 'output' ? 'output' : 'module',
                position: { x: clientX, y: clientY },
                data: {
                    ...moduleDef,
                    instanceId: uuidv4(),
                    variables: {
                        ...moduleDef.variables,
                        __block_label__: ''
                    }
                },
            };

            addNode(newNode);
        },
        [addNode]
    );

    const onSelectionChange = useCallback(({ nodes }: { nodes: Node[] }) => {
        selectNode(nodes[0]?.id || null);
    }, [selectNode]);

    const isValidConnection = useCallback((connection: Connection) => {
        const sourceNode = nodes.find(n => n.id === connection.source);
        const targetNode = nodes.find(n => n.id === connection.target);
        
        if (!sourceNode || !targetNode || !connection.targetHandle) return false;
        
        const targetHandle = connection.targetHandle;
        const sourceHandle = connection.sourceHandle;
        
        // Special validation for Azure resources
        if (targetHandle === 'resource_group_name') {
            return sourceNode.data.type === 'azurerm_resource_group' && sourceHandle === 'name';
        }
        
        if (targetHandle === 'virtual_network_name') {
            return sourceNode.data.type === 'azurerm_virtual_network' && sourceHandle === 'name';
        }
        
        // Default validation
        return sourceNode.data.outputs.includes(sourceHandle || 'id');
    }, [nodes]);

    return (
        <div className="flex-1 h-full bg-slate-50" ref={reactFlowWrapper}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeTypes}
                onDragOver={onDragOver}
                onDrop={onDrop}
                onSelectionChange={onSelectionChange}
                isValidConnection={isValidConnection}
                fitView
                defaultEdgeOptions={{
                    type: 'smoothstep',
                    animated: true,
                    markerEnd: {
                        type: MarkerType.ArrowClosed,
                    },
                    style: { stroke: '#64748b', strokeWidth: 2 },
                }}
                deleteKeyCode={['Backspace', 'Delete']}
                onEdgesDelete={(edges) => {
                    // Update connected nodes when edges are deleted
                    const { nodes: currentNodes, updateNodeData } = useEditorStore.getState();
                    edges.forEach(edge => {
                        const targetNode = currentNodes.find(n => n.id === edge.target);
                        if (targetNode && edge.targetHandle) {
                            if (targetNode.data.type === 'output' && edge.targetHandle === 'value') {
                                updateNodeData(edge.target, { value: '' });
                            } else {
                                updateNodeData(edge.target, { [edge.targetHandle]: '' });
                            }
                        }
                    });
                }}
            >
                <Background color="#cbd5e1" gap={16} />
                <Controls className="bg-white border border-slate-200 shadow-sm rounded-md" />
            </ReactFlow>
        </div>
    );
};

export const EditorCanvas = () => (
    <ReactFlowProvider>
        <EditorCanvasContent />
    </ReactFlowProvider>
);
