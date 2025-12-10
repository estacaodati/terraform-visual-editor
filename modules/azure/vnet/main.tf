variable "resource_group_name" {
  description = "Name of the resource group"
}

variable "location" {
  description = "Azure region"
  default     = "East US"
}

variable "vnet_name" {
  description = "Name of the VNet"
  default     = "my-vnet"
}

variable "address_space" {
  description = "Address space for VNet"
  default     = "10.0.0.0/16"
}

resource "azurerm_virtual_network" "vnet" {
  name                = var.vnet_name
  location            = var.location
  resource_group_name = var.resource_group_name
  address_space       = [var.address_space]
}

output "id" {
  value = azurerm_virtual_network.vnet.id
}

output "name" {
  value = azurerm_virtual_network.vnet.name
}
