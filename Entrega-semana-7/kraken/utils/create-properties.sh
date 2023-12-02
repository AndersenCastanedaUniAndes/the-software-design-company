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