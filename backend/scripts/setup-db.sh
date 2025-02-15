#!/bin/bash
# backend/scripts/setup-db.sh

# Get the current user's system username
USER=$(whoami)

# Create database (connect to postgres database first)
psql postgres -c "CREATE DATABASE learning_style_quiz;"

# Run schema
psql postgres -d learning_style_quiz -f db/schema.sql