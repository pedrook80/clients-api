#!/bin/bash

until nc -z -v -w30 db 3306
do
  echo "Aguardando MySQL iniciar..."
  sleep 5
done

echo "MySQL pronto, iniciando migração..."
exec "$@"
