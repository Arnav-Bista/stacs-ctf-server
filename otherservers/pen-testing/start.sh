#! /usr/bin/env bash
echo "Importing images"
docker image load --input images/ctf_25_attacker.tar
docker image load --input images/ctf_25_victim_1.tar
docker image load --input images/ctf_25_victim_2.tar
docker image load --input images/ctf_25_victim_3.tar

echo "Starting containers"
docker compose up -d
docker compose exec attacker bash

echo "Stopping containers"
docker compose down

echo "Cleaning up"
docker image rm ctf_25_attacker:latest
docker image rm ctf_25_victim_1:latest
docker image rm ctf_25_victim_2:latest
docker image rm ctf_25_victim_3:latest