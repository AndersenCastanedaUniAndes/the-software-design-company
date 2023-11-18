#!/bin/bash

# Prompt the user for the attributes
read -p "Enter USERNAME: " username
read -p "Enter PASSWORD: " password
read -p "Enter BASEURL: " baseurl

# Create the JSON file and write the attributes to it
cat << EOF > properties.json
{
  "USERNAME": "$username",
  "PASSWORD": "$password",
  "BASEURL": "$baseurl"
}
EOF


echo "properties.json has been created or updated."

# Prompt the user for the version
echo "Choose a version:"
select version in "@4.48.9" "@5.69.0"; do
  case $version in
    "@4.48.9"|"@5.69.0" ) break;;
    * ) echo "Invalid option";;
  esac
done

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