FROM debian:latest

RUN apt-get update -y \
    && apt-get install -y \
        nmap \
        iputils-ping \
        inetutils-traceroute \
        inetutils-ftp \
        iproute2 \
        netcat-traditional \
        netcat-openbsd \
        curl \
        nano \
        vim \
    && update-alternatives --set nc /bin/nc.traditional

COPY nmapAutomator.sh /usr/local/bin/nmapAutomator.sh
RUN chmod +x /usr/local/bin/nmapAutomator.sh

RUN useradd -ms /bin/bash attacker

USER attacker
WORKDIR /home/attacker

COPY README ./README

CMD ["bash"]

