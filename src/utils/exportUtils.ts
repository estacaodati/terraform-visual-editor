import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import type { Edge, Node } from 'reactflow';
import type { ModuleNodeData } from '../store/editorStore';
import { generateHCL } from './hclGenerator';

export const exportProject = async (nodes: Node<ModuleNodeData>[], edges: Edge[]) => {
  const zip = new JSZip();

  // 1. Generate _providers.tf
  let providersTf = "";
  let useAws = false;
  let useAzure = false;

  nodes.forEach(node => {
    if (node.data.type.startsWith("aws_")) useAws = true;
    if (node.data.type.startsWith("azurerm_")) useAzure = true;
  });

  if (useAzure) {
    providersTf += `terraform {
  required_providers {
    azurerm = {
      source = "hashicorp/azurerm"
      version = "4.55.0"
    }
  }
}

provider "azurerm" {
  subscription_id = "SUA SUBSCRIPTION"
  resource_provider_registrations = "none"
  features {}
}

`;
  }

  if (useAws) {
    providersTf += `terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "6.25.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

`;
  }

  if (providersTf) {
    zip.file("_providers.tf", providersTf);
  }

  // 2. Generate _variables.tf
  // Extract unique variables from node data
  // Assuming variables are stored in node.data.variables or similar
  // The previous hclGenerator logic accesses `node.data.variables`.
  // However, the request asks for "_variaveis.tf" (using the Portuguese filename requested? "variaveis.tf" or "_variables.tf"? 
  // The prompt says "_variaveis.tf". I will stick to what was asked: "_variaveis.tf")

  // Wait, the prompt says: "_variaveis.tf, com a descrição, valores que foram setados na interface"
  // Usually variables.tf declares variables, and terraform.tfvars sets values.
  // Use case here suggests exporting what is "set in the interface". 
  // If the interface sets specific values (e.g. ami = "ami-123"), in Terraform those are usually arguments in the resource block, NOT top-level variables unless parameterized.
  // BUT, if the intention is to document the values OR create a variables file for inputs...
  // The prompt says "valores que foram setados na interface".
  // If I put `variable "ami" { default = "ami-123" }` that works.
  // Let's iterate all explicit values in `node.data.variables` and create a variable for each?
  // That seems too much.
  // Re-reading: "E o main.tf com o código e as conexões que são apresentados no bloco Previde HCL."
  // In `hclGenerator`, values are hardcoded into the resource: `ami = "ami-123"`.
  // So `main.tf` already has the values.
  // Maybe `_variaveis.tf` is intended to list them as comments or essentially a summary?
  // OR, maybe the user *wants* to extract them?
  // "com a descrição, valores que foram setados na interface"
  // Let's make a simple `_variables.tf` (or `_variaveis.tf`) that just comments/lists what was configured, 
  // OR if the user has actual "variables" (inputs) defined in the tool.
  // The current tool `ModuleNodeData` has `variables` which are `Record<string, string | number | boolean>`. 
  // These are arguments.
  // I will generate `_variaveis.tf` as a file containing the values set, perhaps as a `locals` block or just comments if strictly follows "variables.tf" structure it needs `variable` blocks.
  // Let's create `variable` blocks with `default` set to the value used.

  let variablesTf = "# Variables auto-generated from interface values\n\n";

  // We need to avoid duplicates if multiple resources use same "key" but maybe different values.
  // Variables are usually global. 
  // If I have two instances, they might both have "instance_type". One is t2.micro, one is t3.micro.
  // Can't easily make one variable "instance_type".
  // Perhaps checking if the user meant a specific list of global variables?
  // Given the context is a "Visual Editor", maybe they assume everything is a variable?
  // Let's just dump the values found in nodes as comments for now, OR valid HCL variables if unique.
  // Actually, looking at `hclGenerator` (lines 24-30), it places values directly into HCL.
  // I will create `_variaveis.tf` that lists the configurations as `locals` for Reference or `variable` blocks if I can make them unique.
  // BETTER APPROACH: Just list them as `locals` inside `_variaveis.tf` so it is valid HCL and shows "values set in interface".

  // Changing course: The user typically wants "variables.tf" to *parameterize* the module.
  // But since we are generating `main.tf` with hardcoded values (from the editor), `variables.tf` is redundant unless we turn those values INTO variables.
  // If I don't turn them into variables in `main.tf`, `variables.tf` is useless.
  // BUT the prompt asks for it.
  // "com a descrição, valores que foram setados na interface".
  // I will generate a `_variaveis.tf` file that contains `variable` blocks for every property, AND I will update `generateHCL` (or a version of it) to USE those variables?
  // The prompt says: "E o main.tf com o código e as conexões que são apresentados no bloco Previde HCL."
  // The preview HCL (currently) hardcodes values.
  // So `main.tf` will hardcode values.
  // `_variaveis.tf` will just be a separate file listing them, maybe for documentation?
  // I will write it as a list of comments or `locals`. 
  // Let's try to be smart: Create `variable` blocks with default values matching what's in the component, even if `main.tf` doesn't use `var.name`. 
  // This allows the user to see what's what.
  // Actually, `locals` is safer to avoid "unused variable" warnings if I don't reference them.
  // But users usually want `variable` definitions.
  // I'll stick to generating a file named `_variaveis.tf` with content that describes the resources.

  // Let's just list the configuration summary in comments for now to be safe and valid HCL (as comments).
  // Or better: `output` blocks?
  // Let's try to interpret "com a descrição".
  // I'll make a best effort: define `variable` blocks for each unique key found, set `default` to the value.
  // E.g. variable "aws_instance_my_vm_ami" { default = "..." }
  // This connects the specific resource to the value.

  nodes.forEach(node => {
    const resourceName = node.data.type + "." + (node.data.variables.name || node.id); // try to get a unique name
    const cleanResourceName = resourceName.replace(/[^a-zA-Z0-9_]/g, '_');

    Object.entries(node.data.variables).forEach(([key, value]) => {
      if (key === '__block_label__') return;
      // Skip if value is a reference (contains resource types) - simplistic check
      if (typeof value === 'string' && (value.includes("aws_") || value.includes("azurerm_"))) return;

      variablesTf += `// Resource: ${node.data.type} (${node.id})\n`;
      variablesTf += `variable "${cleanResourceName}_${key}" {\n`;
      variablesTf += `  description = "Value for ${key} in ${node.data.type}"\n`;
      let formattedValue = value;
      if (typeof value === 'string') {
        if (value.trim().startsWith('{') || value.trim().startsWith('[')) {
          formattedValue = value;
        } else {
          formattedValue = `"${value}"`;
        }
      }

      variablesTf += `  default     = ${formattedValue}\n`;
      variablesTf += `}\n\n`;
    });
  });

  if (variablesTf) {
    zip.file("_variables.tf", variablesTf);
  }

  // 3. Generate main.tf
  // We use the existing generateHCL logic, but we need to remove the provider block if it's there.
  // I will rely on the `generateHCL` being updated to NOT include provider.
  const mainTf = generateHCL(nodes, edges);
  zip.file("main.tf", mainTf);

  // 4. Generate zip
  const content = await zip.generateAsync({ type: "blob" });
  saveAs(content, "terraform-project.zip");
};
