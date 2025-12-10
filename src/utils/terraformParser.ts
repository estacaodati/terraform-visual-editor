import type { ModuleDefinition } from '../data/modules';

export const parseTerraformFiles = async (files: File[]): Promise<ModuleDefinition | null> => {
    if (files.length === 0) return null;

    const variables: Record<string, string | number | boolean> = {};
    const inputs: string[] = [];
    const outputs: string[] = [];

    for (const file of files) {
        if (!file.name.endsWith('.tf')) continue;

        const text = await file.text();

        // Extract variables
        const variableRegex = /variable\s+"([^"]+)"\s*{([^}]*)}/g;
        let varMatch;
        while ((varMatch = variableRegex.exec(text)) !== null) {
            const varName = varMatch[1];
            inputs.push(varName);

            // Try to extract default value
            const defaultMatch = /default\s*=\s*(.*)/.exec(varMatch[2]);
            if (defaultMatch) {
                let defaultValue = defaultMatch[1].trim();
                // Remove comments if any
                defaultValue = defaultValue.split('#')[0].trim();
                // Handle strings
                if (defaultValue.startsWith('"') && defaultValue.endsWith('"')) {
                    variables[varName] = defaultValue.slice(1, -1);
                } else if (defaultValue === 'true') {
                    variables[varName] = true;
                } else if (defaultValue === 'false') {
                    variables[varName] = false;
                } else if (!isNaN(Number(defaultValue))) {
                    variables[varName] = Number(defaultValue);
                } else {
                    variables[varName] = defaultValue;
                }
            } else {
                variables[varName] = ''; // No default value
            }
        }

        // Extract outputs
        const outputRegex = /output\s+"([^"]+)"\s*{/g;
        let outMatch;
        while ((outMatch = outputRegex.exec(text)) !== null) {
            outputs.push(outMatch[1]);
        }
    }

    // Use the directory name as the module type/label if possible, otherwise generic
    // Since we don't have the directory handle here easily for the name without passing it,
    // we'll let the caller handle the naming or infer it from the first file's context if needed.
    // For now, returning a partial definition to be enriched.

    return {
        type: 'local_module', // Placeholder
        label: 'Local Module', // Placeholder
        provider: 'local',
        category: 'local',
        inputs,
        outputs,
        variables
    };
};
