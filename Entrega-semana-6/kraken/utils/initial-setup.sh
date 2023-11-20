#!/bin/bash

echo "*********** Running setup ***********"
# # Run the setup.sh
sh ./utils/setup.sh

echo "*********** Running kraken ***********"
# # Execute the command
if [[ "$(uname)" == "Darwin" ]]; then
    npx kraken-node run
  else
    sh ./utils/run-kraken-windows.sh
  fi

echo "*********** Running setup ***********"
# # Run the setup.sh again
sh ./utils/setup.sh

echo "*********** Running kraken ***********"
# # Execute the command again
if [[ "$(uname)" == "Darwin" ]]; then
    npx kraken-node run
  else
    sh ./utils/run-kraken-windows.sh
  fi

