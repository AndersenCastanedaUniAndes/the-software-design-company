#!/bin/bash

if [ -d "./VRT" ]; then
    echo "VRT folder exists"
    echo "want to run configuration again?, please type 1 for (yes) or 2 for (no):"
    select option in "Yes" "No"; do
    case $option in
        "Yes" )
            sh ./utils/initial-setup.sh
            break;;
        "No" ) break;;
        * ) echo "Invalid option";;
    esac
    done
fi

echo "*********** BackstopJS ***********"
sh ./backstopjs/utils/backstopjs.sh