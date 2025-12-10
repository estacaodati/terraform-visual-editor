variable "resource_group_name" {
  description = "Name of the resource group"
}

variable "location" {
  description = "Azure region"
  default     = "East US"
}

variable "name" {
  description = "Name of the NSG"
  default     = "my-nsg"
}

resource "azurerm_network_security_group" "nsg" {
  name                = var.name
  location            = var.location
  resource_group_name = var.resource_group_name
}

output "id" {
  value = azurerm_network_security_group.nsg.id
}
