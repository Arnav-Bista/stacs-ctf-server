FROM debian:latest

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
    apt-get install -y \
        netcat-traditional \
        netcat-openbsd \
    && update-alternatives --set nc /bin/nc.traditional \
    && rm -rf /var/lib/apt/lists/*

COPY entrypoint.sh /entrypoint.sh
COPY flag.txt /flag.txt

ENTRYPOINT ["/entrypoint.sh"]