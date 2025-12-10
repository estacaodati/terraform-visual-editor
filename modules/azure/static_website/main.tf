variable "resource_group_name" {
  description = "Name of the resource group"
}

variable "location" {
  description = "Azure region"
  default     = "East US"
}

variable "storage_account_name" {
  description = "Name of the storage account"
  default     = "mystaticwebsite"
}

resource "azurerm_storage_account" "sa" {
  name                     = var.storage_account_name
  resource_group_name      = var.resource_group_name
  location                 = var.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
  
  static_website {
    index_document = "index.html"
    error_404_document = "404.html"
  }
}

output "web_endpoint" {
  value = azurerm_storage_account.sa.primary_web_endpoint
}
