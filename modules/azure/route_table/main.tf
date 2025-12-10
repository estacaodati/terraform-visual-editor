variable "resource_group_name" {
  description = "Name of the resource group"
}

variable "location" {
  description = "Azure region"
  default     = "East US"
}

variable "name" {
  description = "Name of the route table"
  default     = "my-route-table"
}

resource "azurerm_route_table" "rt" {
  name                = var.name
  location            = var.location
  resource_group_name = var.resource_group_name
}

output "id" {
  value = azurerm_route_table.rt.id
}
