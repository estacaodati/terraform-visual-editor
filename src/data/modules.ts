export interface ModuleDefinition {
    type: string;
    label: string;
    provider: 'aws' | 'azure' | 'local';
    category: 'compute' | 'network' | 'storage' | 'database' | 'local';
    inputs: string[];
    outputs: string[];
    variables: Record<string, string | number | boolean>;
}

export const AVAILABLE_MODULES: ModuleDefinition[] = [
    // AWS Modules
    {
        type: 'aws_vpc',
        label: 'AWS VPC',
        provider: 'aws',
        category: 'network',
        inputs: [],
        outputs: ['id'],
        variables: {
            cidr_block: '10.0.0.0/16',
            tags: '{"Name": "my-vpc"}'
        }
    },
    {
        type: 'aws_subnet',
        label: 'AWS Subnet',
        provider: 'aws',
        category: 'network',
        inputs: ['vpc_id'],
        outputs: ['id'],
        variables: {
            cidr_block: '10.0.1.0/24',
            availability_zone: 'us-east-1a',
            vpc_id: '',
            tags: '{"Name": "my-subnet"}'
        }
    },
    {
        type: 'aws_ec2',
        label: 'AWS EC2 Instance',
        provider: 'aws',
        category: 'compute',
        inputs: ['subnet_id'],
        outputs: ['id', 'public_ip'],
        variables: {
            ami: 'ami-0c55b159cbfafe1f0',
            instance_type: 't2.micro',
            subnet_id: '',
            tags: '{"Name": "my-ec2"}'
        }
    },
    {
        type: 'aws_s3',
        label: 'AWS S3 Bucket',
        provider: 'aws',
        category: 'storage',
        inputs: [],
        outputs: ['arn', 'bucket_domain_name'],
        variables: {
            bucket_name: 'my-unique-bucket-name',
            tags: '{"Name": "my-bucket"}'
        }
    },
    {
        type: 'aws_static_website',
        label: 'AWS Static Website',
        provider: 'aws',
        category: 'storage',
        inputs: [],
        outputs: ['website_endpoint'],
        variables: {
            bucket_name: 'my-website-bucket'
        }
    },
    // Azure Modules
    {
        type: 'azurerm_resource_group',
        label: 'Azure Resource Group',
        provider: 'azure',
        category: 'compute',
        inputs: [],
        outputs: ['id', 'name'],
        variables: {
            name: 'my-rg',
            location: 'East US'
        }
    },
    {
        type: 'azurerm_virtual_network',
        label: 'Azure VNet',
        provider: 'azure',
        category: 'network',
        inputs: ['resource_group_name'],
        outputs: ['id', 'name'],
        variables: {
            name: 'my-vnet',
            address_space: '["10.0.0.0/16"]', // Use string representation of list for now, as variables are string|number|boolean in interface. Or user inputs string "{...}"?
            // Wait, the interface says `Record<string, string | number | boolean>`.
            // My hclGenerator handles string starting with [ as list.
            // So I should use '["10.0.0.0/16"]'.
            resource_group_name: '',
            location: 'East US'
        }
    },
    {
        type: 'azurerm_subnet',
        label: 'Azure Subnet',
        provider: 'azure',
        category: 'network',
        inputs: ['resource_group_name', 'virtual_network_name'],
        outputs: ['id'],
        variables: {
            name: 'internal',
            address_prefixes: '["10.0.1.0/24"]',
            resource_group_name: '',
            virtual_network_name: ''
        }
    },
    {
        type: 'azurerm_storage_account',
        label: 'Azure Storage Account',
        provider: 'azure',
        category: 'storage',
        inputs: ['resource_group_name'],
        outputs: ['id', 'primary_endpoint'],
        variables: {
            name: 'mystorageaccount',
            account_tier: 'Standard',
            account_replication_type: 'LRS',
            resource_group_name: '',
            location: 'East US'
        }
    },
    {
        type: 'azurerm_storage_account_static_website',
        label: 'Azure Static Website',
        provider: 'azure',
        category: 'storage',
        inputs: ['resource_group_name'],
        outputs: ['web_endpoint'],
        variables: {
            storage_account_id: '',
            error_404_document: '404.html',
            index_document: 'index.html'
        }
    }
];
