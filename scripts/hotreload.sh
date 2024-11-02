#!/usr/bin/env bash

DIR="$HOME/.config/ags"
CONFIG_FILES=$(find "$DIR/" -type f -name "*.ts")

trap "pkill ags" EXIT

while true; do
    ags &
    inotifywait -e create,modify $CONFIG_FILES
    pkill ags
done
