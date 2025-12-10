variable "cidr_block" {
  description = "The CIDR block for the VPC"
  default     = "10.0.0.0/16"
}

variable "tags" {
  description = "A map of tags to assign to the resource"
  default     = {
    Name = "my-vpc"
  }
}

resource "aws_vpc" "main" {
  cidr_block = var.cidr_block
  tags       = var.tags
}

output "vpc_id" {
  value = aws_vpc.main.id
}
