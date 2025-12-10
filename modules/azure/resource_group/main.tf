variable "name" {
  description = "Name of the resource group"
  default     = "my-rg"
}

variable "location" {
  description = "Azure region"
  default     = "East US"
}

resource "azurerm_resource_group" "rg" {
  name     = var.name
  location = var.location
}

output "id" {
  value = azurerm_resource_group.rg.id
}

output "name" {
  value = azurerm_resource_group.rg.name
}
