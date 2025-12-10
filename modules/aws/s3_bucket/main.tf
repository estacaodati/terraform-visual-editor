variable "bucket_name" {
  description = "Name of the bucket"
  default     = "my-unique-bucket-name"
}

resource "aws_s3_bucket" "b" {
  bucket = var.bucket_name
}

output "bucket_arn" {
  value = aws_s3_bucket.b.arn
}

output "bucket_domain_name" {
  value = aws_s3_bucket.b.bucket_domain_name
}
