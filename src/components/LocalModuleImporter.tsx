import React from 'react';
import { FolderInput } from 'lucide-react';
import { useEditorStore } from '../store/editorStore';
import { parseTerraformFiles } from '../utils/terraformParser';

export const LocalModuleImporter: React.FC = () => {
    const addAvailableModule = useEditorStore((state) => state.addAvailableModule);

    const handleImport = async () => {
        try {
            // @ts-expect-error - window.showDirectoryPicker is not yet in all TS definitions
            const dirHandle = await window.showDirectoryPicker();

            const files: File[] = [];

            // Iterate through the directory
            for await (const entry of dirHandle.values()) {
                if (entry.kind === 'file' && entry.name.endsWith('.tf')) {
                    const file = await entry.getFile();
                    files.push(file);
                }
            }

            if (files.length === 0) {
                alert('No .tf files found in the selected directory.');
                return;
            }

            const moduleDef = await parseTerraformFiles(files);

            if (moduleDef) {
                // Enrich the definition with directory name
                moduleDef.label = dirHandle.name;
                moduleDef.type = `local_${dirHandle.name.toLowerCase().replace(/\s+/g, '_')}`;

                addAvailableModule(moduleDef);
                alert(`Module "${dirHandle.name}" imported successfully!`);
            }
        } catch (error) {
            console.error('Error importing module:', error);
            // Ignore abort errors (user cancelled)
            if ((error as Error).name !== 'AbortError') {
                alert('Failed to import module. See console for details.');
            }
        }
    };

    return (
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <button
                onClick={handleImport}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors text-sm font-medium"
                title="Import a local Terraform module directory"
            >
                <FolderInput size={16} />
                Import Local Module
            </button>
        </div>
    );
};
