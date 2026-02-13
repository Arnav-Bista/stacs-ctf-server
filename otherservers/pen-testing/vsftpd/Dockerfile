# -------- Build stage --------
FROM debian:stable-slim AS builder

RUN apt-get update && apt-get install -y \
    build-essential \
    libssl-dev \
    libpam0g-dev \
    libcrypt-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /build

# Copy vsftpd source
COPY src/ .

# Build vsftpd
RUN make && strip vsftpd


# -------- Runtime stage --------
FROM debian:stable

RUN apt-get update && apt-get install -y \
    libssl3 \
    libpam0g \
    libcrypt1 \
    tcpd \
    && rm -rf /var/lib/apt/lists/*

# # Create required directories and user
# RUN mkdir -p /var/run/vsftpd /var/ftp \
#     && useradd -d /var/ftp ftp \
#     && chown root.root /var/ftp \
#     && chmod og-w /var/ftp

RUN install -v -d -m 0755 /var/ftp/empty \
    && install -v -d -m 0755 /home/ftp \
    && groupadd -g 47 vsftpd \
    && groupadd -g 48 ftp \
    && useradd -c "vsftpd User"  -d /dev/null -g vsftpd -s /bin/false -u 47 vsftpd \
    && useradd -c anonymous_user -d /home/ftp -g ftp    -s /bin/false -u 48 ftp 

# Copy vsftpd binary
COPY --from=builder /build/vsftpd /usr/sbin/vsftpd

# Copy configuration
COPY vsftpd.conf /etc/vsftpd.conf
COPY flag.txt /flag.txt
COPY ftp-files/* /home/ftp
COPY entrypoint.sh /entrypoint.sh

# Run vsftpd in foreground
ENTRYPOINT ["/entrypoint.sh"]