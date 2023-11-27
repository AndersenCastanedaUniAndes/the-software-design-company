#!/bin/bash
mkdir tmp

# Move all feature files from features to tmp
mv features/*.feature tmp/

# Iterate over each feature file in tmp
for file in tmp/*.feature; do
  # Move the feature file back to features
  mv "$file" features/

  # Run the command
  npx kraken-node run

  # Move the feature file back to tmp to prepare for the next iteration
  mv features/*.feature tmp/
done

# Move all feature files back to features
mv tmp/*.feature features/