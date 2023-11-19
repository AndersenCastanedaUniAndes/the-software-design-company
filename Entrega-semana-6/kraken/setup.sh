#!/bin/bash

# Prompt the user for the version
echo "Choose the version from ghost:"
select version in "@4.48.9" "@5.69.0"; do
  case $version in
    "@4.48.9"|"@5.69.0" ) break;;
    * ) echo "Invalid option";;
  esac
done

# Prompt the user for the attributes
read -p "Enter EMAIL for admin: " username
read -p "Enter PASSWORD for admin: " password
read -p "Enter BASEURL of Ghost CMS similar to http://localhost:port/ghost/#/signin: " baseurl

# Create the JSON file and write the attributes to it
cat << EOF > properties.json
{
  "USERNAME": "$username",
  "PASSWORD": "$password",
  "BASEURL": "$baseurl"
}
EOF


echo "properties.json has been created or updated."


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