#!/bin/sh
set -e


# Enable Laravel queue workers
if [[ "${ENABLE_WORKER:-0}" = "1" ]]; then
  mv -f /etc/supervisor.d/worker.conf.default /etc/supervisor.d/worker.conf
else
  rm -f /etc/supervisor.d/worker.conf.default
fi


exec "$@"