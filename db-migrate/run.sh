#!/bin/sh

sleep 5

psql ${DATABASE_URL} -f /opt/migrate/upgrade.sql
