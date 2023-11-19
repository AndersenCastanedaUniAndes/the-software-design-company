#!/bin/bash

echo "*********** Running setup ***********"
# # Run the setup.sh
sh setup.sh

echo "*********** Running kraken ***********"
# # Execute the command
npx kraken-node run

echo "*********** Running setup ***********"
# # Run the setup.sh again
sh setup.sh

echo "*********** Running kraken ***********"
# # Execute the command again
npx kraken-node run

echo "*********** Running resemblejs ***********"
# Run the index.js file located in the resemblejs folder
node ./resemblejs/index.js

# For each folder in the /resemblejs/results/comparison directory, open the report.html file in a browser
for dir in ./resemblejs/results/comparison/*
do
  echo "Please open the following report manually: $dir/report.html"
done