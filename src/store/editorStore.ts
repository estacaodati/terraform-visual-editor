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
                // Validation: Check if the connection is valid
                const isValidConnection = validateConnection(sourceNode, targetNode, connection);
                if (!isValidConnection) {
                    return state; // Don't create invalid connections
                }

                const sourceName = getResourceName(sourceNode);
                const outputField = getCorrectOutputField(sourceNode, targetNode, connection);
                const reference = `${sourceNode.data.type}.${sourceName}.${outputField}`;

                // Update target node's variable with the reference
                const updatedNodes = state.nodes.map((node) => {
                    if (node.id === targetNode.id) {
                        // For output nodes, update the value variable when connected
                        if (targetNode.data.type === 'output' && connection.targetHandle === 'value') {
                            return {
                                ...node,
                                data: {
                                    ...node.data,
                                    variables: {
                                        ...node.data.variables,
                                        value: reference,
                                    },
                                },
                            };
                        } else {
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

// Validation functions
const validateConnection = (sourceNode: Node<ModuleNodeData>, targetNode: Node<ModuleNodeData>, connection: Connection): boolean => {
    const targetHandle = connection.targetHandle;
    const sourceHandle = connection.sourceHandle;
    
    // Special validation for Azure resources that need specific outputs
    if (targetHandle === 'resource_group_name') {
        // Only allow 'name' output from resource groups
        return sourceNode.data.type === 'azurerm_resource_group' && sourceHandle === 'name';
    }
    
    if (targetHandle === 'virtual_network_name') {
        // Only allow 'name' output from virtual networks
        return sourceNode.data.type === 'azurerm_virtual_network' && sourceHandle === 'name';
    }
    
    // Default validation: check if source has the output
    return sourceNode.data.outputs.includes(sourceHandle || 'id');
};

const getCorrectOutputField = (sourceNode: Node<ModuleNodeData>, targetNode: Node<ModuleNodeData>, connection: Connection): string => {
    const targetHandle = connection.targetHandle;
    
    // Map specific target inputs to correct source outputs
    if (targetHandle === 'resource_group_name' && sourceNode.data.type === 'azurerm_resource_group') {
        return 'name';
    }
    
    if (targetHandle === 'virtual_network_name' && sourceNode.data.type === 'azurerm_virtual_network') {
        return 'name';
    }
    
    // Default to the selected output or 'id'
    return connection.sourceHandle || 'id';
};
