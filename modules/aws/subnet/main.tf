variable "vpc_id" {
  description = "The VPC ID"
}

variable "cidr_block" {
  description = "The CIDR block for the subnet"
  default     = "10.0.1.0/24"
}

variable "availability_zone" {
  description = "The AZ for the subnet"
  default     = "us-east-1a"
}

resource "aws_subnet" "main" {
  vpc_id            = var.vpc_id
  cidr_block        = var.cidr_block
  availability_zone = var.availability_zone
}

output "subnet_id" {
  value = aws_subnet.main.id
}
