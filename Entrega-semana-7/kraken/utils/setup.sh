#!/bin/bash

# Prompt the user for the version
echo "Choose the version from ghost:"
select version in "@4.48.9" "@5.69.0"; do
  case $version in
    "@4.48.9"|"@5.69.0" ) break;;
    * ) echo "Invalid option";;
  esac
done

echo "*******Running properties configuration*****"
sh ./utils/create-properties.sh

# Iterate over all .feature files in the "features" directory
for file in features/*.feature; do
  # Check OS and execute appropriate sed command and
  # Replaces the first line of each file with the chosen version
  if [[ "$(uname)" == "Darwin" ]]; then
    sed -i '' "1s/.*/$version/" "$file"
  else
    sed -i "1s/.*/$version/" "$file"
  fi
done

echo "All .feature files have been updated."