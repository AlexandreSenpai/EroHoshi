variable "project" {
  type = string
  description = "Google Cloud Project ID"
}

resource "google_compute_instance" "default" {
    project = var.project
    name = "sonic-host"
    machine_type = "f1-micro"
    zone = "us-central1-a"

    tags = ["sonic", "search-engine"]

    metadata_startup_script = file("startup_script.sh")

    boot_disk {
        auto_delete = false
        source = "sonic-host"
    }

    network_interface {
      network = "default"
      access_config {
      }
    }

    service_account {
      scopes = []
    }

}

resource "google_compute_firewall" "default" {
  project = var.project
  name = "allow-sonic-tcp"
  network = "default"

  allow {
    protocol = "tcp"
    ports = ["1491"]
  }

  target_tags = [ "sonic" ]
}