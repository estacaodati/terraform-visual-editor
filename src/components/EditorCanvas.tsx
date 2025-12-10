import React, { useCallback, useRef } from 'react';
import ReactFlow, {
    Background,
    Controls,
    ReactFlowProvider,
    MarkerType
} from 'reactflow';
import type {
    Node
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useEditorStore } from '../store/editorStore';
import type { ModuleNodeData } from '../store/editorStore';
import ModuleNode from './nodes/ModuleNode';
import { AVAILABLE_MODULES } from '../data/modules';
import { v4 as uuidv4 } from 'uuid';

const nodeTypes = {
    module: ModuleNode,
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
                type: 'module',
                position: { x: clientX, y: clientY },
                data: {
                    ...moduleDef,
                    instanceId: uuidv4()
                },
            };

            addNode(newNode);
        },
        [addNode]
    );

    const onSelectionChange = useCallback(({ nodes }: { nodes: Node[] }) => {
        selectNode(nodes[0]?.id || null);
    }, [selectNode]);

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
