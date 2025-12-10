variable "resource_group_name" {
  description = "Name of the resource group"
}

variable "vnet_name" {
  description = "Name of the VNet"
}

variable "subnet_name" {
  description = "Name of the subnet"
  default     = "internal"
}

variable "address_prefixes" {
  description = "Address prefixes"
  default     = "10.0.1.0/24"
}

resource "azurerm_subnet" "subnet" {
  name                 = var.subnet_name
  resource_group_name  = var.resource_group_name
  virtual_network_name = var.vnet_name
  address_prefixes     = [var.address_prefixes]
}

output "id" {
  value = azurerm_subnet.subnet.id
}
