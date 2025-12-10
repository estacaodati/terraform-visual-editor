import type { Node } from 'reactflow';
import type { ModuleNodeData } from '../store/editorStore';

export const getResourceName = (node: Node<ModuleNodeData>): string => {
    const { variables } = node.data;
    if (variables.__block_label__) {
        return String(variables.__block_label__).replace(/[^a-zA-Z0-9_-]/g, '_');
    }
    // Fallback ID if no explicit block label is set
    return `resource_${node.id.slice(0, 8)}`;
};
