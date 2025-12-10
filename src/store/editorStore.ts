import { create } from 'zustand';
import {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges
} from 'reactflow';
import type {
    Connection,
    Edge,
    EdgeChange,
    Node,
    NodeChange,
    OnNodesChange,
    OnEdgesChange,
    OnConnect,
} from 'reactflow';
import { AVAILABLE_MODULES } from '../data/modules';
import type { ModuleDefinition } from '../data/modules';
import { getResourceName } from '../utils/resourceUtils';

export interface ModuleNodeData extends ModuleDefinition {
    // Add any instance-specific data here if needed
    instanceId: string;
}

interface EditorState {
    nodes: Node<ModuleNodeData>[];
    edges: Edge[];
    selectedNodeId: string | null;

    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;

    addNode: (node: Node<ModuleNodeData>) => void;
    selectNode: (nodeId: string | null) => void;
    updateNodeData: (nodeId: string, newData: Record<string, string | number | boolean>) => void;

    availableModules: ModuleDefinition[];
    addAvailableModule: (module: ModuleDefinition) => void;
    removeNode: (nodeId: string) => void;
}

export const useEditorStore = create<EditorState>((set, get) => ({
    nodes: [],
    edges: [],
    selectedNodeId: null,

    onNodesChange: (changes: NodeChange[]) => {
        set({
            nodes: applyNodeChanges(changes, get().nodes),
        });
    },

    onEdgesChange: (changes: EdgeChange[]) => {
        set({
            edges: applyEdgeChanges(changes, get().edges),
        });
    },



    onConnect: (connection: Connection) => {
        set((state) => {
            const sourceNode = state.nodes.find((n) => n.id === connection.source);
            const targetNode = state.nodes.find((n) => n.id === connection.target);

            if (sourceNode && targetNode && connection.targetHandle) {
                const sourceName = getResourceName(sourceNode);
                const reference = `${sourceNode.data.type}.${sourceName}.${connection.sourceHandle || 'id'}`;

                // Update target node's variable with the reference
                const updatedNodes = state.nodes.map((node) => {
                    if (node.id === targetNode.id) {
                        return {
                            ...node,
                            data: {
                                ...node.data,
                                variables: {
                                    ...node.data.variables,
                                    [connection.targetHandle!]: reference,
                                },
                            },
                        };
                    }
                    return node;
                });

                return {
                    edges: addEdge(connection, state.edges),
                    nodes: updatedNodes,
                };
            }

            return {
                edges: addEdge(connection, state.edges),
            };
        });
    },

    addNode: (node: Node<ModuleNodeData>) => {
        set((state) => ({
            nodes: [...state.nodes, node],
        }));
    },

    selectNode: (nodeId: string | null) => {
        set({ selectedNodeId: nodeId });
    },

    updateNodeData: (nodeId: string, newVariables: Record<string, string | number | boolean>) => {
        set((state) => ({
            nodes: state.nodes.map((node) => {
                if (node.id === nodeId) {
                    return {
                        ...node,
                        data: {
                            ...node.data,
                            variables: {
                                ...node.data.variables,
                                ...newVariables,
                            },
                        },
                    };
                }
                return node;
            }),
        }));
    },

    availableModules: AVAILABLE_MODULES,
    addAvailableModule: (module: ModuleDefinition) => {
        set((state) => ({
            availableModules: [...state.availableModules, module],
        }));
    },

    removeNode: (nodeId: string) => {
        set((state) => ({
            nodes: state.nodes.filter((n) => n.id !== nodeId),
            edges: state.edges.filter(
                (e) => e.source !== nodeId && e.target !== nodeId
            ),
            selectedNodeId: state.selectedNodeId === nodeId ? null : state.selectedNodeId,
        }));
    },
}));
