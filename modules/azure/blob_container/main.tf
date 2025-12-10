variable "storage_account_name" {
  description = "Name of the storage account"
}

variable "container_name" {
  description = "Name of the container"
  default     = "my-container"
}

variable "container_access_type" {
  description = "Access type"
  default     = "private"
}

resource "azurerm_storage_container" "container" {
  name                  = var.container_name
  storage_account_name  = var.storage_account_name
  container_access_type = var.container_access_type
}

output "id" {
  value = azurerm_storage_container.container.id
}
