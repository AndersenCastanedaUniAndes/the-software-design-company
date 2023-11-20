#!/bin/bash


# Install npm dependencies
npm install -g backstopjs

# Create bitmaps_reference and bitmaps_test directories
mkdir -p backstop_data/bitmaps_reference backstop_data/bitmaps_copy_test backstop_data/bitmaps_test backstop_data/bitmaps_config

# Iterate over the directories in VRT/screenshots/
for dir in ../VRT/screenshots/*; do
  # Check if it's a directory
  if [ -d "$dir" ]; then
    # Get the name of the directory
    dir_name=$(basename "$dir")

    # Create new directories with the same name in backstop_data/bitmaps_reference and backstop_data/bitmaps_copy_test
    mkdir -p "backstop_data/bitmaps_reference/$dir_name" "backstop_data/bitmaps_copy_test/$dir_name" "backstop_data/bitmaps_config/$dir_name"

    # Get the total number of images
    total_images=$(ls "$dir" | wc -l)

    # Calculate the number of images for each half
    half_images=$((total_images / 2))

    # Copy the first half of the images to backstop_data/bitmaps_reference/$dir_name
    ls "$dir" | head -n $half_images | xargs -I {} cp "$dir/{}" "backstop_data/bitmaps_reference/$dir_name"

    # Copy the second half of the images to backstop_data/bitmaps_copy_test/$dir_name
    ls "$dir" | tail -n +$((half_images + 1)) | xargs -I {} cp "$dir/{}" "backstop_data/bitmaps_copy_test/$dir_name"

  fi
done