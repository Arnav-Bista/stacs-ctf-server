# Image names
ATTACKER_IMAGE := ctf_25_attacker
INSECURE_TELNET_IMAGE := ctf_25_victim_1
VSFTPD_IMAGE := ctf_25_victim_2
FILE_UPLOAD_IMAGE := ctf_25_victim_3

ATTACKER_DIR := attacker
INSECURE_TELNET_DIR := insecure_telnet
VSFTPD_DIR := vsftpd
FILE_UPLOAD_DIR := file_upload

EXPORT_DIR := images
BUNDLE_NAME := pen-testing.zip
ZIP_PASSWORD := infected

# Default target
.PHONY: all
all: attacker insecure_telnet vsftpd file_upload

# Individual build targets
.PHONY: attacker
attacker:
	docker build -t $(ATTACKER_IMAGE):latest  ${ATTACKER_DIR}

.PHONY: insecure_telnet
insecure_telnet:
	docker build -t $(INSECURE_TELNET_IMAGE):latest ${INSECURE_TELNET_DIR}

.PHONY: vsftpd
vsftpd:
	docker build -t $(VSFTPD_IMAGE):latest ${VSFTPD_DIR}

.PHONY: file_upload
file_upload:
	docker build -t $(FILE_UPLOAD_IMAGE):latest ${FILE_UPLOAD_DIR}

# Clean images
.PHONY: clean
clean:
	docker rmi -f $(ATTACKER_IMAGE):latest || true
	docker rmi -f $(INSECURE_TELNET_IMAGE):latest || true
	docker rmi -f $(VSFTPD_IMAGE):latest || true
	docker rmi -f $(FILE_UPLOAD_IMAGE):latest || true

.PHONY: run
run:
	./start.sh

.PHONY: export
export: all
	mkdir -p $(EXPORT_DIR)
	docker save $(ATTACKER_IMAGE):latest -o $(EXPORT_DIR)/$(ATTACKER_IMAGE).tar
	docker save $(INSECURE_TELNET_IMAGE):latest -o $(EXPORT_DIR)/$(INSECURE_TELNET_IMAGE).tar
	docker save $(VSFTPD_IMAGE):latest -o $(EXPORT_DIR)/$(VSFTPD_IMAGE).tar
	docker save $(FILE_UPLOAD_IMAGE):latest -o $(EXPORT_DIR)/$(FILE_UPLOAD_IMAGE).tar

.PHONY: package
package: export
	rm -f $(BUNDLE_NAME)
	zip -r -P $(ZIP_PASSWORD) $(BUNDLE_NAME) $(EXPORT_DIR) start.sh new-shell.sh
