#!/usr/bin/env bash

WALL_PATH="$HOME/.config/swww/compressed-walls"

# Open a file picker dialog with a filter for PNG and JPG files
files=$(zenity --file-selection --multiple --separator=":" \
    --file-filter="Images (PNG, JPG) | *.png *.jpg" \
    --title="Select Images")

# Check if files were selected
if [ -z "$files" ]; then
    notify-send "No files selected."
    exit 1
fi

if [ ! -d "$WALL_PATH" ]; then
    mkdir -p "$WALL_PATH"
fi

# Process each selected file
IFS=":" # Set the internal field separator to :
for file_path in $files; do
    filename=$(basename ${file_path})
    ext="${filename##*.}"
    filename="${filename%.*}"

    file_to_save="$WALL_PATH/${filename}.${ext}"

    if [ -f $file_to_save ]; then
        notify-send "Wallpaper already added"
        exit 1
    fi

    magick convert -resize 640x480 \
        "$file_path" $file_to_save &&
        echo "$filename.$ext:$file_path" >>$WALL_PATH/log.txt &&
        echo $file_to_save
done
