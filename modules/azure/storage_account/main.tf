variable "resource_group_name" {
  description = "Name of the resource group"
}

variable "location" {
  description = "Azure region"
  default     = "East US"
}

variable "name" {
  description = "Name of the storage account"
  default     = "mystorageaccount"
}

variable "account_tier" {
  description = "Tier of the storage account"
  default     = "Standard"
}

resource "azurerm_storage_account" "sa" {
  name                     = var.name
  resource_group_name      = var.resource_group_name
  location                 = var.location
  account_tier             = var.account_tier
  account_replication_type = "LRS"
}

output "id" {
  value = azurerm_storage_account.sa.id
}

output "primary_endpoint" {
  value = azurerm_storage_account.sa.primary_web_endpoint
}
