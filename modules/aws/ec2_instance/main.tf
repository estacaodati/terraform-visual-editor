variable "ami" {
  description = "AMI ID"
  default     = "ami-0c55b159cbfafe1f0"
}

variable "instance_type" {
  description = "Instance type"
  default     = "t2.micro"
}

variable "subnet_id" {
  description = "Subnet ID"
}

resource "aws_instance" "web" {
  ami           = var.ami
  instance_type = var.instance_type
  subnet_id     = var.subnet_id
}

output "instance_id" {
  value = aws_instance.web.id
}

output "public_ip" {
  value = aws_instance.web.public_ip
}
