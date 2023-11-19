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


echo "*********** BackstopJS ***********"
sh ./backstopjs/utils/backstopjs.sh